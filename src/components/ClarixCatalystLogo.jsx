import { motion } from 'framer-motion'
import { useTheme } from '../App'

export default function ClarixCatalystLogo() {
  const { isDarkMode } = useTheme()

  return (
    <motion.div
      className="flex items-center gap-3 group cursor-pointer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Geometric Data Orb */}
      <div className="relative w-10 h-10 flex items-center justify-center" style={{ flexShrink: 0 }}>
        {/* Holographic aura */}
        <div
          className="absolute inset-0 blur-[15px] opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #1d4ed8, #22d3ee)', borderRadius: '50%' }}
        />

        <svg viewBox="0 0 100 100" className="w-8 h-8 relative z-10" style={{ fill: 'none', overflow: 'visible' }}>
          {/* Animated 3D faceted shell */}
          <motion.path
            d="M50 5 L85 25 L95 60 L75 90 L50 95 L25 90 L5 60 L15 25 Z"
            fill="#2B68E9"
            animate={{
              d: [
                'M50 5 L85 25 L95 60 L75 90 L50 95 L25 90 L5 60 L15 25 Z',
                'M50 5 L90 20 L100 65 L80 95 L50 100 L20 95 L0 65 L10 20 Z',
                'M50 5 L85 25 L95 60 L75 90 L50 95 L25 90 L5 60 L15 25 Z',
              ],
              scale: [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          />

          {/* Rotating ring */}
          <motion.circle
            cx="50" cy="50" r="38"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />

          {/* Scan-line */}
          <motion.line
            x1="15" y1="50" x2="85" y2="50"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.7, 0] }}
            transition={{ delay: 0.5, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Data pulse particles */}
          <motion.circle
            r="2" fill="#FFFFFF"
            animate={{ cx: [20, 80], cy: [35, 70], opacity: [0, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          />
          <motion.circle
            r="2" fill="#7AAEFF"
            animate={{ cx: [80, 20], cy: [35, 70], opacity: [0, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* CLARIX wordmark */}
      <div className="relative">
        <span
          className="group-hover:scale-[1.03] transition-transform inline-block"
          style={{
            fontSize: '1.35rem',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isDarkMode ? '#F5F5F7' : '#0F172A',
            transition: 'color 0.3s',
          }}
        >
          CLARIX
        </span>

        {/* Underline accent */}
        <div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, #2B68E9 0%, #7AAEFF 60%, transparent 100%)',
            borderRadius: 999,
            marginTop: 2,
            width: '100%',
          }}
        />

        {/* Hover particle stream */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: 'calc(100% + 6px)', display: 'flex', alignItems: 'center', gap: 2 }}
        >
          {[{ size: 4, color: '#2B68E9', dur: 1.5 }, { size: 3, color: '#4A82FF', dur: 1.2 }, { size: 2, color: '#22d3ee', dur: 1.0 }].map((p, i) => (
            <motion.div
              key={i}
              style={{ width: p.size, height: p.size, borderRadius: '50%', background: p.color }}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 0, 0], x: [0, 0, 0] }}
              whileHover={{ opacity: [0, 1, 0], x: [0, 28, 0] }}
              transition={{ repeat: Infinity, duration: p.dur, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
