import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import VisionMission from './components/VisionMission.jsx'
import Products from './components/Products.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // reducedMotion="user": framer-motion skips transform animations when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-navy-900 text-ink">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <VisionMission />
          <Products />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
