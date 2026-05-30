import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero.jsx'
import AntColony from './components/AntColony.jsx'
import AntBrain from './components/AntBrain.jsx'
import PortfolioDetail from './components/PortfolioDetail.jsx'

export default function App() {
  // null → just the walking colony
  // 'brain' → an ant was picked; portfolio bubbles float around it
  // <project> → a bubble was opened; full detail view
  const [brainOpen, setBrainOpen] = useState(false)
  const [project, setProject] = useState(null)
  const colonyRef = useRef(null)

  function scrollToColony() {
    colonyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <Hero onScrollCue={scrollToColony} />

      <div ref={colonyRef}>
        <AntColony onSelectAnt={() => setBrainOpen(true)} dimmed={brainOpen} />
      </div>

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
