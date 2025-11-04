// Импорты: все необходимое для работы карточки преподавателя
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import styles from './TeacherCard.module.css';

// Интерфейс для пропсов компонента TeacherCard
interface TeacherCardProps {
  teacher: Teacher; // Объект преподавателя с полями из types.ts
  onFavoriteToggle?: (teacherId: string, isFavorite: boolean) => void; // Колбэк для избранного
}

// Компонент TeacherCard: отображает карточку преподавателя с полной информацией
export const TeacherCard: React.FC<TeacherCardProps> = ({ 
  teacher, 
  onFavoriteToggle 
}) => {
  // Используем хук аутентификации для проверки авторизации пользователя
  const { user } = useAuth();
  
  // Состояние для отслеживания добавления в избранное
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  // Состояние для управления отображением детальной информации
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  // Состояние для управления модальным окном бронирования
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

  // Эффект для загрузки состояния избранного из localStorage при монтировании компонента
  // useEffect с пустым массивом зависимостей = componentDidMount
  useEffect(() => {
    if (!user || !teacher.id) return;
    
    // Загружаем избранное из localStorage
    // В реальном приложении это могло бы быть из базы данных
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isTeacherFavorite = favorites.includes(teacher.id);
    setIsFavorite(isTeacherFavorite);
  }, [user, teacher.id]); // Зависимости: эффект сработает при изменении user или teacher.id

  // Обработчик клика по кнопке "сердца" (избранное)
  const handleFavoriteClick = () => {
    // Если пользователь не авторизован - показываем уведомление
    if (!user) {
      // TODO: Показать модальное окно с предложением авторизоваться
      alert('Please log in to add teachers to favorites');
      return;
    }

    // Если teacher.id отсутствует - выходим (защита от ошибок)
    if (!teacher.id) return;

    // Получаем текущий список избранного из localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites: string[];

    if (isFavorite) {
      // Удаляем преподавателя из избранного
      newFavorites = favorites.filter((id: string) => id !== teacher.id);
    } else {
      // Добавляем преподавателя в избранное
      newFavorites = [...favorites, teacher.id];
    }

    // Сохраняем обновленный список в localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Обновляем состояние компонента
    setIsFavorite(!isFavorite);
    
    // Вызываем колбэк если он передан (для уведомления родительского компонента)
    if (onFavoriteToggle) {
      onFavoriteToggle(teacher.id, !isFavorite);
    }
  };

  // Обработчик клика по кнопке "Read more"
  const handleReadMoreClick = () => {
    setShowDetails(!showDetails);
  };

  // Обработчик клика по кнопке бронирования урока
  const handleBookLessonClick = () => {
    if (!user) {
      // TODO: Показать модальное окно авторизации
      alert('Please log in to book a lesson');
      return;
    }
    setShowBookingModal(true);
  };

  // Функция для рендеринга рейтинга в виде звезд
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Рендерим полные звезды
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className={styles.starFull}>★</span>);
    }

    // Рендерим половину звезды если нужно
    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.starHalf}>★</span>);
    }

    // Рендерим пустые звезды чтобы всего было 5
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
  };

  // Основной рендер компонента
  return (
    <div className={styles.card}>
      {/* Верхняя часть карточки - аватар и основная информация */}
      <div className={styles.cardHeader}>
        {/* Контейнер для аватара и кнопки избранного */}
        <div className={styles.avatarSection}>
          <img 
            src={teacher.avatar_url} 
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.avatar}
          />
          {/* Кнопка избранного с условным классом для активного состояния */}
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
        </div>

        {/* Основная информация о преподавателе */}
        <div className={styles.teacherInfo}>
          <h3 className={styles.teacherName}>
            {teacher.name} {teacher.surname}
          </h3>
          
          {/* Языки которые преподает учитель */}
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

          {/* Рейтинг в виде звезд */}
          <div className={styles.rating}>
            <span className={styles.infoLabel}>Rating:</span>
            {renderRatingStars(teacher.rating)}
          </div>

          {/* Цена за урок */}
          <div className={styles.price}>
            <span className={styles.infoLabel}>Price / hour:</span>
            <span className={styles.priceValue}>${teacher.price_per_hour}</span>
          </div>

          {/* Количество проведенных уроков */}
          <div className={styles.lessonsCount}>
            <span className={styles.infoLabel}>Lessons done:</span>
            <span>{teacher.lessons_done.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
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

      {/* Детальная информация (показывается при клике на Read more) */}
      {showDetails && (
        <div className={styles.detailsSection}>
          {/* Информация об уроках */}
          <div className={styles.lessonInfo}>
            <h4>Lesson Information</h4>
            <p>{teacher.lesson_info}</p>
          </div>

          {/* Условия преподавания */}
          <div className={styles.conditions}>
            <h4>Teaching Conditions</h4>
            <ul>
              {teacher.conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>

          {/* Уровни которые преподает учитель */}
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

          {/* Отзывы студентов */}
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

      {/* TODO: Модальное окно бронирования урока */}
      {/* {showBookingModal && (
        <BookingModal 
          teacher={teacher}
          onClose={() => setShowBookingModal(false)}
        />
      )} */}
    </div>
  );
};

export default TeacherCard;