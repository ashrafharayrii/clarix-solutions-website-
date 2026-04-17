import { motion } from 'framer-motion'

const points = [
  { icon: '💸', text: 'Stop losing revenue from stockouts and over-ordering' },
  { icon: '⏳', text: 'Stop wasting hours on reports you could have in seconds' },
  { icon: '📉', text: 'Stop making decisions based on incomplete information' },
  { icon: '🎯', text: 'Start running your business with confidence and clarity' },
]

export default function Urgency() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="urgency">
      <div className="container">
        <div className="urgency-inner">
          <motion.div
            className="urgency-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Every Day Without a Dashboard<br /><span className="text-blue-l">Is Money You're Losing.</span></h2>
            <p>Most business owners only find out about problems after it's too late — an item ran out, a supplier overcharged, a slow week went unnoticed. A Clarix dashboard gives you visibility to catch these before they cost you.</p>
            <div className="urgency-points">
              {points.map((p, i) => (
                <motion.div
                  key={p.text}
                  className="up-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span>{p.icon}</span> {p.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="urgency-action"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <motion.div
              className="ua-card"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="ua-icon">📞</div>
              <h3>Book a Free Consultation</h3>
              <p>Tell us about your business. We'll show you exactly what your custom dashboard would look like — at no cost.</p>
              <button className="btn-primary full" onClick={() => scrollTo('contact')}>Talk to Us — It's Free →</button>
              <div className="ua-note">No commitment. No technical knowledge needed.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
