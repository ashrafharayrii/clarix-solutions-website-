# Clarix Solutions Website

A professional React + Vite landing page for Clarix Solutions, with static HTML demo pages for each industry.

---

## How to Edit the Website Safely

### Before You Start — The Golden Rule

> **Never edit `dist/` files directly.** That folder is auto-generated. Your changes will be overwritten the next time you build. Always edit the source files listed below.

---

## Project Structure

```
website/
├── src/                        ← React app source (main website)
│   ├── components/             ← Individual page sections
│   │   ├── Hero.jsx            ← Hero banner (headline, buttons, stats)
│   │   ├── Services.jsx        ← 3 service cards (Dashboard, Website, Bundle)
│   │   ├── Industries.jsx      ← Industry cards linking to demos
│   │   ├── About.jsx           ← About section
│   │   ├── Contact.jsx         ← Contact form
│   │   ├── Footer.jsx          ← Footer
│   │   └── ...                 ← Other components
│   └── index.css               ← ALL styling for the main website
├── coffee house/               ← Demo page for coffee houses
├── bakeries/                   ← Demo page for bakeries
├── resorant/                   ← Demo page for restaurants
├── retail/                     ← Demo page for retail stores
├── supermarket/                ← Demo page for supermarkets
├── jewllery/                   ← Demo page for jewelry shops
├── logistics/                  ← Demo page for pharmacies/logistics
├── dist/                       ← Built website (DO NOT edit — auto-generated)
├── package.json
└── vite.config.js
```

---

## Common Edits

### Change Text / Headlines
Open the relevant file in `src/components/`:
- **Hero headline** → `src/components/Hero.jsx` (around line 332)
- **Service descriptions** → `src/components/Services.jsx`
- **Industry list** → `src/components/Industries.jsx`
- **Contact info** → `src/components/Contact.jsx`
- **Footer** → `src/components/Footer.jsx`

### Change Colors
Open `src/index.css` and look at the top for CSS variables:
```css
--electric: #2B68E9;   /* blue — primary color */
--teal:     #10B981;   /* green accent */
--bg:       #030A19;   /* dark background */
```
Change the hex values there and it updates everywhere.

### Change a Demo Page
Each demo is a self-contained HTML file. Edit directly:
- `coffee house/index.html`
- `bakeries/index.html`
- `resorant/index.html`
- `retail/index.html`
- `supermarket/index.html`
- `jewllery/index.html`
- `logistics/index.html`

Demo pages don't need a build step — just edit and push.

---

## Publishing Changes to the Live Website

After editing any file in `src/`, you **must build and deploy**:

```bash
# Step 1 — install dependencies (only needed once)
npm install

# Step 2 — build the site
npm run build

# Step 3 — push to GitHub
git add -A
git commit -m "describe your change here"
git push origin main
git push new-repo main
```

The live site is served from the `dist/` folder via GitHub Pages at:
`https://ashrafharayrii.github.io/clarix-solutions-website-/`

---

## Running Locally (Preview Before Publishing)

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser. Changes to `src/` files show live without rebuilding.

---

## Safe Editing Checklist

- Edit source files in `src/` or the demo HTML folders — never `dist/`
- Test locally with `npm run dev` before publishing
- Run `npm run build` after every change to `src/`
- Push both `origin` and `new-repo` after building
- Keep images hosted on Unsplash or a CDN — don't add large image files to the repo

---

## What NOT to Touch

| File/Folder | Why |
|---|---|
| `dist/` | Auto-generated — deleted on next build |
| `vite.config.js` | Build configuration — changing it can break the site |
| `package.json` | Dependency list — only change to add/remove packages |
| `node_modules/` | Dependencies — never edit, never commit |
