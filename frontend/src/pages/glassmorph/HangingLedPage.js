import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Building2, Layers, Zap, Eye, Wrench, Sparkles } from 'lucide-react';
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
  { icon: Layers, title: 'Modular Design', desc: 'Lightweight strips connect seamlessly for any facade size. Easy to expand or reconfigure.' },
  { icon: Eye, title: '95% Transparency', desc: 'Maintains building views and natural light while adding dynamic media capability.' },
  { icon: Building2, title: 'Facade Integration', desc: 'Engineered for building exteriors. Mounts directly to glass or structural elements.' },
  { icon: Wrench, title: 'Quick Installation', desc: 'Pre-assembled strips with plug-and-play connections. Minimal disruption to building operations.' },
  { icon: Sparkles, title: 'Dynamic Content', desc: 'Display video, animations, and live content. Cloud-based content management included.' },
  { icon: Zap, title: 'Energy Efficient', desc: 'LED technology with smart brightness control. Reduces power consumption by up to 75%.' },
];

const FAQS = [
  { q: 'How is Hanging LED Film attached to facades?', a: 'The LED strips are suspended from top mounting points using aircraft-grade cables. The lightweight design (under 1kg/m²) requires minimal structural support. Strips can hang freely or be tensioned for stability in windy conditions.' },
  { q: 'Can it be installed on existing buildings?', a: 'Yes! Hanging LED Film is designed for retrofit installation. It can be mounted on existing glass, concrete, or steel facades without major modifications. We assess each building to determine the optimal mounting approach.' },
  { q: 'What happens during maintenance?', a: 'The modular design allows individual strip replacement without affecting the rest of the display. Remote diagnostics identify issues automatically. Our service team can typically complete repairs within 24 hours.' },
  { q: 'How is content managed?', a: 'Our cloud-based CMS allows remote content updates, scheduling, and monitoring. You can manage content from any device, set up playlists, and schedule content based on time of day or events.' },
];

export default function HangingLedPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="hanging-led-page">
      <SEO title="Hanging LED Film — Facade Media Display | GlassMorph" description="Lightweight transparent LED strips for building facades. Easy modular installation, 95% transparency, dynamic content display for architectural media." path="/glassmorph/hanging-led" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/549e4822b9cf036e00430c601e570ef5876e601d6ec4f15ef94644bb6063c64f.png" alt="Hanging LED Film" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link></div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Hanging LED Film</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Innovation Empowers Building Facades</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Lightweight transparent LED strips transform building facades into stunning media displays. Modular design allows unlimited size. Easy installation with minimal structural requirements.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#specs" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Specs</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '95%', label: 'Transparency' }, { value: '<1', unit: 'kg/m²', label: 'Weight' }, { value: '75%', label: 'Energy Saving' }, { value: '100k', unit: '+hrs', label: 'Lifespan' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Advantages</p><h2 className="text-3xl font-extralight text-white">Why Hanging LED Film</h2></div></FadeIn>
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

      <section id="specs" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[['Pixel Pitch', 'P10 / P15 / P20'], ['Transparency', '>95%'], ['Brightness', '2,500-5,000 nits'], ['Viewing Angle', '140°'], ['Refresh Rate', '3840Hz']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Strip Width', '20-50mm'], ['Weight', '<1kg/m²'], ['IP Rating', 'IP65'], ['Operating Temp', '-20°C to 50°C'], ['Lifespan', '100,000 hours']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6">
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
          <h2 className="text-3xl font-extralight text-white mb-6">Transform Your Facade</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a site assessment and quote for your Hanging LED Film project. Our engineering team will design the perfect solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
