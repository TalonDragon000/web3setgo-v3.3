import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type SimulationStep = Database['public']['Tables']['simulation_steps']['Row'];
type StepInsert = Database['public']['Tables']['simulation_steps']['Insert'];
type StepUpdate = Database['public']['Tables']['simulation_steps']['Update'];

export const useSimulationSteps = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStep = async (simulationId: string, step: StepInsert): Promise<SimulationStep | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('simulation_steps')
        .insert({ ...step, simulation_id: simulationId })
        .select()
        .single();

      if (createError) throw createError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create step';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateStep = async (stepId: string, updates: StepUpdate): Promise<SimulationStep | null> => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from('simulation_steps')
        .update(updateData)
        .eq('id', stepId)
        .select()
        .single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update step';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteStep = async (stepId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('simulation_steps')
        .delete()
        .eq('id', stepId);

      if (deleteError) throw deleteError;

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete step';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reorderSteps = async (simulationId: string, orderedStepIds: string[]): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Update step_order for each step based on its index in the ordered array
      const updates = orderedStepIds.map((stepId, index) => 
        supabase
          .from('simulation_steps')
          .update({ step_order: index, updated_at: new Date().toISOString() })
          .eq('id', stepId)
          .eq('simulation_id', simulationId)
      );

      const results = await Promise.all(updates);
      
      const hasError = results.some(result => result.error);
      if (hasError) {
        throw new Error('Failed to reorder some steps');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reorder steps';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createStep,
    updateStep,
    deleteStep,
    reorderSteps,
    loading,
    error,
  };
};

