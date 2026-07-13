import { useEffect, useRef } from 'react'
import { useIsDesktop } from '../../hooks/useMediaQuery'

export default function MouseGlow() {
  const isDesktop = useIsDesktop()
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDesktop) return

    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
        glowRef.current.style.opacity = '1'
      }
    }

    const handleLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={glowRef}
      className="fixed w-[400px] h-[400px] pointer-events-none z-[1] opacity-0 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(0,242,255,0.07) 0%, rgba(0,100,255,0.03) 40%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
      }}
    />
  )
}
