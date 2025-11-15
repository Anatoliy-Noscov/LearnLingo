// import React from 'react';
// import { Link } from 'react-router-dom';
// import {useAuth} from '../../hooks/useAuth';
// import styles from './Header.module.css';


// export const Header: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>

//         <Link to="/" className={styles.logo}>Learn Lingo</Link>

//         <nav className={styles.nav}>

//           <Link to="/" className={styles.navLink}>Home</Link>
//           <Link to="/teachers" className={styles.navLink}>Teachers</Link>
//           {user && (
//             <Link to="/favorites" className={styles.navLink}>Favorites</Link>
//           )}
//         </nav>
        
//           <div className={styles.authSection}>
//             {user ? (
//               <div className={styles.userInfo}>
//                 <span>Welcome, {user.email}</span>
//                 <button onClick={logout} className={styles.logoutBtn}>Logout</button>
//               </div>
//             ) : (
//               <button className={styles.loginBtn}>Login</button>
//             )}
//           </div>
//       </div>
//     </header>
//   )
// }

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

// ❗ ВАЖНО:
// Сейчас хедер — полностью по макету:
// - логотип слева
// - ссылки по центру
// - справа кнопки Log in + Registration
// Позже мы добавим твою логику авторизации (Welcome, Logout)
// но UI уже будет соответствовать макету.

// Если хочешь — Login кнопка будет открывать модалку (через props)

interface HeaderProps {
  onLoginClick?: () => void;        // открыть окно логина
  onRegisterClick?: () => void;     // открыть окно регистрации
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onRegisterClick
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* LEFT — LOGO */}
        <div className={styles.left}>
          {/* Логотип как в макете (замени путь если нужно) */}
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
        </nav>

        {/* RIGHT — AUTH BUTTONS */}
        <div className={styles.right}>
          {/* Log in button (иконка + текст) */}
          <button className={styles.loginBtn} onClick={onLoginClick}>
            <img
              src="/icons/login.svg"
              alt="login"
              className={styles.loginIcon}
            />
            <span>Log in</span>
          </button>

          {/* Registration — primary button */}
          <button
            className={styles.registerBtn}
            onClick={onRegisterClick}
          >
            Registration
          </button>
        </div>

      </div>
    </header>
  );
};
