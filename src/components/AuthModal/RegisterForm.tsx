import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { useAuth } from "../../hooks/useAuth";

/*
  RegisterForm — форма регистрации
  - пароль + повтор пароля
  - показывает ошибки валидации
  - использует AuthContext.register(...)
*/

interface Props {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
        placeholder="Create password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className={styles.label}>Repeat password</label>
      <input
        className={styles.input}
        type="password"
        placeholder="Repeat password"
        required
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      <button className={styles.submitBtn} type="submit">
        Register
      </button>
    </form>
  );
};
