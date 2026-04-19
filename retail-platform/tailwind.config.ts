import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        // Supermarket
        market: { DEFAULT: '#1a6b3c', light: '#22c55e', dark: '#14532d' },
        // Jewelry
        gold: { DEFAULT: '#b8963e', light: '#d4af6b', dark: '#8b6914' },
        obsidian: { DEFAULT: '#0a0a0f', mid: '#141420', soft: '#1e1e2e' },
        // Bakery
        wheat: { DEFAULT: '#c8914a', light: '#e6c07a', dark: '#8b5e2a' },
        cream: { DEFAULT: '#fdf6e3', dark: '#f5e6c8' },
        // Clothes
        slate: { DEFAULT: '#334155', light: '#64748b', dark: '#0f172a' },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
