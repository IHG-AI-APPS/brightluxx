import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Factory, Package, Truck, GraduationCap, Wrench, HeartHandshake, Shield, Clock, Settings, ChevronRight, Monitor, Cpu, Eye, Sparkles, Layers, Leaf, Tv, ChevronDown } from 'lucide-react';
import { getProducts, getProjects } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { BASE_URL } from '../components/SEO';
import { EXTERNAL_CDN, cdnUrl } from '../config/cdn';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_BACKEND_URL || '';

// Icon mapping for dynamic content
const ICON_MAP = {
  Factory, Package, Truck, GraduationCap, Wrench, HeartHandshake, Shield, Clock, Award, Settings
};

/* Scroll-triggered animation hook */
const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

/* Fade in animation wrapper */
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Hero video player with smooth transitions */
const HeroVideoPlayer = ({ videos, posterImage }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRefs = useRef([]);

  const heroVideos = videos?.length > 0 ? videos : [`${EXTERNAL_CDN}/videos/hero-video-1.mp4`, `${EXTERNAL_CDN}/videos/hero-video-2.mp4`];
  const poster = posterImage || cdnUrl('hero_banner.webp');

  useEffect(() => {
    if (heroVideos.length <= 1) return;
    const activeVideo = videoRefs.current[activeIdx];
    if (!activeVideo) return;

    const onEnded = () => {
      setFading(true);
      const nextIdx = (activeIdx + 1) % heroVideos.length;
      const nextVideo = videoRefs.current[nextIdx];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }
      setTimeout(() => {
        setActiveIdx(nextIdx);
        setFading(false);
      }, 800);
    };

    activeVideo.addEventListener('ended', onEnded);
    return () => activeVideo.removeEventListener('ended', onEnded);
  }, [activeIdx, heroVideos.length]);

  return (
    <div className="absolute inset-0" data-testid="hero-video-player">
      {heroVideos.map((src, idx) => (
        <video
          key={src}
          ref={el => videoRefs.current[idx] = el}
          autoPlay={idx === 0}
          muted
          playsInline
          loop={heroVideos.length === 1}
          preload={idx === 0 ? 'auto' : 'metadata'}
          poster={poster}
          data-testid={`home-hero-video-${idx}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: idx === activeIdx ? 1 : fading && idx === (activeIdx + 1) % heroVideos.length ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-[#050508]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/70 via-transparent to-transparent" />
    </div>
  );
};

/* Animated counter */
const AnimatedCounter = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const endNum = typeof end === 'string' ? parseInt(end, 10) : end;

  useEffect(() => {
    if (!ref.current || isNaN(endNum)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = endNum / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= endNum) {
              setCount(endNum);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endNum]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* Default data */
const DEFAULT_STATS = [
  { value: '1500', suffix: '+', label: 'Screens Installed' },
  { value: '500', suffix: '+', label: 'Clients Served' },
  { value: '800', suffix: '+', label: 'Projects Delivered' },
  { value: '12000', suffix: 'm²', label: 'LED Installed' },
];

const DEFAULT_WHY_CHOOSE = [
  { icon: 'Award', title: 'Since 2005', desc: 'Two decades of LED excellence in the UAE market.' },
  { icon: 'Factory', title: 'In-House Production', desc: 'Complete manufacturing control and quality assurance.' },
  { icon: 'Package', title: 'Local Stock', desc: '2,000+ sqm of inventory ready in Dubai warehouse.' },
  { icon: 'Truck', title: 'Fast Delivery', desc: 'Same-week delivery across all UAE Emirates.' },
];

/* Product Families for homepage showcase */
const PRODUCT_FAMILIES = [
  { 
    id: 'lumimorph', 
    name: 'LumiMorph', 
    tagline: 'Textured LED panels',
    desc: 'Revolutionary LED displays with interchangeable decorative covers.',
    color: 'cyan',
    icon: Layers,
    image: '/artmorph-assets/grande-hero.jpg',
    link: '/lumimorph'
  },
  { 
    id: 'naturatex', 
    name: 'NaturaTex', 
    tagline: 'Natural texture screens',
    desc: 'Nano-optical technology that blends LED with natural materials.',
    color: 'emerald',
    icon: Leaf,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png',
    link: '/naturatex'
  },
  { 
    id: 'signatouch', 
    name: 'SignaTouch', 
    tagline: 'Interactive kiosks',
    desc: 'Enterprise-grade touch screens and self-service terminals.',
    color: 'amber',
    icon: Monitor,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png',
    link: '/signatouch'
  },
  { 
    id: 'glassmorph', 
    name: 'GlassMorph', 
    tagline: 'Smart glass solutions',
    desc: 'Transform any glass surface with intelligent technology.',
    color: 'violet',
    icon: Sparkles,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png',
    link: '/glassmorph'
  },
  { 
    id: 'pixelvue', 
    name: 'PixelVue', 
    tagline: 'Professional LED displays',
    desc: 'Commercial LED solutions from posters to creative shapes.',
    color: 'rose',
    icon: Tv,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/127b54193b9ab0ec636c8645560811771af1f58dde5daceea69f261828cf7c0a.png',
    link: '/pixelvue'
  },
];

const PRODUCT_CATEGORIES = [
  { name: 'COB MicroLED', cat: 'cob-microled', icon: Cpu, desc: 'Ultra-fine P0.4–P1.2 pitch' },
  { name: 'Transparent LED', cat: 'transparent', icon: Eye, desc: 'See-through displays' },
  { name: 'Outdoor LED', cat: 'outdoor', icon: Monitor, desc: 'Weatherproof P4–P10' },
  { name: 'Creative & Custom', cat: 'flexible', icon: Sparkles, desc: 'Curved & custom shapes' },
];

const COLOR_CLASSES = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'group-hover:shadow-cyan-500/20' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'group-hover:shadow-emerald-500/20' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'group-hover:shadow-amber-500/20' },
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'group-hover:shadow-violet-500/20' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', glow: 'group-hover:shadow-rose-500/20' },
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/homepage-content`)
      .then(res => res.json())
      .then(data => { if (data.content) setHomeContent(data.content); })
      .catch(() => {});

    getProducts({ limit: 6, featured: true }).then(res => {
      const data = res?.data || res;
      setFeaturedProducts(Array.isArray(data) ? data : data?.products || []);
    }).catch(() => {});
    
    getProjects({ limit: 3, featured: true }).then(res => {
      const data = res?.data || res;
      setFeaturedProjects(Array.isArray(data) ? data : data?.projects || []);
    }).catch(() => {});
  }, []);

  const hero = homeContent?.hero || {};
  const stats = homeContent?.stats?.length > 0 ? homeContent.stats : DEFAULT_STATS;
  const whyChoose = homeContent?.why_brightluxx_items?.length > 0 ? homeContent.why_brightluxx_items.slice(0, 4) : DEFAULT_WHY_CHOOSE;
  const showcaseReel = homeContent?.showcase_reel || null;

  return (
    <div className="bg-[#050508]">
      <SEO
        title="Brightluxx — Premium LED Displays | Dubai & GCC"
        description="OEM-grade LED display technology. MicroLED, outdoor, rental & transparent screens. UAE-ready delivery. Established since 2005."
        path="/"
        schemaType="Organization"
        schemaData={{
          "@type": "Organization", "name": "Brightluxx",
          "url": BASE_URL, "logo": cdnUrl('hero_banner.webp'),
          "sameAs": [
            "https://www.instagram.com/brightluxx/",
            "https://www.linkedin.com/company/brightluxx/"
          ],
          "foundingDate": "2005",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" }
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Clean, immersive video with refined typography
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-end" data-testid="hero-section">
        <HeroVideoPlayer videos={hero.video_urls} posterImage={hero.poster_image} />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-24 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow label - only this is uppercase */}
            <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
              {hero.subheadline || 'Premium LED Displays — Since 2005'}
            </span>
            
            {/* Main headline - Sentence case, elegant */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]" data-testid="hero-title">
              {hero.headline ? (
                <span dangerouslySetInnerHTML={{ __html: hero.headline.replace(/\n/g, '<br />') }} />
              ) : (
                <>
                  <span className="text-white">Engineering</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500">
                    Brilliance
                  </span>
                </>
              )}
            </h1>
            
            {/* Subtext - Sentence case, readable */}
            <p className="text-neutral-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              OEM-grade LED technology with UAE-ready delivery. Over 1,500 screens installed across the region since 2005.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={hero.cta_link || '/contact'} 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                data-testid="home-hero-primary-cta"
              >
                Get a Quote <ArrowRight size={18} />
              </Link>
              <Link 
                to="/products" 
                className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-white font-semibold tracking-wide px-8 py-4 transition-all inline-flex items-center gap-2"
                data-testid="home-hero-secondary-cta"
              >
                Explore Products <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Scroll</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-cyan-500/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS SECTION — Minimal, floating numbers
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 border-b border-white/5" data-testid="project-stats-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex-1 min-w-[140px] text-center lg:text-left relative">
                  {/* Divider line (except first) */}
                  {index > 0 && (
                    <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                  )}
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-mono" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
                    </span>
                  </div>
                  <div className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT FAMILIES — Featured collections with brand colors
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" data-testid="product-families-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Our Collections</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Product Families
              </h2>
              <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                Five distinct product lines, each engineered for specific environments and applications.
              </p>
            </div>
          </FadeIn>

          {/* Product Family Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {PRODUCT_FAMILIES.map((family, index) => {
              const colors = COLOR_CLASSES[family.color];
              const Icon = family.icon;
              return (
                <FadeIn key={family.id} delay={index}>
                  <Link 
                    to={family.link} 
                    className={`group block relative overflow-hidden rounded-xl border border-neutral-800 hover:border-opacity-100 transition-all duration-500 ${colors.glow} hover:shadow-lg`}
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    data-testid={`home-family-${family.id}`}
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img 
                        src={family.image} 
                        alt={family.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                      
                      {/* Icon badge */}
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center backdrop-blur-sm`}>
                        <Icon size={20} className={colors.text} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className={`text-[10px] tracking-[0.2em] uppercase mb-1 ${colors.text}`}>{family.tagline}</p>
                      <h3 className="text-xl font-semibold text-white mb-1">{family.name}</h3>
                      <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 mb-3">{family.desc}</p>
                      <div className={`flex items-center gap-1 text-xs font-medium ${colors.text}`}>
                        Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          {/* View All Link */}
          <FadeIn delay={5}>
            <div className="text-center mt-12">
              <Link 
                to="/product-families" 
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm tracking-wide transition-colors"
              >
                View all product families <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT CATEGORIES — Technology grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0A0A0D]" data-testid="product-categories-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">By Technology</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  LED Display Solutions
                </h2>
              </div>
              <Link to="/products" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm tracking-wide transition-colors">
                View all products <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {PRODUCT_CATEGORIES.map((cat, index) => (
              <FadeIn key={cat.cat} delay={index}>
                <Link to={`/products?category=${cat.cat}`} className="group block" data-testid={`home-category-${cat.cat}`}>
                  <div className="p-6 lg:p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="relative mb-5">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                        <cat.icon size={24} className="text-cyan-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed mb-4">{cat.desc}</p>
                    
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium">
                      Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PRODUCTS — Clean product cards
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="py-24 lg:py-32" data-testid="featured-products-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
                <div>
                  <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Featured</span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Latest Products</h2>
                </div>
                <Link to="/products" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm tracking-wide transition-colors">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <FadeIn key={product._id || product.id} delay={index}>
                  <Link to={`/products/${product.slug}`} className="group block" data-testid="home-featured-product">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                      <CdnImage 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full" 
                        imgClassName="group-hover:scale-105 transition-transform duration-700" 
                        w={500} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
                      
                      {/* Product code badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-2.5 py-1 text-[10px] tracking-wider font-medium rounded">
                          {product.product_code}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                      {product.pixel_pitch && <span>{product.pixel_pitch}</span>}
                      {product.brightness && <span>• {product.brightness}</span>}
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          VIDEO SHOWCASE REEL — Conditional section
      ═══════════════════════════════════════════════════════════════════════ */}
      {showcaseReel?.enabled && showcaseReel?.video_url && (
        <section className="py-24 lg:py-32 bg-[#0A0A0D]" data-testid="video-showcase-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Showcase</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                  {showcaseReel.title || 'See It in Action'}
                </h2>
                <p className="text-neutral-400 text-base max-w-xl mx-auto leading-relaxed">
                  {showcaseReel.subtitle || 'Real installations across UAE and beyond'}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={1}>
              <div className="relative rounded-xl overflow-hidden border border-white/5">
                <div className="relative aspect-video bg-black">
                  <video
                    src={showcaseReel.video_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    data-testid="showcase-video"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY BRIGHTLUXX — Clean feature grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" data-testid="why-brightluxx-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                The Brightluxx Advantage
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {whyChoose.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || Award;
              return (
                <FadeIn key={item.title} delay={index}>
                  <div className="p-6 lg:p-8 rounded-xl border border-white/5 bg-white/[0.02] text-center group hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="relative mb-5 inline-block">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-transparent flex items-center justify-center mx-auto">
                        <Icon size={26} className="text-cyan-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS — Portfolio showcase
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProjects.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0A0A0D]" data-testid="featured-projects-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
                <div>
                  <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Portfolio</span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Recent Projects</h2>
                </div>
                <Link to="/projects" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm tracking-wide transition-colors">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <FadeIn key={project._id || project.id} delay={index}>
                  <Link to="/projects" className="group block" data-testid="home-featured-project">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                      <CdnImage 
                        src={project.image_url || project.thumbnail_url} 
                        alt={project.name || project.title} 
                        className="w-full h-full" 
                        imgClassName="group-hover:scale-105 transition-transform duration-700" 
                        w={500} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent" />
                      
                      {/* Location badge */}
                      {project.location && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-black/50 backdrop-blur-sm text-white border border-white/10 px-3 py-1.5 text-[10px] tracking-wider font-medium rounded">
                            {project.location}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {project.name || project.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION — Final conversion
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 lg:py-40 relative overflow-hidden" data-testid="cta-section">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
                Ready to Transform Your Space?
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                Let's Build Something
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block mt-2">
                  Brilliant Together
                </span>
              </h2>
              <p className="text-neutral-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                From concept to installation, our team delivers LED display solutions tailored to your vision.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide px-10 py-5 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                  data-testid="home-cta-contact"
                >
                  Start Your Project <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/calculator" 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-white font-semibold tracking-wide px-10 py-5 transition-all inline-flex items-center gap-2"
                  data-testid="home-cta-calculator"
                >
                  Screen Calculator
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
