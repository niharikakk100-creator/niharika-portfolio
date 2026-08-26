import React from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalSkills from './components/TechnicalSkills'
import Services from './components/Services'
import Projects from './components/Projects'
import SoftSkills from './components/SoftSkills'
import Certifications from './components/Certifications'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import InteractiveCanvas from './components/InteractiveCanvas'

function App() {
  return (
    <>
      <Preloader />
      <InteractiveCanvas />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Services />
      <Projects />
      <SoftSkills />
      <Certifications />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
