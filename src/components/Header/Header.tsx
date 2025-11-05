import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import styles from './Header.module.css';


export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <Link to="/" className={styles.logo}>Learn Lingo</Link>

        <nav className={styles.nav}>

          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/teachers" className={styles.navLink}>Teachers</Link>
          {user && (
            <Link to="/favorites" className={styles.navLink}>Favorites</Link>
          )}
        </nav>
        
          <div className={styles.authSection}>
            {user ? (
              <div className={styles.userInfo}>
                <span>Welcome, {user.email}</span>
                <button onClick={logout} className={styles.logoutBtn}>Logout</button>
              </div>
            ) : (
              <button className={styles.loginBtn}>Login</button>
            )}
          </div>
      </div>
    </header>
  )
}