import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionBadge from '../components/ui/SectionBadge'
import AnimatedText from '../components/ui/AnimatedText'
import MagneticButton from '../components/ui/MagneticButton'
import { sponsorsContent } from '../data/content'

const tierConfig: Record<string, { size: string; border: string; text: string; label: string }> = {
  Platinum: {
    size: 'w-36 h-36 md:w-44 md:h-44',
    border: 'border-cyan/30 hover:border-cyan/60',
    text: 'text-2xl',
    label: 'text-cyan',
  },
  Gold: {
    size: 'w-28 h-28 md:w-36 md:h-36',
    border: 'border-yellow-500/20 hover:border-yellow-500/40',
    text: 'text-xl',
    label: 'text-yellow-400',
  },
  Silver: {
    size: 'w-24 h-24 md:w-28 md:h-28',
    border: 'border-white/10 hover:border-white/20',
    text: 'text-lg',
    label: 'text-text-muted',
  },
}

export default function Sponsors() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sponsors" ref={ref} className="relative py-40 md:py-52 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        <div className="text-center mb-24">
          <SectionBadge text={sponsorsContent.badge} />
          <motion.div className="mt-8">
            <AnimatedText
              text={sponsorsContent.title}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight justify-center"
              animation="slide-up"
              delay={0.2}
            />
          </motion.div>
          <motion.p
            className="mt-8 font-body text-base md:text-lg text-text-muted/80 max-w-2xl mx-auto leading-loose"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {sponsorsContent.description}
          </motion.p>
        </div>

        <div className="space-y-24">
          {sponsorsContent.tiers.map((tier, ti) => {
            const cfg = tierConfig[tier.name]
            return (
              <motion.div
                key={tier.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + ti * 0.15 }}
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-white/[0.06]" />
                  <span className={`font-mono text-[11px] uppercase tracking-[0.25em] ${cfg.label}`}>
                    {tier.name} Partners
                  </span>
                  <div className="h-[1px] w-12 bg-white/[0.06]" />
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {tier.sponsors.map((s) => (
                    <motion.div
                      key={s.name}
                      className={`${cfg.size} glass-panel rounded-lg ${cfg.border} border flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(0,242,255,0.1)]`}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <span className={`font-orbitron ${cfg.text} font-bold text-text-dim group-hover:text-white transition-colors duration-300`}>
                        {s.initials}
                      </span>
                      <span className="font-body text-[10px] text-text-dim mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {s.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <MagneticButton variant="ghost">[ Become a Partner ]</MagneticButton>
        </motion.div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  )
}
