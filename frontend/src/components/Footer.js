import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

const SOCIAL_ICONS = {
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  youtube: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  twitter: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  tiktok: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
};

const Footer = () => {
  const { branding, contact, social } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const socialLinks = Object.entries(social || {})
    .filter(([, url]) => url)
    .map(([key, url]) => ({ name: key, href: url, icon: SOCIAL_ICONS[key] }))
    .filter(s => s.icon);

  return (
    <footer className="relative blx-led-grid border-t border-[var(--blx-border)] mt-20" data-testid="footer">
      <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <img src={branding?.logo_url || '/assets/brightluxx-logo-dark.png'} alt={branding?.company_name || 'Brightluxx'} className="h-6 w-auto mb-4" />
            <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-4">
              {branding?.tagline || 'Premium LED display solutions for UAE and MENA.'} Established since {branding?.established_year || '2005'}.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3" data-testid="footer-social-links">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] transition-all duration-200 hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    aria-label={s.name}
                    data-testid={`footer-social-${s.name}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Explore</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Products</Link></li>
              <li><Link to="/services" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Services</Link></li>
              <li><Link to="/solutions" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Solutions</Link></li>
              <li><Link to="/applications" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Applications</Link></li>
              <li><Link to="/case-studies" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Case Studies</Link></li>
              <li><Link to="/blog" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Company</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">About Us</Link></li>
              <li><Link to="/contact" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Contact Us</Link></li>
              <li><Link to="/factory-tour" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Factory Tour</Link></li>
              <li><Link to="/faq" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">FAQ</Link></li>
              <li><Link to="/distribution" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Distribution</Link></li>
              <li><Link to="/supplier-registration" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Supplier Registration</Link></li>
              <li><Link to="/technical-support" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Technical Support</Link></li>
              <li><Link to="/resources" className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.625rem] font-bold mb-4 tracking-[0.2em]">Contact</h3>
            <ul className="space-y-3 text-xs">
              {contact?.address && (
                <li className="flex items-start gap-2 text-[var(--blx-text-2)] tracking-wider">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--blx-text)] transition-colors duration-200">
                    {contact.address}
                  </a>
                </li>
              )}
              {contact?.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="flex-shrink-0" />
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="flex-shrink-0" />
                  <a href={`mailto:${contact.email}`} className="text-[var(--blx-text-2)] hover:text-[var(--blx-text)] transition-colors duration-200 tracking-wider">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--blx-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.6875rem] text-[var(--blx-muted)] tracking-widest">
          <p>&copy; {currentYear} {branding?.company_name || 'Brightluxx'}. All rights reserved. Established {branding?.established_year || '2005'}.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-[var(--blx-text)] transition-colors duration-200">About Us</Link>
            <span className="opacity-30">|</span>
            <Link to="/contact" className="hover:text-[var(--blx-text)] transition-colors duration-200">Contact Us</Link>
            <span className="opacity-30">|</span>
            <span>A division of IHG Industry L.L.C</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
