import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import AdminLogin from './AdminLogin';

interface RequireAdminProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children, redirectTo = '/' }) => {
  const { isAdmin, isLoading } = useAdmin();
  const [showLogin, setShowLogin] = useState(!isAdmin);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin && !showLogin) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isAdmin && showLogin) {
    return (
      <AdminLogin
        onClose={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)}
      />
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
