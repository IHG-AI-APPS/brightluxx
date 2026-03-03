import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Inspirations', path: '/inspirations' },
    { name: 'Projects', path: '/projects' },
    { name: 'Showroom', path: '/showroom' },
    { name: 'Contact', path: '/contact' },
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
