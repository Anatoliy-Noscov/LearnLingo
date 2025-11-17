// app/page.tsx
// Главная страница приложения.
// Здесь просто собираем компоненты Hero и Stats,
// чтобы Home была "чистой" и соответствовала макету.

import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Верхний большой герой-блок */}
      <Hero />

      {/* Блок статистики под героем */}
      <Stats />
    </main>
  );
}
