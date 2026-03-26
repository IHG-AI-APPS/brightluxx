import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';
import './styles/apple-design.css';

import PublicLayout from './components/PublicLayout';
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

// SEO Landing Pages - Lazy loaded
const LEDScreenDubai = lazy(() => import('./pages/LEDScreenDubai'));
const GovernmentSolutions = lazy(() => import('./pages/GovernmentSolutions'));
const AbuDhabiPage = lazy(() => import('./pages/AbuDhabiPage'));
const SaudiArabiaPage = lazy(() => import('./pages/SaudiArabiaPage'));
const DubaiPage = lazy(() => import('./pages/DubaiPage'));
const QatarPage = lazy(() => import('./pages/QatarPage'));
const KuwaitPage = lazy(() => import('./pages/KuwaitPage'));
const BahrainPage = lazy(() => import('./pages/BahrainPage'));
const OmanPage = lazy(() => import('./pages/OmanPage'));
const ROICalculator = lazy(() => import('./pages/ROICalculator'));
const CompareCompetitors = lazy(() => import('./pages/CompareCompetitors'));

// Indoor & Outdoor LED Series - Lazy loaded
const IndoorLEDPage = lazy(() => import('./pages/IndoorLEDPage'));
const OutdoorLEDPage = lazy(() => import('./pages/OutdoorLEDPage'));
const LEDProductDetailPage = lazy(() => import('./pages/LEDProductDetailPage'));

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

// Art & Immersive Product Line - Lazy loaded
const ArtImmersiveLanding = lazy(() => import('./pages/artimmersive').then(m => ({ default: m.ArtImmersiveLanding })));

// Luxury Home Cinema - Lazy loaded
const LuxuryHomeCinemaLanding = lazy(() => import('./pages/homecinema').then(m => ({ default: m.LuxuryHomeCinemaLanding })));

// Signage Solutions - Lazy loaded
const SignageSolutionsLanding = lazy(() => import('./pages/signage/SignageSolutionsLanding'));

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
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public Site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
      <Route path="/products/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/product-families" element={<PublicLayout><ProductFamilies /></PublicLayout>} />
      <Route path="/inspirations" element={<PublicLayout><Inspirations /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
      <Route path="/configurator" element={<PublicLayout><ProductConfigurator /></PublicLayout>} />
      <Route path="/showroom" element={<PublicLayout><VirtualShowroom /></PublicLayout>} />
      <Route path="/calculator" element={<PublicLayout><ScreenCalculator /></PublicLayout>} />
      <Route path="/compare" element={<PublicLayout><Compare /></PublicLayout>} />
      <Route path="/tech-guide" element={<PublicLayout><TechGuide /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
      <Route path="/solutions/:id" element={<PublicLayout><SolutionDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      
      {/* SEO Landing Pages */}
      <Route path="/led-screen-suppliers-dubai" element={<PublicLayout><LEDScreenDubai /></PublicLayout>} />
      <Route path="/government-solutions" element={<PublicLayout><GovernmentSolutions /></PublicLayout>} />
      <Route path="/abu-dhabi" element={<PublicLayout><AbuDhabiPage /></PublicLayout>} />
      <Route path="/saudi-arabia" element={<PublicLayout><SaudiArabiaPage /></PublicLayout>} />
      <Route path="/dubai" element={<PublicLayout><DubaiPage /></PublicLayout>} />
      <Route path="/qatar" element={<PublicLayout><QatarPage /></PublicLayout>} />
      <Route path="/kuwait" element={<PublicLayout><KuwaitPage /></PublicLayout>} />
      <Route path="/bahrain" element={<PublicLayout><BahrainPage /></PublicLayout>} />
      <Route path="/oman" element={<PublicLayout><OmanPage /></PublicLayout>} />
      <Route path="/tools/roi-calculator" element={<PublicLayout><ROICalculator /></PublicLayout>} />
      <Route path="/compare-brands" element={<PublicLayout><CompareCompetitors /></PublicLayout>} />
      
      {/* Indoor & Outdoor LED Series */}
      <Route path="/indoor-led" element={<PublicLayout><IndoorLEDPage /></PublicLayout>} />
      <Route path="/indoor-led/:pitch" element={<PublicLayout><LEDProductDetailPage /></PublicLayout>} />
      <Route path="/outdoor-led" element={<PublicLayout><OutdoorLEDPage /></PublicLayout>} />
      <Route path="/outdoor-led/:pitch" element={<PublicLayout><LEDProductDetailPage /></PublicLayout>} />
      
      <Route path="/knowledge" element={<PublicLayout><KnowledgeIndex /></PublicLayout>} />
      <Route path="/knowledge/cob-vs-mip-vs-smd" element={<PublicLayout><CobVsMipVsSmd /></PublicLayout>} />
      <Route path="/knowledge/pixel-pitch-guide" element={<PublicLayout><PixelPitchGuide /></PublicLayout>} />
      <Route path="/knowledge/brightness-nits-guide" element={<PublicLayout><BrightnessNitsGuide /></PublicLayout>} />
      <Route path="/knowledge/ip-rating-guide" element={<PublicLayout><IpRatingGuide /></PublicLayout>} />
      <Route path="/knowledge/refresh-rate-guide" element={<PublicLayout><RefreshRateGuide /></PublicLayout>} />
      <Route path="/knowledge/processing-calibration" element={<PublicLayout><ProcessingCalibrationGuide /></PublicLayout>} />
      <Route path="/knowledge/cms-multi-site" element={<PublicLayout><CmsMultiSiteGuide /></PublicLayout>} />
      <Route path="/applications" element={<PublicLayout><ApplicationsIndex /></PublicLayout>} />
      <Route path="/applications/:slug" element={<PublicLayout><ApplicationDetail /></PublicLayout>} />
      
      {/* LumiMorph Product Family */}
      <Route path="/lumimorph" element={<PublicLayout><LumiMorphLanding /></PublicLayout>} />
      <Route path="/lumimorph/elite" element={<PublicLayout><LumiMorphElitePage /></PublicLayout>} />
      <Route path="/lumimorph/grande" element={<PublicLayout><LumiMorphGrandePage /></PublicLayout>} />
      <Route path="/lumimorph/mini" element={<PublicLayout><LumiMorphMiniPage /></PublicLayout>} />
      {/* Legacy redirect */}
      <Route path="/lumimorph-elite" element={<Navigate to="/lumimorph/elite" replace />} />
      
      {/* NaturaTex Product Line */}
      <Route path="/naturatex" element={<PublicLayout><NaturaTexPage /></PublicLayout>} />
      <Route path="/naturatex/holoveil" element={<PublicLayout><HoloVeilPage /></PublicLayout>} />
      
      {/* SignaTouch Product Line */}
      <Route path="/signatouch" element={<PublicLayout><SignaTouchLanding /></PublicLayout>} />
      <Route path="/signatouch/touch-kiosk" element={<PublicLayout><TouchKioskPage /></PublicLayout>} />
      <Route path="/signatouch/smart-signage" element={<PublicLayout><SmartSignagePage /></PublicLayout>} />
      <Route path="/signatouch/self-service" element={<PublicLayout><SelfServicePage /></PublicLayout>} />
      
      {/* GlassMorph Product Line */}
      <Route path="/glassmorph" element={<PublicLayout><GlassMorphLanding /></PublicLayout>} />
      <Route path="/glassmorph/smart-film" element={<PublicLayout><SmartFilmPage /></PublicLayout>} />
      <Route path="/glassmorph/led-film" element={<PublicLayout><LedFilmPage /></PublicLayout>} />
      <Route path="/glassmorph/media-glass" element={<PublicLayout><MediaGlassPage /></PublicLayout>} />
      <Route path="/glassmorph/switchable-glass" element={<PublicLayout><SwitchableGlassPage /></PublicLayout>} />
      <Route path="/glassmorph/flying-display" element={<PublicLayout><FlyingDisplayPage /></PublicLayout>} />
      <Route path="/glassmorph/hanging-led" element={<PublicLayout><HangingLedPage /></PublicLayout>} />
      
      {/* PixelVue Product Line */}
      <Route path="/pixelvue" element={<PublicLayout><PixelVueLanding /></PublicLayout>} />
      {/* Dynamic Product Detail Page - fetches from CMS */}
      <Route path="/pixelvue/:slug" element={<PublicLayout><PixelVueProductPage /></PublicLayout>} />
      
      {/* Art & Immersive Product Line */}
      <Route path="/art-immersive" element={<PublicLayout><ArtImmersiveLanding /></PublicLayout>} />
      
      {/* Luxury Home Cinema */}
      <Route path="/luxury-home-cinema" element={<PublicLayout><LuxuryHomeCinemaLanding /></PublicLayout>} />
      
      {/* Signage Solutions */}
      <Route path="/signage-solutions" element={<PublicLayout><SignageSolutionsLanding /></PublicLayout>} />
      
      <Route path="/for-architects" element={<PublicLayout><ForArchitects /></PublicLayout>} />
      <Route path="/value-engineering" element={<PublicLayout><ValueEngineering /></PublicLayout>} />
      <Route path="/contractors/:pageId" element={<PublicLayout><ContractorPage /></PublicLayout>} />
      <Route path="/spec-substitution" element={<PublicLayout><SpecSubstitution /></PublicLayout>} />
      <Route path="/budget-estimator" element={<PublicLayout><BudgetEstimator /></PublicLayout>} />
      <Route path="/resources" element={<PublicLayout><ResourceLibrary /></PublicLayout>} />
      <Route path="/latest-tech" element={<PublicLayout><LatestTechIndex /></PublicLayout>} />
      <Route path="/latest-tech/:techId" element={<PublicLayout><LatestTechDetail /></PublicLayout>} />
      <Route path="/technology" element={<PublicLayout><TechnologyIndex /></PublicLayout>} />
      <Route path="/technology/:techId" element={<PublicLayout><TechnologyPage /></PublicLayout>} />
      <Route path="/case-studies" element={<PublicLayout><CaseStudiesIndex /></PublicLayout>} />
      <Route path="/case-studies/:caseId" element={<PublicLayout><CaseStudyDetail /></PublicLayout>} />
      <Route path="/cpd-programme" element={<PublicLayout><CpdProgramme /></PublicLayout>} />
      <Route path="/sla-guide" element={<PublicLayout><SlaGuide /></PublicLayout>} />
      <Route path="/design-assist" element={<PublicLayout><DesignAssist /></PublicLayout>} />
      <Route path="/digital-experience-architecture" element={<PublicLayout><DigitalExperienceArchitecture /></PublicLayout>} />
      <Route path="/lp/specifier-toolkit" element={<SpecifierToolkitLP />} />
      <Route path="/technology-selector" element={<PublicLayout><TechnologySelector /></PublicLayout>} />
      <Route path="/viewing-distance" element={<PublicLayout><ViewingDistanceCalculator /></PublicLayout>} />
      <Route path="/power-estimator" element={<PublicLayout><PowerConsumptionEstimator /></PublicLayout>} />
      <Route path="/installation-guide" element={<PublicLayout><InstallationGuide /></PublicLayout>} />
      <Route path="/project-planner" element={<PublicLayout><ProjectPlanner /></PublicLayout>} />
      <Route path="/digital-experience/:pageId" element={<PublicLayout><DeaPageDetail /></PublicLayout>} />

      {/* Phase 3: New Pages */}
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
      <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
      <Route path="/factory-tour" element={<PublicLayout><FactoryTour /></PublicLayout>} />

      {/* Phase 4: Lead Generation & Partnerships */}
      <Route path="/distribution" element={<PublicLayout><DistributionPage /></PublicLayout>} />
      <Route path="/supplier-registration" element={<PublicLayout><SupplierRegistrationPage /></PublicLayout>} />
      <Route path="/technical-support" element={<PublicLayout><TechnicalSupportPage /></PublicLayout>} />
      <Route path="/led-calculator" element={<PublicLayout><LedModuleCalculator /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
