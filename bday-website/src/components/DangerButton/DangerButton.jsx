import { useRef, useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import SecretSpot from '../ButterflyHunt/SecretSpot';
import { useTreasureHunt } from '../ButterflyHunt/TreasureHuntContext';
import { MEME_EMOJIS } from '../../config';
import { fireConfetti } from '../../utils/confetti';
import './DangerButton.css';

const MAX_DODGES = 4;

function playSynthAlarm() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 660, now + i * 0.15);
      gain.gain.setValueAtTime(0.15, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.14);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.15);
    }
  } catch {
    // no audio support - silently skip, same as the original try/catch
  }
}

/**
 * The "DO NOT PRESS" button. Dodges the cursor a few times, then gives in
 * and throws a confetti + emoji meme burst.
 */
export default function DangerButton() {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const burstRef = useRef(null);
  const [dodges, setDodges] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [pos, setPos] = useState(null);
  const { markTreasureFound } = useTreasureHunt();

  function dodgeButton() {
    if (pressed || dodges >= MAX_DODGES) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const btnSize = 150;
    const maxX = Math.max(wrapRect.width - btnSize, 0);
    const maxY = Math.max(wrapRect.height - btnSize, 0);
    setPos({ left: Math.random() * maxX, top: Math.random() * maxY, position: 'absolute' });
    setDodges((d) => d + 1);
  }

  function handleMouseMove(e) {
    if (pressed || dodges >= MAX_DODGES || !btnRef.current) return;
    const btnRect = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - (btnRect.left + btnRect.width / 2);
    const dy = e.clientY - (btnRect.top + btnRect.height / 2);
    if (Math.sqrt(dx * dx + dy * dy) < 90) dodgeButton();
  }

  function spawnMemeBurst() {
    const burst = burstRef.current;
    if (!burst) return;
    for (let i = 0; i < 26; i++) {
      const el = document.createElement('div');
      el.className = 'meme-emoji';
      el.textContent = MEME_EMOJIS[Math.floor(Math.random() * MEME_EMOJIS.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * 300;
      el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      el.style.setProperty('--rot', Math.random() * 720 - 360 + 'deg');
      el.style.left = '50%';
      el.style.top = '40%';
      burst.appendChild(el);
      setTimeout(() => el.remove(), 1900);
    }
  }

  function handleClick() {
    if (dodges < MAX_DODGES) {
      dodgeButton();
      return;
    }
    setPressed(true);
    fireConfetti({ particleCount: 250, spread: 160, origin: { y: 0.4 } });
    setTimeout(
      () =>
        fireConfetti({ particleCount: 150, spread: 200, startVelocity: 55, origin: { y: 0.3 } }),
      300
    );
    spawnMemeBurst();
    playSynthAlarm();
    markTreasureFound('danger');
  }

  return (
    <section id="danger-section">
      <SectionHead tag="seriously, don't">The Big Red Button</SectionHead>
      <div className="danger-wrap" ref={wrapRef} onMouseMove={handleMouseMove}>
        <button
          className="danger-btn"
          id="dangerBtn"
          ref={btnRef}
          style={pressed ? { position: 'static' } : pos || undefined}
          onClick={handleClick}
        >
          {pressed ? "Idiot can't you just listen to me for once" : (
            <>
              DO NOT
              <br />
              PRESS
            </>
          )}
        </button>
      </div>
      <div className="meme-burst" id="memeBurst" ref={burstRef} />
      <SecretSpot id="s2" />
    </section>
  );
}
