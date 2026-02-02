import {
  ref,
  get,
  query,
  limitToFirst,
  startAt,
  orderByKey,
} from 'firebase/database';
import { database } from './firebase';
import type { Teacher } from '../types';
import type { DataSnapshot } from 'firebase/database';

const TEACHERS_PER_PAGE = 4;

export interface TeachersResponse {
  teachers: Teacher[];
  hasMore: boolean;
  lastKey?: string;
}

const normalizeTeachers = (snapshot: DataSnapshot): Teacher[] => {
  if (!snapshot.exists()) return [];

  const raw = snapshot.val() as Record<string, Omit<Teacher, 'id'>>;

  return Object.entries(raw).map(([id, value]) => ({
    id,
    ...value,
  }));
};

export const getTeachers = async (
  lastKey?: string
): Promise<TeachersResponse> => {
  const teachersRef = ref(database, 'teachers');

  const q = lastKey
    ? query(
        teachersRef,
        orderByKey(),
        startAt(lastKey),
        limitToFirst(TEACHERS_PER_PAGE + 1)
      )
    : query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));

  const snapshot = await get(q);

  const teachers = normalizeTeachers(snapshot);

  if (lastKey && teachers.length) teachers.shift();

  const hasMore = teachers.length === TEACHERS_PER_PAGE;
  const newLastKey = teachers.at(-1)?.id;

  return {
    teachers,
    hasMore,
    lastKey: newLastKey,
  };
};
