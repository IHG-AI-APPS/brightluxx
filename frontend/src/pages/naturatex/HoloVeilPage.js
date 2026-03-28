import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Eye, Layers, Feather, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const APPLICATIONS = [
  { 
    name: 'Retail Storefronts', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/6e056612f91f1ef1f222373e53acad1d2108b5929001879177c33fce442a3db5.png',
    desc: 'Transform glass windows into media screens while maintaining product visibility.',
  },
  { 
    name: 'Shopping Malls', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4f0f1d0967746ee0d8f6bf22b1cbf6b2f7a8d036626a7d88b4aa1d635f6dc8aa.png',
    desc: 'Create stunning atrium displays and glass curtain walls with floating imagery.',
  },
  { 
    name: 'Exhibition Halls', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/95c95069e3609f62fe459b053861882da608e78ba7d5c4d6ae218e39118cff1c.png',
    desc: 'Naked-eye AR experiences with 3D floating visuals in exhibition spaces.',
  },
  { 
    name: 'Transportation Hubs', 
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/7d73816761e502ef449cc27c5879b9ffee3227b939d1c15e74911c8b442838c0.png',
    desc: 'High-impact advertising on glass facades of airports and transit stations.',
  },
];

const ADVANTAGES = [
  { icon: Eye, title: '92-95% Transparency', desc: 'Maintain clear views through glass while displaying vivid content.' },
  { icon: Feather, title: 'Ultra-Light 6kg/m²', desc: 'Minimal structural load for easy glass facade integration.' },
  { icon: Sun, title: 'Up to 5,000 nits', desc: 'High brightness for visibility even in direct sunlight.' },
  { icon: Layers, title: 'Naked-Eye AR', desc: 'Create 3D floating holographic visuals without special glasses.' },
];

const FAQS = [
  { q: 'How transparent is HoloVeil?', a: 'HoloVeil achieves 92-95% visual transparency depending on the pixel pitch. This means views through glass remain nearly unobstructed while displaying vibrant content.' },
  { q: 'Can HoloVeil be installed on existing glass?', a: 'Yes. HoloVeil can be installed via LED-side gluing, PCB-side gluing, or hanging methods on existing glass surfaces without major structural modifications.' },
  { q: 'What is the viewing experience like?', a: 'Content appears to float in mid-air, creating a striking holographic effect. 3D content creates naked-eye AR experiences that captivate viewers from multiple angles.' },
  { q: 'How bright is HoloVeil?', a: 'With white lamp options reaching up to 5,000 nits, HoloVeil remains visible even in bright ambient conditions, making it suitable for sun-facing glass facades.' },
];

export default function HoloVeilPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="holoveil-page">
      <SEO
        title="HoloVeil — Transparent Holographic LED Screen | Brightluxx UAE"
        description="High visual transparency holographic LED displays for glass facades. 92-95% transparency, up to 5,000 nits brightness, only 6kg/m². Perfect for retail storefronts, malls, and exhibition halls."
        path="/naturatex/holoveil"
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/4f0f1d0967746ee0d8f6bf22b1cbf6b2f7a8d036626a7d88b4aa1d635f6dc8aa.png" 
            alt="HoloVeil Transparent Screen" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative flex flex-col min-h-screen">
          <div className="pt-8 px-6 md:px-12 flex items-center justify-between">
            <Link to="/naturatex" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> NaturaTex Family
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6 py-20">
            <div>
              <FadeIn>
                <p className="text-emerald-400 text-xs tracking-[0.3em] uppercase mb-4">NaturaTex Series</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-4">HoloVeil</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">
                  High Visual Transparency. Invisible Experience.
                </p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-xl mx-auto mb-10">
                  Holographic transparent LED screens that transform glass facades into floating media displays 
                  while maintaining crystal-clear views. See through. Stand out.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors inline-block">
                  Request Demo
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-16 px-6 border-y border-neutral-800 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { value: '92-95%', label: 'Transparency' },
              { value: '5,000', label: 'Max Brightness (nits)' },
              { value: '6', label: 'Weight (kg/m²)' },
              { value: 'P3.9/P6.25', label: 'Pixel Pitch' },
              { value: 'IP20', label: 'Protection' },
            ].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-2xl font-light text-white">{spec.value}</div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Holographic Technology</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white leading-tight mb-6">
                Images Float in Mid-Air
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                HoloVeil creates a unique visual experience where content appears to float in space, 
                suspended between you and what's behind the glass. This naked-eye AR effect delivers 
                powerful visual impact without requiring special glasses or equipment.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'See-Through Design', desc: 'Maintain full visibility of products, spaces, and views behind the display.' },
                  { title: '3D Holographic Effect', desc: 'Content appears to float, creating dramatic visual experiences.' },
                  { title: 'No Structural Changes', desc: 'Installs directly on existing glass with minimal modification.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={1}>
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/95c95069e3609f62fe459b053861882da608e78ba7d5c4d6ae218e39118cff1c.png" 
                alt="Holographic floating display" 
                className="rounded-sm w-full"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Key Benefits</p>
              <h2 className="text-4xl font-extralight text-white">Why HoloVeil</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((adv, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <adv.icon size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{adv.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Application Scenarios</p>
              <h2 className="text-4xl font-extralight text-white">Transform Any Glass Surface</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative overflow-hidden rounded-sm">
                  <div className="aspect-video overflow-hidden">
                    <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-medium mb-2">{app.name}</h3>
                    <p className="text-neutral-400 text-sm">{app.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p>
              <h2 className="text-4xl font-extralight text-white">Specifications</h2>
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="border border-neutral-800 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/50">
                      <th className="text-left p-4 text-neutral-500 font-medium">Specification</th>
                      <th className="text-center p-4 text-white font-medium">HoloVeil SV3.9</th>
                      <th className="text-center p-4 text-white font-medium">HoloVeil SV6.25</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Pixel Pitch (mm)', '3.9 x 3.9', '6.25 x 6.25'],
                      ['Transparency Rate', '92%', '95%'],
                      ['Pixel Density (dot/m²)', '65,536', '25,600'],
                      ['Brightness (Black LED)', '≥2,500 cd/m²', '≥2,000 cd/m²'],
                      ['Brightness (White LED)', '≥4,500 cd/m²', '≥5,000 cd/m²'],
                      ['Weight', '6 kg/m²', '6 kg/m²'],
                      ['Module Height Options', '1000/1172/1469 mm', '1000/1175/1475 mm'],
                      ['Power (Max/Avg)', '865W / 350W per m²', '865W / 350W per m²'],
                      ['Frame Rate', '60-120 Hz', '60-120 Hz'],
                      ['Working Temperature', '-20°C to 50°C', '-20°C to 50°C'],
                      ['Protection Rating', 'IP20 (Indoor)', 'IP20 (Indoor)'],
                    ].map(([label, sv39, sv625], i) => (
                      <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                        <td className="p-4 text-neutral-500">{label}</td>
                        <td className="p-4 text-center text-white">{sv39}</td>
                        <td className="p-4 text-center text-white">{sv625}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-neutral-900/30 border-t border-neutral-800 text-center">
                <p className="text-neutral-500 text-xs">
                  Installation: LED Side Glued, PCB Side Glued, or Hanging. Static driving (single pixel single control).
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p>
              <h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* See Also */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">NaturaTex Family</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/naturatex" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png" alt="NaturaTex" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-emerald-400 text-xs tracking-wider uppercase mb-1">Texture Screen</p>
                  <h3 className="text-white text-xl font-light">NaturaTex</h3>
                  <p className="text-neutral-400 text-sm mt-1">Turn off the display, turn on the art.</p>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/lumimorph" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/brightluxx/homepage/grande-hero.webp" alt="LumiMorph" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-cyan-400 text-xs tracking-wider uppercase mb-1">Textured Luminous Panels</p>
                  <h3 className="text-white text-xl font-light">LumiMorph</h3>
                  <p className="text-neutral-400 text-sm mt-1">Beautiful when off. Stunning when on.</p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Glass?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo to experience HoloVeil transparent screens. Perfect for retail storefronts, malls, and exhibition halls.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
              Request Demo
            </Link>
            <Link to="/case-studies" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
              View Projects
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
