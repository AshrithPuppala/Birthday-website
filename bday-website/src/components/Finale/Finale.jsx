import { useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import { fireConfetti } from '../../utils/confetti';
import './Finale.css';

export default function Finale() {
  const [open, setOpen] = useState(false);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      fireConfetti({ particleCount: 200, spread: 100, origin: { y: 0.7 } });
    }
  }

  return (
    <section id="finale">
      <SectionHead tag="last thing...">One More Surprise</SectionHead>
      <button className="gift-btn" id="giftBtn" aria-label="Reveal your gift" onClick={toggle}>
        &#127873;
      </button>
      <div id="gift-content" style={{ display: open ? 'block' : 'none' }}>
        <h3>Heartfelt Letter</h3>
        <p>
          [Write your heartfelt birthday letter here. Talk about how you met, what your
          friendship means to you, a few specific memories, and whatever you want them to
          know on their birthday. This is the big emotional finale of the site, so give it
          the space it deserves - it can be as long as you want.]
        </p>
      </div>
    </section>
  );
}
