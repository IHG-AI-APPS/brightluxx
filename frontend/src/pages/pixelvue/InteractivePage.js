import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Monitor, Zap, Hand, Gamepad2, Users, Layers, Footprints } from 'lucide-react';
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
  { label: 'TOUCH POINTS', value: '40+' },
  { label: 'RESPONSE', value: '<6ms' },
  { label: 'ACCURACY', value: '±1mm' },
  { label: 'SURFACE', value: 'Tempered Glass' },
];

const FEATURES = [
  { icon: Hand, title: 'Multi-Touch Support', desc: '40+ simultaneous touch points for collaborative interaction' },
  { icon: Zap, title: 'Ultra-Fast Response', desc: 'Less than 6ms touch response for instant feedback' },
  { icon: Footprints, title: 'Floor & Wall Mounting', desc: 'Versatile installation as floor display or wall-mounted' },
  { icon: Layers, title: 'Robust Construction', desc: 'Tempered glass surface rated for heavy foot traffic' },
  { icon: Gamepad2, title: 'Gaming Ready', desc: 'Perfect for interactive games and immersive experiences' },
  { icon: Users, title: 'Multi-User Interaction', desc: 'Multiple people can interact simultaneously' },
];

const INTERACTION_TYPES = [
  { name: 'Touch Walls', desc: 'Interactive information walls and wayfinding', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/8843d7af8116d17ab305e7402dc9c17d8db6ca767924eaab92aaeebc08a20696.png' },
  { name: 'Interactive Floors', desc: 'Step-on games and immersive experiences', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png' },
  { name: 'Touch Tables', desc: 'Collaborative workspaces and product configurators', image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png' },
];

const APPLICATIONS = [
  { name: 'Museums & Exhibitions', desc: 'Interactive displays and immersive exhibits' },
  { name: 'Retail & Showrooms', desc: 'Product exploration and engagement' },
  { name: 'Events & Activations', desc: 'Brand experiences and games' },
  { name: 'Education', desc: 'Interactive learning environments' },
  { name: 'Corporate', desc: 'Collaborative meeting spaces' },
  { name: 'Entertainment', desc: 'Gaming and immersive attractions' },
];

const SPECS = [
  { label: 'Pixel Pitch', wall: 'P2.5 / P3.9', floor: 'P3.9 / P4.8' },
  { label: 'Touch Technology', wall: 'IR Touch Frame', floor: 'Pressure Sensing' },
  { label: 'Touch Points', wall: '40+', floor: '100+' },
  { label: 'Response Time', wall: '<6ms', floor: '<8ms' },
  { label: 'Surface', wall: 'Tempered Glass', floor: 'Anti-slip Tempered' },
  { label: 'Load Capacity', wall: 'N/A', floor: '2000kg/m²' },
  { label: 'Brightness', wall: '1000cd/m²', floor: '1500cd/m²' },
  { label: 'IP Rating', wall: 'IP40', floor: 'IP54' },
  { label: 'Refresh Rate', wall: '3840Hz', floor: '3840Hz' },
  { label: 'Installation', wall: 'Wall Mount', floor: 'Ground Embedded' },
];

const FAQS = [
  { q: 'How durable is the interactive floor for heavy foot traffic?', a: 'Our interactive floor displays use tempered glass surfaces rated for 2000kg/m² load capacity. They\'re designed for high-traffic environments like malls, museums, and event spaces, with anti-slip coatings for safety.' },
  { q: 'What types of interactive content are supported?', a: 'The system supports any touch-enabled application including custom games, wayfinding, product configurators, educational content, and more. We can help develop custom interactive experiences for your specific needs.' },
  { q: 'Can the system track multiple users simultaneously?', a: 'Yes! Our interactive displays support 40+ simultaneous touch points for wall-mounted units and 100+ for floor installations, enabling true multi-user collaborative experiences.' },
  { q: 'What maintenance is required?', a: 'The tempered glass surface is easy to clean with standard glass cleaners. The LED panels are front-serviceable for easy maintenance. We recommend quarterly inspections for high-traffic installations.' },
];

export default function InteractivePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="interactive-page">
      <SEO title="Interactive LED Screens — Touch Walls & Floors | PixelVue by Brightluxx" description="Multi-touch interactive LED displays for immersive experiences. Touch walls, interactive floors, and collaborative surfaces for museums, retail, and events." path="/pixelvue/interactive" />

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
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">CREATIVE SERIES</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">INTERACTIVE</h1>
              <p className="text-xl text-neutral-300 font-light mb-6">Touch-Enabled LED Displays</p>
              <p className="text-neutral-500 max-w-lg mb-8">Transform any surface into an interactive experience. Multi-touch walls, floors, and tables that respond to every touch, step, and gesture. Create immersive brand experiences that engage and delight.</p>
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
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/8843d7af8116d17ab305e7402dc9c17d8db6ca767924eaab92aaeebc08a20696.png" 
                alt="Interactive LED Display"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Interaction Types */}
      <section className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FORMATS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Interaction Types</h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-6">
            {INTERACTION_TYPES.map((type, i) => (
              <FadeIn key={i} delay={i}>
                <div className="group rounded-lg border border-neutral-800 overflow-hidden hover:border-rose-500/30 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img src={type.image} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-neutral-500 text-sm">{type.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">FEATURES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Interactive LED</h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FadeIn key={i} delay={i}>
                <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-950/50 hover:border-rose-500/30 transition-colors">
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
      <section className="py-24 px-6 border-t border-neutral-800">
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
                <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30 text-center hover:border-rose-500/30 transition-colors">
                  <h3 className="text-white font-semibold mb-1">{app.name}</h3>
                  <p className="text-neutral-500 text-xs">{app.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specs" className="py-24 px-6 bg-neutral-900/30">
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
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">TOUCH WALL</th>
                    <th className="text-center py-4 px-4 text-rose-400 text-sm font-medium">INTERACTIVE FLOOR</th>
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map((spec, i) => (
                    <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-900/30">
                      <td className="py-3 px-4 text-neutral-400 text-sm">{spec.label}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.wall}</td>
                      <td className="py-3 px-4 text-white text-sm text-center">{spec.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6">
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
            <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">CREATE IMMERSIVE EXPERIENCES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Interactive Project</h2>
            <p className="text-neutral-500 mb-8">Let's discuss your vision for an interactive LED experience.</p>
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
