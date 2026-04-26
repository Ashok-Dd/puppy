import { useEffect, useState } from 'react';
import styles from './HUD.module.css';

export default function HUD({ activeSection, userName, isDay, setIsDay, toggleInfo }) {
  const [showControls, setShowControls] = useState(true);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (activeSection) return null;

  return (
    <div className={styles.hud} id="game-hud">
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <span className={styles.logoSpider}>🕷️</span>
          <span className={styles.logoText}>AGENT: {userName.toUpperCase()}</span>
        </div>
        
        <div className={styles.controlsGroup}>
          <button 
            className={styles.themeToggle} 
            onClick={() => setIsDay(!isDay)}
            title={isDay ? "Switch to Night Mode" : "Switch to Day Mode"}
          >
            {isDay ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          
          <button 
            className={styles.themeToggle} 
            onClick={toggleInfo}
            title="Mission Controls"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </button>

          <div className={styles.missionStatus}>
            STATUS: ACTIVE EXPLORATION
          </div>
        </div>
      </div>

      {/* Controls hint */}
      {showControls && !activeSection && (
        <div className={styles.controlsHint}>
          {isMobile ? (
            <>
              <p>🕹️ Use joystick to move</p>
              <p>⚡ Tap ZAP to web-zip</p>
              <p>👆 Tap buildings to explore</p>
            </>
          ) : (
            <>
              <p><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move</p>
              <p><kbd>SPACE</kbd> Web-zip to nearest building</p>
              <p><kbd>E</kbd> Interact with building</p>
              <p><kbd>ESC</kbd> Close panel</p>
            </>
          )}
        </div>
      )}

      {/* Section proximity prompt */}
      {!activeSection && (
        <div className={styles.bottomHint} id="proximity-hint">
          <p>HEY {userName.toUpperCase()}, NAVIGATE TO THE GLOWING BEACONS TO EXPLORE THE MISSION</p>
        </div>
      )}
    </div>
  );
}
