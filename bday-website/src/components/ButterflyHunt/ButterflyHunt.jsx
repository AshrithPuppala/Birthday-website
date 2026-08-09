import { useState } from 'react';
import { useTreasureHunt } from './TreasureHuntContext';
import { percentFound, scrollToSection } from '../../utils/stego';
import './ButterflyHunt.css';

/**
 * Floating "🦋 Hidden Hunt" toggle + clue panel. Mount this once, anywhere,
 * near the bottom of <App/> - it's positioned fixed so placement in the
 * tree doesn't matter. Pairs with <SecretSpot id="..."/> placed inside the
 * six sections listed in treasureData.
 */
export default function ButterflyHunt() {
  const [open, setOpen] = useState(false);
  const { treasureData, found, foundCount, total } = useTreasureHunt();

  return (
    <>
      <button id="treasureToggle" onClick={() => setOpen((o) => !o)}>
        🦋 Hidden Hunt ({foundCount}/{total})
      </button>
      <div id="treasurePanel" className={open ? 'open' : ''}>
        <h4>Find it all!</h4>
        <div className="th-progress">
          <div
            className="th-progress-bar"
            style={{ width: `${percentFound(foundCount, total)}%` }}
          />
        </div>
        <div id="thClueList">
          {treasureData.map((t) => (
            <div
              key={t.id}
              className={`th-clue${found[t.id] ? ' done' : ''}`}
              onClick={() => scrollToSection(t.section)}
            >
              <span className="th-check">{found[t.id] ? '✅' : '🔎'}</span>
              <span>{t.clue}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
