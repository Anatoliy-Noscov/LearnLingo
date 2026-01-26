import React, { useState } from "react";
import styles from "../AuthForm/AuthForm.module.css";
import { useAuth } from "../../hooks/useAuth";

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { signUp } = useAuth(); // ← используем signUp вместо register

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signUp(email, password, name);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Unexpected error occurred");
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>Create your personal account</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.submitBtn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
