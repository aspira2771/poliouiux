import { motion } from 'framer-motion'

/*
 * A single cartoon ant, drawn as SVG so it scales crisply and animates well.
 * Faces right by default. Legs gently wiggle while `walking`; they rest when stopped.
 * The whole body does a tiny squash/stretch bob to feel alive (Pixar-ish).
 */
export default function Ant({ size = 64, walking = true, waving = false, style }) {
  const legAnim = walking
    ? { rotate: [0, 14, 0, -14, 0] }
    : { rotate: 0 }
  const legTransition = walking
    ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
    : { duration: 0.2 }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: 'visible', display: 'block', ...style }}
      animate={{ y: walking ? [0, -2, 0, -1, 0] : 0 }}
      transition={{ duration: 0.5, repeat: walking ? Infinity : 0, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {/* Legs — three per side, anchored at the thorax */}
      <g stroke="#1a1a1a" strokeWidth="3.2" strokeLinecap="round" fill="none">
        {[
          { x: 46, y: 56, dir: -1, base: 18 },
          { x: 50, y: 57, dir: -1, base: 28 },
          { x: 54, y: 56, dir: -1, base: 38 },
        ].map((leg, i) => (
          <motion.g
            key={`L${i}`}
            style={{ originX: `${leg.x}px`, originY: `${leg.y}px` }}
            animate={i % 2 === 0 ? legAnim : { rotate: walking ? [0, -14, 0, 14, 0] : 0 }}
            transition={legTransition}
          >
            <path d={`M${leg.x} ${leg.y} q -8 6 -14 ${4 + i * 4} l -6 8`} />
          </motion.g>
        ))}
        {[
          { x: 46, y: 56 },
          { x: 50, y: 57 },
          { x: 54, y: 56 },
        ].map((leg, i) => (
          <motion.g
            key={`R${i}`}
            style={{ originX: `${leg.x}px`, originY: `${leg.y}px` }}
            animate={i % 2 === 0 ? { rotate: walking ? [0, -14, 0, 14, 0] : 0 } : legAnim}
            transition={legTransition}
          >
            <path d={`M${leg.x} ${leg.y} q 8 6 14 ${4 + i * 4} l 6 8`} />
          </motion.g>
        ))}
      </g>

      {/* Body: head + thorax + abdomen (three rounded segments) */}
      <g fill="#1c1c1c">
        <ellipse cx="74" cy="50" rx="18" ry="15" /> {/* abdomen */}
        <ellipse cx="50" cy="50" rx="11" ry="10" /> {/* thorax */}
        <circle cx="30" cy="48" r="12" /> {/* head */}
      </g>

      {/* Antennae */}
      <g stroke="#1a1a1a" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M24 40 q -8 -10 -2 -18" />
        <path d="M30 38 q -2 -12 6 -18" />
      </g>

      {/* A friendly waving arm when greeting */}
      {waving && (
        <motion.g
          stroke="#1a1a1a"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          style={{ originX: '40px', originY: '46px' }}
          animate={{ rotate: [0, -22, 6, -22, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M40 46 q 4 -16 14 -22" />
        </motion.g>
      )}

      {/* Tiny eye highlight */}
      <circle cx="26" cy="46" r="2.4" fill="#fff" opacity="0.9" />
    </motion.svg>
  )
}
