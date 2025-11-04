import React from 'react';
import styles from './Filter.module.css';


interface FilterProps {
    filters: {
        language: string;
        level: string;
        price: number;
    };

    onFilterChange: (filters: {language: string; level: string; price: number}) => void;
}

export const Filter: React.FC<FilterProps> = ({filters, onFilterChange }) => {
    const languages = [
        'English', 'Spanish', 'French', 'German', 'Italian', 'Mandarin Chinese', 'Korean', 'Vietnamese'
    ]

    const levels = [
        'A1 Beginner',
        'A2 Elementary',
        'B1 Intermediate',
        'B2 Upper-Intermediate',
        'C1 Advanced',
        'C2 Proficient'
    ];

    const priceRanges = [
        {value: 0, label: 'Any price' },
        {value: 20, label: 'Up to $20' },
        {value: 30, label: 'Up to $30' },
        {value: 40, label: 'Up to $40' },
        {value: 50, label: 'Up to $50' },
    ];


    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        onFilterChange({
            ...filters,
            language: event.target.value
        });
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            level: event.target.value
        });
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>)=> {
        onFilterChange({
            ...filters,
            price: Number(event.target.value)
        })
    };

    const handleResetFilters = () => {
        onFilterChange({
            language: '',
            level: '',
            price: 0
        });
    };

    const hasActiveFilters = filters.language || filters.level || filters.price > 0;

        return (
            <div className={styles.filterContainer}>
                {/** Title section filters */}

                <h3 className={styles.filterTitle}>Filter Teachers</h3>

                {/* сетка фильтров используем Грид для адаптивного расположения*/}

                <div className={styles.filterGrid}>
                    {/*Фильтр по языку */}

                    
                </div>

            </div>
        )


}