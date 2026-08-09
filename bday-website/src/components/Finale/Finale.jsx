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
          So where do I begin, its been over 3 years since we met, this journey has been
          nothing but wonderful. Right from those initial days you have been that person who
          has always been there for me no matter what. Be it helping me write a speech,
          listening to my day, my rants ....and what not. You have become such an integral
          part of my life that a day without speaking to you feels incomplete. As they say few
          bonds are never meant to be broken, ours is the perfect example. Even different
          cities couldn't stop us from speaking to each other literally every single day. You
          are that one person who has celebrated my success probably more than I have myself.
          You are the first friend I speak to when anything happens, being it good or bad. The
          way we bully each other and at the same time stand by each other is iconic. I love
          the fact that our conversations are literally about anything and everything. We
          could just be on a call without talking and yet we wouldn't be bored. Thank you so
          much for being the best friend I could I have ever asked for. HAVE A WONDERFUL DAY
          AND YEAR FULL OF SUCCESS AND HAPPINESS. HAPPY BIRTHDAY SUGU or I would rather say
          Ms.Nautanki Pro Maxxxxxx. &#10024;&#129430;&#127995;
        </p>
      </div>
    </section>
  );
}
