import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { SceneBackground } from './SceneBackground'

/* ── Typewriter ─────────────────────────────────────────────── */
const WORDS = ['Coffee Houses', 'Supermarkets', 'Restaurants', 'Retail Stores', 'Jewelry Shops', 'Pharmacies', 'Clothing Stores', 'Bakeries']

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[wordIdx]
    let delay = deleting ? 55 : 100
    if (!deleting && charIdx === word.length) delay = 1800
    if (deleting && charIdx === 0) delay = 320
    const t = setTimeout(() => {
      if (!deleting && charIdx === word.length) { setDeleting(true); return }
      if (deleting && charIdx === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); return }
      setText(word.slice(0, deleting ? charIdx - 1 : charIdx + 1))
      setCharIdx(i => deleting ? i - 1 : i + 1)
    }, delay)
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words])
  return text
}

/* ── Animated counter ──────────────────────────────────────── */
function useCounter(target, triggered) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    const tick = now => {
      const p = Math.min((now - start) / 1500, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [triggered, target])
  return val
}

/* ── Animated vertical bar ──────────────────────────────────── */
const BAR_MAXH = 58, BAR_W = 17, BAR_GAP = 8
const WEEK_BARS = [
  { label: 'Mo', pct: 52, hi: false }, { label: 'Tu', pct: 70, hi: false },
  { label: 'We', pct: 44, hi: false }, { label: 'Th', pct: 85, hi: true  },
  { label: 'Fr', pct: 96, hi: true  }, { label: 'Sa', pct: 73, hi: false },
  { label: 'Su', pct: 55, hi: false },
]

function AnimatedBar({ x, barH, delay, gradId, label }) {
  const [phase, setPhase] = useState('enter')
  return (
    <g>
      <motion.rect
        x={x} width={BAR_W} rx={3} fill={`url(#${gradId})`}
        initial={{ height: 0, y: BAR_MAXH }}
        animate={phase === 'enter'
          ? { height: barH, y: BAR_MAXH - barH }
          : { height: [barH, barH + 5, barH], y: [BAR_MAXH - barH, BAR_MAXH - barH - 5, BAR_MAXH - barH] }
        }
        transition={phase === 'enter'
          ? { duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] }
          : { duration: 2.2 + delay * 0.4, repeat: Infinity, ease: 'easeInOut' }
        }
        onAnimationComplete={() => { if (phase === 'enter') setPhase('breathe') }}
      />
      <text x={x + BAR_W / 2} y={BAR_MAXH + 10} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.28)">{label}</text>
    </g>
  )
}

/* ── Dashboard Card ─────────────────────────────────────────── */
function DashboardCard({ visible }) {
  const cardRef = useRef(null)
  const revenue = useCounter(24850, visible)
  const orders  = useCounter(1284,  visible)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),   { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 })
  const onMouseMove = e => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width  - 0.5)
    mouseY.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }
  const SVG_W = WEEK_BARS.length * (BAR_W + BAR_GAP) - BAR_GAP
  const SVG_H = BAR_MAXH + 14

  return (
    <motion.div ref={cardRef} className="hv-card hv-card-glow"
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      whileHover={{ scale: 1.018 }} transition={{ scale: { duration: 0.3 } }}
    >
      <div className="hv-topbar">
        <div className="hv-dots"><span /><span /><span /></div>
        <span className="hv-title">Clarix — Live Dashboard</span>
        <span className="hv-live">● Live</span>
      </div>
      <div className="hv-kpis">
        {[
          { ico: '💰', label: 'Revenue', val: `$${revenue.toLocaleString()}`, delta: '▲ 18%', up: true },
          { ico: '🛒', label: 'Orders',  val: orders.toLocaleString(),        delta: '▲ 12%', up: true },
          { ico: '📦', label: 'Stock',   val: '94%',                          delta: '▼ 2%',  up: false },
        ].map(k => (
          <div key={k.label} className="hv-kpi">
            <div className="hv-kpi-ico">{k.ico}</div>
            <div className="hv-kpi-info">
              <div className="hv-kpi-label">{k.label}</div>
              <div className="hv-kpi-val">{k.val}</div>
            </div>
            <div className={`hv-kpi-delta ${k.up ? 'up' : 'down'}`}>{k.delta}</div>
          </div>
        ))}
      </div>
      <div className="hv-body">
        <div className="hv-chart-panel">
          <div className="hv-chart-hdr">
            <span className="hv-chart-lbl">Revenue Trend</span>
            <span className="hv-chart-total">$24,850</span>
          </div>
          <svg className="hv-linechart" viewBox="0 0 220 65" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradHero" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
              <filter id="dotGlowHero" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <motion.path
              d="M0,54 C14,50 24,47 40,41 S58,44 76,31 S98,35 116,20 S136,25 155,11 S176,17 220,15 L220,65 L0,65Z"
              fill="url(#areaGradHero)"
              initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 2.1 }}
            />
            <motion.path
              d="M0,54 C14,50 24,47 40,41 S58,44 76,31 S98,35 116,20 S136,25 155,11 S176,17 220,15"
              fill="none" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.6 }}
              animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0.6 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.35 }}
            />
            <motion.circle cx={155} cy={11} r={3.5} fill="#3B82F6" filter="url(#dotGlowHero)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
              transition={{ duration: 0.25, delay: 1.9 }}
            >
              <animate attributeName="r" values="3.5;6;3.5" dur="2s" repeatCount="indefinite" begin="2.2s" />
              <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="2.2s" />
            </motion.circle>
            <motion.circle cx={220} cy={15} r={2.5} fill="#34D399"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
              transition={{ duration: 0.25, delay: 2.05 }}
            >
              <animate attributeName="r" values="2.5;4.8;2.5" dur="1.8s" repeatCount="indefinite" begin="2.3s" />
              <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" begin="2.3s" />
            </motion.circle>
          </svg>
          <div className="hv-chart-days">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
        <div className="hv-products-panel">
          <div className="hv-prod-hdr">Daily Sales</div>
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="hv-bars-svg" overflow="visible">
            <defs>
              {WEEK_BARS.map((b, i) => (
                <linearGradient key={i} id={`hBarG${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={b.hi ? '#22D3EE' : '#60A5FA'} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={b.hi ? '#3B82F6' : '#1D4ED8'} stopOpacity="0.35" />
                </linearGradient>
              ))}
            </defs>
            {WEEK_BARS.map((bar, i) => (
              <AnimatedBar key={bar.label} x={i * (BAR_W + BAR_GAP)} barH={(bar.pct / 100) * BAR_MAXH}
                delay={0.28 + i * 0.08} gradId={`hBarG${i}`} label={bar.label} />
            ))}
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Website Mockup ─────────────────────────────────────────── */
function WebsiteMockup() {
  return (
    <div style={{
      background: 'rgba(6,12,34,0.90)',
      border: '1px solid rgba(59,130,246,0.20)',
      borderRadius: 20,
      overflow: 'hidden',
      backdropFilter: 'blur(28px)',
      boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 48px 96px rgba(2,6,23,0.65)',
      width: '100%',
    }}>
      {/* Browser chrome */}
      <div style={{ background: 'rgba(255,255,255,0.035)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.55 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 5, height: 20, display: 'flex', alignItems: 'center', padding: '0 9px' }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace', letterSpacing: 0.2 }}>clarixsolutions.com</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[20, 16, 14].map((w, i) => (
            <div key={i} style={{ width: w, height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Nav strip */}
      <div style={{ background: 'rgba(255,255,255,0.018)', padding: '7px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ width: 50, height: 7, background: 'linear-gradient(90deg,#3B82F6,#06B6D4)', borderRadius: 3 }} />
        <div style={{ flex: 1 }} />
        {[40, 32, 28, 24].map((w, i) => (
          <div key={i} style={{ width: w, height: 5, background: 'rgba(255,255,255,0.09)', borderRadius: 2 }} />
        ))}
        <div style={{ width: 54, height: 20, background: 'linear-gradient(90deg,#2563EB,#06B6D4)', borderRadius: 50, opacity: 0.85 }} />
      </div>

      {/* Page content */}
      <div style={{ padding: '18px 18px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
        {/* Left: hero copy */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: 50, padding: '2px 9px', marginBottom: 10 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 5px #34D399' }} />
            <span style={{ fontSize: '0.5rem', color: '#34D399', fontWeight: 700, letterSpacing: 0.5 }}>LIVE DASHBOARDS</span>
          </div>
          <div style={{ height: 13, width: '88%', background: 'rgba(255,255,255,0.82)', borderRadius: 3, marginBottom: 5 }} />
          <div style={{ height: 13, width: '65%', background: 'linear-gradient(90deg,#3B82F6,#06B6D4)', borderRadius: 3, marginBottom: 10 }} />
          {[92, 78, 58].map((w, i) => (
            <div key={i} style={{ height: 5, width: `${w}%`, background: 'rgba(255,255,255,0.09)', borderRadius: 2, marginBottom: 4 }} />
          ))}
          <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
            <div style={{ height: 22, padding: '0 13px', background: 'linear-gradient(90deg,#2563EB,#06B6D4)', borderRadius: 50, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 36, height: 5, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
            </div>
            <div style={{ height: 22, padding: '0 11px', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 50, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 26, height: 5, background: 'rgba(255,255,255,0.22)', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Right: mini dashboard preview */}
        <div style={{ background: 'rgba(255,255,255,0.025)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', padding: '10px 10px 7px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, marginBottom: 8 }}>
            {[
              { l: 'SALES', v: '+24%', r: '59,130,246' },
              { l: 'PROFIT', v: '$12k', r: '52,211,153' },
              { l: 'STOCK', v: '98%',  r: '139,92,246' },
            ].map(k => (
              <div key={k.l} style={{ background: `rgba(${k.r},0.09)`, border: `1px solid rgba(${k.r},0.16)`, borderRadius: 6, padding: '5px 3px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.48rem', color: `rgb(${k.r})`, fontWeight: 700, marginBottom: 2, letterSpacing: 0.3 }}>{k.l}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>{k.v}</div>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 100 28" style={{ width: '100%', height: 30, display: 'block' }}>
            <defs>
              <linearGradient id="wmAreaG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d="M0,22 Q12,8 25,15 T50,6 T75,14 T100,8 L100,28 L0,28Z"
              fill="url(#wmAreaG)" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.path d="M0,22 Q12,8 25,15 T50,6 T75,14 T100,8"
              fill="none" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
            />
          </svg>
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ padding: '0 18px 14px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Real-time Analytics', 'Inventory Tracking', 'Custom Websites', 'Multi-branch'].map(f => (
          <div key={f} style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.14)', borderRadius: 50, padding: '3px 9px', fontSize: '0.55rem', color: 'rgba(148,163,184,0.85)', fontWeight: 600 }}>{f}</div>
        ))}
      </div>
    </div>
  )
}

/* ── Chaos data cells ───────────────────────────────────────── */
const CHAOS_DATA = [
  { label: 'REV',  value: '24,850', delta: '+18%', up: true  },
  { label: 'COGS', value: '9,412',  delta: '-3%',  up: false },
  { label: 'GP%',  value: '62.1%',  delta: '+5%',  up: true  },
  { label: 'INV',  value: '1,284',  delta: '+12%', up: true  },
  { label: 'EXP',  value: '4,200',  delta: '+1%',  up: false },
  { label: 'NET',  value: '11,238', delta: '+22%', up: true  },
  { label: 'STK',  value: '94.0%',  delta: '-2%',  up: false },
  { label: 'ORD',  value: '847',    delta: '+9%',  up: true  },
  { label: 'RET',  value: '2.1%',   delta: '-0.3%',up: true  },
  { label: 'LTV',  value: '$340',   delta: '+7%',  up: true  },
  { label: 'AOV',  value: '$29.4',  delta: '+4%',  up: true  },
  { label: 'CHN',  value: '98.7%',  delta: '+0.2%',up: true  },
]

/* Fixed positions so no re-render flicker */
const CHAOS_POS = [
  { x:  2, y: 10, r: -14 }, { x: 72, y:  4, r:  11 }, { x: 38, y:  2, r:  -6 },
  { x: 80, y: 16, r:  16 }, { x:  5, y: 40, r: -20 }, { x: 68, y: 50, r:   8 },
  { x: 13, y: 66, r:  14 }, { x: 76, y: 68, r: -12 }, { x: 42, y: 78, r:  18 },
  { x: 54, y: 12, r:  -8 }, { x: 22, y: 34, r:  22 }, { x: 84, y: 40, r: -18 },
]

const CENTER_BLOCKS = [
  { l: 0,   t: 18,  r: -12 }, { l: 82,  t: 0,   r: 7  },
  { l: 168, t: 22,  r: 15  }, { l: 38,  t: 94,  r: -9 },
  { l: 132, t: 100, r: 11  },
]

/* ── Phase word config ──────────────────────────────────────── */
const PHASE_WORDS = ['Chaos', 'Clarity', 'Growth']

/* ── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)
  const typed = useTypewriter(WORDS)
  const [phase, setPhase] = useState(0)
  const [dashVisible, setDashVisible]   = useState(false)
  const [countersStarted, setCounStarted] = useState(false)
  const c50 = useCounter(50, countersStarted)
  const c10 = useCounter(10, countersStarted)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 18, mass: 0.5 })

  /* Phase tracking */
  useEffect(() => {
    return smooth.on('change', v => {
      const p = v < 0.30 ? 0 : v < 0.66 ? 1 : 2
      setPhase(prev => prev !== p ? p : prev)
      if (v >= 0.28) setDashVisible(true)
      if (v >= 0.80) setCounStarted(true)
    })
  }, [smooth])

  /* Chaos */
  const chaosOpacity = useTransform(smooth, [0, 0.28], [1, 0])
  const chaosScale   = useTransform(smooth, [0, 0.28], [1, 1.08])
  const chaosFilter  = useTransform(smooth, [0, 0.28], ['blur(0px)', 'blur(16px)'])

  /* Dashboard */
  const dashOpacity  = useTransform(smooth, [0.16, 0.42, 0.60, 0.74], [0, 1, 1, 0])
  const dashY        = useTransform(smooth, [0.16, 0.42], [72, 0])
  const dashScale    = useTransform(smooth, [0.16, 0.42], [0.87, 1])

  /* Website */
  const webOpacity   = useTransform(smooth, [0.64, 0.82], [0, 1])
  const webY         = useTransform(smooth, [0.64, 0.82], [52, 0])
  const webScale     = useTransform(smooth, [0.64, 0.82], [0.90, 1])

  /* Text */
  const textOpacity  = useTransform(smooth, [0.78, 1.0], [1, 0.85])
  const textY        = useTransform(smooth, [0.80, 1.0], [0, -24])

  /* CTA */
  const ctaOpacity   = useTransform(smooth, [0.82, 0.96], [0, 1])
  const ctaY         = useTransform(smooth, [0.82, 0.96], [30, 0])

  /* Scroll indicator */
  const scrollIndOp  = useTransform(scrollYProgress, [0, 0.10], [1, 0])

  const scrollTo = id => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: '300vh', position: 'relative', display: 'block', minHeight: 'unset', padding: 0, overflow: 'visible' }}
    >
      {/* ── Sticky viewport ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Background */}
        <SceneBackground variant="combined" color="#3B82F6" />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'linear-gradient(160deg, rgba(2,6,23,0.90) 0%, rgba(7,20,55,0.72) 55%, rgba(13,31,66,0.55) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '92px 24px 36px', gap: 0,
        }}>

          {/* ── Visual morphing frame ── */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 700, height: 360, flexShrink: 0 }}>

            {/* — Phase 0: Chaos — */}
            <motion.div style={{ position: 'absolute', inset: 0, opacity: chaosOpacity, scale: chaosScale, filter: chaosFilter }}>
              {/* Scattered outer cells */}
              {CHAOS_POS.map((pos, i) => {
                const cell = CHAOS_DATA[i % CHAOS_DATA.length]
                return (
                  <motion.div key={i}
                    style={{
                      position: 'absolute',
                      left: `${pos.x}%`, top: `${pos.y}%`,
                      transform: `rotate(${pos.r}deg)`,
                      background: 'rgba(6,11,30,0.72)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10, padding: '6px 10px',
                      minWidth: 84, pointerEvents: 'none',
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 0.70, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.035 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: '0.54rem', fontWeight: 700, color: 'rgba(148,163,184,0.65)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{cell.label}</span>
                      <span style={{ fontSize: '0.52rem', fontWeight: 700, color: cell.up ? '#34D399' : '#F87171', background: cell.up ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)', padding: '1px 4px', borderRadius: 3 }}>{cell.delta}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'rgba(255,255,255,0.80)', fontFamily: 'monospace' }}>{cell.value}</div>
                  </motion.div>
                )
              })}
              {/* Central cluster — overlapping fragments */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 270, height: 190 }}>
                  {CENTER_BLOCKS.map((p, i) => (
                    <motion.div key={i}
                      style={{
                        position: 'absolute', left: p.l, top: p.t,
                        transform: `rotate(${p.r}deg)`,
                        background: 'rgba(6,11,30,0.82)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(59,130,246,0.14)',
                        borderRadius: 9, padding: '7px 10px', minWidth: 82,
                        pointerEvents: 'none',
                      }}
                      initial={{ opacity: 0 }} animate={{ opacity: 0.72 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                    >
                      <div style={{ height: 5, width: '68%', background: 'rgba(59,130,246,0.38)', borderRadius: 2, marginBottom: 4 }} />
                      <div style={{ height: 8, width: '52%', background: 'rgba(255,255,255,0.5)', borderRadius: 2, marginBottom: 3 }} />
                      <div style={{ height: 4, width: '82%', background: 'rgba(255,255,255,0.07)', borderRadius: 1 }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* — Phase 1: Dashboard — */}
            <motion.div style={{
              position: 'absolute', inset: 0,
              opacity: dashOpacity, y: dashY, scale: dashScale,
            }}>
              <DashboardCard visible={dashVisible} />
            </motion.div>

            {/* — Phase 2: Website mockup — */}
            <motion.div style={{
              position: 'absolute', inset: 0,
              opacity: webOpacity, y: webY, scale: webScale,
            }}>
              <WebsiteMockup />
            </motion.div>

          </div>

          {/* ── Headline + sub ── */}
          <motion.div style={{ textAlign: 'center', marginTop: 26, opacity: textOpacity, y: textY }}>

            <AnimatePresence mode="wait">
              {phase < 2 ? (
                <motion.h1 key="clarity-h"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.04em', color: 'var(--white)', marginBottom: 12 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.42 }}
                >
                  Clarity from{' '}
                  <AnimatePresence mode="wait">
                    <motion.span key={`word-${phase}`}
                      style={phase === 0 ? { color: 'rgba(148,163,184,0.45)' } : undefined}
                      className={phase === 1 ? 'text-gradient-anim' : undefined}
                      initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(5px)' }}
                      transition={{ duration: 0.38 }}
                    >
                      {PHASE_WORDS[phase]}
                    </motion.span>
                  </AnimatePresence>
                </motion.h1>
              ) : (
                <motion.h1 key="main-h"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.04em', color: 'var(--white)', marginBottom: 12 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.42 }}
                >
                  Track Your Business.<br />
                  <span className="text-gradient-anim">Increase Your Profits.</span>
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.p key="p0"
                  style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  We turn messy data into powerful dashboards and stunning websites.
                </motion.p>
              )}
              {phase === 1 && (
                <motion.p key="p1"
                  style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Real-time KPIs, revenue trends, inventory &amp; employee tracking — all in one place.
                </motion.p>
              )}
              {phase === 2 && (
                <motion.div key="p2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ maxWidth: 480, margin: '0 auto' }}
                >
                  <div className="hero-typewriter" style={{ marginBottom: 6 }}>
                    Built for <span className="typed-word">{typed}</span><span className="typed-cursor">|</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
                    Custom dashboards and professional websites tailored to your exact operations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA + metrics (phase 2) ── */}
          <motion.div style={{ opacity: ctaOpacity, y: ctaY, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 20, width: '100%' }}>
            <div className="hero-btns" style={{ justifyContent: 'center', marginBottom: 0 }}>
              <button className="btn-primary btn-hero-main" onClick={() => scrollTo('services')}>Explore Our Services ↓</button>
              <button className="btn-outline-white" onClick={() => scrollTo('contact')}>Free Consultation</button>
            </div>
            <div className="hero-metrics">
              <div className="hm-item"><strong>{c50}+</strong><span>Projects Delivered</span></div>
              <div className="hm-div" />
              <div className="hm-item"><strong>{c10}+</strong><span>Industries Served</span></div>
              <div className="hm-div" />
              <div className="hm-item"><strong>100%</strong><span>Custom Built</span></div>
            </div>
          </motion.div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div style={{
          opacity: scrollIndOp,
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, zIndex: 5,
          color: 'var(--text-dim)', fontSize: '0.72rem',
          fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          <span>Scroll to explore</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </motion.div>

      </div>
    </section>
  )
}
