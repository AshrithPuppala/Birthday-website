import './WaveBackground.css';

/**
 * Fixed full-viewport backdrop: sky-to-ocean gradient with three layered
 * SVG wave shapes that loop-scroll horizontally at different speeds/opacities
 * to fake a moving-water effect, plus a soft shimmer on top. Pure CSS
 * animation (translateX loop on a doubled-width shape) - no JS/canvas needed,
 * so it's cheap to run continuously.
 */
export default function WaveBackground() {
  return (
    <div className="wave-bg" aria-hidden="true">
      <div className="wave-sun" />
      <div className="wave-layer wave-layer--far">
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 110 C 120 60, 280 60, 400 110 S 680 160, 800 110 S 1080 60, 1200 110 S 1480 160, 1600 110 L1600 220 L0 220 Z" />
        </svg>
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 110 C 120 60, 280 60, 400 110 S 680 160, 800 110 S 1080 60, 1200 110 S 1480 160, 1600 110 L1600 220 L0 220 Z" />
        </svg>
      </div>
      <div className="wave-layer wave-layer--mid">
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 130 C 100 90, 260 90, 380 130 S 660 170, 780 130 S 1060 90, 1180 130 S 1460 170, 1600 130 L1600 220 L0 220 Z" />
        </svg>
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 130 C 100 90, 260 90, 380 130 S 660 170, 780 130 S 1060 90, 1180 130 S 1460 170, 1600 130 L1600 220 L0 220 Z" />
        </svg>
      </div>
      <div className="wave-layer wave-layer--near">
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 150 C 90 190, 240 190, 340 150 S 600 110, 720 150 S 980 190, 1100 150 S 1380 110, 1600 150 L1600 220 L0 220 Z" />
        </svg>
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none">
          <path d="M0 150 C 90 190, 240 190, 340 150 S 600 110, 720 150 S 980 190, 1100 150 S 1380 110, 1600 150 L1600 220 L0 220 Z" />
        </svg>
      </div>
    </div>
  );
}
