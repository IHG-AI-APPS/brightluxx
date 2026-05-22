import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Plane, Feather, Eye, Zap, Award, Sparkles } from 'lucide-react';
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
  { icon: Feather, title: 'Ultra-Light 250g/m²', desc: 'Revolutionary lightweight construction enables drone-mounted displays that defy gravity.' },
  { icon: Eye, title: '95%+ Transparency', desc: 'Nearly invisible when off. Content appears to float against the sky backdrop.' },
  { icon: Award, title: 'World Record Size', desc: '5×15 meters - the largest flying LED screen ever made. Applied for Guinness World Records.' },
  { icon: Plane, title: 'Drone Compatible', desc: 'Engineered for aerial deployment. Compatible with commercial drone systems.' },
  { icon: Sparkles, title: 'Naked-Eye 3D', desc: 'Creates stunning 3D visual effects without special glasses against the night sky.' },
  { icon: Zap, title: 'Low Power', desc: 'Efficient LED technology enables extended flight times on battery power.' },
];

const USE_CASES = [
  { title: 'Concert & Festival Performances', desc: 'Create spectacular aerial light shows that captivate audiences. Content synchronized with music.', stats: ['Up to 10×30m multi-screen', 'Real-time control'] },
  { title: 'Brand Launches & Events', desc: 'Make an unforgettable impression with branded content floating in the sky.', stats: ['Premium brand impact', 'Social media amplification'] },
  { title: 'Air Weddings & Celebrations', desc: 'Transform special moments with romantic aerial displays and personalized messages.', stats: ['Custom content', 'Memorable experience'] },
];

const FAQS = [
  { q: 'How does Flying Display work?', a: 'The ultra-light LED mesh (250g/m²) is suspended from a specialized drone array. Multiple drones work in coordination to lift and stabilize the display. Content is transmitted wirelessly in real-time to the onboard controller.' },
  { q: 'What are the size options?', a: 'Standard single-screen size is 5×15 meters (world record). Multi-screen configurations can extend up to 10×30 meters using synchronized display arrays. Custom sizes available.' },
  { q: 'What are the weather limitations?', a: 'Flying Display operates safely in wind speeds up to 15 km/h. Rain, fog, or strong winds require postponement. We provide weather monitoring and backup scheduling for events.' },
  { q: 'How is content managed?', a: 'Content is prepared in advance and loaded onto the onboard controller. Real-time control allows for live adjustments and synchronization with music, lighting, or other event elements.' },
];

export default function FlyingDisplayPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="flying-display-page">
      <SEO title="Flying Display — Aerial LED Screen Technology | GlassMorph" description="World-record 5×15m drone-mounted transparent LED display. 250g/m² ultra-light construction for spectacular aerial shows and events." path="/glassmorph/flying-display" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/emergent-images/d100d5bc9e2955f9c46e02d8929cbcaa4a75eac35fab67dca14fce0769973b06.png" alt="Flying Display" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link></div>
          <div className="flex-1 flex items-center justify-center text-center px-6 py-16">
            <div className="max-w-2xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Flying Display</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Defy Gravity, Display the Impossible</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">World-record breaking 5×15 meter aerial LED display. Ultra-light 250g/m² transparent mesh creates stunning floating visuals for concerts, brand events, and spectacular celebrations.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Book an Event</Link>
                  <a href="#use-cases" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">See Use Cases</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '5×15', unit: 'm', label: 'World Record' }, { value: '250', unit: 'g/m²', label: 'Weight' }, { value: '2', unit: 'mm', label: 'Thickness' }, { value: '95%+', label: 'Transparency' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Innovation</p><h2 className="text-3xl font-extralight text-white">Breaking Boundaries</h2></div></FadeIn>
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

      <section id="use-cases" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p><h2 className="text-3xl font-extralight text-white">Spectacular Events</h2></div></FadeIn>
          <div className="space-y-6">
            {USE_CASES.map((uc, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm p-6 hover:border-violet-500/30 transition-colors">
                  <h3 className="text-xl font-light text-white mb-2">{uc.title}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{uc.desc}</p>
                  <div className="flex flex-wrap gap-3">{uc.stats.map((stat, j) => (<span key={j} className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-sm">{stat}</span>))}</div>
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
                  {[['Standard Size', '5m × 15m'], ['Max Size', '10m × 30m (multi-screen)'], ['Pixel Pitch', 'P10 / P15'], ['Transparency', '>95%'], ['Brightness', '3,000 nits']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Weight', '250g/m²'], ['Thickness', '2mm'], ['Wind Tolerance', 'Up to 15 km/h'], ['Operating Temp', '-10°C to 45°C'], ['Flight Time', 'Up to 25 min']].map(([label, value]) => (<div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>))}
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
          <h2 className="text-3xl font-extralight text-white mb-6">Create an Unforgettable Event</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Contact us to discuss your aerial display event. Our team handles everything from content creation to on-site operation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Book an Event</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
