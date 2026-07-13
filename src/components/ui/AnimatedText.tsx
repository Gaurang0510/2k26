import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  splitBy?: 'word' | 'character'
  animation?: 'fade-up' | 'blur-in' | 'slide-up'
  once?: boolean
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  splitBy = 'word',
  animation = 'fade-up',
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const units = splitBy === 'word' ? text.split(' ') : text.split('')

  const getAnimation = () => {
    switch (animation) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
          visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
        }
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 40, rotateX: 45 },
          visible: { opacity: 1, y: 0, rotateX: 0 },
        }
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  const anim = getAnimation()

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.03, delayChildren: delay }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={anim}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {unit}
          {splitBy === 'word' && i < units.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  )
}
