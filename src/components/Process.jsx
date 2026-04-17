import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { num: '01', label: 'Free Consultation', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80', desc: 'We listen to your business, understand your pain points, and map out exactly what you need — at no cost.' },
  { num: '02', label: 'Custom Design', img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=500&q=80', desc: 'We design a solution built specifically around your operations — not a template, not generic.' },
  { num: '03', label: 'Build & Test', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80', desc: 'Our team builds and tests everything using real data from your own business before you see it.' },
  { num: '04', label: 'Go Live & Grow', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80', desc: 'You get full access, full training, and ongoing support — then watch your business run smarter.' },
]

export default function Process() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 })

  return (
    <section id="process">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sec-label">How It Works</div>
          <h2>From First Call to <span className="text-blue">Live in Days</span></h2>
          <p className="sec-sub">A clear 4-step process — from understanding your business to a running system.</p>
        </motion.div>

        {/* Timeline line */}
        <div ref={lineRef} style={{ position: 'relative', marginBottom: 8 }}>
          <motion.div
            className="process-timeline-line"
            initial={{ scaleX: 0, originX: 0 }}
            animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ transformOrigin: 'left center' }}
          />
        </div>

        <div className="process-steps">
          {steps.map((step, i) => (
            <>
              <motion.div
                key={step.num}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="ps-photo-wrap">
                  <img src={step.img} alt={step.label} className="ps-photo" loading="lazy" />
                  <div className="ps-photo-overlay" />
                  <div className="ps-step-num ps-step-num-glow">{step.num}</div>
                  <div className="ps-step-label">{step.label}</div>
                </div>
                <div className="ps-content">
                  <h4>{step.label}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  key={`arrow-${i}`}
                  className="process-connector"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                >
                  <div className="pc-arrow">→</div>
                </motion.div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
