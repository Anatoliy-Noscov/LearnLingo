import React, { useState, useEffect } from 'react';
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import { Filter } from "../../components/Filter/Filter";
import { Loader } from "../../components/Loader/Loader"
import { useTeachers} from "../../hooks/useTeachers";
import type { Teacher } from "../../types";
import styles from "./Teachers.module.css";

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
        
        if (filters.level) {
            result = result.filter(teacher => teacher.levels.includes(filters.level));
        }

        if (filters.price) {
            result = result.filter(teacher => teacher.price_per_hour <= filters.price);
        }

        setFilteredTeachers(result);   
    }, [teachers, filters]);
    
    const handleLoadMore = () => {
        loadMoreTeachers();
    };

    // Исправлено: правильный тип для фильтров
    const handleFilterChange = (newFilters: { language: string; level: string; price: number }) => {
        setFilters(newFilters);
    };

    if (loading && teachers.length === 0) {
        return (
          <div className={styles.loadingContainer}>
            <Loader 
              size="large" 
              text="Loading teachers..."
            />
          </div>
        );
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
            <header className={styles.header}>
                <h1 className={styles.title}>Our Language Teachers</h1>
                <p className={styles.subtitle}>
                    Find the perfect teacher for your language journey
                </p>
            </header>

            <Filter
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            <section className={styles.results}>
                <div className={styles.resultsInfo}>
                    <p>
                        Found {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}
                        {filters.language && ` teaching ${filters.language}`}
                    </p>
                </div>
                
                <div className={styles.teachersGrid}>
                    {filteredTeachers.map(teacher => (
                        <TeacherCard 
                            key={teacher.id} 
                            teacher={teacher}
                            onFavoriteToggle={(teacherId, isFavorite) => {
                                console.log(`Teacher ${teacherId} ${isFavorite ? 'added to' : 'removed from'} favorites`);
                            }}
                        />
                    ))}
                </div>
            
                {filteredTeachers.length === 0 && !loading && (
                    <div className={styles.noResults}>
                        <h3>No teachers found</h3>
                        <p>Try adjusting your filters to see more results.</p>
                    </div>
                )}

                {hasMore && (
                    <div className={styles.loadMoreContainer}>
                        <button 
                            onClick={handleLoadMore}
                            disabled={loading}
                            className={styles.loadMoreButton}
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Teachers;