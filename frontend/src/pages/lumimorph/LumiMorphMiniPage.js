import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check } from 'lucide-react';
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

const FAQS = [
  { q: 'Can LumiMorph Mini be used independently?', a: 'Yes. Mini has its own power source and does not require Elite or Grande to function. It can be used as a standalone display.' },
  { q: 'Can Mini be used in outdoor installations?', a: 'Mini follows the same environmental specifications as the main products. They are currently designed for indoor use only.' },
  { q: 'Can Elite Mini and Grande Mini be used together?', a: 'No. Elite Mini and Grande Mini cannot be mixed in the same installation as they are built on different structural frames. Choose one variant for your project.' },
  { q: 'What is the size difference between Mini and standard panels?', a: 'Mini panels are 250x250mm (quarter size), while standard Elite/Grande panels are 500x500mm. This allows for more intricate designs and fitting into smaller spaces.' },
];

export default function LumiMorphMini() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="lumimorph-mini-page">
      <SEO
        title="LumiMorph Mini — Compact Textured LED Panels | Brightluxx"
        description="250x250mm compact panels. Available in P2.6 (Elite Mini) and P6.2 (Grande Mini). For creative layouts and tight spaces where standard panels don't fit."
        path="/lumimorph/mini"
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/brightluxx/artmorph/art_mini-hero.webp" alt="LumiMorph Mini" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        </div>

        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/lumimorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> All Products
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6 py-20">
            <div>
              <FadeIn>
                <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-4">LumiMorph</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight mb-2">Mini</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl text-neutral-300 font-light mb-8">Small Scale. Infinite Possibilities.</p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-lg mx-auto mb-10">
                  A seamless complement to LumiMorph or a bold creative solution on its own. Compact, adaptable, 
                  and designed to expand what's possible.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors inline-block">
                  Request Demo
                </Link>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Two Variants */}
      <section className="py-16 px-6 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Two Options</p>
              <h2 className="text-3xl font-extralight text-white">Choose Your Mini</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={1}>
              <div className="border border-neutral-800 rounded-sm p-8 hover:border-neutral-700 transition-colors">
                <h3 className="text-white text-xl font-light mb-4">Elite Mini</h3>
                <p className="text-neutral-400 text-sm mb-6">High-resolution variant with P2.6 pixel pitch. Matches Elite panels for close-range viewing.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-light text-white">P2.6<span className="text-neutral-500 text-sm">mm</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Pixel Pitch</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">3,800<span className="text-neutral-500 text-sm">nits</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Brightness</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">147,456<span className="text-neutral-500 text-sm">/m²</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Pixels</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">2.4<span className="text-neutral-500 text-sm">kg</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Weight</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={2}>
              <div className="border border-neutral-800 rounded-sm p-8 hover:border-neutral-700 transition-colors">
                <h3 className="text-white text-xl font-light mb-4">Grande Mini</h3>
                <p className="text-neutral-400 text-sm mb-6">Cost-effective variant with P6.2 pixel pitch. Matches Grande panels for large installations.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-light text-white">P6.2<span className="text-neutral-500 text-sm">mm</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Pixel Pitch</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">4,500<span className="text-neutral-500 text-sm">nits</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Brightness</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">25,600<span className="text-neutral-500 text-sm">/m²</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Pixels</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">2.4<span className="text-neutral-500 text-sm">kg</span></div>
                    <div className="text-neutral-600 text-xs uppercase">Weight</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img src="https://files.ihgbrands.com/brightluxx/artmorph/art_mini-compact.webp" alt="Compact Design" className="rounded-sm w-full" />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Compact Power</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Compact Yet Powerful</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                At just 250×250mm, LumiMorph Mini fits effortlessly into tight spaces or dynamic layouts, 
                offering a refined solution where standard panels may not be ideal.
              </p>
              <div className="space-y-3">
                {['Quarter-size for creative layouts', 'Same surface & control system', 'Independent power source', '5-year warranty included'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check size={16} className="text-white" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Compatibility</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Seamless Integration</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Built with the same surface, module design, thickness, and control system, Mini aligns perfectly 
                with the main product line. This ensures visual continuity and synchronized content across installations.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Same Texture Library', desc: 'Access all 200+ textures available for Elite and Grande' },
                  { title: 'Unified Control', desc: 'Single control system manages all panels seamlessly' },
                  { title: 'Standalone Option', desc: 'Use Mini independently or as part of larger setups' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-neutral-700 pl-4">
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <img src="https://files.ihgbrands.com/brightluxx/artmorph/art_mini-integration.webp" alt="Integration" className="rounded-sm w-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Creative Freedom */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <img src="https://files.ihgbrands.com/brightluxx/artmorph/art_mini-creative.webp" alt="Creative Layouts" className="rounded-sm w-full" />
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Design Freedom</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Creative Freedom, Cost-Effective Design</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                The modular size allows for flexible, intricate shapes while keeping material use efficient—maximizing 
                creativity without unnecessary waste. Perfect for custom installations that require precise fitting.
              </p>
              <Link to="/contact" className="text-white text-sm font-medium hover:text-neutral-300 transition-colors inline-flex items-center gap-2">
                Discuss Your Project <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
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
                    <tr className="border-b border-neutral-800">
                      <th className="text-left p-4 text-neutral-500 font-medium">Specification</th>
                      <th className="text-center p-4 text-white font-medium">Elite Mini</th>
                      <th className="text-center p-4 text-white font-medium">Grande Mini</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Pixel Pitch', '2.6 mm', '6.2 mm'],
                      ['Max Brightness', '3,800 nits', '4,500 nits'],
                      ['With Surface', '800-1,200 nits', '700-1,000 nits'],
                      ['Panel Size', '250 x 250 x 72.2 mm', '250 x 250 x 77.8 mm'],
                      ['Pixels/Panel', '96 x 96', '40 x 40'],
                      ['Pixels/m²', '147,456', '25,600'],
                      ['Weight/Panel', '2.4 kg', '2.4 kg'],
                      ['Power (Max/Avg)', '30W / 15W', '30W / 15W'],
                      ['Frame Material', 'ABS', 'ABS'],
                      ['Operating Temp', '-20°C to 45°C', '-20°C to 45°C'],
                    ].map(([label, elite, grande], i) => (
                      <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                        <td className="p-4 text-neutral-500">{label}</td>
                        <td className="p-4 text-center text-white">{elite}</td>
                        <td className="p-4 text-center text-white">{grande}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-neutral-900/50 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-4">
                <span className="text-neutral-600 text-xs tracking-wider uppercase">Certifications:</span>
                {['CE', 'FCC', 'ETL', 'RoHS', 'WEEE'].map(cert => (
                  <span key={cert} className="text-neutral-400 text-xs px-3 py-1 border border-neutral-700 rounded-sm">{cert}</span>
                ))}
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

      {/* Other Products */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">Other Products</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'LumiMorph Elite', tagline: 'Closer. Clearer. Bolder.', image: 'https://files.ihgbrands.com/brightluxx/artmorph/art_workspace-after.webp', link: '/lumimorph/elite' },
              { name: 'LumiMorph Grande', tagline: 'Living Walls, Immersive Stories', image: 'https://files.ihgbrands.com/brightluxx/homepage/grande-hero.webp', link: '/lumimorph/grande' },
            ].map((product, i) => (
              <FadeIn key={i} delay={i + 1}>
                <Link to={product.link} className="group block relative overflow-hidden rounded-sm aspect-video">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-neutral-400 text-xs tracking-wider uppercase mb-1">{product.tagline}</p>
                    <h3 className="text-white text-xl font-light">{product.name}</h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Space?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo to explore LumiMorph Mini. Perfect for creative layouts and compact spaces.
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
