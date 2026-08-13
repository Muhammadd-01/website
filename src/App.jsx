import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeGate from './components/WelcomeGate'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ApologyIntro from './components/ApologyIntro'
import ApologyCards from './components/ApologyCards'
import Timeline from './components/Timeline'
import ThingsISaid from './components/ThingsISaid'
import QuoteCarousel from './components/QuoteCarousel'
import MeaningSection from './components/MeaningSection'
import HeartInteraction from './components/HeartInteraction'
import PromiseSection from './components/PromiseSection'
import FutureTogether from './components/FutureTogether'
import MemoryGallery from './components/MemoryGallery'
import LoveLetter from './components/LoveLetter'
import ForgivenessQuestion from './components/ForgivenessQuestion'
import FinalMessage from './components/FinalMessage'
import Background3D from './components/Background3D'
import MusicToggle from './components/MusicToggle'
import CustomCursor from './components/CustomCursor'
import SectionTransition from './components/SectionTransition'

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded')
    })
  }, [])

  const handleEnter = () => {
    setHasEntered(true)
    // Small delay to let the exit animation complete before showing main content
    setTimeout(() => {
      setShowContent(true)
    }, 900)
  }

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!hasEntered && (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <WelcomeGate onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <Background3D />
          <Navbar />
          <MusicToggle />

          <main>
            <Hero />

            <SectionTransition variant="glow" />
            <ApologyIntro />

            <SectionTransition variant="hearts" />
            <ApologyCards />

            <SectionTransition variant="stars" />
            <Timeline />

            <SectionTransition variant="glow" />
            <ThingsISaid />

            <SectionTransition variant="wave" />
            <QuoteCarousel />

            <SectionTransition variant="hearts" />
            <MeaningSection />

            <SectionTransition variant="stars" />
            <HeartInteraction />

            <SectionTransition variant="glow" />
            <PromiseSection />

            <SectionTransition variant="hearts" />
            <MemoryGallery />

            <SectionTransition variant="glow" />
            <FutureTogether />

            <SectionTransition variant="wave" />
            <LoveLetter />

            <SectionTransition variant="hearts" />
            <ForgivenessQuestion />

            <SectionTransition variant="stars" />
            <FinalMessage />
          </main>
        </motion.div>
      )}
    </>
  )
}
