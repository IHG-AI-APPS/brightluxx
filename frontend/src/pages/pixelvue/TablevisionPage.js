import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Hand, Layers, Coffee, Users, Wifi } from 'lucide-react';
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
  { label: 'DISPLAY SIZE', value: '32"-55"' },
  { label: 'PIXEL PITCH', value: 'P1.5-P2' },
  { label: 'TOUCH', value: '10-Point' },
  { label: 'ORIENTATION', value: 'Table/Counter' },
];

const FEATURES = [
  { icon: Hand, title: 'Touch Interactive', desc: '10-point capacitive touch for intuitive interaction' },
  { icon: Monitor, title: 'Table-Top Design', desc: 'Horizontal display perfect for desks and counters' },
  { icon: Layers, title: 'Tempered Glass', desc: 'Durable surface rated for daily use' },
  { icon: Coffee, title: 'Spill Resistant', desc: 'IP54 rated for hospitality environments' },
  { icon: Users, title: 'Multi-User', desc: 'Multiple people can interact simultaneously' },
  { icon: Wifi, title: 'Connected', desc: 'WiFi and Ethernet for content and data' },
];

const APPLICATIONS = [
  { name: 'Restaurants', desc: 'Digital menus and ordering' },
  { name: 'Hotels', desc: 'Concierge and information' },
  { name: 'Retail', desc: 'Product configurators' },
  { name: 'Museums', desc: 'Interactive exhibits' },
  { name: 'Gaming', desc: 'Table-top entertainment' },
  { name: 'Corporate', desc: 'Collaborative workspaces' },
];

const SPECS = [
  { label: 'Display Sizes', value: '32" / 43" / 55"' },
  { label: 'Pixel Pitch', value: 'P1.5 / P1.8 / P2' },
  { label: 'Touch Technology', value: 'PCAP (10-point)' },
  { label: 'Surface', value: 'Tempered Glass 4mm' },
  { label: 'IP Rating', value: 'IP54 (top surface)' },
  { label: 'Brightness', value: '500cd/m²' },
  { label: 'Viewing Angle', value: '178°/178°' },
  { label: 'Table Height', value: '720mm (adjustable)' },
  { label: 'Inputs', value: 'HDMI / USB / LAN' },
  { label: 'OS Options', value: 'Android / Windows' },
];

const FAQS = [
  { q: 'Is Tablevision suitable for food service environments?', a: 'Yes! The IP54-rated top surface is designed for hospitality use. The tempered glass is easy to clean and resistant to spills. We recommend regular cleaning with standard glass cleaner.' },
  { q: 'What operating system does it run?', a: 'Tablevision is available with Android or Windows options. Android is ideal for simple applications and digital menus, while Windows supports full desktop applications and custom software.' },
  { q: 'Can the height be adjusted?', a: 'The standard table height is 720mm, suitable for seated use. Custom heights and ADA-compliant options are available for counter and standing configurations.' },
  { q: 'How many people can use it at once?', a: 'The 10-point capacitive touch supports multiple simultaneous users. Larger sizes (43" and 55") can comfortably accommodate 2-4 people interacting at the same time.' },
];

export default function TablevisionPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="tablevision-page">
      <SEO title="Tablevision — Interactive Table Display | PixelVue by Brightluxx" description="Touch-enabled LED table display for restaurants, hotels, and interactive experiences. Multi-touch capable with spill-resistant design." path="/pixelvue/tablevision" />

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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">TABLEVISION</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Interactive Table Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">Bring interactivity to the tabletop. Tablevision combines LED display technology with multi-touch capability for engaging customer experiences in restaurants, hotels, and retail.</p>
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
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png" alt="Tablevision Interactive Table" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Tablevision</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your Tablevision Today</h2>
            <p className="text-neutral-500 mb-8">Contact us for pricing and custom application development.</p>
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
