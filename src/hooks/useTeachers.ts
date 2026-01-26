// src/hooks/useTeachers.ts

import { useEffect, useState } from 'react';
import type { Teacher } from '../types';
import { fetchTeachers } from '../api/teachersApi';

interface UseTeachersResult {
  teachers: Teacher[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

export const useTeachers = (): UseTeachersResult => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadTeachers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchTeachers(page);

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setTeachers(prev => [...prev, ...data]);
    } catch (e) {
      setError('Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    setPage(prev => prev + 1);
  };

  return {
    teachers,
    isLoading,
    error,
    loadMore,
    hasMore,
  };
};
