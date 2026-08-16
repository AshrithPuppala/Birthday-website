import { useState } from 'react';
import { PASSCODE } from '../../config';
import { fireConfetti } from '../../utils/confetti';
import './PasscodeGate.css';

/**
 * The full-screen lock screen shown before the site is revealed. Calls
 * onUnlock() once the correct passcode is entered - App.jsx owns the
 * `unlocked` boolean and disables body scroll while this is showing.
 */
export default function PasscodeGate({ unlocked, onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  function tryUnlock() {
    if (value.trim().toLowerCase() === PASSCODE.toLowerCase()) {
      fireConfetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
      setTimeout(
        () => fireConfetti({ particleCount: 100, spread: 120, origin: { y: 0.4 } }),
        400
      );
      onUnlock();
    } else {
      setError('Not quite - try again');
      setShake(false);
      requestAnimationFrame(() => setShake(true));
    }
  }

  return (
    <div id="gate" className={unlocked ? 'hidden' : ''}>
      <div
        className="gate-card"
        style={shake ? { animation: 'shake 0.4s' } : undefined}
        onAnimationEnd={() => setShake(false)}
      >
        <span className="flower-icon">&#127754;</span>
        <h1>A secret is waiting</h1>
        <p>
          When was the first time we went out (all 4 of us)?
        </p>
        <input
          type="text"
          id="passcodeInput"
          placeholder="Type the passcode..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
        />
        <br />
        <button className="btn" id="unlockBtn" onClick={tryUnlock}>
          Unlock
        </button>
        <div id="gate-error">{error}</div>
      </div>
    </div>
  );
}
