import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  tilt?: boolean
  hover?: boolean
}

export default function GlassCard({
  children,
  className,
  glowColor = 'rgba(0, 242, 255, 0.15)',
  tilt = true,
  hover = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    mouseX.set(x)
    mouseY.set(y)
    rotateX.set((y - centerY) / centerY * -5)
    rotateY.set((x - centerX) / centerX * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const background = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      ${glowColor},
      transparent 80%
    )
  `

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-lg',
        'bg-bg-card backdrop-blur-xl',
        'border border-white/[0.08]',
        hover && 'transition-colors duration-300 hover:border-cyan/30',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* Inner glow following cursor */}
      {tilt && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background }}
        />
      )}
      {children}
    </motion.div>
  )
}
