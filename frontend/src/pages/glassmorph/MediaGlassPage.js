import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Monitor, Building2, Smartphone, Zap, Eye, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const FEATURES = [
  { icon: Monitor, title: '160° Viewing Angle', desc: 'Wide viewing angle ensures content is visible from almost any position.' },
  { icon: Eye, title: '85% Transparency', desc: 'High transparency maintains natural light and views when display is off.' },
  { icon: Layers, title: 'Integrated Design', desc: 'LEDs are laminated within the glass, creating a seamless architectural element.' },
  { icon: Building2, title: 'Facade Ready', desc: 'Engineered for building exteriors with weather-resistant construction.' },
  { icon: Smartphone, title: 'Smart Control', desc: 'Cloud-based CMS for remote content management and scheduling.' },
  { icon: Zap, title: '75% Energy Saving', desc: 'Transparent design reduces power consumption compared to traditional displays.' },
];

const VARIANTS = [
  { name: 'Skyscraper', desc: 'Engineered for high-rise building facades. Maximum durability and brightness.', features: ['Wind load rated', 'High brightness 6,000 nits', 'Structural integration'] },
  { name: 'Luxurious', desc: 'Premium finish for retail and hospitality. Ultra-thin bezels and refined aesthetics.', features: ['Ultra-thin profile', 'Premium finish', 'Silent operation'] },
];

const FAQS = [
  { q: 'How is Media Glass installed on buildings?', a: 'Media Glass panels are installed as part of the curtain wall system. They replace standard glazing units and connect to the building\'s power and data infrastructure. Our engineering team works with your architects to ensure proper structural integration.' },
  { q: 'What content management options are available?', a: 'Our cloud-based CMS allows remote content updates, scheduling, and monitoring from anywhere. You can manage multiple displays from a single dashboard. We also offer API integration for dynamic content from your existing systems.' },
  { q: 'How bright is the display in daylight?', a: 'Media Glass offers up to 6,000 nits brightness for the Skyscraper variant, ensuring visibility even in direct sunlight. Standard indoor variants are 2,500-4,000 nits.' },
  { q: 'Can it be curved or custom shaped?', a: 'Yes, Media Glass can be manufactured in curved panels and custom shapes to match architectural designs. Contact us for custom geometry requirements.' },
];

export default function MediaGlassPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="media-glass-page">
      <SEO title="Media Glass — Integrated LED Glass Display | GlassMorph" description="Building-integrated LED glass panels with 160° viewing angle and 85% transparency. Transform facades into stunning media displays." path="/glassmorph/media-glass" />
      
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/06fff3af387692172824acfb770bda3dc0e0bd4814b6e2a9e716845fbe05e593.png" alt="Media Glass" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link></div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Media Glass</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Transparent Innovation, Intelligent Vision</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Building-integrated LED glass that transforms architecture into living media. 160° viewing angle, 85% transparency, and seamless integration with curtain wall systems.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#variants" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Variants</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '160°', label: 'View Angle' }, { value: '85%', label: 'Transparency' }, { value: '6,000', unit: ' nits', label: 'Brightness' }, { value: '75%', label: 'Energy Saving' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technology</p><h2 className="text-3xl font-extralight text-white">Advanced Media Integration</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0"><feature.icon size={20} className="text-violet-400" /></div>
                  <div><h3 className="text-white font-medium mb-1">{feature.title}</h3><p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Range</p><h2 className="text-3xl font-extralight text-white">Media Glass Series</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {VARIANTS.map((v, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm p-6 hover:border-violet-500/30 transition-colors">
                  <h3 className="text-xl font-light text-white mb-3">{v.name}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{v.desc}</p>
                  <div className="space-y-2">{v.features.map((f, j) => (<div key={j} className="flex items-center gap-2 text-neutral-300 text-sm"><Check size={14} className="text-violet-400" />{f}</div>))}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[['Pixel Pitch', 'P5 / P10 / P15'], ['Transparency', '75-85%'], ['Brightness', '2,500-6,000 nits'], ['Viewing Angle', '160°'], ['Color Depth', '16bit']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Glass Thickness', '12-24mm'], ['Max Panel Size', '3m × 6m'], ['IP Rating', 'IP65/IP67'], ['Operating Temp', '-30°C to 60°C'], ['Lifespan', '100,000 hours']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p><h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2></div></FadeIn>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-white font-medium pr-4">{faq.q}</span><ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div></motion.div>)}</AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-violet-500/5 border-t border-violet-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Transform Your Building</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a consultation for your Media Glass project. Our engineering team will work with your architects.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
