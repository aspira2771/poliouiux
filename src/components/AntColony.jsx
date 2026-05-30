import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ForestScene from './ForestScene.jsx'
import './AntColony.css'

const BASE = import.meta.env.BASE_URL
const ANT_COUNT = 10
const WALK_DURATION = 22 // seconds to cross the screen — identical for every ant (same stride/pace)

export default function AntColony({ started, onSelectAnt, dimmed }) {
  const [imgOk, setImgOk] = useState(true)
  const [hint, setHint] = useState(true)

  // Evenly spaced, identical ants. Negative animation-delay starts each one
  // partway through the same loop, producing a seamless steady stream.
  const ants = useMemo(
    () =>
      Array.from({ length: ANT_COUNT }, (_, i) => ({
        id: i,
        // negative delay starts each ant partway through the same loop → a full,
        // evenly spaced, always-marching stream (reliable + tappable)
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
      <motion.div
        className="colony-bg"
        aria-hidden="true"
        animate={{ rotate: [-0.8, 0.8, -0.8], scale: [1, 1.012, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 100%' }}
      >
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
      </motion.div>

      <div className={`colony-scrim${dimmed ? ' is-dim' : ''}`} aria-hidden="true" />

      {/* Hint appears once the ants have arrived */}
      <AnimatePresence>
        {started && hint && !dimmed && (
          <motion.div
            className="colony-hint hand"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            Tap an ant!
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

      {/* Ants only exist once started; the whole line slides in from the left */}
      {started && (
        <motion.div
          className={`colony-track${dimmed ? ' is-paused' : ''}`}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
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
        </motion.div>
      )}
    </section>
  )
}
