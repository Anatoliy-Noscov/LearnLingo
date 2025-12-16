// src/pages/Teachers/Teachers.tsx
import React from 'react';
import styles from './Teachers.module.css';

import { useTeachers } from '../../hooks/useTeachers';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { Loader } from '../../components/Loader/Loader';
import { Filter } from '../../components/Filter/Filter';

export const Teachers: React.FC = () => {
  const { teachers, isLoading, error, loadMore, hasMore } = useTeachers();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Our Language Teachers</h1>
        <p className={styles.subtitle}>
          Find the perfect teacher for your language journey
        </p>
      </header>

      {/* FILTER */}
      <div className={styles.filterWrapper}>
        <Filter
          filters={{ language: '', level: '', price: 0 }}
          onFilterChange={() => {}}
        />
      </div>

      {/* INITIAL LOADING */}
      {isLoading && teachers.length === 0 && (
        <div className={styles.center}>
          <Loader size="large" text="Loading teachers..." />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* TEACHERS LIST */}
      <div className={styles.list}>
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {/* EMPTY */}
      {!isLoading && !error && teachers.length === 0 && (
        <p className={styles.empty}>No teachers found</p>
      )}

      {/* LOAD MORE */}
      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Teachers;
