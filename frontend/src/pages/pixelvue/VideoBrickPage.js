import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Wifi, Zap, Eye, Layers, Settings, Cpu } from 'lucide-react';
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
  { label: 'PIXEL PITCH', value: 'P1.5-P2.5' },
  { label: 'BRIGHTNESS', value: '800cd/m²' },
  { label: 'REFRESH', value: '3840Hz' },
  { label: 'HDR', value: 'Supported' },
];

const FEATURES = [
  { icon: Cpu, title: 'Fine Pixel Pitch', desc: 'P1.5 to P2.5 options for close viewing distances' },
  { icon: Eye, title: 'HDR Support', desc: 'High dynamic range for vivid, lifelike images' },
  { icon: Layers, title: 'Modular Design', desc: 'Seamless splicing for any size configuration' },
  { icon: Settings, title: 'Front Serviceable', desc: 'Easy maintenance without rear access' },
  { icon: Zap, title: 'Low Power', desc: 'Energy-efficient operation reduces costs' },
  { icon: Wifi, title: 'Smart Control', desc: 'WiFi, LAN, and cloud management options' },
];

const APPLICATIONS = [
  { name: 'Conference Rooms', desc: 'Crystal-clear presentations' },
  { name: 'Control Centers', desc: '24/7 monitoring displays' },
  { name: 'Retail', desc: 'High-impact window displays' },
  { name: 'Museums', desc: 'Art and exhibit showcases' },
  { name: 'Broadcast', desc: 'Studio backdrops and sets' },
  { name: 'Corporate Lobbies', desc: 'Brand experience walls' },
];

const SPECS = [
  { label: 'Pixel Pitch', p15: 'P1.56', p19: 'P1.9', p25: 'P2.5' },
  { label: 'Module Size', p15: '240×240mm', p19: '240×240mm', p25: '320×160mm' },
  { label: 'Resolution/Module', p15: '154×154', p19: '126×126', p25: '128×64' },
  { label: 'Brightness', p15: '800cd/m²', p19: '800cd/m²', p25: '1000cd/m²' },
  { label: 'Refresh Rate', p15: '3840Hz', p19: '3840Hz', p25: '3840Hz' },
  { label: 'Contrast', p15: '5000:1', p19: '5000:1', p25: '5000:1' },
  { label: 'Viewing Angle', p15: '160°/160°', p19: '160°/160°', p25: '160°/160°' },
  { label: 'Cabinet Weight', p15: '8kg', p19: '8kg', p25: '7kg' },
  { label: 'Power (Max)', p15: '300W/m²', p19: '280W/m²', p25: '350W/m²' },
  { label: 'IP Rating', p15: 'IP40', p19: 'IP40', p25: 'IP40' },
];

const FAQS = [
  { q: 'What makes VideoBrick ideal for close viewing?', a: 'VideoBrick features fine pixel pitches (P1.5-P2.5) specifically designed for close viewing distances of 1.5-3 meters. The high pixel density ensures smooth text and detailed images even at arm\'s length.' },
  { q: 'Can VideoBrick be used for video walls?', a: 'Absolutely! The modular design allows seamless splicing to create video walls of any size. Our precision-engineered cabinets ensure near-invisible seams for a unified display surface.' },
  { q: 'What about heat management?', a: 'VideoBrick uses advanced heat dissipation technology with aluminum cabinet construction. The low power consumption (average 120W/m²) keeps operating temperatures low even in 24/7 installations.' },
  { q: 'Is it compatible with existing AV systems?', a: 'Yes! VideoBrick supports HDMI, DVI, DP inputs and integrates with all major video processors, AV controllers, and content management systems including Crestron, Extron, and more.' },
];

export default function VideoBrickPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="videobrick-page">
      <SEO title="VideoBrick — Fine Pitch LED Display | PixelVue by Brightluxx" description="Professional fine pitch LED display for conference rooms, control centers, and broadcast studios. P1.5-P2.5 pixel pitch with HDR support." path="/pixelvue/videobrick" />

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
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">COMMERCIAL SERIES</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">VIDEOBRICK</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Fine Pitch Excellence</p>
              <p className="text-neutral-500 max-w-lg mb-8">Professional fine pitch LED display designed for close viewing applications. Crystal-clear visuals with HDR support, perfect for conference rooms, control centers, and premium retail environments.</p>
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
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-rose-500/20">
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png" 
                alt="VideoBrick LED Display"
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose VideoBrick</h2>
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
        <div className="max-w-5xl mx-auto">
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
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">P1.56</th>
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">P1.9</th>
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">P2.5</th>
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map((spec, i) => (
                    <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-900/30">
                      <td className="py-3 px-4 text-neutral-400 text-sm">{spec.label}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.p15}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.p19}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.p25}</td>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your VideoBrick Today</h2>
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
