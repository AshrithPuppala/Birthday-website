import SectionHead from '../SectionHead/SectionHead';
import SecretSpot from '../ButterflyHunt/SecretSpot';
import filmstripData from '../../data/filmstripData';
import './Filmstrip.css';

export default function Filmstrip() {
  return (
    <section id="gallery-section">
      <SectionHead tag="frame by frame">The Filmstrip</SectionHead>
      <div className="filmstrip-wrap">
        <div className="filmstrip" id="filmstrip">
          {filmstripData.map((f, i) => (
            <div className="film-frame" key={i}>
              <div className="film-photo">
                <img src={f.src} alt="memory" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ textAlign: 'center', opacity: 0.55, fontSize: '0.85rem', marginTop: 12 }}>
        &larr; scroll to see more &rarr;
      </p>
      <SecretSpot id="s7" />
    </section>
  );
}
