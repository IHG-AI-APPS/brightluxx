import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Monitor, Sun, Moon } from 'lucide-react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

import DropdownWrap from './navbar/DropdownWrap';
import FamilyDropdown from './navbar/FamilyDropdown';
import NavMobileMenu from './navbar/NavMobileMenu';
import {
  solutionItems,
  moreMenuSections, productFamilies, familyOrder,
} from './navbar/navbarData';

const Navbar = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { branding } = useSiteSettings();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const isActive = (p) => location.pathname === p;
  const isActivePrefix = useCallback((p) => location.pathname.startsWith(p), [location.pathname]);

  const closeAll = useCallback(() => {
    setProductsOpen(false); setSolutionsOpen(false); setMoreMenuOpen(false);
    setFamilyOpen({}); setMobileMenuOpen(false);
  }, []);

  const setFamilyOpenFor = useCallback((key) => (val) => setFamilyOpen(prev => ({ ...prev, [key]: val })), []);

  const panelStyle = {
    background: isDark ? 'rgba(10,10,13,0.98)' : 'rgba(255,255,255,0.98)',
    borderRadius: '16px',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
  };

  const NavBtn = ({ label, href, isOpenState, isActiveState, testId, hasDropdown = true }) => (
    <div className="flex items-center cursor-pointer group">
      <Link
        to={href}
        className={`relative text-[0.6875rem] font-bold tracking-[0.15em] uppercase py-2 transition-all duration-300 ${
          isOpenState || isActiveState
            ? (isDark ? 'text-white' : 'text-neutral-900')
            : (isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900')
        }`}
        data-testid={testId}
      >
        {label}
        {isActiveState && (
          <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-500"
            transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        )}
      </Link>
      {hasDropdown && (
        <motion.div animate={{ rotate: isOpenState ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className={`ml-1 ${isOpenState ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')}`} />
        </motion.div>
      )}
    </div>
  );

  /* ─── Products Dropdown Content ─── */
  const ProductsPanel = () => (
    <div className="shadow-2xl p-5" style={{ ...panelStyle, width: '680px' }} data-testid="products-mega-menu">
      <div className="grid grid-cols-3 gap-6">
        {[{ label: 'BY PRODUCT', links: [['Indoor LED Displays', '/products?category=indoor'], ['Outdoor LED Displays', '/products?category=outdoor'], ['COB / MicroLED', '/products?category=cob-microled'], ['Transparent LED', '/products?category=transparent'], ['Interactive Displays', '/products?category=interactive'], ['Creative LED', '/products?category=flexible']] }, { label: 'BY APPLICATION', links: [['Retail', '/solutions/retail'], ['Corporate', '/solutions/corporate'], ['Control Rooms', '/solutions/control-rooms'], ['Transportation', '/solutions/transportation'], ['Events & XR', '/solutions/entertainment'], ['Architecture', '/solutions/architecture']] }, { label: 'BY TECHNOLOGY', links: [['COB Technology', '/technology/cob'], ['MicroLED & MiP', '/technology/microled'], ['Fine-Pitch LED', '/products?category=indoor'], ['Transparent LED', '/products?category=transparent'], ['Flexible LED', '/products?category=flexible'], ['Interactive Display', '/products?category=interactive']] }].map((group) => <div key={group.label}><p className={`mb-3 text-[0.55rem] font-bold tracking-[0.18em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{group.label}</p>{group.links.map(([label, path]) => <Link key={`${group.label}-${label}`} to={path} onClick={closeAll} className={`block py-1.5 text-xs font-semibold transition-colors ${isDark ? 'text-white/80 hover:text-cyan-300' : 'text-neutral-800 hover:text-cyan-700'}`} data-testid={`nav-products-${group.label.toLowerCase().replace(/\s+/g, '-')}-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{label}</Link>)}</div>)}
      </div>
      <div className={`mt-5 flex items-center gap-5 border-t pt-4 text-[0.65rem] font-bold tracking-[0.1em] uppercase ${isDark ? 'border-white/[0.08]' : 'border-neutral-200'}`}><Link to="/products" onClick={closeAll} className="text-cyan-400" data-testid="nav-products-view-all">View All Products</Link><Link to="/products#product-finder" onClick={closeAll} className={isDark ? 'text-white/75 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'} data-testid="nav-products-finder">Find the Right Display</Link><Link to="/compare" onClick={closeAll} className={isDark ? 'text-white/75 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'} data-testid="nav-products-compare">Compare Displays</Link><Link to="/for-architects" onClick={closeAll} className={isDark ? 'text-white/75 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'} data-testid="nav-products-architects">For Architects</Link></div>
    </div>
  );

  /* ─── Solutions Dropdown Content ─── */
  const SolutionsPanel = () => (
    <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '280px' }}>
      <div className={`px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>BY INDUSTRY</div>
      {solutionItems.map((item) => (
        <Link key={item.id} to={`/solutions/${item.id}`} onClick={closeAll}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${isActive(`/solutions/${item.id}`) ? 'bg-cyan-400/10' : (isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-neutral-100')}`}
          data-testid={`nav-solution-${item.id}`}>
          <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(`/solutions/${item.id}`) ? 'bg-cyan-400/15' : (isDark ? 'bg-white/[0.04]' : 'bg-neutral-100')}`}>
            <item.icon size={13} className={isActive(`/solutions/${item.id}`) ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')} />
          </div>
          <div>
            <div className={`text-[0.625rem] font-semibold tracking-wider uppercase ${isActive(`/solutions/${item.id}`) ? 'text-cyan-400' : (isDark ? 'text-white' : 'text-neutral-900')}`}>{item.name}</div>
            <div className={`text-[0.45rem] tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{item.desc}</div>
          </div>
        </Link>
      ))}
      <div className={`mt-2 pt-2 mx-3 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`}>
        <Link to="/solutions" onClick={closeAll} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-cyan-400 transition-colors uppercase ${isDark ? 'hover:bg-cyan-400/10' : 'hover:bg-cyan-50'}`} data-testid="nav-solutions-view-all">ALL SOLUTIONS</Link>
      </div>
      <div className={`mt-2 pt-2 mx-3 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`}>
        <div className={`px-0 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>BY LOCATION</div>
        {[{ to: '/led-screen-suppliers-dubai', label: 'Dubai', testId: 'nav-led-dubai' },
          { to: '/abu-dhabi', label: 'Abu Dhabi', testId: 'nav-abu-dhabi' },
          { to: '/saudi-arabia', label: 'Saudi Arabia', testId: 'nav-saudi' }].map(l => (
          <Link key={l.to} to={l.to} onClick={closeAll} className={`block px-2 py-1.5 rounded text-[0.6rem] hover:text-cyan-400 transition-colors ${isDark ? 'text-white/80 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`} data-testid={l.testId}>{l.label}</Link>
        ))}
        <div className={`px-0 pt-2 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>SPECIAL</div>
        <Link to="/government-solutions" onClick={closeAll} className={`block px-2 py-1.5 rounded text-[0.6rem] hover:text-cyan-400 transition-colors ${isDark ? 'text-white/80 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-neutral-100'}`} data-testid="nav-gov-solutions">Government Solutions</Link>
      </div>
    </div>
  );

  /* ─── More Menu Content ─── */
  const MorePanel = () => (
    <div className="shadow-2xl py-3 px-1 max-h-[80vh] overflow-y-auto" style={{ ...panelStyle, width: '280px', right: 0, left: 'auto' }}>
      {moreMenuSections.map((section, si) => (
        <div key={section.label}>
          {si > 0 && <div className={`mx-3 my-2 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`} />}
          <div className={`px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{section.label}</div>
          {section.items.map((item) => (
            <Link key={item.path} to={item.path} onClick={closeAll}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${isActive(item.path) ? 'bg-cyan-400/10' : (isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-neutral-100')}`}
              data-testid={`nav-more-${item.path.substring(1).replace('/', '-')}`}>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(item.path) ? 'bg-cyan-400/15' : (isDark ? 'bg-white/[0.04]' : 'bg-neutral-100')}`}>
                <item.icon size={12} className={isActive(item.path) ? 'text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')} />
              </div>
              <div>
                <div className={`text-[0.625rem] font-semibold tracking-wider uppercase ${isActive(item.path) ? 'text-cyan-400' : (isDark ? 'text-white' : 'text-neutral-900')}`}>{item.name}</div>
                <div className={`text-[0.4rem] tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  /* ─── Condensed lg Panel Content ─── */
  const LgMorePanel = () => (
    <div className="shadow-2xl py-3 px-1 max-h-[80vh] overflow-y-auto" style={{ ...panelStyle, width: '260px', right: 0, left: 'auto' }}>
      <div className={`px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>PRODUCT FAMILIES</div>
      {Object.values(productFamilies).map(f => (
        <Link key={f.key} to={f.path} onClick={closeAll} className={`block px-3 py-1.5 rounded-lg text-[0.6rem] font-semibold ${f.colorClass} ${isDark ? f.hoverBg : f.hoverBgLight}`}>{f.name}</Link>
      ))}
      {moreMenuSections.slice(1).map((section) => (
        <div key={section.label}>
          <div className={`mx-3 my-2 border-t ${isDark ? 'border-white/[0.06]' : 'border-neutral-200'}`} />
          <div className={`px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{section.label}</div>
          {section.items.slice(0, 4).map((item) => (
            <Link key={item.path} to={item.path} onClick={closeAll} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-neutral-100'}`}>
              <item.icon size={11} className={isDark ? 'text-neutral-500' : 'text-neutral-400'} />
              <span className={`text-[0.6rem] font-semibold uppercase ${isDark ? 'text-white' : 'text-neutral-900'}`}>{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  const ThemeBtn = ({ size = 16, testId }) => (
    <motion.button onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'}`}
      whileTap={{ scale: 0.95 }} data-testid={testId} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {isDark ? <Sun size={size} className="text-yellow-400" /> : <Moon size={size} className="text-indigo-600" />}
      </motion.div>
    </motion.button>
  );

  return (
    <>
    <motion.nav className="fixed top-0 left-0 right-0 z-50" initial={false}
      animate={{ paddingTop: scrolled ? '0.5rem' : '0.75rem', paddingBottom: scrolled ? '0.5rem' : '0.75rem' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backdropFilter: scrolled ? 'blur(40px)' : 'blur(24px)', WebkitBackdropFilter: scrolled ? 'blur(40px)' : 'blur(24px)',
        background: isDark ? (scrolled ? 'rgba(5,5,8,0.98)' : 'rgba(5,5,8,0.9)') : (scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.9)'),
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
      }} data-testid="site-header-nav">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0" data-testid="logo-link">
            <img src="https://files.ihgbrands.com/assets_brightluxx-logo-nav.png" alt={branding?.company_name || 'Brightluxx'}
              className="h-8 w-auto max-h-8 object-contain transition-all duration-300 group-hover:opacity-80"
              style={{ maxWidth: '160px', filter: isDark ? 'none' : 'invert(1) hue-rotate(180deg) brightness(0.3) contrast(1.2)' }}
              onError={(e) => { e.target.src = "/assets/brightluxx-logo-nav.png"; }} />
          </Link>

          {/* ── Desktop xl+ ── */}
          <div className="hidden xl:flex items-center gap-3 xl:gap-4 2xl:gap-6 flex-shrink-0">
            <DropdownWrap isOpen={productsOpen} setOpen={setProductsOpen} testId="nav-products-dropdown"
              trigger={<NavBtn label="PRODUCTS" href="/products" isOpenState={productsOpen} isActiveState={isActivePrefix('/products')} testId="nav-products" />}>
              <ProductsPanel />
            </DropdownWrap>

            <DropdownWrap isOpen={solutionsOpen} setOpen={setSolutionsOpen} testId="nav-solutions-dropdown"
              trigger={<NavBtn label="SOLUTIONS" href="/solutions" isOpenState={solutionsOpen} isActiveState={isActivePrefix('/solutions')} testId="nav-solutions" />}>
              <SolutionsPanel />
            </DropdownWrap>

            <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-neutral-200'}`} />

            {familyOrder.map(key => (
              <FamilyDropdown key={key} family={productFamilies[key]} isOpen={!!familyOpen[key]}
                setOpen={setFamilyOpenFor(key)} closeAll={closeAll} isDark={isDark} panelStyle={panelStyle} isActivePrefix={isActivePrefix} />
            ))}

            <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-neutral-300'}`} />
            <ThemeBtn testId="theme-toggle" />

            <DropdownWrap isOpen={moreMenuOpen} setOpen={setMoreMenuOpen} testId="nav-more-dropdown" alignRight
              trigger={
                <button className={`flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase py-2 transition-all duration-300 ${moreMenuOpen ? (isDark ? 'text-white' : 'text-neutral-900') : (isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900')}`} data-testid="nav-more-btn">
                  <Menu size={16} />
                  <ChevronDown size={12} className={`transition-transform duration-300 ${moreMenuOpen ? 'rotate-180 text-cyan-400' : (isDark ? 'text-neutral-500' : 'text-neutral-400')}`} />
                </button>
              }>
              <MorePanel />
            </DropdownWrap>
          </div>

          {/* ── Condensed lg (1024-1279) ── */}
          <div className="hidden lg:flex xl:hidden items-center gap-3 flex-shrink-0">
            <DropdownWrap isOpen={productsOpen} setOpen={setProductsOpen}
              trigger={<NavBtn label="PRODUCTS" href="/products" isOpenState={productsOpen} isActiveState={isActivePrefix('/products')} testId="nav-products-lg" />}>
              <ProductsPanel />
            </DropdownWrap>

            <DropdownWrap isOpen={solutionsOpen} setOpen={setSolutionsOpen}
              trigger={<NavBtn label="SOLUTIONS" href="/solutions" isOpenState={solutionsOpen} isActiveState={isActivePrefix('/solutions')} testId="nav-solutions-lg" />}>
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '240px' }}>
                {solutionItems.slice(0, 5).map((item) => (
                  <Link key={item.id} to={`/solutions/${item.id}`} onClick={closeAll} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-neutral-100'}`}>
                    <item.icon size={12} className={isDark ? 'text-neutral-500' : 'text-neutral-400'} />
                    <span className={`text-[0.6rem] font-semibold uppercase ${isDark ? 'text-white' : 'text-neutral-900'}`}>{item.name}</span>
                  </Link>
                ))}
                <Link to="/solutions" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg text-[0.6rem] font-bold tracking-[0.15em] text-cyan-400 hover:bg-cyan-400/10 uppercase">ALL SOLUTIONS</Link>
              </div>
            </DropdownWrap>

            <Link to="/product-families" className={`text-[0.65rem] font-bold tracking-[0.1em] uppercase transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`}>FAMILIES</Link>
            <ThemeBtn size={16} />

            <DropdownWrap isOpen={moreMenuOpen} setOpen={setMoreMenuOpen} alignRight
              trigger={<button className={`flex items-center gap-1 text-[0.65rem] font-bold tracking-[0.1em] uppercase py-2 transition-colors ${moreMenuOpen ? (isDark ? 'text-white' : 'text-neutral-900') : (isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900')}`}><Menu size={16} /></button>}>
              <LgMorePanel />
            </DropdownWrap>
          </div>

          {/* ── Mobile <lg ── */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeBtn size={18} testId="theme-toggle-mobile" />
            <motion.button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-700'}`}
              whileTap={{ scale: 0.95 }} data-testid="mobile-menu-toggle">
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>
      <NavMobileMenu isOpen={mobileMenuOpen} closeAll={closeAll} isDark={isDark} toggleTheme={toggleTheme} />
    </motion.nav>
    <div className="h-16" />
    </>
  );
};

export default Navbar;
