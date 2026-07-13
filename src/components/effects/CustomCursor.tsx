import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const isDesktop = useIsDesktop()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 })
  const isHovering = useRef(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDesktop) return

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleEnterInteractive = () => {
      isHovering.current = true
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)'
        ringRef.current.style.borderColor = 'rgba(0, 242, 255, 0.6)'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)'
      }
    }

    const handleLeaveInteractive = () => {
      isHovering.current = false
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        ringRef.current.style.borderColor = 'rgba(0, 242, 255, 0.4)'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    // Add hover detection for interactive elements
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', handleEnterInteractive)
        el.addEventListener('mouseleave', handleLeaveInteractive)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.classList.remove('custom-cursor-active')
      observer.disconnect()
    }
  }, [isDesktop, cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <>
      {/* Outer ring - follows with spring physics */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="w-10 h-10 rounded-full border border-cyan/40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        />
      </motion.div>

      {/* Inner dot - follows cursor precisely */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <div className="w-1.5 h-1.5 bg-cyan rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200" />
      </motion.div>
    </>
  )
}
