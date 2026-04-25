import { createContext, useContext, useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Demos from './components/Demos'
import About from './components/About'
import Urgency from './components/Urgency'
import Contact from './components/Contact'
import Footer from './components/Footer'

export const ThemeContext = createContext({ isDarkMode: true, toggleTheme: () => {} })
export const useTheme = () => useContext(ThemeContext)

function CursorSpotlight({ isDarkMode }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const color = isDarkMode ? 'rgba(59,130,246,0.07)' : 'rgba(37,99,235,0.05)'
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, ${color}, transparent 65%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isDarkMode])
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'transparent', transition: 'background 0.08s linear',
      }}
    />
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <CursorSpotlight isDarkMode={isDarkMode} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Demos />
        <About />
        <Urgency />
        <Contact />
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}
