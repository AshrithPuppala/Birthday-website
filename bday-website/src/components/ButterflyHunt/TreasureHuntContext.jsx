import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import treasureData from '../../data/treasureData';
import { fireConfetti } from '../../utils/confetti';

const TreasureHuntContext = createContext(null);

/**
 * Shared state for the hidden shell hunt (six 🐚 buttons tucked into
 * different sections of the page). Wrap the whole app in <TreasureHuntProvider>
 * once, then use <SecretSpot id="s1" /> inside any section and
 * useTreasureHunt() anywhere you need progress (the toggle/panel, the vault).
 */
export function TreasureHuntProvider({ children }) {
  const [found, setFound] = useState(() =>
    Object.fromEntries(treasureData.map((t) => [t.id, false]))
  );
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const foundCount = Object.values(found).filter(Boolean).length;
  const total = treasureData.length;

  const markFound = useCallback((id) => {
    setFound((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  // Same behaviour as the original site: a handful of other interactions
  // (opening an envelope, pressing the danger button, etc.) also call
  // markTreasureFound with an id like 'envelope' or 'danger'. None of those
  // ids match the six spot ids (s1, s2, s3, s4, s6, s7), so in the original
  // this was effectively a no-op. Kept here for fidelity - it's harmless.
  const markTreasureFound = useCallback((id) => markFound(id), [markFound]);

  // When the last spot is found, celebrate once and reveal the vault.
  useMemo(() => {
    if (foundCount === total && !celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        fireConfetti({ particleCount: 260, spread: 150, origin: { y: 0.5 } });
        setVaultUnlocked(true);
      }, 300);
    }
  }, [foundCount, total, celebrated]);

  const value = {
    treasureData,
    found,
    foundCount,
    total,
    markFound,
    markTreasureFound,
    vaultUnlocked,
  };

  return (
    <TreasureHuntContext.Provider value={value}>
      {children}
    </TreasureHuntContext.Provider>
  );
}

export function useTreasureHunt() {
  const ctx = useContext(TreasureHuntContext);
  if (!ctx) {
    throw new Error('useTreasureHunt must be used inside <TreasureHuntProvider>');
  }
  return ctx;
}
