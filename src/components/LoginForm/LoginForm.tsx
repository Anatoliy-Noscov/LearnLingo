// src/components/Auth/LoginForm.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './AuthForm.module.css';
import { useAuth } from '../../context/AuthProvider';

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

export const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Log In</h2>

      <label className={styles.label}>
        Email
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Password
        <input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </label>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        Log In
      </button>
    </form>
  );
};
