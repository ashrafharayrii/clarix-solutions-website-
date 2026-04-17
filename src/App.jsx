import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Industries from './components/Industries'
import About from './components/About'
import Urgency from './components/Urgency'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Particle mesh canvas — fixed behind all content */}
      <ParticleBackground />

      {/* All page content sits above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Industries />
        <About />
        <Urgency />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
