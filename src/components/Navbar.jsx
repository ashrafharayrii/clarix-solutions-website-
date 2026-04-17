import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ClarixLogo from './ClarixLogo'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const links = [
    { label: 'Services',    id: 'services'   },
    { label: 'How It Works', id: 'process'   },
    { label: 'Industries',  id: 'industries' },
    { label: 'About',       id: 'about'      },
  ]

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">

        {/* ── Animated logo ── */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    0,
            display:    'flex',
            alignItems: 'center',
          }}
          aria-label="Go to top"
        >
          <ClarixLogo size="sm" showSubtitle={false} loop={true} />
        </button>

        {/* ── Desktop nav links ── */}
        <ul className="nav-links">
          {links.map((l, i) => (
            <motion.li
              key={l.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            >
              <button
                onClick={() => scrollTo(l.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
              >
                {l.label}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button onClick={() => scrollTo('contact')} className="btn-nav">
              Free Consultation
            </button>
          </motion.li>
        </ul>

        {/* ── Hamburger ── */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{    opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
            <button onClick={() => scrollTo('contact')}>Free Consultation</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
