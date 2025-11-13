import React, { useState, useCallback, memo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useFavorites } from '../../hooks/Favorites';
import { BookingModal } from '../BookingModal/BookingModal';
import type { Teacher } from '../../types';
import styles from './TeacherCard.module.css';

interface TeacherCardProps {
  teacher: Teacher;
  onFavoriteToggle?: (teacherId: string, isFavorite: boolean) => void;
}

// Оптимизируем компонент с помощью memo чтобы избежать лишних ререндеров
export const TeacherCard: React.FC<TeacherCardProps> = memo(({ 
  teacher, 
  onFavoriteToggle 
}) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, loading: favoritesLoading } = useFavorites();
  
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

  // Обработчики обернуты в useCallback чтобы сохранять ссылки между рендерами
  const handleFavoriteClick = useCallback(() => {
    if (!user) {
      alert('Please log in to add teachers to favorites');
      return;
    }

    if (!teacher.id) {
      console.error('Teacher ID is missing');
      return;
    }

    toggleFavorite(teacher.id);
    
    if (onFavoriteToggle && teacher.id) {
      onFavoriteToggle(teacher.id, !isFavorite(teacher.id));
    }
  }, [user, teacher.id, toggleFavorite, onFavoriteToggle, isFavorite]);

  const handleReadMoreClick = useCallback(() => {
    setShowDetails(prev => !prev);
  }, []);

  const handleBookLessonClick = useCallback(() => {
    if (!user) {
      alert('Please log in to book a lesson');
      return;
    }
    setShowBookingModal(true);
  }, [user]);

  const handleBookingSubmit = useCallback(async (bookingData: any) => {
    try {
      console.log('Booking submitted:', {
        teacher: teacher.id,
        teacherName: `${teacher.name} ${teacher.surname}`,
        ...bookingData
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Booking request sent to ${teacher.name} ${teacher.surname}! They will contact you soon.`);
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error submitting your booking. Please try again.');
      throw error;
    }
  }, [teacher.id, teacher.name, teacher.surname]);

  // Функция рендеринга звезд также обернута в useCallback
  const renderRatingStars = useCallback((rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className={styles.starFull}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.starHalf}>★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>★</span>);
    }

    return (
      <div className={styles.ratingStars}>
        {stars}
        <span className={styles.ratingValue}>({rating})</span>
      </div>
    );
  }, []);

  // Функция для закрытия модалки
  const handleCloseBookingModal = useCallback(() => {
    setShowBookingModal(false);
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.avatarSection}>
            <img 
              src={teacher.avatar_url} 
              alt={`${teacher.name} ${teacher.surname}`}
              className={styles.avatar}
              loading="lazy" // Ленивая загрузка изображений
            />
            <button 
              className={`${styles.favoriteButton} ${
                teacher.id && isFavorite(teacher.id) ? styles.favoriteActive : ''
              }`}
              onClick={handleFavoriteClick}
              disabled={favoritesLoading || !teacher.id}
              aria-label={
                teacher.id && isFavorite(teacher.id) 
                  ? 'Remove from favorites' 
                  : 'Add to favorites'
              }
            >
              {favoritesLoading ? '⋯' : '♥'}
            </button>
          </div>

          <div className={styles.teacherInfo}>
            <h3 className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </h3>
            
            <div className={styles.languages}>
              <span className={styles.infoLabel}>Languages:</span>
              <div className={styles.languageTags}>
                {teacher.languages.map((language, index) => (
                  <span key={index} className={styles.languageTag}>
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.rating}>
              <span className={styles.infoLabel}>Rating:</span>
              {renderRatingStars(teacher.rating)}
            </div>

            <div className={styles.price}>
              <span className={styles.infoLabel}>Price / hour:</span>
              <span className={styles.priceValue}>${teacher.price_per_hour}</span>
            </div>

            <div className={styles.lessonsCount}>
              <span className={styles.infoLabel}>Lessons done:</span>
              <span>{teacher.lessons_done.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button 
            className={styles.readMoreButton}
            onClick={handleReadMoreClick}
          >
            {showDetails ? 'Show less' : 'Read more'}
          </button>
          <button 
            className={styles.bookLessonButton}
            onClick={handleBookLessonClick}
          >
            Book trial lesson
          </button>
        </div>

        {showDetails && (
          <div className={styles.detailsSection}>
            <div className={styles.lessonInfo}>
              <h4>Lesson Information</h4>
              <p>{teacher.lesson_info}</p>
            </div>

            <div className={styles.conditions}>
              <h4>Teaching Conditions</h4>
              <ul>
                {teacher.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>

            <div className={styles.levels}>
              <h4>Available Levels</h4>
              <div className={styles.levelTags}>
                {teacher.levels.map((level, index) => (
                  <span key={index} className={styles.levelTag}>
                    {level}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.reviews}>
              <h4>Student Reviews</h4>
              <div className={styles.reviewsList}>
                {teacher.reviews.map((review, index) => (
                  <div key={index} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <strong>{review.reviewer_name}</strong>
                      {renderRatingStars(review.reviewer_rating)}
                    </div>
                    <p className={styles.reviewComment}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        teacher={teacher}
        onBookingSubmit={handleBookingSubmit}
      />
    </>
  );
});

// Отображаем имя компонента в React DevTools
TeacherCard.displayName = 'TeacherCard';

export default TeacherCard;