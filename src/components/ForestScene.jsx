/*
 * Hand-drawn SVG forest backdrops, styled to match the cartoon ants.
 * Two variants:
 *   - "hero": a big storybook tree with a full canopy + sunbeams
 *   - "base": the trunk base + roots + grass strip where the ants walk
 * Pure vector, so it scales crisply and weighs almost nothing.
 */

function Leaves({ cx, cy, r, tones }) {
  // a fluffy cluster of overlapping leaf blobs
  const blobs = [
    { x: 0, y: 0, s: 1 },
    { x: -r * 0.6, y: r * 0.1, s: 0.7 },
    { x: r * 0.6, y: r * 0.08, s: 0.72 },
    { x: -r * 0.3, y: -r * 0.5, s: 0.68 },
    { x: r * 0.35, y: -r * 0.45, s: 0.66 },
    { x: 0, y: r * 0.45, s: 0.6 },
  ]
  return (
    <g>
      {blobs.map((b, i) => (
        <circle key={i} cx={cx + b.x} cy={cy + b.y} r={r * b.s} fill={tones[i % tones.length]} />
      ))}
    </g>
  )
}

export default function ForestScene({ variant = 'hero' }) {
  const greens = ['#8fbf63', '#a7d172', '#7aa84f', '#c1e08a']
  const greensDeep = ['#5e8a44', '#6f9b4f', '#4f7a3a', '#84ab5c']

  if (variant === 'base') {
    return (
      <svg
        className="forest-svg"
        viewBox="0 0 1280 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eaf3d6" />
            <stop offset="0.55" stopColor="#cfe6ad" />
            <stop offset="1" stopColor="#a9cf82" />
          </linearGradient>
          <linearGradient id="b-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6b4a30" />
            <stop offset="0.5" stopColor="#8a6242" />
            <stop offset="1" stopColor="#5f4029" />
          </linearGradient>
          <radialGradient id="b-glow" cx="0.5" cy="0.1" r="0.8">
            <stop offset="0" stopColor="#fff7d6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fff7d6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1280" height="800" fill="url(#b-sky)" />
        <rect width="1280" height="800" fill="url(#b-glow)" />

        {/* soft blurred forest behind */}
        <g opacity="0.5">
          <circle cx="180" cy="260" r="150" fill="#bcd998" />
          <circle cx="1090" cy="240" r="170" fill="#b2d28d" />
          <circle cx="640" cy="160" r="200" fill="#c6e2a2" />
        </g>

        {/* huge trunk + root flares */}
        <path
          d="M430 760
             C 470 520, 520 380, 560 320
             L 720 320
             C 760 380, 815 520, 850 760
             C 760 690, 700 760, 640 700
             C 580 760, 520 690, 430 760 Z"
          fill="url(#b-trunk)"
        />
        {/* root toes spreading along the ground */}
        <g fill="#5f4029">
          <path d="M300 770 C 360 700, 430 720, 470 760 C 410 758, 360 772, 300 790 Z" />
          <path d="M980 770 C 920 700, 850 720, 810 760 C 870 758, 920 772, 980 790 Z" />
          <path d="M150 786 C 240 740, 340 760, 380 786 Z" />
          <path d="M1130 786 C 1040 740, 940 760, 900 786 Z" />
        </g>
        {/* bark shading lines */}
        <g stroke="#4f3622" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5">
          <path d="M560 360 C 575 480, 580 600, 590 720" />
          <path d="M660 350 C 660 480, 665 600, 660 730" />
          <path d="M730 370 C 720 480, 715 600, 720 720" />
        </g>
        {/* moss patches */}
        <g fill="#7aa84f" opacity="0.8">
          <ellipse cx="520" cy="540" rx="40" ry="22" />
          <ellipse cx="770" cy="600" rx="46" ry="24" />
          <ellipse cx="640" cy="470" rx="34" ry="18" />
        </g>

        {/* grass strip the ants walk on */}
        <rect x="0" y="720" width="1280" height="80" fill="#6fa84d" />
        <g fill="#5d9440">
          {Array.from({ length: 64 }, (_, i) => (
            <path key={i} d={`M${i * 20} 760 q 4 -22 8 0 q 4 -22 8 0 Z`} />
          ))}
        </g>
        {/* little flowers */}
        <g>
          {[120, 360, 560, 880, 1120].map((x, i) => (
            <g key={i} transform={`translate(${x} 742)`}>
              <circle r="6" fill={['#f98ba9', '#f4d77a', '#7fb9e6', '#d6beea', '#ff9f4b'][i]} />
              <circle r="2.4" fill="#fff" />
            </g>
          ))}
        </g>
      </svg>
    )
  }

  // hero variant
  return (
    <svg
      className="forest-svg"
      viewBox="0 0 1280 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f7df" />
          <stop offset="0.5" stopColor="#d6e9b4" />
          <stop offset="1" stopColor="#9ec878" />
        </linearGradient>
        <linearGradient id="h-trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6b4a30" />
          <stop offset="0.5" stopColor="#8a6242" />
          <stop offset="1" stopColor="#5f4029" />
        </linearGradient>
        <radialGradient id="h-sun" cx="0.5" cy="0.18" r="0.7">
          <stop offset="0" stopColor="#fffbe6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fffbe6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1280" height="800" fill="url(#h-sky)" />

      {/* sunbeams */}
      <g opacity="0.5">
        {[-30, -12, 6, 24].map((deg, i) => (
          <polygon
            key={i}
            points="640,120 600,800 680,800"
            fill="#fff7cf"
            opacity="0.4"
            transform={`rotate(${deg} 640 120)`}
          />
        ))}
      </g>
      <rect width="1280" height="800" fill="url(#h-sun)" />

      {/* distant blurred foliage */}
      <g opacity="0.45">
        <circle cx="160" cy="520" r="180" fill="#aacd80" />
        <circle cx="1120" cy="540" r="200" fill="#a3c878" />
      </g>

      {/* trunk with a couple of branches */}
      <path
        d="M560 800
           C 575 560, 560 420, 590 320
           L 700 320
           C 728 420, 712 560, 728 800 Z"
        fill="url(#h-trunk)"
      />
      <path d="M600 380 C 540 350, 470 330, 410 300 L 430 330 C 500 360, 560 390, 610 410 Z" fill="url(#h-trunk)" />
      <path d="M690 370 C 760 345, 840 330, 900 300 L 880 332 C 800 360, 730 388, 680 408 Z" fill="url(#h-trunk)" />
      <g stroke="#4f3622" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.45">
        <path d="M600 360 C 612 520, 612 660, 618 790" />
        <path d="M690 360 C 685 520, 686 660, 690 790" />
      </g>

      {/* the big leafy canopy */}
      <Leaves cx={640} cy={250} r={210} tones={greens} />
      <Leaves cx={380} cy={300} r={150} tones={greensDeep} />
      <Leaves cx={900} cy={300} r={155} tones={greensDeep} />
      <Leaves cx={520} cy={170} r={130} tones={greens} />
      <Leaves cx={770} cy={170} r={130} tones={greens} />
      {/* leaf speckles */}
      <g fill="#e4f3bf" opacity="0.7">
        {Array.from({ length: 40 }, (_, i) => (
          <circle
            key={i}
            cx={300 + ((i * 137) % 680)}
            cy={90 + ((i * 89) % 320)}
            r={3 + ((i * 7) % 4)}
          />
        ))}
      </g>

      {/* ground + flowers */}
      <path d="M0 720 C 320 690, 960 690, 1280 720 L 1280 800 L 0 800 Z" fill="#6fa84d" />
      <g>
        {[150, 320, 470, 980, 1150].map((x, i) => (
          <g key={i} transform={`translate(${x} ${720 + (i % 2) * 14})`}>
            <circle r="6" fill={['#f98ba9', '#f4d77a', '#7fb9e6', '#ff9f4b', '#d6beea'][i]} />
            <circle r="2.4" fill="#fff" />
          </g>
        ))}
      </g>
    </svg>
  )
}
