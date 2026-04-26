import { useRef, useCallback, useEffect, useState } from 'react';
import { controls } from '../../stores/controlsStore';
import styles from './MobileControls.module.css';
import { FiMove, FiZap, FiTarget } from 'react-icons/fi';

export default function MobileControls() {
  const joystickRef = useRef(null);
  const knobRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [useTilt, setUseTilt] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);

  // Calibration/Neutral point
  const neutralTilt = useRef({ beta: 45, gamma: 0 });

  const handleJoystickStart = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    const touch = e.touches ? e.touches[0] : e;
    const rect = joystickRef.current.getBoundingClientRect();
    startPos.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  const handleJoystickMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const dx = touch.clientX - startPos.current.x;
    const dy = touch.clientY - startPos.current.y;
    const maxDist = 40;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
    const angle = Math.atan2(dy, dx);
    const clampedX = Math.cos(angle) * dist;
    const clampedY = Math.sin(angle) * dist;

    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    }

    controls.joystickX = -(clampedX / maxDist);
    controls.joystickY = clampedY / maxDist;
  }, []);

  const handleJoystickEnd = useCallback(() => {
    isDragging.current = false;
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(0, 0)';
    }
    if (!useTilt) {
      controls.joystickX = 0;
      controls.joystickY = 0;
    }
  }, [useTilt]);

  // ── Tilt Logic ──
  const toggleTilt = async () => {
    if (useTilt) {
      setUseTilt(false);
      controls.joystickX = 0;
      controls.joystickY = 0;
      return;
    }

    // Request permission (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setUseTilt(true);
          setGyroActive(true);
        }
      } catch (err) {
        console.error('Gyroscope permission denied', err);
      }
    } else {
      // Android or older iOS
      setUseTilt(true);
      setGyroActive(true);
    }
  };

  useEffect(() => {
    if (!useTilt) return;

    const handleOrientation = (e) => {
      // Beta: Tilt forward/back [-180, 180] -> target neutral 45
      // Gamma: Tilt left/right [-90, 90] -> target neutral 0
      
      const sensitivity = 0.05;
      const deadzone = 5;
      
      let dy = e.beta - neutralTilt.current.beta;
      let dx = e.gamma - neutralTilt.current.gamma;

      // Clamp values
      dy = Math.max(Math.min(dy, 30), -30);
      dx = Math.max(Math.min(dx, 30), -30);

      // Apply deadzone and normalize
      controls.joystickY = Math.abs(dy) > deadzone ? (dy / 30) : 0;
      controls.joystickX = Math.abs(dx) > deadzone ? -(dx / 30) : 0;
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [useTilt]);

  useEffect(() => {
    const opts = { passive: false };
    window.addEventListener('touchmove', handleJoystickMove, opts);
    window.addEventListener('touchend', handleJoystickEnd);
    return () => {
      window.removeEventListener('touchmove', handleJoystickMove);
      window.removeEventListener('touchend', handleJoystickEnd);
    };
  }, [handleJoystickMove, handleJoystickEnd]);

  const handleZap = () => {
    controls.jump = true;
    setTimeout(() => { controls.jump = false; }, 200);
  };

  const handleAction = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    setTimeout(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));
    }, 100);
  };

  return (
    <div className={styles.controls} id="mobile-controls">
      {/* Joystick / Gyro Toggle */}
      <div className={styles.leftControls}>
        <div
          ref={joystickRef}
          className={`${styles.joystickBase} ${useTilt ? styles.joystickDisabled : ''}`}
          onTouchStart={handleJoystickStart}
        >
          <div ref={knobRef} className={styles.joystickKnob} />
        </div>
        
        <button 
          className={`${styles.tiltToggle} ${useTilt ? styles.active : ''}`}
          onClick={toggleTilt}
        >
          <FiMove />
          <span>{useTilt ? 'TILT ON' : 'TILT OFF'}</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${styles.btnZap}`}
          onTouchStart={handleZap}
          id="btn-webzip"
        >
          <FiZap />
        </button>
        <button
          className={`${styles.btn} ${styles.btnAction}`}
          onTouchStart={handleAction}
          id="btn-action"
        >
          <FiTarget />
        </button>
      </div>
    </div>
  );
}

