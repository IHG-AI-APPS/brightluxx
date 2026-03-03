import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, MapPin, Calendar, Users, CheckCircle } from 'lucide-react';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`blx-scroll-glow ${inView ? 'in-view' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const CAPABILITIES = [
  'Indoor LED Screens & Video Walls',
  'Outdoor LED Displays & Billboards',
  'Transparent & Clear Film LED',
  'Flexible & Curved LED Modules',
  'Interactive Floor LED Displays',
  'Road Signal & Traffic LED Signage',
  'Rental & Staging LED Systems',
  'Spherical & Creative LED Installations',
  'Virtual Production LED Stages',
  'All-in-One Conference LED Screens',
];

const STATS = [
  { value: '2012', label: 'Established', icon: Calendar },
  { value: 'UAE', label: 'Headquartered', icon: MapPin },
  { value: '500+', label: 'Projects Delivered', icon: Award },
  { value: '24/7', label: 'Support', icon: Users },
];

export default function About() {
  return (
    <div className="py-20" data-testid="about-page">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 data-testid="about-page-title">About Brightluxx</h1>
          <p className="text-sm text-[var(--blx-text-2)] mt-2 tracking-wider" style={{ textTransform: 'none' }}>
            The digital display division of IHG Industry L.L.C
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100}>
              <div className="glass-panel p-5 text-center" data-testid={`about-stat-${stat.label.toLowerCase()}`}>
                <stat.icon size={20} className="mx-auto mb-2 text-[var(--blx-gold-3)]" />
                <div className="text-xl font-bold tracking-wider mb-0.5">{stat.value}</div>
                <div className="text-[0.625rem] text-[var(--blx-muted)] tracking-[0.15em]">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <FadeIn>
            <div className="glass-panel p-6 lg:p-8">
              <h2 className="text-base font-bold tracking-wider mb-4">Who We Are</h2>
              <div className="space-y-4 text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider" style={{ textTransform: 'none' }}>
                <p>
                  <strong className="text-[var(--blx-text)]">Brightluxx</strong> is a one-stop solution for all digital display needs. As the digital display division of <strong className="text-[var(--blx-text)]">IHG Industry L.L.C</strong>, we deliver exceptional digital solutions to the LED sector with high-quality, customizable, and long-lasting products.
                </p>
                <p>
                  Since 2012, we've established ourselves as the region's leading manufacturer and supplier of LED display screens and digital signage solutions. We are one of the most well-known firms in the UAE, with a global reputation for manufacturing and installing indoor and outdoor LED screens.
                </p>
                <p>
                  We choose LEDs as our fundamental technology because they are energy-efficient and environmentally benign. We supply the most up-to-date technology with the most reliable components, consistently exceeding our clients' expectations and requirements.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={100}>
              <div className="glass-panel p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.1)', border: '1px solid rgba(229,197,116,0.12)' }}>
                    <Eye size={18} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wider">Our Vision</h3>
                </div>
                <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider" style={{ textTransform: 'none' }}>
                  We're focused on how people interact with their screens — what features matter most, the environments they're used in. Every day we gain new knowledge, uncovering ways to help you find the finest solutions you may not even be aware of.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="glass-panel p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.1)', border: '1px solid rgba(229,197,116,0.12)' }}>
                    <Target size={18} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wider">Our Mission</h3>
                </div>
                <p className="text-xs text-[var(--blx-text-2)] leading-relaxed tracking-wider" style={{ textTransform: 'none' }}>
                  To develop visual technology by establishing relationships and creating customer-driven solutions focused on value creation and integration of new opportunities. Through high-end technology and flawless services, we strive to provide the highest value to our consumers.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Capabilities */}
        <FadeIn>
          <div className="glass-panel p-6 lg:p-8 mb-16">
            <h2 className="text-base font-bold tracking-wider mb-6">Our Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAPABILITIES.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <CheckCircle size={14} className="text-[var(--blx-gold-3)] flex-shrink-0" />
                  <span className="text-xs text-[var(--blx-text-2)] tracking-wider" style={{ textTransform: 'none' }}>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-lg mb-2">Ready to Transform Your Space?</h3>
          <p className="text-xs text-[var(--blx-text-2)] tracking-wider mb-6" style={{ textTransform: 'none' }}>Let's discuss how our LED solutions can elevate your business.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2" data-testid="about-cta-contact">
              Get in Touch <ArrowRight size={14} />
            </Link>
            <Link to="/projects" className="px-8 py-3.5 text-xs font-bold tracking-wider rounded-full border border-[var(--blx-border)] hover:border-[var(--blx-border-2)] transition-colors duration-200 inline-flex items-center gap-2" data-testid="about-cta-projects">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
