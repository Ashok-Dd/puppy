import { portfolioData } from '../../data/portfolioData';
import styles from './Sections.module.css';

export default function CertificationsContent() {
  const { certifications } = portfolioData;

  return (
    <div className={styles.certsContainer}>
      <div className={styles.certsGrid}>
        {certifications.map((cert, i) => (
          <div 
            key={i} 
            className={styles.certCard} 
            style={{ '--cert-color': cert.color }}
            data-animate
          >
            <div className={styles.certIcon}>{cert.icon}</div>
            <div className={styles.certInfo}>
              <h3>{cert.name}</h3>
              <p>{cert.org}</p>
              <span className={styles.certBadge}>{cert.badge}</span>
            </div>
            <div className={styles.certGlow} />
          </div>
        ))}
      </div>
    </div>
  );
}
