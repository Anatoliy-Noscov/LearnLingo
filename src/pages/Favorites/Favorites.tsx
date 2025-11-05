import React from 'react';
import {useAuth} from "../../context/AuthContext";
import styles from './Favorites.module.css';


export const Favorites: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className={styles.container}>
                <h1>Favorites</h1>
                <p>Please log in to view your favorite teachers.</p>
            </div>
        );
    }


    return (
        <div className={styles.container}>
            <h1>Your Favorite Teachers</h1>
            <p>Your favorites will appear here.</p>
        </div>
    )
}

export default Favorites;