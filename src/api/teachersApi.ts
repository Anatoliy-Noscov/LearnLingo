import { ref, get, query, limitToFirst, startAt, orderByKey } from 'firebase/database';
import { database } from './firebase';
import type { Teacher } from '../types';

const TEACHERS_PER_PAGE = 4;

// Интерфейс для ответа API
interface TeachersResponse {
  teachers: Teacher[];
  hasMore: boolean;
  lastKey?: string;
}

// Получение преподавателей с пагинацией
export const getTeachers = async (page: number = 0, lastKey?: string): Promise<TeachersResponse> => {
  try {
    const teachersRef = ref(database, 'teachers');
    
    let teachersQuery;
    if (page === 0) {
      // Первая страница
      teachersQuery = query(
        teachersRef,
        orderByKey(),
        limitToFirst(TEACHERS_PER_PAGE)
      );
    } else {
      // Последующие страницы
      teachersQuery = query(
        teachersRef,
        orderByKey(),
        startAt(lastKey),
        limitToFirst(TEACHERS_PER_PAGE + 1) // +1 чтобы проверить есть ли еще данные
      );
    }

    const snapshot = await get(teachersQuery);
    
    if (!snapshot.exists()) {
      return { teachers: [], hasMore: false };
    }

    const teachersData = snapshot.val();
    const teacherKeys = Object.keys(teachersData);
    
    // Преобразуем данные в массив Teacher
    const teachers: Teacher[] = teacherKeys.map(key => ({
      id: key,
      ...teachersData[key]
    }));

    // Определяем есть ли еще данные
    let hasMore = false;
    let newLastKey: string | undefined;

    if (page === 0) {
      hasMore = teacherKeys.length === TEACHERS_PER_PAGE;
      newLastKey = teacherKeys[teacherKeys.length - 1];
    } else {
      // Для последующих страниц проверяем есть ли дополнительный элемент
      hasMore = teacherKeys.length > TEACHERS_PER_PAGE;
      newLastKey = teacherKeys[teacherKeys.length - (hasMore ? 2 : 1)];
      
      // Убираем последний элемент если он был только для проверки
      if (hasMore) {
        teachers.pop();
      }
    }

    return {
      teachers,
      hasMore,
      lastKey: newLastKey
    };
  } catch (error: any) {
    console.error('Error fetching teachers from Firebase:', error);
    throw new Error(`Failed to fetch teachers: ${error.message}`);
  }
};

// Получение преподавателя по ID
export const getTeacherById = async (teacherId: string): Promise<Teacher | null> => {
  try {
    const teacherRef = ref(database, `teachers/${teacherId}`);
    const snapshot = await get(teacherRef);
    
    if (snapshot.exists()) {
      return {
        id: teacherId,
        ...snapshot.val()
      };
    }
    
    return null;
  } catch (error: any) {
    console.error('Error fetching teacher from Firebase:', error);
    throw new Error(`Failed to fetch teacher: ${error.message}`);
  }
};

// Получение избранных преподавателей
export const getFavoriteTeachers = async (favoriteIds: string[]): Promise<Teacher[]> => {
  try {
    // Для эффективности можно загружать всех избранных преподавателей одним запросом
    const teachers: Teacher[] = [];
    
    for (const teacherId of favoriteIds) {
      const teacher = await getTeacherById(teacherId);
      if (teacher) {
        teachers.push(teacher);
      }
    }
    
    return teachers;
  } catch (error: any) {
    console.error('Error fetching favorite teachers from Firebase:', error);
    throw new Error(`Failed to fetch favorite teachers: ${error.message}`);
  }
};

// Поиск преподавателей по фильтрам
export const searchTeachers = async (filters: {
  language?: string;
  level?: string;
  maxPrice?: number;
}): Promise<Teacher[]> => {
  try {
    // Получаем всех преподавателей для фильтрации на клиенте
    // В реальном приложении лучше делать это на сервере
    const teachersRef = ref(database, 'teachers');
    const snapshot = await get(teachersRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const teachersData = snapshot.val();
    const teachers: Teacher[] = Object.keys(teachersData).map(key => ({
      id: key,
      ...teachersData[key]
    }));

    // Применяем фильтры
    let filteredTeachers = teachers;

    if (filters.language) {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.languages.includes(filters.language!)
      );
    }

    if (filters.level) {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.levels.includes(filters.level!)
      );
    }

    if (filters.maxPrice && filters.maxPrice > 0) {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.price_per_hour <= filters.maxPrice!
      );
    }

    return filteredTeachers;
  } catch (error: any) {
    console.error('Error searching teachers in Firebase:', error);
    throw new Error(`Failed to search teachers: ${error.message}`);
  }
};