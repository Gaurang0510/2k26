import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import SectionBadge from '../components/ui/SectionBadge'
import AnimatedText from '../components/ui/AnimatedText'
import GlassCard from '../components/ui/GlassCard'
import { aboutContent } from '../data/content'
import { HiOutlineFingerPrint, HiOutlineShieldCheck, HiOutlineLightningBolt } from 'react-icons/hi'

const featureIcons = {
  fingerprint: HiOutlineFingerPrint,
  shield: HiOutlineShieldCheck,
  brain: HiOutlineLightningBolt,
}

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`)

  return (
    <motion.span
      ref={ref}
      className="font-orbitron text-3xl md:text-4xl font-bold text-cyan"
      style={{ textShadow: '0 0 25px rgba(0, 242, 255, 0.4)' }}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={() => {
            // Animate count from 0 to value
            const duration = 2000
            const startTime = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              count.set(eased * value)
              if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
          }}
        >
          <motion.span>{rounded}</motion.span>
        </motion.span>
      )}
    </motion.span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 242, 255, 0.03) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        {/* Section Header */}
        <div className="text-center mb-24">
          <SectionBadge text={aboutContent.badge} />

          <motion.div className="mt-8">
            <AnimatedText
              text={aboutContent.title}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight justify-center"
              animation="slide-up"
              delay={0.2}
            />
          </motion.div>

          <motion.p
            className="mt-8 font-body text-base md:text-lg text-text-muted/80 max-w-3xl mx-auto leading-loose"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {aboutContent.description}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {aboutContent.features.map((feature, i) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
              >
                <GlassCard className="group p-10 h-full flex flex-col justify-start">
                  <div className="w-12 h-12 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 group-hover:bg-cyan/20 group-hover:border-cyan/40 transition-all duration-300">
                    <Icon className="text-cyan text-xl" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan/30" />
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          className="glass-panel rounded-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {aboutContent.stats.map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || '+'}
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mt-2">
                  {stat.label}
                </p>
                {/* Vertical divider */}
                {i < aboutContent.stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/[0.06]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
