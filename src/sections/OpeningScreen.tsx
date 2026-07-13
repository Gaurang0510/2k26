import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OpeningScreenProps {
  onComplete: () => void
}

export default function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showSkip, setShowSkip] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000)

    // Fallback: auto-complete after 12 seconds if video doesn't end
    const fallbackTimer = setTimeout(() => handleComplete(), 12000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // If no video available, show animated intro and auto-complete after 4s
  useEffect(() => {
    if (videoError) {
      const timer = setTimeout(() => handleComplete(), 4000)
      return () => clearTimeout(timer)
    }
  }, [videoError])

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(onComplete, 1000) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[300] bg-bg-primary flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Video Background */}
          {!videoError && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleComplete}
              onError={() => setVideoError(true)}
            >
              <source src={`${import.meta.env.BASE_URL}video/video_202607132238.mp4`} type="video/mp4" />
            </video>
          )}

          {/* Animated fallback when no video */}
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-cyan/20 rounded-full"
                  initial={{ width: 100, height: 100, opacity: 0 }}
                  animate={{
                    width: [100, 400 + i * 100],
                    height: [100, 400 + i * 100],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* Grid lines */}
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>
          )}

          {/* Dark overlay for video */}
          <div className="absolute inset-0 bg-bg-primary/40" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <img
                src="/images/upsurge-logo.png"
                alt="UPSURGE 2026"
                className="w-32 h-32 md:w-48 md:h-48 object-contain"
                style={{ filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.4))' }}
                onError={(e) => {
                  // Fallback: hide broken image
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              {/* Text fallback for logo */}
              <motion.h1
                className="font-orbitron text-4xl md:text-6xl font-black text-white tracking-tighter text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ textShadow: '0 0 40px rgba(0, 242, 255, 0.5)' }}
              >
                UPSURGE
              </motion.h1>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan to-blue"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: videoError ? 3.5 : 10, ease: 'linear' }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
                Initializing Systems
              </span>
            </motion.div>
          </div>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleComplete}
                className="absolute bottom-8 right-8 z-20 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-all duration-300 backdrop-blur-md"
              >
                Skip Intro →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
