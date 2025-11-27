import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { useAuth } from "../../hooks/useAuth";

/*
  LoginForm — форма авторизации
  - использует AuthContext
  - показывает ошибки
  - работает внутри AuthModal
*/

interface Props {
  onSuccess: () => void;
}

export const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { login } = useAuth();

  // поля формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ошибка
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      await login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className={styles.label}>Password</label>
      <input
        className={styles.input}
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.submitBtn} type="submit">
        Log In
      </button>
    </form>
  );
};
