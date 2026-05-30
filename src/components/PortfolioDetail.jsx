import { motion } from 'framer-motion'
import { useEffect } from 'react'
import './PortfolioDetail.css'

const BASE = import.meta.env.BASE_URL

const PALETTE = [
  { name: 'Sky', hex: '#7FB9E6' },
  { name: 'Lavender', hex: '#D6BEEA' },
  { name: 'Butter', hex: '#F4D77A' },
  { name: 'Matcha', hex: '#B7C96A' },
  { name: 'Pink', hex: '#F98BA9' },
  { name: 'Tangerine', hex: '#FF9F4B' },
]

export default function PortfolioDetail({ project, onBack }) {
  // ESC returns to the brain cloud
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onBack()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <motion.div
      className="detail"
      style={{ '--accent': project.hex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="detail-back hand"
        onClick={onBack}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ x: -4 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="detail-card"
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        <div className="detail-palette">
          {PALETTE.map((c) => (
            <div className="swatch" key={c.name} style={{ background: c.hex }}>
              <span className="swatch-name">{c.name}</span>
              <span className="swatch-hex">{c.hex}</span>
            </div>
          ))}
        </div>

        <div className="detail-cover" style={{ background: project.hex }}>
          <p className="detail-eyebrow">{project.year} · {project.role}</p>
          <h2 className="detail-title">{project.title}</h2>
          <p className="detail-tagline">{project.tagline}</p>
          <p className="detail-desc">{project.description}</p>
        </div>
      </motion.div>

      {/* Celebrating ant, like the cheering ant in the mockup */}
      <motion.div
        className="detail-ant"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.25 }}
      >
        <motion.img
          className="detail-ant-img"
          src={`${BASE}assets/ant.png`}
          alt=""
          draggable="false"
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}
