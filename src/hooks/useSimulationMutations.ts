import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Simulation = Database['public']['Tables']['simulations']['Row'];
type SimulationInsert = Database['public']['Tables']['simulations']['Insert'];
type SimulationUpdate = Database['public']['Tables']['simulations']['Update'];

export const useSimulationMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSimulation = async (simulation: SimulationInsert): Promise<Simulation | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('simulations')
        .insert(simulation)
        .select()
        .single();

      if (createError) throw createError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create simulation';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSimulation = async (id: string, updates: SimulationUpdate): Promise<Simulation | null> => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from('simulations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update simulation';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSimulation = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('simulations')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete simulation';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
    try {
      let query = supabase
        .from('simulations')
        .select('id')
        .eq('slug', slug);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error: checkError } = await query;

      if (checkError) throw checkError;

      return (data && data.length > 0) || false;
    } catch (err) {
      console.error('Error checking slug:', err);
      return false;
    }
  };

  return {
    createSimulation,
    updateSimulation,
    deleteSimulation,
    checkSlugExists,
    loading,
    error,
  };
};

