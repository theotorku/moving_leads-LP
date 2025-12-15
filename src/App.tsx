import { useState } from 'react'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import ROICalculator from './components/ROICalculator'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Hero />
      <Testimonials />
      <ROICalculator />
      <CTA />
      <Footer />
    </div>
  )
}

export default App

