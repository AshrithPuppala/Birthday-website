import { useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import SecretSpot from '../ButterflyHunt/SecretSpot';
import Modal from '../Modal/Modal';
import { useTreasureHunt } from '../ButterflyHunt/TreasureHuntContext';
import envelopeData from '../../data/envelopeData';
import './Envelopes.css';

export default function Envelopes() {
  const [openText, setOpenText] = useState(null);
  const { markTreasureFound } = useTreasureHunt();

  function open(env) {
    setOpenText(env.text);
    markTreasureFound('envelope');
  }

  return (
    <section id="envelope-section">
      <SectionHead tag="open when...">Little Envelopes</SectionHead>
      <div className="envelope-grid" id="envelopeGrid">
        {envelopeData.map((env, i) => (
          <div className="envelope" key={i} onClick={() => open(env)}>
            <span className="seal">{env.seal}</span>
            <span className="label">{env.label}</span>
          </div>
        ))}
      </div>
      <Modal open={openText !== null} onClose={() => setOpenText(null)}>
        <p id="modalText">{openText}</p>
      </Modal>
      <SecretSpot id="s6" />
    </section>
  );
}
