import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Sun, Shield, Wifi, Thermometer, Droplets, Monitor } from 'lucide-react';
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
  { label: 'BRIGHTNESS', value: '5000cd/m²' },
  { label: 'IP RATING', value: 'IP65' },
  { label: 'TEMP RANGE', value: '-30°~50°C' },
  { label: 'REFRESH', value: '3840Hz' },
];

const FEATURES = [
  { icon: Sun, title: 'High Brightness', desc: '5000cd/m² for perfect visibility in direct sunlight' },
  { icon: Shield, title: 'IP65 Protection', desc: 'Fully weatherproof for any outdoor environment' },
  { icon: Thermometer, title: 'Wide Temp Range', desc: 'Operates from -30°C to +50°C with smart thermal management' },
  { icon: Droplets, title: 'Rain & Dust Proof', desc: 'Sealed cabinet design protects against elements' },
  { icon: Wifi, title: '4G Connectivity', desc: 'Remote content management via cellular network' },
  { icon: Monitor, title: 'Auto Brightness', desc: 'Light sensor automatically adjusts for ambient conditions' },
];

const APPLICATIONS = [
  { name: 'Street Advertising', desc: 'Roadside digital billboards' },
  { name: 'Transit', desc: 'Bus stops and stations' },
  { name: 'Outdoor Retail', desc: 'Storefronts and plazas' },
  { name: 'Events', desc: 'Outdoor festivals and concerts' },
  { name: 'Stadiums', desc: 'Arena advertising' },
  { name: 'Parks', desc: 'Public information displays' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P4 / P5 / P6' },
  { label: 'Brightness', value: '5000-6000cd/m²' },
  { label: 'IP Rating', value: 'IP65 (front), IP54 (rear)' },
  { label: 'Operating Temp', value: '-30°C ~ +50°C' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Viewing Angle', value: '140°/140°' },
  { label: 'Cabinet Material', value: 'Aluminum + Steel' },
  { label: 'Control', value: '4G/LAN/WiFi' },
  { label: 'Power', value: 'AC 110-240V' },
  { label: 'Lifespan', value: '100,000+ hours' },
];

const FAQS = [
  { q: 'How does OOHPoster handle extreme weather?', a: 'OOHPoster is built with IP65-rated front panels that withstand rain, snow, and dust. The cabinet features active ventilation and heating elements to maintain optimal operating temperature from -30°C to +50°C.' },
  { q: 'What is the visibility in bright sunlight?', a: 'With 5000-6000cd/m² brightness and anti-glare coating, OOHPoster maintains excellent visibility even in direct midday sun. The auto-brightness feature adjusts output based on ambient light.' },
  { q: 'How is content updated remotely?', a: 'OOHPoster features built-in 4G connectivity for remote content updates. Our cloud platform allows you to schedule content, monitor display health, and push updates to any location worldwide.' },
  { q: 'What installation options are available?', a: 'OOHPoster can be ground-mounted with a concrete base, wall-mounted, or pole-mounted. We provide engineering support and can customize mounting solutions for specific site requirements.' },
];

export default function OOHPosterPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="ooh-poster-page">
      <SEO title="OOHPoster — Outdoor LED Display | PixelVue by Brightluxx" description="Weather-resistant outdoor LED poster display with 5000cd/m² brightness and IP65 rating. Perfect for street advertising, transit, and outdoor events." path="/pixelvue/ooh-poster" />

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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">OOHPOSTER</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Outdoor Digital Poster</p>
              <p className="text-neutral-500 max-w-lg mb-8">Built to withstand the elements. High-brightness outdoor LED poster with IP65 weatherproofing, wide temperature tolerance, and 4G remote management for advertising, transit, and public information.</p>
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
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png" alt="OOHPoster Outdoor LED Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Built for Outdoors</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your OOHPoster Today</h2>
            <p className="text-neutral-500 mb-8">Contact us for pricing, site surveys, and installation support.</p>
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
