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

// src/components/Modal/Modal.tsx

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root');

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // block scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};
