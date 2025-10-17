import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Blog = Database['public']['Tables']['blogs']['Row'];
type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export const useBlogMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = async (blog: BlogInsert): Promise<Blog | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('blogs')
        .insert(blog)
        .select()
        .single();

      if (createError) throw createError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create blog';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id: string, updates: BlogUpdate): Promise<Blog | null> => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update blog';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
    try {
      let query = supabase
        .from('blogs')
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
    createBlog,
    updateBlog,
    deleteBlog,
    checkSlugExists,
    loading,
    error,
  };
};
