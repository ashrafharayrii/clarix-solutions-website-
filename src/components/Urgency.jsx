import { motion } from 'framer-motion'
import { TrendingUp, Clock, Eye, CheckCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const POINTS = [
  { Icon: TrendingUp,   text: 'Stop losing revenue from stockouts and over-ordering' },
  { Icon: Clock,        text: 'Stop wasting hours on reports you could have in seconds' },
  { Icon: Eye,          text: 'Stop making decisions based on incomplete information' },
  { Icon: CheckCircle,  text: 'Start running your business with confidence and clarity' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Urgency() {
  return (
    <section id="urgency" style={{ padding:'80px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
        <motion.div
          className="glass-strong"
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.15 }} transition={{ duration:0.6, ease:EASE }}
          style={{
            borderRadius:32, padding:'60px 48px',
            border:'1px solid rgba(59,130,246,0.18)',
            boxShadow:'0 0 80px rgba(59,130,246,0.08)',
            display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:48,
            alignItems:'center', position:'relative', overflow:'hidden',
          }}
        >
          {/* Glow */}
          <div aria-hidden="true" style={{
            position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:300, height:300, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)',
            pointerEvents:'none',
          }}/>

          {/* Left */}
          <div style={{ position:'relative' }}>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:800, color:'#F8FAFC',
                         letterSpacing:'-0.03em', lineHeight:1.2, marginBottom:18 }}>
              Every Day Without a Dashboard<br/>
              <span className="gradient-text">Is Money You're Losing.</span>
            </h2>
            <p style={{ fontSize:15, color:'#64748B', lineHeight:1.75, marginBottom:28 }}>
              Most business owners only find out about problems after it's too late — a stockout, an overcharge, a slow week
              unnoticed. A Clarix dashboard gives you visibility to catch these before they cost you.
            </p>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary magnetic"
              style={{ padding:'13px 28px', borderRadius:16, fontSize:15, fontWeight:700, border:'none' }}
            >
              Fix This Today
            </button>
          </div>

          {/* Right */}
          <div style={{ display:'flex', flexDirection:'column', gap:14, position:'relative' }}>
            {POINTS.map(({ Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, x:24 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.5, delay:i*0.1, ease:EASE }}
                style={{ display:'flex', alignItems:'flex-start', gap:14 }}
              >
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                              background: i===3 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.1)',
                              border: `1px solid ${i===3 ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)'}`,
                              display:'flex', alignItems:'center', justifyContent:'center',
                              color: i===3 ? '#22C55E' : '#F87171' }}>
                  <Icon size={16} />
                </div>
                <div style={{ fontSize:14, color: i===3 ? '#F8FAFC' : '#94A3B8', lineHeight:1.6,
                              paddingTop:8, fontWeight: i===3 ? 600 : 400 }}>{text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
