import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Monitor, Users, Layers, ShieldCheck, Truck, Award, Globe, CheckCircle, Cpu } from 'lucide-react';
import SEO from '../components/SEO';

const TOUR_SECTIONS = [
  {
    icon: Factory,
    title: 'Manufacturing Facility',
    desc: 'Our state-of-the-art production line with automated SMT placement, reflow soldering, and module assembly. Strict quality control at every stage.',
    details: ['20,000 sqm production area', 'ISO 9001:2015 certified', 'Automated optical inspection (AOI)', '100% aging test before dispatch'],
  },
  {
    icon: Monitor,
    title: 'Product Showroom',
    desc: 'Experience every LED technology in person. Our Dubai showroom features live demonstrations of MicroLED, COB, Transparent, Creative, and Outdoor displays.',
    details: ['All technologies on display', 'Live content demos', 'Side-by-side comparisons', 'Private consultation rooms'],
  },
  {
    icon: Layers,
    title: 'Quality Testing Lab',
    desc: 'Advanced testing equipment for brightness uniformity, color calibration, thermal stress testing, and IP rating validation.',
    details: ['Brightness & color uniformity testing', 'Thermal cycling chambers (-20C to 80C)', 'IP65/IP67 water ingress testing', '100,000-hour lifespan simulation'],
  },
  {
    icon: Truck,
    title: 'Warehouse & Logistics',
    desc: 'Our Dubai warehouse stocks 2,000+ sqm of LED displays for immediate delivery. Temperature-controlled storage and professional packing.',
    details: ['2,000+ sqm ready stock', 'Temperature-controlled storage', 'Same-week UAE delivery', 'International shipping capability'],
  },
];

const CERTIFICATIONS = [
  'ISO 9001:2015', 'CE Certified', 'FCC Compliant', 'RoHS Compliant',
  'ETL Listed', 'CCC Certified', 'IP65/IP67 Rated', 'UL 48 Listed',
];

const MANUFACTURING_STANDARDS = [
  { icon: Cpu, title: 'LED Chips', desc: 'Epistar, Cree, and Nationstar premium chips' },
  { icon: ShieldCheck, title: 'IC Drivers', desc: 'ICN2153 constant current drivers for uniform brightness' },
  { icon: Layers, title: 'PCB Quality', desc: '4-layer copper PCB with gold-plated connectors' },
  { icon: Award, title: 'Power Supply', desc: 'Meanwell industrial-grade power units' },
];

export default function FactoryTour() {
  return (
    <div>
      <SEO title="Factory Tour & Brand Value — Brightluxx" description="Visit our production facility. Learn about manufacturing standards, quality certifications, and the technology behind Brightluxx LED displays." path="/factory-tour" />

      {/* Hero */}
      <section className="py-16 sm:py-24" data-testid="factory-hero">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">FACTORY & BRAND VALUE</div>
            <h1 className="mb-4">Behind the Brilliance</h1>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider leading-relaxed max-w-lg">
              Discover our manufacturing excellence, quality standards, and the engineering that makes Brightluxx LED displays trusted across the GCC since 2005.
            </p>
          </div>
        </div>
      </section>

      {/* Established Since */}
      <section className="pb-12" data-testid="brand-heritage">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-[var(--blx-gold-3)]" style={{ fontFamily: 'var(--blx-font)' }}>2005</div>
              <div className="text-[0.625rem] tracking-[0.2em] text-[var(--blx-text-2)] mt-1">ESTABLISHED</div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold tracking-widest mb-2">Nearly Two Decades of Excellence</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider">
                Since 2005, Brightluxx has been at the forefront of LED display technology in the Middle East. From our first installation to over 1,500 screens across the GCC, our commitment to quality, innovation, and customer service has never wavered. We are a division of IHG Industry L.L.C, bringing global manufacturing capability with local UAE expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Sections */}
      <section className="py-12" data-testid="factory-sections">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">VIRTUAL TOUR</div>
            <h2>Inside Our Facilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOUR_SECTIONS.map((section) => (
              <div key={section.title} className="glass-panel p-6" data-testid={`tour-${section.title.toLowerCase().replace(/[\s&]/g, '-')}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.15)' }}>
                    <section.icon size={20} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest mb-2">{section.title}</h3>
                    <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-4">{section.desc}</p>
                    <ul className="space-y-1.5">
                      {section.details.map(d => (
                        <li key={d} className="flex items-center gap-2 text-[0.6875rem] text-[var(--blx-text-2)] tracking-wider">
                          <CheckCircle size={11} className="text-[var(--blx-gold-3)] flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Standards */}
      <section className="py-16 relative blx-led-grid" data-testid="manufacturing-standards">
        <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">COMPONENT QUALITY</div>
            <h2>Manufacturing Standards</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANUFACTURING_STANDARDS.map(item => (
              <div key={item.title} className="glass-panel p-6 text-center" data-testid={`mfg-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
                <item.icon size={24} className="text-[var(--blx-gold-3)] mx-auto mb-3" />
                <h4 className="text-xs font-bold tracking-widest mb-1">{item.title}</h4>
                <p className="text-[0.625rem] text-[var(--blx-text-2)] tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16" data-testid="certifications-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">CERTIFICATIONS</div>
            <h2>Quality Certifications</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map(cert => (
              <div key={cert} className="glass-panel px-6 py-3 text-xs font-bold tracking-wider" data-testid={`cert-${cert.toLowerCase().replace(/[\s\/]/g, '-')}`}>
                <ShieldCheck size={14} className="inline-block mr-2 text-[var(--blx-gold-3)]" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="py-12 relative blx-led-grid" data-testid="warranty-section">
        <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-panel p-8 text-center">
            <Globe size={32} className="text-[var(--blx-gold-3)] mx-auto mb-4" />
            <h2 className="mb-3">Global Quality, Local Expertise</h2>
            <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider max-w-xl mx-auto mb-6">
              All Brightluxx products are manufactured to international standards with premium components from leading global suppliers. Every display comes with our comprehensive warranty: <strong className="text-[var(--blx-text)]">3 years standard (extendable to 5 years)</strong>, free module replacements, firmware updates, and dedicated after-sales support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-gold px-8 py-3">Book Factory Visit</Link>
              <Link to="/services" className="btn-glass px-8 py-3">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
