import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll()
  
  // As we scroll down the page, move the background up slightly to create a parallax effect.
  // We use [0, 1] for scroll progress mapping to ['0%', '-15%'] of translation.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
      {/* The Parallax Image */}
      <motion.div
        className="absolute inset-0 w-full h-[115%]" // Make it taller so it has room to translate up
        style={{ y }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Dark overlays to blend with the cyber theme and ensure text readability */}
      {/* A heavy base dimming */}
      <div className="absolute inset-0 bg-bg-primary/75" />
      
      {/* A gradient overlay that gets darker towards the bottom to blend sections seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/40 to-bg-primary/95" />
    </div>
  )
}
