import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PublishedSimulation {
  id: string;
  slug: string;
  title: string;
}

export const usePublishedSimulations = () => {
  const [simulations, setSimulations] = useState<PublishedSimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishedSimulations = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('simulations')
          .select('id, slug, title')
          .eq('published', true)
          .order('order_index', { ascending: true });

        if (fetchError) throw fetchError;

        setSimulations(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch published simulations');
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedSimulations();
  }, []);

  return { simulations, loading, error };
};
