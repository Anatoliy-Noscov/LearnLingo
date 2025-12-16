import React from 'react';
import styles from './Teachers.module.css';
import { useTeachers } from '../../hooks/useTeachers';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { Loader } from '../../components/Loader/Loader';
import { Filter } from '../../components/Filter/Filter';

export const Teachers: React.FC = () => {
  // ожидание, что useTeachers возвращает { teachers, isLoading, error, loadMore, hasMore }
  const { teachers, isLoading, error, loadMore, hasMore } = useTeachers();

  return (
    <div className={styles.container}>
      <header style={{ textAlign: 'center' }}>
        <h1 className={styles.title ?? ''}>Our Language Teachers</h1>
        <p className={styles.subtitle ?? ''}>Find the perfect teacher for your language journey</p>
      </header>

      <div className={styles.filterWrapper}>
        {/* Если ваш Filter ожидает props — можно адаптировать, сейчас рендерим базовый UI */}
        <Filter
          // если ваша версия Filter требует props, замените/передайте из useTeachers
          filters={{ language: '', level: '', price: 0 }}
          onFilterChange={() => {}}
        />
      </div>

      {isLoading && teachers.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Loader size="large" text="Loading teachers..." />
        </div>
      ) : null}

      {error && (
        <div style={{ textAlign: 'center', color: '#d63031', marginTop: 20 }}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      <section style={{ marginTop: 8 }}>
        <div className={styles.list}>
          {teachers.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>

        {teachers.length === 0 && !isLoading && !error && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p>No teachers found. Adjust filters or try again later.</p>
          </div>
        )}

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <button onClick={loadMore} disabled={isLoading} className={styles.loadMoreButton ?? ''}>
              {isLoading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Teachers;
