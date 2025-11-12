import { useState, useEffect, useCallback } from 'react';
import { Teacher } from '../types';
import { getTeachers, searchTeachers } from '../api/teachersApi';

export interface Filters {
  language: string;
  level: string;
  price: number;
}

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [lastKey, setLastKey] = useState<string | undefined>();
  
  const [filters, setFilters] = useState<Filters>({
    language: '',
    level: '',
    price: 0
  });

  // Функция для загрузки преподавателей
  const loadTeachers = useCallback(async (page: number = 0, reset: boolean = false) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getTeachers(page, page === 0 ? undefined : lastKey);
      
      if (reset || page === 0) {
        setTeachers(result.teachers);
      } else {
        setTeachers(prev => [...prev, ...result.teachers]);
      }
      
      setHasMore(result.hasMore);
      setLastKey(result.lastKey);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || 'Failed to load teachers');
      console.error('Error in loadTeachers:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, lastKey]);

  // Функция для загрузки следующей страницы
  const loadMoreTeachers = useCallback(() => {
    if (!hasMore || loading) return;
    loadTeachers(currentPage + 1);
  }, [currentPage, hasMore, loading, loadTeachers]);

  // Функция для применения фильтров
  const applyFilters = useCallback(async (newFilters: Filters) => {
    setLoading(true);
    setError(null);

    try {
      // Если фильтры пустые, загружаем обычным способом
      if (!newFilters.language && !newFilters.level && newFilters.price === 0) {
        setFilters(newFilters);
        loadTeachers(0, true);
        return;
      }

      // Иначе выполняем поиск с фильтрами
      const searchResults = await searchTeachers({
        language: newFilters.language || undefined,
        level: newFilters.level || undefined,
        maxPrice: newFilters.price > 0 ? newFilters.price : undefined
      });

      setTeachers(searchResults);
      setFilters(newFilters);
      setHasMore(false); // При фильтрации отключаем пагинацию
      setCurrentPage(0);
    } catch (err: any) {
      setError(err.message || 'Failed to apply filters');
      console.error('Error in applyFilters:', err);
    } finally {
      setLoading(false);
    }
  }, [loadTeachers]);

  // Функция для сброса фильтров
  const resetFilters = useCallback(() => {
    setFilters({
      language: '',
      level: '',
      price: 0
    });
    loadTeachers(0, true);
  }, [loadTeachers]);

  // Функция для повторной попытки загрузки
  const retryLoad = useCallback(() => {
    loadTeachers(0, true);
  }, [loadTeachers]);

  // Эффект для первоначальной загрузки
  useEffect(() => {
    loadTeachers(0, true);
  }, []);

  return {
    // Данные
    teachers,
    loading,
    error,
    hasMore,
    filters,
    
    // Действия
    setFilters: applyFilters,
    resetFilters,
    loadMoreTeachers,
    retryLoad,
    
    // Состояние
    currentPage
  };
};