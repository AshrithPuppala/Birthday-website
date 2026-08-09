import { useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import SecretSpot from '../ButterflyHunt/SecretSpot';
import { useTreasureHunt } from '../ButterflyHunt/TreasureHuntContext';
import polaroidData from '../../data/polaroidData';
import { THEN_IMAGE, NOW_IMAGE } from '../../data/compareImages';
import './Polaroids.css';

function Polaroid({ p }) {
  const [flipped, setFlipped] = useState(false);
  const { markTreasureFound } = useTreasureHunt();

  return (
    <div
      className={`polaroid${flipped ? ' flipped' : ''}`}
      onClick={() => {
        setFlipped((f) => !f);
        markTreasureFound('polaroid');
      }}
    >
      <div className="polaroid-inner">
        <figure className="polaroid-face">
          {p.type === 'video' ? (
            <video className="ph-photo" src={p.src} muted loop playsInline autoPlay />
          ) : (
            <div className="ph-photo">
              <img src={p.src} alt="memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </figure>
        <div className="polaroid-face polaroid-back">{p.back}</div>
      </div>
    </div>
  );
}

function CompareSlider() {
  const [value, setValue] = useState(50);
  return (
    <div className="compare-wrap">
      <h3 style={{ textAlign: 'center' }}>Then vs. Now</h3>
      <div className="compare-slider">
        <div className="compare-img then">
          <img src={THEN_IMAGE} alt="Then" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div
          className="compare-img now"
          id="compareNow"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          <img src={NOW_IMAGE} alt="Now" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <input
        type="range"
        className="compare-range"
        id="compareRange"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}

export default function Polaroids() {
  return (
    <section id="polaroid-section">
      <SectionHead tag="memory lane">Flip the Polaroids</SectionHead>
      <div className="polaroid-grid" id="polaroidGrid">
        {polaroidData.map((p, i) => (
          <Polaroid p={p} key={i} />
        ))}
      </div>
      <CompareSlider />
      <SecretSpot id="s4" />
    </section>
  );
}
