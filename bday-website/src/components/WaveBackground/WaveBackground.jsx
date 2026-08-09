import './WaveBackground.css';

/**
 * Fixed full-viewport ocean backdrop, styled after a top-down beach photo:
 * deep teal water fading to turquoise, two irregular foam bands where waves
 * break, and a sandy shore strip at the bottom. Realism comes from SVG
 * feTurbulence/feDisplacementMap (procedural noise) rather than smooth
 * cartoon paths - it warps flat shapes into organic, churning edges and
 * gives the water a caustic-light texture. Everything is animated via SMIL
 * (baseFrequency/seed) plus CSS drift, so it's pure declarative markup,
 * no canvas or JS animation loop. The whole layer is blurred and given a
 * soft scrim in CSS so foreground text/photos stay legible on top.
 */
export default function WaveBackground() {
  return (
    <div className="wave-bg" aria-hidden="true">
      <svg className="ocean-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#083b45" />
            <stop offset="22%" stopColor="#0d5c60" />
            <stop offset="42%" stopColor="#1c8a83" />
            <stop offset="58%" stopColor="#3aab9c" />
            <stop offset="72%" stopColor="#7fc9b8" />
            <stop offset="80%" stopColor="#cfe9d9" />
          </linearGradient>
          <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7dcc0" />
            <stop offset="100%" stopColor="#d3c39d" />
          </linearGradient>

          <filter id="causticNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="3" seed="11" result="n">
              <animate attributeName="baseFrequency" values="0.012 0.018;0.016 0.024;0.012 0.018" dur="26s" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix in="n" type="matrix" values="
              0 0 0 0 0.85
              0 0 0 0 0.97
              0 0 0 0 0.95
              0.55 0.55 0.55 0 0" />
          </filter>

          <filter id="foamDistort" x="-40%" y="-60%" width="180%" height="220%">
            <feTurbulence type="turbulence" baseFrequency="0.006 0.05" numOctaves="3" seed="4" result="turb">
              <animate attributeName="seed" values="1;9;1" dur="14s" repeatCount="indefinite" />
              <animate attributeName="baseFrequency" values="0.006 0.05;0.008 0.06;0.006 0.05" dur="9s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="55" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="sandGrain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="7" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="
              0 0 0 0 0.35
              0 0 0 0 0.28
              0 0 0 0 0.16
              0.4 0.4 0.4 0 0" />
          </filter>
        </defs>

        <rect x="0" y="0" width="1000" height="780" fill="url(#oceanGradient)" />
        <rect x="0" y="0" width="1000" height="780" fill="url(#causticNoise)" opacity="0.5" style={{ mixBlendMode: 'overlay' }} />

        <g className="foam-band foam-band--far">
          <path
            d="M-50 430 C 120 410, 260 450, 420 425 S 700 400, 860 428 S 1050 420, 1150 430 L1150 465 L-50 465 Z"
            fill="#eafaf5"
            opacity="0.55"
            filter="url(#foamDistort)"
          />
        </g>

        <g className="foam-band foam-band--near">
          <path
            d="M-50 620 C 140 655, 300 605, 480 635 S 760 665, 940 630 S 1100 610, 1150 625 L1150 690 L-50 690 Z"
            fill="#ffffff"
            opacity="0.72"
            filter="url(#foamDistort)"
          />
        </g>

        <rect x="0" y="760" width="1000" height="240" fill="url(#sandGradient)" />
        <rect x="0" y="760" width="1000" height="240" fill="url(#sandGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
        <path d="M-50 760 C 150 745, 320 780, 520 760 S 850 738, 1150 758 L1150 800 L-50 800 Z" fill="#f3ead2" opacity="0.6" filter="url(#foamDistort)" />

        <g className="glints">
          <circle cx="180" cy="180" r="5" fill="#ffffff" />
          <circle cx="640" cy="120" r="4" fill="#ffffff" />
          <circle cx="420" cy="340" r="6" fill="#ffffff" />
          <circle cx="820" cy="300" r="4" fill="#ffffff" />
          <circle cx="270" cy="540" r="5" fill="#ffffff" />
          <circle cx="720" cy="540" r="5" fill="#ffffff" />
        </g>
      </svg>
      <div className="wave-scrim" />
    </div>
  );
}
