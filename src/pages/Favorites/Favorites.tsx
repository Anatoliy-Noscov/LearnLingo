import React from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from '../../hooks/Favorites';
import { useTeachers } from '../../hooks/useTeachers';
import { TeacherCard } from '../../components/TeacherCard/TeacherCard';
import { Loader } from '../../components/Loader/Loader';
import styles from './Favorites.module.css';

export const Favorites: React.FC = () => {
    const { user } = useAuth();
    const { favorites, loading: favoritesLoading } = useFavorites();
    const { teachers, loading: teachersLoading } = useTeachers();
    
    const favoriteTeachers = teachers.filter(teacher => teacher.id && favorites.includes(teacher.id));

    if (!user) {
        return (
            <div className={styles.container}>
                <div className={styles.unauthorized}>
                    <h1>Favorites</h1>
                    <p>Please log in to view your favorite teachers.</p>
                </div>
            </div>
        );
    }

    if (favoritesLoading || teachersLoading) {
        return (
            <div className={styles.container}>
                <Loader
                    size='large'
                    text='Loading your favorites...'
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your Favorite Teachers</h1> {/* Исправлено: Teachers */}
                <p className={styles.subtitle}>
                    {favoriteTeachers.length > 0 
                        ? `You have ${favoriteTeachers.length} favorite teacher${favoriteTeachers.length !== 1 ? "s" : ''}` // Исправлено: length вместо lenght
                        : 'No favorite teachers yet'
                    }
                </p>
            </header>

            <div className={styles.favoritesGrid}>
                {favoriteTeachers.length > 0 ? (
                    favoriteTeachers.map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            onFavoriteToggle={() => {
                                console.log('Favorite toggle for teacher', teacher.id);
                            }}
                        />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>❤️</div>
                        <h3>No favorites yet</h3>
                        <p>Start exploring teachers and add them to your favorites!</p>
                        <a href="/teachers" className={styles.ctaButton}>
                            Browse Teachers
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;