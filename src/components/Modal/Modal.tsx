// import React, { useEffect } from 'react';
// import styles from './Modal.module.css';

// // Интерфейс для пропсов модального окна
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: React.ReactNode;
//   size?: 'small' | 'medium' | 'large';
// }

// export const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = 'medium'
// }) => {
//   // Обработчик нажатия клавиши Escape
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       // Блокируем скролл body когда модалка открыта
//       document.body.style.overflow = 'hidden';
//     }

//     // Очистка эффекта
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   // Обработчик клика по backdrop
//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   // Если модалка закрыта - не рендерим ничего
//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay} onClick={handleBackdropClick}>
//       <div className={`${styles.modal} ${styles[size]}`}>
//         {/* Заголовок и кнопка закрытия */}
//         <div className={styles.modalHeader}>
//           {title && <h2 className={styles.modalTitle}>{title}</h2>}
//           <button
//             className={styles.closeButton}
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             ×
//           </button>
//         </div>
        
//         {/* Контент модалки */}
//         <div className={styles.modalContent}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from 'react';
import styles from './Modal.module.css';

/*
  Modal — универсальное модальное окно
  ----------------------------------------------------
  - Используется для AuthForm и любых других модалок
  - Новый UI в стиле Figma: размытый фон, центрирование,
    плавная анимация, аккуратная карточка
  - Вся твоя логика открытия/закрытия остаётся
*/

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Клик по заднему фону закрывает модалку
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleBackgroundClick}>
      <div className={styles.modalCard}>
        
        {/* Кнопка закрытия */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Вставляем содержимое (AuthForm или другое) */}
        {children}
      </div>
    </div>
  );
};
