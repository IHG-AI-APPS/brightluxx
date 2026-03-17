import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Eye, Sparkles, Layers, Zap, Sun, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>);
};

const QUICK_SPECS = [
  { label: 'TRANSPARENCY', value: '95%' },
  { label: 'THICKNESS', value: '3mm' },
  { label: 'APPLICATION', value: 'Glass Adhesive' },
  { label: 'BRIGHTNESS', value: '5000cd/m²' },
];

const FEATURES = [
  { icon: Eye, title: 'Near-Invisible', desc: '95% transparency when off, maintains clear glass view' },
  { icon: Sparkles, title: 'Ultra-Thin Film', desc: '3mm thin self-adhesive film applies directly to glass' },
  { icon: Sun, title: 'High Brightness', desc: '5000cd/m² for daylight visibility' },
  { icon: Layers, title: 'No Frame Required', desc: 'Adheres directly to existing glass surfaces' },
  { icon: Building2, title: 'Architectural Grade', desc: 'Designed for high-end facades and skylights' },
  { icon: Zap, title: 'Flexible Size', desc: 'Custom cut to any shape or dimension' },
];

const APPLICATIONS = [
  { name: 'Building Facades', desc: 'Transform glass into media canvas' },
  { name: 'Skylights', desc: 'Dynamic overhead displays' },
  { name: 'Retail Windows', desc: 'See-through advertising' },
  { name: 'Auto Showrooms', desc: 'Premium glass displays' },
  { name: 'Museums', desc: 'Display cases and partitions' },
  { name: 'Corporate', desc: 'Office glass walls' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P3 / P5 / P8 / P10' },
  { label: 'Transparency', value: '95%' },
  { label: 'Film Thickness', value: '3mm' },
  { label: 'Brightness', value: '5000cd/m²' },
  { label: 'Viewing Angle', value: '140°/140°' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Weight', value: '3.5kg/m²' },
  { label: 'Application', value: 'Self-adhesive to glass' },
  { label: 'Power', value: '120W/m² avg' },
  { label: 'IP Rating', value: 'IP40' },
];

const FAQS = [
  { q: 'How transparent is CrystalFlex really?', a: 'CrystalFlex achieves 95% transparency, meaning it\'s virtually invisible when displaying dark content or powered off. The LED strips are so thin they appear as subtle lines on the glass, preserving the view through the glass.' },
  { q: 'Can it be applied to existing windows?', a: 'Yes! CrystalFlex is designed as a retrofit solution. The self-adhesive backing applies directly to existing glass surfaces. Professional installation ensures proper alignment and electrical connections.' },
  { q: 'What about glass replacement or building codes?', a: 'CrystalFlex adds minimal weight and does not affect glass structural properties. It meets building codes for facade applications. We provide engineering documentation and can work with architects to ensure compliance.' },
  { q: 'How is it powered and controlled?', a: 'CrystalFlex connects to standard power and data via slim cables routed to the glass edge. Control options include WiFi, 4G, and LAN. Our team designs cable routing to minimize visual impact.' },
];

export default function CrystalFlexPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="crystalflex-page">
      <SEO title="CrystalFlex — Transparent LED Film Display | PixelVue by Brightluxx" description="Ultra-thin 3mm transparent LED film with 95% transparency. Self-adhesive application for glass facades, skylights, and windows." path="/pixelvue/crystalflex" />

      <section className="relative min-h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-neutral-950 to-neutral-950" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-rose-400 text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to PixelVue
            </Link>
            <FadeIn>
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">CREATIVE SERIES</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">CRYSTALFLEX</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Transparent LED Film Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">See through the future. CrystalFlex transforms any glass surface into a transparent display while maintaining 95% visibility. Ultra-thin self-adhesive film for architectural and retail applications.</p>
            </FadeIn>
            
            <FadeIn delay={1}>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {QUICK_SPECS.map((spec, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-rose-400">{spec.value}</div>
                    <div className="text-[10px] tracking-wider text-neutral-500 uppercase">{spec.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={2}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 text-sm font-medium tracking-wider transition-colors">Request Quote</Link>
                <a href="#specs" className="border border-white/20 hover:border-rose-500/50 text-white px-8 py-4 text-sm font-medium tracking-wider transition-colors">View Specs</a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1} className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-rose-500/20">
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png" alt="CrystalFlex Transparent Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose CrystalFlex</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i}>
                <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30 hover:border-rose-500/30 transition-colors">
                  <feature.icon size={28} className="text-rose-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">APPLICATIONS</p><h2 className="text-3xl md:text-4xl font-bold text-white">Perfect For</h2></div></FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i}>
                <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-950/50 text-center hover:border-rose-500/30 transition-colors">
                  <h3 className="text-white font-semibold mb-1">{app.name}</h3>
                  <p className="text-neutral-500 text-xs">{app.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">TECHNICAL</p><h2 className="text-3xl md:text-4xl font-bold text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="border border-neutral-800 rounded-lg overflow-hidden">
              {SPECS.map((spec, i) => (
                <div key={i} className={`flex justify-between p-4 ${i !== SPECS.length - 1 ? 'border-b border-neutral-800/50' : ''} hover:bg-neutral-900/30`}>
                  <span className="text-neutral-400 text-sm">{spec.label}</span>
                  <span className="text-white text-sm font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FAQ</p><h2 className="text-3xl md:text-4xl font-bold text-white">Common Questions</h2></div></FadeIn>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i}>
                <div className="border border-neutral-800 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-900/50 transition-colors">
                    <span className="text-white font-medium">{faq.q}</span>
                    <ChevronDown size={20} className={`text-rose-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (<div className="px-5 pb-5 text-neutral-400 text-sm">{faq.a}</div>)}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">READY TO ORDER?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Glass Surfaces</h2>
            <p className="text-neutral-500 mb-8">Contact us for a site survey and custom design consultation.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-rose-500 hover:bg-rose-400 text-white px-10 py-4 text-sm font-medium tracking-wider transition-colors">Request Quote</Link>
              <Link to="/pixelvue" className="border border-white/20 hover:border-rose-500/50 text-white px-10 py-4 text-sm font-medium tracking-wider transition-colors">More Products</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
