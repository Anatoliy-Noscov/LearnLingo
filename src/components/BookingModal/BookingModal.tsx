// src/components/BookingModal/BookingModal.tsx

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal } from '../Modal/Modal';
import { Teacher } from '../../types';

import styles from './BookingModal.module.css';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  lessonTime: string;
  message?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
  onBookingSubmit: (data: BookingFormData) => Promise<void> | void;
}

const schema: yup.SchemaOf<BookingFormData> = yup.object({
  name: yup.string().required().min(2).max(50),
  email: yup.string().required().email(),
  phone: yup.string().required().min(10),
  lessonTime: yup.string().required(),
  message: yup.string().max(500).optional(),
});

const generateTimeSlots = (): string[] =>
  Array.from({ length: 12 }, (_, i) => `${9 + i}:00`);

const BookingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  teacher,
  onBookingSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const timeSlots = useMemo(generateTimeSlots, []);

  const submitHandler = async (data: BookingFormData) => {
    await onBookingSubmit(data);
    reset();
    onClose();
  };

  const closeHandler = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeHandler}
      title={`Book trial lesson`}
    >
      <div className={styles.bookingModal} role="dialog" aria-modal="true">
        {/* TEACHER INFO */}
        <div className={styles.teacherInfo}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.teacherAvatar}
          />

          <div>
            <h3>{teacher.name} {teacher.surname}</h3>
            <p>{teacher.languages.join(', ')}</p>
            <strong>${teacher.price_per_hour}/hour</strong>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(submitHandler)} className={styles.bookingForm}>
          <label>
            Full name
            <input {...register('name')} />
            {errors.name && <span>{errors.name.message}</span>}
          </label>

          <label>
            Email
            <input type="email" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
          </label>

          <label>
            Phone
            <input type="tel" {...register('phone')} />
            {errors.phone && <span>{errors.phone.message}</span>}
          </label>

          <label>
            Lesson time
            <select {...register('lessonTime')}>
              <option value="">Select time</option>
              {timeSlots.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.lessonTime && <span>{errors.lessonTime.message}</span>}
          </label>

          <label>
            Message (optional)
            <textarea rows={4} {...register('message')} />
          </label>

          <div className={styles.formActions}>
            <button type="button" onClick={closeHandler} disabled={isSubmitting}>
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Book lesson'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
