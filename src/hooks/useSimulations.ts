import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Simulation {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  order_index: number;
  icon: string;
  color_scheme: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('simulations')
          .select('*')
          .eq('published', true)
          .order('order_index', { ascending: true });

        if (fetchError) throw fetchError;

        setSimulations(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch simulations');
      } finally {
        setLoading(false);
      }
    };

    fetchSimulations();
  }, []);

  return { simulations, loading, error };
};
