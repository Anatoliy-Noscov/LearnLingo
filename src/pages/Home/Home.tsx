import React from 'react';
import styles from './Home.module.css';

// Импортируем новые компоненты Hero и Stats
import { Hero } from '../../components/Hero/Hero';
import { Stats } from '../../components/Stats/Stats';

/**
 * Главная страница — полностью соответствует макету.
 * Включает:
 *  - Hero (верхний блок с заголовком и изображением)
 *  - Stats (секция статистики)
 */
export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Большой hero-блок */}
      <Hero />

      {/* Блок статистики (цифры) */}
      <Stats />
    </div>
  );
};
