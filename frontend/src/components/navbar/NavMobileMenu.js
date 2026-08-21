import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';

export default function NavMobileMenu({ isOpen, closeAll, isDark, toggleTheme }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden border-t ${isDark ? 'bg-[#0A0A0D] border-white/[0.06]' : 'bg-white border-neutral-200'}`}
            data-testid="mobile-menu-drawer"
          >
            <div className="max-h-[80vh] overflow-y-auto py-4 px-4 space-y-1">
              <div className={`px-3 py-2 text-[0.6rem] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Product Discovery</div>
              {[{ to: '/products', label: 'Browse Products' }, { to: '/products#product-finder', label: 'Find the Right Display' }, { to: '/compare', label: 'Compare Displays' }, { to: '/for-architects', label: 'For Architects & Consultants' }].map((link) => (
                <Link key={link.to} to={link.to} onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-white hover:bg-white/[0.04]' : 'text-neutral-900 hover:bg-neutral-100'}`} data-testid={`mobile-product-discovery-${link.label.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{link.label}</Link>
              ))}

              <div className={`mx-3 my-2 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`} />

              <div className={`px-3 py-2 text-[0.6rem] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Solutions</div>
              <Link to="/solutions" onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-white hover:bg-white/[0.04]' : 'text-neutral-900 hover:bg-neutral-100'}`}>All Solutions</Link>
              <Link to="/led-screen-suppliers-dubai" onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`}>LED Screens Dubai</Link>
              <Link to="/government-solutions" onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`}>Government Solutions</Link>

              <div className={`mx-3 my-2 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`} />

              <div className={`px-3 py-2 text-[0.6rem] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Tools & Resources</div>
              {[
                { to: '/technology', label: 'Technology' },
                { to: '/calculator', label: 'Screen Calculator' },
                { to: '/roi-calculator', label: 'ROI Calculator' },
                { to: '/case-studies', label: 'Case Studies' },
                { to: '/blog', label: 'Blog' },
                { to: '/resources', label: 'Resources' },
              ].map((link) => (
                <Link key={link.to} to={link.to} onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`}>{link.label}</Link>
              ))}

              <div className={`mx-3 my-2 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`} />

              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <Link key={link.to} to={link.to} onClick={closeAll} className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isDark ? 'text-neutral-300 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`}>{link.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
