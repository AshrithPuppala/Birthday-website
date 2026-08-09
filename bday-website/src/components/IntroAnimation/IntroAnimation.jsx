import SecretSpot from '../ButterflyHunt/SecretSpot';
import './IntroAnimation.css';

/**
 * The opening hero section. Also hosts secret spot s1 - the very first
 * hidden butterfly, tucked into the corner near the title.
 */
export default function IntroAnimation() {
  return (
    <section id="hero">
      <div className="eyebrow">for the one and only</div>
      <h1>
        Happy Birthday,
        <br />
        <span>Sugandha (aka Ms. Nautanki)</span> &#127807;
      </h1>
      <p className="sub">Omgggg your 19 years now. Sit back and enjoy this experience</p>
      <div className="scroll-hint">&#8595; scroll for the whole story &#8595;</div>
      <SecretSpot id="s1" />
    </section>
  );
}
