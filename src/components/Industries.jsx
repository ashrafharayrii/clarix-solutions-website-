import { motion } from 'framer-motion'

const industries = [
  { img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', label: 'Coffee Houses',  icon: '☕',  desc: 'Sales tracking, ingredient management & loyalty programs',        color: '#F59E0B', demo: '/clarix-solutions-website-/coffee house/index.html' },
  { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', label: 'Supermarkets',   icon: '🏪',  desc: 'Inventory control, supplier management & category analytics',     color: '#10B981', demo: '/clarix-solutions-website-/supermarket/index.html'  },
  { img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80', label: 'Retail Stores',  icon: '🛒',  desc: 'Product performance, sales trends & operational metrics',         color: '#2B68E9', demo: '/clarix-solutions-website-/retail/index.html'       },
  { img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', label: 'Jewelry Shops', icon: '💍',  desc: 'Stock valuation, sales mix analysis & high-value tracking',      color: '#EC4899', demo: '/clarix-solutions-website-/jewllery/index.html'     },
  { img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80', label: 'Clothing Stores',icon: '👗',  desc: 'Size/color analytics, return rates & seasonal trends',           color: '#8B5CF6', demo: '/clarix-solutions-website-/retail/index.html'       },
  { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', label: 'Restaurants',   icon: '🍽️', desc: 'Order management, table tracking & kitchen operations',          color: '#EF4444', demo: '/clarix-solutions-website-/resorant/index.html'     },
  { img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80', label: 'Pharmacies',    icon: '💊',  desc: 'Medicine inventory, expiry tracking & sales performance',        color: '#06B6D4', demo: '/clarix-solutions-website-/logistics/index.html'    },
  { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', label: 'Bakeries',      icon: '🥐',  desc: 'Daily production planning, waste reduction & ingredient costs',  color: '#F97316', demo: '/clarix-solutions-website-/bakeries/index.html'     },
]

export default function Industries() {
  return (
    <section id="industries">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sec-label">Industries We Serve</div>
          <h2>Built for Every <span className="text-blue">Business Type</span></h2>
          <p className="sec-sub">From a small café to a multi-branch supermarket — every solution is built around your specific operations.</p>
        </motion.div>
        <div className="ind-photo-grid">
          {industries.map((ind, i) => (
            <motion.a
              key={ind.label}
              href={ind.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ind-photo-card"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              style={{ '--ind-glow': ind.color, textDecoration: 'none', display: 'block', cursor: 'pointer' }}
            >
              <img src={ind.img} alt={ind.label} loading="lazy" />
              <div className="ind-photo-overlay" style={{ '--ind-glow': ind.color }}>
                <span className="ind-emoji-big">{ind.icon}</span>
                <strong>{ind.label}</strong>
                <p>{ind.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
