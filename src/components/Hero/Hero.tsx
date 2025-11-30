import React from "react";
import styles from "./Hero.module.css";

/*
  Hero Section — первый экран на главной странице
  Полностью по макету Figma.

  ✔ Большой заголовок
  ✔ Подзаголовок
  ✔ CTA кнопка
  ✔ Изображение справа (hero-character.png)
  ✔ Адаптив до 360px
*/

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* --- LEFT SIDE (TEXT) --- */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Master <span className={styles.accent}>English</span> with the Best
          </h1>

          <p className={styles.subtitle}>
            Practice speaking, reading, and listening with professional tutors.
            Boost your language skills today.
          </p>

          <a href="#teachers" className={styles.ctaButton}>
            Get Started
          </a>
        </div>

        {/* --- RIGHT SIDE (IMAGE) --- */}
        <div className={styles.right}>
          <img
            src="/images/hero-character.png"
            alt="Hero"
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
};
