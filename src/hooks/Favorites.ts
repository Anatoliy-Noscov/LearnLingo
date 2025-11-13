import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth'; // Исправлено: правильный путь к хуку

export const useFavorites = () => {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const getStorageKey = useCallback(() => {
        return user ? `favorites_${user.uid}` : 'favorites_anonymous';
    }, [user]);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storageKey = getStorageKey();
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                    setFavorites(JSON.parse(stored));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };
        loadFavorites();
    }, [getStorageKey]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === getStorageKey() && event.newValue) {
                try {
                    setFavorites(JSON.parse(event.newValue));
                } catch (error) {
                    console.error('Error syncing favorites:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [getStorageKey]);

    // Добавление преподавателя в избранное
    const addToFavorites = useCallback((teacherId: string) => {
        if (!teacherId) return;

        setFavorites(prev => {
            const newFavorites = [...prev, teacherId];
            const storageKey = getStorageKey();
            
            try {
                localStorage.setItem(storageKey, JSON.stringify(newFavorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
            
            return newFavorites;
        });
    }, [getStorageKey]);

    // Удаление преподавателя из избранного
    const removeFromFavorites = useCallback((teacherId: string) => {
        if (!teacherId) return;

        setFavorites(prev => {
            const newFavorites = prev.filter(id => id !== teacherId);
            const storageKey = getStorageKey();

            try {
                localStorage.setItem(storageKey, JSON.stringify(newFavorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
            return newFavorites;
        });
    }, [getStorageKey]);

    // Переключение состояния избранного
    const toggleFavorite = useCallback((teacherId: string) => {
        if (!teacherId) return;

        if (favorites.includes(teacherId)) {
            removeFromFavorites(teacherId);
        } else {
            addToFavorites(teacherId);
        }
    }, [favorites, addToFavorites, removeFromFavorites]);

    // Проверка является ли преподаватель избранным
    const isFavorite = useCallback((teacherId: string) => {
        return favorites.includes(teacherId);
    }, [favorites]);

    // Очистка всех избранных
    const clearFavorites = useCallback(() => {
        setFavorites([]);
        const storageKey = getStorageKey();
        localStorage.removeItem(storageKey);
    }, [getStorageKey]);

    return {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        hasFavorites: favorites.length > 0
    };
};