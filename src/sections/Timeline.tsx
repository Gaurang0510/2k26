import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionBadge from '../components/ui/SectionBadge'
import AnimatedText from '../components/ui/AnimatedText'
import { timelineContent } from '../data/content'

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Timeline line fill progress
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="timeline" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        {/* Section Header */}
        <div className="text-center mb-24">
          <SectionBadge text={timelineContent.badge} />
          <motion.div className="mt-8">
            <AnimatedText
              text={timelineContent.title}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight justify-center"
              animation="slide-up"
              delay={0.2}
            />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line (background) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06]" />

          {/* Center line (fill on scroll) */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-cyan via-blue to-purple origin-top"
            style={{ height: lineHeight, boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)' }}
          />

          {/* Timeline Entries */}
          <div className="space-y-24 md:space-y-32">
            {timelineContent.entries.map((entry, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={entry.title}
                  className={`relative flex items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } pl-12 md:pl-0`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                >
                  {/* Dot marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1 z-10">
                    <div className="w-3 h-3 rounded-full bg-cyan border-2 border-bg-primary shadow-[0_0_12px_rgba(0,242,255,0.5)]" />
                  </div>

                  {/* Content card */}
                  <div className={`md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="glass-panel p-8 rounded-lg hud-border hover:border-cyan/30 transition-all duration-300 group">
                      <span className="font-mono text-[11px] text-cyan uppercase tracking-[0.15em] mb-2 block">
                        {entry.date}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-cyan transition-colors duration-300">
                        {entry.title}
                      </h3>
                      <p className="font-body text-sm text-text-muted/80 leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
