import { useEffect, useRef } from 'react';
import butterflySVG from '../../assets/butterflySvg';
import './AmbientLayer.css';

const PETAL_EMOJIS = ['\u{1F338}', '\u{1F337}', '\u{1F4AE}'];

/**
 * Fixed full-screen layer that continuously spawns drifting decorative
 * butterflies and falling petals. Pure DOM-node juggling (like the
 * original), just scoped to a ref instead of document.getElementById.
 */
export default function AmbientLayer() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    function spawnButterfly() {
      const b = document.createElement('div');
      b.className = 'butterfly';
      b.innerHTML = butterflySVG;
      const left = Math.random() * 96;
      const duration = 14 + Math.random() * 10;
      const swayDur = 3 + Math.random() * 2;
      b.style.left = left + 'vw';
      b.style.animationDuration = `${duration}s, ${swayDur}s`;
      layer.appendChild(b);
      setTimeout(() => b.remove(), duration * 1000);
    }

    function spawnPetal() {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
      p.style.left = Math.random() * 100 + 'vw';
      const duration = 9 + Math.random() * 6;
      p.style.animationDuration = duration + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), duration * 1000);
    }

    const butterflyInterval = setInterval(spawnButterfly, 2600);
    const petalInterval = setInterval(spawnPetal, 1400);
    const kickoffTimers = [0, 1, 2, 3].map((i) => setTimeout(spawnButterfly, i * 700));

    return () => {
      clearInterval(butterflyInterval);
      clearInterval(petalInterval);
      kickoffTimers.forEach(clearTimeout);
      layer.innerHTML = '';
    };
  }, []);

  return <div className="ambient-layer" id="ambientLayer" ref={layerRef} />;
}
