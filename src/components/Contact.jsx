import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

const infoRows = [
  { icon: '📧', content: <a href="mailto:clarix.solutions.jo@gmail.com">clarix.solutions.jo@gmail.com</a> },
  { icon: '📞', content: <a href="tel:+962792803075">+962 792 803 075</a> },
  { icon: '📍', content: <span>Amman, Jordan</span> },
  { icon: '⏱️', content: <span>Response within 24 hours</span> },
]

export default function Contact() {
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'
  const [btnText, setBtnText] = useState('Send Message — Free Consultation →')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setBtnText('Sending...')
    const form = e.target
    const data = new FormData(form)
    data.append('_captcha', 'false')
    data.append('_subject', 'New enquiry — Clarix Solutions')
    data.append('_template', 'table')
    try {
      const res = await fetch('https://formsubmit.co/ajax/clarix.solutions.jo@gmail.com', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      const json = await res.json()
      if (json.success === 'true' || json.success === true) {
        setStatus('success')
        form.reset()
      } else throw new Error()
    } catch {
      setStatus('error')
    }
    setBtnText('Send Message — Free Consultation →')
  }

  return (
    <section id="contact">
      <div className="container contact-layout">
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sec-label light">Get In Touch</div>
          <h2 className="white-h">Ready to Transform<br /><span className="text-blue-l">Your Business?</span></h2>
          <p>Tell us what you're struggling to track. Our team replies within 24 hours with a clear, personalised plan.</p>

          {/* WhatsApp Direct CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ margin: '24px 0' }}
          >
            <a
              href="https://wa.me/962792803075"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare size={18} />
              WhatsApp Direct
            </a>
            <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>
              Fastest response · Typically under 1 hour
            </p>
          </motion.div>

          <div className="contact-info">
            {infoRows.map((row, i) => (
              <motion.div
                key={i}
                className="ci-row"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span>{row.icon}</span>{row.content}
              </motion.div>
            ))}
          </div>
          <div className="contact-promise">
            <div className="cp-item"><span>✓</span> Free initial consultation</div>
            <div className="cp-item"><span>✓</span> No commitment required</div>
            <div className="cp-item"><span>✓</span> Custom plan for your business</div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="fg"><label>Full Name</label><input type="text" name="name" placeholder="Your name" required /></div>
          <div className="fg"><label>Email Address</label><input type="email" name="email" placeholder="you@yourbusiness.com" required /></div>
          <div className="fg">
            <label>Business Type</label>
            <select name="business_type">
              <option>Coffee House / Café</option>
              <option>Supermarket / Grocery</option>
              <option>Retail Store</option>
              <option>Jewelry Shop</option>
              <option>Clothing Store</option>
              <option>Restaurant</option>
              <option>Pharmacy</option>
              <option>Bakery</option>
              <option>Other</option>
            </select>
          </div>
          <div className="fg">
            <label>What Do You Need?</label>
            <div className="radio-opts">
              <label className="ro"><input type="radio" name="svc" value="dashboard" /> 📊 Dashboard Only</label>
              <label className="ro"><input type="radio" name="svc" value="website" /> 🌐 Website Only</label>
              <label className="ro"><input type="radio" name="svc" value="both" defaultChecked /> 🚀 Both (Bundle)</label>
            </div>
          </div>
          <div className="fg"><label>Message</label><textarea name="message" rows="4" placeholder="Tell us about your business and what you'd like to improve or track..." /></div>
          <motion.button
            type="submit"
            className="btn-primary full"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {btnText}
          </motion.button>
          {status === 'success' && (
            <motion.div
              className="formMsg success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ✓ Message sent! I'll get back to you within 24 hours.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              className="formMsg error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ✗ Something went wrong. Please email directly to clarix.solutions.jo@gmail.com
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
