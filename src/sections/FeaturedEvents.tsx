import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionBadge from '../components/ui/SectionBadge'
import AnimatedText from '../components/ui/AnimatedText'
import GlassCard from '../components/ui/GlassCard'
import { eventsContent } from '../data/content'
import { HiOutlineLightningBolt, HiOutlineCode, HiOutlineBeaker, HiOutlineChip, HiOutlineCog, HiOutlinePuzzle } from 'react-icons/hi'

const eventIcons = {
  ctf: HiOutlineLightningBolt,
  hackathon: HiOutlineCode,
  forensics: HiOutlineBeaker,
  'ai-ml': HiOutlineChip,
  robowars: HiOutlineCog,
  escape: HiOutlinePuzzle,
}

const difficultyColors: Record<string, string> = {
  Expert: 'text-red-dim border-red/30 bg-red/10',
  Advanced: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  Intermediate: 'text-cyan border-cyan/30 bg-cyan/10',
  'All Levels': 'text-green-400 border-green-500/30 bg-green-500/10',
}

const categoryColors: Record<string, string> = {
  Competition: 'text-purple border-purple/30',
  Technical: 'text-cyan border-cyan/30',
  Workshop: 'text-blue-light border-blue/30',
  Experience: 'text-green-400 border-green-500/30',
}

export default function FeaturedEvents() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="events" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        {/* Section Header */}
        <div className="text-center mb-24">
          <SectionBadge text={eventsContent.badge} />
          <motion.div className="mt-8">
            <AnimatedText
              text={eventsContent.title}
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
            {eventsContent.description}
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsContent.events.map((event, i) => {
            const Icon = eventIcons[event.id as keyof typeof eventIcons]
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <GlassCard className="group p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
                      categoryColors[event.category] || 'text-text-muted border-white/10'
                    }`}>
                      {event.category}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      difficultyColors[event.difficulty] || 'text-text-muted border-white/10'
                    }`}>
                      {event.difficulty}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0 group-hover:bg-cyan/20 group-hover:border-cyan/40 transition-all duration-300">
                      <Icon className="text-cyan text-lg" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-cyan transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-text-muted/80 leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
                        {event.date}
                      </span>
                      <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider mt-0.5">
                        {event.slots} slots
                      </span>
                    </div>
                    <button className="font-mono text-[11px] text-cyan uppercase tracking-[0.1em] hover:text-white transition-colors duration-300 flex items-center gap-1.5 group/btn">
                      Access File
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
