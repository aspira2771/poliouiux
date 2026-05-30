import { useMemo } from 'react'
import { motion } from 'framer-motion'
import BrainOrb from './BrainOrb.jsx'
import { projects } from '../data/projects.js'
import './AntBrain.css'

const BASE = import.meta.env.BASE_URL

// Lay the 6 orbs out on an arc that hovers above the ant's head, like a thought cloud.
function useOrbLayout() {
  return useMemo(() => {
    const n = projects.length
    const radiusX = Math.min(window.innerWidth * 0.34, 280)
    const radiusY = Math.min(window.innerHeight * 0.22, 180)
    const top = -window.innerHeight * 0.12 // shift the whole cloud above center
    return projects.map((p, i) => {
      // spread across the upper arc (from ~200° to ~340°, i.e. above the ant)
      const t = n === 1 ? 0.5 : i / (n - 1)
      const angle = Math.PI * (1.15 - t * 1.3) // left-to-right across the top
      return {
        project: p,
        x: Math.cos(angle) * radiusX,
        y: top - Math.sin(angle) * radiusY,
        index: i,
      }
    })
  }, [])
}

export default function AntBrain({ onClose, onOpenProject }) {
  const layout = useOrbLayout()

  return (
    <motion.div
      className="brain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Click the empty space to send the ant back into the line */}
      <button className="brain-backdrop" onClick={onClose} aria-label="Back to the ants" />

      <div className="brain-stage">
        {/* Faint thought tether dots from the ant up into the cloud */}
        {layout.map(({ x, y, index }) => (
          <motion.span
            key={`dot${index}`}
            className="brain-dot"
            style={{ left: `calc(50% + ${x * 0.5}px)`, top: `calc(50% + ${y * 0.55}px)` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 0.15 + index * 0.05 }}
          />
        ))}

        {layout.map(({ project, x, y, index }) => (
          <BrainOrb key={project.id} project={project} x={x} y={y} index={index} onOpen={onOpenProject} />
        ))}

        {/* The greeting ant, centered and waving */}
        <motion.div
          className="brain-ant"
          initial={{ scale: 0.6, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
        >
          <motion.div
            className="brain-bubble hand"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 }}
          >
            Hi!
          </motion.div>
          <motion.img
            className="brain-ant-img"
            src={`${BASE}assets/ant.png`}
            alt=""
            draggable="false"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <motion.p
        className="brain-caption hand"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        pick a bubble to peek inside my work
      </motion.p>
    </motion.div>
  )
}
