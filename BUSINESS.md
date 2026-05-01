# Clarix Solutions — Business & Website Overview

---

## What Is Clarix Solutions?

**Clarix Solutions** is a data and web development company based in **Amman, Jordan**. The business builds two core digital products for local businesses:

1. **Custom Business Dashboards** — real-time internal management tools
2. **Professional Websites** — modern, branded online presence

The mission is to give small and medium-sized businesses access to the same powerful tools large companies use — at an affordable price, tailored exactly to how each business works.

---

## The Problem We Solve

Most business owners in Jordan manage operations manually — spreadsheets, notebooks, or no tracking at all. This leads to:

- Stock running out without warning
- Overpaying suppliers without knowing it
- Slow weeks going unnoticed until it's too late
- Wasting hours generating reports manually
- Making decisions on incomplete or outdated information

---

## Services

### 1. Dashboard Development
Real-time management dashboard built specifically for the client's business.

| Feature | Detail |
|---|---|
| Inventory Tracking | Live stock levels & automatic low-stock alerts |
| Sales & Profit Monitoring | Daily, weekly, monthly performance |
| Supplier Management | Track orders, costs & reliability |
| Customer Behavior Analytics | Purchase patterns & lifetime value |
| Employee Performance KPIs | Efficiency metrics & contribution tracking |

**Perfect for:** Coffee Houses, Supermarkets, Restaurants, Retail Stores, Jewelry Shops, Clothing Stores

---

### 2. Website Development
Fast, mobile-first professional website custom-built to match the client's brand.

| Feature | Detail |
|---|---|
| Custom Design | Unique to the brand — no generic templates |
| Mobile-First | Flawless on every device and screen size |
| Product & Service Showcase | Menu, catalog, or services presented clearly |
| SEO Optimized | Help local customers find the business on Google |
| Fast & Secure | Optimized speed and HTTPS security |

**Perfect for:** All business types — any size, any industry

---

### 3. Website + Dashboard Bundle ⭐ Best Value
Both products delivered together as one integrated system.

| Feature | Detail |
|---|---|
| Everything Included | Full feature set of both services |
| Seamless Integration | Website and dashboard work as one system |
| 20% Savings | Better value than purchasing separately |
| Priority Support | 2 months of expedited assistance |
| One Partner | Online presence + internal operations, handled together |

**Perfect for:** Growing businesses ready to scale online AND operationally

---

## Target Industries

| Industry | Metric Delivered |
|---|---|
| Artisan Bakeries | Waste reduced by 18% |
| Luxury Jewelry | 100% inventory visibility |
| Coffee Houses | ROI increased by 24% |
| Premium Supermarkets | Revenue up 31% |
| Fine Dining Restaurants | 5-star analytics system |
| Retail Boutiques | Conversion rate up 45% |
| Pharmacies | Custom tracking system |
| Clothing Stores | Custom tracking system |

---

## Key Business Facts

| | |
|---|---|
| Location | Amman, Jordan |
| Projects Delivered | 50+ |
| Industries Served | 10+ |
| Build Approach | 100% custom — no generic templates |
| Response Time | Within 24 hours (WhatsApp typically under 1 hour) |
| Consultation | Free, no commitment required |

---

## Contact Details

| Channel | Details |
|---|---|
| Email | clarix.solutions.jo@gmail.com |
| Phone | +962 792 803 075 |
| WhatsApp | https://wa.me/962792803075 |
| Location | Amman, Jordan |

---

## How We Work — 4-Step Process

**01 — Free Consultation**
Listen to the business, understand pain points, map out exactly what's needed. No cost, no commitment.

**02 — Custom Design**
Design a solution built specifically around their operations — not a template.

**03 — Build & Test**
Build and test everything using real data from the client's own business before delivery.

**04 — Go Live & Grow**
Full access, full training, ongoing support — the business starts running smarter immediately.

---

---

# Website — Technical & Visual Reference

## Tech Stack

| | |
|---|---|
| Framework | React 19 + JSX (no TypeScript) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` + plain CSS variables (hybrid) |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Font | Inter (Google Fonts, weights 300–900) |
| Build | Vite |
| Deployment | GitHub Pages — `https://ashrafharayrii.github.io/clarix-solutions-website-/` |
| Source Remote | `new-repo` → `https://github.com/ashrafharayrii/clarix-solutions-website-.git` |

---

## Color System

Dark mode is the **default** — the `.dark` class is added to `<html>` on load.

### Dark Mode (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#020617` | Page background |
| `--bg-card` | `#0F172A` | Card surfaces |
| `--electric` | `#3B82F6` | Primary blue accent |
| `--teal` | `#34D399` | Teal / success accent |
| `--text` | `#F8FAFC` | Body text |
| `--text-muted` | `#94A3B8` | Secondary text |
| `--cyan` | `#22D3EE` | Highlight accent |

### Light Mode (`html:not(.dark)`)
| Token | Value |
|---|---|
| `--bg` | `#F8FAFC` |
| `--bg-card` | `#FFFFFF` |
| `--electric` | `#2563EB` |
| `--teal` | `#10B981` |
| `--text` | `#0F172A` |

---

## Logo

`src/components/ClarixCatalystLogo.jsx` — animated geometric blue polygon orb + "CLARIX" wordmark in uppercase with a blue gradient underline accent. Used in both Navbar and Footer.

---

## Section Order (App.jsx render order)

```
Navbar → Hero → Services → Process → Demos → About → Urgency → Contact → Footer
```

---

## Section-by-Section Description

### Navbar
- Fixed top, transparent by default
- On scroll past 40px: glassmorphism background (blur + border)
- Left: ClarixCatalystLogo (clickable — scrolls to top)
- Center: nav links — Services, How It Works, Demos, About
- Right: Sun/Moon theme toggle button + "Free Consultation" CTA button
- Mobile: hamburger (3 lines → X animation) → dropdown with all links + theme toggle

---

### Hero
Full-viewport, two-column split layout.

**Left column:**
- Pulsing green dot badge: "Trusted by 50+ businesses · Amman, Jordan"
- Headline: "Track Your Business. Increase Your Profits." (second line is animated blue→teal gradient)
- Typewriter line cycling 8 business types with blinking cursor
- Sub-paragraph describing services
- Two CTAs: "Explore Our Services ↓" (solid blue) + "Free Consultation" (ghost outline)
- Stats bar with count-up animations: 50+ Projects / 10+ Industries / 100% Custom Built

**Right column:**
- Business analytics stock photo with gradient mask
- Floating "Clarix — Live Dashboard" card:
  - 3D mouse-tilt via Framer Motion `useMotionValue` + `useSpring`
  - KPI counters animating up: Revenue $24,850 / Orders 1,284 / Stock 94%
  - Self-drawing SVG line chart with pulsing peak dot + trailing green dot
  - Animated vertical bar chart (7 bars, grow-in then breathe loop)
- Floating pill badge: "Low Stock Alert — Whole Milk — Reorder now" (bobs up/down)

**Background:** Animated particles/mesh scene (`SceneBackground`) + dark blue overlay gradient

---

### Services ⭐ (Premium redesigned section)
Heading: "Three Solutions. One Goal."

3 cards in a responsive grid (1-col mobile → 3-col desktop).

**Interaction:** Vanilla-JS 3D mouse-tilt on each card (no extra library — uses `ref` + `onMouseMove` → `card.style.transform = rotateX/rotateY`)

**Card 1 — Dashboard Development**
- Image: bright analytics/charts laptop photo (Unsplash `photo-1504868584819`)
- Icons: Package, TrendingUp, Truck, Users, BarChart2 (Lucide)
- CTA: "Request Dashboard" → scrolls to contact

**Card 2 — Website Development**
- Image: clean laptop showing website layout (Unsplash `photo-1467232004584`)
- Icons: Palette, Smartphone, ShoppingBag, Search, Zap (Lucide)
- CTA: "Request Website" → scrolls to contact

**Card 3 — Website + Dashboard Bundle** (`.bundle-card` class — highlighted with blue glow border)
- Gold "Best Value" badge (top-right corner of photo)
- Image: laptop showing combined digital interface (Unsplash `photo-1593642632559`)
- Icons: CheckCircle, Link2, Tag, Headphones, Star (Lucide)
- CTA: "Get the Bundle →" (blue→teal gradient button)
- Title uses `.text-gradient-blue` on the " Dashboard Bundle" part

**CSS notes:**
- `.svc-header-img` has `filter: none` — images show at full natural brightness
- Overlay: `transparent → rgba(0,0,0,0.32)` bottom-only (very light)
- On hover: image scales 1.06x, card tilts 7deg max

---

### Process ("How It Works")
Heading: "From First Call to Live in Days"

Animated horizontal timeline line draws left-to-right when the section enters the viewport.

4 step cards with photo thumbnails + "→" connectors:
1. Free Consultation — team meeting photo
2. Custom Design — wireframe/design work photo
3. Build & Test — laptop/coding photo
4. Go Live & Grow — analytics/growth photo

On hover: cards lift upward (-4px).

---

### Demos ("Sector Deployment")
Dark background section with 6 large industry cards.

**Mobile:** Horizontal scroll snap carousel (each card 82vw wide, no scrollbar)
**Desktop:** 2-col (md) → 3-col (lg) CSS grid

Each card (460px tall, 2.5rem border-radius):
- Full-bleed industry photo
- Color-coded gradient overlay (orange/gold/brown/green/red/pink per industry)
- Dark bottom gradient for text legibility
- Glassmorphism metric badge top-right (frosted glass + Activity icon + metric text)
- Industry name + "Open Demo" with ArrowRight icon
- Entire card links to the live demo in a new tab

| Industry | Metric | Demo URL |
|---|---|---|
| Artisan Bakeries | Waste -18% | `/clarix-solutions-website-/bakeries/index.html` |
| Luxury Jewelry | Inventory 100% | `/clarix-solutions-website-/jewllery/index.html` |
| Coffee Houses | ROI +24% | `/clarix-solutions-website-/coffee house/index.html` |
| Premium Supermarkets | Revenue +31% | `/clarix-solutions-website-/supermarket/index.html` |
| Fine Dining | 5-Star Analytics | `/clarix-solutions-website-/resorant/index.html` |
| Retail Boutiques | Conversion +45% | `/clarix-solutions-website-/retail/index.html` |

---

### About ("The Team Behind Your Success")
Two-column layout:

**Left:** Team/office photo with dark overlay + white glassmorphism quote card:
*"We don't sell software. We solve business problems."*

**Right:**
- 3 paragraphs about Clarix Solutions
- 6 highlight bullets with emoji icons: location, custom-built, measurable value, support, 50+ projects, 24h response
- "Partner With Us" CTA button

**Stats bar** (4 tiles, hover scale animation): 50+ Projects / 10+ Industries / 100% Custom Built / 24h Response Time

---

### Urgency ("Every Day Without a Dashboard Is Money You're Losing.")
Dark CTA section, two-column:

**Left:**
- Bold headline
- Paragraph explaining the problem
- 4 pain-point bullets with emoji icons

**Right:**
- Floating consultation card: phone icon + "Book a Free Consultation" heading + CTA button
- Note: "No commitment. No technical knowledge needed."

---

### Contact ("Ready to Transform Your Business?")
Dark background section, two-column:

**Left:**
- Section label + headline
- **WhatsApp Direct** green pill button → `https://wa.me/962792803075`
- "Fastest response · Typically under 1 hour" note
- Contact info rows: email, phone, location, response time
- 3 promise badges: Free consultation / No commitment / Custom plan

**Right — Contact Form:**
- Full Name, Email Address
- Business Type (dropdown — 9 options)
- What Do You Need? (radio: Dashboard Only / Website Only / Both — Bundle)
- Message textarea
- Submit button — posts to `https://formsubmit.co/ajax/clarix.solutions.jo@gmail.com`
- Inline success/error messages (no page reload)

---

### Footer
**Top:** Logo + tagline + "📍 Amman, Jordan" | Link columns (Services / Company / Connect)
**Bottom bar:** © 2026 Clarix Solutions — Amman, Jordan | "Powered by data analytics"

---

## Key CSS Utilities

| Class | Purpose |
|---|---|
| `.text-gradient-anim` | Animated blue→cyan→teal cycling gradient text |
| `.text-gradient-blue` | Static blue→teal gradient text (used on Bundle card title) |
| `.btn-primary` | Blue gradient button with hover lift + shadow |
| `.btn-bundle` | Blue→cyan gradient (Bundle card CTA) |
| `.btn-whatsapp` | Green pill button (#25D366) |
| `.btn-theme-toggle` | Circular Sun/Moon icon button |
| `.no-scrollbar` | Hides scrollbar (mobile demos carousel) |
| `.demos-scroll-grid` | Flex on mobile → CSS grid on desktop |
| `.bundle-card` | Dark blue gradient card with blue glow border |
| `.svc-header-img` | `filter: none` — full natural brightness |

---

## Animation Notes

| Element | Animation |
|---|---|
| Every section | Framer Motion `whileInView` fade + slide up |
| Navbar links | Stagger fade-in from top on page load |
| Hero headline | Slides up on mount |
| Typewriter | Custom hook — types/deletes words in loop |
| KPI counters | Count up 0 → target over 1.5s, cubic-ease |
| Dashboard card | 3D tilt (mouseX/Y spring), hover scale 1.025 |
| SVG line chart | `pathLength` 0 → 1, peak dot pulses |
| Bar chart | Bars grow in then breathe (infinite loop) |
| Floating badge | Bobs vertically (0 → -8px → 0, 2.8s) |
| Service cards | Vanilla-JS 3D tilt (rotateX/Y up to 7deg) |
| Process line | Draws left-to-right on scroll (scaleX 0 → 1) |
| Demo cards | Fade-up stagger, image zoom + arrow shift on hover |
| Stats tiles | Scale 0.8 → 1 on enter, scale on hover |
| Cursor spotlight | Radial gradient follows mouse (600px, cyan in dark) |
