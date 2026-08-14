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
          Hiiii Tulipcia!!! We can't believe that you are 20 (Ahem dadi maa core) and that we have been friends for over 3 years now &lt;3 We cant put it in words to explain how much you mean to us. You are always a constant pillar of support(definitely better than Macbeth and his cowardice) and you are just genuinely a reallyyyyyyy realllyyy sweet person (Better than the old lady's cookies). We promise that no matter where life takes us we will always be friends and no one cld ever be as smart as our tulipcia. In those moments of doubt remember you have a bunch of us morons standing with you and rooting for you because we know you are going to achieve absolutely amazing things in your life and we can't wait to see where it takes you and the goals you accomplish. We know for a fact that when we are old and gray we will all be sitting with a cup of coffee in some aesthetic cafe (if those still exist) talking about everything and nothing, because this friendship is a friendship for life. Nothing can ever ever make us stop loving you. No matter what shit happens know tahat we are just a phonne call away. Never ever stop being you and if anyone tries to do irritate you lemme know I will break their bones heheheheh. So once again happy bday our felixiaaaaaaaaa &lt;3. ~ Ashrith, Naman, Sugandha
        </p>
      </div>
    </section>
  );
}
