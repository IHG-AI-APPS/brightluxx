import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

// Elegant fade-in animation
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

// Product Data
const PRODUCTS = [
  {
    id: 'elite',
    name: 'LumiMorph Elite',
    tagline: 'Closer. Clearer. Bolder.',
    description: 'High-resolution P2.6 panels for refined clarity, ideal for close-range viewing in premium spaces.',
    image: '/artmorph-assets/workspace-after.png',
    specs: { pitch: 'P2.6', brightness: '3,800 nits', pixels: '147,456/m²' },
    link: '/lumimorph/elite',
    featured: true,
  },
  {
    id: 'grande',
    name: 'LumiMorph Grande',
    tagline: 'Living Walls, Immersive Stories.',
    description: 'For expansive walls and immersive installations, Grande delivers strong visual impact at scale.',
    image: '/artmorph-assets/grande-hero.jpg',
    specs: { pitch: 'P6.2', brightness: '4,500 nits', pixels: '25,600/m²' },
    link: '/lumimorph/grande',
    featured: true,
  },
  {
    id: 'mini',
    name: 'LumiMorph Mini',
    tagline: 'Small Scale. Infinite Possibilities.',
    description: 'Compact and adaptable. Use it alone or with Grande/Elite to shape unique designs.',
    image: '/artmorph-assets/mini-hero.jpg',
    specs: { pitch: 'P2.6 / P6.2', brightness: '3,800 / 4,500 nits', pixels: 'Flexible' },
    link: '/lumimorph/mini',
    featured: false,
  },
];

// Elegant Product Card
const ProductCard = ({ product, index }) => (
  <FadeIn delay={index + 1} className="group">
    <Link to={product.link} className="block">
      <div className="relative overflow-hidden bg-neutral-950 rounded-sm">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase mb-2">{product.tagline}</p>
          <h3 className="text-2xl font-light text-white mb-3 tracking-tight">{product.name}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">{product.description}</p>
          
          {/* Specs */}
          <div className="flex gap-6 mb-6">
            <div>
              <div className="text-white font-medium">{product.specs.pitch}</div>
              <div className="text-neutral-600 text-[10px] tracking-wider uppercase">Pixel Pitch</div>
            </div>
            <div>
              <div className="text-white font-medium">{product.specs.brightness}</div>
              <div className="text-neutral-600 text-[10px] tracking-wider uppercase">Brightness</div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center text-white text-sm font-medium group-hover:text-neutral-300 transition-colors">
            Discover More 
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

export default function LumiMorphLanding() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen" data-testid="lumimorph-landing">
      <SEO
        title="LumiMorph — Textured Luminous Panels | Brightluxx UAE"
        description="Transform spaces with LumiMorph - textured luminous panels that combine natural textures with animated LED displays. Beautiful when off. Stunning when on."
        path="/lumimorph"
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Back to main site */}
        <div className="absolute top-6 left-6 z-20">
          <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Brightluxx
          </Link>
        </div>
        
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/artmorph-assets/grande-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/30 to-neutral-950" />
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
          <FadeIn>
            <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-6">Introducing</p>
          </FadeIn>
          <FadeIn delay={1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-4">
              LumiMorph
            </h1>
          </FadeIn>
          <FadeIn delay={2}>
            <p className="text-xl md:text-2xl text-neutral-300 font-light tracking-wide mb-2">
              Textured Luminous Panels
            </p>
          </FadeIn>
          <FadeIn delay={3}>
            <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
              A revolutionary approach to LED displays. Beautiful when off, stunning when on.
              Natural textures meet animated visuals.
            </p>
          </FadeIn>
          <FadeIn delay={4}>
            <div className="flex gap-4">
              <Link 
                to="/contact"
                className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Request Demo
              </Link>
              <button 
                onClick={toggleVideo}
                className="border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Play size={16} fill={isVideoPlaying ? 'currentColor' : 'none'} />
                {isVideoPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/50" />
        </div>
      </section>

      {/* The Concept */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">The Concept</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-6">
                Lighting should enhance a space whether on or off.
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Traditional LED displays are visually intrusive when turned off, disrupting carefully curated spaces. 
                LumiMorph transforms this challenge into an opportunity — creating displays that look like premium 
                architectural finishes when inactive, and stunning visual experiences when powered on.
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-3xl font-light text-white">200+</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Texture Options</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white">5 Year</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Warranty</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white">60W</div>
                  <div className="text-neutral-600 text-xs tracking-wider uppercase">Avg Power</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-sm overflow-hidden">
                  <img src="/artmorph-assets/workspace-before.png" alt="Display Off" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                    <span className="text-white text-xs tracking-wider uppercase">Display Off</span>
                  </div>
                </div>
                <div className="relative rounded-sm overflow-hidden">
                  <img src="/artmorph-assets/workspace-after.png" alt="Display On" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                    <span className="text-white text-xs tracking-wider uppercase">Display On</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Product Family</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white">Choose Your LumiMorph</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Core Benefits</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white">Why LumiMorph</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Customizable Surface', desc: 'Over 200 textures including wood, stone, textile, and metal finishes.' },
              { title: 'Replaceable Covers', desc: 'Magnetic covers allow quick aesthetic updates to match changing décor.' },
              { title: 'Low Power', desc: 'Average 60W per panel. Intelligent design reduces energy consumption by 40-60%.' },
              { title: 'Modular Design', desc: 'Easy installation with magnetic mounting. Front-access maintenance.' },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="border-t border-neutral-800 pt-6">
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Applications</p>
              <h2 className="text-4xl font-extralight text-white">Perfect for Any Environment</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Business Settings', image: '/artmorph-assets/insp-business.jpg' },
              { name: 'Hospitality', image: '/artmorph-assets/insp-hospitality.png' },
              { name: 'F&B Businesses', image: '/artmorph-assets/insp-fnb.png' },
              { name: 'Cultural Spaces', image: '/artmorph-assets/insp-culture.png' },
            ].map((app, i) => (
              <FadeIn key={i} delay={i + 1}>
                <div className="relative aspect-square overflow-hidden rounded-sm group">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-medium">{app.name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <FadeIn>
          <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6">
            Transform Your Space
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10">
            Request a demo to experience LumiMorph in person. Our specialists will help you 
            choose the perfect configuration for your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-white text-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Request Demo
            </Link>
            <Link 
              to="/case-studies"
              className="border border-white/30 text-white px-10 py-4 text-sm font-medium tracking-wider hover:bg-white/10 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
