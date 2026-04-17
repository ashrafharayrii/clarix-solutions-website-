import { useState } from 'react'
import { motion } from 'framer-motion'

function Counter({ target, suffix = '', triggered }) {
  const [val, setVal] = useState(0)
  if (triggered && val === 0) {
    const duration = 1600
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }
  return <>{val}{suffix}</>
}

export default function Results() {
  const [triggered, setTriggered] = useState(false)

  return (
    <section id="results">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sec-label light">Our Impact</div>
          <h2 className="white-h">Numbers That Speak <span className="text-blue-l">For Themselves</span></h2>
          <p className="sec-sub" style={{ color: 'rgba(255,255,255,0.5)' }}>Measured results from real businesses we've built custom systems for across Jordan.</p>
        </motion.div>

        <div className="results-grid">
          {[
            { icon: '☕', sector: 'Coffee Houses & Cafés', num: 32, title: 'Average Revenue Increase', chips: [{ v: '5h', l: 'Saved / week' }, { v: '-24%', l: 'Waste reduced' }] },
            { icon: '🏪', sector: 'Supermarkets & Retail', num: 18, title: 'Average Profit Growth', chips: [{ v: '0', l: 'Stockout events' }, { v: '3x', l: 'Faster reporting' }], feature: true },
            { icon: '💍', sector: 'Jewelry Shops', num: 35, title: 'Average Sales Growth', chips: [{ v: '100%', l: 'Inventory accuracy' }, { v: '-40%', l: 'Untracked losses' }] },
          ].map((card, i) => (
            <motion.div
              key={card.sector}
              className={`result-card${card.feature ? ' result-card-feature' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onViewportEnter={() => setTriggered(true)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {card.feature && <div className="rc-badge">Most Common Result</div>}
              <div className="rc-emoji">{card.icon}</div>
              <div className="rc-sector">{card.sector}</div>
              <div className="rc-big"><Counter target={card.num} suffix="%" triggered={triggered} /></div>
              <div className="rc-title">{card.title}</div>
              <div className="rc-chips">
                {card.chips.map(c => (
                  <div className="rc-chip" key={c.l}><strong>{c.v}</strong><span>{c.l}</span></div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="results-totals"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="rt-item"><strong><Counter target={50} suffix="+" triggered={triggered} /></strong><span>Projects Delivered</span></div>
          <div className="rt-div" />
          <div className="rt-item"><strong><Counter target={10} suffix="+" triggered={triggered} /></strong><span>Industries Served</span></div>
          <div className="rt-div" />
          <div className="rt-item"><strong>100%</strong><span>Custom Built</span></div>
          <div className="rt-div" />
          <div className="rt-item"><strong>24h</strong><span>Response Time</span></div>
        </motion.div>
      </div>
    </section>
  )
}
