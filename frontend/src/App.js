import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import AuraChat from './components/AuraChat';
import ExitIntentPopup from './components/ExitIntentPopup';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductFamilies from './pages/ProductFamilies';
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
import ApplicationDetail from './pages/ApplicationDetail';
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

// SLA Guide
import SlaGuide from './pages/SlaGuide';

// Design Assist & Digital Experience Architecture
import DesignAssist from './pages/DesignAssist';
import DigitalExperienceArchitecture from './pages/DigitalExperienceArchitecture';
import SpecifierToolkitLP from './pages/SpecifierToolkitLP';

// Technology Selector Quiz
import TechnologySelector from './pages/TechnologySelector';

// Digital Experience Detail Pages
import DeaPageDetail from './pages/DeaPageDetail';

// Viewing Distance Calculator
import ViewingDistanceCalculator from './pages/ViewingDistanceCalculator';

// Power Consumption Estimator
import PowerConsumptionEstimator from './pages/PowerConsumptionEstimator';

// Installation Guide
import InstallationGuide from './pages/InstallationGuide';

// Project Planner
import ProjectPlanner from './pages/ProjectPlanner';

// Phase 3: New Pages
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import FactoryTour from './pages/FactoryTour';

// Phase 4: Lead Generation & Partnerships
import DistributionPage from './pages/DistributionPage';

// LumiMorph Product Family
import { LumiMorphLanding, LumiMorphElitePage, LumiMorphGrandePage, LumiMorphMiniPage } from './pages/lumimorph';

// NaturaTex Product Line
import { NaturaTexPage, HoloVeilPage } from './pages/naturatex';

// SignaTouch Product Line
import { SignaTouchLanding, TouchKioskPage, SmartSignagePage, SelfServicePage } from './pages/signatouch';

// GlassMorph Product Line
import { GlassMorphLanding, SmartFilmPage, LedFilmPage, MediaGlassPage, SwitchableGlassPage, FlyingDisplayPage, HangingLedPage } from './pages/glassmorph';

// PixelVue Product Line
import { 
  PixelVueLanding, 
  PixelVueProductPage
} from './pages/pixelvue';

import SupplierRegistrationPage from './pages/SupplierRegistrationPage';
import TechnicalSupportPage from './pages/TechnicalSupportPage';

// Phase 5: Tools
import LedModuleCalculator from './pages/LedModuleCalculator';

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
import AdminSiteSettings from './admin/AdminSiteSettings';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminPerformance from './admin/AdminPerformance';
import AdminResources from './pages/admin/AdminResources';
import AdminTaxonomy from './pages/admin/AdminTaxonomy';
import AdminHomepage from './pages/admin/AdminHomepage';
import AdminBlog from './pages/admin/AdminBlog';
import AdminCaseStudies from './pages/admin/AdminCaseStudies';
import AdminPixelVue from './pages/admin/AdminPixelVue';
import AdminSolutions from './pages/admin/AdminSolutions';
import AdminCMS from './pages/admin/AdminCMS';
import AdminProductFamilies from './pages/admin/AdminProductFamilies';

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
      <Route path="/product-families" element={<><Navbar /><ProductFamilies /><Footer /><StickyCTA /></>} />
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
      <Route path="/applications/:slug" element={<><Navbar /><ApplicationDetail /><Footer /><StickyCTA /></>} />
      
      {/* LumiMorph Product Family - No Navbar/Footer for elegant design */}
      <Route path="/lumimorph" element={<LumiMorphLanding />} />
      <Route path="/lumimorph/elite" element={<LumiMorphElitePage />} />
      <Route path="/lumimorph/grande" element={<LumiMorphGrandePage />} />
      <Route path="/lumimorph/mini" element={<LumiMorphMiniPage />} />
      {/* Legacy redirect */}
      <Route path="/lumimorph-elite" element={<Navigate to="/lumimorph/elite" replace />} />
      
      {/* NaturaTex Product Line */}
      <Route path="/naturatex" element={<NaturaTexPage />} />
      <Route path="/naturatex/holoveil" element={<HoloVeilPage />} />
      
      {/* SignaTouch Product Line */}
      <Route path="/signatouch" element={<SignaTouchLanding />} />
      <Route path="/signatouch/touch-kiosk" element={<TouchKioskPage />} />
      <Route path="/signatouch/smart-signage" element={<SmartSignagePage />} />
      <Route path="/signatouch/self-service" element={<SelfServicePage />} />
      
      {/* GlassMorph Product Line */}
      <Route path="/glassmorph" element={<GlassMorphLanding />} />
      <Route path="/glassmorph/smart-film" element={<SmartFilmPage />} />
      <Route path="/glassmorph/led-film" element={<LedFilmPage />} />
      <Route path="/glassmorph/media-glass" element={<MediaGlassPage />} />
      <Route path="/glassmorph/switchable-glass" element={<SwitchableGlassPage />} />
      <Route path="/glassmorph/flying-display" element={<FlyingDisplayPage />} />
      <Route path="/glassmorph/hanging-led" element={<HangingLedPage />} />
      
      {/* PixelVue Product Line */}
      <Route path="/pixelvue" element={<PixelVueLanding />} />
      {/* Dynamic Product Detail Page - fetches from CMS */}
      <Route path="/pixelvue/:slug" element={<><Navbar /><PixelVueProductPage /><Footer /><StickyCTA /></>} />
      
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
      <Route path="/sla-guide" element={<><Navbar /><SlaGuide /><Footer /><StickyCTA /></>} />
      <Route path="/design-assist" element={<><Navbar /><DesignAssist /><Footer /><StickyCTA /></>} />
      <Route path="/digital-experience-architecture" element={<><Navbar /><DigitalExperienceArchitecture /><Footer /><StickyCTA /></>} />
      <Route path="/lp/specifier-toolkit" element={<SpecifierToolkitLP />} />
      <Route path="/technology-selector" element={<><Navbar /><TechnologySelector /><Footer /><StickyCTA /></>} />
      <Route path="/viewing-distance" element={<><Navbar /><ViewingDistanceCalculator /><Footer /><StickyCTA /></>} />
      <Route path="/power-estimator" element={<><Navbar /><PowerConsumptionEstimator /><Footer /><StickyCTA /></>} />
      <Route path="/installation-guide" element={<><Navbar /><InstallationGuide /><Footer /><StickyCTA /></>} />
      <Route path="/project-planner" element={<><Navbar /><ProjectPlanner /><Footer /><StickyCTA /></>} />
      <Route path="/digital-experience/:pageId" element={<><Navbar /><DeaPageDetail /><Footer /><StickyCTA /></>} />

      {/* Phase 3: New Pages */}
      <Route path="/services" element={<><Navbar /><Services /><Footer /><StickyCTA /></>} />
      <Route path="/blog" element={<><Navbar /><Blog /><Footer /><StickyCTA /></>} />
      <Route path="/blog/:slug" element={<><Navbar /><BlogPost /><Footer /><StickyCTA /></>} />
      <Route path="/faq" element={<><Navbar /><FAQ /><Footer /><StickyCTA /></>} />
      <Route path="/factory-tour" element={<><Navbar /><FactoryTour /><Footer /><StickyCTA /></>} />

      {/* Phase 4: Lead Generation & Partnerships */}
      <Route path="/distribution" element={<><Navbar /><DistributionPage /><Footer /><StickyCTA /></>} />
      <Route path="/supplier-registration" element={<><Navbar /><SupplierRegistrationPage /><Footer /><StickyCTA /></>} />
      <Route path="/technical-support" element={<><Navbar /><TechnicalSupportPage /><Footer /><StickyCTA /></>} />
      <Route path="/led-calculator" element={<><Navbar /><LedModuleCalculator /><Footer /><StickyCTA /></>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="inspirations" element={<AdminInspirations />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="performance" element={<AdminPerformance />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="site-settings" element={<AdminSiteSettings />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="taxonomy" element={<AdminTaxonomy />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="case-studies" element={<AdminCaseStudies />} />
        <Route path="pixelvue" element={<AdminPixelVue />} />
        <Route path="solutions-cms" element={<AdminSolutions />} />
        <Route path="cms" element={<AdminCMS />} />
        <Route path="product-families" element={<AdminProductFamilies />} />
      </Route>
    </Routes>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
      <SiteSettingsProvider>
      <AdminProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[var(--blx-bg)] text-[var(--blx-text)]">
          <AppRoutes />
          <AuraChat />
          <ExitIntentPopup />
        </div>
      </AdminProvider>
      </SiteSettingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
