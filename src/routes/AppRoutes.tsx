// import { Routes, Route } from 'react-router-dom';
// import { Home } from '../pages/Home/Home';
// import { Teachers } from '../pages/Teachers/Teachers';
// import { Favorites } from '../pages/Favorites/Favorites';

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/teachers" element={<Teachers />} />
//       <Route path="/favorites" element={<Favorites />} />
//     </Routes>
//   );
// };


// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';

// Импорт твоих страниц
import { Home } from '../pages/Home/Home';
import { Teachers } from '../pages/Teachers/Teachers';
import { Favorites } from '../pages/Favorites/Favorites';

// Если понадобится — добавим защиту маршрутов и любую логику
// Пока оставляем классический набор страниц

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Главная страница */}
      <Route path="/" element={<Home />} />

      {/* Страница со списком учителей */}
      <Route path="/teachers" element={<Teachers />} />

      {/* Избранные */}
      <Route path="/favorites" element={<Favorites />} />

      {/* 404 (опционально, можно добавить позже) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};
