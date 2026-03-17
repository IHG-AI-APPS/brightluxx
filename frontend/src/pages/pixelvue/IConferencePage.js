import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Users, Wifi, Presentation, Mic, Video } from 'lucide-react';
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
  { label: 'PIXEL PITCH', value: 'P1.2-P2.5' },
  { label: 'SIZE RANGE', value: '110"-220"' },
  { label: 'REFRESH', value: '3840Hz' },
  { label: 'HDR', value: 'Supported' },
];

const FEATURES = [
  { icon: Presentation, title: 'All-in-One Solution', desc: 'Integrated display, processor, and control system' },
  { icon: Users, title: 'Collaboration Ready', desc: 'Built-in wireless screen sharing and annotation' },
  { icon: Monitor, title: 'Fine Pixel Pitch', desc: 'P1.2 to P2.5 for crystal-clear presentations' },
  { icon: Video, title: 'Video Conferencing', desc: 'Compatible with Zoom, Teams, WebEx, and more' },
  { icon: Mic, title: 'Audio Integration', desc: 'Built-in speakers and mic array support' },
  { icon: Wifi, title: 'Wireless Connectivity', desc: 'WiFi, Bluetooth, and AirPlay support' },
];

const APPLICATIONS = [
  { name: 'Boardrooms', desc: 'Executive meeting spaces' },
  { name: 'Training Rooms', desc: 'Corporate learning environments' },
  { name: 'Huddle Spaces', desc: 'Small team collaboration' },
  { name: 'Command Centers', desc: 'Operations and monitoring' },
  { name: 'University Lecture', desc: 'Educational presentations' },
  { name: 'Broadcast Studios', desc: 'Background displays' },
];

const SPECS = [
  { label: 'Pixel Pitch Options', value: 'P1.2 / P1.5 / P1.9 / P2.5' },
  { label: 'Screen Sizes', value: '110" / 138" / 165" / 220"' },
  { label: 'Resolution (165")', value: '1920×1080 (P1.9)' },
  { label: 'Brightness', value: '400-600cd/m² (adjustable)' },
  { label: 'Refresh Rate', value: '3840Hz' },
  { label: 'Contrast', value: '5000:1' },
  { label: 'Color Depth', value: '16bit' },
  { label: 'Inputs', value: 'HDMI 2.1 / DP / USB-C / Wireless' },
  { label: 'Audio', value: 'Built-in 20W speakers' },
  { label: 'Control', value: 'IR / RS232 / LAN / App' },
];

const FAQS = [
  { q: 'How does iConference compare to traditional projectors?', a: 'iConference offers superior brightness, contrast, and color accuracy without lamp replacements. No darkened rooms required, and the fine pixel pitch ensures text is crisp even at close viewing distances.' },
  { q: 'What video conferencing platforms are supported?', a: 'iConference works with all major platforms including Zoom, Microsoft Teams, WebEx, Google Meet, and GoToMeeting. The integrated camera and mic options provide a complete solution.' },
  { q: 'Can multiple sources be displayed simultaneously?', a: 'Yes! The built-in controller supports picture-in-picture and side-by-side display of multiple sources, perfect for comparing documents or showing presenter and content together.' },
  { q: 'What installation options are available?', a: 'iConference can be wall-mounted (flush or recessed), mounted on a mobile stand, or integrated into a cabinet. We provide CAD drawings and mounting hardware for all configurations.' },
];

export default function IConferencePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="iconference-page">
      <SEO title="iConference — LED Conference Room Display | PixelVue by Brightluxx" description="All-in-one LED display solution for boardrooms and conference rooms. Fine pixel pitch, HDR support, and integrated video conferencing capabilities." path="/pixelvue/iconference" />

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
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">iCONFERENCE</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Meeting Room LED Display</p>
              <p className="text-neutral-500 max-w-lg mb-8">Transform your boardroom with stunning visual clarity. iConference combines fine pixel pitch LED technology with integrated conferencing features for seamless presentations and collaboration.</p>
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
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-rose-500/20">
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png" alt="iConference LED Display" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p><h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose iConference</h2></div></FadeIn>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Upgrade Your Meeting Room</h2>
            <p className="text-neutral-500 mb-8">Contact us for a site survey, pricing, and installation timeline.</p>
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
