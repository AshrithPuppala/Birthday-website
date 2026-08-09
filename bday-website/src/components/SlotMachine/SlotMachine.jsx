import { useRef, useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import complimentsData from '../../data/complimentsData';
import { SLOT_EMOJIS } from '../../config';
import { fireConfetti } from '../../utils/confetti';
import './SlotMachine.css';

const MAX_TICKS = 16;
const TICK_MS = 80;

function randomEmoji() {
  return SLOT_EMOJIS[Math.floor(Math.random() * SLOT_EMOJIS.length)];
}

export default function SlotMachine() {
  const [symbol, setSymbol] = useState(SLOT_EMOJIS[0]);
  const [result, setResult] = useState('');
  const spinningRef = useRef(false);

  function spin() {
    if (spinningRef.current) return;
    spinningRef.current = true;
    setResult('');
    let ticks = 0;
    const interval = setInterval(() => {
      setSymbol(randomEmoji());
      ticks++;
      if (ticks >= MAX_TICKS) {
        clearInterval(interval);
        setSymbol(randomEmoji());
        setResult(complimentsData[Math.floor(Math.random() * complimentsData.length)]);
        spinningRef.current = false;
        fireConfetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }, TICK_MS);
  }

  return (
    <section id="slot-section">
      <SectionHead tag="spin for a compliment">Compliment Machine</SectionHead>
      <div className="slot-wrap">
        <div className="slot-window" id="slotWindow">
          {symbol}
        </div>
        <button className="btn" id="slotBtn" onClick={spin}>
          Spin
        </button>
        <p className="slot-result" id="slotResult">
          {result}
        </p>
      </div>
    </section>
  );
}
