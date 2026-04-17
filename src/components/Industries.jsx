import { motion } from 'framer-motion'
import { Coffee, ShoppingCart, UtensilsCrossed, Gem, Shirt, Pill, Croissant, Home, ExternalLink } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const INDUSTRIES = [
  { Icon: Coffee,          label: 'Coffee Houses',  desc: 'Sales, ingredients & loyalty programs',      color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  demo: 'coffee house/index.html' },
  { Icon: ShoppingCart,    label: 'Supermarkets',   desc: 'Inventory, suppliers & category analytics', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',   border: 'rgba(59,130,246,0.2)',  demo: 'supermarket/index.html'  },
  { Icon: UtensilsCrossed, label: 'Restaurants',    desc: 'Order management & kitchen operations',     color: '#EF4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.2)',   demo: 'resorant/index.html'     },
  { Icon: Gem,             label: 'Jewelry Shops',  desc: 'Stock valuation & high-value tracking',     color: '#EC4899', bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.2)',  demo: 'jewllery/index.html'     },
  { Icon: Shirt,           label: 'Clothing Stores',desc: 'Size analytics & seasonal trends',          color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',   border: 'rgba(139,92,246,0.2)',  demo: 'retail/index.html'       },
  { Icon: Pill,            label: 'Pharmacies',     desc: 'Medicine inventory & expiry tracking',      color: '#06B6D4', bg: 'rgba(6,182,212,0.1)',    border: 'rgba(6,182,212,0.2)',   demo: 'logistics/index.html'    },
  { Icon: Croissant,       label: 'Bakeries',       desc: 'Production planning & waste reduction',     color: '#F97316', bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.2)',  demo: 'bakeries/index.html'     },
  { Icon: Home,            label: 'Retail Stores',  desc: 'Product performance & sales trends',        color: '#10B981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.2)',  demo: 'retail/index.html'       },
]

export default function Industries() {
  return (
    <section id="industries" style={{ padding:'80px 0', position:'relative' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.15 }} transition={{ duration:0.55, ease:EASE }}
          style={{ textAlign:'center', marginBottom:60 }}
        >
          <span className="sec-badge">Industries We Serve</span>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:14 }}>
            Built for Every <span className="gradient-text">Business Type</span>
          </h2>
          <p style={{ fontSize:17, color:'#64748B', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
            From a small café to a multi-branch supermarket — every solution is built around your specific operations.
          </p>
          <p style={{ fontSize:14, color:'#475569', marginTop:12 }}>
            Click any industry to see a live demo website →
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
          gap: 16,
        }}>
          {INDUSTRIES.map(({ Icon, label, desc, color, bg, border, demo }, i) => (
            <motion.a
              key={label}
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="industry-card glass"
              initial={{ opacity:0, y:30, scale:0.94 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true, amount:0.15 }}
              transition={{ duration:0.5, delay:(i%4)*0.08, ease:EASE }}
              whileHover={{ y:-6, scale:1.04 }}
              style={{
                padding:'24px 20px', borderRadius:20, textAlign:'center',
                cursor:'pointer', textDecoration:'none', display:'block',
                position:'relative', overflow:'hidden',
              }}
            >
              <div style={{
                width:50, height:50, borderRadius:14,
                background:bg, border:`1px solid ${border}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 14px', color,
              }}>
                <Icon size={22} />
              </div>
              <div style={{ fontWeight:600, fontSize:14, color:'#F8FAFC', marginBottom:6, lineHeight:1.3 }}>{label}</div>
              <div style={{ fontSize:11, color:'#475569', lineHeight:1.5 }}>{desc}</div>
              <div style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:4,
                marginTop:10, fontSize:11, color, opacity:0.7,
              }}>
                <ExternalLink size={10} />
                <span>View Demo</span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
