import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Dashboards', id: 'services'   },
  { label: 'Web Dev',    id: 'webdev'     },
  { label: 'Industries', id: 'industries' },
  { label: 'About',      id: 'about'      },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Navbar() {
  const [solid,    setSolid]    = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1,  y:  0  }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position:   'fixed',
        top:        16,
        left:       16,
        right:      16,
        zIndex:     50,
        maxWidth:   '1280px',
        margin:     '0 auto',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      'calc(100% - 32px)',
      }}
    >
      <div
        className="glass"
        style={{
          borderRadius:    20,
          padding:         '10px 20px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          background:      solid
            ? 'rgba(10,15,30,0.95)'
            : 'rgba(15,23,42,0.82)',
          transition:      'background 0.3s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Go to top"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                   display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <div
            className="glow-accent"
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'linear-gradient(135deg,#3B82F6,#2563EB)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Activity size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
            Clarix
          </span>
          <span style={{ fontWeight: 300, fontSize: 17, color: '#60A5FA', letterSpacing: '-0.02em' }}>
            Solutions
          </span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none',
                     padding: 0, margin: 0 }} className="hidden md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer',
                         color: '#94A3B8', fontSize: 14, fontWeight: 500,
                         transition: 'color 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => e.target.style.color = '#F8FAFC'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary magnetic"
              style={{ padding: '8px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                       border: 'none' }}
            >
              Free Consultation
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer',
                   color: '#94A3B8', padding: 4 }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1,  y:  0, scale: 1    }}
            exit={{    opacity: 0,  y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{
              borderRadius: 16,
              marginTop:    8,
              padding:      16,
              display:      'flex',
              flexDirection:'column',
              gap:          4,
            }}
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { scrollTo(l.id); setMenuOpen(false) }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#CBD5E1', fontSize: 15, fontWeight: 500,
                  textAlign: 'left', padding: '10px 14px', borderRadius: 12,
                  fontFamily: 'inherit',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background='rgba(59,130,246,0.08)'; e.target.style.color='#F8FAFC' }}
                onMouseLeave={e => { e.target.style.background='none'; e.target.style.color='#CBD5E1' }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo('contact'); setMenuOpen(false) }}
              className="btn-primary"
              style={{ padding: '10px 14px', borderRadius: 12, fontSize: 14,
                       fontWeight: 600, border: 'none', marginTop: 8, justifyContent: 'center' }}
            >
              Free Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
