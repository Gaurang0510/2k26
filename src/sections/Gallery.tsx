import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionBadge from '../components/ui/SectionBadge'
import AnimatedText from '../components/ui/AnimatedText'
import MagneticButton from '../components/ui/MagneticButton'
import { galleryContent } from '../data/content'

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Generate gradient backgrounds for placeholder gallery items
  const gradients = [
    'from-cyan/20 to-blue/20',
    'from-blue/20 to-purple/20',
    'from-purple/20 to-cyan/20',
    'from-cyan/15 to-purple/15',
    'from-blue/15 to-cyan/15',
    'from-purple/15 to-blue/15',
  ]

  const sizes = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
  ]

  return (
    <section id="gallery" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        <div className="text-center mb-24">
          <SectionBadge text={galleryContent.badge} />
          <motion.div className="mt-8">
            <AnimatedText
              text={galleryContent.title}
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
            {galleryContent.description}
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {galleryContent.items.map((item, i) => (
            <motion.div
              key={item.title}
              className={`relative group rounded-lg overflow-hidden cursor-pointer ${sizes[i]}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient placeholder background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} border border-white/[0.06]`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border border-cyan/20 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan/30 rounded-full" />
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-text-dim tracking-wider">
                  FILE_{String(i + 1).padStart(3, '0')}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <span className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-white text-center">
                  {item.title}
                </h3>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-cyan/30 transition-colors duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <MagneticButton variant="ghost">
            [ View Full Archives ]
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
