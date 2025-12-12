// src/pages/Teachers/Teachers.tsx
import React from "react";
import { useTeachers } from "../../hooks/useTeachers";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";

import styles from "./Teachers.module.css"; // если есть css

export const Teachers: React.FC = () => {
  const { teachers, isLoading, error, loadMore, hasMore } = useTeachers();

  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} />
        ))}
      </div>

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};
