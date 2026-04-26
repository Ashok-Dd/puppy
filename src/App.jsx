import { useState, useCallback, useEffect } from 'react';
import IntroSequence from './components/IntroSequence';
import GameWorld from './components/GameWorld';
import './index.css';

export default function App() {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'game'
  const [activeSection, setActiveSection] = useState(null);
  const [userName, setUserName] = useState('');
  const [isDay, setIsDay] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyM') {
        setIsDay(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleIntroComplete = useCallback((name) => {
    setUserName(name || 'AGENT');
    setPhase('game');
  }, []);

  return (
    <div id="app-root" style={{ width: '100%', height: '100%' }}>
      {phase === 'intro' && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}
      {phase === 'game' && (
        <GameWorld
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          userName={userName}
          isDay={isDay}
          setIsDay={setIsDay}
        />
      )}
    </div>
  );
}
