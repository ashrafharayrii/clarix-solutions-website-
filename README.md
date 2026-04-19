# Clarix Solutions — Website Portfolio

Multi-brand web platform built across multiple sessions. Contains standalone HTML sites, a Next.js enterprise platform, and a shared design system.

---

## Project Structure

```
website/
├── coffee house/          ← Coffee shop website (complete)
├── fastfood/              ← FORGE Premium Burgers (complete)
├── retail-platform/       ← Next.js 14 enterprise app (in progress)
├── logistics/             ← Existing logistics dashboard
├── supermarket/           ← Legacy static supermarket site
├── jewllery/              ← Legacy static jewelry site
├── bakeries/              ← Legacy static bakery site
└── .claude/skills/        ← ui-ux-pro-max design system
```

---

## What Was Built

### 1. Coffee House Website — `coffee house/`
**Status: Complete**

A full premium coffee shop website for "Clarix Coffee House."

**Files:**
- `coffee house/index.html` — Main storefront
- `coffee house/dashboard.html` — BI management dashboard
- `coffee house/js/main.js` — Tab switching, scroll animations, counters, lightbox
- `coffee house/css/` — Styles

**Features:**
- Sticky navbar with scroll effect
- Hero section with stats (counters animate on scroll)
- Menu with 5 category tabs: **Hot Drinks**, Cold Drinks, Juices, Smoothies, Snacks
- Hot Drinks tab includes non-coffee items: Rich Hot Chocolate, Fresh Mint Tea
- All Unsplash images fixed (12 broken shortcode URLs replaced with proper `photo-XXXXX` format)
- Gallery with lightbox
- Newsletter form
- Dashboard with Chart.js area/bar/line/donut charts, KPI cards, dark theme

**Fixes Applied:**
- Renamed "Hot Coffee" → "Hot Drinks" throughout HTML and footer
- Fixed broken Unsplash URLs for: Americano, Turkish Coffee, Hazelnut Macchiato, Cold Brew, Iced Matcha, Iced Mocha, Mango Passion, Classic Lemonade, Avocado Smoothie, Pomegranate, Pineapple Coconut, Carrot Ginger
- Replaced Flat White with Rich Hot Chocolate (more inclusive hot drinks menu)
- Replaced Cortado with Fresh Mint Tea (herbal option)

---

### 2. FORGE Premium Burgers — `fastfood/`
**Status: Complete**

A professional fast-food brand website for "FORGE Premium Burgers."

**Files:**
- `fastfood/index.html` — Storefront (complete)
- `fastfood/dashboard.html` — BI management dashboard (complete)

**Design:**
- Color palette: Navy `#1E3A5F` + Amber `#D97706`
- Fonts: Barlow Condensed (headings) + Inter (body)
- Zero emojis — SVG icons only throughout
- Tailwind CDN with custom CSS variables

**`fastfood/index.html` Features:**
- Sticky navbar: transparent → dark on scroll
- Hero: full-screen navy, headline "CRAFTED. BOLD. UNCOMPROMISING.", stats (2.4M+ Burgers, 4.9 Rating, 12 Locations), Unsplash hero image, floating price badge, "Ready in 8–12 min" card
- Value props strip (4 columns with SVG icons)
- Menu with 5 tabs — 21 items total:
  - **Burgers:** Classic Forge $8.99, Double Smash $11.49, Crispy Chicken $9.99, Forge Signature $14.99, Mushroom Swiss $10.49, Spicy Ghost $11.99
  - **Sides:** Loaded Fries $5.99, Onion Rings $4.99, Sweet Potato Fries $5.49, Mozzarella Sticks $5.99
  - **Shakes:** Classic Vanilla $5.99, Dark Chocolate $6.49, Salted Caramel $6.49, Oreo Crunch $6.99
  - **Drinks:** Fresh Lemonade $3.99, Iced Tea $2.99, Soft Drinks $2.49, Sparkling Water $1.99
  - **Salads:** Caesar Salad $8.99, Grilled Chicken Bowl $10.99, Garden Fresh $9.49
- About section with 4 checkpoints
- 3 location cards
- Professional footer

**`fastfood/dashboard.html` Features:**
- Dark theme: `#0F172A` bg, `#1E293B` sidebar/cards
- Left sidebar (260px) with SVG nav icons
- Live clock (updates every second)
- **Panel 1 — Overview:** 4 KPI cards, Revenue & Profit Area Chart (Chart.js), Top Items Horizontal Bar Chart, Recent Transactions table
- **Panel 2 — Revenue:** Line chart (Revenue vs Cost vs Profit), Donut chart by category, Revenue breakdown table with margins
- **Panel 3 — Inventory:** 4 mini stat cards, Stock Levels bar chart, Inventory table with dynamic status badges (`if stock < reorderAt → "Low Stock"/"Critical"`)
- **Panel 4 — Customers (CRM):** 4 KPI cards, live search/filter by name/email/tier, table with Bronze/Silver/Gold/Platinum tier badges

---

### 3. Retail Platform — `retail-platform/`
**Status: IN PROGRESS — See "Where We Stopped" section**

A Next.js 14 enterprise application with 4 retail storefronts and 4 BI dashboards sharing a single multi-tenant schema.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (ComposedChart, PieChart, etc.)
- Framer Motion
- Lucide React (icons, no emojis)
- Supabase (client configured, mock data by default)
- Radix UI (Dialog, Select, Tabs, Tooltip)

**Files Created:**

```
retail-platform/
├── package.json               ← All dependencies listed
├── next.config.ts             ← Unsplash image domains whitelisted
├── tailwind.config.ts         ← Custom brand color tokens
├── tsconfig.json
├── postcss.config.mjs
├── .env.local.example         ← Supabase env vars template
│
├── lib/
│   ├── types.ts               ← Full multi-tenant TypeScript schema
│   ├── data.ts                ← Complete mock data (all 4 sectors)
│   ├── analytics.ts           ← Sell-Through Rate, Inventory Turnover, Logistics Efficiency
│   ├── supabase.ts            ← Typed Supabase client + query helpers
│   └── utils.ts               ← cn() helper (clsx + tailwind-merge)
│
├── hooks/
│   ├── useLogisticsSync.ts    ← Polls logistics API every 30s, updates stock on delivery
│   └── useInventory.ts        ← recordProduction(), applyDelivery(), sellUnit()
│
├── app/
│   ├── globals.css            ← Tailwind + Google Fonts + custom keyframes
│   ├── layout.tsx             ← Root layout
│   ├── page.tsx               ← Portal hub (links to all 4 stores + dashboards)
│   ├── supermarket/page.tsx   ← Supermarket storefront (complete)
│   ├── jewelry/page.tsx       ← Jewelry luxury storefront (complete)
│   ├── bakery/page.tsx        ← Bakery storefront with Live Oven bar (complete)
│   ├── clothes/page.tsx       ← Fashion storefront with Size/Color Matrix (complete)
│   └── dashboard/
│       ├── layout.tsx         ← Dashboard shell with Sidebar
│       ├── page.tsx           ← Redirects to /dashboard/supermarket
│       ├── supermarket/page.tsx  ← Full analytics dashboard (complete)
│       ├── jewelry/page.tsx      ← Full analytics dashboard (complete)
│       ├── bakery/page.tsx       ← Dashboard + Production Calculator + Oven Status (complete)
│       ├── clothes/page.tsx      ← Dashboard + Return Rate Pie Chart (complete)
│       └── logistics/page.tsx    ← Cross-sector logistics tracker (complete)
│
└── components/
    ├── ui/
    │   ├── button.tsx         ← CVA-based with luxury/market/bakery variants
    │   ├── card.tsx           ← Card, CardHeader, CardTitle, CardContent
    │   ├── badge.tsx          ← Multiple variants incl. quick-sale, organic, tier
    │   └── dialog.tsx         ← Radix Dialog with PDF viewer pattern
    └── dashboard/
        ├── Sidebar.tsx        ← Dark sidebar, active route highlighting
        ├── RevenueChart.tsx   ← Recharts ComposedChart: Sales Bar + Margin Line
        ├── StockHealthTable.tsx ← Sortable table, depletion rate progress bars
        └── LogisticsTracker.tsx ← Vertical stepper: Pending → Dispatched → Transit → Arrived → Shelved
```

**Sector Details:**

| Sector | Storefront | Dashboard Special Feature |
|--------|-----------|--------------------------|
| Supermarket | Freshness Badge (Quick Sale if expiry < 3 days), cart sidebar | Stock alerts, logistics sync indicator |
| Jewelry | Luxury dark theme, "View Certification" PDF modal (GIA/IGI data) | Certification status panel |
| Bakery | Live Oven Status bar (4 ovens, real-time temps/progress) | Production Calculator (subtracts raw materials on produce) |
| Fashion | Size/Color Matrix selector (must select both to add to bag) | Return Rate by Size Pie Chart (Recharts) |

**Analytics Engine (`lib/analytics.ts`):**
```typescript
sellThroughRate  = (unitsSold / totalInventory) * 100
inventoryTurnover = costOfGoodsSold / avgInventoryValue
logisticsEfficiency = (deliveredAt - dispatchedAt) in hours
```

**Multi-Tenant Schema (`lib/types.ts`):**
- Single `Product` interface with `tenant_id: 'supermarket' | 'jewelry' | 'bakery' | 'clothes'`
- `metadata` field carries sector-specific data (expiry, certifications, raw_materials, sizes/colors)
- Same `InventoryItem`, `LogisticsOrder`, `SalesDataPoint` interfaces used across all 4 sectors

**Supabase / Logistics Webhook:**
- `lib/supabase.ts` — typed query helpers for products, inventory, logistics
- `hooks/useLogisticsSync.ts` — polls every 30s, filters by `tenant_id`
- Webhook endpoint pattern shown in logistics dashboard:
  ```
  POST /api/logistics/webhook
  { order_id, tenant_id, status: "arrived", actual_delivery }
  ```

---

## Where We Stopped

### Last Completed Action
All 33 core files for `retail-platform/` were written. The final file written was `retail-platform/app/clothes/page.tsx`.

### What Is NOT Done Yet

#### `retail-platform/` — Needs `npm install` to run:
```bash
cd retail-platform
npm install
npm run dev
# → http://localhost:3000
```

#### Missing / Not Yet Built:
1. **`retail-platform/app/api/logistics/webhook/route.ts`** — The actual Next.js Route Handler that receives webhook POST from the logistics app and updates Supabase
2. **Framer Motion animations** — The `motion.div` wrappers for page transitions (package is in `package.json` but not yet applied to pages)
3. **`retail-platform/app/supermarket/layout.tsx`** and other sector layouts — Currently pages work without them; layouts would add persistent per-sector navbars
4. **Real Supabase connection** — Currently runs on mock data from `lib/data.ts`. To connect real Supabase:
   - Copy `.env.local.example` → `.env.local`
   - Add your Supabase URL and anon key
   - Run the SQL schema (not yet written — needs `CREATE TABLE products`, `inventory`, `logistics_orders`)
5. **Supabase SQL Schema** — The database tables matching `lib/types.ts` haven't been written yet
6. **`components/dashboard/Header.tsx`** — Dashboard top bar with search, notifications, date (sidebar exists but no top header component)
7. **Mobile responsiveness** — Pages are desktop-first; mobile breakpoints partially applied via Tailwind but not fully tested
8. **Pre-order / Checkout flow** — Add to cart exists on all storefronts but checkout pages don't exist

---

## Design System

The `ui-ux-pro-max` skill lives at `.claude/skills/ui-ux-pro-max/`. Run searches with:
```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py "your query" --design-system -p "Project Name"
```

---

## Git Remotes

| Remote | URL |
|--------|-----|
| `origin` | https://github.com/ashrafharayrii/clarix.git |
| `new-repo` | https://github.com/ashrafharayrii/clarix-solutions-website-.git |

---

## How to Run Each Project

### Coffee House (static)
Open `coffee house/index.html` in a browser — no build step needed.

### FORGE Burgers (static)
Open `fastfood/index.html` in a browser — no build step needed.

### Retail Platform (Next.js)
```bash
cd retail-platform
npm install          # First time only
npm run dev          # → http://localhost:3000
```

Routes:
- `/` — Portal hub
- `/supermarket` — Supermarket store
- `/jewelry` — Jewelry store
- `/bakery` — Bakery store
- `/clothes` — Fashion store
- `/dashboard/supermarket` — Supermarket dashboard
- `/dashboard/jewelry` — Jewelry dashboard
- `/dashboard/bakery` — Bakery dashboard
- `/dashboard/clothes` — Fashion dashboard
- `/dashboard/logistics` — Cross-sector logistics tracker
