import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Cpu, Shield, Sparkles, Eye, Zap, Calculator, DollarSign, TrendingUp, Info, Phone, Newspaper, HelpCircle, FolderOpen, BookOpen, Factory, Users, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const MobileDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  
  const productFamilies = [
    { name: 'LUMIMORPH', path: '/lumimorph', color: 'bg-cyan-400' },
    { name: 'NATURATEX', path: '/naturatex', color: 'bg-emerald-400' },
    { name: 'SIGNATOUCH', path: '/signatouch', color: 'bg-amber-400' },
    { name: 'GLASSMORPH', path: '/glassmorph', color: 'bg-violet-400' },
    { name: 'PIXELVUE', path: '/pixelvue', color: 'bg-rose-400' },
  ];

  const technologies = [
    { name: 'COB Technology', path: '/technology/cob', icon: Cpu },
    { name: 'GOB Protection', path: '/technology/gob', icon: Shield },
    { name: 'MicroLED & MiP', path: '/technology/microled', icon: Sparkles },
    { name: 'HDR & Color', path: '/technology/hdr', icon: Eye },
    { name: 'Driving ICs', path: '/technology/driving-ic', icon: Zap },
  ];

  const tools = [
    { name: 'Screen Calculator', path: '/calculator', icon: Calculator },
    { name: 'Budget Estimator', path: '/budget-estimator', icon: DollarSign },
    { name: 'ROI Calculator', path: '/tools/roi-calculator', icon: TrendingUp },
    { name: 'Viewing Distance', path: '/viewing-distance', icon: Eye },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Blog', path: '/blog', icon: Newspaper },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Resources', path: '/resources', icon: FolderOpen },
    { name: 'Case Studies', path: '/case-studies', icon: BookOpen },
    { name: 'Factory Tour', path: '/factory-tour', icon: Factory },
    { name: 'Distribution', path: '/distribution', icon: Users },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
            data-testid="mobile-drawer-backdrop"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] z-50 lg:hidden overflow-y-auto"
            style={{
              background: isDark ? 'rgba(10,10,13,0.98)' : 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            data-testid="mobile-drawer"
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
              <span className={`text-xs font-bold tracking-[0.15em] ${isDark ? 'text-white' : 'text-neutral-900'}`}>MENU</span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  whileTap={{ scale: 0.95 }}
                  data-testid="mobile-drawer-theme-toggle"
                >
                  {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  whileTap={{ scale: 0.95 }}
                  data-testid="mobile-drawer-close"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="p-4 space-y-6 pb-24">
              {/* Product Families */}
              <section>
                <h3 className={`text-[10px] font-bold tracking-[0.2em] mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>PRODUCT FAMILIES</h3>
                <div className="grid grid-cols-2 gap-2">
                  {productFamilies.map((family) => (
                    <Link
                      key={family.path}
                      to={family.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-100 hover:bg-neutral-200'}`}
                      data-testid={`mobile-drawer-family-${family.name.toLowerCase()}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${family.color}`} />
                      <span className={`text-xs font-medium tracking-wider ${isDark ? 'text-white' : 'text-neutral-900'}`}>{family.name}</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Technologies */}
              <section>
                <h3 className={`text-[10px] font-bold tracking-[0.2em] mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>TECHNOLOGIES</h3>
                <div className="space-y-1">
                  {technologies.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-100'} ${location.pathname === item.path ? (isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600') : ''}`}
                      data-testid={`mobile-drawer-tech-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className={location.pathname === item.path ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')} />
                        <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{item.name}</span>
                      </div>
                      <ChevronRight size={14} className={isDark ? 'text-neutral-600' : 'text-neutral-400'} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* Tools */}
              <section>
                <h3 className={`text-[10px] font-bold tracking-[0.2em] mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>SPECIFIER TOOLS</h3>
                <div className="space-y-1">
                  {tools.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-100'} ${location.pathname === item.path ? (isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600') : ''}`}
                      data-testid={`mobile-drawer-tool-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className={location.pathname === item.path ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')} />
                        <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{item.name}</span>
                      </div>
                      <ChevronRight size={14} className={isDark ? 'text-neutral-600' : 'text-neutral-400'} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* Company Links */}
              <section>
                <h3 className={`text-[10px] font-bold tracking-[0.2em] mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>COMPANY</h3>
                <div className="space-y-1">
                  {companyLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-100'} ${location.pathname === item.path ? (isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600') : ''}`}
                      data-testid={`mobile-drawer-company-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className={location.pathname === item.path ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')} />
                        <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{item.name}</span>
                      </div>
                      <ChevronRight size={14} className={isDark ? 'text-neutral-600' : 'text-neutral-400'} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* WhatsApp CTA */}
              <section className="pt-4">
                <a
                  href="https://wa.me/971559954274?text=Hi,%20I'm%20interested%20in%20Brightluxx%20LED%20displays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm tracking-wider"
                  style={{ background: '#25D366' }}
                  data-testid="mobile-drawer-whatsapp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp Us</span>
                </a>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
