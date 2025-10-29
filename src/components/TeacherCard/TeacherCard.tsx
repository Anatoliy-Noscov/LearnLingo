// components/features/TeacherCard/TeacherCard.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher }  from '../../types';
import styles from './TeacherCard.module.css';

interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleFavoriteClick = () => {
    if (!user) {
     
      return;
    }
    
    setIsFavorite(!isFavorite);
    
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={teacher.avatar_url} 
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatar}
        />
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favorite : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>{teacher.name} {teacher.surname}</h3>
        <p className={styles.languages}>
          <strong>Languages:</strong> {teacher.languages.join(', ')}
        </p>
        <p className={styles.price}>
          <strong>Price:</strong> ${teacher.price_per_hour}/hour
        </p>
        <p className={styles.rating}>
          <strong>Rating:</strong> {teacher.rating} ⭐
        </p>
        <p className={styles.lessons}>
          <strong>Lessons done:</strong> {teacher.lessons_done}
        </p>
        
        <div className={styles.actions}>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className={styles.readMoreBtn}
          >
            {showDetails ? 'Show Less' : 'Read More'}
          </button>
          <button className={styles.trialBtn}>
            Book Trial Lesson
          </button>
        </div>
        
        {showDetails && (
          <div className={styles.details}>
            <p className={styles.experience}>{teacher.experience}</p>
            <div className={styles.conditions}>
              <strong>Conditions:</strong>
              <ul>
                {teacher.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
            <div className={styles.reviews}>
              <h4>Reviews:</h4>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <strong>{review.reviewer_name}</strong> ({review.reviewer_rating}⭐): {review.comment}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};