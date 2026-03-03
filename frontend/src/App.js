import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Solutions from './pages/Solutions';
import About from './pages/About';

// Admin
import { AdminProvider, useAdmin } from './admin/AdminContext';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminInspirations from './admin/AdminInspirations';
import AdminProjects from './admin/AdminProjects';
import AdminLeads from './admin/AdminLeads';
import AdminSettings from './admin/AdminSettings';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin();
  if (loading) return <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin" /></div>;
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Site */}
      <Route path="/" element={<><Navbar /><Home /><Footer /><StickyCTA /></>} />
      <Route path="/products" element={<><Navbar /><Products /><Footer /><StickyCTA /></>} />
      <Route path="/inspirations" element={<><Navbar /><Inspirations /><Footer /><StickyCTA /></>} />
      <Route path="/projects" element={<><Navbar /><Projects /><Footer /><StickyCTA /></>} />
      <Route path="/configurator" element={<><Navbar /><ProductConfigurator /><Footer /><StickyCTA /></>} />
      <Route path="/showroom" element={<><Navbar /><VirtualShowroom /><Footer /><StickyCTA /></>} />
      <Route path="/calculator" element={<><Navbar /><ScreenCalculator /><Footer /><StickyCTA /></>} />
      <Route path="/compare" element={<><Navbar /><Compare /><Footer /><StickyCTA /></>} />
      <Route path="/tech-guide" element={<><Navbar /><TechGuide /><Footer /><StickyCTA /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /><StickyCTA /></>} />
      <Route path="/solutions" element={<><Navbar /><Solutions /><Footer /><StickyCTA /></>} />
      <Route path="/about" element={<><Navbar /><About /><Footer /><StickyCTA /></>} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="inspirations" element={<AdminInspirations />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <div className="min-h-screen bg-[var(--blx-bg)] text-[var(--blx-text)]">
          <AppRoutes />
        </div>
      </AdminProvider>
    </Router>
  );
}

export default App;
