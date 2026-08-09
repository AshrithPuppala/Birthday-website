import { useRef, useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import { MARK_STICKERS } from '../../config';
import './MarkCanvas.css';

/**
 * Click anywhere in the canvas and a random sticker pops up where you
 * clicked, then fades away after ~2.3s.
 */
export default function MarkCanvas() {
  const canvasRef = useRef(null);
  const [stickers, setStickers] = useState([]);
  const nextId = useRef(0);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = nextId.current++;
    const emoji = MARK_STICKERS[Math.floor(Math.random() * MARK_STICKERS.length)];
    setStickers((s) => [...s, { id, x, y, emoji }]);
    setTimeout(() => {
      setStickers((s) => s.filter((st) => st.id !== id));
    }, 2300);
  }

  return (
    <section id="mark-section">
      <SectionHead tag="leave your mark">Tap Anywhere</SectionHead>
      <div className="mark-canvas" id="markCanvas" ref={canvasRef} onClick={handleClick}>
        {stickers.map((s) => (
          <span
            key={s.id}
            className="mark-sticker"
            style={{ left: s.x, top: s.y }}
          >
            {s.emoji}
          </span>
        ))}
      </div>
    </section>
  );
}
