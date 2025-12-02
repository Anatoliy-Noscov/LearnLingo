import React from "react";
import styles from "./Home.module.css";

import { Hero } from "../../components/Hero/Hero";
import { Stats } from "../../components/Stats/Stats";

/*
  Home Page Layout
  ✔ Повторяет макет
  ✔ Hero сверху
  ✔ Stats ниже
  ✔ Чистый, минималистичный контейнер
*/

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <Stats />

      {/* Если будут дополнительные блоки — добавим позже */}
    </div>
  );
};
