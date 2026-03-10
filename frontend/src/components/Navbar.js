import React, { useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, Upload, GraduationCap, Cpu, Eye, Zap, Layers, FileText, Monitor, Tv, ShoppingBag, Shapes, Settings, Package, Grid3X3, Building2, Theater, Globe, TrafficCone, Sparkles, Box, Cuboid } from 'lucide-react';

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
  const [techOpen, setTechOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);
  const toolsPaths = ['/calculator', '/compare', '/tech-guide', '/budget-estimator', '/value-engineering', '/spec-substitution', '/cpd-programme', '/design-assist', '/technology-selector', '/viewing-distance', '/power-estimator', '/installation-guide', '/project-planner', '/led-calculator'];
  const isToolsActive = toolsPaths.includes(location.pathname) || location.pathname.startsWith('/contractors');

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
      label: 'OUTDOOR & RENTAL',
      items: [
        { name: 'Outdoor LED', cat: 'outdoor', desc: 'Weatherproof P4-P10' },
        { name: 'Rental LED', cat: 'rental', desc: 'Event & touring displays' },
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
    'rental': Package, 'road-signal': Monitor, 'transparent': Eye,
    'flexible': Shapes, 'custom-shapes': Shapes, 'sphere': Shapes,
    'naked-eye-3d': Eye, 'ceiling-led': Layers, 'digital-signage': Monitor,
    'smart-tv': Tv, 'ready-made': ShoppingBag, 'interactive': Zap,
    'virtual-production': MonitorPlay, 'poster-totem': Monitor,
    'shelf-edge': Monitor, 'accessories': Settings,
  };

  const solutionItems = [
    { name: 'Retail & Hospitality', id: 'retail', icon: ShoppingBag, desc: 'Shopfronts, malls, restaurants' },
    { name: 'Corporate & Conference', id: 'corporate', icon: Building2, desc: 'Boardrooms, lobbies, offices' },
    { name: 'Outdoor & DOOH', id: 'outdoor', icon: MonitorPlay, desc: 'Billboards, facades, signage' },
    { name: 'Events & Exhibitions', id: 'events', icon: Theater, desc: 'Concerts, trade shows, stages' },
    { name: 'Creative & Curved', id: 'creative', icon: Shapes, desc: 'Cylinders, waves, art' },
    { name: 'Road & Traffic', id: 'traffic', icon: TrafficCone, desc: 'VMS, highway, toll plaza' },
    { name: 'Immersive & VP', id: 'immersive', icon: Tv, desc: 'XR studios, virtual production' },
    { name: 'Transparent & Glass', id: 'transparent', icon: Globe, desc: 'Glass facades, storefronts' },
  ];

  const techItems = [
    { name: 'MicroLED', id: 'microled', icon: Sparkles, desc: 'Self-emissive, perfect blacks' },
    { name: 'COB LED', id: 'cob-led', icon: Cpu, desc: 'Highest contrast mainstream' },
    { name: 'MiP LED', id: 'mip-led', icon: Layers, desc: '85-90% of COB at lower cost' },
    { name: 'Fine Pitch', id: 'fine-pitch-led', icon: Monitor, desc: 'Commercial workhorse' },
    { name: 'All-in-One dvLED', id: 'all-in-one-dvled', icon: MonitorPlay, desc: 'LCD replacement, plug & play' },
    { name: 'Transparent LED', id: 'transparent-led', icon: Eye, desc: 'See-through digital canvas' },
    { name: '3D Anamorphic', id: '3d-anamorphic-led', icon: Cuboid, desc: 'Glasses-free 3D' },
    { name: 'Creative LED', id: 'creative-led', icon: Box, desc: 'Curved, cylinder, custom' },
    { name: 'Media Facade', id: 'media-facade', icon: Building2, desc: 'Building-scale LED mesh' },
  ];

  const toolsGroups = [
    {
      label: 'SPECIFIER TOOLS',
      links: [
        { name: 'Screen Calculator', path: '/calculator', icon: Calculator, desc: 'Pixel pitch, resolution & specs' },
        { name: 'Budget Estimator', path: '/budget-estimator', icon: DollarSign, desc: 'Project cost by size & pitch' },
        { name: 'Compare Products', path: '/compare', icon: BarChart3, desc: 'Side-by-side comparison' },
        { name: 'CPD Programme', path: '/cpd-programme', icon: GraduationCap, desc: 'Free Lunch & Learn sessions' },
        { name: 'Technology Selector', path: '/technology-selector', icon: Cpu, desc: 'Find the right LED technology' },
        { name: 'Viewing Distance', path: '/viewing-distance', icon: Eye, desc: 'Pixel pitch vs. distance' },
        { name: 'Power Estimator', path: '/power-estimator', icon: Zap, desc: 'Electrical load & HVAC' },
        { name: 'Installation Guide', path: '/installation-guide', icon: Layers, desc: 'Mounting methods & specs' },
        { name: 'Project Planner', path: '/project-planner', icon: FileText, desc: 'Full spec in one workflow' },
        { name: 'LED Module Calculator', path: '/led-calculator', icon: Grid3X3, desc: 'Module & cabinet sizing' },
      ],
    },
    {
      label: 'CONTRACTOR TOOLS',
      links: [
        { name: 'Value Engineering', path: '/value-engineering', icon: Wrench, desc: 'Cost-saving alternatives' },
        { name: 'Spec Substitution', path: '/spec-substitution', icon: Upload, desc: 'Upload BOQ for review' },
        { name: 'Design Assist', path: '/design-assist', icon: MonitorPlay, desc: 'Free specification support' },
      ],
    },
  ];

  /* ─── SHARED STYLES ─── */
  const panelStyle = { backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(11,11,11,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' };

  const NavBtn = ({ label, isOpenState, isActiveState, testId }) => (
    <button
      className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 flex items-center gap-1 ${
        isActiveState ? 'text-[var(--blx-text)]' : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
      }`}
      data-testid={testId}
    >
      {label}
      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpenState ? 'rotate-180' : ''}`} />
      {isActiveState && <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />}
    </button>
  );

  /* ─── CLOSE ALL MENUS ─── */
  const closeAll = () => { setProductsOpen(false); setSolutionsOpen(false); setTechOpen(false); setToolsOpen(false); setIsOpen(false); };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(11,11,11,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} data-testid="site-header-nav">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img src="/assets/brightluxx-logo-dark.png" alt="Brightluxx" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

            {/* Products */}
            <DropdownWrap
              isOpen={productsOpen}
              setOpen={setProductsOpen}
              testId="nav-products-dropdown"
              trigger={<NavBtn label="Products" isOpenState={productsOpen} isActiveState={isActivePrefix('/products')} testId="nav-products" />}
            >
              <div className="shadow-2xl py-4 px-4" style={{ ...panelStyle, width: '680px' }}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {productCategories.map((group, gi) => (
                    <div key={gi} className="mb-2">
                      <div className="px-2 pt-1 pb-2 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">{group.label}</div>
                      {group.items.map((item) => {
                        const Icon = CATEGORY_ICONS[item.cat] || Monitor;
                        return (
                          <Link
                            key={item.cat}
                            to={`/products?category=${item.cat}`}
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors duration-150 hover:bg-[rgba(255,255,255,0.04)]"
                            data-testid={`nav-product-cat-${item.cat}`}
                          >
                            <Icon size={12} className="text-[var(--blx-text-2)] flex-shrink-0" />
                            <div>
                              <div className="text-[0.625rem] font-bold tracking-wider text-[var(--blx-text)]">{item.name}</div>
                              <div className="text-[0.45rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <Link to="/products" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.06)] transition-colors duration-150" data-testid="nav-products-view-all">
                    View All Products
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Solutions */}
            <DropdownWrap
              isOpen={solutionsOpen}
              setOpen={setSolutionsOpen}
              testId="nav-solutions-dropdown"
              trigger={<NavBtn label="Solutions" isOpenState={solutionsOpen} isActiveState={isActivePrefix('/solutions')} testId="nav-solutions" />}
            >
              <div className="shadow-2xl py-3 px-1" style={{ ...panelStyle, width: '300px' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">BY INDUSTRY</div>
                {solutionItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/solutions/${item.id}`}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-[rgba(229,197,116,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    data-testid={`nav-solution-${item.id}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-[rgba(229,197,116,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'
                    }`}>
                      <item.icon size={13} className={isActive(`/solutions/${item.id}`) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)]'} />
                    </div>
                    <div>
                      <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(`/solutions/${item.id}`) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{item.name}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 mx-3 border-t border-[rgba(255,255,255,0.06)]">
                  <Link to="/solutions" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.06)] transition-colors" data-testid="nav-solutions-view-all">
                    All Solutions
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Technologies */}
            <DropdownWrap
              isOpen={techOpen}
              setOpen={setTechOpen}
              testId="nav-tech-dropdown"
              trigger={<NavBtn label="Technologies" isOpenState={techOpen} isActiveState={isActivePrefix('/technology')} testId="nav-technologies" />}
            >
              <div className="shadow-2xl py-3 px-1" style={{ ...panelStyle, width: '300px' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">LED TECHNOLOGIES</div>
                {techItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/technology/${item.id}`}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(`/technology/${item.id}`) ? 'bg-[rgba(229,197,116,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    data-testid={`nav-tech-${item.id}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive(`/technology/${item.id}`) ? 'bg-[rgba(229,197,116,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'
                    }`}>
                      <item.icon size={13} className={isActive(`/technology/${item.id}`) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)]'} />
                    </div>
                    <div>
                      <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(`/technology/${item.id}`) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{item.name}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 mx-3 border-t border-[rgba(255,255,255,0.06)]">
                  <Link to="/technology" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.06)] transition-colors" data-testid="nav-tech-view-all">
                    Technology Hub
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Case Studies */}
            <Link
              to="/case-studies"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/case-studies') ? 'text-[var(--blx-text)]' : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
              }`}
              data-testid="nav-case-studies"
            >
              Case Studies
              {isActivePrefix('/case-studies') && <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />}
            </Link>

            {/* Tools */}
            <DropdownWrap
              isOpen={toolsOpen}
              setOpen={setToolsOpen}
              testId="nav-tools-dropdown"
              trigger={<NavBtn label="Tools" isOpenState={toolsOpen} isActiveState={isToolsActive} testId="nav-tools" />}
            >
              <div className="shadow-2xl py-3 px-1" style={{ ...panelStyle, width: '280px' }}>
                {toolsGroups.map((group, gi) => (
                  <div key={gi}>
                    {gi > 0 && <div className="mx-3 my-2 border-t border-[rgba(255,255,255,0.06)]" />}
                    <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">{group.label}</div>
                    {group.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={closeAll}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                          isActive(link.path) ? 'bg-[rgba(229,197,116,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                        data-testid={`nav-tools-${link.path.substring(1)}`}
                      >
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(link.path) ? 'bg-[rgba(229,197,116,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'}`}>
                          <link.icon size={13} className={isActive(link.path) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)]'} />
                        </div>
                        <div>
                          <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(link.path) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{link.name}</div>
                          <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </DropdownWrap>

            {/* Resources */}
            <Link
              to="/resources"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActive('/resources') ? 'text-[var(--blx-text)]' : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
              }`}
              data-testid="nav-resources"
            >
              Resources
              {isActive('/resources') && <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />}
            </Link>

            <Link to="/contact" className="btn-gold px-4 py-1.5 text-xs" data-testid="site-header-request-quote-button">
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-[var(--blx-text)]" data-testid="site-header-mobile-menu-button">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ─── MOBILE NAVIGATION ─── */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-[var(--blx-hairline)] overflow-x-hidden" data-testid="mobile-menu" style={{ overflowX: 'hidden' }}>
            <Link to="/products" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Products</Link>
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-1">
                {productCategories.flatMap(g => g.items).slice(0, 8).map((item) => (
                  <Link key={item.cat} to={`/products?category=${item.cat}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <Link to="/solutions" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Solutions</Link>
              <div className="px-4 grid grid-cols-2 gap-1">
                {solutionItems.map((item) => (
                  <Link key={item.id} to={`/solutions/${item.id}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <Link to="/technology" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Technologies</Link>
              <div className="px-4 grid grid-cols-2 gap-1">
                {techItems.map((item) => (
                  <Link key={item.id} to={`/technology/${item.id}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/case-studies" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Case Studies</Link>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">SPECIFIER TOOLS</div>
              {toolsGroups[0].links.map((link) => (
                <Link key={link.path} to={link.path} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">CONTRACTOR TOOLS</div>
              {toolsGroups[1].links.map((link) => (
                <Link key={link.path} to={link.path} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <Link to="/resources" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Resources</Link>
              <Link to="/contact" onClick={closeAll} className="block px-4 py-3 mt-2 btn-gold text-center text-xs font-bold tracking-widest">Get Quote</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    {/* Spacer for fixed navbar */}
    <div className="h-16" />
    </>
  );
};

export default Navbar;
