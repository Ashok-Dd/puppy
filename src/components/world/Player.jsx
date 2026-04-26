import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail, Html, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { controls } from '../../stores/controlsStore';
import { SECTION_POSITIONS } from './Scene';

const SPEED = 15;
const SPRINT_SPEED = 25;
const PROXIMITY_DIST = 7;
const WEB_ZIP_SPEED = 35;

// ── Spider Character Mesh ──
function SpiderModel({ isMoving, isZipping }) {
  const bodyRef = useRef();
  const eyeRefL = useRef();
  const eyeRefR = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bodyRef.current) {
      // Breathing/floating effect
      bodyRef.current.position.y = Math.sin(t * 3) * 0.05 + 0.8;
      // Tilt when moving
      if (isMoving) {
        bodyRef.current.rotation.x = Math.sin(t * 10) * 0.1;
      }
    }
    // Animated eyes
    if (eyeRefL.current && eyeRefR.current) {
      const eyeScale = 1 + Math.sin(t * 2) * 0.1;
      eyeRefL.current.scale.setScalar(eyeScale);
      eyeRefR.current.scale.setScalar(eyeScale);
    }
  });

  return (
    <group>
      {/* Body */}
      <group ref={bodyRef}>
        {/* Abdomen */}
        <mesh position={[0, 0, 0.3]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial 
            color="#050510" 
            roughness={0.1} 
            metalness={0.8} 
            emissive="#ff1744" 
            emissiveIntensity={0.2} 
          />
        </mesh>
        {/* Thorax */}
        <mesh position={[0, 0.1, -0.2]} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#050510" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Eyes - Glowing Anime Style */}
        <mesh ref={eyeRefL} position={[-0.15, 0.25, -0.5]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        <mesh ref={eyeRefR} position={[0.15, 0.25, -0.5]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        {/* Glowing Spider Symbol */}
        <mesh position={[0, 0.35, 0.3]} rotation={[1.5, 0, 0]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial 
            color="#ff1744" 
            emissive="#ff1744" 
            emissiveIntensity={3} 
            transparent 
            opacity={0.9} 
          />
        </mesh>
      </group>
      {/* Detailed Legs */}
      {[-1, 1].map((side) =>
        [0, 1, 2, 3].map((i) => {
          const angle = (i - 1.5) * 0.5 + (side * 0.2);
          return (
            <group key={`${side}-${i}`} position={[side * 0.3, 0.7, (i - 1.5) * 0.2]}>
              <mesh rotation={[angle, 0, side * 1.2]}>
                <cylinderGeometry args={[0.025, 0.015, 0.9, 8]} />
                <meshStandardMaterial color="#0a0a1a" emissive="#ff1744" emissiveIntensity={0.5} />
              </mesh>
            </group>
          );
        })
      )}
    </group>
  );
}

// ── Web Line ──
function WebLine({ start, end }) {
  const points = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().lerp(e, 0.5).add(new THREE.Vector3(0, 2, 0));
    return new THREE.QuadraticBezierCurve3(s, mid, e).getPoints(50);
  }, [start, end]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.8} linewidth={2} />
    </line>
  );
}

export default function Player({ setActiveSection, activeSection, userName, showInfo }) {
  const groupRef = useRef();
  const playerPos = useRef(new THREE.Vector3(0, 0, 10));
  const { camera } = useThree();
  const [isZipping, setIsZipping] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const zipTarget = useRef(null);
  const [nearSection, setNearSection] = useState(null);
  const [showWebLine, setShowWebLine] = useState(false);
  const webLineTarget = useRef([0, 0, 0]);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const touchRef = useRef({ x: 0, y: 0 });

  // Handle keys and mobile touch rotation
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Enter') && !activeSection && nearSection) {
        setActiveSection(nearSection);
      }
      if (e.code === 'Escape' && activeSection) {
        setActiveSection(null);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        // Only rotate if not touching UI
        if (e.target.tagName === 'CANVAS' || e.target.id === 'game-world') {
          touchRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY, active: true };
        } else {
          touchRef.current.active = false;
        }
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && !activeSection && touchRef.current.active) {
        const dx = e.touches[0].pageX - touchRef.current.x;
        const dy = e.touches[0].pageY - touchRef.current.y;
        
        camera.rotation.order = 'YXZ';
        camera.rotation.y -= dx * 0.005;
        camera.rotation.x -= dy * 0.005;
        camera.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, camera.rotation.x));
        
        touchRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY, active: true };
      }
    };

    window.addEventListener('keydown', handleKey);
    if (isMobile) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [nearSection, activeSection, setActiveSection, camera, isMobile]);

  useFrame((state, delta) => {
    if (!groupRef.current || activeSection) return;
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // ── Movement Direction ──
    const frontVector = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    frontVector.y = 0;
    frontVector.normalize();

    const sideVector = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    sideVector.y = 0;
    sideVector.normalize();

    const moveDir = new THREE.Vector3(0, 0, 0);
    if (controls.forward) moveDir.add(frontVector);
    if (controls.backward) moveDir.sub(frontVector);
    if (controls.left) moveDir.sub(sideVector);
    if (controls.right) moveDir.add(sideVector);

    // Support analog/mobile input
    if (Math.abs(controls.joystickY) > 0.1) {
      moveDir.add(frontVector.clone().multiplyScalar(-controls.joystickY));
    }
    if (Math.abs(controls.joystickX) > 0.1) {
      moveDir.add(sideVector.clone().multiplyScalar(-controls.joystickX));
    }

    const moving = moveDir.lengthSq() > 0.01;
    setIsMoving(moving);

    if (isZipping && zipTarget.current) {
      const target = new THREE.Vector3(zipTarget.current.x, 0, zipTarget.current.z);
      const dir = target.clone().sub(playerPos.current);
      if (dir.length() < 5) {
        setIsZipping(false);
        setShowWebLine(false);
      } else {
        dir.normalize();
        playerPos.current.add(dir.multiplyScalar(WEB_ZIP_SPEED * dt));
        groupRef.current.lookAt(target.x, 0, target.z);
      }
    } else if (moving) {
      moveDir.normalize();
      const speed = controls.jump ? SPRINT_SPEED : SPEED;
      playerPos.current.add(moveDir.multiplyScalar(speed * dt));
      
      const targetRotation = Math.atan2(moveDir.x, moveDir.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        10 * dt
      );
    }

    // ── Handle Zip ──
    if (controls.jump && !isZipping) {
      let nearest = null;
      let minD = 50;
      Object.entries(SECTION_POSITIONS).forEach(([key, pos]) => {
        const d = playerPos.current.distanceTo(new THREE.Vector3(pos.x, 0, pos.z));
        if (d < minD && d > 6) {
          minD = d;
          nearest = { key, ...pos };
        }
      });
      if (nearest) {
        zipTarget.current = nearest;
        setIsZipping(true);
        setShowWebLine(true);
        webLineTarget.current = [nearest.x, 8, nearest.z];
      }
    }

    // ── Proximity ──
    let found = null;
    Object.entries(SECTION_POSITIONS).forEach(([key, pos]) => {
      if (playerPos.current.distanceTo(new THREE.Vector3(pos.x, 0, pos.z)) < PROXIMITY_DIST) {
        found = key;
      }
    });
    setNearSection(found);

    // ── Dynamic Camera Follow ──
    groupRef.current.position.copy(playerPos.current);
    
    // Chase camera logic
    const idealOffset = new THREE.Vector3(0, 3, 6).applyQuaternion(camera.quaternion);
    const targetCamPos = playerPos.current.clone().add(idealOffset);
    
    // Add movement bobbing/sway
    if (moving) {
      targetCamPos.y += Math.sin(t * 10) * 0.1;
      targetCamPos.x += Math.cos(t * 5) * 0.05;
    }

    camera.position.lerp(targetCamPos, 0.1);
  });

  return (
    <>
      {!isMobile && <PointerLockControls />}
      <group ref={groupRef}>
        <Trail width={1.5} length={8} color="#ff1744" attenuation={(t) => t * t}>
          <SpiderModel isMoving={isMoving} isZipping={isZipping} />
        </Trail>
      </group>

      {showWebLine && (
        <WebLine 
          start={[playerPos.current.x, playerPos.current.y + 1, playerPos.current.z]} 
          end={webLineTarget.current} 
        />
      )}

      {nearSection && !activeSection && (
        <Html position={[playerPos.current.x, playerPos.current.y + 4, playerPos.current.z]} center>
          <div className="glass" style={{
            padding: '12px 24px',
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            border: '2px solid var(--c-primary)',
            borderRadius: '12px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(255, 23, 68, 0.3)',
            animation: 'pulse-glow 1s infinite',
            background: 'rgba(0,0,0,0.8)'
          }}>
            HEY {userName.toUpperCase()},<br/>
            PRESS [E] TO ENTER {nearSection.toUpperCase()}
          </div>
        </Html>
      )}

      {showInfo && !activeSection && (
        <Html fullscreen>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="glass" style={{ padding: '40px', borderRadius: '24px', color: 'white', maxWidth: '500px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(10,10,26,0.95)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--c-primary)', marginBottom: '10px', fontSize: '1.5rem' }}>WELCOME {userName.toUpperCase()}</h2>
              <p style={{ opacity: 0.6, marginBottom: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>MISSION OBJECTIVE: EXPLORE THE PORTFOLIO</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '15px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--c-primary)' }}>[W]</span> <span>SWING FORWARD</span>
                <span style={{ color: 'var(--c-primary)' }}>[S]</span> <span>SWING BACK</span>
                <span style={{ color: 'var(--c-primary)' }}>[A/D]</span> <span>STRAFE LEFT/RIGHT</span>
                <span style={{ color: 'var(--c-primary)' }}>[MOUSE]</span> <span>LOOK AROUND</span>
                <span style={{ color: 'var(--c-primary)' }}>[SPACE]</span> <span>WEB-ZIP TO BUILDING</span>
                <span style={{ color: 'var(--c-primary)' }}>[E]</span> <span>ENTER SECTION</span>
                <span style={{ color: 'var(--c-primary)' }}>[M]</span> <span>TOGGLE DAY/NIGHT</span>
                <span style={{ color: 'var(--c-primary)' }}>[I]</span> <span>EXIT MISSION INFO</span>
              </div>
              <p style={{ marginTop: '40px', textAlign: 'center', opacity: 0.8, color: 'var(--c-primary)', fontWeight: 'bold' }}>CLICK SCREEN TO START</p>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
