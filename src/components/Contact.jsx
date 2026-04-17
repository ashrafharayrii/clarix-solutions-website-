import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const INFO = [
  { Icon: Mail,    text: 'clarix.solutions.jo@gmail.com', href: 'mailto:clarix.solutions.jo@gmail.com' },
  { Icon: Phone,   text: '+962 792 803 075',              href: 'tel:+962792803075'                   },
  { Icon: MapPin,  text: 'Amman, Jordan',                 href: null                                   },
  { Icon: Clock,   text: 'Response within 24 hours',      href: null                                   },
]

const INPUT_STYLE = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 14,
  padding: '12px 16px',
  fontSize: 14,
  color: '#F8FAFC',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
}

function Field({ label, id, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <label htmlFor={id} style={{ fontSize:13, fontWeight:600, color:'#94A3B8' }}>{label}</label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus]   = useState(null)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const form = e.target
    const data = new FormData(form)
    data.append('_captcha',  'false')
    data.append('_subject',  'New enquiry — Clarix Solutions')
    data.append('_template', 'table')
    try {
      const res  = await fetch('https://formsubmit.co/ajax/clarix.solutions.jo@gmail.com',
        { method:'POST', body:data, headers:{ Accept:'application/json' } })
      const json = await res.json()
      if (json.success === 'true' || json.success === true) { setStatus('success'); form.reset() }
      else throw new Error()
    } catch { setStatus('error') }
    setSending(false)
  }

  return (
    <section id="contact" style={{ padding:'80px 0 120px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.15 }} transition={{ duration:0.55, ease:EASE }}
          style={{ textAlign:'center', marginBottom:64 }}
        >
          <span className="sec-badge">
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#22C55E',
                           animation:'pulse-orb 2s ease-in-out infinite' }}/>
            Now Accepting Projects
          </span>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:14 }}>
            Ready to Build<br/>
            <span className="gradient-text">Something Remarkable?</span>
          </h2>
          <p style={{ fontSize:17, color:'#64748B', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            Tell us what you're struggling to track. Our team replies within 24 hours with a clear, personalised plan.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24, alignItems:'start' }}>

          {/* Left: info */}
          <motion.div
            initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.7, ease:EASE }}
            className="glass"
            style={{ borderRadius:28, padding:'36px 32px' }}
          >
            <h3 style={{ fontSize:22, fontWeight:700, color:'#F8FAFC', letterSpacing:'-0.025em', marginBottom:10 }}>
              Let's Talk
            </h3>
            <p style={{ fontSize:14, color:'#64748B', lineHeight:1.7, marginBottom:32 }}>
              We're a team of data and web experts based in Amman, Jordan. We build custom solutions
              for businesses of all sizes across the region.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:32 }}>
              {INFO.map(({ Icon, text, href }, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:40, height:40, borderRadius:12,
                                background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)',
                                display:'flex', alignItems:'center', justifyContent:'center',
                                flexShrink:0, color:'#93C5FD' }}>
                    <Icon size={17} />
                  </div>
                  {href
                    ? <a href={href} style={{ fontSize:14, color:'#CBD5E1', textDecoration:'none',
                                              transition:'color 0.2s' }}
                         onMouseEnter={e=>e.target.style.color='#F8FAFC'}
                         onMouseLeave={e=>e.target.style.color='#CBD5E1'}>{text}</a>
                    : <span style={{ fontSize:14, color:'#CBD5E1' }}>{text}</span>
                  }
                </div>
              ))}
            </div>

            {/* Social proof stat */}
            <div className="glass" style={{ borderRadius:16, padding:'16px 20px',
                                            display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:12,
                            background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            flexShrink:0, color:'#22C55E' }}>
                <CheckCircle size={20}/>
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:15, color:'#F8FAFC' }}>50+ Projects Delivered</div>
                <div style={{ fontSize:12, color:'#475569' }}>Across 10+ industries in Jordan</div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }} transition={{ duration:0.7, ease:EASE }}
            className="glass"
            style={{ borderRadius:28, padding:'36px 32px',
                     border:'1px solid rgba(59,130,246,0.15)',
                     boxShadow:'0 0 60px rgba(59,130,246,0.06)' }}
          >
            {status === 'success' ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ width:64, height:64, borderRadius:20, background:'rgba(34,197,94,0.12)',
                              border:'1px solid rgba(34,197,94,0.25)', display:'flex',
                              alignItems:'center', justifyContent:'center', margin:'0 auto 20px',
                              color:'#22C55E' }}>
                  <CheckCircle size={28}/>
                </div>
                <div style={{ fontSize:20, fontWeight:700, color:'#F8FAFC', marginBottom:10 }}>Message Sent!</div>
                <div style={{ fontSize:14, color:'#64748B' }}>We'll get back to you within 24 hours.</div>
                <button onClick={() => setStatus(null)}
                  className="btn-outline"
                  style={{ padding:'10px 24px', borderRadius:12, fontSize:14, fontWeight:600,
                           marginTop:24, border:'1px solid rgba(255,255,255,0.14)' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <h3 style={{ fontSize:18, fontWeight:700, color:'#F8FAFC', letterSpacing:'-0.02em', marginBottom:4 }}>
                  Free Consultation Request
                </h3>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <Field label="Name" id="name">
                    <input id="name" name="name" type="text" required placeholder="Your name"
                      style={INPUT_STYLE}
                      onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
                      onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                  </Field>
                  <Field label="Phone" id="phone">
                    <input id="phone" name="phone" type="tel" placeholder="+962 ..."
                      style={INPUT_STYLE}
                      onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
                      onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                  </Field>
                </div>

                <Field label="Email" id="email">
                  <input id="email" name="email" type="email" required placeholder="your@email.com"
                    style={INPUT_STYLE}
                    onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                </Field>

                <Field label="Business Type" id="business">
                  <select id="business" name="business_type"
                    style={{ ...INPUT_STYLE, appearance:'none', cursor:'pointer' }}>
                    <option value="">Select your industry...</option>
                    {['Coffee House','Supermarket','Restaurant','Retail Store','Jewelry Shop',
                      'Pharmacy','Bakery','Clothing Store','Other'].map(v=>(
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Message" id="message">
                  <textarea id="message" name="message" required rows={4}
                    placeholder="Tell us what you're struggling to track or measure..."
                    style={{ ...INPUT_STYLE, resize:'vertical', minHeight:100 }}
                    onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                </Field>

                {status === 'error' && (
                  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px',
                                borderRadius:12, background:'rgba(239,68,68,0.1)',
                                border:'1px solid rgba(239,68,68,0.25)', color:'#F87171', fontSize:13 }}>
                    <AlertCircle size={16}/> Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button type="submit" disabled={sending}
                  className="btn-primary magnetic"
                  style={{ padding:'14px 28px', borderRadius:16, fontSize:15, fontWeight:700,
                           border:'none', justifyContent:'center', opacity:sending?0.7:1 }}>
                  {sending ? 'Sending...' : 'Send Message — Free Consultation'}
                  {!sending && <Send size={16}/>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
