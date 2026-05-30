import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ForestScene from './ForestScene.jsx'
import './AntColony.css'

const BASE = import.meta.env.BASE_URL
const ANT_COUNT = 10
const WALK_DURATION = 22 // seconds to cross the screen — identical for every ant (same stride/pace)

export default function AntColony({ onSelectAnt, dimmed }) {
  const [imgOk, setImgOk] = useState(true)
  const [hint, setHint] = useState(true)

  // Evenly spaced, identical ants. Negative animation-delay starts each one
  // partway through the same loop, producing a seamless steady stream.
  const ants = useMemo(
    () =>
      Array.from({ length: ANT_COUNT }, (_, i) => ({
        id: i,
        delay: -(WALK_DURATION / ANT_COUNT) * i,
        // tiny vertical jitter so the line feels alive, not robotic
        bottom: 6 + ((i * 37) % 5) * 3,
      })),
    [],
  )

  function handlePick() {
    setHint(false)
    onSelectAnt()
  }

  return (
    <section className="colony" id="colony">
      <div className="colony-bg" aria-hidden="true">
        {imgOk ? (
          <img
            className="colony-bg-img"
            src={`${BASE}assets/tree.jpg`}
            alt=""
            onError={() => setImgOk(false)}
          />
        ) : (
          <ForestScene variant="base" />
        )}
      </div>

      <div className={`colony-scrim${dimmed ? ' is-dim' : ''}`} aria-hidden="true" />

      {/* Hover/click hint, like the "Hovering Here" annotation in the mockups */}
      <AnimatePresence>
        {hint && !dimmed && (
          <motion.div
            className="colony-hint hand"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Click any ant!
            <svg className="colony-hint-arrow" viewBox="0 0 80 60" width="80" height="60">
              <path
                d="M10 6 C 30 26, 36 40, 40 52"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 7"
              />
              <path d="M40 52 l -8 -8 M40 52 l 8 -8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`colony-track${dimmed ? ' is-paused' : ''}`}>
        {ants.map((ant) => (
          <button
            key={ant.id}
            className="ant-walker"
            style={{ animationDelay: `${ant.delay}s`, animationDuration: `${WALK_DURATION}s`, bottom: ant.bottom }}
            onClick={handlePick}
            aria-label="Open this ant's portfolio"
          >
            <motion.span
              className="ant-walker-inner"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={dimmed ? { y: 0 } : { y: [0, -5, 0] }}
              transition={{ duration: 0.55, repeat: dimmed ? 0 : Infinity, ease: 'easeInOut', delay: (ant.id % 4) * 0.12 }}
            >
              <img className="ant-img" src={`${BASE}assets/ant.png`} alt="" draggable="false" />
            </motion.span>
          </button>
        ))}
      </div>
    </section>
  )
}
