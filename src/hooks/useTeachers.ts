import {useState, useEffect, useCallback} from 'react';
import {Teacher} from '../types';
import { getTeachers} from '../api/teachersApi';


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

    const [filters, setFilters] = useState<Filters>({
        language: '',
        level: '',
        price: 0
    });


    const loadTeachers = useCallback(async (page: number = 0) => {

        if(loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getTeachers(page);


        if (page === 0) {
            setTeachers(result.teachers);
        } else {
            setTeachers(prev => [...prev, ...result.teachers]);
        }
        setHasMore(result.hasMore);
        setCurrentPage(page);
        } catch (err: any) {
            setError(err.message || 'Failed to load teachers');
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore]);

    const loadMoreTeachers = useCallback(() => {
        loadTeachers(currentPage + 1);
    }, [currentPage, loadTeachers]);

    useEffect(() => {
        loadTeachers(0);
    }, []);

    return {
        teachers,
        loading, 
        error,
        hasMore,
        filters,
        setFilters,
        loadMoreTeachers,
    };

}