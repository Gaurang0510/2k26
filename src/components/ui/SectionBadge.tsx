import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionBadgeProps {
  text: string
  className?: string
}

export default function SectionBadge({ text, className = '' }: SectionBadgeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`inline-block ${className}`}
    >
      <span className="font-mono text-xs text-cyan tracking-[0.3em] uppercase bg-cyan/10 px-4 py-2 rounded-full border border-cyan/20 inline-flex items-center gap-2 backdrop-blur-md">
        <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse-glow" />
        {text}
      </span>
    </motion.div>
  )
}
