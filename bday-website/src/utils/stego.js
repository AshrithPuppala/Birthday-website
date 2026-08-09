/**
 * Small helpers for anything that's deliberately hidden in plain sight -
 * currently just the six 🐚 secret spots scattered through the page for the
 * shell hunt. Kept separate from the components so the "how do we hide
 * this" logic lives in one place if you want to add more hidden mechanics
 * later (a stego-style hidden flag in an image, a console-only clue, etc).
 */

/** Turn a spot's {top, left} percentages into an inline style object. */
export function spotPosition(spot) {
  return { top: spot.top, left: spot.left };
}

/** Percent (0-100) of spots found so far, rounded for display in a progress bar. */
export function percentFound(foundCount, total) {
  if (!total) return 0;
  return Math.round((foundCount / total) * 100);
}

/** Smooth-scrolls to the section a clue refers to, e.g. "#hero". */
export function scrollToSection(selector) {
  const el = document.querySelector(selector);
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
