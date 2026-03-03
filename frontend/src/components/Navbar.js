import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Technologies', path: '/technologies' },
    { name: 'Applications', path: '/applications' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Configurator', path: '/configurator' },
    { name: 'What\'s New', path: '/updates' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 sticky-nav" data-testid="navbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <div className="text-2xl font-bold font-display tracking-tight">
              <span className="text-gradient">BRIGHTLUXX</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[var(--blx-accent)]'
                    : 'text-[var(--blx-text-2)] hover:text-[var(--blx-text)]'
                }`}
                data-testid={`nav-${link.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-gold px-5 py-2.5 text-sm"
              data-testid="cta-book-demo"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--blx-text)]"
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive(link.path)
                    ? 'bg-[var(--blx-panel)] text-[var(--blx-accent)]'
                    : 'text-[var(--blx-text-2)] hover:bg-[var(--blx-panel)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-gold block text-center"
            >
              Book Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;