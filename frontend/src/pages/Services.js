import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Headphones, Clock, CheckCircle, ArrowRight, Phone, Zap, Settings, Truck, Users } from 'lucide-react';
import SEO from '../components/SEO';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Professional Installation',
    desc: 'Expert LED display installation by certified technicians. Structural assessment, precision mounting, calibration, and commissioning — delivered on time.',
    features: ['Structural survey & risk assessment', 'Custom mounting solutions', 'Pixel-perfect calibration', 'Content system setup', 'Operator training included'],
    cta: 'Request Installation Quote',
  },
  {
    icon: Settings,
    title: 'Repair & Maintenance',
    desc: 'Preventive maintenance contracts and rapid-response repair services. Keep your display running at peak performance year-round.',
    features: ['Preventive maintenance contracts', 'Module-level repair & replacement', 'Hot-swappable spare parts stock', 'Brightness & color recalibration', 'Firmware updates & optimization'],
    cta: 'Get Maintenance Plan',
  },
  {
    icon: Headphones,
    title: '24/7 Technical Support',
    desc: 'Round-the-clock support center with remote diagnostics. Our engineers are always available when you need them.',
    features: ['24/7 phone & WhatsApp helpdesk', 'Remote diagnostics & troubleshooting', 'Same-day on-site support (UAE)', 'Dedicated account manager', 'Priority response for contract clients'],
    cta: 'Contact Support',
  },
  {
    icon: Truck,
    title: 'Supply & Logistics',
    desc: 'Local stock availability in Dubai with express delivery across UAE and GCC. Custom import and project logistics.',
    features: ['2,000+ sqm in Dubai warehouse', 'Same-week delivery across UAE', 'GCC & MENA export logistics', 'Project-specific import handling', 'Customs clearance support'],
    cta: 'Check Availability',
  },
  {
    icon: Users,
    title: 'Design Assist & Consultation',
    desc: 'Free expert consultation from concept to specification. Our team helps you select the right technology, pixel pitch, and budget.',
    features: ['Free concept consultation', 'Technology recommendation', 'Budget estimation', 'BOQ & specification writing', 'Visualization renders'],
    cta: 'Book Free Consultation',
  },
  {
    icon: Shield,
    title: 'Warranty & After-Sales',
    desc: 'Comprehensive warranty coverage with genuine spare parts. Extended warranty options available for complete peace of mind.',
    features: ['Standard 3-year warranty', 'Extended warranty up to 5 years', 'Genuine OEM spare parts', 'Free firmware updates', 'Performance guarantee'],
    cta: 'Learn About Warranty',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Consultation', desc: 'Free site survey and needs assessment.' },
  { num: '02', title: 'Specification', desc: 'Technology selection, BOQ, and budget.' },
  { num: '03', title: 'Quotation', desc: 'Detailed quotation within 48 hours.' },
  { num: '04', title: 'Delivery', desc: 'Local stock or express import.' },
  { num: '05', title: 'Installation', desc: 'Professional mounting and calibration.' },
  { num: '06', title: 'Support', desc: 'Ongoing maintenance and 24/7 helpdesk.' },
];

export default function Services() {
  return (
    <div>
      <SEO title="Services — Brightluxx" description="Professional LED display installation, repair, maintenance, and 24/7 technical support across UAE and GCC." path="/services" />

      {/* Hero */}
      <section className="py-16 sm:py-24" data-testid="services-hero">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">OUR SERVICES</div>
            <h1 className="mb-4">Complete LED Display Solutions</h1>
            <p className="text-sm text-[var(--blx-text-2)] tracking-wider leading-relaxed max-w-lg">
              From design to delivery, installation to maintenance — we provide end-to-end services backed by 20 years of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-16" data-testid="services-grid">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass-panel p-6 flex flex-col" data-testid={`service-${s.title.toLowerCase().replace(/[\s&\/]/g, '-')}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.15)' }}>
                  <s.icon size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <h3 className="text-sm font-bold mb-2 tracking-widest">{s.title}</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider mb-4">{s.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[0.6875rem] text-[var(--blx-text-2)] tracking-wider">
                      <CheckCircle size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-glass px-4 py-2 text-[0.625rem] font-bold tracking-[0.12em] text-center">
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotation Disclaimer */}
      <section className="py-12 relative blx-led-grid" data-testid="quotation-disclaimer">
        <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-panel p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Clock size={24} className="text-[var(--blx-gold-3)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold mb-2 tracking-widest">Quotation Terms</h3>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider">
                  We provide detailed quotations within 48 hours. Please note that <strong className="text-[var(--blx-text)]">installation costs and structural work are not included</strong> in standard hardware quotations unless site-specific details — including material availability, structural conditions, installation location, and risk assessment — have been confirmed through a site survey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-20" data-testid="services-process">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">HOW WE WORK</div>
            <h2>Our Process</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-2xl font-bold text-[var(--blx-gold-3)] mb-2" style={{ fontFamily: 'var(--blx-font)' }}>{step.num}</div>
                <h4 className="text-xs font-bold mb-1 tracking-widest">{step.title}</h4>
                <p className="text-[0.625rem] text-[var(--blx-text-2)] tracking-wider">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" data-testid="services-cta">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-xs text-[var(--blx-text-2)] mb-8 tracking-wider">Contact us for a free consultation and site survey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-3">Get Quote</Link>
            <a href="tel:+97142585754" className="btn-glass px-8 py-3 flex items-center justify-center gap-2">
              <Phone size={14} /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
