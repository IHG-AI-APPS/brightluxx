import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ShoppingBag, Tag, Layers, Zap, Wifi, Eye } from 'lucide-react';
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
  { label: 'HEIGHT', value: '300mm' },
  { label: 'PIXEL PITCH', value: 'P1.5-P2' },
  { label: 'BRIGHTNESS', value: '800cd/m²' },
  { label: 'DEPTH', value: '35mm' },
];

const FEATURES = [
  { icon: ShoppingBag, title: 'Shelf Integration', desc: 'Designed to fit standard retail gondola shelving' },
  { icon: Tag, title: 'Dynamic Pricing', desc: 'Real-time price updates and promotions' },
  { icon: Eye, title: 'Point-of-Sale Impact', desc: 'Catch attention at the moment of purchase' },
  { icon: Layers, title: 'Slim Profile', desc: '35mm depth preserves shelf space' },
  { icon: Wifi, title: 'Wireless Sync', desc: 'WiFi content updates across all units' },
  { icon: Zap, title: 'Low Power', desc: 'Energy-efficient operation' },
];

const APPLICATIONS = [
  { name: 'Supermarkets', desc: 'Aisle and category displays' },
  { name: 'Convenience Stores', desc: 'Cooler and shelf edges' },
  { name: 'Electronics', desc: 'Product feature highlights' },
  { name: 'Pharmacies', desc: 'Health product promotions' },
  { name: 'Fashion Retail', desc: 'Accessory displays' },
  { name: 'Duty Free', desc: 'Airport retail signage' },
];

const SPECS = [
  { label: 'Pixel Pitch', value: 'P1.5 / P1.8 / P2' },
  { label: 'Display Height', value: '300mm' },
  { label: 'Display Length', value: '600 / 900 / 1200mm' },
  { label: 'Depth', value: '35mm' },
  { label: 'Weight', value: '2.5kg per 600mm' },
  { label: 'Brightness', value: '800cd/m²' },
  { label: 'Viewing Angle', value: '160°/160°' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Control', value: 'WiFi/LAN/USB' },
  { label: 'Mounting', value: 'Clip-on / Rail mount' },
];

const FAQS = [
  { q: 'How does iShelf attach to existing shelving?', a: 'iShelf uses universal clip-on brackets that fit most standard gondola shelving systems. Rail-mount options are also available for custom installations. No tools or permanent modifications required.' },
  { q: 'Can content be updated across multiple stores?', a: 'Yes! Our cloud-based CMS allows centralized content management across unlimited locations. Schedule promotions, update pricing, and push campaigns to any combination of stores and shelves.' },
  { q: 'What content formats are supported?', a: 'iShelf supports images, videos, and dynamic text content. Integration APIs allow real-time pricing updates from POS systems. Templates are available for common retail use cases.' },
  { q: 'How many units can be linked together?', a: 'iShelf units can be daisy-chained for extended lengths. A single controller can manage up to 10 connected units displaying synchronized or independent content.' },
];

export default function IShelfPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="ishelf-page">
      <SEO title="iShelf — Retail Shelf LED Display | PixelVue by Brightluxx" description="Compact LED display for retail shelving. Dynamic pricing, promotions, and point-of-sale marketing for supermarkets, convenience stores, and retail." path="/pixelvue/ishelf" />

      <section className="relative min-h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-neutral-950 to-neutral-950" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-rose-400 text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to PixelVue
            </Link>
            <FadeIn>
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">COMMERCIAL SERIES</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">iSHELF</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Retail Shelf LED Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">Transform your shelves into dynamic sales drivers. iShelf brings digital signage to the point of purchase with slim, easy-to-install displays perfect for pricing, promotions, and product information.</p>
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
            <div className="aspect-[16/9] rounded-lg overflow-hidden border border-rose-500/20">
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png" alt="iShelf Retail Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose iShelf</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Upgrade Your Retail Shelves</h2>
            <p className="text-neutral-500 mb-8">Contact us for volume pricing and pilot program details.</p>
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
