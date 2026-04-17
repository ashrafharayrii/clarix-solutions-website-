import { motion } from 'framer-motion'
import {
  Package, BarChart2, Users, Briefcase, ClipboardList,
  Palette, Smartphone, Search, Zap, Shield,
  LayoutDashboard, Globe,
} from 'lucide-react'

const EASE  = [0.16, 1, 0.3, 1]
const VBASE = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } }

function Feature({ icon: Icon, title, desc, delay = 0 }) {
  return (
    <motion.div className="feature-row" variants={VBASE} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay, ease: EASE }}>
      <div className="feature-icon"><Icon size={18} /></div>
      <div>
        <div style={{ fontWeight:600, fontSize:15, color:'#F8FAFC', marginBottom:4 }}>{title}</div>
        <div style={{ fontSize:13, color:'#64748B', lineHeight:1.6 }}>{desc}</div>
      </div>
    </motion.div>
  )
}

function StudioDisplay() {
  return (
    <div className="display-wrapper">
      <div className="display-body">
        <div style={{
          background:'linear-gradient(160deg,#3a3a3e 0%,#2a2a2e 100%)', borderRadius:22, padding:12,
          boxShadow:'0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
        }}>
          <div style={{ background:'#090e1a', borderRadius:12, overflow:'hidden', aspectRatio:'16/10' }}>
            <div style={{ padding:14, height:'100%', background:'#0d1117' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#3B82F6' }}/>
                  <span style={{ fontSize:9, color:'#64748B', fontWeight:600 }}>Clarix Analytics — Live</span>
                </div>
                <div style={{ display:'flex', gap:4 }}>
                  {['#22C55E','#F59E0B','#EF4444'].map((c,i)=><div key={i} style={{ width:6, height:6, borderRadius:'50%', background:c }}/>)}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:10 }}>
                {[
                  {label:'Revenue',val:'$284K',delta:'+18%',up:true},{label:'Orders',val:'1,847',delta:'+7%',up:true},
                  {label:'Stock',val:'94.2%',delta:'-2%',up:false},{label:'Staff',val:'247',delta:'Active',up:true},
                ].map((k,i)=>(
                  <div key={i} style={{ background:i===0?'rgba(59,130,246,0.12)':'rgba(255,255,255,0.04)',
                    border:`1px solid ${i===0?'rgba(59,130,246,0.25)':'rgba(255,255,255,0.06)'}`,
                    borderRadius:8, padding:'7px 8px' }}>
                    <div style={{ fontSize:6, color:'#475569', marginBottom:3 }}>{k.label}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#F8FAFC' }}>{k.val}</div>
                    <div style={{ fontSize:6, color:k.up?'#22C55E':'#F59E0B' }}>{k.delta}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:6 }}>
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'8px 10px', height:76 }}>
                  <div style={{ fontSize:7, color:'#475569', marginBottom:6 }}>Monthly Sales</div>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:48 }}>
                    {[60,78,50,90,100,72,84,66].map((h,i)=>(
                      <div key={i} style={{
                        flex:1, height:`${h}%`,
                        background:h===100?'linear-gradient(to top,#2563EB,#60A5FA)':'rgba(59,130,246,0.45)',
                        borderRadius:'2px 2px 0 0',
                        animation:`bar-grow 0.8s ${0.1+i*0.07}s both cubic-bezier(0.34,1.56,0.64,1)`,
                        boxShadow:h===100?'0 0 8px rgba(59,130,246,0.6)':'none',
                      }}/>
                    ))}
                  </div>
                </div>
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:8,
                              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:76 }}>
                  <div style={{ fontSize:7, color:'#475569', marginBottom:4 }}>Categories</div>
                  <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
                    <circle cx="22" cy="22" r="16" fill="none" stroke="#1e3a5f" strokeWidth="7"/>
                    <circle cx="22" cy="22" r="16" fill="none" stroke="#3B82F6" strokeWidth="7" strokeDasharray="60 101" strokeDashoffset="-26" strokeLinecap="round"/>
                    <circle cx="22" cy="22" r="16" fill="none" stroke="#60A5FA" strokeWidth="7" strokeDasharray="30 101" strokeDashoffset="-86" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width:50, height:56, margin:'0 auto', background:'linear-gradient(180deg,#3a3a3c,#2a2a2c)',
          clipPath:'polygon(22% 0%,78% 0%,65% 100%,35% 100%)' }}/>
        <div style={{ width:110, height:9, margin:'0 auto', background:'linear-gradient(90deg,#2a2a2c,#4a4a4e,#2a2a2c)', borderRadius:4 }}/>
      </div>
    </div>
  )
}

function DeviceStack() {
  return (
    <div style={{ position:'relative', width:460, height:380, margin:'0 auto' }}>
      {/* Laptop */}
      <div style={{ position:'absolute', bottom:0, left:0, width:340 }}>
        <div style={{ background:'#0d1117', border:'2px solid #2d3748', borderRadius:'8px 8px 0 0',
          height:200, overflow:'hidden', transform:'perspective(800px) rotateX(5deg)', transformOrigin:'bottom center' }}>
          <div style={{ padding:8, height:'100%', background:'#0d1117' }}>
            <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:6 }}>
              {['#EF4444','#F59E0B','#22C55E'].map((c,i)=><div key={i} style={{ width:5, height:5, borderRadius:'50%', background:c }}/>)}
              <div style={{ flex:1, height:8, background:'#1e293b', borderRadius:4, marginLeft:4 }}/>
            </div>
            <div style={{ background:'#0f172a', borderRadius:4, height:'calc(100% - 20px)', padding:10 }}>
              <div style={{ height:8, background:'rgba(59,130,246,0.3)', borderRadius:4, marginBottom:7, width:'70%' }}/>
              <div style={{ height:5, background:'rgba(255,255,255,0.08)', borderRadius:3, marginBottom:4 }}/>
              <div style={{ height:5, background:'rgba(255,255,255,0.05)', borderRadius:3, marginBottom:12, width:'85%' }}/>
              <div style={{ display:'flex', gap:6, marginBottom:12 }}>
                <div style={{ flex:1, height:26, background:'rgba(59,130,246,0.5)', borderRadius:10 }}/>
                <div style={{ width:70, height:26, background:'rgba(255,255,255,0.07)', borderRadius:10 }}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:5 }}>
                {[0,1,2].map(i=><div key={i} style={{ height:40, borderRadius:10,
                  background:i===1?'rgba(59,130,246,0.1)':'rgba(255,255,255,0.04)',
                  border:`1px solid ${i===1?'rgba(59,130,246,0.22)':'rgba(255,255,255,0.07)'}` }}/>)}
              </div>
            </div>
          </div>
        </div>
        <div style={{ height:12, background:'linear-gradient(180deg,#374151,#1f2937)', borderRadius:'0 0 6px 6px', borderBottom:'3px solid #111827' }}/>
        <div style={{ height:7, background:'#1f2937', borderRadius:'0 0 8px 8px', width:'82%', margin:'0 auto' }}/>
      </div>

      {/* Tablet */}
      <div style={{ position:'absolute', top:10, right:16, width:155, transform:'rotate(-3deg)' }}>
        <div style={{ background:'#1e293b', borderRadius:12, padding:7, border:'2px solid #334155', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ background:'#0d1117', borderRadius:8, height:215, overflow:'hidden', padding:7 }}>
            <div style={{ height:6,  background:'rgba(59,130,246,0.4)',   borderRadius:4, marginBottom:5, width:'75%' }}/>
            <div style={{ height:4,  background:'rgba(255,255,255,0.1)',  borderRadius:3, marginBottom:3 }}/>
            <div style={{ height:4,  background:'rgba(255,255,255,0.07)', borderRadius:3, marginBottom:8, width:'88%' }}/>
            <div style={{ height:60, background:'rgba(59,130,246,0.1)',   borderRadius:8, border:'1px solid rgba(59,130,246,0.22)', marginBottom:5 }}/>
            <div style={{ height:60, background:'rgba(255,255,255,0.04)', borderRadius:8, border:'1px solid rgba(255,255,255,0.07)', marginBottom:5 }}/>
            <div style={{ height:18, background:'rgba(59,130,246,0.38)', borderRadius:8, width:'65%' }}/>
          </div>
          <div style={{ width:32, height:32, borderRadius:'50%', border:'1px solid #334155', margin:'6px auto 0',
                        display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:14, height:14, borderRadius:3, border:'1px solid #475569' }}/>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div style={{ position:'absolute', bottom:28, right:0, width:88, transform:'rotate(6deg)' }}>
        <div style={{ background:'#1e293b', borderRadius:18, padding:6, border:'2px solid #334155', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ width:28, height:5, borderRadius:3, background:'#0d1117', margin:'0 auto 4px' }}/>
          <div style={{ background:'#0d1117', borderRadius:12, height:165, overflow:'hidden', padding:6 }}>
            <div style={{ height:5,  background:'rgba(59,130,246,0.45)', borderRadius:3, marginBottom:4, width:'70%' }}/>
            <div style={{ height:3,  background:'rgba(255,255,255,0.1)',  borderRadius:2, marginBottom:3 }}/>
            <div style={{ height:3,  background:'rgba(255,255,255,0.07)', borderRadius:2, marginBottom:8, width:'80%' }}/>
            <div style={{ height:50, background:'rgba(59,130,246,0.12)', borderRadius:8, border:'1px solid rgba(59,130,246,0.25)', marginBottom:4 }}/>
            <div style={{ height:50, background:'rgba(255,255,255,0.04)', borderRadius:8, border:'1px solid rgba(255,255,255,0.07)', marginBottom:4 }}/>
            <div style={{ height:18, background:'rgba(59,130,246,0.4)', borderRadius:8 }}/>
          </div>
          <div style={{ width:30, height:4, borderRadius:2, background:'#334155', margin:'5px auto 0' }}/>
        </div>
      </div>

      <div aria-hidden="true" style={{
        position:'absolute', bottom:-20, left:'50%', transform:'translateX(-50%)',
        width:300, height:50,
        background:'radial-gradient(ellipse,rgba(59,130,246,0.18) 0%,transparent 70%)',
        filter:'blur(20px)',
      }}/>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <section id="services" style={{ padding:'120px 0 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
          <motion.div variants={VBASE} initial="hidden" whileInView="visible"
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.55, ease:EASE }}
            style={{ textAlign:'center', marginBottom:72 }}>
            <span className="sec-badge"><LayoutDashboard size={13}/> Service 01 — Business Intelligence</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:14 }}>
              Dashboard <span className="gradient-text">Intelligence</span>
            </h2>
            <p style={{ fontSize:17, color:'#64748B', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
              Real-time data visualization that turns complex numbers into crystal-clear business decisions.
            </p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:64, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.15 }} transition={{ duration:0.75, ease:EASE }}>
              <StudioDisplay/>
            </motion.div>
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.15 }} transition={{ duration:0.75, ease:EASE }}>
              <h3 style={{ fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700, color:'#F8FAFC', letterSpacing:'-0.025em', marginBottom:10 }}>
                Your Business,<br/>Fully Visible.
              </h3>
              <p style={{ fontSize:15, color:'#64748B', lineHeight:1.7, marginBottom:28 }}>
                Custom dashboards pulling live data from all your systems — so you always know exactly what's happening.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <Feature icon={Package}       title="Inventory Tracking"   desc="Live stock levels, reorder alerts, supplier sync — never run out of what matters." delay={0.05}/>
                <Feature icon={BarChart2}     title="Sales Monitoring"     desc="Real-time revenue, conversion funnels, and performance trends at a glance." delay={0.1}/>
                <Feature icon={Briefcase}     title="Supplier Management"  desc="Vendor performance, lead times, and procurement costs in one clean view." delay={0.15}/>
                <Feature icon={Users}         title="Customer Analytics"   desc="Lifetime value, churn risk, and behavior patterns before it's too late." delay={0.2}/>
                <Feature icon={ClipboardList} title="Employee KPIs"        desc="Team performance, goals, and productivity tracked with fairness and clarity." delay={0.25}/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="webdev" style={{ padding:'80px 0 120px', position:'relative', overflow:'hidden' }}>
        <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(180deg,transparent 0%,rgba(59,130,246,0.025) 50%,transparent 100%)' }}/>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', position:'relative' }}>
          <motion.div variants={VBASE} initial="hidden" whileInView="visible"
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.55, ease:EASE }}
            style={{ textAlign:'center', marginBottom:72 }}>
            <span className="sec-badge"><Globe size={13}/> Service 02 — Web Development</span>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:14 }}>
              Websites That <span className="gradient-text">Convert</span>
            </h2>
            <p style={{ fontSize:17, color:'#64748B', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
              Every pixel is intentional. Every interaction is optimized. We build digital experiences that grow your business.
            </p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:64, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.15 }} transition={{ duration:0.75, ease:EASE }}>
              <h3 style={{ fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700, color:'#F8FAFC', letterSpacing:'-0.025em', marginBottom:10 }}>
                Built for<br/>Performance &amp; Growth.
              </h3>
              <p style={{ fontSize:15, color:'#64748B', lineHeight:1.7, marginBottom:28 }}>
                No templates. Every site is crafted from scratch — engineered to rank, load fast, and turn visitors into customers.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <Feature icon={Palette}    title="Custom Design"       desc="Unique brand-aligned designs — zero templates, total originality." delay={0.05}/>
                <Feature icon={Smartphone} title="Mobile-First"        desc="Flawless on every device, from the smallest phone to a 4K display." delay={0.1}/>
                <Feature icon={Search}     title="SEO Optimized"       desc="Technical SEO, structured data, and Core Web Vitals — out of the box." delay={0.15}/>
                <Feature icon={Zap}        title="Lightning Speed"     desc="Sub-2s load times with optimized assets, CDN delivery, and clean code." delay={0.2}/>
                <Feature icon={Shield}     title="Enterprise Security" desc="SSL, DDoS protection, and OWASP best practices built in from day one." delay={0.25}/>
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.15 }} transition={{ duration:0.75, ease:EASE }}
              style={{ display:'flex', justifyContent:'center' }}>
              <DeviceStack/>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
