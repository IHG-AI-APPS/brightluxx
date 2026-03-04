import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calculator, BarChart3, MonitorPlay, DollarSign, Wrench, Upload } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);
  const toolsPaths = ['/calculator', '/compare', '/tech-guide', '/budget-estimator', '/value-engineering', '/spec-substitution'];
  const isToolsActive = toolsPaths.includes(location.pathname) || location.pathname.startsWith('/contractors');

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Knowledge', path: '/knowledge' },
    { name: 'Resources', path: '/resources' },
    { name: 'Projects', path: '/projects' },
  ];

  const toolsGroups = [
    {
      label: 'SPECIFIER TOOLS',
      links: [
        { name: 'Screen Calculator', path: '/calculator', icon: Calculator, desc: 'Pixel pitch, resolution & specs' },
        { name: 'Budget Estimator', path: '/budget-estimator', icon: DollarSign, desc: 'Project cost by size & pitch' },
        { name: 'Compare Products', path: '/compare', icon: BarChart3, desc: 'Side-by-side comparison' },
      ],
    },
    {
      label: 'CONTRACTOR TOOLS',
      links: [
        { name: 'Value Engineering', path: '/value-engineering', icon: Wrench, desc: 'Cost-saving alternatives' },
        { name: 'Spec Substitution', path: '/spec-substitution', icon: Upload, desc: 'Upload BOQ for review' },
      ],
    },
  ];

  const allToolsLinks = toolsGroups.flatMap(g => g.links);

  return (
    <nav className="sticky top-0 z-50 sticky-nav" data-testid="site-header-nav">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img
              src="/assets/brightluxx-logo-dark.png"
              alt="Brightluxx"
              className="h-7 sm:h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                  (link.path === '/knowledge' ? isActivePrefix('/knowledge') : isActive(link.path))
                    ? 'text-[var(--blx-text)]'
                    : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                {(link.path === '/knowledge' ? isActivePrefix('/knowledge') : isActive(link.path)) && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />
                )}
              </Link>
            ))}

            {/* Tools Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 flex items-center gap-1 ${
                  isToolsActive
                    ? 'text-[var(--blx-text)]'
                    : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid="nav-tools"
              >
                Tools
                <ChevronDown size={12} className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
                {isToolsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />
                )}
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
                            isActive(link.path)
                              ? 'bg-[rgba(229,197,116,0.08)]'
                              : 'hover:bg-[rgba(255,255,255,0.04)]'
                          }`}
                          data-testid={`nav-tools-${link.path.substring(1)}`}
                        >
                          <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isActive(link.path) ? 'bg-[rgba(229,197,116,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'}`}>
                            <link.icon size={13} className={isActive(link.path) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text-2)]'} />
                          </div>
                          <div>
                            <div className={`text-[0.6875rem] font-bold tracking-wider ${isActive(link.path) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-text)]'}`}>{link.name}</div>
                            <div className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-[0.6875rem] font-bold tracking-[0.14em] relative pb-0.5 transition-colors duration-200 ${
                isActive('/contact')
                  ? 'text-[var(--blx-text)]'
                  : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
              }`}
              data-testid="nav-contact"
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />
              )}
            </Link>

            <Link
              to="/contact"
              className="btn-gold px-5 py-2"
              data-testid="site-header-request-quote-button"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--blx-text)]"
            data-testid="site-header-mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-[var(--blx-hairline)]" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-xs font-bold tracking-widest rounded-lg ${
                  isActive(link.path)
                    ? 'bg-[var(--blx-glass)] text-[var(--blx-text)]'
                    : 'text-[var(--blx-text-2)] hover:bg-[var(--blx-glass)]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Tools Section */}
            {toolsGroups.map((group, gi) => (
              <React.Fragment key={gi}>
                <div className="px-4 pt-2">
                  <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1">{group.label}</div>
                </div>
                {group.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 mx-2 px-3 py-2.5 text-xs font-bold tracking-widest rounded-lg ${
                      isActive(link.path)
                        ? 'bg-[var(--blx-glass)] text-[var(--blx-gold-3)]'
                        : 'text-[var(--blx-text-2)] hover:bg-[var(--blx-glass)]'
                    }`}
                  >
                    <link.icon size={14} className={isActive(link.path) ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)]'} />
                    {link.name}
                  </Link>
                ))}
              </React.Fragment>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 text-xs font-bold tracking-widest rounded-lg ${
                isActive('/contact')
                  ? 'bg-[var(--blx-glass)] text-[var(--blx-text)]'
                  : 'text-[var(--blx-text-2)] hover:bg-[var(--blx-glass)]'
              }`}
            >
              Contact
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-gold block text-center mx-4 mt-4"
            >
              Get Quote
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
