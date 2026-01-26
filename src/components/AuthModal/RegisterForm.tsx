// src/components/RegisterForm/RegisterForm.tsx
import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { useAuth } from '../../hooks/useAuth';

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await signUp(email, password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className={styles.label}>Password</label>
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className={styles.label}>Repeat password</label>
      <input
        className={styles.input}
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />

      <button className={styles.submitBtn} type="submit">
        Register
      </button>
    </form>
  );
};
