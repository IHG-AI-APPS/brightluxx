import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Monitor, Layers, Zap, Wifi, Smartphone, Grid3X3 } from 'lucide-react';
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
  { icon: Grid3X3, title: 'Seamless Splicing', desc: '5-piece iPoster with 16:9 resolution ratio creates flawless, cohesive video walls.' },
  { icon: Layers, title: 'Ultra-Slim Design', desc: 'Only 40mm thick and 69kg weight for easy transport and placement.' },
  { icon: Monitor, title: 'High Performance', desc: 'High brightness, contrast, and 3840Hz refresh rate for stunning visuals.' },
  { icon: Wifi, title: 'Easy Control', desc: 'USB, HDMI, WiFi for local control. Optional 4G for remote access.' },
  { icon: Zap, title: 'Magnetic Assembly', desc: 'Precision magnetic frames for quick, tool-free setup and seamless alignment.' },
  { icon: Smartphone, title: 'Flexible Packaging', desc: 'Flight case or nylon bag options. 1-in-1, 2-in-1, or 4-in-1 configurations.' },
];

const APPLICATIONS = [
  'Hotels & Lobbies', 'Shopping Malls', 'Reception Areas', 'Retail Stores', 'Exhibition Halls', 'Airports', 'Banks', 'Restaurants'
];

const FAQS = [
  { q: 'How many iPoster units can be spliced together?', a: 'iPoster supports unlimited splicing thanks to its magnetic frame design. Common configurations include 5-panel video walls (16:9 ratio), but larger installations are easily achievable.' },
  { q: 'What content formats are supported?', a: 'iPoster supports all major video and image formats. Content can be loaded via USB drive, HDMI input, WiFi transfer, or optional 4G remote transmission.' },
  { q: 'How portable is the iPoster?', a: 'At 40mm thin and 69kg, iPoster is designed for mobility. It comes with flight case or nylon bag packaging options, making it ideal for events and temporary installations.' },
  { q: 'What is the pixel pitch?', a: 'iPoster is available in P2.5 and P3 pixel pitch options. P2.5 is recommended for closer viewing distances (2-5m), while P3 works well for larger spaces.' },
];

export default function IPosterPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="iposter-page">
      <SEO title="iPoster — Indoor LED Standee Display | PixelVue" description="Advanced indoor LED poster with seamless splicing, 40mm thin design, and easy WiFi/HDMI control. Perfect for hotels, retail, and exhibitions." path="/pixelvue/iposter" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png" alt="iPoster" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All PixelVue Products</Link></div>
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-xl">
              <FadeIn><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">LED Poster Series</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">iPoster</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Seamless Splicing. Stunning Impact.</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Advanced indoor moveable digital signage with seamless 16:9 splicing capability. Ultra-slim 40mm profile, magnetic assembly, and flexible control options make iPoster the perfect choice for any environment.</p></FadeIn>
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

      <section className="py-12 px-6 border-b border-neutral-800 bg-rose-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '40mm', label: 'Thickness' }, { value: '69kg', label: 'Weight' }, { value: '16:9', label: 'Splicing Ratio' }, { value: '3840Hz', label: 'Refresh Rate' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}</div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Features</p><h2 className="text-3xl font-extralight text-white">Modern Design, Convenient Assembly</h2></div></FadeIn>
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

      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p><h2 className="text-3xl font-extralight text-white">Perfect For Any Environment</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="flex flex-wrap justify-center gap-3">
              {APPLICATIONS.map((app, i) => (<span key={i} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-sm text-sm">{app}</span>))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="specs" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[['Pixel Pitch', 'P2.5 / P3'], ['Resolution', '192×768 / 160×640'], ['Brightness', '1000-1500 cd/m²'], ['Refresh Rate', '3840Hz'], ['Viewing Angle', '160°'], ['Contrast', '5000:1']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Dimensions', '480×1920×40mm'], ['Weight', '69kg'], ['Frame Material', 'Aluminum alloy'], ['Input', 'USB, HDMI, WiFi, 4G'], ['Power', '200W max'], ['Lifespan', '100,000 hours']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
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
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Order iPoster?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a quote for your iPoster deployment. Volume pricing and custom configurations available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/pixelvue" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
