import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CyberGrid from '../components/effects/CyberGrid'
import ParticleField from '../components/effects/ParticleField'
import SectionBadge from '../components/ui/SectionBadge'
import MagneticButton from '../components/ui/MagneticButton'
import CountdownTimer from '../components/ui/CountdownTimer'
import { heroContent, hudPanels } from '../data/content'
import { useMousePosition } from '../hooks/useMousePosition'
import { HiOutlineShieldCheck, HiOutlineExclamation, HiOutlineFolderOpen, HiOutlineStar, HiOutlineUsers, HiOutlineGlobe } from 'react-icons/hi'

const hudIcons = {
  status: HiOutlineShieldCheck,
  warning: HiOutlineExclamation,
  folder: HiOutlineFolderOpen,
  trophy: HiOutlineStar,
  people: HiOutlineUsers,
  globe: HiOutlineGlobe,
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true })
  const mouse = useMousePosition()

  // Parallax multiplier for hero elements
  const parallaxX = (mouse.normalizedX - 0.5) * 20
  const parallaxY = (mouse.normalizedY - 0.5) * 20

  const staggerDelay = 0.15

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0">
        <CyberGrid />
        <ParticleField />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary z-10" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-bg opacity-20 z-10" />
        {/* Top radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] z-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: staggerDelay * 0 }}
          >
            <SectionBadge text={heroContent.badge} />
          </motion.div>

          {/* Logo Image */}
          <motion.div
            className="mt-12 mb-8 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: staggerDelay * 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              x: parallaxX * 0.3,
              y: parallaxY * 0.3,
            }}
          >
            <img
              src="/images/upsurge-logo.png"
              alt="UPSURGE 2026 Logo"
              className="w-40 h-40 md:w-56 md:h-56 object-contain animate-float"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.35))' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: staggerDelay * 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              textShadow: '0 0 60px rgba(0, 242, 255, 0.2), 0 0 120px rgba(0, 242, 255, 0.1)',
              x: parallaxX * 0.1,
              y: parallaxY * 0.1,
            }}
          >
            {heroContent.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="font-display text-lg md:text-2xl text-text-muted font-medium mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: staggerDelay * 3 }}
          >
            {heroContent.subtitle}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="font-body text-base md:text-lg text-text-muted/80 max-w-2xl mb-16 leading-loose"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: staggerDelay * 4 }}
          >
            {heroContent.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: staggerDelay * 5 }}
          >
            <MagneticButton variant="primary">{heroContent.primaryCta}</MagneticButton>
            <MagneticButton variant="ghost">{heroContent.secondaryCta}</MagneticButton>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: staggerDelay * 6 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>

        {/* ── HUD Panels (Desktop floating) ── */}
        <div className="hidden xl:block">
          {hudPanels.slice(0, 2).map((panel, i) => {
            const Icon = hudIcons[panel.icon as keyof typeof hudIcons]
            const positions = [
              { top: '20%', left: '3%' },
              { top: '28%', right: '3%' },
            ]
            const isRed = panel.variant === 'red'
            const speed = [0.08, -0.06][i]

            return (
              <motion.div
                key={panel.label}
                className={`absolute glass-panel p-4 w-48 rounded-lg ${
                  isRed ? 'border-red/30 bg-red/5' : 'hud-border'
                } ${i === 0 ? 'animate-float-delayed' : 'animate-float'}`}
                style={{
                  ...positions[i],
                  x: parallaxX * speed,
                  y: parallaxY * speed,
                }}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: parallaxX * speed } : {}}
                transition={{ duration: 0.8, delay: 1.5 + i * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                  <Icon className={`text-sm ${isRed ? 'text-red-dim' : 'text-cyan'}`} />
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    {panel.label}
                  </span>
                </div>
                <div
                  className={`font-mono text-sm font-semibold ${
                    isRed ? 'text-red-dim text-glow-red' : 'text-cyan text-glow-cyan'
                  } ${!isRed && 'animate-pulse-glow'} tracking-widest`}
                >
                  {panel.value}
                </div>
              </motion.div>
            )
          })}

          {hudPanels.slice(2, 4).map((panel, i) => {
            const Icon = hudIcons[panel.icon as keyof typeof hudIcons]
            const positions = [
              { bottom: '25%', left: '8%' },
              { bottom: '30%', right: '6%' },
            ]
            const speed = [0.1, -0.05][i]

            return (
              <motion.div
                key={panel.label}
                className={`absolute glass-panel p-4 w-52 rounded-lg hud-border ${
                  i === 0 ? 'animate-float-reverse' : 'animate-float-delayed'
                }`}
                style={{
                  ...positions[i],
                  x: parallaxX * speed,
                  y: parallaxY * speed,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: parallaxY * speed } : {}}
                transition={{ duration: 0.8, delay: 1.7 + i * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                  <Icon className={`text-sm ${panel.variant === 'cyan' ? 'text-cyan' : 'text-white'}`} />
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    {panel.label}
                  </span>
                </div>
                <div className={`font-mono text-lg font-bold ${
                  panel.variant === 'cyan' ? 'text-cyan' : 'text-white'
                }`}>
                  {panel.value}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Mobile HUD Grid ── */}
        <motion.div
          className="xl:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 mt-12 pb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: staggerDelay * 7 }}
        >
          {hudPanels.map((panel) => {
            const Icon = hudIcons[panel.icon as keyof typeof hudIcons]
            const isRed = panel.variant === 'red'
            return (
              <div
                key={panel.label}
                className={`glass-panel p-4 rounded-lg flex flex-col items-center text-center ${
                  isRed ? 'border-red/30 bg-red/5' : 'hud-border'
                }`}
              >
                <Icon className={`text-lg mb-1 ${isRed ? 'text-red-dim' : 'text-cyan'}`} />
                <span className="font-mono text-[10px] text-text-muted uppercase mb-1 tracking-wider">
                  {panel.label}
                </span>
                <span className={`font-mono text-sm font-bold ${
                  isRed ? 'text-red-dim' : panel.variant === 'cyan' ? 'text-cyan' : 'text-white'
                }`}>
                  {panel.value}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 2 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">
          Initialize Scroll
        </span>
        <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-cyan rounded-full"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 8px rgba(0, 242, 255, 0.8)' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
