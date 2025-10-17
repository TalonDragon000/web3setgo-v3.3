import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PublishedBlog {
  id: string;
  slug: string;
  title: string;
}

export const usePublishedBlogs = () => {
  const [blogs, setBlogs] = useState<PublishedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('blogs')
          .select('id, slug, title')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setBlogs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch published blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  return { blogs, loading, error };
};
