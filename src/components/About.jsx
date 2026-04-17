import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const VALUES = [
  {
    icon: '📊',
    title: 'Data-Driven',
    desc: 'Every solution is built on real business metrics — not guesswork.',
    rgb: '43, 104, 233',
  },
  {
    icon: '🎯',
    title: 'Custom-Built',
    desc: 'No templates. Each system is crafted around your exact operations.',
    rgb: '16, 185, 129',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partner',
    desc: "We don't disappear after delivery — we stay and grow with you.",
    rgb: '139, 92, 246',
  },
]

const PARAS = [
  'We are Clarix Solutions, a data and web development company based in Amman, Jordan. We specialize in custom business dashboards and professional websites that help owners understand their numbers, manage operations, and make smarter decisions every single day.',
  'Our team combines expertise in data analytics, software development, and business operations. We have worked with coffee houses, supermarkets, retail stores, jewelry shops, and many other businesses across Jordan — each with unique needs, and each getting a system built specifically for them.',
  'We believe every business, no matter its size, deserves access to the same powerful tools large companies use — at an affordable price, with a solution that fits exactly how you work.',
]

export default function About() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="about">
      <div className="about-bg-accent" />
      <div className="container">

        {/* ── Section header ── */}
        <div className="about-top">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sec-label">About Us</div>
            <h2>The Team Behind <span className="text-blue">Your Success</span></h2>
          </motion.div>
        </div>

        {/* ── Two-column body ── */}
        <div className="about-layout">

          {/* LEFT — values card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="about-values-card">
              <div className="avc-eyebrow">What makes us different</div>

              <div className="avc-list">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="avc-item"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    <div
                      className="avc-icon"
                      style={{
                        background: `rgba(${v.rgb}, 0.12)`,
                        border:     `1px solid rgba(${v.rgb}, 0.28)`,
                      }}
                    >
                      {v.icon}
                    </div>
                    <div className="avc-text">
                      <strong>{v.title}</strong>
                      <p>{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="avc-footer">
                <span>📍</span>
                <span>Based in Amman, Jordan</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — narrative text */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            <motion.div
              className="about-quote-bar"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              "We don't sell software. We solve business problems."
            </motion.div>

            <div className="about-paras">
              {PARAS.map((text, i) => (
                <motion.p
                  key={i}
                  className="about-para"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.13, ease: EASE }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
            >
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Partner With Us
              </button>
            </motion.div>
          </motion.div>

        </div>

        {/* ── Stats bar ── */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { val: '50+',  label: 'Projects Delivered' },
            { val: '10+',  label: 'Industries Served'  },
            { val: '100%', label: 'Custom Built'        },
            { val: '24h',  label: 'Response Time'       },
          ].map((s, i) => (
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
