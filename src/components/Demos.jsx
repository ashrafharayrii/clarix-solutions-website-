import { motion } from 'framer-motion'
import { ArrowRight, Activity } from 'lucide-react'
import { useTheme } from '../App'

const industries = [
  {
    name: 'Artisan Bakeries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop',
    metric: 'Waste -18%',
    gradientFrom: 'rgba(234,88,12,0.75)',
    demo: '/clarix-solutions-website-/bakeries/index.html',
  },
  {
    name: 'Luxury Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop',
    metric: 'Inventory 100%',
    gradientFrom: 'rgba(202,138,4,0.75)',
    demo: '/clarix-solutions-website-/jewllery/index.html',
  },
  {
    name: 'Coffee Houses',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop',
    metric: 'ROI +24%',
    gradientFrom: 'rgba(180,83,9,0.75)',
    demo: '/clarix-solutions-website-/coffee house/index.html',
  },
  {
    name: 'Premium Supermarkets',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2000&auto=format&fit=crop',
    metric: 'Revenue +31%',
    gradientFrom: 'rgba(22,163,74,0.75)',
    demo: '/clarix-solutions-website-/supermarket/index.html',
  },
  {
    name: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop',
    metric: '5-Star Analytics',
    gradientFrom: 'rgba(220,38,38,0.75)',
    demo: '/clarix-solutions-website-/resorant/index.html',
  },
  {
    name: 'Retail Boutiques',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
    metric: 'Conversion +45%',
    gradientFrom: 'rgba(219,39,119,0.75)',
    demo: '/clarix-solutions-website-/retail/index.html',
  },
]

function DemoCard({ industry, index }) {
  return (
    <motion.a
      href={industry.demo}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        borderRadius: '2.5rem',
        overflow: 'hidden',
        display: 'block',
        cursor: 'pointer',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        textDecoration: 'none',
        flexShrink: 0,
        height: 460,
      }}
      className="demo-card-item snap-center"
    >
      {/* Background image */}
      <img
        src={industry.image}
        alt={industry.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 1s ease',
        }}
        className="demo-card-img"
        loading="lazy"
      />

      {/* Colour gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${industry.gradientFrom}, transparent 55%)`,
          opacity: 0.65,
        }}
      />

      {/* Dark bottom gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)',
        }}
      />

      {/* Glassmorphism metric badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '6px 14px',
          borderRadius: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <Activity size={10} color="#7AAEFF" />
        <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {industry.metric}
        </span>
      </motion.div>

      {/* Card content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 36px',
        }}
      >
        <h4 style={{ color: '#fff', fontSize: 'clamp(1.25rem, 2vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
          {industry.name}
        </h4>
        <p
          className="demo-card-cta"
          style={{
            color: '#7AAEFF',
            fontWeight: 900,
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s',
          }}
        >
          Open Demo
          <ArrowRight size={14} style={{ transition: 'transform 0.2s' }} className="demo-card-arrow" />
        </p>
      </div>
    </motion.a>
  )
}

export default function Demos() {
  const { isDarkMode } = useTheme()

  return (
    <section
      id="demos"
      style={{
        padding: '96px 0',
        overflow: 'hidden',
        background: isDarkMode ? '#0a0a0a' : '#f8fafc',
        borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 52, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}
        >
          <div>
            <div className="sec-label">Live Demos</div>
            <h2 style={{ marginBottom: 0, color: isDarkMode ? '#F5F5F7' : '#0F172A' }}>
              Sector <span style={{ color: '#2B68E9' }}>Deployment.</span>
            </h2>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 0 }}>
            Click a card to open demo
          </p>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div
          className="no-scrollbar demos-scroll-grid"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 20,
            paddingBottom: 24,
            scrollSnapType: 'x mandatory',
          }}
        >
          {industries.map((industry, index) => (
            <DemoCard key={industry.name} industry={industry} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 20 }}>
            Don't see your industry? We customize solutions for any business type.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.84rem' }}
          >
            Request Custom Demo
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
