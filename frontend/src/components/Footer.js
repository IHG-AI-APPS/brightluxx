import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--blx-bg-raised)] border-t border-[var(--blx-border)] mt-20" data-testid="footer">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <img
              src="/assets/brightluxx-logo-dark.png"
              alt="Brightluxx"
              className="h-6 w-auto mb-4"
            />
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed">
              Premium LED display solutions for UAE and MENA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">Products</Link></li>
              <li><Link to="/inspirations" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">Inspirations</Link></li>
              <li><Link to="/projects" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">Projects</Link></li>
              <li><Link to="/showroom" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">Virtual Showroom</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-[var(--blx-text-2)]">Retail & Malls</li>
              <li className="text-[var(--blx-text-2)]">Corporate & Boardrooms</li>
              <li className="text-[var(--blx-text-2)]">Outdoor Advertising</li>
              <li className="text-[var(--blx-text-2)]">Events & Staging</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-[var(--blx-text-2)]">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+971559910711" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">
                  +971 55 991 0711
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:sales@brightluxx.com" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)] transition-colors duration-200">
                  sales@brightluxx.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--blx-border)] text-center text-sm text-[var(--blx-muted)]">
          <p>&copy; {currentYear} Brightluxx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
