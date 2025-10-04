import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Lesson = Database['public']['Tables']['lessons']['Row'];

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('lessons')
          .select('*')
          .eq('published', true)
          .order('order_index', { ascending: true });

        if (fetchError) throw fetchError;

        setLessons(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return { lessons, loading, error };
};
