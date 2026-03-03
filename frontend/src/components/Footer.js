import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--blx-bg-raised)] border-t border-[var(--blx-border)] mt-20" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-2xl font-bold font-display mb-4 tracking-tight">
              <span className="text-gradient">BRIGHTLUXX</span>
            </div>
            <p className="text-sm text-[var(--blx-text-2)] mb-4 leading-relaxed">
              Premium LED display solutions for UAE. OEM-grade engineering, UAE-ready delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/technologies" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  Technologies
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/updates" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  What's New
                </Link>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h3 className="font-semibold mb-4">Applications</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-[var(--blx-text-2)]">Retail & Malls</li>
              <li className="text-[var(--blx-text-2)]">Corporate & Boardrooms</li>
              <li className="text-[var(--blx-text-2)]">Outdoor Advertising</li>
              <li className="text-[var(--blx-text-2)]">Events & Staging</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-[var(--blx-text-2)]">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+971559910711" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  +971 55 991 0711
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:sales@brightluxx.com" className="text-[var(--blx-text-2)] hover:text-[var(--blx-accent)]">
                  sales@brightluxx.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--blx-border)] text-center text-sm text-[var(--blx-muted)]">
          <p>© {currentYear} Brightluxx. All rights reserved. Built for UAE heat. Tuned for maximum nits.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;