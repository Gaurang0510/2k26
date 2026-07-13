import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = 'relative overflow-hidden font-mono text-sm uppercase tracking-[0.15em] px-8 py-4 transition-all duration-300'

  const variants = {
    primary: cn(
      baseStyles,
      'bg-cyan text-black font-semibold',
      'hover:shadow-[0_0_30px_rgba(0,242,255,0.4)]',
    ),
    ghost: cn(
      baseStyles,
      'border border-cyan/40 text-cyan bg-transparent',
      'hover:bg-cyan/10 hover:border-cyan/60',
      'hover:shadow-[0_0_25px_rgba(0,242,255,0.15)]',
    ),
  }

  return (
    <motion.button
      ref={ref}
      className={cn(variants[variant], className)}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>

      {/* Sliding fill on hover (primary variant) */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white z-0"
          initial={{ y: '100%' }}
          whileHover={{ y: '0%' }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}

      {/* Outer glow ring */}
      <div className="absolute -inset-[2px] rounded-sm opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm bg-cyan/20 -z-10" />
    </motion.button>
  )
}
