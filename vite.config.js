import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const DEMOS = ['coffee house', 'resorant', 'jewllery', 'logistics', 'supermarket', 'bakeries', 'retail']

// Serve demo folders under /clarix/<demo>/ during dev so paths match GitHub Pages
function serveDemosPlugin() {
  return {
    name: 'serve-demos',
    configureServer(server) {
      DEMOS.forEach(demo => {
        const demoDir = path.resolve(__dirname, demo)
        server.middlewares.use(`/clarix-solutions-website-/${demo}`, (req, res, next) => {
          const filePath = path.join(demoDir, req.url === '/' ? '/index.html' : req.url)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css'
              : filePath.endsWith('.js') ? 'text/javascript'
              : filePath.endsWith('.html') ? 'text/html'
              : 'application/octet-stream')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      })
    },
  }
}

export default defineConfig({
  base: '/clarix-solutions-website-/',
  plugins: [
    react(),
    tailwindcss(),
    serveDemosPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
