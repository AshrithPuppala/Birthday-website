import { useEffect, useRef } from 'react';
import './AmbientLayer.css';

const BEACH_EMOJIS = ['\u{1F41A}', '\u{2B50}', '\u{1FAB8}'];

/**
 * Fixed full-screen layer that continuously spawns drifting decorative
 * bubbles and floating beach bits (shells / starfish / coral). Pure
 * DOM-node juggling (like the original), just scoped to a ref instead
 * of document.getElementById.
 */
export default function AmbientLayer() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    function spawnBubble() {
      const b = document.createElement('div');
      b.className = 'bubble';
      const left = Math.random() * 96;
      const size = 8 + Math.random() * 22;
      const duration = 10 + Math.random() * 10;
      const swayDur = 3 + Math.random() * 2;
      b.style.left = left + 'vw';
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.animationDuration = `${duration}s, ${swayDur}s`;
      layer.appendChild(b);
      setTimeout(() => b.remove(), duration * 1000);
    }

    function spawnDrift() {
      const p = document.createElement('div');
      p.className = 'beach-drift';
      p.textContent = BEACH_EMOJIS[Math.floor(Math.random() * BEACH_EMOJIS.length)];
      p.style.left = Math.random() * 100 + 'vw';
      const duration = 9 + Math.random() * 6;
      p.style.animationDuration = duration + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), duration * 1000);
    }

    const bubbleInterval = setInterval(spawnBubble, 900);
    const driftInterval = setInterval(spawnDrift, 1800);
    const kickoffTimers = [0, 1, 2, 3].map((i) => setTimeout(spawnBubble, i * 500));

    return () => {
      clearInterval(bubbleInterval);
      clearInterval(driftInterval);
      kickoffTimers.forEach(clearTimeout);
      layer.innerHTML = '';
    };
  }, []);

  return <div className="ambient-layer" id="ambientLayer" ref={layerRef} />;
}
