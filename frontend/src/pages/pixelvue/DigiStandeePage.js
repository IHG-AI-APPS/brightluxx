import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Wifi, Layers, Zap, Move, Smartphone } from 'lucide-react';
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
  { label: 'THICKNESS', value: '45mm' },
  { label: 'BRIGHTNESS', value: '1200cd/m²' },
  { label: 'REFRESH', value: '3840Hz' },
  { label: 'WEIGHT', value: '55kg' },
];

const FEATURES = [
  { icon: Move, title: 'Versatile Placement', desc: 'Freestanding design with lockable casters for easy repositioning' },
  { icon: Layers, title: 'Compact Footprint', desc: 'Space-efficient design fits any retail or event environment' },
  { icon: Monitor, title: 'Vivid Display', desc: 'High brightness and contrast for eye-catching visuals' },
  { icon: Wifi, title: 'Easy Content', desc: 'WiFi, USB, and HDMI for flexible content delivery' },
  { icon: Zap, title: 'Quick Setup', desc: 'Plug-and-play operation with no installation required' },
  { icon: Smartphone, title: 'Remote Management', desc: 'Cloud-based CMS for multi-location control' },
];

const APPLICATIONS = [
  { name: 'Retail', desc: 'In-store promotions and product highlights' },
  { name: 'Events', desc: 'Trade shows and conferences' },
  { name: 'Hospitality', desc: 'Hotel lobbies and restaurants' },
  { name: 'Healthcare', desc: 'Waiting rooms and wayfinding' },
  { name: 'Real Estate', desc: 'Property showcases' },
  { name: 'Automotive', desc: 'Showroom displays' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P2.5 / P3' },
  { label: 'Screen Size', value: '576×1728mm' },
  { label: 'Thickness', value: '45mm' },
  { label: 'Total Weight', value: '55kg (with base)' },
  { label: 'Brightness', value: '1200cd/m²' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Viewing Angle', value: '160°/160°' },
  { label: 'Base', value: 'Wheeled, lockable' },
  { label: 'Input', value: 'WiFi/USB/HDMI' },
  { label: 'Power', value: 'AC 110-240V' },
];

const FAQS = [
  { q: 'How portable is the Digi Standee?', a: 'The Digi Standee features lockable casters for easy repositioning. A single person can move it around your store or venue. For transport, it can be disassembled and packed in the included flight case.' },
  { q: 'What screen sizes are available?', a: 'The standard Digi Standee is 576×1728mm. Custom sizes can be accommodated for larger projects. Contact us for dimensions and pricing.' },
  { q: 'How long does setup take?', a: 'The Digi Standee is plug-and-play. Simply wheel it into position, connect power, and start displaying content. Initial setup takes under 5 minutes.' },
  { q: 'Can I manage multiple units centrally?', a: 'Yes! Our cloud CMS allows you to manage content across multiple Digi Standees from a single dashboard, perfect for retail chains and franchise locations.' },
];

export default function DigiStandeePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="digi-standee-page">
      <SEO title="Digi Standee — Portable LED Display Stand | PixelVue by Brightluxx" description="Versatile digital standee display with wheeled base for easy repositioning. Perfect for retail, events, and hospitality applications." path="/pixelvue/digi-standee" />

      <section className="relative min-h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-neutral-950 to-neutral-950" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-rose-400 text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to PixelVue
            </Link>
            <FadeIn>
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">LED POSTER SERIES</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">DIGI STANDEE</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Versatile Digital Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">The go-anywhere LED standee for retail, events, and hospitality. Wheeled base for easy repositioning, plug-and-play operation, and cloud-based content management for effortless deployment.</p>
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
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-rose-500/20">
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png" alt="Digi Standee LED Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Digi Standee</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your Digi Standee Today</h2>
            <p className="text-neutral-500 mb-8">Contact us for pricing, lead times, and custom configuration options.</p>
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
