import {useAuth} from '../../context/AuthContext';
import styles from './Header.module.css';


export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Learn Lingo</h1>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/teachers" className={styles.navLink}>Teachers</a>
          {user && (
            <a href="/favorites" className={styles.navLink}>Favorites</a>
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