import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Leaf, Monitor, Sparkles, Tv, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

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

const PRODUCT_FAMILIES = [
  {
    id: 'lumimorph',
    name: 'LumiMorph',
    tagline: 'Textured LED Panels',
    description: 'Revolutionary LED displays with interchangeable decorative covers. Transform any surface from art piece to dynamic display with magnetic texture panels in wood, stone, textile, and metal finishes.',
    color: 'cyan',
    colorClass: 'from-cyan-500 to-cyan-400',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    icon: Layers,
    image: '/artmorph-assets/grande-hero.jpg',
    link: '/lumimorph',
    highlights: ['200+ Texture Options', 'Magnetic Covers', 'P2.6 & P6.2 Pitch', '5-Year Warranty'],
    products: ['Elite', 'Grande', 'Mini'],
  },
  {
    id: 'naturatex',
    name: 'NaturaTex',
    tagline: 'Natural Texture Screens',
    description: 'Nano-optical technology that seamlessly blends LED displays with natural materials. When off, it\'s art. When on, it\'s a stunning display. Perfect for luxury hospitality and corporate spaces.',
    color: 'emerald',
    colorClass: 'from-emerald-500 to-emerald-400',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    icon: Leaf,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png',
    link: '/naturatex',
    highlights: ['Nano-Optical Tech', 'COB Technology', 'P0.7-P1.8 Pitch', 'Eye-Protective'],
    products: ['NaturaTex', 'HoloVeil'],
  },
  {
    id: 'signatouch',
    name: 'SignaTouch',
    tagline: 'Interactive Digital Kiosks',
    description: 'Enterprise-grade interactive kiosk solutions for retail, hospitality, and corporate environments. Touch screens, transparent OLED, and self-service terminals with payment integration.',
    color: 'amber',
    colorClass: 'from-amber-500 to-amber-400',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    icon: Monitor,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png',
    link: '/signatouch',
    highlights: ['40-Point Touch', 'Transparent OLED', 'Payment Ready', 'Android/Windows'],
    products: ['Touch Kiosk', 'Smart Signage', 'Self-Service'],
  },
  {
    id: 'glassmorph',
    name: 'GlassMorph',
    tagline: 'Smart Glass & Film Solutions',
    description: 'Transform any glass surface with intelligent technology. PDLC switchable privacy film, transparent LED displays, and media glass that turns windows into dynamic digital canvases.',
    color: 'violet',
    colorClass: 'from-violet-500 to-violet-400',
    textColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/10',
    icon: Sparkles,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png',
    link: '/glassmorph',
    highlights: ['99% UV Block', '95% Transparency', 'Instant Privacy', '5W/m² Power'],
    products: ['Smart Film', 'LED Film', 'Media Glass', 'Switchable Glass'],
  },
  {
    id: 'pixelvue',
    name: 'PixelVue',
    tagline: 'Professional LED Displays',
    description: 'Complete range of commercial LED solutions from sleek digital posters to creative custom shapes. Modular systems for retail, corporate, and artistic installations with stunning visual impact.',
    color: 'rose',
    colorClass: 'from-rose-500 to-rose-400',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
    icon: Tv,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/127b54193b9ab0ec636c8645560811771af1f58dde5daceea69f261828cf7c0a.png',
    link: '/pixelvue',
    highlights: ['100K+ Hours', '3840Hz Refresh', '160° Viewing', '3-Year Warranty'],
    products: ['iPoster', 'Unity', 'Creative Shapes'],
  },
];

const COMPARISON_SPECS = [
  { label: 'Best For', key: 'bestFor' },
  { label: 'Pixel Pitch', key: 'pitch' },
  { label: 'Key Feature', key: 'feature' },
  { label: 'Installation', key: 'install' },
];

const COMPARISON_DATA = {
  lumimorph: { bestFor: 'Luxury Interiors', pitch: 'P2.6 / P6.2', feature: 'Texture Covers', install: 'Wall Mount' },
  naturatex: { bestFor: 'Hospitality', pitch: 'P0.7 - P1.8', feature: 'Nano-Optical', install: 'Integrated' },
  signatouch: { bestFor: 'Retail & Service', pitch: '4K UHD', feature: 'Touch & Payment', install: 'Freestanding' },
  glassmorph: { bestFor: 'Glass Facades', pitch: 'P3 - P10', feature: 'Transparency', install: 'Retrofit/New' },
  pixelvue: { bestFor: 'Commercial', pitch: 'P1.5 - P10', feature: 'Modular Design', install: 'Multi-Config' },
};

const ProductFamilyCard = ({ family, index }) => {
  const Icon = family.icon;
  
  return (
    <FadeIn delay={index + 1}>
      <Link 
        to={family.link} 
        className="group block relative overflow-hidden rounded-lg border border-neutral-800 hover:border-opacity-100 transition-all duration-500"
        style={{ borderColor: `rgba(var(--${family.color}-rgb), 0.3)` }}
        data-testid={`family-card-${family.id}`}
      >
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            src={family.image} 
            alt={family.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          
          {/* Floating Icon */}
          <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${family.bgColor} border ${family.borderColor} flex items-center justify-center backdrop-blur-sm`}>
            <Icon size={24} className={family.textColor} />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 bg-neutral-950">
          <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${family.textColor}`}>{family.tagline}</p>
          <h3 className="text-2xl font-light text-white mb-3 tracking-tight">{family.name}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{family.description}</p>
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {family.highlights.map((h, i) => (
              <span key={i} className={`text-[10px] tracking-wider px-2 py-1 rounded ${family.bgColor} ${family.textColor}`}>
                {h}
              </span>
            ))}
          </div>
          
          {/* Products */}
          <div className="flex items-center gap-2 text-neutral-500 text-xs mb-4">
            <span>Products:</span>
            <span className="text-neutral-300">{family.products.join(' • ')}</span>
          </div>
          
          {/* CTA */}
          <div className={`flex items-center gap-2 font-medium text-sm ${family.textColor} group-hover:gap-3 transition-all`}>
            Explore {family.name}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};

export default function ProductFamilies() {
  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="product-families-page">
      <SEO 
        title="Product Families — Premium LED Display Collections | Brightluxx UAE"
        description="Explore Brightluxx's 5 premium LED display product families: LumiMorph textured panels, NaturaTex natural screens, SignaTouch kiosks, GlassMorph smart glass, and PixelVue commercial displays."
        path="/product-families"
      />

      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-neutral-950" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <FadeIn>
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Brightluxx Collections</p>
          </FadeIn>
          <FadeIn delay={1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
              Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400">Families</span>
            </h1>
          </FadeIn>
          <FadeIn delay={2}>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
              Five distinct product lines, each crafted for specific applications. 
              From luxury interiors to commercial signage — find your perfect LED solution.
            </p>
          </FadeIn>
          <FadeIn delay={3}>
            <div className="flex flex-wrap justify-center gap-3">
              {PRODUCT_FAMILIES.map((f) => (
                <Link 
                  key={f.id}
                  to={f.link}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider border ${f.borderColor} ${f.textColor} hover:${f.bgColor} transition-all`}
                >
                  {f.name}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Product Family Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_FAMILIES.map((family, i) => (
              <ProductFamilyCard key={family.id} family={family} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Quick Comparison</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white">Find Your Perfect Match</h2>
            </div>
          </FadeIn>
          
          <FadeIn delay={1}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-neutral-500 text-xs tracking-wider uppercase border-b border-neutral-800">Specification</th>
                    {PRODUCT_FAMILIES.map((f) => (
                      <th key={f.id} className={`p-4 text-center border-b border-neutral-800 ${f.textColor} text-sm font-medium`}>
                        {f.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_SPECS.map((spec) => (
                    <tr key={spec.key} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="p-4 text-neutral-400 text-sm border-b border-neutral-800/50">{spec.label}</td>
                      {PRODUCT_FAMILIES.map((f) => (
                        <td key={f.id} className="p-4 text-center text-white text-sm border-b border-neutral-800/50">
                          {COMPARISON_DATA[f.id][spec.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 text-neutral-400 text-sm">Explore</td>
                    {PRODUCT_FAMILIES.map((f) => (
                      <td key={f.id} className="p-4 text-center">
                        <Link 
                          to={f.link} 
                          className={`inline-flex items-center gap-1 text-sm font-medium ${f.textColor} hover:underline`}
                        >
                          View <ChevronRight size={14} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Use Case Guide */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Selection Guide</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">Which Family Is Right For You?</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Each product family is designed for specific environments and use cases. 
                Here's a quick guide to help you choose.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={1}>
              <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30">
                <h3 className="text-white font-medium mb-4">For Luxury Interiors</h3>
                <p className="text-neutral-400 text-sm mb-4">Hotels, corporate lobbies, high-end retail, and premium residences where aesthetics matter as much as functionality.</p>
                <div className="flex gap-2">
                  <Link to="/lumimorph" className="text-cyan-400 text-sm hover:underline">LumiMorph</Link>
                  <span className="text-neutral-600">•</span>
                  <Link to="/naturatex" className="text-emerald-400 text-sm hover:underline">NaturaTex</Link>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={2}>
              <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30">
                <h3 className="text-white font-medium mb-4">For Retail & Customer Service</h3>
                <p className="text-neutral-400 text-sm mb-4">Self-service terminals, wayfinding, menu boards, and interactive customer engagement in stores, restaurants, and service centers.</p>
                <div className="flex gap-2">
                  <Link to="/signatouch" className="text-amber-400 text-sm hover:underline">SignaTouch</Link>
                  <span className="text-neutral-600">•</span>
                  <Link to="/pixelvue" className="text-rose-400 text-sm hover:underline">PixelVue</Link>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={3}>
              <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30">
                <h3 className="text-white font-medium mb-4">For Glass & Architecture</h3>
                <p className="text-neutral-400 text-sm mb-4">Building facades, glass partitions, storefronts, and any application requiring transparency with dynamic content.</p>
                <div className="flex gap-2">
                  <Link to="/glassmorph" className="text-violet-400 text-sm hover:underline">GlassMorph</Link>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={4}>
              <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/30">
                <h3 className="text-white font-medium mb-4">For Creative Installations</h3>
                <p className="text-neutral-400 text-sm mb-4">Museums, exhibitions, brand activations, and any space requiring unique shapes, curves, or artistic LED installations.</p>
                <div className="flex gap-2">
                  <Link to="/pixelvue/creative-shapes" className="text-rose-400 text-sm hover:underline">PixelVue Creative</Link>
                  <span className="text-neutral-600">•</span>
                  <Link to="/glassmorph/flying-display" className="text-violet-400 text-sm hover:underline">Flying Display</Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-neutral-900/50 to-neutral-950">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Need Help Choosing?</p>
          <h2 className="text-3xl font-extralight text-white mb-6">Let Our Experts Guide You</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Not sure which product family is right for your project? 
            Our specialists can help you find the perfect solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Talk to an Expert
            </Link>
            <Link 
              to="/technology-selector" 
              className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors"
            >
              Technology Quiz
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
