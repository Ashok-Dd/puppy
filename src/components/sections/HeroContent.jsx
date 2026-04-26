import { portfolioData } from '../../data/portfolioData';
import styles from './Sections.module.css';

export default function HeroContent() {
  const { personal } = portfolioData;

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroHeader}>
        <div className={styles.profileBox} data-animate>
          <img src="/profile.jpeg" alt={personal.name} className={styles.profileImg} />
          <div className={styles.profileGlow} />
        </div>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroName} data-animate>{personal.name}</h1>
          <h2 className={styles.heroTitle} data-animate>{personal.title}</h2>
          <p className={styles.heroSubtitle} data-animate>{personal.subtitle}</p>
        </div>
      </div>

      <div className={styles.heroBio} data-animate>
        {personal.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className={styles.statsGrid} data-animate>
        {personal.stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.statNum}>{stat.num}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
