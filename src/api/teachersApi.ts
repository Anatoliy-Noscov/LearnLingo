// src/api/teachersApi.ts
import { ref, get, query, limitToFirst, startAt, orderByKey } from 'firebase/database';
import { database } from './firebase';
import type { Teacher } from '../types';

const TEACHERS_PER_PAGE = 4;

export interface TeachersResponse {
  teachers: Teacher[];
  hasMore: boolean;
  lastKey?: string;
}

/**
 * Нормализует данные snapshot в массив Teacher
 */
const normalizeTeachers = (raw: Record<string, Omit<Teacher, 'id'>> | Array<Omit<Teacher, 'id'>> | null): Teacher[] => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw
      .map((item, idx) =>
        item && typeof item === 'object' ? ({ id: String(idx), ...item } as Teacher) : null
      )
      .filter(Boolean) as Teacher[];
  }

  // Обычный объект: ключи -> записи
  return Object.entries(raw).map(([key, value]) => ({
    id: key,
    ...value,
  })) as Teacher[];
};

/**
 * Получение списка преподавателей с поддержкой пагинации
 */
export const getTeachers = async (
  page: number = 0,
  lastKey?: string
): Promise<TeachersResponse> => {
  try {
    const teachersRef = ref(database, 'teachers');
    let q;

    if (!lastKey || page === 0) {
      // Первая страница
      q = query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));
    } else {
      // Следующие страницы
      q = query(teachersRef, orderByKey(), startAt(lastKey), limitToFirst(TEACHERS_PER_PAGE + 1));
    }

    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return { teachers: [], hasMore: false };
    }

    let teachers = normalizeTeachers(snapshot.val());

    // Если не первая страница — первый элемент повторяет lastKey, удаляем его
    if (lastKey && teachers.length > 0 && teachers[0].id === lastKey) {
      teachers = teachers.slice(1);
    }

    // Определяем, есть ли еще записи
    const hasMore = teachers.length === TEACHERS_PER_PAGE;
    const newLastKey = teachers.length > 0 ? teachers[teachers.length - 1].id : undefined;

    return {
      teachers,
      hasMore,
      lastKey: newLastKey,
    };
  } catch (_error: unknown) {
    console.error('getTeachers error:', _error);
    throw new Error('Failed to fetch teachers');
  }
};

/**
 * Получение одного преподавателя по id
 */
export const getTeacherById = async (teacherId: string): Promise<Teacher | null> => {
  try {
    if (!teacherId) return null;
    const snapshot = await get(ref(database, `teachers/${teacherId}`));

    if (!snapshot.exists()) return null;

    const raw = snapshot.val();
    return { id: teacherId, ...(raw as Omit<Teacher, 'id'>) };
  } catch (_error: unknown) {
    console.error('getTeacherById error:', _error);
    throw new Error('Failed to fetch teacher');
  }
};

/**
 * Получение преподавателей по массиву id (например, избранные)
 */
export const getFavoriteTeachers = async (favoriteIds: string[]): Promise<Teacher[]> => {
  if (!favoriteIds || favoriteIds.length === 0) return [];

  const promises = favoriteIds.map(id => getTeacherById(id));
  const results = await Promise.all(promises);
  return results.filter(Boolean) as Teacher[];
};

/**
 * Фильтрация преподавателей на клиенте
 */
export const searchTeachers = async (filters: {
  language?: string;
  level?: string;
  maxPrice?: number;
}): Promise<Teacher[]> => {
  const snapshot = await get(ref(database, 'teachers'));
  if (!snapshot.exists()) return [];

  let teachers = normalizeTeachers(snapshot.val());

  if (filters.language) {
    teachers = teachers.filter(t => t.languages.includes(filters.language!));
  }

  if (filters.level) {
    teachers = teachers.filter(t => t.levels.includes(filters.level!));
  }

  if (typeof filters.maxPrice === 'number') {
    teachers = teachers.filter(t => t.price_per_hour <= filters.maxPrice!);
  }

  return teachers;
};
