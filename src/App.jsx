import { createContext, useContext, useState, useEffect } from 'react'
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
