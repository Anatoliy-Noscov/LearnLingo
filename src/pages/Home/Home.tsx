import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../Home/Home.module.css';



export const Home: React.FC = () => {
    const {user} = useAuth();

    const features = [
        {
            title: 'Qualified Teachers',
            description: "All our teachers are certified professionals with years of experience",
            icon: '🎓'
        },
        {
            title: "Flexible Schedule",
            description: "Learn at your own pace with 24/7 access to lessons and mate rials.",
            icon: '⏰'
        }
        {
            title: "Interactive Lessons",
            description: "Engaging and  interactive lessons that make learning fun and effective.",
            icon: '💬'
        },
        {
            title: "Progress Tracking",
            description: "Monitor your progress with detailed reports and analytics.",
            icon: '📊'
        }
    ];



    return  (
        <div className={styles.container}>
            {/*Hero sections */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                    Learn Languages with Native Speakers
                    </h1>
                    <p className={styles.heroDescription}>
                        Discover the joy of learnint new languages with our professional teachers.
                        Start your jorney today and unlock new opportunities!
                    </p>
                    {/* Button go to page teachers */}
                    <Link to="/teachers" className={styles.ctaButton}>
                    Get Started
                    </Link>
                </div>

                {/* декоративный элемент можно добавить позже*/}
                <div className={styles.heroImage}>
                    <div className={styles.placeholderImage}>🌍
                    </div>
                </div>
            </section>  


            {/* секция преимуществ - почему стоит выбрать нашу платформу */}
            <section className={styles.features}>
                <h2 className={styles.featuresTitle}>Why Choose Learn Lingo?</h2>
                <div className={styles.featuresGrid}>
                    {/* Map для рендеринга списка пруиьуществ*/}
                    {/* */}
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
           

            {/* секция статистики - показывает цифры для доверия пользователя */}
            <section className={styles.stats}>
                <div className={styles.statusContainer}>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>1000+</div>
                        <div className={styles.statLabel}>Happy Students</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>50+</div>
                        <div className={styles.statLabel}>Professional Teachers</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>10+</div>
                        <div className={styles.statLabel}>Languages Available</div>
                    </div>
                </div>
            </section>

            {/* Секция призыва к действию в конце страницы */}
            <section className={styles.bottomCta}>
                <h2 className={styles.bottomCtaTitle}>Ready to Start Your Language Journey?</h2>
                <p className={styles.bottomCtaDescription}>
                    Join thousands of students who have already transformed their language skills with Learn Lingo.
                </p>
                <Link to="/teachers" className={styles.ctaButton}>
                {user ? 'Browse Teacher' : 'Get Started Now'}
                </Link>
            </section>
            
        </div>
    )

}

export default Home;
