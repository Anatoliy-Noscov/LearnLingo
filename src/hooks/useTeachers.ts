import { useEffect, useState } from 'react';
import type { Teacher } from '../types';
import { getTeachers } from '../api/teachersApi';

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getTeachers(lastKey);

      setTeachers(prev => [...prev, ...response.teachers]);
      setLastKey(response.lastKey);
      setHasMore(response.hasMore);
    } catch {
      setError('Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teachers,
    isLoading,
    error,
    loadMore,
    hasMore,
  };
};
