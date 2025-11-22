// import React from 'react';
// import { useToast } from '../../context/ToastContext';
// import type { Toast } from '../../context/ToastContext';

// import styles from './ToastContainer.module.css';

// // Компонент отдельного Toast
// const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
//   const { removeToast } = useToast();

//   // Иконки для разных типов Toast'ов
//   const getToastIcon = (type: Toast['type']) => {
//     switch (type) {
//       case 'success':
//         return '✅';
//       case 'error':
//         return '❌';
//       case 'warning':
//         return '⚠️';
//       case 'info':
//       default:
//         return 'ℹ️';
//     }
//   };

//   // CSS классы для разных типов Toast'ов
//   const getToastClassName = (type: Toast['type']) => {
//     switch (type) {
//       case 'success':
//         return styles.toastSuccess;
//       case 'error':
//         return styles.toastError;
//       case 'warning':
//         return styles.toastWarning;
//       case 'info':
//       default:
//         return styles.toastInfo;
//     }
//   };

//   return (
//     <div 
//       className={`${styles.toast} ${getToastClassName(toast.type)}`}
//       onClick={() => removeToast(toast.id)}
//     >
//       <div className={styles.toastContent}>
//         <span className={styles.toastIcon}>{getToastIcon(toast.type)}</span>
//         <span className={styles.toastMessage}>{toast.message}</span>
//       </div>
//       <button 
//         className={styles.toastClose}
//         onClick={(e) => {
//           e.stopPropagation();
//           removeToast(toast.id);
//         }}
//         aria-label="Close notification"
//       >
//         ×
//       </button>
//     </div>
//   );
// };

// // Основной контейнер для Toast'ов
// export const ToastContainer: React.FC = () => {
//   const { toasts } = useToast();

//   if (toasts.length === 0) return null;

//   return (
//     <div className={styles.toastContainer}>
//       {toasts.map(toast => (
//         <ToastItem key={toast.id} toast={toast} />
//       ))}
//     </div>
//   );
// };

// export default ToastContainer;

import React from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './ToastContainer.module.css';

/*
  ToastContainer — отображает уведомления в правом верхнем углу.

  Редизайн:
  - Плавная анимация появления/исчезновения
  - Тень, радиус, Figma-стиль
  - Аккуратная typography
  - Автоматическое скрытие (через ToastContext)
*/

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles.show}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className={styles.message}>{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
