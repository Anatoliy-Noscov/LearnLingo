import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

/*
  Loader — круговой индикатор загрузки
  - UI полностью переделан под макет Figma
  - Плавная анимация stroke-dashoffset
  - 3 размера: small / medium / large
*/

export const Loader: React.FC<LoaderProps> = ({ size = "medium", text }) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" />
      </svg>

      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};
