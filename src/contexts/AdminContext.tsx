import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'web3setgo_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (sessionData) {
        try {
          const { timestamp } = JSON.parse(sessionData);
          const now = Date.now();
          if (now - timestamp < SESSION_DURATION) {
            setIsAdmin(true);
          } else {
            localStorage.removeItem(ADMIN_SESSION_KEY);
          }
        } catch {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_config')
        .select('password_hash')
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        console.error('Failed to fetch admin config:', error);
        return false;
      }

      const inputHash = await hashPassword(password);

      if (inputHash === data.password_hash) {
        const sessionData = {
          timestamp: Date.now(),
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
        setIsAdmin(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
