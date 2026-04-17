/* ===== CLARIX COFFEE HOUSE - MAIN JS ===== */

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navLinks?.classList.remove('open');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      navLinks?.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== MENU TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuSections = document.querySelectorAll('.menu-section');

function activateTab(tab) {
  menuTabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const target = tab.dataset.tab;
  menuSections.forEach(sec => {
    if (sec.dataset.menu === target) {
      sec.classList.add('active-section');
    } else {
      sec.classList.remove('active-section');
    }
  });
}

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab));
});

// Init first tab
if (menuTabs.length) activateTab(menuTabs[0]);

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal === 'true';
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const duration = 2000;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = prefix + (isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString()) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
      display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      animation:fadeIn 0.3s ease;
    `;
    const image = document.createElement('img');
    image.src = img.src;
    image.style.cssText = `max-width:90%;max-height:90vh;border-radius:16px;box-shadow:0 20px 80px rgba(0,0,0,0.5);`;
    overlay.appendChild(image);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});

// ===== ADD TO CART ANIMATION =====
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.innerHTML = '✓';
    this.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
    setTimeout(() => {
      this.innerHTML = '+';
      this.style.background = '';
    }, 1500);
  });
});

// ===== NEWSLETTER =====
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input');
  const btn = newsletterForm.querySelector('button');
  btn.textContent = 'Subscribed! ✓';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
});
