import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00f2ff 0%, #0266ff 50%, #8b5cf6 100%)',
        boxShadow: '0 0 10px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.2)',
      }}
    />
  )
}
