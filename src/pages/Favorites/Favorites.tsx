import React from 'react';
import styles from './Favorites.module.css';
import { useTeachers } from '../../hooks/useTeachers';
import { useFavorites } from '../../hooks/Favorites';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { Loader } from '../../components/Loader/Loader';

export const Favorites: React.FC = () => {
  const { teachers, isLoading } = useTeachers();
  const { favorites } = useFavorites();

  // Получаем полные данные преподавателей, соответствующие ID в favorites
  const favoriteTeachers = teachers.filter(t => t.id && favorites.includes(t.id));

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader size="large" text="Loading your favorites..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Favorite Teachers</h1>
        <p className={styles.subtitle}>
          {favoriteTeachers.length > 0 ? `You have ${favoriteTeachers.length} favorite teacher${favoriteTeachers.length !== 1 ? 's' : ''}` : 'All teachers you add will appear here.'}
        </p>
      </header>

      {favoriteTeachers.length === 0 ? (
        <div className={styles.empty}>
          <img src="/images/empty-favorites.png" alt="No favorites" className={styles.emptyImg} />
          <h3>No favorites yet</h3>
          <p>Add teachers to your favorites to see them here.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteTeachers.map(t => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
