import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Effects
import CustomCursor from './components/effects/CustomCursor'
import MouseGlow from './components/effects/MouseGlow'
import ScanlineOverlay from './components/effects/ScanlineOverlay'
import ParallaxBackground from './components/effects/ParallaxBackground'
import ScrollProgress from './components/ui/ScrollProgress'

// Sections
import OpeningScreen from './sections/OpeningScreen'
import Hero from './sections/Hero'
import About from './sections/About'
import FeaturedEvents from './sections/FeaturedEvents'
import Timeline from './sections/Timeline'
import Sponsors from './sections/Sponsors'
import Gallery from './sections/Gallery'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  useSmoothScroll()

  return (
    <>
      {/* Cinematic Opening */}
      <AnimatePresence>
        {!introComplete && (
          <OpeningScreen onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Global Effects */}
      <ParallaxBackground />
      <CustomCursor />
      <MouseGlow />
      <ScanlineOverlay />
      {introComplete && <ScrollProgress />}

      {/* Main Content */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <FeaturedEvents />
          <Timeline />
          <Sponsors />
          <Gallery />
        </main>

        <Footer />
      </div>
    </>
  )
}
