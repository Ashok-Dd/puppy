import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import Scene from './world/Scene';
import Player from './world/Player';
import styles from './GameWorld.module.css';
import MobileControls from './ui/MobileControls';
import HUD from './ui/HUD';
import SectionPanel from './ui/SectionPanel';

export default function GameWorld({ activeSection, setActiveSection, userName, isDay, setIsDay }) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyI') {
        toggleInfo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.container} id="game-world">
      <Canvas
        shadows={false} // Disable shadows for significant performance gain
        camera={{ position: [0, 8, 15], fov: 60, near: 0.1, far: 500 }}
        dpr={[1, 1.5]} // Cap resolution
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          stencil: false, 
          depth: true 
        }}
        style={{ background: '#020205' }}
      >
        <Suspense fallback={null}>
          <Scene activeSection={activeSection} isDay={isDay} />
          <Player setActiveSection={setActiveSection} activeSection={activeSection} userName={userName} showInfo={showInfo} />
          
          <EffectComposer multisampling={0}>
            <Bloom 
              intensity={1.5} 
              luminanceThreshold={0.4} 
              luminanceSmoothing={0.7} 
            />
            <ChromaticAberration 
              offset={[0.001, 0.001]} 
            />
          </EffectComposer>

          <Environment preset="night" />
        </Suspense>
      </Canvas>

       <HUD activeSection={activeSection} userName={userName} isDay={isDay} setIsDay={setIsDay} toggleInfo={toggleInfo} />

      {activeSection && (
        <SectionPanel
          section={activeSection}
          onClose={() => setActiveSection(null)}
        />
      )}

      {isMobile && <MobileControls />}
    </div>
  );
}
