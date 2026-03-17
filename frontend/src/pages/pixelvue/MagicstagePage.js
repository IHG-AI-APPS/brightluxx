import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Theater, Shield, Footprints, Layers, Zap, Music } from 'lucide-react';
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
  { label: 'LOAD CAPACITY', value: '1500kg/m²' },
  { label: 'PIXEL PITCH', value: 'P3.9-P6.25' },
  { label: 'IP RATING', value: 'IP65' },
  { label: 'QUICK SETUP', value: 'Modular' },
];

const FEATURES = [
  { icon: Theater, title: 'Stage Platform', desc: 'Designed specifically for stage and performance use' },
  { icon: Shield, title: 'Heavy Duty', desc: '1500kg/m² supports performers, equipment, and vehicles' },
  { icon: Footprints, title: 'Anti-Slip Surface', desc: 'Dance-safe textured surface for performer safety' },
  { icon: Layers, title: 'Modular Design', desc: 'Quick assembly for touring and temporary stages' },
  { icon: Music, title: 'Concert Ready', desc: 'Syncs with lighting and audio systems' },
  { icon: Zap, title: 'Fast Setup', desc: 'Designed for rapid touring deployment' },
];

const APPLICATIONS = [
  { name: 'Concerts', desc: 'Arena and stadium stages' },
  { name: 'TV Production', desc: 'Broadcast and award shows' },
  { name: 'Corporate Events', desc: 'Keynotes and presentations' },
  { name: 'Theater', desc: 'Dynamic set design' },
  { name: 'Fashion Shows', desc: 'Runway displays' },
  { name: 'Festivals', desc: 'Outdoor stage platforms' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P3.9 / P4.8 / P6.25' },
  { label: 'Panel Size', value: '500×500mm / 500×1000mm' },
  { label: 'Load Capacity', value: '1500kg/m²' },
  { label: 'Surface', value: 'Anti-slip matte finish' },
  { label: 'IP Rating', value: 'IP65' },
  { label: 'Brightness', value: '2000cd/m²' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Weight', value: '35kg per 500×500mm panel' },
  { label: 'Height Adjustment', value: '0-1000mm legs included' },
  { label: 'Control', value: 'DMX / Art-Net / sACN compatible' },
];

const FAQS = [
  { q: 'How quickly can Magicstage be set up?', a: 'A skilled crew can assemble a 10m×5m stage in approximately 4 hours. The modular panels connect quickly, and the adjustable legs allow for leveling on uneven ground. This makes it ideal for touring productions.' },
  { q: 'Can performers safely dance on it?', a: 'Absolutely! The anti-slip matte surface is designed for performer safety. The 1500kg/m² load capacity handles dancers, heavy equipment, and even vehicles for dramatic entrances.' },
  { q: 'How does it integrate with show control?', a: 'Magicstage supports DMX, Art-Net, and sACN protocols for seamless integration with lighting and show control systems. Content can be synchronized with music, lighting cues, and special effects.' },
  { q: 'What about outdoor use?', a: 'With IP65 rating, Magicstage is fully weatherproof for outdoor festivals and concerts. The high brightness (2000cd/m²) ensures visibility even in daylight conditions.' },
];

export default function MagicstagePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="magicstage-page">
      <SEO title="Magicstage — LED Stage Platform | PixelVue by Brightluxx" description="Professional LED stage floor for concerts, TV production, and events. Heavy-duty modular design with DMX integration for touring and permanent installations." path="/pixelvue/magicstage" />

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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">MAGICSTAGE</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">LED Stage Platform</p>
              <p className="text-neutral-500 max-w-lg mb-8">Own the stage. Magicstage transforms any floor into a dynamic visual canvas. Built for the rigors of touring with quick assembly, heavy-duty construction, and seamless show control integration.</p>
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
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/8843d7af8116d17ab305e7402dc9c17d8db6ca767924eaab92aaeebc08a20696.png" alt="Magicstage LED Platform" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Magicstage</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Stage</h2>
            <p className="text-neutral-500 mb-8">Contact us for rental options, purchase pricing, and technical support.</p>
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
