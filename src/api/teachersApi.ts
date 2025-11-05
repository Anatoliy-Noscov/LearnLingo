import { ref, get, query, limitToFirst} from 'firebase/database';
import { database } from './firebase';
import { Teacher } from '../types';

const TEACHERS_PER_PAGE = 4;

export const getTeachers = async (page: number = 0): Promise<{teachers: Teacher[]; hasMore: boolean}> => {
    try {
        const teachersRef = ref(database, 'teachers');
        let teachersQuery = query(teachersRef, limitToFirst(TEACHERS_PER_PAGE * (page + 1)));

        const snapshot = await get(teachersQuery);

        if (snapshot.exists()) {
            const teachersData = snapshot.val();
            const teachers: Teacher[] = Object.keys(teachersData).map(key => ({
                id: key,
                ...teachersData[key]
            }));

            const totalTeachers = Object.keys(teachersData).length;
            const hasMore = totalTeachers >= TEACHERS_PER_PAGE * (page + 1);

            return {
                teachers: teachers.slice(page * TEACHERS_PER_PAGE),
                hasMore
            };
        }

        return {teachers: [], hasMore: false};

    } catch (error: any) {
        console.error('Error fetching teachers:', error);
        throw new Error('Failed to fetch teachers');
    }
};

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
        console.error('Error fetching teacher:', error);
        throw new Error('Failed to fetch teacher');
    }
}

export const getFavoriteTeachers = async (favoriteIds: string[]): Promise<Teacher[]> => {
    try {
        const teachers: Teacher[] = [];

        for (const teacherId of favoriteIds) {
            const teacher = await getTeacherById(teacherId);
            if (teacher) {
                teachers.push(teacher);
            }
        }

        return teachers;
    } catch (error: any) {
        console.error('Error fetching favorite teachers:', error);
        throw new Error('Failed to fetch favorite teachers');
    }
}