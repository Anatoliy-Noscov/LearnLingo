// src/components/Auth/RegisterForm.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './AuthForm.module.css';
import { useAuth } from '../../context/AuthProvider';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data.email, data.password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Registration</h2>

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
          placeholder="Create a password"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Confirm password
        <input
          type="password"
          placeholder="Repeat password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        Sign Up
      </button>
    </form>
  );
};
