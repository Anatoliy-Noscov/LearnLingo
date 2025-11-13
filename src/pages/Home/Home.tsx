import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Qualified Teachers',
      description: "All our teachers are certified professionals with years of experience",
      icon: '🎓'
    },
    {
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 access to lessons and materials.",
      icon: '⏰'
    }, 
    {
      title: "Interactive Lessons",
      description: "Engaging and interactive lessons that make learning fun and effective.",
      icon: '💬'
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with detailed reports and analytics.",
      icon: '📊'
    }
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Learn Languages with Native Speakers
          </h1>
          <p className={styles.heroDescription}>
            Discover the joy of learning new languages with our professional teachers.
            Start your journey today and unlock new opportunities!
          </p>
          <Link to="/teachers" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.placeholderImage}>🌍</div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Why Choose Learn Lingo?</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsContainer}> 
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

      <section className={styles.bottomCta}>
        <h2 className={styles.bottomCtaTitle}>Ready to Start Your Language Journey?</h2>
        <p className={styles.bottomCtaDescription}>
          Join thousands of students who have already transformed their language skills with Learn Lingo.
        </p>
        <Link to="/teachers" className={styles.ctaButton}>
          {user ? 'Browse Teachers' : 'Get Started Now'} 
        </Link>
      </section>
    </div>
  );
};

export default Home;