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

export const TeacherCard: React.FC<Props> = ({ teacher }) => {
  const { user } = useAuth();
  const { favorites, toggleFavorite, isFavorite, loading: favLoading } = useFavorites();
  const { addToast } = useToast();

  const [expanded, setExpanded] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const fav = Boolean(isFavorite && teacher.id ? isFavorite(teacher.id) : favorites.includes(teacher.id || ''));

  const handleToggleFavorite = useCallback(() => {
    if (!user) {
      addToast('You must be logged in to add favorites', 'info');
      return;
    }
    if (!teacher.id) {
      console.error('Teacher has no id, cannot toggle favorite');
      return;
    }
    toggleFavorite(teacher.id);
  }, [user, teacher.id, toggleFavorite, addToast]);

  const handleReadMore = () => setExpanded(prev => !prev);
  const openBooking = () => {
    if (!user) {
      addToast('Please log in to book a trial lesson', 'info');
      return;
    }
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  const handleBookingSubmit = async (data: any) => {
    // Здесь — placeholder отправки брони. В проде замените на реальный API call.
    console.log('Booking request', { teacherId: teacher.id, teacherName: `${teacher.name} ${teacher.surname}`, ...data });
    addToast('Booking request sent. Teacher will contact you soon.', 'success', 6000);
  };

  return (
    <>
      <article className={styles.card} aria-labelledby={`teacher-${teacher.id}`}>
        <button
          className={styles.favoriteBtn}
          onClick={handleToggleFavorite}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          disabled={favLoading}
        >
          {fav ? <FaHeart className={styles.heartFilled} /> : <FaRegHeart className={styles.heartOutline} />}
        </button>

        <div className={styles.avatarWrapper}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.avatar}
            loading="lazy"
          />
        </div>

        <div className={styles.info}>
          <h3 id={`teacher-${teacher.id}`} className={styles.name}>
            {teacher.name} {teacher.surname}
          </h3>

          <div className={styles.meta}>
            <span className={styles.grey}>Lessons done:</span>
            <span> {teacher.lessons_done?.toLocaleString?.() ?? teacher.lessons_done}</span>
          </div>

          <div className={styles.meta}>
            <span className={styles.grey}>Rating:</span>
            <span> {teacher.rating}</span>
          </div>

          <div className={styles.meta}>
            <span className={styles.grey}>Price / hour:</span>
            <span className={styles.price}> ${teacher.price_per_hour}</span>
          </div>

          <div className={styles.langWrapper}>
            {teacher.languages.map((lang) => (
              <span key={lang} className={styles.langBadge}>
                {lang}
              </span>
            ))}
          </div>

          <p className={styles.about}>
            {/* короткое описание: lesson_info или часть experience */}
            {teacher.lesson_info ? teacher.lesson_info.slice(0, 160) + (teacher.lesson_info.length > 160 ? '…' : '') : (teacher.experience ?? '')}
          </p>

          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <button className={styles.readMoreButton ?? ''} onClick={handleReadMore} aria-expanded={expanded}>
              {expanded ? 'Show less' : 'Read more'}
            </button>

            <button className={styles.bookLessonButton ?? ''} onClick={openBooking}>
              Book trial lesson
            </button>
          </div>

          {expanded && (
            <div style={{ marginTop: 14 }}>
              {teacher.lesson_info && (
                <>
                  <h4>Lesson information</h4>
                  <p>{teacher.lesson_info}</p>
                </>
              )}

              {teacher.conditions && (
                <>
                  <h4>Conditions</h4>
                  <ul>
                    {teacher.conditions.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </>
              )}

              {teacher.levels && (
                <>
                  <h4>Levels</h4>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                    {teacher.levels.map((lvl) => <span key={lvl} className={styles.langBadge}>{lvl}</span>)}
                  </div>
                </>
              )}

              {teacher.reviews && teacher.reviews.length > 0 && (
                <>
                  <h4 style={{ marginTop: 10 }}>Reviews</h4>
                  <div>
                    {teacher.reviews.map((r, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <strong>{r.reviewer_name}</strong> — <small>{r.reviewer_rating}/5</small>
                        <div style={{ fontStyle: 'italic' }}>{r.comment}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </article>

      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
        teacher={teacher}
        onBookingSubmit={handleBookingSubmit}
      />
    </>
  );
};

export default TeacherCard;
