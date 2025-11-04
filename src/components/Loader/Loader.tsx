import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: '#0984e3';
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
    size = 'medium',
    color = '#0984e3',
    text 
}) => {
    const getSize = () => {
        switch (size) {
            case 'small':
                return '40px';
            case 'large':
                return '80px';
            case 'medium':
            default: 
            return '60px';
        }
    }
    

    return (

        <div className={styles.loaderContainer}>
            {/*Basic element loader */}
            <div className={styles.spinner}
            style={{
                width: getSize(),
                height: getSize(),
                borderColor: color
            }}>
            </div>
            {/**Условный рендеринг текста */}
            {text && <p className={styles.loaderText}>{text}</p>}
        </div>

    )
}
export default Loader;