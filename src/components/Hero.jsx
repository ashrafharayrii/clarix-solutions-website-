import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'

/* ── Typewriter ─────────────────────────────────────────── */
const WORDS = ['Coffee Houses','Supermarkets','Retail Stores','Restaurants','Jewelry Shops','Pharmacies','Bakeries','Clothing Stores']

function useTypewriter(words) {
  const [text, setText]       = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [del, setDel]         = useState(false)

  useEffect(() => {
    const word  = words[wordIdx]
    let delay   = del ? 55 : 100
    if (!del && charIdx === word.length) delay = 1800
    if (del  && charIdx === 0)           delay = 320
    const t = setTimeout(() => {
      if (!del && charIdx === word.length) { setDel(true); return }
      if (del  && charIdx === 0)           { setDel(false); setWordIdx(i => (i+1) % words.length); return }
      setText(word.slice(0, del ? charIdx - 1 : charIdx + 1))
      setCharIdx(i => del ? i - 1 : i + 1)
    }, delay)
    return () => clearTimeout(t)
  }, [charIdx, del, wordIdx, words])
  return text
}

/* ── Animated counter ───────────────────────────────────── */
function useCounter(target, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick  = (now) => {
      const p     = Math.min((now - start) / 1500, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

/* ── Animated SVG data mesh ─────────────────────────────── */
function DataMesh() {
  return (
    <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {/* Grid */}
      <g opacity="0.12">
        {[100,200,300,400].map(v => (
          <g key={v}>
            <line x1={v} y1="0"   x2={v} y2="500" stroke="#3B82F6" strokeWidth="0.6"/>
            <line x1="0" y1={v}   x2="500" y2={v}  stroke="#3B82F6" strokeWidth="0.6"/>
          </g>
        ))}
      </g>

      {/* Dashed connection lines */}
      {[
        [250,250, 150,150],[250,250, 350,150],[250,250, 400,280],
        [250,250, 340,385],[250,250, 148,370],[250,250, 98,250],
        [150,150, 350,150],[350,150, 400,280],[400,280, 340,385],
        [340,385, 148,370],[148,370,  98,250],[ 98,250, 150,150],
        [250,80,  150,150],[250,80,  350,150],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          className="mesh-line"
          style={{ animationDelay: `${-i * 0.22}s` }}
        />
      ))}

      {/* Secondary faint connections */}
      {[
        [50,180, 150,150],[50,320, 98,250],
        [450,180,400,280],[450,380,340,385],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(96,165,250,0.22)" strokeWidth="1"
          strokeDasharray="4 6"
          style={{ animation: `dash-flow ${3.5 + i * 0.5}s linear infinite`, animationDelay: `${-i * 0.7}s` }}
        />
      ))}

      {/* Centre pulsing node */}
      <circle cx="250" cy="250" r="8" fill="#3B82F6" opacity="0.9">
        <animate attributeName="r"       values="8;13;8"     dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;1;0.9"  dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="250" cy="250" r="22" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.25">
        <animate attributeName="r"       values="22;34;22"   dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite"/>
      </circle>

      {/* Satellite nodes */}
      {[
        [150,150,2.4],[350,150,2.8],[400,280,3.2],
        [340,385,2.6],[148,370,3.6],[ 98,250,3.0],[250,80,2.2],
      ].map(([cx,cy,dur], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#3B82F6">
          <animate attributeName="r"       values="5;8;5"   dur={`${dur}s`} repeatCount="indefinite" begin={`${-i*0.4}s`}/>
          <animate attributeName="opacity" values="0.5;1;0.5" dur={`${dur}s`} repeatCount="indefinite" begin={`${-i*0.4}s`}/>
        </circle>
      ))}

      {/* Outer accent dots */}
      {[[50,180],[50,320],[450,180],[450,380]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#60A5FA" opacity="0.4"/>
      ))}

      {/* Data labels */}
      <text x="358" y="142" fill="#60A5FA" fontSize="10" opacity="0.65" fontFamily="Plus Jakarta Sans,sans-serif">Sales</text>
      <text x="406" y="275" fill="#60A5FA" fontSize="10" opacity="0.65" fontFamily="Plus Jakarta Sans,sans-serif">Revenue</text>
      <text x="346" y="406" fill="#60A5FA" fontSize="10" opacity="0.65" fontFamily="Plus Jakarta Sans,sans-serif">KPIs</text>
      <text x="52"  y="142" fill="#60A5FA" fontSize="10" opacity="0.65" fontFamily="Plus Jakarta Sans,sans-serif">Inventory</text>
      <text x="44"  y="378" fill="#60A5FA" fontSize="10" opacity="0.65" fontFamily="Plus Jakarta Sans,sans-serif">Analytics</text>
    </svg>
  )
}

/* ── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const typed       = useTypewriter(WORDS)
  const [statsOn, setStatsOn] = useState(false)
  const c50 = useCounter(50,  statsOn)
  const c99 = useCounter(99,  statsOn)

  /* cursor parallax */
  const sectionRef  = useRef(null)
  const rawX        = useMotionValue(0)
  const rawY        = useMotionValue(0)
  const springX     = useSpring(useTransform(rawX, [-1,1], [-22,22]), { stiffness:80, damping:22 })
  const springY     = useSpring(useTransform(rawY, [-1,1], [-22,22]), { stiffness:80, damping:22 })

  const handleMouse = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width  * 2 - 1)
    rawY.set((e.clientY - rect.top)  / rect.height * 2 - 1)
  }
  const handleLeave = () => { rawX.set(0); rawY.set(0) }

  /* magnetic buttons */
  useEffect(() => {
    const btns = document.querySelectorAll('.magnetic')
    btns.forEach(btn => {
      const move  = (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.28
        const y = (e.clientY - r.top  - r.height / 2) * 0.28
        btn.style.transform = `translate(${x}px,${y}px)`
      }
      const leave = () => { btn.style.transform = 'translate(0,0)' }
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      return () => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave) }
    })
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
               paddingTop: 100, paddingBottom: 80, overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div aria-hidden="true">
        <div className="orb" style={{ top: '-120px', left: '-80px',  width: 380, height: 380,
          background: 'radial-gradient(circle,rgba(59,130,246,0.28),transparent 70%)' }}/>
        <div className="orb" style={{ top: '40%',  right: '-100px', width: 300, height: 300,
          background: 'radial-gradient(circle,rgba(79,70,229,0.2),transparent 70%)',
          animationDelay: '-2.5s' }}/>
        <div className="orb" style={{ bottom: 0, left: '30%', width: 240, height: 240,
          background: 'radial-gradient(circle,rgba(59,130,246,0.12),transparent 70%)',
          animationDelay: '-4s' }}/>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
                      gap: 64, alignItems: 'center' }}>

          {/* ── Text column ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1,  scale: 1     }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="sec-badge">
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#3B82F6',
                               animation:'pulse-orb 2s ease-in-out infinite' }}/>
                Trusted by 50+ businesses · Amman, Jordan
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 800,
                       lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}
            >
              <span style={{ color: '#F8FAFC' }}>Transform Data</span><br/>
              <span className="gradient-text">Into Decisions</span><br/>
              <span style={{ color: '#F8FAFC' }}>That Win.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ fontSize: 18, color: '#64748B', marginBottom: 16 }}
            >
              Built for{' '}
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>{typed}</span>
              <span style={{ color:'#3B82F6', fontWeight:400, animation:'pulse-orb 1s steps(1) infinite' }}>|</span>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7,
                       maxWidth: 520, marginBottom: 36 }}
            >
              We craft intelligent dashboards and premium websites that don't just look extraordinary —
              they drive measurable growth for your business.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 44 }}
            >
              <button
                onClick={() => { const el=document.getElementById('services'); el?.scrollIntoView({behavior:'smooth',block:'start'}) }}
                className="btn-primary magnetic"
                style={{ padding: '14px 28px', borderRadius: 18, fontSize: 15, fontWeight: 700, border: 'none' }}
              >
                Explore Services
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { const el=document.getElementById('contact'); el?.scrollIntoView({behavior:'smooth',block:'start'}) }}
                className="btn-outline magnetic"
                style={{ padding: '14px 28px', borderRadius: 18, fontSize: 15, fontWeight: 600, border:'1px solid rgba(255,255,255,0.14)' }}
              >
                Free Consultation
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1,  y:  0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              onViewportEnter={() => setStatsOn(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 28 }}
            >
              {[
                { val: `${c50}+`, label: 'Projects Delivered' },
                { val: `${c99}%`, label: 'Client Satisfaction' },
                { val: '100%',    label: 'Custom Built' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {i > 0 && <div style={{ width:1, height:36, background:'#1E293B' }}/>}
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', letterSpacing:'-0.03em' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Visual column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1,  x:  0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            style={{ position: 'relative', height: 520, display: 'flex',
                     alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Centre radial glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            }}>
              <div style={{
                width: 340, height: 340, borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(59,130,246,0.22) 0%,transparent 70%)',
                filter: 'blur(40px)',
              }}/>
            </div>

            {/* Parallax mesh layer */}
            <motion.div
              style={{ x: springX, y: springY, position: 'absolute',
                       inset: 0, display:'flex', alignItems:'center', justifyContent:'center' }}
            >
              <div style={{ width: '90%', height: '90%', maxWidth: 440 }}>
                <DataMesh />
              </div>
            </motion.div>

            {/* Floating metric card — top right */}
            <motion.div
              className="metric-float glass"
              style={{
                position: 'absolute', top: 48, right: 0,
                padding: '14px 18px', borderRadius: 18, minWidth: 160,
              }}
            >
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.03em' }}>
                $284,500
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <TrendingUp size={12} color="#22C55E" />
                <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>+18.4% this month</span>
              </div>
            </motion.div>

            {/* Floating metric card — bottom left */}
            <motion.div
              className="metric-float glass"
              style={{
                position: 'absolute', bottom: 80, left: 0,
                padding: '14px 18px', borderRadius: 18, minWidth: 155,
              }}
            >
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Inventory Level</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.03em' }}>
                94.2%
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <TrendingDown size={12} color="#F59E0B" />
                <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>Reorder 3 items</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
                 display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontSize: 10, color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 40,
          background: 'linear-gradient(to bottom,rgba(59,130,246,0.5),transparent)' }}/>
      </motion.div>
    </section>
  )
}
