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
 * Нормализует данные snapshot в массив Teacher.
 * Поддерживает разные форматы (объект ключ->value или массив).
 */
const normalizeTeachers = (raw: any): Teacher[] => {
  if (!raw) return [];

  // Если это массивоподобная структура
  if (Array.isArray(raw)) {
    return raw
      .map((item, idx) => item && typeof item === 'object' ? ({ id: String(idx), ...item } as Teacher) : null)
      .filter(Boolean) as Teacher[];
  }

  // Обычный объект: ключи -> записи
  return Object.entries(raw).map(([key, value]) => ({
    id: key,
    ...(value as any)
  })) as Teacher[];
};

/**
 * Получение списка преподавателей с поддержкой пагинации по ключу.
 * Принцип:
 *  - Для первой страницы запрашиваем limit = TEACHERS_PER_PAGE
 *  - Для следующих страниц запрашиваем limit = TEACHERS_PER_PAGE + 1 и startAt(lastKey)
 *    затем удаляем первый элемент (это предыдущий lastKey)
 */
export const getTeachers = async (page: number = 0, lastKey?: string): Promise<TeachersResponse> => {
  try {
    const teachersRef = ref(database, 'teachers');
    let q;

    if (!lastKey || page === 0) {
      // первая страница или при сбросе пагинации
      q = query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));
    } else {
      // последующие страницы — запрашиваем +1 элемент чтобы понять есть ли дальше
      q = query(teachersRef, orderByKey(), startAt(lastKey), limitToFirst(TEACHERS_PER_PAGE + 1));
    }

    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return { teachers: [], hasMore: false };
    }

    const raw = snapshot.val();
    let teachers = normalizeTeachers(raw);

    // Если это не первая страница — первый элемент будет повтором lastKey, убираем его
    if (lastKey && teachers.length > 0) {
      // Если первый ключ === lastKey — удаляем
      if (teachers[0].id === lastKey) {
        teachers = teachers.slice(1);
      } else {
        // Если по какой-то причине первая запись не равна lastKey,
        // всё равно оставляем как есть (без удаления).
      }
    }

    // Определяем hasMore и newLastKey
    const hasMore = teachers.length === TEACHERS_PER_PAGE;
    const newLastKey = teachers.length > 0 ? teachers[teachers.length - 1].id : undefined;

    return {
      teachers,
      hasMore,
      lastKey: newLastKey
    };
  } catch (error: any) {
    console.error('getTeachers error:', error);
    throw new Error(error?.message || 'Failed to fetch teachers');
  }
};

/**
 * Получение одного преподавателя по id
 */
export const getTeacherById = async (teacherId: string): Promise<Teacher | null> => {
  try {
    if (!teacherId) return null;
    const teacherRef = ref(database, `teachers/${teacherId}`);
    const snapshot = await get(teacherRef);

    if (!snapshot.exists()) return null;

    const raw = snapshot.val();
    return { id: teacherId, ...(raw as any) } as Teacher;
  } catch (error: any) {
    console.error('getTeacherById error:', error);
    throw new Error(error?.message || 'Failed to fetch teacher');
  }
};

/**
 * Получение набора преподавателей по массиву id (параллельно)
 */
export const getFavoriteTeachers = async (favoriteIds: string[]): Promise<Teacher[]> => {
  try {
    if (!favoriteIds || favoriteIds.length === 0) return [];
    const promises = favoriteIds.map((id) => getTeacherById(id));
    const results = await Promise.all(promises);
    return results.filter(Boolean) as Teacher[];
  } catch (error: any) {
    console.error('getFavoriteTeachers error:', error);
    throw new Error(error?.message || 'Failed to fetch favorite teachers');
  }
};

/**
 * Клиентская фильтрация (используется для простоты).
 * При большом объёме данных — рекомендую реализовать серверную фильтрацию.
 */
export const searchTeachers = async (filters: {
  language?: string;
  level?: string;
  maxPrice?: number;
}): Promise<Teacher[]> => {
  try {
    const teachersRef = ref(database, 'teachers');
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) return [];

    const raw = snapshot.val();
    let teachers = normalizeTeachers(raw);

    if (filters.language) {
      teachers = teachers.filter(t => Array.isArray(t.languages) && t.languages.includes(filters.language!));
    }

    if (filters.level) {
      teachers = teachers.filter(t => Array.isArray(t.levels) && t.levels.includes(filters.level!));
    }

    if (typeof filters.maxPrice === 'number' && filters.maxPrice > 0) {
      teachers = teachers.filter(t => typeof t.price_per_hour === 'number' && t.price_per_hour <= filters.maxPrice!);
    }

    return teachers;
  } catch (error: any) {
    console.error('searchTeachers error:', error);
    throw new Error(error?.message || 'Failed to search teachers');
  }
};
