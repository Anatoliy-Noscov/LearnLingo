import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

/*
  Header — полностью адаптирован под макет.
  + Включена твоя логика авторизации:
      если user есть → показываем Welcome + Logout
      если user нет → Login + Registration
  + Кнопки Login / Register открывают AuthModal (через props)
*/

interface HeaderProps {
  onLoginClick?: () => void;      // открыть логин модалку
  onRegisterClick?: () => void;   // открыть регистрацию модалку
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onRegisterClick
}) => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* LEFT — LOGO */}
        <div className={styles.left}>
          <img
            src="/icons/logo.svg"
            alt="Logo"
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>LearnLingo</span>
        </div>

        {/* CENTER — NAVIGATION */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          <Link to="/teachers" className={styles.navLink}>
            Teachers
          </Link>

          {user && (
            <Link to="/favorites" className={styles.navLink}>
              Favorites
            </Link>
          )}
        </nav>

        {/* RIGHT — AUTH AREA */}
        <div className={styles.right}>

          {user ? (
            /* Если пользователь авторизован */
            <div className={styles.userInfo}>
              <span className={styles.welcome}>Welcome, {user.email}</span>

              <button
                className={styles.logoutBtn}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            /* Если пользователь НЕ авторизован */
            <>
              <button
                className={styles.loginBtn}
                onClick={onLoginClick}
              >
                <img
                  src="/icons/login.svg"
                  alt="login"
                  className={styles.loginIcon}
                />
                <span>Log in</span>
              </button>

              <button
                className={styles.registerBtn}
                onClick={onRegisterClick}
              >
                Registration
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
};
