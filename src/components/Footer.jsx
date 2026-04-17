import { motion } from 'framer-motion'
import { Activity, Mail, MapPin } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

const NAV_COLS = [
  { head: 'Services', links: [
    { label: 'Dashboard Development', id: 'services' },
    { label: 'Website Development',   id: 'webdev'   },
    { label: 'Bundle Package',         id: 'contact'  },
  ]},
  { head: 'Company', links: [
    { label: 'About Us',    id: 'about'      },
    { label: 'How It Works',id: 'process'    },
    { label: 'Industries',  id: 'industries' },
  ]},
  { head: 'Contact', links: [
    { label: 'Free Consultation', id: 'contact' },
  ]},
]

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:56, paddingBottom:32 }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:48 }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, ease:EASE }}
          >
            <button onClick={() => scrollTo('hero')}
              style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                       display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
              <div style={{ width:34, height:34, borderRadius:10,
                            background:'linear-gradient(135deg,#3B82F6,#2563EB)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            boxShadow:'0 0 20px rgba(59,130,246,0.35)' }}>
                <Activity size={17} color="#fff" strokeWidth={2.5}/>
              </div>
              <span style={{ fontWeight:700, fontSize:17, color:'#F8FAFC', letterSpacing:'-0.02em' }}>
                Clarix <span style={{ fontWeight:300, color:'#60A5FA' }}>Solutions</span>
              </span>
            </button>
            <p style={{ fontSize:14, color:'#475569', lineHeight:1.7, maxWidth:280, marginBottom:16 }}>
              Smart dashboards and websites for businesses that want to grow with data.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:8, color:'#475569', fontSize:13 }}>
              <MapPin size={14} color="#3B82F6"/>
              Amman, Jordan
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map((col, i) => (
            <motion.div key={col.head}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.08*(i+1), ease:EASE }}
            >
              <div style={{ fontSize:12, fontWeight:700, color:'#334155', letterSpacing:'0.08em',
                            textTransform:'uppercase', marginBottom:16 }}>{col.head}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map(l => (
                  <button key={l.label} onClick={() => scrollTo(l.id)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                             textAlign:'left', fontSize:14, color:'#475569', fontFamily:'inherit',
                             transition:'color 0.2s' }}
                    onMouseEnter={e=>e.target.style.color='#93C5FD'}
                    onMouseLeave={e=>e.target.style.color='#475569'}
                  >{l.label}</button>
                ))}
                {col.head === 'Contact' && (
                  <a href="mailto:clarix.solutions.jo@gmail.com"
                    style={{ fontSize:14, color:'#475569', textDecoration:'none', transition:'color 0.2s',
                             display:'flex', alignItems:'center', gap:6 }}
                    onMouseEnter={e=>e.currentTarget.style.color='#93C5FD'}
                    onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                    <Mail size={13}/>
                    clarix.solutions.jo@gmail.com
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:24,
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:13, color:'#334155' }}>
            © 2026 Clarix Solutions — Amman, Jordan. All rights reserved.
          </span>
          <span style={{ fontSize:13, color:'#1E293B' }}>
            Powered by data analytics
          </span>
        </div>
      </div>
    </footer>
  )
}
