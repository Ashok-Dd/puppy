import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SectionPanel.module.css';
import HeroContent from '../sections/HeroContent';
import SkillsContent from '../sections/SkillsContent';
import ProjectsContent from '../sections/ProjectsContent';
import LeetCodeContent from '../sections/LeetCodeContent';
import ContactContent from '../sections/ContactContent';

import CertificationsContent from '../sections/CertificationsContent';

const SECTION_MAP = {
  hero: { Component: HeroContent, title: 'THE NEST / ABOUT', color: '#ff1744' },
  skills: { Component: SkillsContent, title: 'TECH ARSENAL / SKILLS', color: '#00e5ff' },
  projects: { Component: ProjectsContent, title: 'MISSION LOGS / PROJECTS', color: '#a855f7' },
  certifications: { Component: CertificationsContent, title: 'KNOWLEDGE HUB / CERTS', color: '#00ff88' },
  leetcode: { Component: LeetCodeContent, title: 'CODE VAULT / LEETCODE', color: '#ffab00' },
  contact: { Component: ContactContent, title: 'SIGNAL BEACON / CONTACT', color: '#00e676' },
};

export default function SectionPanel({ section, onClose }) {
  const panelRef = useRef(null);
  const config = SECTION_MAP[section];

  useEffect(() => {
    if (!panelRef.current || !config) return;

    const tl = gsap.timeline();
    tl.fromTo(panelRef.current,
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }
    );
    tl.fromTo(
      panelRef.current.querySelectorAll('[data-animate]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    return () => tl.kill();
  }, [section, config]);

  if (!config) return null;
  const { Component, title, color } = config;

  return (
    <div className={styles.overlay} onClick={onClose} id={`section-${section}`}>
      <div
        ref={panelRef}
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        style={{ '--section-color': color }}
      >
        <div className={styles.panelHeader}>
          <div className={styles.headerLine} style={{ background: color }} />
          <h2 className={styles.panelTitle} style={{ color }}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} id={`close-${section}`}>
            ✕
          </button>
        </div>
        <div className={styles.panelBody}>
          <Component />
        </div>
        <div className={styles.cornerTL} style={{ borderColor: color }} />
        <div className={styles.cornerBR} style={{ borderColor: color }} />
      </div>
    </div>
  );
}
