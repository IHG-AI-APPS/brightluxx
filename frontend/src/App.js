import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import AuraChat from './components/AuraChat';
import ExitIntentPopup from './components/ExitIntentPopup';
import PageLoader from './components/PageLoader';

// Critical path - loaded immediately (Home, Products, Contact)
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Code-split pages - lazy loaded for performance
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ProductFamilies = lazy(() => import('./pages/ProductFamilies'));
const Inspirations = lazy(() => import('./pages/Inspirations'));
const Projects = lazy(() => import('./pages/Projects'));
const ProductConfigurator = lazy(() => import('./pages/ProductConfigurator'));
const VirtualShowroom = lazy(() => import('./pages/VirtualShowroom'));
const ScreenCalculator = lazy(() => import('./pages/ScreenCalculator'));
const TechGuide = lazy(() => import('./pages/TechGuide'));
const Compare = lazy(() => import('./pages/Compare'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const About = lazy(() => import('./pages/About'));

// Knowledge Base - Lazy loaded
const KnowledgeIndex = lazy(() => import('./pages/knowledge/KnowledgeIndex'));
const CobVsMipVsSmd = lazy(() => import('./pages/knowledge/CobVsMipVsSmd'));
const PixelPitchGuide = lazy(() => import('./pages/knowledge/PixelPitchGuide'));
const BrightnessNitsGuide = lazy(() => import('./pages/knowledge/BrightnessNitsGuide'));
const IpRatingGuide = lazy(() => import('./pages/knowledge/IpRatingGuide'));
const RefreshRateGuide = lazy(() => import('./pages/knowledge/RefreshRateGuide'));
const ProcessingCalibrationGuide = lazy(() => import('./pages/knowledge/ProcessingCalibrationGuide'));
const CmsMultiSiteGuide = lazy(() => import('./pages/knowledge/CmsMultiSiteGuide'));

// Applications - Lazy loaded
const ApplicationsIndex = lazy(() => import('./pages/ApplicationsIndex'));
const ApplicationDetail = lazy(() => import('./pages/ApplicationDetail'));
const ApplicationLanding = lazy(() => import('./pages/ApplicationLanding'));
const ForArchitects = lazy(() => import('./pages/ForArchitects'));

// Contractors - Lazy loaded
const ValueEngineering = lazy(() => import('./pages/ValueEngineering'));
const ContractorPage = lazy(() => import('./pages/ContractorPage'));
const SpecSubstitution = lazy(() => import('./pages/SpecSubstitution'));
const BudgetEstimator = lazy(() => import('./pages/BudgetEstimator'));
const ResourceLibrary = lazy(() => import('./pages/ResourceLibrary'));

// Latest Tech - Lazy loaded
const LatestTechIndex = lazy(() => import('./pages/LatestTechIndex'));
const LatestTechDetail = lazy(() => import('./pages/LatestTechDetail'));

// Technology Pillar Pages - Lazy loaded
const TechnologyIndex = lazy(() => import('./pages/TechnologyIndex'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));

// Case Studies - Lazy loaded
const CaseStudiesIndex = lazy(() => import('./pages/CaseStudiesIndex'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));

// CPD Programme - Lazy loaded
const CpdProgramme = lazy(() => import('./pages/CpdProgramme'));

// SLA Guide - Lazy loaded
const SlaGuide = lazy(() => import('./pages/SlaGuide'));

// Design Assist & Digital Experience Architecture - Lazy loaded
const DesignAssist = lazy(() => import('./pages/DesignAssist'));
const DigitalExperienceArchitecture = lazy(() => import('./pages/DigitalExperienceArchitecture'));
const SpecifierToolkitLP = lazy(() => import('./pages/SpecifierToolkitLP'));

// Technology Selector Quiz - Lazy loaded
const TechnologySelector = lazy(() => import('./pages/TechnologySelector'));

// Digital Experience Detail Pages - Lazy loaded
const DeaPageDetail = lazy(() => import('./pages/DeaPageDetail'));

// Tools - Lazy loaded
const ViewingDistanceCalculator = lazy(() => import('./pages/ViewingDistanceCalculator'));
const PowerConsumptionEstimator = lazy(() => import('./pages/PowerConsumptionEstimator'));
const InstallationGuide = lazy(() => import('./pages/InstallationGuide'));
const ProjectPlanner = lazy(() => import('./pages/ProjectPlanner'));

// Phase 3: New Pages - Lazy loaded
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));
const FactoryTour = lazy(() => import('./pages/FactoryTour'));

// Phase 4: Lead Generation & Partnerships - Lazy loaded
const DistributionPage = lazy(() => import('./pages/DistributionPage'));
const SupplierRegistrationPage = lazy(() => import('./pages/SupplierRegistrationPage'));
const TechnicalSupportPage = lazy(() => import('./pages/TechnicalSupportPage'));
const LedModuleCalculator = lazy(() => import('./pages/LedModuleCalculator'));

// LumiMorph Product Family - Lazy loaded
const LumiMorphLanding = lazy(() => import('./pages/lumimorph').then(m => ({ default: m.LumiMorphLanding })));
const LumiMorphElitePage = lazy(() => import('./pages/lumimorph').then(m => ({ default: m.LumiMorphElitePage })));
const LumiMorphGrandePage = lazy(() => import('./pages/lumimorph').then(m => ({ default: m.LumiMorphGrandePage })));
const LumiMorphMiniPage = lazy(() => import('./pages/lumimorph').then(m => ({ default: m.LumiMorphMiniPage })));

// NaturaTex Product Line - Lazy loaded
const NaturaTexPage = lazy(() => import('./pages/naturatex').then(m => ({ default: m.NaturaTexPage })));
const HoloVeilPage = lazy(() => import('./pages/naturatex').then(m => ({ default: m.HoloVeilPage })));

// SignaTouch Product Line - Lazy loaded
const SignaTouchLanding = lazy(() => import('./pages/signatouch').then(m => ({ default: m.SignaTouchLanding })));
const TouchKioskPage = lazy(() => import('./pages/signatouch').then(m => ({ default: m.TouchKioskPage })));
const SmartSignagePage = lazy(() => import('./pages/signatouch').then(m => ({ default: m.SmartSignagePage })));
const SelfServicePage = lazy(() => import('./pages/signatouch').then(m => ({ default: m.SelfServicePage })));

// GlassMorph Product Line - Lazy loaded
const GlassMorphLanding = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.GlassMorphLanding })));
const SmartFilmPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.SmartFilmPage })));
const LedFilmPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.LedFilmPage })));
const MediaGlassPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.MediaGlassPage })));
const SwitchableGlassPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.SwitchableGlassPage })));
const FlyingDisplayPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.FlyingDisplayPage })));
const HangingLedPage = lazy(() => import('./pages/glassmorph').then(m => ({ default: m.HangingLedPage })));

// PixelVue Product Line - Lazy loaded
const PixelVueLanding = lazy(() => import('./pages/pixelvue').then(m => ({ default: m.PixelVueLanding })));
const PixelVueProductPage = lazy(() => import('./pages/pixelvue').then(m => ({ default: m.PixelVueProductPage })));

// Admin Context - Always loaded
import { AdminProvider, useAdmin } from './admin/AdminContext';
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./admin/AdminProducts'));
const AdminInspirations = lazy(() => import('./admin/AdminInspirations'));
const AdminProjects = lazy(() => import('./admin/AdminProjects'));
const AdminLeads = lazy(() => import('./admin/AdminLeads'));
const AdminSettings = lazy(() => import('./admin/AdminSettings'));
const AdminSiteSettings = lazy(() => import('./admin/AdminSiteSettings'));
const AdminAnalytics = lazy(() => import('./admin/AdminAnalytics'));
const AdminPerformance = lazy(() => import('./admin/AdminPerformance'));
const AdminResources = lazy(() => import('./pages/admin/AdminResources'));
const AdminTaxonomy = lazy(() => import('./pages/admin/AdminTaxonomy'));
const AdminHomepage = lazy(() => import('./pages/admin/AdminHomepage'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminCaseStudies = lazy(() => import('./pages/admin/AdminCaseStudies'));
const AdminPixelVue = lazy(() => import('./pages/admin/AdminPixelVue'));
const AdminSolutions = lazy(() => import('./pages/admin/AdminSolutions'));
const AdminCMS = lazy(() => import('./pages/admin/AdminCMS'));
const AdminProductFamilies = lazy(() => import('./pages/admin/AdminProductFamilies'));

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin();
  if (loading) return <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin" /></div>;
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
      
      {/* 404 Catch-all - Must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
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
