import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal } from '../../components/Modal/Modal';
import { Teacher } from '../../types';
import styles from './BookingModal.module.css';

// Интерфейс для данных формы бронирования
interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  lessonTime: string;
  message?: string;
}

// Интерфейс для пропсов компонента
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
  onBookingSubmit: (data: BookingFormData) => void;
}

// Схема валидации с помощью Yup
const bookingSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  
  lessonTime: yup
    .string()
    .required('Please select a lesson time'),
  
  message: yup
    .string()
    .max(500, 'Message must not exceed 500 characters')
});

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onBookingSubmit
}) => {
  // Инициализация react-hook-form с Yup валидацией
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema),
    mode: 'onChange' // Валидация при изменении полей
  });

  // Обработчик отправки формы
  const onSubmit = async (data: BookingFormData) => {
    try {
      await onBookingSubmit(data);
      // Сбрасываем форму после успешной отправки
      reset();
      onClose();
    } catch (error) {
      console.error('Booking submission error:', error);
    }
  };

  // Обработчик закрытия модалки
  const handleClose = () => {
    reset();
    onClose();
  };

  // Генерируем доступные временные слоты
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9:00 AM
    const endHour = 21;  // 9:00 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeLabel = hour < 12 ? `${hour}:00 AM` : 
                       hour === 12 ? '12:00 PM' : 
                       `${hour - 12}:00 PM`;
      slots.push(
        <option key={hour} value={`${hour}:00`}>
          {timeLabel}
        </option>
      );
    }
    
    return slots;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Book Trial Lesson with ${teacher.name} ${teacher.surname}`}
      size="medium"
    >
      <div className={styles.bookingModal}>
        {/* Информация о преподавателе */}
        <div className={styles.teacherInfo}>
          <img 
            src={teacher.avatar_url} 
            alt={teacher.name}
            className={styles.teacherAvatar}
          />
          <div className={styles.teacherDetails}>
            <h3>{teacher.name} {teacher.surname}</h3>
            <p className={styles.teacherLanguages}>
              Teaches: {teacher.languages.join(', ')}
            </p>
            <p className={styles.teacherPrice}>
              Price: <strong>${teacher.price_per_hour}/hour</strong>
            </p>
          </div>
        </div>

        {/* Форма бронирования */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              className={`${styles.formInput} ${
                errors.name ? styles.inputError : ''
              }`}
              placeholder="Enter your full name"
              {...register('name')}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.formInput} ${
                errors.email ? styles.inputError : ''
              }`}
              placeholder="your.email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              className={`${styles.formInput} ${
                errors.phone ? styles.inputError : ''
              }`}
              placeholder="+1 (555) 123-4567"
              {...register('phone')}
            />
            {errors.phone && (
              <span className={styles.errorMessage}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lessonTime" className={styles.formLabel}>
              Preferred Lesson Time *
            </label>
            <select
              id="lessonTime"
              className={`${styles.formSelect} ${
                errors.lessonTime ? styles.inputError : ''
              }`}
              {...register('lessonTime')}
            >
              <option value="">Select a time slot</option>
              {generateTimeSlots()}
            </select>
            {errors.lessonTime && (
              <span className={styles.errorMessage}>{errors.lessonTime.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Additional Message (Optional)
            </label>
            <textarea
              id="message"
              className={styles.formTextarea}
              placeholder="Any specific topics you'd like to focus on?"
              rows={4}
              {...register('message')}
            />
            {errors.message && (
              <span className={styles.errorMessage}>{errors.message.message}</span>
            )}
          </div>

          {/* Кнопки действия */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Book Trial Lesson'}
            </button>
          </div>

          {/* Примечание */}
          <div className={styles.bookingNote}>
            <p>
              <strong>Note:</strong> After booking, the teacher will contact you 
              within 24 hours to confirm the lesson details.
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;