import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

// Pages
import Home from './pages/Home';
import TechnologiesHub from './pages/TechnologiesHub';
import TechnologyDetail from './pages/TechnologyDetail';
import ApplicationsHub from './pages/ApplicationsHub';
import ApplicationDetail from './pages/ApplicationDetail';
import CaseStudiesHub from './pages/CaseStudiesHub';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Updates from './pages/Updates';
import UpdateDetail from './pages/UpdateDetail';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--blx-bg)] text-[var(--blx-text)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<TechnologiesHub />} />
          <Route path="/technologies/:slug" element={<TechnologyDetail />} />
          <Route path="/applications" element={<ApplicationsHub />} />
          <Route path="/applications/:slug" element={<ApplicationDetail />} />
          <Route path="/case-studies" element={<CaseStudiesHub />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/updates/:slug" element={<UpdateDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <StickyCTA />
      </div>
    </Router>
  );
}

export default App;