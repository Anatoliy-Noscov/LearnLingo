import styles from "./Stats.module.css";

export const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>

        <div className={styles.item}>
          <h3 className={styles.number}>32,000+</h3>
          <p className={styles.label}>Experienced tutors</p>
        </div>

        <div className={styles.item}>
          <h3 className={styles.number}>300,000+</h3>
          <p className={styles.label}>5-star tutor reviews</p>
        </div>

        <div className={styles.item}>
          <h3 className={styles.number}>120+</h3>
          <p className={styles.label}>Subjects taught</p>
        </div>

        <div className={styles.item}>
          <h3 className={styles.number}>200+</h3>
          <p className={styles.label}>Tutor nationalities</p>
        </div>

      </div>
    </section>
  );
};
