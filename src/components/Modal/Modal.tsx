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

import React, { useEffect } from "react";
import styles from "./Modal.module.css";

/*
  Modal component — UI полностью переписан под макет.
  Добавлена анимация, затемнение фона, центрирование,
  кнопка закрытия и блокировка scroll при открытии.
*/

interface ModalProps {
  isOpen: boolean;               // Управление открытием/закрытием модалки
  onClose: () => void;           // Закрытие при клике на крестик/overlay
  title?: string;                // Заголовок модального окна
  children: React.ReactNode;     // Контент модалки — форма входа или регистрации
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {

  // Блокируем скролл страницы, когда модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрытие по клику на фон
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null; // Не рендерим компонент, если он закрыт

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>

        {/* Кнопка закрытия */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Заголовок модалки */}
        {title && <h2 className={styles.title}>{title}</h2>}

        {/* Основной контент (форма логина/регистрации) */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
