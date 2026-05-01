import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Package, TrendingUp, Truck, Users, BarChart2, Palette, Smartphone, ShoppingBag, Search, Zap, Link2, Tag, Headphones, Star } from 'lucide-react'

function TiltCard({ children, className, custom }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const x = (e.clientX - cx) / (rect.width  / 2) * 7
    const y = (e.clientY - cy) / (rect.height / 2) * 7
    card.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px)`
    card.style.boxShadow = className?.includes('bundle-card')
      ? '0 24px 60px rgba(43,104,233,0.4), 0 0 0 1px rgba(43,104,233,0.35)'
      : '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(43,104,233,0.18)'
  }

  const handleMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transform = 'rotateX(0) rotateY(0) translateY(0)'
    card.style.boxShadow = ''
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: custom * 0.14, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
    >
      {children}
    </motion.div>
  )
}

function ServiceHeader({ src, alt, index, badge }) {
  return (
    <div className="svc-header">
      <motion.img
        src={src} alt={alt} className="svc-header-img" loading="lazy"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="svc-header-overlay" />
      {badge && (
        <div className="svc-header-top">
          <div className="bundle-tag">{badge}</div>
        </div>
      )}
      <div className="svc-header-bottom">
        <span className="svc-header-num">0{index + 1}</span>
      </div>
    </div>
  )
}

const SERVICES = [
  {
    title: 'Dashboard Development',
    desc: 'A real-time management dashboard built for your business — track inventory, sales, suppliers, and employees all from one screen.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    alt: 'Dashboard Analytics',
    features: [
      { icon: Package,    text: 'Inventory Tracking — live stock levels & auto reorder alerts' },
      { icon: TrendingUp, text: 'Sales & Profit Monitoring — daily, weekly, monthly performance' },
      { icon: Truck,      text: 'Supplier Management — track orders, costs & reliability' },
      { icon: Users,      text: 'Customer Behavior Analytics — purchase patterns & lifetime value' },
      { icon: BarChart2,  text: 'Employee Performance KPIs — efficiency metrics & contribution tracking' },
    ],
    for: 'Coffee Houses · Supermarkets · Restaurants · Retail · Jewelry · Clothing',
    cta: 'Request Dashboard',
    bundle: false,
    badge: null,
  },
  {
    title: 'Website Development',
    desc: 'A fast, modern website that puts your business online professionally — custom built to match your brand and attract new customers.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80',
    alt: 'Website Development',
    features: [
      { icon: Palette,     text: 'Custom Design — unique to your brand, no generic templates' },
      { icon: Smartphone,  text: 'Mobile-First — flawless on every device and screen size' },
      { icon: ShoppingBag, text: 'Product & Service Showcase — menu, catalog, or services presented clearly' },
      { icon: Search,      text: 'SEO Optimized — help local customers find you on Google' },
      { icon: Zap,         text: 'Fast & Secure — optimized speed and HTTPS security' },
    ],
    for: 'All business types — any size, any industry',
    cta: 'Request Website',
    bundle: false,
    badge: null,
  },
  {
    title: 'Website + Dashboard Bundle',
    desc: 'The complete package — attract customers online with a professional website AND manage your entire operations with a live dashboard.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    alt: 'Website and dashboard analytics on screen',
    features: [
      { icon: CheckCircle, text: 'Everything in Dashboard + Website — full feature set included' },
      { icon: Link2,       text: 'Seamless Integration — website and dashboard work as one system' },
      { icon: Tag,         text: '20% Savings — better value than purchasing separately' },
      { icon: Headphones,  text: 'Priority Support — 2 months of expedited assistance included' },
      { icon: Star,        text: 'One Partner — online presence + internal operations, handled together' },
    ],
    for: 'Growing businesses ready to scale online AND operationally',
    cta: 'Get the Bundle →',
    bundle: true,
    badge: 'Best Value',
  },
]

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
          style={{ textAlign: 'center' }}
        >
          <div className="sec-label">Our Services</div>
          <h2>Three Solutions. <span className="text-blue">One Goal.</span></h2>
          <p className="sec-sub">Everything your business needs — a live dashboard to run operations, a professional website to attract customers, or both.</p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <TiltCard key={svc.title} className={`svc-card${svc.bundle ? ' bundle-card' : ''}`} custom={i}>
              <ServiceHeader src={svc.image} alt={svc.alt} index={i} badge={svc.badge} />
              <div className="svc-body">
                <h3>
                  {svc.bundle
                    ? <>{svc.title.split('+')[0]}+<span className="text-gradient-blue"> {svc.title.split('+')[1]}</span></>
                    : svc.title
                  }
                </h3>
                <p className="svc-desc">{svc.desc}</p>
                <ul className="svc-list">
                  {svc.features.map((f, fi) => {
                    const Icon = f.icon
                    const [bold, rest] = f.text.split(' — ')
                    return (
                      <li key={fi}>
                        <span className="sli-icon"><Icon size={14} /></span>
                        <div><strong>{bold}</strong>{rest ? ` — ${rest}` : ''}</div>
                      </li>
                    )
                  })}
                </ul>
                <div className="svc-works-for"><span>Perfect for:</span> {svc.for}</div>
                <button
                  className={`btn-primary${svc.bundle ? ' btn-bundle' : ''}`}
                  onClick={() => scrollTo('contact')}
                >
                  {svc.cta}
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
