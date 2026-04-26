import { portfolioData } from '../../data/portfolioData';
import styles from './Sections.module.css';

export default function ContactContent() {
  const { personal } = portfolioData;

  // Dynamically build links based on available data
  const links = [
    { label: 'Email', icon: '📧', val: personal.email, href: `mailto:${personal.email}`, color: '#ff1744' },
    { label: 'GitHub', icon: '🐙', val: personal.github, href: personal.github, color: '#ffffff' },
    { label: 'LinkedIn', icon: '💼', val: personal.linkedin, href: personal.linkedin, color: '#00e5ff' },
  ].filter(l => l.val);

  return (
    <div className={styles.contactContainer} data-animate>
      <div className={styles.contactHeader}>
        <h3>READY FOR THE NEXT MISSION?</h3>
        <p>Let's build something intelligent together.</p>
      </div>

      <div className={styles.contactGrid}>
        {links.map((link, i) => (
          <a 
            key={i} 
            href={link.href} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.contactCard}
            style={{ '--link-color': link.color }}
          >
            <span className={styles.contactIcon}>{link.icon}</span>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>{link.label}</span>
              <span className={styles.contactValue}>{link.val.replace('https://', '').replace('www.', '')}</span>
            </div>
            <div className={styles.contactArrow}>→</div>
          </a>
        ))}
      </div>

      <div className={styles.contactFooter}>
        <div className={styles.footerInfo}>
          <span className={styles.footerIcon}>📍</span>
          <span>{personal.location}</span>
        </div>
        <div className={styles.footerInfo}>
          <span className={styles.footerIcon}>📱</span>
          <span>{personal.phone}</span>
        </div>
      </div>
    </div>
  );
}
