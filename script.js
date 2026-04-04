/* ══════════════════════════════════════════
   CLARIX SOLUTIONS — script.js
   ══════════════════════════════════════════ */

// 1. Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// 2. Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (navbar && !navbar.contains(e.target)) closeMenu();
});

// 3. Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMenu();
  });
});

// 4. Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });

document.querySelectorAll('.svc-card, .ind-card, .ben-card, .price-card, .about-body, .about-stats, .about-stack, .free-consult-banner, .hv-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.07 + 's';
  revealObserver.observe(el);
});

// 5. Hero bar entrance animation
window.addEventListener('load', () => {
  document.querySelectorAll('.hv-bar').forEach((bar, i) => {
    const finalH = bar.style.getPropertyValue('--h') || '60%';
    bar.style.setProperty('--h', '0%');
    setTimeout(() => {
      bar.style.transition = 'height 0.7s cubic-bezier(0.4,0,0.2,1)';
      bar.style.setProperty('--h', finalH);
    }, 600 + i * 60);
  });
});

// 6. Contact Form Submission (FormSubmit.co)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    formMsg.textContent = '';
    formMsg.className = '';

    try {
      const data = new FormData(form);
      data.append('_captcha', 'false');
      data.append('_subject', 'New enquiry — Clarix Solutions');
      data.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/ajax/clarix.solutions.jo@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      const json = await response.json();

      if (json.success === 'true' || json.success === true) {
        formMsg.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        formMsg.className = 'success';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      formMsg.textContent = '✗ Something went wrong. Please email directly to clarix.solutions.jo@gmail.com';
      formMsg.className = 'error';
    }

    btn.textContent = originalText;
    btn.disabled = false;
  });
}

// 7. Hover glow effect on cards
document.querySelectorAll('.at-tool, .ben-card, .price-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(180px at ${x}px ${y}px, rgba(43,104,233,0.08), transparent 70%), rgba(255,255,255,0.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// 8. Simple toast notification (optional)
function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: #1E293B;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    z-index: 9999;
    animation: slideUp 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(toast);
  
  const style = document.createElement('style');
  style.textContent = `@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  
  setTimeout(() => toast.remove(), 3000);
}

console.log('Clarix Solutions — Ready to help your business grow!');