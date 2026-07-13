import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi'
import { footerContent } from '../../data/content'

const socialIcons = {
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  github: FaGithub,
}

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative border-t border-white/[0.06] bg-bg-primary">
      {/* Gradient divider */}
      <div className="section-divider" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 20px rgba(0, 242, 255, 0.3)' }}
            >
              UPSURGE <span className="text-cyan font-mono text-sm">2026</span>
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
              {footerContent.description}
            </p>
            <div className="flex gap-3">
              {footerContent.socials.map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,242,255,0.15)]"
                  >
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-6">
              Quick Access
            </h4>
            <ul className="space-y-3">
              {footerContent.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-text-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan/30 rounded-full group-hover:bg-cyan transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-6">
              Featured Events
            </h4>
            <ul className="space-y-3">
              {['CTF Challenge', 'Hackathon', 'Forensics Lab', 'AI Showdown', 'Robo Wars'].map((event) => (
                <li key={event}>
                  <a
                    href="#events"
                    className="font-body text-sm text-text-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan/30 rounded-full group-hover:bg-cyan transition-colors duration-300" />
                    {event}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan mb-6">
              Command Center
            </h4>
            <ul className="space-y-3">
              {footerContent.contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-text-muted hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan/30 rounded-full group-hover:bg-cyan transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-dim">
            © 2026 UPSURGE INTEL DIVISION. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim hover:text-cyan transition-colors duration-300 group"
          >
            Back to Top
            <span className="w-7 h-7 rounded-sm border border-white/10 flex items-center justify-center group-hover:border-cyan/30 group-hover:bg-cyan/10 transition-all duration-300">
              <HiArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
