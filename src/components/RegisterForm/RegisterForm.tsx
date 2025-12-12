import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useToast } from "../../context/ToastContext";
import styles from "./AuthForm.module.css";

interface Props {
  switchToLogin: () => void;
  onSuccess: () => void;
}

export const RegisterForm: React.FC<Props> = ({ switchToLogin, onSuccess }) => {
  const { register } = useAuth();
  const { showError, showSuccess } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return showError("Name is required");
    if (!email.trim()) return showError("Email is required");
    if (!password.trim()) return showError("Password is required");

    try {
      await register({ name, email, password });
      showSuccess("Account successfully created!");
      onSuccess();
    } catch (err: any) {
      showError(err.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>Fill in your details to sign up</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            placeholder="test@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            placeholder="•••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.submitBtn} type="submit">
          Sign Up
        </button>

        <p style={{ fontSize: 14, textAlign: "center", marginTop: 14 }}>
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            style={{
              color: "#3470ff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};
