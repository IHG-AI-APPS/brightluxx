import React, { useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, Upload, GraduationCap, Cpu, Eye, Zap, Layers, FileText, Monitor, Tv, ShoppingBag, Shapes, Settings, Package, Grid3X3, Building2, Theater, Globe, TrafficCone, Sparkles, Box, Cuboid, BookOpen, HelpCircle, Phone, Info, Factory, Users, Newspaper, FolderOpen } from 'lucide-react';
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
  const [techOpen, setTechOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();
  const { branding } = useSiteSettings();

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
      label: 'OUTDOOR DISPLAYS',
      items: [
        { name: 'Outdoor LED', cat: 'outdoor', desc: 'Weatherproof P4-P10' },
        { name: 'High Brightness 10K', cat: 'outdoor', desc: 'Highway billboards' },
        { name: 'Coastal GOB', cat: 'outdoor', desc: 'Beachfront & humid areas' },
        { name: 'Fine Pitch Outdoor', cat: 'outdoor', desc: 'Luxury retail facades' },
        { name: 'Mesh Facade', cat: 'outdoor', desc: 'Transparent building wraps' },
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
    'road-signal': Monitor, 'transparent': Eye,
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
  const panelStyle = { backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(10,10,13,0.98)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(34,211,238,0.05)' };

  /* NavBtn now supports both click navigation AND dropdown trigger */
  const NavBtn = ({ label, href, isOpenState, isActiveState, testId, hasDropdown = true }) => (
    <div className="flex items-center">
      <Link
        to={href}
        onClick={closeAll}
        className={`text-[0.75rem] font-bold tracking-[0.12em] uppercase relative py-2 transition-all duration-300 ${
          isActiveState ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
        }`}
        data-testid={testId}
      >
        {label}
        {isActiveState && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-500" />}
      </Link>
      {hasDropdown && (
        <ChevronDown size={14} className={`ml-1 text-gray-500 transition-transform duration-300 ${isOpenState ? 'rotate-180 text-cyan-400' : ''}`} />
      )}
    </div>
  );

  /* ─── SECONDARY/MORE MENU ITEMS ─── */
  const moreMenuItems = [
    { name: 'About Us', path: '/about', icon: Info, desc: 'Our story & mission' },
    { name: 'Blog', path: '/blog', icon: Newspaper, desc: 'Latest news & insights' },
    { name: 'Contact Us', path: '/contact', icon: Phone, desc: 'Get in touch' },
    { name: 'FAQ', path: '/faq', icon: HelpCircle, desc: 'Common questions' },
    { name: 'Resources', path: '/resources', icon: FolderOpen, desc: 'Downloads & guides' },
    { name: 'Case Studies', path: '/case-studies', icon: BookOpen, desc: 'Project showcases' },
    { name: 'Factory Tour', path: '/factory-tour', icon: Factory, desc: 'Virtual facility tour' },
    { name: 'Distribution', path: '/distribution', icon: Users, desc: 'Partner with us' },
  ];

  /* ─── CLOSE ALL MENUS ─── */
  const closeAll = () => { setProductsOpen(false); setSolutionsOpen(false); setTechOpen(false); setToolsOpen(false); setMoreMenuOpen(false); setIsOpen(false); };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(5,5,8,0.92)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} data-testid="site-header-nav">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo with proper spacing */}
          <Link to="/" className="flex items-center group py-3" data-testid="logo-link">
            <img 
              src="/assets/brightluxx-logo-nav.png" 
              alt={branding?.company_name || 'Brightluxx'} 
              className="h-7 sm:h-8 w-auto transition-all duration-300 group-hover:opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            />
          </Link>

          {/* Desktop Navigation - Mega Menu */}
          <div className="hidden lg:flex items-center gap-5">

            {/* Products Dropdown */}
            <DropdownWrap
              isOpen={productsOpen}
              setOpen={setProductsOpen}
              testId="nav-products-dropdown"
              trigger={<NavBtn label="Products" href="/products" isOpenState={productsOpen} isActiveState={isActivePrefix('/products')} testId="nav-products" />}
            >
              <div className="shadow-2xl py-4 px-4 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '680px' }}>
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
                  <Link to="/products" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[cyan-400] hover:bg-[rgba(34,211,238,0.06)] transition-colors duration-150" data-testid="nav-products-view-all">
                    View All Products
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Solutions Dropdown */}
            <DropdownWrap
              isOpen={solutionsOpen}
              setOpen={setSolutionsOpen}
              testId="nav-solutions-dropdown"
              trigger={<NavBtn label="Solutions" href="/solutions" isOpenState={solutionsOpen} isActiveState={isActivePrefix('/solutions')} testId="nav-solutions" />}
            >
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '300px' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">BY INDUSTRY</div>
                {solutionItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/solutions/${item.id}`}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-[rgba(34,211,238,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    data-testid={`nav-solution-${item.id}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive(`/solutions/${item.id}`) ? 'bg-[rgba(34,211,238,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'
                    }`}>
                      <item.icon size={13} className={isActive(`/solutions/${item.id}`) ? 'text-[cyan-400]' : 'text-[var(--blx-text-2)]'} />
                    </div>
                    <div>
                      <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(`/solutions/${item.id}`) ? 'text-[cyan-400]' : 'text-[var(--blx-text)]'}`}>{item.name}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 mx-3 border-t border-[rgba(255,255,255,0.06)]">
                  <Link to="/solutions" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[cyan-400] hover:bg-[rgba(34,211,238,0.06)] transition-colors" data-testid="nav-solutions-view-all">
                    All Solutions
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Technologies Dropdown */}
            <DropdownWrap
              isOpen={techOpen}
              setOpen={setTechOpen}
              testId="nav-tech-dropdown"
              trigger={<NavBtn label="Technologies" href="/technology" isOpenState={techOpen} isActiveState={isActivePrefix('/technology')} testId="nav-technologies" />}
            >
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '300px' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">LED TECHNOLOGIES</div>
                {techItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/technology/${item.id}`}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(`/technology/${item.id}`) ? 'bg-[rgba(34,211,238,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    data-testid={`nav-tech-${item.id}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive(`/technology/${item.id}`) ? 'bg-[rgba(34,211,238,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'
                    }`}>
                      <item.icon size={13} className={isActive(`/technology/${item.id}`) ? 'text-[cyan-400]' : 'text-[var(--blx-text-2)]'} />
                    </div>
                    <div>
                      <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(`/technology/${item.id}`) ? 'text-[cyan-400]' : 'text-[var(--blx-text)]'}`}>{item.name}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 mx-3 border-t border-[rgba(255,255,255,0.06)]">
                  <Link to="/technology" onClick={closeAll} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[cyan-400] hover:bg-[rgba(34,211,238,0.06)] transition-colors" data-testid="nav-tech-view-all">
                    Technology Hub
                  </Link>
                </div>
              </div>
            </DropdownWrap>

            {/* Divider */}
            <div className="w-px h-5 bg-neutral-700/50" />

            {/* PRODUCT FAMILIES - Direct Links */}
            <Link
              to="/lumimorph"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/lumimorph') ? 'text-cyan-400' : 'text-cyan-400/70 hover:text-cyan-400'
              }`}
              data-testid="nav-lumimorph"
            >
              LumiMorph
              {isActivePrefix('/lumimorph') && <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400" />}
            </Link>

            <Link
              to="/naturatex"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/naturatex') ? 'text-emerald-400' : 'text-emerald-400/70 hover:text-emerald-400'
              }`}
              data-testid="nav-naturatex"
            >
              NaturaTex
              {isActivePrefix('/naturatex') && <span className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400" />}
            </Link>

            <Link
              to="/signatouch"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/signatouch') ? 'text-amber-400' : 'text-amber-400/70 hover:text-amber-400'
              }`}
              data-testid="nav-signatouch"
            >
              SignaTouch
              {isActivePrefix('/signatouch') && <span className="absolute bottom-0 left-0 right-0 h-px bg-amber-400" />}
            </Link>

            <Link
              to="/glassmorph"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/glassmorph') ? 'text-violet-400' : 'text-violet-400/70 hover:text-violet-400'
              }`}
              data-testid="nav-glassmorph"
            >
              GlassMorph
              {isActivePrefix('/glassmorph') && <span className="absolute bottom-0 left-0 right-0 h-px bg-violet-400" />}
            </Link>

            <Link
              to="/pixelvue"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActivePrefix('/pixelvue') ? 'text-rose-400' : 'text-rose-400/70 hover:text-rose-400'
              }`}
              data-testid="nav-pixelvue"
            >
              PixelVue
              {isActivePrefix('/pixelvue') && <span className="absolute bottom-0 left-0 right-0 h-px bg-rose-400" />}
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-neutral-700/50" />

            {/* Tools Dropdown */}
            <DropdownWrap
              isOpen={toolsOpen}
              setOpen={setToolsOpen}
              testId="nav-tools-dropdown"
              trigger={<NavBtn label="Tools" href="/calculator" isOpenState={toolsOpen} isActiveState={isToolsActive} testId="nav-tools" />}
            >
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '280px' }}>
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
                          isActive(link.path) ? 'bg-[rgba(34,211,238,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                        data-testid={`nav-tools-${link.path.substring(1)}`}
                      >
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(link.path) ? 'bg-[rgba(34,211,238,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'}`}>
                          <link.icon size={13} className={isActive(link.path) ? 'text-[cyan-400]' : 'text-[var(--blx-text-2)]'} />
                        </div>
                        <div>
                          <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(link.path) ? 'text-[cyan-400]' : 'text-[var(--blx-text)]'}`}>{link.name}</div>
                          <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </DropdownWrap>

            {/* More Menu (Hamburger) - Contains secondary links */}
            <DropdownWrap
              isOpen={moreMenuOpen}
              setOpen={setMoreMenuOpen}
              testId="nav-more-dropdown"
              trigger={
                <button 
                  className={`flex items-center gap-1 text-[0.75rem] font-bold tracking-[0.12em] uppercase py-2 transition-all duration-300 ${
                    moreMenuOpen ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                  data-testid="nav-more-btn"
                >
                  <Menu size={16} />
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${moreMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
              }
            >
              <div className="shadow-2xl py-3 px-1 max-h-[70vh] overflow-y-auto" style={{ ...panelStyle, width: '240px', right: 0, left: 'auto' }}>
                <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">MORE</div>
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeAll}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(item.path) ? 'bg-[rgba(34,211,238,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    data-testid={`nav-more-${item.path.substring(1)}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(item.path) ? 'bg-[rgba(34,211,238,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'}`}>
                      <item.icon size={13} className={isActive(item.path) ? 'text-cyan-400' : 'text-[var(--blx-text-2)]'} />
                    </div>
                    <div>
                      <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(item.path) ? 'text-cyan-400' : 'text-[var(--blx-text)]'}`}>{item.name}</div>
                      <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </DropdownWrap>

            <Link to="/contact" className="relative px-5 py-2 rounded-full text-xs font-bold tracking-[0.12em] bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#050508] shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105" data-testid="site-header-request-quote-button">
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
          <div 
            className="lg:hidden py-4 space-y-2 border-t border-[var(--blx-hairline)] overflow-x-hidden overflow-y-auto" 
            data-testid="mobile-menu" 
            style={{ overflowX: 'hidden', maxHeight: 'calc(100vh - 64px)' }}
          >
            <Link to="/products" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-cyan-400">Products</Link>
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-1">
                {productCategories.flatMap(g => g.items).slice(0, 8).map((item) => (
                  <Link key={item.cat} to={`/products?category=${item.cat}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-cyan-400 py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Families Section */}
            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">FEATURED PRODUCTS</div>
              <Link to="/lumimorph" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm tracking-wider text-cyan-400 font-medium">LumiMorph</span>
              </Link>
              <Link to="/naturatex" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm tracking-wider text-emerald-400 font-medium">NaturaTex</span>
              </Link>
              <Link to="/signatouch" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm tracking-wider text-amber-400 font-medium">SignaTouch</span>
              </Link>
              <Link to="/glassmorph" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-sm tracking-wider text-violet-400 font-medium">GlassMorph</span>
              </Link>
              <Link to="/pixelvue" onClick={closeAll} className="flex items-center gap-2 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-sm tracking-wider text-rose-400 font-medium">PixelVue</span>
              </Link>
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <Link to="/solutions" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-cyan-400">Solutions</Link>
              <div className="px-4 grid grid-cols-2 gap-1">
                {solutionItems.map((item) => (
                  <Link key={item.id} to={`/solutions/${item.id}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-cyan-400 py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <Link to="/technology" onClick={closeAll} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-cyan-400">Technologies</Link>
              <div className="px-4 grid grid-cols-2 gap-1">
                {techItems.map((item) => (
                  <Link key={item.id} to={`/technology/${item.id}`} onClick={closeAll} className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-cyan-400 py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">SPECIFIER TOOLS</div>
              {toolsGroups[0].links.slice(0, 5).map((link) => (
                <Link key={link.path} to={link.path} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2 pb-4">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">MORE</div>
              {moreMenuItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={closeAll} className="flex items-center gap-2 px-4 py-1.5">
                  <item.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{item.name}</span>
                </Link>
              ))}
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
