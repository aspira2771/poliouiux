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

export default function Hero({ onStart }) {
  const [bgOk, setBgOk] = useState(true)
  const [titleOk, setTitleOk] = useState(true)

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 3.2, pointerEvents: 'none' }}
      transition={{ duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
      style={{ transformOrigin: '50% 86%' }}
    >
      {/* The whole tree scene sways gently, like a living 3D tree in the wind */}
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        animate={{ rotate: [-0.8, 0.8, -0.8], scale: [1, 1.012, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 100%' }}
      >
        {bgOk ? (
          <img className="hero-bg-img" src={`${BASE}assets/tree.jpg`} alt="" onError={() => setBgOk(false)} />
        ) : (
          <ForestScene variant="hero" />
        )}
      </motion.div>

      {/* 3D floating title — bobs and tilts in space */}
      <motion.div
        className="hero-title"
        animate={{ y: [0, -14, 0], rotateX: [6, -4, 6], rotateZ: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        exit={{ opacity: 0, y: -40, scale: 0.9 }}
      >
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
      </motion.div>

      {/* The greeting ant at the tree base — this is the click target */}
      <motion.button
        className="hero-ant"
        onClick={onStart}
        aria-label="Enter — meet the ants"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          className="hero-bubble hand"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 300, damping: 12 }}
        >
          Hi!
        </motion.span>
        <motion.img
          className="hero-ant-img"
          src={`${BASE}assets/ant.png`}
          alt=""
          draggable="false"
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>

      {/* Handwritten "Click Here!" + curved arrow pointing at the ant */}
      <motion.div
        className="hero-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { delay: 1.4, duration: 1.8, repeat: Infinity } }}
        exit={{ opacity: 0 }}
      >
        <span className="hero-cue-text hand">Click Here!</span>
        <svg className="hero-cue-arrow" viewBox="0 0 90 70" width="90" height="70" aria-hidden="true">
          <path
            d="M78 10 C 50 6, 30 22, 20 48"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M20 48 l 14 -6 M20 48 l 4 -15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.section>
  )
}
