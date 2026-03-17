import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Monitor, Wifi, Usb, Smartphone, Check, Layers, RotateCcw } from 'lucide-react';
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
  { label: 'THICKNESS', value: '35mm' },
  { label: 'FLIP ANGLE', value: '180°' },
  { label: 'DISPLAY', value: 'Double-Sided' },
  { label: 'CONTROL', value: 'WiFi/4G' },
];

const FEATURES = [
  { icon: RotateCcw, title: 'Flip Mechanism', desc: 'Unique 180° flip design for attention-grabbing displays' },
  { icon: Layers, title: 'Double-Sided Display', desc: 'Content visible from both sides for maximum exposure' },
  { icon: Monitor, title: 'Ultra-Slim Profile', desc: '35mm thickness for sleek, modern aesthetics' },
  { icon: Wifi, title: 'Wireless Control', desc: 'WiFi and 4G connectivity for remote content management' },
  { icon: Usb, title: 'Easy Content Update', desc: 'USB, HDMI, and cloud-based content options' },
  { icon: Smartphone, title: 'Mobile App Control', desc: 'Manage displays from your smartphone' },
];

const APPLICATIONS = [
  { name: 'Retail Stores', desc: 'Window displays and in-store promotions' },
  { name: 'Hotels & Lobbies', desc: 'Welcome signage and event information' },
  { name: 'Exhibitions', desc: 'Trade show booths and product launches' },
  { name: 'Restaurants', desc: 'Menu boards and promotional content' },
  { name: 'Corporate', desc: 'Lobby displays and meeting room signage' },
  { name: 'Airports', desc: 'Flight information and advertising' },
];

const SPECS = [
  { label: 'Pixel Pitch', p25: 'P2.5', p3: 'P3' },
  { label: 'Module Size', p25: '320×160mm', p3: '192×192mm' },
  { label: 'Cabinet Size', p25: '640×1920mm', p3: '576×1728mm' },
  { label: 'Thickness', p25: '35mm', p3: '35mm' },
  { label: 'Weight', p25: '45kg', p3: '42kg' },
  { label: 'Brightness', p25: '1000cd/m²', p3: '1000cd/m²' },
  { label: 'Refresh Rate', p25: '3840Hz', p3: '3840Hz' },
  { label: 'Viewing Angle', p25: '160°/160°', p3: '160°/160°' },
  { label: 'Control', p25: 'WiFi/4G/USB', p3: 'WiFi/4G/USB' },
  { label: 'Power', p25: 'AC 110-240V', p3: 'AC 110-240V' },
];

const FAQS = [
  { q: 'How does the flip mechanism work?', a: 'The iFlip features a motorized 180° flip mechanism that rotates the display panel, creating an eye-catching motion effect. This can be programmed to flip at set intervals or triggered manually.' },
  { q: 'Can it display different content on each side?', a: 'Yes! The double-sided display allows you to show different content on each side, perfect for directional messaging or varied promotional content.' },
  { q: 'What are the connectivity options?', a: 'iFlip supports WiFi, 4G/LTE, USB, and HDMI inputs. Content can be managed remotely via our cloud platform or locally via USB drive.' },
  { q: 'Is it suitable for outdoor use?', a: 'The standard iFlip is designed for indoor use. For outdoor applications, we recommend the OOHPoster which is weatherproof rated.' },
];

export default function IFlipPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="iflip-page">
      <SEO title="iFlip — Digital LED Standee | PixelVue by Brightluxx" description="Revolutionary flip-style LED standee with 180° rotating display. Double-sided, ultra-slim design perfect for retail, hospitality, and events." path="/pixelvue/iflip" />

      {/* Hero */}
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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">iFLIP</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Attention-Grabbing Flip Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">Revolutionary flip-style LED standee with 180° rotating mechanism. Double-sided display creates dynamic, eye-catching presentations that stop customers in their tracks.</p>
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
                <Link to="/contact" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 text-sm font-medium tracking-wider transition-colors">
                  Request Quote
                </Link>
                <a href="#specs" className="border border-white/20 hover:border-rose-500/50 text-white px-8 py-4 text-sm font-medium tracking-wider transition-colors">
                  View Specs
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1} className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-rose-500/20">
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png" 
                alt="iFlip LED Display"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose iFlip</h2>
            </div>
          </FadeIn>
          
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

      {/* Applications */}
      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">APPLICATIONS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Perfect For</h2>
            </div>
          </FadeIn>
          
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

      {/* Specifications */}
      <section id="specs" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">TECHNICAL</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Specifications</h2>
            </div>
          </FadeIn>
          
          <FadeIn delay={1}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-4 px-4 text-neutral-500 text-sm font-medium">SPECIFICATION</th>
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">P2.5</th>
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">P3</th>
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map((spec, i) => (
                    <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-900/30">
                      <td className="py-3 px-4 text-neutral-400 text-sm">{spec.label}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.p25}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.p3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Common Questions</h2>
            </div>
          </FadeIn>
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i}>
                <div className="border border-neutral-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-900/50 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.q}</span>
                    <ChevronDown size={20} className={`text-rose-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-neutral-400 text-sm">{faq.a}</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">READY TO ORDER?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your iFlip Today</h2>
            <p className="text-neutral-500 mb-8">Contact us for pricing, lead times, and custom configuration options.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-rose-500 hover:bg-rose-400 text-white px-10 py-4 text-sm font-medium tracking-wider transition-colors">
                Request Quote
              </Link>
              <Link to="/pixelvue" className="border border-white/20 hover:border-rose-500/50 text-white px-10 py-4 text-sm font-medium tracking-wider transition-colors">
                More Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
