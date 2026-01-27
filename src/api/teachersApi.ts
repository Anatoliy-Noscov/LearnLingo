import { ref, get, query, limitToFirst, startAt, orderByKey } from 'firebase/database';
import { database } from './firebase';
import type { Teacher } from '../types';

const TEACHERS_PER_PAGE = 4;

export interface FirebaseTeachersResponse {
  teachers: Teacher[];
  hasMore: boolean;
  lastKey?: string;
}

const normalizeTeachers = (
  raw: Record<string, Omit<Teacher, 'id'>> | Array<Omit<Teacher, 'id'>> | null
): Teacher[] => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw
      .map((item, idx) =>
        item && typeof item === 'object'
          ? ({ id: String(idx), ...item } as Teacher)
          : null
      )
      .filter(Boolean) as Teacher[];
  }

  return Object.entries(raw).map(([key, value]) => ({
    id: key,
    ...value,
  }));
};

export const getTeachers = async (
  lastKey?: string
): Promise<FirebaseTeachersResponse> => {
  const teachersRef = ref(database, 'teachers');

  const q = lastKey
    ? query(teachersRef, orderByKey(), startAt(lastKey), limitToFirst(TEACHERS_PER_PAGE + 1))
    : query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { teachers: [], hasMore: false };
  }

  let teachers = normalizeTeachers(snapshot.val());

  if (lastKey && teachers[0]?.id === lastKey) {
    teachers = teachers.slice(1);
  }

  const hasMore = teachers.length === TEACHERS_PER_PAGE;
  const newLastKey = teachers.at(-1)?.id;

  return {
    teachers,
    hasMore,
    lastKey: newLastKey,
  };
};
