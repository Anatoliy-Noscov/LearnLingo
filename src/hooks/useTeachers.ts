import { useEffect, useState } from 'react';
import type { Teacher } from '../types';
import { getTeachers } from '../api/teachersApi';

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const response = await getTeachers(lastKey);

    setTeachers(prev => [...prev, ...response.teachers]);
    setLastKey(response.lastKey);
    setHasMore(response.hasMore);

    setIsLoading(false);
  };

  return {
    teachers,
    loadMore: load,
    hasMore,
    isLoading,
  };
};
