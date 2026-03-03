import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative blx-led-grid border-t border-[var(--blx-border)] mt-20" data-testid="footer">
      <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <img src="/assets/brightluxx-logo-dark.png" alt="Brightluxx" className="h-6 w-auto mb-4" />
            <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider">
              Premium LED display solutions for UAE and MENA.
            </p>
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Explore</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Products</Link></li>
              <li><Link to="/inspirations" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Inspirations</Link></li>
              <li><Link to="/projects" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Projects</Link></li>
              <li><Link to="/showroom" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Virtual Showroom</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Tools</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/calculator" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Screen Calculator</Link></li>
              <li><Link to="/compare" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Compare Products</Link></li>
              <li><Link to="/tech-guide" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Technology Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Contact</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-[var(--blx-text-2)] tracking-wider">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0" />
                <a href="tel:+971559910711" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">
                  +971 55 991 0711
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" />
                <a href="mailto:sales@brightluxx.com" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">
                  sales@brightluxx.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--blx-border)] text-center text-[0.6875rem] text-[var(--blx-muted)] tracking-widest">
          <p>&copy; {currentYear} Brightluxx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
