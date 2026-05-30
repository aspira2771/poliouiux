import { motion } from 'framer-motion'

/*
 * One floating portfolio bubble — a project living in the ant's "brain".
 * Springs into place, then bobs gently forever. Hover to grow, click to open.
 */
export default function BrainOrb({ project, x, y, index, onOpen }) {
  return (
    <motion.button
      className="orb"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, background: project.hex }}
      initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.25 + index * 0.08 }}
      whileHover={{ scale: 1.18, zIndex: 5 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => onOpen(project)}
      aria-label={`Open project ${project.title}`}
    >
      {/* The gentle endless float lives on an inner layer so it stacks with the spring entrance */}
      <motion.span
        className="orb-inner"
        animate={{ y: [0, -10, 0], rotate: [0, index % 2 ? 4 : -4, 0] }}
        transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
      >
        <span className="orb-title">{project.title}</span>
        <span className="orb-tag">{project.tagline}</span>
      </motion.span>
    </motion.button>
  )
}
