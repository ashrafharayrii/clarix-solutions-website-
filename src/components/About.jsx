import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const highlights = [
  { icon: '📍', text: 'Based in Amman, Jordan' },
  { icon: '🔧', text: 'Custom-built systems for each business' },
  { icon: '📊', text: 'Focus on real, measurable business value' },
  { icon: '🤝', text: 'Ongoing support & long-term partnership' },
  { icon: '⚡', text: '50+ projects delivered across 10+ industries' },
  { icon: '⏱️', text: 'Response within 24 hours' },
]

const STATS = [
  { val: '50+',  label: 'Projects Delivered' },
  { val: '10+',  label: 'Industries Served'  },
  { val: '100%', label: 'Custom Built'        },
  { val: '24h',  label: 'Response Time'       },
]

export default function About() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="about">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sec-label">About Us</div>
          <h2>The Team Behind <span className="text-blue">Your Success</span></h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="about-new-layout">

          {/* LEFT — image */}
          <motion.div
            className="about-new-img-wrap"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
              alt="Clarix Solutions team at work"
              className="about-new-img"
              loading="lazy"
            />
            <div className="about-new-img-overlay" />
            <div className="about-new-quote">
              "We don't sell software.<br />We solve business problems."
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            className="about-new-content"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            <div className="about-new-paras">
              <p>We are <strong>Clarix Solutions</strong>, a data and web development company based in Amman, Jordan. We specialize in custom business dashboards and professional websites that help owners understand their numbers, manage operations, and make smarter decisions every single day.</p>
              <p>Our team combines expertise in data analytics, software development, and business operations. We have worked with coffee houses, supermarkets, retail stores, jewelry shops, and many other businesses across Jordan — each getting a system built specifically for them.</p>
              <p>We believe every business, no matter its size, deserves access to the same powerful tools large companies use — at an affordable price, with a solution that fits exactly how you work.</p>
            </div>

            <ul className="about-new-highlights">
              {highlights.map((h, i) => (
                <motion.li
                  key={h.text}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                >
                  <span className="about-check-icon">{h.icon}</span>
                  <span>{h.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            >
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Partner With Us
              </button>
            </motion.div>
          </motion.div>

        </div>

        {/* Stats bar */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="as-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
            >
              <strong>{s.val}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
