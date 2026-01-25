// src/components/LoginForm/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './LoginForm.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters'),
});

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      addToast('Successfully logged in', 'success');
      onSuccess?.();
    } catch (e: any) {
      addToast(e?.message || 'Login failed', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* EMAIL */}
      <div className={styles.group}>
        <label>Email</label>
        <input
          type="email"
          {...register('email')}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      {/* PASSWORD */}
      <div className={styles.group}>
        <label>Password</label>
        <input
          type="password"
          {...register('password')}
          className={errors.password ? styles.errorInput : ''}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submit}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
