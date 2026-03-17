import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, Award, Factory, Package, Truck, GraduationCap, Wrench, Settings, HeartHandshake, Play, ChevronRight, Monitor, Cpu, Eye, Sparkles } from 'lucide-react';
import { getProducts, getProjects } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';
import { EXTERNAL_CDN, cdnUrl } from '../config/cdn';
import { motion, AnimatePresence } from 'framer-motion';

const API = process.env.REACT_APP_BACKEND_URL || '';

// Icon mapping for dynamic content
const ICON_MAP = {
  Factory, Package, Truck, GraduationCap, Wrench, HeartHandshake, Shield, Clock, Award, Zap, Settings
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

/* Apple-style fade in section */
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Glassmorphism card with hover glow */
const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] 
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

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
      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-transparent" />
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

/* Floating icon with animation */
const FloatingIcon = ({ Icon, delay = 0, className = '' }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-5, 5, -5] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    className={className}
  >
    <Icon className="text-cyan-400/60" size={24} />
  </motion.div>
);

/* Default data */
const DEFAULT_STATS = [
  { value: '1500', suffix: '+', label: 'Screens Installed' },
  { value: '500', suffix: '+', label: 'Clients Served' },
  { value: '800', suffix: '+', label: 'Projects Delivered' },
  { value: '12000', suffix: 'm²', label: 'LED Installed' },
];

const DEFAULT_WHY_CHOOSE = [
  { icon: 'Award', title: 'Since 2005', desc: 'Two decades of LED excellence in UAE.' },
  { icon: 'Factory', title: 'In-House Production', desc: 'Complete manufacturing control.' },
  { icon: 'Package', title: 'Local Stock', desc: '2,000+ sqm ready in Dubai.' },
  { icon: 'Truck', title: 'Fast Delivery', desc: 'Same-week across UAE.' },
];

const PRODUCT_CATEGORIES = [
  { name: 'COB MicroLED', cat: 'cob-microled', icon: Cpu, desc: 'Ultra-fine P0.4-P1.2' },
  { name: 'Transparent', cat: 'transparent', icon: Eye, desc: 'See-through displays' },
  { name: 'Outdoor LED', cat: 'outdoor', icon: Monitor, desc: 'Weatherproof P4-P10' },
  { name: 'Creative', cat: 'flexible', icon: Sparkles, desc: 'Curved & custom' },
];

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
          HERO SECTION — Full screen, immersive video with minimal text
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-end" data-testid="hero-section">
        <HeroVideoPlayer videos={hero.video_urls} posterImage={hero.poster_image} />
        
        {/* Floating decorative icons */}
        <div className="absolute top-1/4 right-[15%] hidden lg:block">
          <FloatingIcon Icon={Cpu} delay={0} />
        </div>
        <div className="absolute top-1/3 right-[25%] hidden lg:block">
          <FloatingIcon Icon={Monitor} delay={1} />
        </div>
        <div className="absolute bottom-1/3 right-[10%] hidden lg:block">
          <FloatingIcon Icon={Sparkles} delay={2} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-20 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
              {hero.subheadline || 'Premium LED Displays — Since 2005'}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-6 leading-[0.9]" data-testid="hero-title">
              {hero.headline ? (
                <span dangerouslySetInnerHTML={{ __html: hero.headline.replace(/\n/g, '<br />') }} />
              ) : (
                <>
                  <span className="text-white">Engineered</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500">
                    For Brilliance
                  </span>
                </>
              )}
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-md mb-10 tracking-wide leading-relaxed">
              OEM-grade LED technology. UAE-ready delivery.<br />1,500+ screens installed.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={hero.cta_link || '/contact'} 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                data-testid="home-hero-primary-cta"
              >
                {hero.cta_text || 'Get Quote'} <ArrowRight size={18} />
              </Link>
              <Link 
                to="/products" 
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2"
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
            <motion.div 
              className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS SECTION — Glassmorphism bento grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" data-testid="project-stats-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <GlassCard key={stat.label} className="p-8 lg:p-10 text-center group">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 font-mono" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
                      </span>
                    </div>
                    <div className="text-[10px] md:text-xs tracking-[0.2em] text-gray-500 uppercase font-bold">
                      {stat.label}
                    </div>
                  </motion.div>
                </GlassCard>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT CATEGORIES — Visual showcase grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="product-categories-section">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Technology</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
                LED Display
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-4">
                  Solutions
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {PRODUCT_CATEGORIES.map((cat, index) => (
              <FadeInSection key={cat.cat} delay={index}>
                <Link to={`/products?category=${cat.cat}`} className="group block" data-testid={`home-category-${cat.cat}`}>
                  <GlassCard className="p-6 lg:p-8 h-full relative overflow-hidden">
                    {/* Icon with glow effect */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <cat.icon size={28} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 tracking-wide mb-4">{cat.desc}</p>
                    
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                      Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              </FadeInSection>
            ))}
          </div>

          {/* View All Products CTA */}
          <FadeInSection delay={4}>
            <div className="text-center mt-12">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest transition-colors"
                data-testid="home-view-all-products"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PRODUCTS — Visual product showcase
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0A0A0D]" data-testid="featured-products-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Featured</span>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Latest Products</h2>
                </div>
                <Link to="/products" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest transition-colors">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <FadeInSection key={product._id || product.id} delay={index}>
                  <Link to={`/products/${product.slug}`} className="group block" data-testid="home-featured-product">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4">
                      <CdnImage 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full" 
                        imgClassName="group-hover:scale-110 transition-transform duration-700" 
                        w={500} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent opacity-60" />
                      
                      {/* Product code badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold">
                          {product.product_code}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#050508]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                      {product.pixel_pitch && <span>{product.pixel_pitch}</span>}
                      {product.brightness && <span>• {product.brightness}</span>}
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          VIDEO SHOWCASE REEL — Conditional: Only shows when video is available
          Admin can enable this via Homepage settings when video is ready
      ═══════════════════════════════════════════════════════════════════════ */}
      {showcaseReel?.enabled && showcaseReel?.video_url && (
        <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="video-showcase-section">
          {/* Background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
          
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <FadeInSection>
              <div className="text-center mb-12">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                  Showcase
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
                  {showcaseReel.title || 'See It In Action'}
                </h2>
                <p className="text-gray-400 text-base max-w-xl mx-auto tracking-wide">
                  {showcaseReel.subtitle || 'Real installations across UAE and beyond'}
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={1}>
              <div className="relative">
                {/* Video container with glassmorphism frame */}
                <GlassCard className="p-2 md:p-3 overflow-hidden" hover={false}>
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <video
                      src={showcaseReel.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      data-testid="showcase-video"
                    />
                    {/* Subtle vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/30 via-transparent to-[#050508]/20 pointer-events-none" />
                  </div>
                </GlassCard>

                {/* Floating accent elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
              </div>
            </FadeInSection>

            {/* Optional: Quick stats under video */}
            <FadeInSection delay={2}>
              <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-10 border-t border-white/5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono">4K</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono">HDR</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono">120Hz</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Refresh Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 font-mono">10M:1</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Contrast</div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY BRIGHTLUXX — Icon grid with animations
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" data-testid="why-brightluxx-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Why Us</span>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide">
                The Brightluxx
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">
                  Advantage
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {whyChoose.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || Award;
              return (
                <FadeInSection key={item.title} delay={index}>
                  <GlassCard className="p-6 lg:p-8 h-full text-center group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Animated icon */}
                      <div className="relative mb-5 inline-block">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent flex items-center justify-center mx-auto group-hover:from-cyan-500/30 transition-colors">
                          <Icon size={26} className="text-cyan-400" />
                        </div>
                        <div className="absolute -inset-3 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-2">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed tracking-wide">{item.desc}</p>
                    </motion.div>
                  </GlassCard>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS — Visual showcase
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProjects.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0A0A0D]" data-testid="featured-projects-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <FadeInSection>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Recent Projects</h2>
                </div>
                <Link to="/projects" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest transition-colors">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <FadeInSection key={project._id || project.id} delay={index}>
                  <Link to="/projects" className="group block" data-testid="home-featured-project">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4">
                      <CdnImage 
                        src={project.image_url || project.thumbnail_url} 
                        alt={project.name || project.title} 
                        className="w-full h-full" 
                        imgClassName="group-hover:scale-110 transition-transform duration-700" 
                        w={500} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-transparent" />
                      
                      {/* Location badge */}
                      {project.location && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-black/50 backdrop-blur-sm text-white border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold">
                            {project.location}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                      {project.name || project.title}
                    </h3>
                  </Link>
                </FadeInSection>
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
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
                Ready to Transform Your Space?
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-6">
                Let's Build
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                  Something Brilliant
                </span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-10 tracking-wide max-w-xl mx-auto">
                From concept to installation, our team delivers LED display solutions tailored to your vision.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-10 py-5 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] inline-flex items-center gap-2"
                  data-testid="home-cta-contact"
                >
                  Start Your Project <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/calculator" 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-10 py-5 transition-all inline-flex items-center gap-2"
                  data-testid="home-cta-calculator"
                >
                  Screen Calculator
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
