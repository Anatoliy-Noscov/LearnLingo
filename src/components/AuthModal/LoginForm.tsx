// src/components/LoginForm/LoginForm.tsx
import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
}

// Тип результата login
interface AuthResult {
  success: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const result: AuthResult = await login(email, password);
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      const unknownError = err as Error;
      setError(unknownError?.message || 'Login failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};
