import React, { useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, Upload, GraduationCap, Cpu, Eye, Zap, Layers, FileText, Monitor, Tv, ShoppingBag, Shapes, Settings, Package, Grid3X3, Building2, Theater, Globe, TrafficCone, Sparkles, Box, Cuboid, BookOpen, HelpCircle, Phone, Info, Factory, Users, Newspaper, FolderOpen, Lightbulb, PenTool, Shield } from 'lucide-react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

/* Dropdown wrapper — handles stable hover with a delay so the menu doesn't vanish mid-transition */
function DropdownWrap({ trigger, children, isOpen, setOpen, testId }) {
  const timeout = useRef(null);
  const enter = useCallback(() => { clearTimeout(timeout.current); setOpen(true); }, [setOpen]);
  const leave = useCallback(() => { timeout.current = setTimeout(() => setOpen(false), 120); }, [setOpen]);
  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {trigger}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2" data-testid={testId}>
          {children}
        </div>
      )}
    </div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();
  const { branding } = useSiteSettings();

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);

  /* ─── DATA ─── */
  const productCategories = [
    {
      label: 'INDOOR DISPLAYS',
      items: [
        { name: 'COB MicroLED', cat: 'cob-microled', desc: 'Ultra-premium P0.4-P0.9' },
        { name: 'MiP LED', cat: 'mip', desc: 'Next-gen P0.7-P1.5' },
        { name: 'Fine Pitch Indoor', cat: 'indoor', desc: 'Corporate P1.8-P3' },
        { name: 'All-in-One dvLED', cat: 'all-in-one', desc: 'Plug & play solutions' },
        { name: 'Cinema LED', cat: 'cinema-led', desc: 'Theatre-grade P0.9-P1.2' },
        { name: 'DVLED Cinema', cat: 'dvled', desc: 'Direct-view cinema walls' },
      ],
    },
    {
      label: 'OUTDOOR DISPLAYS',
      items: [
        { name: 'Outdoor LED', cat: 'outdoor', desc: 'Weatherproof P4-P10' },
        { name: 'High Brightness 10K', cat: 'outdoor-hb', desc: 'Highway billboards' },
        { name: 'Coastal GOB', cat: 'outdoor-gob', desc: 'Beachfront & humid areas' },
        { name: 'Fine Pitch Outdoor', cat: 'outdoor-fp', desc: 'Luxury retail facades' },
        { name: 'Mesh Facade', cat: 'mesh', desc: 'Transparent building wraps' },
        { name: 'Road Signals', cat: 'road-signal', desc: 'Traffic & VMS displays' },
      ],
    },
    {
      label: 'CREATIVE & CUSTOM',
      items: [
        { name: 'Transparent LED', cat: 'transparent', desc: 'Glass facade displays' },
        { name: 'Flexible / Creative', cat: 'flexible', desc: 'Curved & custom shapes' },
        { name: 'Custom LED Shapes', cat: 'custom-shapes', desc: 'Round, cube, cone' },
        { name: 'LED Sphere', cat: 'sphere', desc: '360° spherical displays' },
        { name: 'Naked-Eye 3D', cat: 'naked-eye-3d', desc: 'Glasses-free 3D' },
        { name: 'Ceiling / Sky Screen', cat: 'ceiling-led', desc: 'Overhead displays' },
      ],
    },
    {
      label: 'SPECIALITY & READY-MADE',
      items: [
        { name: 'Digital Signage', cat: 'digital-signage', desc: 'Commercial displays & kiosks' },
        { name: 'Smart TVs', cat: 'smart-tv', desc: 'Commercial & outdoor TVs' },
        { name: 'Ready-Made', cat: 'ready-made', desc: 'Plug & play packages' },
        { name: 'Interactive Floor', cat: 'interactive', desc: 'Touch-responsive floors' },
        { name: 'Virtual Production', cat: 'virtual-production', desc: 'XR/VP stage panels' },
        { name: 'LED Poster / Totem', cat: 'poster-totem', desc: 'Standalone displays' },
        { name: 'Shelf Edge', cat: 'shelf-edge', desc: 'Retail strip displays' },
        { name: 'Accessories', cat: 'accessories', desc: 'Controllers, cables, mounts' },
      ],
    },
  ];

  const CATEGORY_ICONS = {
    'cob-microled': Cpu, 'mip': Cpu, 'indoor': Monitor, 'all-in-one': Tv,
    'cinema-led': MonitorPlay, 'dvled': MonitorPlay, 'outdoor': Monitor,
    'outdoor-hb': Monitor, 'outdoor-gob': Monitor, 'outdoor-fp': Monitor,
    'mesh': Eye, 'road-signal': Monitor, 'transparent': Eye,
    'flexible': Shapes, 'custom-shapes': Shapes, 'sphere': Shapes,
    'naked-eye-3d': Eye, 'ceiling-led': Layers, 'digital-signage': Monitor,
    'smart-tv': Tv, 'ready-made': ShoppingBag, 'interactive': Zap,
    'virtual-production': MonitorPlay, 'poster-totem': Monitor,
    'shelf-edge': Monitor, 'accessories': Settings,
  };

  const solutionItems = [
    { name: 'Retail & Hospitality', id: 'retail', icon: ShoppingBag, desc: 'Shopfronts, malls, restaurants' },
    { name: 'Corporate & Offices', id: 'corporate', icon: Building2, desc: 'Boardrooms, lobbies, meeting rooms' },
    { name: 'Entertainment & Events', id: 'entertainment', icon: Theater, desc: 'Concerts, sports, exhibitions' },
    { name: 'Transportation', id: 'transportation', icon: TrafficCone, desc: 'Airports, metro, highways' },
    { name: 'Houses of Worship', id: 'worship', icon: Globe, desc: 'Churches, mosques, temples' },
    { name: 'Control Rooms', id: 'control-rooms', icon: Grid3X3, desc: 'Command centers, NOCs' },
    { name: 'Virtual Production', id: 'virtual-production', icon: Box, desc: 'XR stages, film sets' },
    { name: 'Architecture', id: 'architecture', icon: Cuboid, desc: 'Facade, media walls' },
  ];

  const techItems = [
    { name: 'COB Technology', id: 'cob', icon: Cpu, desc: 'Chip-on-board explained' },
    { name: 'GOB Protection', id: 'gob', icon: Shield, desc: 'Glue-on-board coating' },
    { name: 'MicroLED & MiP', id: 'microled', icon: Sparkles, desc: 'Next-gen pixel tech' },
    { name: 'HDR & Color', id: 'hdr', icon: Eye, desc: 'High dynamic range' },
    { name: 'Driving ICs', id: 'driving-ic', icon: Zap, desc: 'PWM & common cathode' },
  ];

  const toolsGroups = [
    {
      label: 'SPECIFIER TOOLS',
      links: [
        { name: 'Screen Calculator', path: '/calculator', icon: Calculator, desc: 'Size & resolution' },
        { name: 'Budget Estimator', path: '/budget-estimator', icon: DollarSign, desc: 'Project costing' },
        { name: 'Viewing Distance', path: '/viewing-distance', icon: Eye, desc: 'Optimal pitch calculator' },
        { name: 'Power Estimator', path: '/power-estimator', icon: Zap, desc: 'Electrical requirements' },
        { name: 'Technology Selector', path: '/technology-selector', icon: Cpu, desc: 'Find the right tech' },
      ],
    },
    {
      label: 'CONTRACTOR TOOLS',
      links: [
        { name: 'Project Planner', path: '/project-planner', icon: FileText, desc: 'Timeline & milestones' },
        { name: 'Installation Guide', path: '/installation-guide', icon: Wrench, desc: 'Step-by-step process' },
        { name: 'Spec Substitution', path: '/spec-substitution', icon: BarChart3, desc: 'Cross-reference products' },
        { name: 'Value Engineering', path: '/value-engineering', icon: Settings, desc: 'Cost optimization' },
        { name: 'CPD Programme', path: '/cpd-programme', icon: GraduationCap, desc: 'Professional development' },
      ],
    },
  ];

  /* Panel style for dropdowns */
  const panelStyle = {
    background: 'rgba(10,10,13,0.98)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  };

  /* ─── MORE MENU ITEMS (Technologies, Tools, and secondary links) ─── */
  const moreMenuSections = [
    {
      label: 'TECHNOLOGIES',
      items: techItems.map(item => ({ name: item.name, path: `/technology/${item.id}`, icon: item.icon, desc: item.desc })),
    },
    {
      label: 'SPECIFIER TOOLS',
      items: toolsGroups[0].links,
    },
    {
      label: 'COMPANY',
      items: [
        { name: 'About Us', path: '/about', icon: Info, desc: 'Our story & mission' },
        { name: 'Blog', path: '/blog', icon: Newspaper, desc: 'Latest news & insights' },
        { name: 'Contact Us', path: '/contact', icon: Phone, desc: 'Get in touch' },
        { name: 'FAQ', path: '/faq', icon: HelpCircle, desc: 'Common questions' },
        { name: 'Resources', path: '/resources', icon: FolderOpen, desc: 'Downloads & guides' },
        { name: 'Case Studies', path: '/case-studies', icon: BookOpen, desc: 'Project showcases' },
        { name: 'Factory Tour', path: '/factory-tour', icon: Factory, desc: 'Virtual facility tour' },
        { name: 'Distribution', path: '/distribution', icon: Users, desc: 'Partner with us' },
      ],
    },
  ];

  /* ─── CLOSE ALL MENUS ─── */
  const closeAll = () => { setProductsOpen(false); setSolutionsOpen(false); setMoreMenuOpen(false); setIsOpen(false); };

  /* Nav button component - UPPERCASE text */
  const NavBtn = ({ label, href, isOpenState, isActiveState, testId, hasDropdown = true }) => (
    <div className="flex items-center cursor-pointer">
      <Link
        to={href}
        className={`relative text-[0.6875rem] font-bold tracking-[0.15em] uppercase py-2 transition-all duration-300 ${
          isOpenState || isActiveState ? 'text-white' : 'text-neutral-400 hover:text-white'
        }`}
        data-testid={testId}
      >
        {label}
        {isActiveState && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-500" />}
      </Link>
      {hasDropdown && (
        <ChevronDown size={14} className={`ml-1 text-neutral-500 transition-transform duration-300 ${isOpenState ? 'rotate-180 text-cyan-400' : ''}`} />
      )}
    </div>
  );

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(5,5,8,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} data-testid="site-header-nav">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo - proper sizing with max-height */}
          <Link to="/" className="flex items-center group flex-shrink-0" data-testid="logo-link">
            <img 
              src="/assets/brightluxx-logo-nav.png" 
              alt={branding?.company_name || 'Brightluxx'} 
              className="h-8 w-auto max-h-8 object-contain transition-opacity duration-300 group-hover:opacity-80"
              style={{ maxWidth: '160px' }}
            />
          </Link>

          {/* Desktop Navigation - Clean, minimal */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Products Dropdown */}
            <DropdownWrap
              isOpen={productsOpen}
              setOpen={setProductsOpen}
              testId="nav-products-dropdown"
              trigger={<NavBtn label="PRODUCTS" href="/products" isOpenState={productsOpen} isActiveState={isActivePrefix('/products')} testId="nav-products" />}
            >
              <div className="shadow-2xl py-4 px-4 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '680px' }}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {productCategories.map((group, gi) => (
                    <div key={gi} className="mb-2">
                      <div className="px-2 pt-1 pb-2 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">{group.label}</div>
                      {group.items.map((item) => {
                        const Icon = CATEGORY_ICONS[item.cat] || Monitor;
                        return (
                          <Link
                            key={item.cat}
                            to={`/products?category=${item.cat}`}
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors duration-150 hover:bg-white/[0.04]"
                            data-testid={`nav-product-cat-${item.cat}`}
                          >
                            <Icon size={12} className="text-neutral-500 flex-shrink-0" />
                            <div>
                              <div className="text-[0.625rem] font-semibold tracking-wider text-white uppercase">{item.name}</div>
                              <div className="text-[0.45rem] text-neutral-500 tracking-wider">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <Link to="/product-families" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 hover:bg-white/[0.04] transition-colors duration-150 mb-2 uppercase" data-testid="nav-products-families">
                    PRODUCT FAMILIES
                  </Link>
                  <Link to="/products" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-cyan-400 hover:bg-cyan-400/10 transition-colors duration-150 uppercase" data-testid="nav-products-view-all">
                    VIEW ALL PRODUCTS
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Solutions Dropdown */}
            <DropdownWrap
              isOpen={solutionsOpen}
              setOpen={setSolutionsOpen}
              testId="nav-solutions-dropdown"
              trigger={<NavBtn label="SOLUTIONS" href="/solutions" isOpenState={solutionsOpen} isActiveState={isActivePrefix('/solutions')} testId="nav-solutions" />}
            >
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '280px' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">BY INDUSTRY</div>
                {solutionItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/solutions/${item.id}`}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-cyan-400/10' : 'hover:bg-white/[0.04]'
                    }`}
                    data-testid={`nav-solution-${item.id}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-cyan-400/15' : 'bg-white/[0.04]'
                    }`}>
                      <item.icon size={13} className={isActive(`/solutions/${item.id}`) ? 'text-cyan-400' : 'text-neutral-500'} />
                    </div>
                    <div>
                      <div className={`text-[0.625rem] font-semibold tracking-wider uppercase ${isActive(`/solutions/${item.id}`) ? 'text-cyan-400' : 'text-white'}`}>{item.name}</div>
                      <div className="text-[0.45rem] text-neutral-500 tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 mx-3 border-t border-white/[0.06]">
                  <Link to="/solutions" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-cyan-400 hover:bg-cyan-400/10 transition-colors uppercase" data-testid="nav-solutions-view-all">
                    ALL SOLUTIONS
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Thin divider */}
            <div className="w-px h-4 bg-white/10" />

            {/* PRODUCT FAMILIES - Direct Links - UPPERCASE */}
            <Link
              to="/lumimorph"
              className={`text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/lumimorph') ? 'text-cyan-400' : 'text-cyan-400/60 hover:text-cyan-400'
              }`}
              data-testid="nav-lumimorph"
            >
              LUMIMORPH
              {isActivePrefix('/lumimorph') && <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400" />}
            </Link>

            <Link
              to="/naturatex"
              className={`text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/naturatex') ? 'text-emerald-400' : 'text-emerald-400/60 hover:text-emerald-400'
              }`}
              data-testid="nav-naturatex"
            >
              NATURATEX
              {isActivePrefix('/naturatex') && <span className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
            </Link>

            <Link
              to="/signatouch"
              className={`text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/signatouch') ? 'text-amber-400' : 'text-amber-400/60 hover:text-amber-400'
              }`}
              data-testid="nav-signatouch"
            >
              SIGNATOUCH
              {isActivePrefix('/signatouch') && <span className="absolute bottom-0 left-0 right-0 h-px bg-amber-400" />}
            </Link>

            <Link
              to="/glassmorph"
              className={`text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/glassmorph') ? 'text-violet-400' : 'text-violet-400/60 hover:text-violet-400'
              }`}
              data-testid="nav-glassmorph"
            >
              GLASSMORPH
              {isActivePrefix('/glassmorph') && <span className="absolute bottom-0 left-0 right-0 h-px bg-violet-400" />}
            </Link>

            <Link
              to="/pixelvue"
              className={`text-[0.6875rem] font-bold tracking-[0.12em] uppercase relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/pixelvue') ? 'text-rose-400' : 'text-rose-400/60 hover:text-rose-400'
              }`}
              data-testid="nav-pixelvue"
            >
              PIXELVUE
              {isActivePrefix('/pixelvue') && <span className="absolute bottom-0 left-0 right-0 h-px bg-rose-400" />}
            </Link>

            {/* Thin divider */}
            <div className="w-px h-4 bg-white/10" />

            {/* More Menu (Hamburger) - Contains Technologies, Tools, and secondary links */}
            <DropdownWrap
              isOpen={moreMenuOpen}
              setOpen={setMoreMenuOpen}
              testId="nav-more-dropdown"
              trigger={
                <button 
                  className={`flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase py-2 transition-all duration-300 ${
                    moreMenuOpen ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  data-testid="nav-more-btn"
                >
                  <Menu size={16} />
                  <ChevronDown size={12} className={`text-neutral-500 transition-transform duration-300 ${moreMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
              }
            >
              <div className="shadow-2xl py-3 px-1 max-h-[80vh] overflow-y-auto" style={{ ...panelStyle, width: '280px', right: 0, left: 'auto' }}>
                {moreMenuSections.map((section, si) => (
                  <div key={si}>
                    {si > 0 && <div className="mx-3 my-2 border-t border-white/[0.06]" />}
                    <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">{section.label}</div>
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeAll}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                          isActive(item.path) ? 'bg-cyan-400/10' : 'hover:bg-white/[0.04]'
                        }`}
                        data-testid={`nav-more-${item.path.substring(1).replace('/', '-')}`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(item.path) ? 'bg-cyan-400/15' : 'bg-white/[0.04]'}`}>
                          <item.icon size={12} className={isActive(item.path) ? 'text-cyan-400' : 'text-neutral-500'} />
                        </div>
                        <div>
                          <div className={`text-[0.625rem] font-semibold tracking-wider uppercase ${isActive(item.path) ? 'text-cyan-400' : 'text-white'}`}>{item.name}</div>
                          <div className="text-[0.4rem] text-neutral-500 tracking-wider">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </DropdownWrap>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white" data-testid="site-header-mobile-menu-button">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ─── MOBILE NAVIGATION ─── */}
        {isOpen && (
          <div 
            className="lg:hidden py-4 space-y-2 border-t border-white/[0.06] overflow-x-hidden overflow-y-auto" 
            data-testid="mobile-menu" 
            style={{ overflowX: 'hidden', maxHeight: 'calc(100vh - 64px)' }}
          >
            <Link to="/products" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest uppercase hover:text-cyan-400">PRODUCTS</Link>
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-1">
                {productCategories.flatMap(g => g.items).slice(0, 8).map((item) => (
                  <Link key={item.cat} to={`/products?category=${item.cat}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-neutral-400 hover:text-cyan-400 py-1 px-2 rounded hover:bg-white/[0.04] uppercase">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/solutions" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest uppercase hover:text-cyan-400">SOLUTIONS</Link>

            {/* Product Families Section */}
            <div className="border-t border-white/[0.06] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">PRODUCT FAMILIES</div>
              <Link to="/lumimorph" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm tracking-wider text-cyan-400 font-medium uppercase">LUMIMORPH</span>
              </Link>
              <Link to="/naturatex" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm tracking-wider text-emerald-400 font-medium uppercase">NATURATEX</span>
              </Link>
              <Link to="/signatouch" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm tracking-wider text-amber-400 font-medium uppercase">SIGNATOUCH</span>
              </Link>
              <Link to="/glassmorph" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-sm tracking-wider text-violet-400 font-medium uppercase">GLASSMORPH</span>
              </Link>
              <Link to="/pixelvue" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-sm tracking-wider text-rose-400 font-medium uppercase">PIXELVUE</span>
              </Link>
            </div>

            <div className="border-t border-white/[0.06] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">TECHNOLOGIES</div>
              {techItems.slice(0, 4).map((item) => (
                <Link key={item.id} to={`/technology/${item.id}`} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <item.icon size={12} className="text-neutral-500" />
                  <span className="text-xs tracking-wider text-neutral-400 hover:text-white uppercase">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/[0.06] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">TOOLS</div>
              {toolsGroups[0].links.slice(0, 4).map((link) => (
                <Link key={link.path} to={link.path} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-neutral-500" />
                  <span className="text-xs tracking-wider text-neutral-400 hover:text-white uppercase">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/[0.06] pt-2 mt-2 pb-4">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-neutral-500">COMPANY</div>
              <Link to="/about" onClick={closeAll} className="block px-4 py-1.5 text-xs tracking-wider text-neutral-400 hover:text-white uppercase">ABOUT US</Link>
              <Link to="/contact" onClick={closeAll} className="block px-4 py-1.5 text-xs tracking-wider text-neutral-400 hover:text-white uppercase">CONTACT</Link>
              <Link to="/blog" onClick={closeAll} className="block px-4 py-1.5 text-xs tracking-wider text-neutral-400 hover:text-white uppercase">BLOG</Link>
              <Link to="/resources" onClick={closeAll} className="block px-4 py-1.5 text-xs tracking-wider text-neutral-400 hover:text-white uppercase">RESOURCES</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    {/* Spacer for fixed nav */}
    <div className="h-16" />
    </>
  );
};

export default Navbar;
