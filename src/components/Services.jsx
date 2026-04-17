import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ── 3D tilt wrapper ─────────────────────────────────────── */
function TiltCard({ children, className, custom }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [hovered, setHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 44 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: custom * 0.15, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ rotateX: -y * 9, rotateY: x * 11 })
  }

  const onMouseLeave = () => { setTilt({ rotateX: 0, rotateY: 0 }); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, scale: hovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d', position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Photo header ────────────────────────────────────────── */
function ServiceHeader({ src, alt, index, badge }) {
  return (
    <div className="svc-header">
      <motion.img
        src={src}
        alt={alt}
        className="svc-header-img"
        loading="lazy"
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="svc-header-overlay" />

      {/* top-right: "Best Value" badge if present */}
      {badge && (
        <div className="svc-header-top">
          <div className="bundle-tag">{badge}</div>
        </div>
      )}

      {/* bottom-left: service number */}
      <div className="svc-header-bottom">
        <span className="svc-header-num">0{index + 1}</span>
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────── */
export default function Services() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sec-label">Our Services</div>
          <h2>Three Solutions. <span className="text-blue">One Goal.</span></h2>
          <p className="sec-sub">Everything your business needs — a live dashboard to run operations, a professional website to attract customers, or both.</p>
        </motion.div>

        <div className="services-grid">

          {/* ── Dashboard ── */}
          <TiltCard className="svc-card" custom={0}>
            <ServiceHeader
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80"
              alt="Dashboard Analytics"
              index={0}
            />
            <div className="svc-body">
              <h3>Dashboard Development</h3>
              <p className="svc-desc">A real-time management dashboard built for your business — track inventory, sales, suppliers, and employees all from one screen.</p>
              <ul className="svc-list">
                <li><div className="sli-icon">📦</div><div><strong>Inventory Tracking</strong> — live stock levels & auto reorder alerts</div></li>
                <li><div className="sli-icon">💰</div><div><strong>Sales & Profit Monitoring</strong> — daily, weekly, monthly performance</div></li>
                <li><div className="sli-icon">🚚</div><div><strong>Supplier Management</strong> — track orders, costs & reliability</div></li>
                <li><div className="sli-icon">👥</div><div><strong>Customer Behavior Analytics</strong> — purchase patterns & lifetime value</div></li>
                <li><div className="sli-icon">📌</div><div><strong>Employee Performance KPIs</strong> — efficiency metrics & contribution tracking</div></li>
              </ul>
              <div className="svc-works-for"><span>Perfect for:</span> Coffee Houses · Supermarkets · Restaurants · Retail · Jewelry · Clothing</div>
              <button className="btn-primary" onClick={() => scrollTo('contact')}>Request Dashboard</button>
            </div>
          </TiltCard>

          {/* ── Website ── */}
          <TiltCard className="svc-card" custom={1}>
            <ServiceHeader
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80"
              alt="Website Development"
              index={1}
            />
            <div className="svc-body">
              <h3>Website Development</h3>
              <p className="svc-desc">A fast, modern website that puts your business online professionally — custom built to match your brand and attract new customers.</p>
              <ul className="svc-list">
                <li><div className="sli-icon">🎨</div><div><strong>Custom Design</strong> — unique to your brand, no generic templates</div></li>
                <li><div className="sli-icon">📱</div><div><strong>Mobile-First</strong> — flawless on every device, screen size and browser</div></li>
                <li><div className="sli-icon">🛍️</div><div><strong>Product & Service Showcase</strong> — menu, catalog, or services presented clearly</div></li>
                <li><div className="sli-icon">🔍</div><div><strong>SEO Optimized</strong> — help local customers find you on Google</div></li>
                <li><div className="sli-icon">⚡</div><div><strong>Fast & Secure</strong> — optimized speed and HTTPS security</div></li>
              </ul>
              <div className="svc-works-for"><span>Perfect for:</span> All business types — any size, any industry</div>
              <button className="btn-primary" onClick={() => scrollTo('contact')}>Request Website</button>
            </div>
          </TiltCard>

          {/* ── Bundle ── */}
          <TiltCard className="svc-card bundle-card" custom={2}>
            <ServiceHeader
              src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=700&q=80"
              alt="Website and Dashboard Bundle"
              index={2}
              badge="Best Value"
            />
            <div className="svc-body">
              <h3>Website + Dashboard <span className="text-blue">Bundle</span></h3>
              <p className="svc-desc">The complete package — attract customers online with a professional website AND manage your entire operations with a live dashboard.</p>
              <ul className="svc-list">
                <li><div className="sli-icon">✅</div><div><strong>Everything in Dashboard + Website</strong> — full feature set included</div></li>
                <li><div className="sli-icon">🔗</div><div><strong>Seamless Integration</strong> — website and dashboard work as one system</div></li>
                <li><div className="sli-icon">💰</div><div><strong>20% Savings</strong> — better value than purchasing separately</div></li>
                <li><div className="sli-icon">🎯</div><div><strong>One Partner</strong> — online presence + internal operations, handled together</div></li>
                <li><div className="sli-icon">⭐</div><div><strong>Priority Support</strong> — 2 months of expedited assistance</div></li>
              </ul>
              <div className="svc-works-for"><span>Perfect for:</span> Growing businesses ready to scale online AND operationally</div>
              <button className="btn-primary btn-bundle" onClick={() => scrollTo('contact')}>Get the Bundle →</button>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  )
}
