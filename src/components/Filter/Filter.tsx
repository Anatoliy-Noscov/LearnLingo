// import React from 'react';
// import styles from './Filter.module.css';


// interface FilterProps {
//     filters: {
//         language: string;
//         level: string;
//         price: number;
//     };

//     onFilterChange: (filters: {language: string; level: string; price: number}) => void;
// }

// export const Filter: React.FC<FilterProps> = ({filters, onFilterChange }) => {
//     const languages = [
//         'English', 'Spanish', 'French', 'German', 'Italian', 'Mandarin Chinese', 'Korean', 'Vietnamese'
//     ]

//     const levels = [
//         'A1 Beginner',
//         'A2 Elementary',
//         'B1 Intermediate',
//         'B2 Upper-Intermediate',
//         'C1 Advanced',
//         'C2 Proficient'
//     ];

//     const priceRanges = [
//         {value: 0, label: 'Any price' },
//         {value: 20, label: 'Up to $20' },
//         {value: 30, label: 'Up to $30' },
//         {value: 40, label: 'Up to $40' },
//         {value: 50, label: 'Up to $50' },
//     ];


//     const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
//         onFilterChange({
//             ...filters,
//             language: event.target.value
//         });
//     };

//     const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         onFilterChange({
//             ...filters,
//             level: event.target.value
//         });
//     }

//     const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>)=> {
//         onFilterChange({
//             ...filters,
//             price: Number(event.target.value)
//         })
//     };

//     const handleResetFilters = () => {
//         onFilterChange({
//             language: '',
//             level: '',
//             price: 0
//         });
//     };

//     const hasActiveFilters = filters.language || filters.level || filters.price > 0;

//         return (
//             <div className={styles.filterContainer}>
//                 {/** Title section filters */}

//                 <h3 className={styles.filterTitle}>Filter Teachers</h3>

//                 {/* сетка фильтров используем Грид для адаптивного расположения*/}

//                 <div className={styles.filterGrid}>
//                     {/*Фильтр по языку */}

//                     <div className={styles.filterGroup}>
//                         <label htmlFor="language-filter" className={styles.filterLabel}>
//                             Language
//                         </label>
//                         <select 
//                         id="language-filter"
//                         value={filters.language}
//                         onChange={handleLanguageChange}
//                         className={styles.filterSelect}
//                         >
//                             {/* Первая опция - пустая, означает "любой язык" */}
//                         <option value="">Any language</option>
//                         {/* Генерируем опции для каждого языка из массива */}
//                         {languages.map(language => (
//                             <option value={language} key={language}>{language}</option>
//                         ))}
//                         </select>
//                     </div>


//                         {/*Filtr or level nolege */}
//                         <div className={styles.filterGroup}>
//                             <label htmlFor="level-filter" className={styles.filterLabel}>Level</label>
//                             <select  
//                             id="level-filter"
//                             value={filters.level}
//                             onChange={handleLevelChange}
//                             className={styles.filterSelect}>
//                                 <option value="">Any level</option>
//                                 {levels.map(level => (
//                                     <option key={level} value={level}>
//                                         {level}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/** Filtr on price */}

//                         <div className={styles.filterGroup}>
//                             <label htmlFor="price-filter" className={styles.filterLabel}>Price per hour</label>
//                             <select 
//                             id="price-filter"
//                             value={filters.price}
//                             onChange={handlePriceChange}
//                             className={styles.filterSelect}
//                             >
//                                 {priceRanges.map(range => (
//                                     <option key={range.value} value={range.value}>
//                                         {range.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/**Кнопка сброса фильтром - показываем только если есть активные фильтры */}
//                         {hasActiveFilters && (
//                             <div className={styles.filterGroup}>
//                                 {/* Пустой label для выравнивания с другими фильтрами */}
//                             <label className={styles.filterLabel}>&nbsp;</label>
//                             <button
//                             onClick={handleResetFilters}
//                             className={styles.resetButton}
//                             type='button'>Reset Filters</button>
//                             </div>
//                         )}
//                 </div>
//             </div>
//         )
// };

// export default Filter;

import React, { useState } from "react";
import styles from "./Filter.module.css";

interface Props {
  filters: {
    language: string;
    level: string;
    price: number;
  };
  onFilterChange: (filters: {
    language: string;
    level: string;
    price: number;
  }) => void;
}

/*
  Filter component — UI полностью переписан под макет
  Логика фильтрации остаётся твоей.
  Много комментариев добавил специально для обучения.
*/

export const Filter: React.FC<Props> = ({ filters, onFilterChange }) => {
  // Локальные состояния для drop-down меню
  const [langOpen, setLangOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  // Справочные списки
  const languages = ["English", "Ukrainian", "Polish", "German", "Spanish"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const prices = [10, 20, 30, 40, 50];

  // Универсальный апдейт фильтров
  const update = (patch: Partial<typeof filters>) => {
    onFilterChange({
      ...filters,
      ...patch,
    });
  };

  // Сброс фильтров
  const reset = () => {
    onFilterChange({ language: "", level: "", price: 0 });
  };

  return (
    <div className={styles.filter}>
      {/* LANGUAGE DROPDOWN */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownBtn}
          onClick={() => setLangOpen((p) => !p)}
        >
          {filters.language || "Languages"}
          <span className={styles.arrow}>▼</span>
        </button>

        {langOpen && (
          <div className={styles.menu}>
            {languages.map((l) => (
              <div
                key={l}
                className={`${styles.menuItem} ${
                  filters.language === l ? styles.active : ""
                }`}
                onClick={() => {
                  update({ language: l });
                  setLangOpen(false);
                }}
              >
                {l}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LEVEL DROPDOWN */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownBtn}
          onClick={() => setLevelOpen((p) => !p)}
        >
          {filters.level || "Level"}
          <span className={styles.arrow}>▼</span>
        </button>

        {levelOpen && (
          <div className={styles.menu}>
            {levels.map((lvl) => (
              <div
                key={lvl}
                className={`${styles.menuItem} ${
                  filters.level === lvl ? styles.active : ""
                }`}
                onClick={() => {
                  update({ level: lvl });
                  setLevelOpen(false);
                }}
              >
                {lvl}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRICE DROPDOWN */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownBtn}
          onClick={() => setPriceOpen((p) => !p)}
        >
          {filters.price ? `$${filters.price}` : "Price"}
          <span className={styles.arrow}>▼</span>
        </button>

        {priceOpen && (
          <div className={styles.menu}>
            {prices.map((p) => (
              <div
                key={p}
                className={`${styles.menuItem} ${
                  filters.price === p ? styles.active : ""
                }`}
                onClick={() => {
                  update({ price: p });
                  setPriceOpen(false);
                }}
              >
                ${p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RESET BUTTON */}
      <button className={styles.resetBtn} onClick={reset}>
        Reset filter
      </button>
    </div>
  );
};
