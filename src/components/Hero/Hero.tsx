import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Unlock your potential with <br />
            the best <span className={styles.highlight}>language</span> tutors
          </h1>

          <p className={styles.subtitle}>
            Embark on an Exciting Language Journey with Expert Language Tutors: 
            Elevate your language proficiency to new heights by connecting with 
            highly qualified and experienced tutors.
          </p>

          <Link to="/teachers">
            <button className={styles.cta}>Get started</button>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/hero-character.png" 
              alt="Character"
              className={styles.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
