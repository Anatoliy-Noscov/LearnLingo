import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Modal } from "../common/Modal/Modal";

/*
  AuthModal – универсальная модалка для Login / Registration.
  - переключение вкладок
  - использует AuthContext
  - вызывается из Header
*/

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      await login(email, password);
    } else {
      await register(email, password);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === "login" ? styles.active : ""}`}
            onClick={() => setMode("login")}
          >
            Log In
          </button>

          <button
            className={`${styles.tab} ${mode === "register" ? styles.active : ""}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* Title */}
        <h2 className={styles.title}>
          {mode === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.submitBtn}>
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </form>

      </div>
    </Modal>
  );
};
