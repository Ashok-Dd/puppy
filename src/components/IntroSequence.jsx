import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './IntroSequence.module.css';

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('name-input');
  const [userName, setUserName] = useState('');
  const containerRef = useRef();
  const leftTearRef = useRef();
  const rightTearRef = useRef();
  const spiderRef = useRef();
  const titleRef = useRef();

  const startAnimation = () => {
    if (!userName.trim()) return;
    setPhase('animating');
  };

  useEffect(() => {
    if (phase !== 'animating') return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => onComplete(userName)
        });
      }
    });

    // 1. Spider crawl across
    tl.set(spiderRef.current, { x: '-10vw', opacity: 1 });
    tl.to(spiderRef.current, {
      x: '110vw',
      duration: 3,
      ease: 'power1.inOut',
      onUpdate: function() {
        const progress = this.progress();
        gsap.set(spiderRef.current, {
          y: Math.sin(progress * 20) * 20 + 'px'
        });
      }
    });

    // 2. Spider drops in center and "shoots" web
    tl.set(spiderRef.current, { x: '50vw', y: '-20vh', rotation: 180 });
    tl.to(spiderRef.current, {
      y: '45vh',
      duration: 0.6,
      ease: 'bounce.out'
    });

    // 3. Web Split Reveal
    tl.to(titleRef.current, { opacity: 1, scale: 1, duration: 1 }, "-=0.2");
    
    tl.to([leftTearRef.current, rightTearRef.current], {
      width: '0%',
      duration: 1.5,
      ease: 'power4.inOut',
      stagger: 0.1
    }, "+=0.5");

    tl.to(spiderRef.current, {
      scale: 5,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, "-=1");

  }, [phase, onComplete]);

  if (phase === 'name-input') {
    return (
      <div className={styles.nameInputOverlay}>
        <div className={styles.inputCard}>
          <h1 className={styles.inputTitle}>WHO ARE YOU?</h1>
          <input 
            type="text" 
            className={styles.nameInput} 
            placeholder="ENTER YOUR NAME..." 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startAnimation()}
          />
          <button className={styles.startButton} onClick={startAnimation}>
            BEGIN MISSION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Background layer */}
      <div className={styles.background}>
        <div className={styles.leftTear} ref={leftTearRef}>
          <div className={styles.tearContent}>
             <div className={styles.webPattern} />
          </div>
        </div>
        <div className={styles.rightTear} ref={rightTearRef}>
          <div className={styles.tearContent}>
            <div className={styles.webPattern} />
          </div>
        </div>
      </div>

      <div className={styles.titleWrapper} ref={titleRef}>
        <h1 className={styles.missionText}>MISSION: PORTFOLIO</h1>
        <h2 className={styles.agentName}>AGENT: {userName.toUpperCase()}</h2>
      </div>

      <div className={styles.spider} ref={spiderRef}>
        <div className={styles.spiderBody}>
          <div className={styles.eyes} />
        </div>
        <div className={styles.legs} />
      </div>

      <div className={styles.webSplash} id="web-splash" />
    </div>
  );
}
