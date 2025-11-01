import React, { useState, useEffect } from 'react';
import { TeacherCard } from "../../components/Filter/Filter";
import { Filter } from "../../components/Filter/Filter";
import { Loader } from "../../components/Loader/Loader"
import { useTeachers} from "../../hooks/useTeachers";
import { Teacher } from "../../types";
import styles from "./Teachers.module.css"


export const Teachers: React.FC = () => {

    const {
        teachers,
        loading,
        error,
        loadMoreTeachers,
        hasMore,
        filters,
        setFilters
    } = useTeachers();

    const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        if (teachers.length === 0) return;

        let result = teachers;

        if (filters.language) {
            result = result.filter(teacher => teacher.languages.includes(filters.language));
        }
        
        if ( filters.level) {
            result = result.filter(teacher => teacher.levels.includes(filters.level)
        );
        }

        if (filters.price) {
            result = result.filter(teacher => teacher.price_per_hour <= filters.price);
        }

        setFilteredTeachers(result);   
    }, [teachers, filters]);
    

    const handleLoadMore = () => {
        loadMoreTeachers();
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    if (loading && teachers.length === 0) {
        return (
            <div className={styles.loadingContainer}>
                <Loader />
                <p>Loading teachers...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h2>Error loading teachers</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className={styles.retryButton}>
                    Try Again
                </button>
            </div>
        );
    }



    return (
        <div className={styles.container}>
            {/*Заголовок страницы */}
            <header className={styles.header}>
                <h1 className={styles.title}>Our Language Teachers</h1>
                <p className={styles.subtitle}>
                    Find the perfect teacher for your language journey
                </p>
            </header>

            {/*Контент фильтрации */}
            {/*Передаем текущие фильтры и функции для их обновления */}
            <Filter
            filter={filters}
            onFilterChange={handleFilterChange} />

            {/*Секция с результатами */}
            <section className={styles.results}>
                {/*Показываем количество найденных преподавателей */}
                <div className={styles.resultsInfo}>
                    <p>
                        Found {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}
                        {filters.language && ` teaching ${filters.language}`}
                    </p>
                </div>
                {/*Список преподавателей */}
                <div className={styles.teachersGrid}>
                {/*Рендерим каждого преподавателя используя TeacherCard */}
                {/*Важно передать key - React использует его для оптимизации обновлений */}
                {filteredTeachers.map(teacher => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
                </div>
            {/* Сообщение если нет результатов */}
            {filteredTeachers.length === 0 && !loading && (
                <div className={styles.noResults}>
                    <h3>No teachers found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                </div>
            )}

            {/*Кнопка "Load More" для пагинации */}
            {/*Показываем если есть  еще данные для загрузки */}
            {hasMore && (
                <div className={styles.loadMoreContainer}>
                 <button onClick={handleLoadMore}
                 disabled={loading}
                 className={styles.loadMoreButton}>
                    {loading ? "Loading..." : "Load More"}

                 </button>
                </div>
            )}
            </section>

        </div>
    )
}

export default Teachers;