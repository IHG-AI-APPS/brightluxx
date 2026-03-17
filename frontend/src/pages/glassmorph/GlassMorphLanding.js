import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Eye, Zap, Shield, Layers, Sparkles, Building2, Home, Plane } from 'lucide-react';
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

const PRODUCTS = [
  {
    id: 'smart-film',
    name: 'Smart Film',
    tagline: 'Instant Privacy, Effortless Control',
    desc: 'PDLC switchable film transforms any glass from transparent to opaque instantly. Retrofit existing windows without replacement.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png',
    specs: { transparency: '90-92%', haze: '3%' },
    link: '/glassmorph/smart-film',
    featured: true,
  },
  {
    id: 'led-film',
    name: 'LED Film',
    tagline: 'Featherlight Brilliance',
    desc: 'Ultra-thin 2mm transparent LED film with 95-99% transparency. Transform any glass surface into a dynamic display.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png',
    specs: { thickness: '2mm', transparency: '95-99%' },
    link: '/glassmorph/led-film',
    featured: true,
  },
  {
    id: 'media-glass',
    name: 'Media Glass',
    tagline: 'Transparent Innovation',
    desc: 'Integrated LED glass panels with 160° viewing angle. HD displays that maintain 85% transparency when off.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/06fff3af387692172824acfb770bda3dc0e0bd4814b6e2a9e716845fbe05e593.png',
    specs: { viewAngle: '160°', transparency: '85%' },
    link: '/glassmorph/media-glass',
    featured: true,
  },
  {
    id: 'switchable-glass',
    name: 'Switchable Glass',
    tagline: 'Smart Glass, Smarter Spaces',
    desc: 'Pre-laminated PDLC smart glass with 99% UV blocking. Factory-ready for immediate installation.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/0a8f0c2cdad29691e223fd0f292d83947baade0536484eaea6512b6f07c90df0.png',
    specs: { uvBlock: '99%', power: '5W/m²' },
    link: '/glassmorph/switchable-glass',
    featured: false,
  },
  {
    id: 'flying-display',
    name: 'Flying Display',
    tagline: 'Defy Gravity',
    desc: 'World-record 5×15m drone-mounted LED screens. Ultra-light 250g/m² for spectacular aerial displays.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/d100d5bc9e2955f9c46e02d8929cbcaa4a75eac35fab67dca14fce0769973b06.png',
    specs: { weight: '250g/m²', size: '5×15m' },
    link: '/glassmorph/flying-display',
    featured: false,
  },
  {
    id: 'hanging-led',
    name: 'Hanging LED Film',
    tagline: 'Dynamic Facades',
    desc: 'Lightweight transparent LED strips for building facades. Easy installation, dramatic visual impact.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/549e4822b9cf036e00430c601e570ef5876e601d6ec4f15ef94644bb6063c64f.png',
    specs: { transparency: '95%', install: 'Modular' },
    link: '/glassmorph/hanging-led',
    featured: false,
  },
];

const STATS = [
  { value: '99%', label: 'UV Protection' },
  { value: '95%', label: 'Transparency' },
  { value: '75%', label: 'Energy Savings' },
  { value: '5W/m²', label: 'Low Power' },
];

const APPLICATIONS = [
  { name: 'Corporate Offices', icon: Building2, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png' },
  { name: 'Retail & Commercial', icon: Sparkles, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png' },
  { name: 'Hospitality', icon: Home, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/0a8f0c2cdad29691e223fd0f292d83947baade0536484eaea6512b6f07c90df0.png' },
  { name: 'Events & Entertainment', icon: Plane, image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/d100d5bc9e2955f9c46e02d8929cbcaa4a75eac35fab67dca14fce0769973b06.png' },
];

const FAQS = [
  { q: 'What is PDLC technology?', a: 'PDLC (Polymer Dispersed Liquid Crystal) technology uses liquid crystals suspended in a polymer matrix. When voltage is applied, crystals align to become transparent. When off, they scatter light creating opacity. This allows instant switching between clear and frosted states.' },
  { q: 'Can smart film be retrofitted to existing glass?', a: 'Yes! Smart Film is self-adhesive and can be applied to any existing smooth glass surface. No glass replacement needed. Our installation team ensures bubble-free application with invisible edges.' },
  { q: 'How much energy do these products consume?', a: 'Very little. Smart Film and Switchable Glass consume only 5W per square meter in the transparent (ON) state. LED Film uses 75% less energy than traditional LED displays due to its transparent design allowing natural light.' },
  { q: 'What sizes are available?', a: 'Smart Film: up to 1.8m wide, unlimited length. Media Glass: custom sizes up to 3m×6m. Flying Display: 5m×15m (world record). We can combine multiple units for larger installations.' },
  { q: 'What warranty is provided?', a: 'All GlassMorph products come with a 3-year manufacturer warranty covering defects. Extended warranty options available. Our smart glass products are rated for 50,000+ switching cycles.' },
];

const ProductCard = ({ product, index }) => (
  <FadeIn delay={index + 1} className="group">
    <Link to={product.link} className="block">
      <div className="relative overflow-hidden bg-neutral-950 rounded-sm border border-neutral-800 hover:border-violet-500/30 transition-all duration-300">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 border-t border-neutral-800">
          <p className="text-violet-400 text-xs tracking-[0.2em] uppercase mb-2">{product.tagline}</p>
          <h3 className="text-xl font-light text-white mb-3 tracking-tight">{product.name}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">{product.desc}</p>
          
          <div className="flex gap-4 mb-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <div className="text-white font-medium text-sm">{value}</div>
                <div className="text-neutral-600 text-[10px] tracking-wider uppercase">{key}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center text-white text-sm font-medium group-hover:text-violet-400 transition-colors">
            Learn More 
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

export default function GlassMorphLanding() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="glassmorph-landing">
      <SEO
        title="GlassMorph — Smart Glass & Film Solutions | Brightluxx UAE"
        description="Transform any glass surface with smart switchable film, transparent LED, and media glass technology. Instant privacy, dynamic displays, and energy-efficient solutions."
        path="/glassmorph"
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png" 
            alt="GlassMorph Smart Glass" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />
        </div>

        <div className="relative flex flex-col min-h-screen">
          <div className="pt-8 px-6 md:px-12">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Brightluxx
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-6 py-20">
            <div>
              <FadeIn>
                <p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-4">Smart Glass Technology</p>
              </FadeIn>
              <FadeIn delay={1}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-4">GlassMorph</h1>
              </FadeIn>
              <FadeIn delay={2}>
                <p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">
                  Make Glass Do More
                </p>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="text-neutral-500 max-w-xl mx-auto mb-10">
                  Revolutionary smart glass and film solutions. Transform any surface from transparent to opaque, 
                  or turn windows into dynamic LED displays — all with a single switch.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                    Request Demo
                  </Link>
                  <a href="#products" className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors">
                    View Products
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/50" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-neutral-800 bg-violet-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={i}>
                <div className="text-4xl font-light text-violet-400 mb-2">{stat.value}</div>
                <div className="text-neutral-500 text-sm">{stat.label}</div>
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
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">The Technology</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-6">
                Glass that responds to your needs.
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                GlassMorph technology transforms ordinary glass into intelligent surfaces. Whether you need 
                instant privacy at the touch of a button, dynamic digital displays, or energy-efficient 
                climate control — our solutions adapt to your environment in real-time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Eye size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Privacy On Demand</h3>
                    <p className="text-neutral-500 text-sm">Instant switching between clear and opaque</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Layers size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Ultra-Thin</h3>
                    <p className="text-neutral-500 text-sm">2mm film retrofits any glass</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Energy Efficient</h3>
                    <p className="text-neutral-500 text-sm">Only 5W/m² power consumption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">99% UV Block</h3>
                    <p className="text-neutral-500 text-sm">Protect interiors from sun damage</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-sm overflow-hidden">
                  <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/994ba21f13302f59aacc4a84641b1e64db76fbc083a69c2a8604109ab0b2d3d5.png" alt="Smart Film Demo" className="w-full h-40 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80">
                    <span className="text-white text-xs tracking-wider uppercase">Privacy Mode</span>
                  </div>
                </div>
                <div className="relative rounded-sm overflow-hidden">
                  <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/b434e53819d5e958f3c797fe0db6500a38558aa325c4c09ba3550d8aad374b33.png" alt="LED Film Display" className="w-full h-40 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80">
                    <span className="text-white text-xs tracking-wider uppercase">Display Mode</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Range</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white">Smart Glass Solutions</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
              <h2 className="text-4xl font-extralight text-white">Transform Any Space</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <app.icon size={24} className="text-violet-400 mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">{app.name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6 bg-neutral-900/30">
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

      {/* Other Product Lines */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Explore More</p>
              <h2 className="text-3xl font-extralight text-white">Other Product Lines</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={1}>
              <Link to="/lumimorph" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="/artmorph-assets/grande-hero.jpg" alt="LumiMorph" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-cyan-400 text-xs tracking-wider uppercase mb-1">Textured LED Panels</p>
                  <h3 className="text-white text-lg font-light">LumiMorph</h3>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={2}>
              <Link to="/naturatex" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png" alt="NaturaTex" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-emerald-400 text-xs tracking-wider uppercase mb-1">Texture Screens</p>
                  <h3 className="text-white text-lg font-light">NaturaTex</h3>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={3}>
              <Link to="/signatouch" className="group block relative overflow-hidden rounded-sm aspect-video">
                <img src="https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png" alt="SignaTouch" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-amber-400 text-xs tracking-wider uppercase mb-1">Digital Kiosks</p>
                  <h3 className="text-white text-lg font-light">SignaTouch</h3>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-violet-500/5 border-t border-violet-500/10">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Ready to Transform Your Glass?</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Request a demo or consultation. Our specialists will help you choose the perfect smart glass solution for your project.
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
