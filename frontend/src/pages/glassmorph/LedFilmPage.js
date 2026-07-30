import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Layers, Zap, Eye, Wrench, Sparkles, Monitor } from 'lucide-react';
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
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>
  );
};

const FEATURES = [
  { icon: Layers, title: 'Ultra-Thin 2mm', desc: 'Featherlight construction allows application to any glass surface without structural modifications.' },
  { icon: Eye, title: '95-99% Transparent', desc: 'Nearly invisible when off. Maintains natural light and views while ready to display content.' },
  { icon: Zap, title: '75% Energy Saving', desc: 'Transparent design means less LEDs needed. Natural light passes through, reducing lighting costs.' },
  { icon: Wrench, title: 'Easy Installation', desc: 'Self-adhesive backing for quick retrofitting. No special tools or structural changes required.' },
  { icon: Sparkles, title: 'Seamless Splicing', desc: 'Modular design allows unlimited size through edge-to-edge tiling with invisible seams.' },
  { icon: Monitor, title: 'HD Display', desc: 'High brightness up to 5,500 nits for vivid content even in direct sunlight conditions.' },
];

const USE_CASES = [
  { title: 'Retail Storefronts', desc: 'Transform shop windows into dynamic advertising displays while maintaining product visibility.', image: 'https://files.ihgbrands.com/emergent-images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png', stats: ['3x engagement', 'Zero obstruction'] },
  { title: 'Building Facades', desc: 'Turn glass curtain walls into massive media canvases for brand messaging and art.', image: 'https://files.ihgbrands.com/emergent-images/549e4822b9cf036e00430c601e570ef5876e601d6ec4f15ef94644bb6063c64f.png', stats: ['Up to 1000m²', 'Daylight visible'] },
  { title: 'Exhibition Displays', desc: 'Create stunning showcase presentations that blend digital and physical exhibits.', image: 'https://files.ihgbrands.com/emergent-images/06fff3af387692172824acfb770bda3dc0e0bd4814b6e2a9e716845fbe05e593.png', stats: ['Modular setup', 'Quick install'] },
];

const FAQS = [
  { q: 'How does LED Film differ from traditional LED screens?', a: 'LED Film is 95-99% transparent when off, allowing natural light through. Traditional LED screens are opaque. LED Film is only 2mm thick vs 50-100mm for panels. It uses 75% less energy due to transparency. It can be applied to existing glass without structural changes.' },
  { q: 'What content formats are supported?', a: 'LED Film supports all standard video formats including MP4, AVI, MOV. It can display images, video, text, and live feeds. Our control system includes scheduling, real-time updates, and multi-zone management. HDMI input available for live sources.' },
  { q: 'Can it work in direct sunlight?', a: 'Yes! Our LED Film offers up to 5,500 nits brightness, ensuring visibility even in bright daylight. The transparent design actually helps - content appears to float while background is visible, creating a unique holographic effect.' },
  { q: 'How is maintenance handled?', a: 'LED Film features non-destructive repair - individual LEDs can be replaced without affecting surrounding pixels. The film is IP65 rated for dust and water resistance. Remote diagnostics available through our control software.' },
  { q: 'What are the size limitations?', a: 'Single sheets come in various widths up to 1.2m. For larger installations, sheets are seamlessly spliced edge-to-edge. We have completed installations over 500m². There is no practical upper limit with proper planning.' },
];

export default function LedFilmPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="led-film-page">
      <SEO title="LED Film — Ultra-Thin Transparent LED Display | GlassMorph" description="2mm ultra-thin transparent LED film with 95-99% transparency. Transform any glass into a dynamic display. 75% energy saving, self-adhesive installation, up to 5,500 nits brightness." path="/glassmorph/led-film" />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.ihgbrands.com/emergent-images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png" alt="LED Film" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        </div>
        <div className="relative flex flex-col min-h-[80vh]">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/glassmorph" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors"><ArrowLeft size={16} /> All GlassMorph Products</Link>
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-6 py-16">
            <div className="max-w-2xl">
              <FadeIn><p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph</p></FadeIn>
              <FadeIn delay={1}><h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight mb-4">LED Film</h1></FadeIn>
              <FadeIn delay={2}><p className="text-xl text-neutral-300 font-light mb-6">Featherlight Brilliance, Dynamic Architecture</p></FadeIn>
              <FadeIn delay={3}><p className="text-neutral-500 mb-8">Ultra-thin 2mm transparent LED technology. Transform any glass surface into a vibrant display while maintaining 95-99% transparency. HD visuals that appear to float in space.</p></FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
                  <a href="#use-cases" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">See Use Cases</a>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={24} className="text-white/50" /></div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 px-6 border-b border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: '2mm', unit: '', label: 'Thickness' }, { value: '95-99%', unit: '', label: 'Transparency' }, { value: '5,500', unit: ' nits', label: 'Brightness' }, { value: '75%', unit: '', label: 'Energy Saving' }].map((spec, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-3xl font-light text-white">{spec.value}<span className="text-lg text-violet-400">{spec.unit}</span></div>
                <div className="text-neutral-600 text-xs tracking-wider uppercase mt-1">{spec.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">The Technology</p>
              <h2 className="text-3xl font-extralight text-white mb-6">Holographic Invisible Display</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">LED Film uses microscopic LED chips arranged on a transparent substrate. The tiny LEDs (as small as 0.3mm) are virtually invisible when off, allowing 95-99% of light to pass through.</p>
              <p className="text-neutral-400 leading-relaxed mb-6">When activated, content appears to float in mid-air as the transparent background remains visible. This creates a stunning holographic effect without special glasses or equipment.</p>
              <div className="space-y-3">
                {['Self-adhesive for easy retrofit', 'Modular for unlimited size', 'IP65 dust and water resistant', 'Remote content management'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-300"><Check size={16} className="text-violet-400" /><span className="text-sm">{item}</span></div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <img src="https://files.ihgbrands.com/emergent-images/549e4822b9cf036e00430c601e570ef5876e601d6ec4f15ef94644bb6063c64f.png" alt="LED Film Technology" className="rounded-sm w-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Advantages</p><h2 className="text-3xl font-extralight text-white">Why LED Film</h2></div></FadeIn>
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

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn><div className="text-center mb-16"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p><h2 className="text-3xl font-extralight text-white">Transform Any Surface</h2></div></FadeIn>
          <div className="space-y-16">
            {USE_CASES.map((useCase, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}><img src={useCase.image} alt={useCase.title} className="rounded-sm w-full" /></div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="text-2xl font-light text-white mb-4">{useCase.title}</h3>
                    <p className="text-neutral-400 mb-6">{useCase.desc}</p>
                    <div className="flex flex-wrap gap-3">{useCase.stats.map((stat, j) => (<span key={j} className="bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full text-sm">{stat}</span>))}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Technical Data</p><h2 className="text-3xl font-extralight text-white">Specifications</h2></div></FadeIn>
          <FadeIn delay={1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Display</h3>
                <div className="space-y-3">
                  {[['Pixel Pitch', 'P3.9 / P7.8 / P10'], ['Transparency', '95-99%'], ['Brightness', '1,500-5,500 nits'], ['Viewing Angle', '160°'], ['Refresh Rate', '3840Hz'], ['Gray Scale', '16bit']].map(([label, value]) => (
                    <div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-800 rounded-sm p-6">
                <h3 className="text-white font-medium mb-4 pb-2 border-b border-neutral-800">Physical</h3>
                <div className="space-y-3">
                  {[['Thickness', '2mm'], ['Weight', '800g/m²'], ['Max Sheet Width', '1.2m'], ['IP Rating', 'IP65'], ['Operating Temp', '-20°C to 50°C'], ['Lifespan', '100,000 hours']].map(([label, value]) => (
                    <div key={label} className="flex justify-between"><span className="text-neutral-500 text-sm">{label}</span><span className="text-white text-sm">{value}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Support</p><h2 className="text-3xl font-extralight text-white">Frequently Asked Questions</h2></div></FadeIn>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border border-neutral-800 rounded-sm overflow-hidden">
                  <button className="w-full p-5 text-left flex items-center justify-between hover:bg-neutral-900/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-neutral-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-4">{faq.a}</div></motion.div>)}</AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeIn><div className="text-center mb-12"><p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">GlassMorph Family</p><h2 className="text-3xl font-extralight text-white">Explore More Solutions</h2></div></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <Link to="/glassmorph/media-glass" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/06fff3af387692172824acfb770bda3dc0e0bd4814b6e2a9e716845fbe05e593.png" alt="Media Glass" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6"><p className="text-violet-400 text-xs tracking-wider uppercase mb-1">Integrated LED</p><h3 className="text-white text-xl font-light">Media Glass</h3></div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/glassmorph/smart-film" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://files.ihgbrands.com/emergent-images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png" alt="Smart Film" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6"><p className="text-violet-400 text-xs tracking-wider uppercase mb-1">Switchable Privacy</p><h3 className="text-white text-xl font-light">Smart Film</h3></div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-violet-500/5 border-t border-violet-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready for Transparent Displays?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">Request a quote for your LED Film project. Our team will help you design the perfect transparent display solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">Request Quote</Link>
            <Link to="/glassmorph" className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">All Products</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
