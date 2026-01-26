// src/hooks/useTeachers.ts
import { useEffect, useState, useCallback } from 'react';
import type { Teacher } from '../types';
import { getTeachers } from '../api/teachersApi';

interface TeachersResponse {
  data: Teacher[];
  total: number;
  page: number;
  perPage: number;
}

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

  const loadTeachers = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: TeachersResponse = await getTeachers(page);

      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setTeachers(prev => [...prev, ...response.data]);
      setHasMore(page * response.perPage < response.total);
    } catch {
      setError('Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const loadMore = () => {
    if (!isLoading && hasMore) setPage(prev => prev + 1);
  };

  return {
    teachers,
    isLoading,
    error,
    loadMore,
    hasMore,
  };
};
