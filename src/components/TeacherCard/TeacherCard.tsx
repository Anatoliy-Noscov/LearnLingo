import React, { useState, useCallback } from 'react';
import styles from './TeacherCard.module.css';
import { Teacher } from '../../types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import BookingModal from '../BookingModal/BookingModal';
import { useFavorites } from '../../hooks/Favorites';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

interface Props {
  teacher: Teacher;
}

const TeacherCard: React.FC<Props> = ({ teacher }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, loading } = useFavorites();
  const { addToast } = useToast();

  const [expanded, setExpanded] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const favorite = teacher.id ? isFavorite(teacher.id) : false;

  const handleToggleFavorite = useCallback(() => {
    if (!user) {
      addToast('You must be logged in to add favorites', 'info');
      return;
    }
    if (!teacher.id) return;

    toggleFavorite(teacher.id);
  }, [user, teacher.id, toggleFavorite, addToast]);

  const handleReadMore = () => setExpanded(prev => !prev);

  const handleOpenBooking = () => {
    if (!user) {
      addToast('Please log in to book a trial lesson', 'info');
      return;
    }
    setBookingOpen(true);
  };

  const handleBookingSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    message?: string;
  }) => {
    console.log('Booking request:', {
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      ...data,
    });

    addToast(
      'Booking request sent. The teacher will contact you soon.',
      'success',
      6000
    );
  };

  return (
    <>
      <article className={styles.card}>
 amendment

        {/* FAVORITE */}
        <button
          className={styles.favoriteBtn}
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          disabled={loading}
        >
          {favorite ? (
            <FaHeart className={styles.heartFilled} />
          ) : (
            <FaRegHeart className={styles.heartOutline} />
          )}
        </button>

        {/* AVATAR */}
        <div className={styles.avatarWrapper}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.avatar}
            loading="lazy"
          />
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <h3 className={styles.name}>
            {teacher.name} {teacher.surname}
          </h3>

          <div className={styles.meta}>
            <span className={styles.grey}>Lessons done:</span>
            <span>{teacher.lessons_done}</span>
          </div>

          <div className={styles.meta}>
            <span className={styles.grey}>Rating:</span>
            <span>{teacher.rating}</span>
          </div>

          <div className={styles.meta}>
            <span className={styles.grey}>Price / hour:</span>
            <span className={styles.price}>${teacher.price_per_hour}</span>
          </div>

          {/* LANGUAGES */}
          <div className={styles.langWrapper}>
            {teacher.languages.map(lang => (
              <span key={lang} className={styles.langBadge}>
                {lang}
              </span>
            ))}
          </div>

          {/* SHORT ABOUT */}
          <p className={styles.about}>
            {teacher.lesson_info.slice(0, 160)}
            {teacher.lesson_info.length > 160 && '…'}
          </p>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <button
              className={styles.readMoreButton}
              onClick={handleReadMore}
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>

            <button
              className={styles.bookLessonButton}
              onClick={handleOpenBooking}
            >
              Book trial lesson
            </button>
          </div>

          {/* EXPANDED */}
          {expanded && (
            <div className={styles.expanded}>
              <h4>Lesson information</h4>
              <p>{teacher.lesson_info}</p>

              <h4>Conditions</h4>
              <ul>
                {teacher.conditions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h4>Levels</h4>
              <div className={styles.levels}>
                {teacher.levels.map(level => (
                  <span key={level} className={styles.level}>
                    {level}
                  </span>
                ))}
              </div>

              {teacher.reviews.length > 0 && (
                <>
                  <h4>Reviews</h4>
                  {teacher.reviews.map((r, i) => (
                    <div key={i} className={styles.review}>
                      <strong>{r.reviewer_name}</strong> — {r.reviewer_rating}/5
                      <p>{r.comment}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </article>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        teacher={teacher}
        onBookingSubmit={handleBookingSubmit}
      />
    </>
  );
};

export default TeacherCard;
