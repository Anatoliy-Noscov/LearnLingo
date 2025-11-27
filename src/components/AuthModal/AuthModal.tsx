import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { Modal } from "../common/Modal/Modal";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

/*
  AuthModal — главная модалка
  - вкладки Login / Register
  - внутри вставляем LoginForm.tsx и RegisterForm.tsx
*/

interface AuthModalProps {
  isOpen: boolean;
  defaultMode?: "login" | "register";
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        
        {/* Вкладки */}
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

        {/* Название */}
        <h2 className={styles.title}>
          {mode === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>

        {/* Контент формы */}
        {mode === "login" ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={onClose} />
        )}
      </div>
    </Modal>
  );
};
