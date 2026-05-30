import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero.jsx'
import AntColony from './components/AntColony.jsx'
import AntBrain from './components/AntBrain.jsx'
import PortfolioDetail from './components/PortfolioDetail.jsx'

export default function App() {
  // started → false: hero title screen; true: the ants have marched in
  const [started, setStarted] = useState(false)
  // brainOpen → an ant was picked; portfolio bubbles float around it
  const [brainOpen, setBrainOpen] = useState(false)
  // project → a bubble was opened; full detail view
  const [project, setProject] = useState(null)

  return (
    <main className="stage">
      {/* The colony sits underneath the whole time; ants stream in once started */}
      <AntColony
        started={started}
        onSelectAnt={() => setBrainOpen(true)}
        dimmed={brainOpen}
      />

      {/* Hero overlay — tap anywhere to dismiss the title and let the ants in */}
      <AnimatePresence>
        {!started && <Hero key="hero" onStart={() => setStarted(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {brainOpen && !project && (
          <AntBrain
            key="brain"
            onClose={() => setBrainOpen(false)}
            onOpenProject={(p) => setProject(p)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {project && (
          <PortfolioDetail key="detail" project={project} onBack={() => setProject(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
