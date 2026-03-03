import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isToolsActive = ['/calculator', '/compare', '/tech-guide'].includes(location.pathname);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Inspirations', path: '/inspirations' },
    { name: 'Projects', path: '/projects' },
    { name: 'Showroom', path: '/showroom' },
  ];

  const toolsLinks = [
    { name: 'Screen Calculator', path: '/calculator' },
    { name: 'Compare Products', path: '/compare' },
    { name: 'Technology Guide', path: '/tech-guide' },
  ];

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
                  isActive(link.path)
                    ? 'text-[var(--blx-text)]'
                    : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--blx-text)]" />
                )}
              </Link>
            ))}

            {/* Tools Dropdown */}
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
                  className="absolute top-full left-0 mt-1 w-52 glass-panel shadow-2xl py-2"
                  style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(11,11,11,0.92)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 'var(--blx-radius-md)' }}
                  data-testid="nav-tools-dropdown"
                >
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2.5 text-[0.6875rem] font-bold tracking-wider transition-colors duration-200 ${
                        isActive(link.path)
                          ? 'text-[var(--blx-gold-3)] bg-[rgba(229,197,116,0.06)]'
                          : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)] hover:bg-[rgba(255,255,255,0.04)]'
                      }`}
                      data-testid={`nav-tools-${link.path.substring(1)}`}
                    >
                      {link.name}
                    </Link>
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
            <div className="px-4 pt-2">
              <div className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2">Tools</div>
            </div>
            {toolsLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-xs font-bold tracking-widest rounded-lg ${
                  isActive(link.path)
                    ? 'bg-[var(--blx-glass)] text-[var(--blx-gold-3)]'
                    : 'text-[var(--blx-text-2)] hover:bg-[var(--blx-glass)]'
                }`}
              >
                {link.name}
              </Link>
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
