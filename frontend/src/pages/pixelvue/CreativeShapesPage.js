import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Circle, Square, Triangle, Hexagon, Star, Type } from 'lucide-react';
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

const SHAPES = [
  { icon: Circle, name: 'Circular / Spherical', desc: '360-degree displays that captivate from every viewing angle. Perfect for atriums and lobbies.' },
  { icon: Type, name: 'Letter Shaped', desc: 'Play video directly on letters or logos. High-end brand signage for enterprises and exhibitions.' },
  { icon: Hexagon, name: 'Ring Display', desc: 'Circular rings creating larger visual areas. Flexible design with small modular units.' },
  { icon: Square, name: 'LED Cube', desc: 'Six-sided seamless cube display. Floor standing, suspended, or embedded installation.' },
  { icon: Triangle, name: 'Triangle Screen', desc: 'Splice into polygons, diamonds, or custom geometries for creative installations.' },
  { icon: Star, name: 'Custom Shapes', desc: 'Any shape you can imagine. Our 10+ year ODM engineering team makes it reality.' },
];

const FEATURES = [
  'Small modular units for complex shapes',
  'Flexible design modules bend to any angle',
  'High pixel density for sharp imagery',
  'High contrast and resolution',
  'Excellent heat dissipation',
  'Multiple installation options',
  'Seamless assembly',
  '10+ years engineering expertise',
];

const FAQS = [
  { q: 'What shapes can you create?', a: 'Virtually unlimited. We\'ve created spheres, cubes, letters, logos, rings, columns, waves, and completely custom geometries. Our engineering team with 10+ years ODM experience can realize any design concept.' },
  { q: 'How are curved shapes achieved?', a: 'We use small modular units with flexible PCB and specially designed modules that can bend into arcs at any angle. The smaller the module, the smoother the curve that can be achieved.' },
  { q: 'What is the minimum pixel pitch for creative screens?', a: 'For spheres and complex curves, we typically use P2.5-P4 depending on viewing distance. Letter signs often use P4-P6. We\'ll recommend the optimal pitch based on your specific design.' },
  { q: 'How long does a custom project take?', a: 'Typical lead time is 3-6 weeks depending on complexity. Simple shapes like cubes ship faster. Highly custom geometries may require additional engineering time.' },
];

export default function CreativeShapesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="creative-shapes-page">
      <SEO title="Creative LED Shapes — Custom Design Displays | PixelVue" description="Custom shaped LED screens: spheres, letters, cubes, rings, and unlimited geometries. 10+ years ODM engineering expertise for any creative vision." path="/pixelvue/creative-shapes" />
      
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/8843d7af8116d17ab305e7402dc9c17d8db6ca767924eaab92aaeebc08a20696.png" alt="Creative LED Shapes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12"><Link to="/pixelvue" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All PixelVue Products</Link></div>
          <div className="flex-1 flex items-center justify-center text-center px-6 py-16">
            <div className="max-w-2xl">
              <FadeIn><p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-4">Creative Series</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">Creative LED Shapes</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Transform Imagination Into Reality</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Spheres, letters, cubes, rings — any shape you can imagine. Our 10+ year ODM engineering team transforms creative visions into stunning LED installations that captivate audiences.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Discuss Your Project</Link>
                  <a href="#shapes" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">View Shapes</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-b border-neutral-800 bg-rose-500/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '10+', unit: ' yrs', label: 'Engineering Expertise' }, { value: '∞', label: 'Shape Possibilities' }, { value: '360°', label: 'Viewing Angles' }, { value: '100%', label: 'Custom Design' }].map((spec, i) => (
            <FadeIn key={i} delay={i}><div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-rose-400">{spec.unit || ''}</span></div><div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div></FadeIn>
          ))}
        </div>
      </section>

      <section id="shapes" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Shape Gallery</p><h2 className="text-3xl font-extralight text-white">Popular Configurations</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHAPES.map((shape, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm p-6 hover:border-rose-500/30 transition-all">
                  <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                    <shape.icon size={24} className="text-rose-400" />
                  </div>
                  <h3 className="text-xl font-light text-white mb-2">{shape.name}</h3>
                  <p className="text-neutral-400 text-sm">{shape.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technology</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Engineering Excellence</h2>
              <p className="text-neutral-400 mb-6">Our creative LED screens use cutting-edge technology to achieve impossible-looking installations. Small modular units, flexible PCBs, and precision engineering allow us to bend, curve, and shape LED into any form.</p>
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-neutral-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7e4f29b6e9b2cbee52ae90a4048ac94e36754ab9e13d106b0b28b7412a04bbd4.png" alt="Creative LED Technology" className="rounded-sm w-full" />
            </FadeIn>
          </div>
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

      <section className="py-20 px-6 text-center bg-rose-500/5 border-t border-rose-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Have a Creative Vision?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Share your concept with our engineering team. We'll work with you to design and build the perfect custom LED installation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Discuss Your Project</Link>
            <Link to="/pixelvue" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
