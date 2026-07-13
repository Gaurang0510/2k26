import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { EVENT_DATE } from '../../lib/utils'

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ]

  return (
    <div className="glass-panel p-6 rounded-lg border border-white/10 w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 md:gap-6">
            <div className="flex flex-col items-center">
              <motion.span
                key={unit.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-mono text-3xl md:text-4xl font-bold text-cyan tabular-nums"
                style={{
                  textShadow: '0 0 20px rgba(0, 242, 255, 0.4)',
                }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mt-1">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-2xl text-cyan/50 animate-pulse font-light">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
