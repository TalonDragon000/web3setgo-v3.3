import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface FooterTarget {
  title: string;
  slug: string;
  description: string;
}

interface UseFooterTargetProps {
  footerType: string | null;
  targetSlug: string | null;
}

export const useFooterTarget = ({ footerType, targetSlug }: UseFooterTargetProps) => {
  const [target, setTarget] = useState<FooterTarget | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!footerType || !targetSlug) {
      setTarget(null);
      setLoading(false);
      return;
    }

    const fetchTarget = async () => {
      try {
        setLoading(true);
        setError(null);

        const tableName = footerType === 'blog' ? 'blogs' : 'simulations';

        const { data, error: fetchError } = await supabase
          .from(tableName)
          .select('title, slug, description')
          .eq('slug', targetSlug)
          .eq('published', true)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (data) {
          setTarget(data);
        } else {
          setTarget(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch target content');
        setTarget(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTarget();
  }, [footerType, targetSlug]);

  return { target, loading, error };
};
