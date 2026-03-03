import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

import Home from './pages/Home';
import Products from './pages/Products';
import Inspirations from './pages/Inspirations';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProductConfigurator from './pages/ProductConfigurator';
import VirtualShowroom from './pages/VirtualShowroom';
import ScreenCalculator from './pages/ScreenCalculator';
import TechGuide from './pages/TechGuide';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--blx-bg)] text-[var(--blx-text)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inspirations" element={<Inspirations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/configurator" element={<ProductConfigurator />} />
          <Route path="/showroom" element={<VirtualShowroom />} />
          <Route path="/calculator" element={<ScreenCalculator />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/tech-guide" element={<TechGuide />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <StickyCTA />
      </div>
    </Router>
  );
}

export default App;
