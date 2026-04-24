import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { SceneBackground } from './SceneBackground'

/* ── Typewriter ───────────────────────────────────────────── */
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

/* ── Animated counter ─────────────────────────────────────── */
function useCounter(target, triggered) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const duration = 1500
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [triggered, target])
  return val
}

/* ── Animated vertical bar (grow-up then breathe) ────────── */
const BAR_MAXH = 58
const BAR_W = 17
const BAR_GAP = 8

const WEEK_BARS = [
  { label: 'Mo', pct: 52, hi: false },
  { label: 'Tu', pct: 70, hi: false },
  { label: 'We', pct: 44, hi: false },
  { label: 'Th', pct: 85, hi: true  },
  { label: 'Fr', pct: 96, hi: true  },
  { label: 'Sa', pct: 73, hi: false },
  { label: 'Su', pct: 55, hi: false },
]

function AnimatedBar({ x, barH, delay, gradId, label }) {
  const [phase, setPhase] = useState('enter')

  return (
    <g>
      <motion.rect
        x={x}
        width={BAR_W}
        rx={3}
        fill={`url(#${gradId})`}
        initial={{ height: 0, y: BAR_MAXH }}
        animate={
          phase === 'enter'
            ? { height: barH, y: BAR_MAXH - barH }
            : {
                height: [barH, barH + 5, barH],
                y: [BAR_MAXH - barH, BAR_MAXH - barH - 5, BAR_MAXH - barH],
              }
        }
        transition={
          phase === 'enter'
            ? { duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] }
            : { duration: 2.2 + delay * 0.4, repeat: Infinity, ease: 'easeInOut' }
        }
        onAnimationComplete={() => { if (phase === 'enter') setPhase('breathe') }}
      />
      <text
        x={x + BAR_W / 2}
        y={BAR_MAXH + 10}
        textAnchor="middle"
        fontSize="7"
        fill="rgba(255,255,255,0.28)"
      >
        {label}
      </text>
    </g>
  )
}

/* ── Dashboard Card ───────────────────────────────────────── */
function DashboardCard() {
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)

  // KPI counters
  const revenue = useCounter(24850, inView)
  const orders  = useCounter(1284,  inView)

  // 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]),  { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 180, damping: 22 })

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const SVG_W = WEEK_BARS.length * (BAR_W + BAR_GAP) - BAR_GAP
  const SVG_H = BAR_MAXH + 14

  return (
    <motion.div
      ref={cardRef}
      className="hv-card hv-card-glow"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onViewportEnter={() => setInView(true)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      whileHover={{ scale: 1.025 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      {/* ── Top bar ── */}
      <div className="hv-topbar">
        <div className="hv-dots"><span /><span /><span /></div>
        <span className="hv-title">Clarix — Live Dashboard</span>
        <span className="hv-live">● Live</span>
      </div>

      {/* ── KPI row with counters ── */}
      <div className="hv-kpis">
        <div className="hv-kpi">
          <div className="hv-kpi-ico">💰</div>
          <div className="hv-kpi-info">
            <div className="hv-kpi-label">Revenue</div>
            <div className="hv-kpi-val">${revenue.toLocaleString()}</div>
          </div>
          <div className="hv-kpi-delta up">▲ 18%</div>
        </div>
        <div className="hv-kpi">
          <div className="hv-kpi-ico">🛒</div>
          <div className="hv-kpi-info">
            <div className="hv-kpi-label">Orders</div>
            <div className="hv-kpi-val">{orders.toLocaleString()}</div>
          </div>
          <div className="hv-kpi-delta up">▲ 12%</div>
        </div>
        <div className="hv-kpi">
          <div className="hv-kpi-ico">📦</div>
          <div className="hv-kpi-info">
            <div className="hv-kpi-label">Stock</div>
            <div className="hv-kpi-val">94%</div>
          </div>
          <div className="hv-kpi-delta down">▼ 2%</div>
        </div>
      </div>

      {/* ── Charts body ── */}
      <div className="hv-body">

        {/* LEFT — self-drawing line chart */}
        <div className="hv-chart-panel">
          <div className="hv-chart-hdr">
            <span className="hv-chart-lbl">Revenue Trend</span>
            <span className="hv-chart-total">$24,850</span>
          </div>

          <svg className="hv-linechart" viewBox="0 0 220 65" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#2B68E9" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#2B68E9" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area fill — fades in once line is drawn */}
            <motion.path
              d="M0,54 C14,50 24,47 40,41 S58,44 76,31 S98,35 116,20 S136,25 155,11 S176,17 220,15 L220,65 L0,65Z"
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 2.1 }}
            />

            {/* Line — draws itself left to right */}
            <motion.path
              d="M0,54 C14,50 24,47 40,41 S58,44 76,31 S98,35 116,20 S136,25 155,11 S176,17 220,15"
              fill="none"
              stroke="#2B68E9"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.6 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.35 }}
            />

            {/* Peak point — appears then pulses indefinitely */}
            <motion.circle
              cx={155} cy={11} r={3.5} fill="#2B68E9"
              filter="url(#dotGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 1.9 }}
            >
              <animate attributeName="r"       values="3.5;5.8;3.5" dur="2s"   repeatCount="indefinite" begin="2.2s" />
              <animate attributeName="opacity" values="1;0.35;1"    dur="2s"   repeatCount="indefinite" begin="2.2s" />
            </motion.circle>

            {/* Trailing end point */}
            <motion.circle
              cx={220} cy={15} r={2.5} fill="#10B981"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 2.05 }}
            >
              <animate attributeName="r"       values="2.5;4.5;2.5" dur="1.8s" repeatCount="indefinite" begin="2.3s" />
              <animate attributeName="opacity" values="1;0.4;1"     dur="1.8s" repeatCount="indefinite" begin="2.3s" />
            </motion.circle>

            {/* Glow filter for the peak point */}
            <defs>
              <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>

          <div className="hv-chart-days">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* RIGHT — animated vertical bar chart */}
        <div className="hv-products-panel">
          <div className="hv-prod-hdr">Daily Sales</div>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="hv-bars-svg"
            overflow="visible"
          >
            <defs>
              {WEEK_BARS.map((b, i) => (
                <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={b.hi ? '#7AAEFF' : '#3B78F5'} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={b.hi ? '#2B68E9' : '#0E2870'} stopOpacity="0.35" />
                </linearGradient>
              ))}
            </defs>
            {WEEK_BARS.map((bar, i) => (
              <AnimatedBar
                key={bar.label}
                x={i * (BAR_W + BAR_GAP)}
                barH={(bar.pct / 100) * BAR_MAXH}
                delay={0.28 + i * 0.08}
                gradId={`barGrad${i}`}
                label={bar.label}
              />
            ))}
          </svg>
        </div>

      </div>
    </motion.div>
  )
}

/* ── Hero section ─────────────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(WORDS)
  const [countersStarted, setCountersStarted] = useState(false)
  const c50 = useCounter(50, countersStarted)
  const c10 = useCounter(10, countersStarted)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <SceneBackground variant="combined" color="#2B68E9" />
      {/* Subtle gradient overlay so text stays readable over the 3D scene */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(3,10,25,0.72) 0%, rgba(7,24,48,0.55) 100%)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="container hero-layout" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Text column ── */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="hb-dot" />
            Trusted by 50+ businesses · Amman, Jordan
          </motion.div>

          <h1>Track Your Business.<br /><span className="text-gradient-anim">Increase Your Profits.</span></h1>

          <div className="hero-typewriter">
            Built for <span className="typed-word">{typed}</span><span className="typed-cursor">|</span>
          </div>

          <p className="hero-sub">
            We build custom business dashboards and professional websites — tailored to your exact operations. Real-time sales, inventory, supplier tracking, and employee performance, all in one place so you make smarter decisions every day.
          </p>

          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="btn-primary btn-hero-main" onClick={() => scrollTo('services')}>Explore Our Services ↓</button>
            <button className="btn-outline-white" onClick={() => scrollTo('contact')}>Free Consultation</button>
          </motion.div>

          <motion.div
            className="hero-metrics"
            onViewportEnter={() => setCountersStarted(true)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="hm-item"><strong>{c50}+</strong><span>Projects Delivered</span></div>
            <div className="hm-div" />
            <div className="hm-item"><strong>{c10}+</strong><span>Industries Served</span></div>
            <div className="hm-div" />
            <div className="hm-item"><strong>100%</strong><span>Custom Built</span></div>
          </motion.div>
        </motion.div>

        {/* ── Visual column ── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80"
              alt="Business Analytics"
              className="hero-photo-img"
              loading="lazy"
            />
            <div className="hero-photo-mask" />
          </div>

          <DashboardCard />

          <motion.div
            className="hv-float f1"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>📦</span>
            <div>
              <div className="hf-title">Low Stock Alert</div>
              <div className="hf-sub">Whole Milk — Reorder now</div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <div className="hero-scroll-hint" style={{ position: 'relative', zIndex: 2 }}>
        <span>Scroll to explore</span>
        <div className="scroll-mouse"><div className="scroll-dot" /></div>
      </div>
    </section>
  )
}
