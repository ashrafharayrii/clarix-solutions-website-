import { motion } from 'framer-motion'
import ClarixLogo from './ClarixLogo'

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="container footer-inner">

        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated logo — plays once when footer scrolls into view, no idle loop */}
          <div style={{ marginBottom: 14 }}>
            <ClarixLogo size="sm" showSubtitle={true} loop={false} />
          </div>
          <p style={{ marginBottom: 6 }}>Smart dashboards and websites for businesses that want to grow with data.</p>
          <p>📍 Amman, Jordan</p>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="fl-col">
            <div className="fl-head">Services</div>
            <button onClick={() => scrollTo('services')}>Dashboard Development</button>
            <button onClick={() => scrollTo('services')}>Website Development</button>
            <button onClick={() => scrollTo('services')}>Bundle Package</button>
          </div>
          <div className="fl-col">
            <div className="fl-head">Company</div>
            <button onClick={() => scrollTo('about')}>About Us</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </div>
          <div className="fl-col">
            <div className="fl-head">Connect</div>
            <button onClick={() => scrollTo('contact')}>Free Consultation</button>
            <a href="mailto:clarix.solutions.jo@gmail.com">clarix.solutions.jo@gmail.com</a>
          </div>
        </motion.div>

      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© 2026 Clarix Solutions — Amman, Jordan. All rights reserved.</span>
          <span>Powered by data analytics</span>
        </div>
      </div>
    </footer>
  )
}
