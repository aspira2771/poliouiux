import { motion } from 'framer-motion'
import { useState } from 'react'
import ForestScene from './ForestScene.jsx'
import './Hero.css'

const BASE = import.meta.env.BASE_URL

// Each letter of the balloon title gets a palette color (CSS fallback only).
const PALETTE = ['var(--tangerine)', 'var(--butter)', 'var(--sky)', 'var(--matcha)', 'var(--pink)', 'var(--lavender)']

function BalloonWord({ word, startIndex }) {
  return (
    <span className="balloon-word">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="balloon-letter"
          style={{ color: PALETTE[(startIndex + i) % PALETTE.length] }}
          initial={{ y: 28, opacity: 0, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 * (startIndex + i), type: 'spring', stiffness: 260, damping: 14 }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ onScrollCue }) {
  const [bgOk, setBgOk] = useState(true)
  const [titleOk, setTitleOk] = useState(true)

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        {bgOk ? (
          <img className="hero-bg-img" src={`${BASE}assets/tree.jpg`} alt="" onError={() => setBgOk(false)} />
        ) : (
          <ForestScene variant="hero" />
        )}
      </div>

      <div className="hero-title">
        {titleOk ? (
          <motion.img
            className="hero-title-img"
            src={`${BASE}assets/title.png`}
            alt="JiHyun's Life"
            onError={() => setTitleOk(false)}
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          />
        ) : (
          <>
            <BalloonWord word="JiHyun's" startIndex={0} />
            <BalloonWord word="Life" startIndex={8} />
          </>
        )}
      </div>

      <motion.button
        className="hero-scroll hand"
        onClick={onScrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { delay: 1.6, duration: 1.6, repeat: Infinity } }}
        aria-label="Scroll down to meet the ants"
      >
        meet the ants ↓
      </motion.button>
    </section>
  )
}
