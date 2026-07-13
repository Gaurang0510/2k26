import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { NAV_LINKS } from '../../lib/utils'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()

  // Auto-hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrollingDown = latest > lastScrollY.current
    setIsVisible(!isScrollingDown || latest < 100)
    setIsScrolled(latest > 50)
    lastScrollY.current = latest
  })

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            className="font-display text-xl font-bold tracking-tighter text-white hover:text-cyan transition-colors duration-300"
            style={{ textShadow: '0 0 20px rgba(0, 242, 255, 0.3)' }}
          >
            UPSURGE <span className="text-cyan text-sm font-mono">2026</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="relative font-mono text-xs uppercase tracking-[0.15em] py-2 transition-all duration-300 group"
                style={{
                  color: activeSection === link.href ? '#00f2ff' : 'rgba(185, 202, 203, 0.7)',
                }}
              >
                {link.label}
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === link.href ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: '0 0 8px rgba(0, 242, 255, 0.5)' }}
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan/50 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="font-mono text-xs text-cyan border border-cyan/30 px-5 py-2.5 hover:bg-cyan/10 transition-all duration-300 hover:border-cyan/60 hover:shadow-[0_0_15px_rgba(0,242,255,0.15)]">
              Contact
            </button>
            <button className="font-mono text-xs bg-cyan text-black px-5 py-2.5 font-semibold hover:bg-cyan-light hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] transition-all duration-300">
              Access Database
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-2xl font-bold tracking-tight text-white hover:text-cyan transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="font-mono text-sm bg-cyan text-black px-8 py-3 font-semibold mt-4"
              >
                Access Database
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
