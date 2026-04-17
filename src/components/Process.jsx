import { motion } from 'framer-motion'
import { Phone, Pencil, Code2, Rocket } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const STEPS = [
  { num:'01', Icon:Phone,  title:'Free Consultation',
    desc:'We listen to your business, understand your pain points, and map out exactly what you need — at no cost.' },
  { num:'02', Icon:Pencil, title:'Custom Design',
    desc:'We design a solution built specifically around your operations — not a template, not generic.' },
  { num:'03', Icon:Code2,  title:'Build & Test',
    desc:'We build and test everything using real data from your own business before you ever see it.' },
  { num:'04', Icon:Rocket, title:'Go Live & Grow',
    desc:'Full access, full training, and ongoing support — then watch your business run smarter every day.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding:'80px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.15 }} transition={{ duration:0.55, ease:EASE }}
          style={{ textAlign:'center', marginBottom:64 }}
        >
          <span className="sec-badge">How It Works</span>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:14 }}>
            From First Call to <span className="gradient-text">Live in Days</span>
          </h2>
          <p style={{ fontSize:17, color:'#64748B', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            A clear 4-step process — from understanding your business to a running system.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20 }}>
          {STEPS.map(({ num, Icon, title, desc }, i) => (
            <motion.div
              key={num}
              className="glass"
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }}
              transition={{ duration:0.55, delay:i*0.1, ease:EASE }}
              style={{ padding:'28px 24px', borderRadius:24, position:'relative' }}
            >
              {/* Step number */}
              <div style={{ fontSize:48, fontWeight:800, color:'rgba(59,130,246,0.1)',
                            lineHeight:1, letterSpacing:'-0.05em', marginBottom:12,
                            position:'absolute', top:16, right:20 }}>
                {num}
              </div>
              <div style={{
                width:44, height:44, borderRadius:14,
                background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.22)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:16, color:'#93C5FD',
              }}>
                <Icon size={20} />
              </div>
              <div style={{ fontWeight:700, fontSize:16, color:'#F8FAFC', marginBottom:8, letterSpacing:'-0.02em' }}>
                {title}
              </div>
              <div style={{ fontSize:13, color:'#64748B', lineHeight:1.65 }}>{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
