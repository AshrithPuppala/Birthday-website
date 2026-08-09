import confetti from 'canvas-confetti';

/**
 * Thin wrapper so components never need to import canvas-confetti directly
 * or guard against it being missing - mirrors the original site's
 * `if (window.confetti) confetti({...})` checks.
 */
export function fireConfetti(options) {
  try {
    confetti(options);
  } catch {
    // confetti is a nice-to-have; never let it break the page
  }
}
