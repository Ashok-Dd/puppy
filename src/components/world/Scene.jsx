import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// ── Section building positions ──
export const SECTION_POSITIONS = {
  hero:           { x: 0,    z: -40,  color: '#ff1744', label: 'THE NEST' },
  skills:         { x: -60,  z: -90,  color: '#00e5ff', label: 'TECH ARSENAL' },
  projects:       { x: 60,   z: -90,  color: '#e040fb', label: 'MISSION LOGS' },
  certifications: { x: 0,    z: -160, color: '#00ff88', label: 'KNOWLEDGE HUB' },
  leetcode:       { x: -70,  z: -220, color: '#ffab00', label: 'CODE VAULT' },
  contact:        { x: 70,   z: -220, color: '#00e676', label: 'SIGNAL BEACON' },
};

// ── Detailed Building Component ──
function DetailedBuilding({ position, size, color }) {
  const [w, h, d] = size;
  
  return (
    <group position={position}>
      {/* Main Structure */}
      <mesh castShadow={false} receiveShadow={false}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#050510"
          roughness={0.5}
          metalness={0.5}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Simplified Window Grid */}
      <mesh position={[0, 0, d / 2 + 0.05]}>
        <planeGeometry args={[w * 0.9, h * 0.9, Math.floor(w), Math.floor(h / 2)]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Edge Highlights */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// ── Section Beacon ──
function SectionBeacon({ position, color, label, activeSection }) {
  const beaconRef = useRef();

  useFrame((state) => {
    if (beaconRef.current) {
      beaconRef.current.position.y = 10 + Math.sin(state.clock.elapsedTime * 2) * 1;
      beaconRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  if (activeSection) return null;

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Central Gem */}
      <group ref={beaconRef}>
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={15} />
        </mesh>
        <pointLight intensity={10} distance={15} color={color} />
      </group>
      
      {/* Beam of Light */}
      <mesh position={[0, 50, 0]}>
        <cylinderGeometry args={[0.2, 2, 100, 32, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      <Html position={[0, 22, 0]} center>
        <div style={{
          fontFamily: 'var(--font-display)',
          color: 'white',
          fontSize: '12px',
          fontWeight: '900',
          letterSpacing: '0.4em',
          textShadow: `0 0 20px ${color}`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          background: 'rgba(0,0,0,0.8)',
          padding: '8px 24px',
          borderRadius: '4px',
          border: `1px solid ${color}`,
          textTransform: 'uppercase',
          boxShadow: `0 0 15px ${color}44`
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

// ── Background City ──
function CityBuildings() {
  const buildings = useMemo(() => {
    const arr = [];
    const colors = ['#ff1744', '#00e5ff', '#e040fb', '#ffab00', '#00e676'];
    for (let i = 0; i < 40; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (70 + Math.random() * 80);
      const z = -Math.random() * 250 + 20;
      const h = 15 + Math.random() * 60;
      const w = 8 + Math.random() * 12;
      const d = 8 + Math.random() * 12;
      arr.push({
        key: i,
        position: [x, h / 2, z],
        size: [w, h, d],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <DetailedBuilding
          key={b.key}
          position={b.position}
          size={b.size}
          color={b.color}
        />
      ))}
    </group>
  );
}

// ── Sun and Moon Component ──
function SunMoon({ isDay }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.1;
      // Subtle floating movement
      ref.current.position.y = (isDay ? 100 : 80) + Math.sin(t) * 5;
    }
  });

  return (
    <group ref={ref} position={[50, 100, -150]}>
      <mesh>
        <sphereGeometry args={[isDay ? 15 : 10, 32, 32]} />
        <meshBasicMaterial 
          color={isDay ? "#ffcc33" : "#f4f4f4"} 
        />
      </mesh>
      {/* Glow */}
      <pointLight 
        intensity={isDay ? 20 : 10} 
        distance={200} 
        color={isDay ? "#ffaa00" : "#ffffff"} 
      />
      {!isDay && (
        <mesh scale={1.2}>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
}

// ── Main Scene ──
export default function Scene({ activeSection, isDay }) {
  const bgColor = isDay ? '#00bbff' : '#020205';
  const fogColor = isDay ? '#00bbff' : '#020205';

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 200, 1000]} />
      
      {!isDay && <Stars radius={100} depth={40} count={2000} factor={4} saturation={0} fade speed={1} />}
      
      <SunMoon isDay={isDay} />

      <ambientLight intensity={isDay ? 0.9 : 0.2} />
      
      {/* Sun / Moon Directional Light */}
      {isDay ? (
        <directionalLight 
          position={[50, 100, 50]} 
          intensity={1.8} 
          color="#ffffff"
          castShadow={false}
        />
      ) : (
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={0.6} 
          color="#c2c2ff"
          castShadow={false}
        />
      )}

      <CityBuildings />

      {/* Section Landmarks */}
      {Object.entries(SECTION_POSITIONS).map(([key, sec]) => (
        <group key={key}>
          <DetailedBuilding
            position={[sec.x, 10, sec.z]}
            size={[15, 20, 15]}
            color={sec.color}
          />
          <SectionBeacon position={sec} color={sec.color} label={sec.label} activeSection={activeSection} />
        </group>
      ))}

      {/* City Street Land */}
      <group position={[0, -0.1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2000, 2000]} />
          <meshStandardMaterial 
            color={isDay ? "#111" : "#05050a"} 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
      </group>
    </>
  );
}
