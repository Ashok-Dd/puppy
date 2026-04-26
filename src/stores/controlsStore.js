// Shared mutable state for game controls
// Both keyboard and mobile joystick write to this,
// and the Player component reads from it in useFrame()

export const controls = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  action: false,
  // Mobile joystick values (-1 to 1)
  joystickX: 0,
  joystickY: 0,
};

// Keyboard listeners
const keyMap = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'backward', ArrowDown: 'backward',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  Space: 'jump',
  KeyE: 'action',
  KeyI: 'info',
};

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    const action = keyMap[e.code];
    if (action) {
      controls[action] = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    const action = keyMap[e.code];
    if (action) {
      controls[action] = false;
    }
  });
}
