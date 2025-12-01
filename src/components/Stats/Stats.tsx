import React from "react";
import styles from "./Stats.module.css";

/*
  Stats — блок статистики ниже Hero
  ✔ 3 карточки
  ✔ Большие цифры
  ✔ Полностью повторяет стиль Figma
*/

export const Stats: React.FC = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>

        <div className={styles.item}>
          <h3 className={styles.number}>250+</h3>
          <p className={styles.label}>Experienced tutors</p>
        </div>

        <div className={styles.item}>
          <h3 className={styles.number}>10k+</h3>
          <p className={styles.label}>Active students</p>
        </div>

        <div className={styles.item}>
          <h3 className={styles.number}>4.9</h3>
          <p className={styles.label}>Average rating</p>
        </div>

      </div>
    </section>
  );
};
