import { useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import { useTreasureHunt } from '../ButterflyHunt/TreasureHuntContext';
import jokesData from '../../data/jokesData';
import './Jokes.css';

export default function Jokes() {
  const [joke, setJoke] = useState('Click the flower...');
  const [bloom, setBloom] = useState(false);
  const { markTreasureFound } = useTreasureHunt();

  function reveal() {
    setJoke(jokesData[Math.floor(Math.random() * jokesData.length)]);
    setBloom(true);
    setTimeout(() => setBloom(false), 300);
    markTreasureFound('bloom');
  }

  return (
    <section id="joke-section">
      <SectionHead tag="press in case of emergency">Click for Nostalgia</SectionHead>
      <div className="joke-bloom">
        <button
          className="bloom-btn"
          id="bloomBtn"
          aria-label="Reveal an inside joke"
          style={bloom ? { transform: 'scale(1.3) rotate(15deg)' } : undefined}
          onClick={reveal}
        >
          &#127804;
        </button>
        <div className="joke-card" id="jokeCard">
          {joke}
        </div>
      </div>
    </section>
  );
}
