import { useTreasureHunt } from './TreasureHuntContext';
import { spotPosition } from '../../utils/stego';

/**
 * A single hidden 🐚 tucked into a section. Renders itself as a faint,
 * slowly-pulsing button; once clicked it turns into a ✨ and reports back
 * to the shared hunt context. Place one of these per entry in treasureData,
 * e.g. <SecretSpot id="s1" /> inside the Hero section.
 */
export default function SecretSpot({ id }) {
  const { treasureData, found, markFound } = useTreasureHunt();
  const spot = treasureData.find((t) => t.id === id);
  if (!spot) return null;

  const isFound = found[id];

  return (
    <button
      className={`secret-spot${isFound ? ' found' : ''}`}
      style={spotPosition(spot)}
      aria-label="hidden surprise"
      onClick={() => !isFound && markFound(id)}
    >
      {isFound ? '✨' : '🐚'}
    </button>
  );
}
