import { useEffect, useRef } from 'react';
import './SecretVault.css';

/**
 * Only rendered once every butterfly has been found (see
 * TreasureHuntContext). Scrolls itself into view the moment it appears,
 * same as the original site.
 */
export default function SecretVault() {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="vault-section" ref={ref} style={{ display: 'block' }}>
      <div className="tag">you found them all</div>
      <h2>The Secret Vault</h2>
      <p>[Link or content to reveal after they find all the hidden butterflies]</p>
    </section>
  );
}
