import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Shield, Zap, Volume2, Eye, Thermometer, Palette } from 'lucide-react';
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
  { icon: Eye, title: 'Dynamic Privacy', desc: 'Instant switching between transparent and opaque states for on-demand privacy.' },
  { icon: Shield, title: '99% UV Block', desc: 'Protect interiors and occupants from harmful UV radiation while controlling light.' },
  { icon: Thermometer, title: 'Temperature Control', desc: 'Reduces solar heat gain, lowering cooling costs and improving comfort.' },
  { icon: Volume2, title: '20% Noise Reduction', desc: 'Laminated construction provides acoustic insulation for quieter spaces.' },
  { icon: Zap, title: 'Low Power', desc: 'Only 5W/m² when transparent. Zero power in opaque state.' },
  { icon: Palette, title: 'Art Glass Options', desc: 'Available with custom patterns, colors, and gradients for creative applications.' },
];

const VARIANTS = [
  { name: 'Smart Facade Glass', desc: 'Heavy-duty for building exteriors. Tempered and laminated.', thickness: '12-24mm' },
  { name: 'Art Glass', desc: 'Decorative patterns and colors for interior design.', thickness: '10-16mm' },
  { name: 'Limited Edition', desc: 'Premium finishes with custom tints and effects.', thickness: '10-20mm' },
  { name: 'Standard Series', desc: 'Cost-effective solution for standard applications.', thickness: '6-12mm' },
];

const FAQS = [
  { q: 'What is the difference between Smart Film and Switchable Glass?', a: 'Smart Film is a retrofit solution applied to existing glass. Switchable Glass is a pre-manufactured glass product with PDLC laminated inside during factory production. Switchable Glass offers superior optical clarity and durability but requires new glass installation.' },
  { q: 'How is Switchable Glass powered?', a: 'A low-voltage transformer (48-65V AC) connects to the glass via edge bus bars. The bus bars are typically hidden in the frame. Power consumption is only 5W/m² when transparent.' },
  { q: 'Can Switchable Glass be tempered?', a: 'Yes, Switchable Glass can be heat-strengthened or fully tempered for safety applications. This is done before the PDLC lamination process.' },
  { q: 'What maintenance is required?', a: 'Switchable Glass requires minimal maintenance - just regular glass cleaning. The PDLC layer is sealed between glass panes and protected from the environment. Expected lifespan is 20+ years.' },
];

export default function SwitchableGlassPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="switchable-glass-page">
      <SEO title="Switchable Glass — Pre-Laminated Smart Glass | GlassMorph" description="Factory-laminated PDLC smart glass with 99% UV blocking. Ready-to-install switchable privacy glass for offices, hotels, and residences." path="/glassmorph/switchable-glass" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/emergent-images/0a8f0c2cdad29691e223fd0f292d83947baade0536484eaea6512b6f07c90df0.png" alt="Switchable Glass" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link></div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Switchable Glass</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Smart Glass, Smarter Spaces</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Pre-laminated PDLC smart glass, factory-ready for immediate installation. 99% UV blocking, ultra-low power consumption, and superior optical clarity compared to retrofit films.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#variants" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Options</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '99%+', label: 'UV Block' }, { value: '5W', unit: '/m²', label: 'Power' }, { value: '20%', label: 'Noise Reduction' }, { value: '20+', unit: ' yrs', label: 'Lifespan' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Benefits</p><h2 className="text-3xl font-extralight text-white">Why Choose Switchable Glass</h2></div></FadeIn>
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

      <section id="variants" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Range</p><h2 className="text-3xl font-extralight text-white">Switchable Glass Series</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {VARIANTS.map((v, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm p-6 hover:border-violet-500/30 transition-colors">
                  <h3 className="text-xl font-light text-white mb-2">{v.name}</h3>
                  <p className="text-neutral-400 text-sm mb-3">{v.desc}</p>
                  <div className="text-violet-400 text-sm">Thickness: {v.thickness}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Optical</h3>
                <div className="space-y-3">
                  {[['Transparency (ON)', '75-82%'], ['Haze (ON)', '<4%'], ['UV Blocking', '>99%'], ['Switching Speed', '<100ms']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Glass Thickness', '6-24mm'], ['Max Size', '1.8m × 3.5m'], ['Operating Voltage', '48-65V AC'], ['Power', '5W/m²'], ['Lifespan', '50,000+ cycles']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

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

      <section className="py-20 px-6 text-center bg-violet-500/5 border-t border-violet-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready for Smart Glass?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a quote for your Switchable Glass project. Custom sizes and configurations available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
