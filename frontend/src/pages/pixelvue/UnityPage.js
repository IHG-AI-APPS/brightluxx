import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Layers, Wrench, RotateCcw, Building2, Square, Circle } from 'lucide-react';
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
  { icon: Layers, title: 'Flexible Panel Sizes', desc: 'Standard 1000×250mm panel can be cut to 750×250mm or 500×250mm for custom configurations.' },
  { icon: Wrench, title: 'Front & Rear Maintenance', desc: 'Easy suction tool access. Only 15cm clearance needed for rear maintenance.' },
  { icon: Square, title: '90° Column Option', desc: 'Create stunning corner displays that capture attention from every angle.' },
  { icon: RotateCcw, title: 'Rotatable Module', desc: 'Modules can be rotated with adjustable degrees for seamless curved screens.' },
  { icon: Building2, title: 'Multiple Install Methods', desc: 'Wall-mounted, hung using cabinet rings, or floor-stacked. Front and back assembly supported.' },
  { icon: Circle, title: 'Creative Shapes', desc: 'Assemble into flat, curved, or column configurations to fit 90% of indoor applications.' },
];

const SHAPES = [
  { name: 'Flat Wall', desc: 'Standard video wall configuration' },
  { name: 'Curved Screen', desc: 'Concave or convex curves' },
  { name: '90° Column', desc: 'Corner wrapping displays' },
  { name: 'Hanging', desc: 'Suspended from ceiling' },
  { name: 'Floor Stack', desc: 'Free-standing installation' },
];

const FAQS = [
  { q: 'What makes Unity different from other commercial displays?', a: 'Unity\'s modular design allows unprecedented flexibility. The panels can be cut to different sizes, rotated for curves, and configured into flat, curved, or column shapes — all with the same product.' },
  { q: 'What pixel pitch options are available?', a: 'Unity is available in P2.6, P2.9, P3.9, and P4.8 pixel pitch. P2.6-2.9 recommended for indoor retail, P3.9-4.8 for larger viewing distances.' },
  { q: 'How difficult is maintenance?', a: 'Very easy. Unity supports both front and rear maintenance. Front maintenance uses a simple suction tool. Rear maintenance needs only 15cm clearance behind the screen.' },
  { q: 'Can Unity be used outdoors?', a: 'Unity is designed for indoor and semi-outdoor use. For fully outdoor applications, we recommend our weatherproof outdoor series.' },
];

export default function UnityPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="unity-page">
      <SEO title="Unity — Modular Commercial LED Display | PixelVue" description="Flexible modular LED display system for flat, curved, and column configurations. Front and rear maintenance, multiple pixel pitch options." path="/pixelvue/unity" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png" alt="Unity Display" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All PixelVue Products</Link></div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">Commercial Series</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Unity</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Flexibility Meets Performance</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">The ultimate modular commercial display. Configure flat walls, sweeping curves, or dramatic columns with the same versatile panel system. Perfect for retail, commercial, and window displays.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#shapes" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Configurations</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-b border-neutral-800 bg-rose-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '1000×250', unit: 'mm', label: 'Panel Size' }, { value: '90°', label: 'Column Option' }, { value: '15cm', label: 'Rear Clearance' }, { value: '90%', label: 'Indoor Coverage' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-rose-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Features</p><h2 className="text-3xl font-extralight text-white">Unmatched Versatility</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0"><feature.icon size={20} className="text-rose-400" /></div>
                  <div><h3 className="text-white font-medium mb-1">{feature.title}</h3><p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="shapes" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Configurations</p><h2 className="text-3xl font-extralight text-white">Various Creative Shapes</h2></div></FadeIn>
          <div className="grid md:grid-cols-5 gap-4">
            {SHAPES.map((shape, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm p-4 text-center hover:border-rose-500/30 transition-colors">
                  <h3 className="text-white font-medium mb-1">{shape.name}</h3>
                  <p className="text-neutral-500 text-xs">{shape.desc}</p>
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
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[['Pixel Pitch', 'P2.6 / P2.9 / P3.9 / P4.8'], ['Panel Size', '1000×250mm (cuttable)'], ['Brightness', '800-1200 cd/m²'], ['Refresh Rate', '3840Hz'], ['Viewing Angle', '160°'], ['Gray Scale', '14-16bit']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Panel Weight', '3.5kg'], ['Material', 'Die-cast aluminum'], ['Installation', 'Wall/Hang/Floor'], ['Maintenance', 'Front & Rear'], ['Environment', 'Indoor/Semi-outdoor'], ['Lifespan', '100,000 hours']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
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

      <section className="py-20 px-6 text-center bg-rose-500/5 border-t border-rose-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready for Unity?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a consultation for your Unity display project. Our team will help design the perfect configuration.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/pixelvue" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
