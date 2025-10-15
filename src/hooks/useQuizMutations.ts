import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Quiz = Database['public']['Tables']['quizzes']['Row'];
type QuizInsert = Database['public']['Tables']['quizzes']['Insert'];
type QuizUpdate = Database['public']['Tables']['quizzes']['Update'];

export const useQuizMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createQuiz = async (quiz: QuizInsert): Promise<Quiz | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('quizzes')
        .insert(quiz)
        .select()
        .single();

      if (createError) throw createError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create quiz';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (id: string, updates: QuizUpdate): Promise<Quiz | null> => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from('quizzes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update quiz';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete quiz';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
    try {
      let query = supabase
        .from('quizzes')
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
    createQuiz,
    updateQuiz,
    deleteQuiz,
    checkSlugExists,
    loading,
    error,
  };
};

