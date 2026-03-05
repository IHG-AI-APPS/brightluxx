import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, Upload, GraduationCap, Cpu, Eye, Zap, Layers, FileText, Monitor, Tv, ShoppingBag, Shapes, Settings, Package } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);
  const toolsPaths = ['/calculator', '/compare', '/tech-guide', '/budget-estimator', '/value-engineering', '/spec-substitution', '/cpd-programme', '/design-assist', '/technology-selector', '/viewing-distance', '/power-estimator', '/installation-guide', '/project-planner'];
  const isToolsActive = toolsPaths.includes(location.pathname) || location.pathname.startsWith('/contractors');

  const navLinksGroup1 = [
    { name: 'Solutions', path: '/solutions' },
    { name: 'Technologies', path: '/technology' },
    { name: 'Case Studies', path: '/case-studies' },
  ];

  const navLinksGroup2 = [
    { name: 'Resources', path: '/resources' },
  ];

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

  const renderNavLink = (link) => (
    <Link
      key={link.path}
      to={link.path}
      className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
        (['/knowledge', '/technology', '/case-studies'].includes(link.path) ? isActivePrefix(link.path) : isActive(link.path))
          ? 'text-[var(--blx-text)]'
          : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
      }`}
      data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
    >
      {link.name}
      {(['/knowledge', '/technology', '/case-studies'].includes(link.path) ? isActivePrefix(link.path) : isActive(link.path)) && (
        <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />
      )}
    </Link>
  );

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

  return (
    <nav className="sticky top-0 z-50 sticky-nav" data-testid="site-header-nav">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img src="/assets/brightluxx-logo-dark.png" alt="Brightluxx" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

            {/* Products Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 flex items-center gap-1 ${
                  isActivePrefix('/products') ? 'text-[var(--blx-text)]' : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid="nav-products"
              >
                Products
                <ChevronDown size={12} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                {isActivePrefix('/products') && <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />}
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full -left-4 mt-1 shadow-2xl py-4 px-4"
                  style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(11,11,11,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', width: '680px' }}
                  data-testid="nav-products-dropdown"
                >
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
                              onClick={() => setProductsOpen(false)}
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
                    <Link
                      to="/products"
                      onClick={() => setProductsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.06)] transition-colors duration-150"
                      data-testid="nav-products-view-all"
                    >
                      View All 72 Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinksGroup1.map(renderNavLink)}

            {/* Tools Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 flex items-center gap-1 ${
                  isToolsActive ? 'text-[var(--blx-text)]' : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid="nav-tools"
              >
                Tools
                <ChevronDown size={12} className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
                {isToolsActive && <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />}
              </button>

              {toolsOpen && (
                <div
                  className="absolute top-full -left-4 mt-1 shadow-2xl py-3 px-1"
                  style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(11,11,11,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', width: '280px' }}
                  data-testid="nav-tools-dropdown"
                >
                  {toolsGroups.map((group, gi) => (
                    <div key={gi}>
                      {gi > 0 && <div className="mx-3 my-2 border-t border-[rgba(255,255,255,0.06)]" />}
                      <div className="px-3 pt-1 pb-1.5 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">{group.label}</div>
                      {group.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
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
              )}
            </div>

            {navLinksGroup2.map(renderNavLink)}

            <Link to="/contact" className="btn-gold px-4 py-1.5 text-xs" data-testid="site-header-request-quote-button">
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[var(--blx-text)]"
            data-testid="site-header-mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-[var(--blx-hairline)] overflow-x-hidden" data-testid="mobile-menu" style={{ overflowX: 'hidden' }}>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">Products</Link>

            {/* Mobile Product Categories */}
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-1">
                {productCategories.flatMap(g => g.items).slice(0, 8).map((item) => (
                  <Link
                    key={item.cat}
                    to={`/products?category=${item.cat}`}
                    onClick={() => setIsOpen(false)}
                    className="text-[0.6rem] tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] py-1 px-2 rounded hover:bg-[rgba(255,255,255,0.04)]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {navLinksGroup1.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">{link.name}</Link>
            ))}

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">SPECIFIER TOOLS</div>
              {toolsGroups[0].links.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              <div className="px-4 py-1 text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">CONTRACTOR TOOLS</div>
              {toolsGroups[1].links.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-1.5">
                  <link.icon size={12} className="text-[var(--blx-text-2)]" />
                  <span className="text-xs tracking-wider text-[var(--blx-text-2)] hover:text-[var(--blx-text)]">{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--blx-hairline)] pt-2 mt-2">
              {navLinksGroup2.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold tracking-widest hover:text-[var(--blx-gold-3)]">{link.name}</Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 mt-2 btn-gold text-center text-xs font-bold tracking-widest">Get Quote</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
