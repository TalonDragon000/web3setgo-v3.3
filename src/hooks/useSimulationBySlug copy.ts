import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SimulationStep {
  id: string;
  simulation_id: string;
  step_order: number;
  title: string;
  description: string;
  hints: string[];
  validation_type: string;
  expected_action: string;
  success_message: string;
  created_at: string;
}

interface Simulation {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  component_type: string;
  order_index: number;
  icon: string;
  color_scheme: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  steps: SimulationStep[];
}

export const useSimulationBySlug = (slug: string | undefined) => {
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchSimulation = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: simData, error: simError } = await supabase
          .from('simulations')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (simError) throw simError;
        if (!simData) {
          setSimulation(null);
          setLoading(false);
          return;
        }

        const { data: stepsData, error: stepsError } = await supabase
          .from('simulation_steps')
          .select('*')
          .eq('simulation_id', simData.id)
          .order('step_order', { ascending: true });

        if (stepsError) throw stepsError;

        setSimulation({
          ...simData,
          steps: stepsData || [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch simulation');
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [slug]);

  return { simulation, loading, error };
};
