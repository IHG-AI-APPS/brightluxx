import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Inspirations from './pages/Inspirations';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProductConfigurator from './pages/ProductConfigurator';
import VirtualShowroom from './pages/VirtualShowroom';
import ScreenCalculator from './pages/ScreenCalculator';
import TechGuide from './pages/TechGuide';
import Compare from './pages/Compare';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import About from './pages/About';

// Knowledge Base
import KnowledgeIndex from './pages/knowledge/KnowledgeIndex';
import CobVsMipVsSmd from './pages/knowledge/CobVsMipVsSmd';
import PixelPitchGuide from './pages/knowledge/PixelPitchGuide';
import BrightnessNitsGuide from './pages/knowledge/BrightnessNitsGuide';
import IpRatingGuide from './pages/knowledge/IpRatingGuide';
import RefreshRateGuide from './pages/knowledge/RefreshRateGuide';
import ProcessingCalibrationGuide from './pages/knowledge/ProcessingCalibrationGuide';
import CmsMultiSiteGuide from './pages/knowledge/CmsMultiSiteGuide';

// Applications
import ApplicationsIndex from './pages/ApplicationsIndex';
import ApplicationLanding from './pages/ApplicationLanding';
import ForArchitects from './pages/ForArchitects';

// Contractors
import ValueEngineering from './pages/ValueEngineering';
import ContractorPage from './pages/ContractorPage';
import SpecSubstitution from './pages/SpecSubstitution';
import BudgetEstimator from './pages/BudgetEstimator';
import ResourceLibrary from './pages/ResourceLibrary';

// Latest Tech
import LatestTechIndex from './pages/LatestTechIndex';
import LatestTechDetail from './pages/LatestTechDetail';

// Technology Pillar Pages
import TechnologyIndex from './pages/TechnologyIndex';
import TechnologyPage from './pages/TechnologyPage';

// Case Studies
import CaseStudiesIndex from './pages/CaseStudiesIndex';
import CaseStudyDetail from './pages/CaseStudyDetail';

// CPD Programme
import CpdProgramme from './pages/CpdProgramme';

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
import AdminAnalytics from './admin/AdminAnalytics';
import AdminPerformance from './admin/AdminPerformance';

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
      <Route path="/products/:slug" element={<><Navbar /><ProductDetail /><Footer /><StickyCTA /></>} />
      <Route path="/inspirations" element={<><Navbar /><Inspirations /><Footer /><StickyCTA /></>} />
      <Route path="/projects" element={<><Navbar /><Projects /><Footer /><StickyCTA /></>} />
      <Route path="/configurator" element={<><Navbar /><ProductConfigurator /><Footer /><StickyCTA /></>} />
      <Route path="/showroom" element={<><Navbar /><VirtualShowroom /><Footer /><StickyCTA /></>} />
      <Route path="/calculator" element={<><Navbar /><ScreenCalculator /><Footer /><StickyCTA /></>} />
      <Route path="/compare" element={<><Navbar /><Compare /><Footer /><StickyCTA /></>} />
      <Route path="/tech-guide" element={<><Navbar /><TechGuide /><Footer /><StickyCTA /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /><StickyCTA /></>} />
      <Route path="/solutions" element={<><Navbar /><Solutions /><Footer /><StickyCTA /></>} />
      <Route path="/solutions/:id" element={<><Navbar /><SolutionDetail /><Footer /><StickyCTA /></>} />
      <Route path="/about" element={<><Navbar /><About /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge" element={<><Navbar /><KnowledgeIndex /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/cob-vs-mip-vs-smd" element={<><Navbar /><CobVsMipVsSmd /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/pixel-pitch-guide" element={<><Navbar /><PixelPitchGuide /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/brightness-nits-guide" element={<><Navbar /><BrightnessNitsGuide /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/ip-rating-guide" element={<><Navbar /><IpRatingGuide /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/refresh-rate-guide" element={<><Navbar /><RefreshRateGuide /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/processing-calibration" element={<><Navbar /><ProcessingCalibrationGuide /><Footer /><StickyCTA /></>} />
      <Route path="/knowledge/cms-multi-site" element={<><Navbar /><CmsMultiSiteGuide /><Footer /><StickyCTA /></>} />
      <Route path="/applications" element={<><Navbar /><ApplicationsIndex /><Footer /><StickyCTA /></>} />
      <Route path="/applications/:appId" element={<><Navbar /><ApplicationLanding /><Footer /><StickyCTA /></>} />
      <Route path="/for-architects" element={<><Navbar /><ForArchitects /><Footer /><StickyCTA /></>} />
      <Route path="/value-engineering" element={<><Navbar /><ValueEngineering /><Footer /><StickyCTA /></>} />
      <Route path="/contractors/:pageId" element={<><Navbar /><ContractorPage /><Footer /><StickyCTA /></>} />
      <Route path="/spec-substitution" element={<><Navbar /><SpecSubstitution /><Footer /><StickyCTA /></>} />
      <Route path="/budget-estimator" element={<><Navbar /><BudgetEstimator /><Footer /><StickyCTA /></>} />
      <Route path="/resources" element={<><Navbar /><ResourceLibrary /><Footer /><StickyCTA /></>} />
      <Route path="/latest-tech" element={<><Navbar /><LatestTechIndex /><Footer /><StickyCTA /></>} />
      <Route path="/latest-tech/:techId" element={<><Navbar /><LatestTechDetail /><Footer /><StickyCTA /></>} />
      <Route path="/technology" element={<><Navbar /><TechnologyIndex /><Footer /><StickyCTA /></>} />
      <Route path="/technology/:techId" element={<><Navbar /><TechnologyPage /><Footer /><StickyCTA /></>} />
      <Route path="/case-studies" element={<><Navbar /><CaseStudiesIndex /><Footer /><StickyCTA /></>} />
      <Route path="/case-studies/:caseId" element={<><Navbar /><CaseStudyDetail /><Footer /><StickyCTA /></>} />
      <Route path="/cpd-programme" element={<><Navbar /><CpdProgramme /><Footer /><StickyCTA /></>} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="inspirations" element={<AdminInspirations />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="performance" element={<AdminPerformance />} />
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
