import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Quiz = Database['public']['Tables']['quizzes']['Row'];

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setQuizzes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, loading, error };
};
