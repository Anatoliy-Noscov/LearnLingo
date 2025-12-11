// src/pages/Teachers.tsx

import { useTeachers } from '../hooks/useTeachers';
import { TeacherCard } from '../components/TeacherCard/TeacherCard';
import styles from './Teachers.module.css';

export const Teachers = () => {
  const { teachers, isLoading, error, loadMore, hasMore } = useTeachers();

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {error && <p className={styles.error}>{error}</p>}

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {!isLoading && hasMore && (
        <button
          type="button"
          className={styles.loadMoreBtn}
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
};
