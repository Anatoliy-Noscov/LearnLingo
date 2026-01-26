// src/components/AuthModal/AuthModal.tsx

import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import  { LoginForm }  from './LoginForm';
import  { RegisterForm } from '../RegisterForm/RegisterForm';
import styles from './AuthModal.module.css';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.authModal}>
        {/* HEADER */}
        <header className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'login' ? 'Log in to your account' : 'Create an account'}
          </h2>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
              onClick={switchToLogin}
              type="button"
            >
              Login
            </button>

            <button
              className={`${styles.tab} ${mode === 'register' ? styles.active : ''}`}
              onClick={switchToRegister}
              type="button"
            >
              Register
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className={styles.content}>
          {mode === 'login' ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegisterForm onSuccess={onClose} />
          )}
        </div>

        {/* FOOTER */}
        <footer className={styles.footer}>
          {mode === 'login' ? (
            <p>
              Don’t have an account?{' '}
              <button
                type="button"
                className={styles.link}
                onClick={switchToRegister}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className={styles.link}
                onClick={switchToLogin}
              >
                Log in
              </button>
            </p>
          )}
        </footer>
      </div>
    </Modal>
  );
};

export default AuthModal;
