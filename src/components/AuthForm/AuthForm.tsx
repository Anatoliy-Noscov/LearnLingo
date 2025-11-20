import React, { useState } from 'react';
import styles from './AuthForm.module.css';

/*
  AuthForm — форма авторизации/регистрации
  ----------------------------------------------------
  - Единственный компонент, работает в двух режимах:
      mode === 'login'        → форма входа
      mode === 'register'     → регистрация
  - UI полностью переработан под макет
  - Добавлены комментарии для понимания структуры
*/

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  onClose: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isRegister = mode === 'register';

  // Обработчик формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, name: isRegister ? name : undefined });
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalCard}>
        
        {/* Кнопка закрытия */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Заголовок */}
        <h2 className={styles.title}>
          {isRegister ? 'Register' : 'Log In'}
        </h2>

        {/* Описание (как в макете) */}
        <p className={styles.subtitle}>
          {isRegister
            ? 'Create an account to continue'
            : 'Enter your details to log in'}
        </p>

        {/* ФОРМА */}
        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Поле "Name" только для регистрации */}
          {isRegister && (
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button className={styles.submitBtn} type="submit">
            {isRegister ? 'Create account' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};
