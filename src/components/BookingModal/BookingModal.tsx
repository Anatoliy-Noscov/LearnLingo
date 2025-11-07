import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Modal} from '../Modal/Modal';
import { Teacher } from '../../types';
import styles from './BookingModal.module.css';

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    lessonTime: string;
    message?: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
    onBookingSubmit: (data: BookingFormData) => void;
}

const bookingSchema = yup.object({
    name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

    email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

    phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),

    lessonTime: yup
    .string()
    .required('Please select a lesson time'),

    message: yup
    .string()
    .max(500, 'Message must not exceed not exceed 500 characters')
});

export const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    teacher,
    onBookingSubmit
}) => {
    //Инициализация react-hook-form c Yup валидацией

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<BookingFormData>({
        resolver: yupResolver(bookingSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: BookingFormData) => {
        try {
            await onBookingSubmit(data);

            reset();
            onClose();
        } catch (error) {
            console.error('Booking submission error:', error);
        }
    };

    //Обработчик закрытия модалки

    const handleClose = () => {
        reset();
        onClose();
    };

    const generateTimeSlots = () => {
        const slots = [];
        const startHour = 9;
        const endHour = 21;

        for (let hour = startHour; hour < endHour; hour++) {
            const timeLabel = hour < 12 ? `${hour}:00 AM` : 
            hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
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
            size='medium'>
                
            </Modal>
    )
}