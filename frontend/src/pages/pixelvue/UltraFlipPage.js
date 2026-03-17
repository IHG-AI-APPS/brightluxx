import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Wifi, Layers, RotateCcw, Zap, Smartphone } from 'lucide-react';
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
  { label: 'THICKNESS', value: '30mm' },
  { label: 'FLIP ANGLE', value: '180°' },
  { label: 'BRIGHTNESS', value: '1500cd/m²' },
  { label: 'WEIGHT', value: '38kg' },
];

const FEATURES = [
  { icon: RotateCcw, title: 'Premium Flip Mechanism', desc: 'Smooth 180° motorized flip with whisper-quiet operation' },
  { icon: Layers, title: 'Ultra-Slim Profile', desc: 'Industry-leading 30mm thin design' },
  { icon: Monitor, title: 'High Brightness', desc: '1500cd/m² for visibility in bright environments' },
  { icon: Wifi, title: 'Smart Connectivity', desc: 'WiFi, 4G, and cloud-based content management' },
  { icon: Zap, title: 'Energy Efficient', desc: 'Low power consumption for reduced operating costs' },
  { icon: Smartphone, title: 'App Control', desc: 'Full control from smartphone or tablet' },
];

const APPLICATIONS = [
  { name: 'Luxury Retail', desc: 'High-end brand experiences' },
  { name: 'Hotels', desc: 'Lobby and concierge displays' },
  { name: 'Automotive', desc: 'Showroom presentations' },
  { name: 'Banking', desc: 'Branch digital signage' },
  { name: 'Airports', desc: 'Premium lounges' },
  { name: 'Corporate', desc: 'Executive boardrooms' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P2.5 / P3' },
  { label: 'Cabinet Size', value: '600×1800mm' },
  { label: 'Thickness', value: '30mm' },
  { label: 'Weight', value: '38kg' },
  { label: 'Brightness', value: '1500cd/m²' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Viewing Angle', value: '160°/160°' },
  { label: 'Contrast', value: '5000:1' },
  { label: 'Control', value: 'WiFi/4G/USB/HDMI' },
  { label: 'Power', value: 'AC 110-240V' },
];

const FAQS = [
  { q: 'What makes Ultra Flip different from iFlip?', a: 'Ultra Flip is our premium offering with a slimmer 30mm profile, higher brightness (1500cd/m²), quieter flip mechanism, and enhanced build quality for luxury environments.' },
  { q: 'How reliable is the flip mechanism?', a: 'The motorized flip mechanism is rated for over 100,000 cycles. It uses precision bearings and a belt-driven system for smooth, quiet operation with minimal maintenance.' },
  { q: 'Can I schedule automated content and flip sequences?', a: 'Yes! The cloud management platform allows you to schedule content changes and flip sequences throughout the day. You can also trigger flips based on sensor input or external triggers.' },
  { q: 'Is it suitable for 24/7 operation?', a: 'Absolutely. Ultra Flip is designed for continuous operation with advanced heat management and durable components rated for 100,000+ hours.' },
];

export default function UltraFlipPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="ultra-flip-page">
      <SEO title="Ultra Flip — Premium LED Flip Display | PixelVue by Brightluxx" description="Premium flip-style LED poster with ultra-slim 30mm profile and 1500cd/m² brightness. Perfect for luxury retail, hotels, and corporate environments." path="/pixelvue/ultra-flip" />

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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">ULTRA FLIP</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Premium Flip Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">The pinnacle of flip-style LED signage. Ultra-slim 30mm profile with premium build quality and whisper-quiet operation. Designed for luxury environments where every detail matters.</p>
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
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png" alt="Ultra Flip LED Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Ultra Flip</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your Ultra Flip Today</h2>
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
