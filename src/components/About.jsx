import { motion } from 'framer-motion'
import { BarChart2, Wrench, Heart } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const VALUES = [
  { Icon: BarChart2, title: 'Data-Driven',       desc: 'Every solution is built on real business metrics — not guesswork.', color:'#3B82F6', bg:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.2)' },
  { Icon: Wrench,    title: 'Custom-Built',       desc: 'No templates. Each system is crafted around your exact operations.', color:'#10B981', bg:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.2)' },
  { Icon: Heart,     title: 'Long-Term Partner',  desc: "We don't disappear after delivery — we stay and grow with you.",     color:'#8B5CF6', bg:'rgba(139,92,246,0.1)', border:'rgba(139,92,246,0.2)' },
]

export default function About() {
  return (
    <section id="about" style={{ padding:'80px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:64, alignItems:'start' }}>

          {/* Left: headline + body */}
          <motion.div
            initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.7, ease:EASE }}
          >
            <span className="sec-badge">About Us</span>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:800, letterSpacing:'-0.03em',
                         lineHeight:1.15, marginBottom:20, color:'#F8FAFC' }}>
              Data Intelligence<br/>For Every <span className="gradient-text">Business Size</span>
            </h2>
            <p style={{ fontSize:15, color:'#64748B', lineHeight:1.75, marginBottom:18 }}>
              We are Clarix Solutions, a data and web development company based in Amman, Jordan. We specialize
              in custom business dashboards and professional websites that help owners understand their numbers,
              manage operations, and make smarter decisions every day.
            </p>
            <p style={{ fontSize:15, color:'#64748B', lineHeight:1.75, marginBottom:18 }}>
              We have worked with coffee houses, supermarkets, retail stores, jewelry shops, and many other
              businesses across Jordan — each with unique needs, each getting a system built specifically for them.
            </p>
            <p style={{ fontSize:15, color:'#64748B', lineHeight:1.75 }}>
              We believe every business, no matter its size, deserves access to the same powerful tools large
              companies use — at an affordable price, with a solution that fits exactly how you work.
            </p>
          </motion.div>

          {/* Right: value cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {VALUES.map(({ Icon, title, desc, color, bg, border }, i) => (
              <motion.div
                key={title}
                className="glass"
                initial={{ opacity:0, x:32 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.6, delay:i*0.1, ease:EASE }}
                style={{ padding:'22px 24px', borderRadius:20, display:'flex', gap:18, alignItems:'flex-start' }}
              >
                <div style={{ width:44, height:44, borderRadius:14, background:bg, border:`1px solid ${border}`,
                              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:'#F8FAFC', marginBottom:6 }}>{title}</div>
                  <div style={{ fontSize:13, color:'#64748B', lineHeight:1.65 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
