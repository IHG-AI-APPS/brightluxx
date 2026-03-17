import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Factory, Package, Truck, ChevronDown, Layers, Leaf, Tv, Monitor, Sparkles } from 'lucide-react';
import { getProducts, getProjects } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { BASE_URL } from '../components/SEO';
import { EXTERNAL_CDN, cdnUrl } from '../config/cdn';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const API = process.env.REACT_APP_BACKEND_URL || '';

// Icon mapping for dynamic content
const ICON_MAP = { Factory, Package, Truck, Award };

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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, delay: delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Hero video player with smooth transitions */
const HeroVideoPlayer = ({ videos, posterImage, isDark = true }) => {
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
      {/* Cinematic gradient overlay - theme aware */}
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#050508] via-[#050508]/40' : 'from-white via-white/40'} to-transparent`} />
      <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-[#050508]/60' : 'from-white/60'} via-transparent to-transparent`} />
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
  { value: '1500', suffix: '+', label: 'SCREENS' },
  { value: '500', suffix: '+', label: 'CLIENTS' },
  { value: '800', suffix: '+', label: 'PROJECTS' },
  { value: '12000', suffix: 'm²', label: 'LED AREA' },
];

const DEFAULT_WHY_CHOOSE = [
  { icon: 'Award', title: 'SINCE 2005', desc: 'Two decades of LED excellence.' },
  { icon: 'Factory', title: 'IN-HOUSE PRODUCTION', desc: 'Complete manufacturing control.' },
  { icon: 'Package', title: 'LOCAL STOCK', desc: '2,000+ sqm ready in Dubai.' },
  { icon: 'Truck', title: 'FAST DELIVERY', desc: 'Same-week across UAE.' },
];

/* Product Families for homepage showcase */
const PRODUCT_FAMILIES = [
  { 
    id: 'lumimorph', 
    name: 'LUMIMORPH', 
    tagline: 'TEXTURED LED PANELS',
    color: 'cyan',
    icon: Layers,
    image: '/artmorph-assets/grande-hero.jpg',
    link: '/lumimorph'
  },
  { 
    id: 'naturatex', 
    name: 'NATURATEX', 
    tagline: 'NATURAL TEXTURE SCREENS',
    color: 'emerald',
    icon: Leaf,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png',
    link: '/naturatex'
  },
  { 
    id: 'signatouch', 
    name: 'SIGNATOUCH', 
    tagline: 'INTERACTIVE KIOSKS',
    color: 'amber',
    icon: Monitor,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png',
    link: '/signatouch'
  },
  { 
    id: 'glassmorph', 
    name: 'GLASSMORPH', 
    tagline: 'SMART GLASS SOLUTIONS',
    color: 'violet',
    icon: Sparkles,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png',
    link: '/glassmorph'
  },
  { 
    id: 'pixelvue', 
    name: 'PIXELVUE', 
    tagline: 'PROFESSIONAL LED DISPLAYS',
    color: 'rose',
    icon: Tv,
    image: 'https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/127b54193b9ab0ec636c8645560811771af1f58dde5daceea69f261828cf7c0a.png',
    link: '/pixelvue'
  },
];

const COLOR_CLASSES = {
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/30', hover: 'group-hover:border-cyan-400/50' },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/30', hover: 'group-hover:border-emerald-400/50' },
  amber: { text: 'text-amber-400', border: 'border-amber-500/30', hover: 'group-hover:border-amber-400/50' },
  violet: { text: 'text-violet-400', border: 'border-violet-500/30', hover: 'group-hover:border-violet-400/50' },
  rose: { text: 'text-rose-400', border: 'border-rose-500/30', hover: 'group-hover:border-rose-400/50' },
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [homeContent, setHomeContent] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    fetch(`${API}/api/homepage-content`)
      .then(res => res.json())
      .then(data => { if (data.content) setHomeContent(data.content); })
      .catch(() => {});

    getProducts({ limit: 4, featured: true }).then(res => {
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

  // Theme-based classes
  const bgMain = isDark ? 'bg-[#050508]' : 'bg-white';
  const bgSection = isDark ? 'bg-neutral-900/50' : 'bg-neutral-100';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const textMuted = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white';
  const cardBorder = isDark ? 'border-white/10' : 'border-neutral-200';
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-neutral-50';
  const gradientOverlay = isDark 
    ? 'bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent' 
    : 'bg-gradient-to-t from-white via-white/40 to-transparent';

  return (
    <div className={`${bgMain} transition-colors duration-500`}>
      <SEO
        title="Brightluxx — Premium LED Displays | Dubai & GCC"
        description="OEM-grade LED display technology. MicroLED, outdoor, rental & transparent screens. UAE-ready delivery. Established since 2005."
        path="/"
        schemaType="Organization"
        schemaData={{
          "@type": "Organization", "name": "Brightluxx",
          "url": BASE_URL, "logo": cdnUrl('hero_banner.webp'),
          "sameAs": ["https://www.instagram.com/brightluxx/", "https://www.linkedin.com/company/brightluxx/"],
          "foundingDate": "2005",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" }
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Full-screen immersive video
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] flex items-end" data-testid="hero-section">
        <HeroVideoPlayer videos={hero.video_urls} posterImage={hero.poster_image} isDark={isDark} />
        
        {/* Hero Content - Minimal */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9] mb-8" data-testid="hero-title">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>ENGINEERING</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500">
                BRILLIANCE
              </span>
            </h1>
            
            <div className="flex items-center gap-6">
              <Link 
                to={hero.cta_link || '/contact'} 
                className={`font-bold tracking-[0.1em] uppercase px-8 py-4 text-xs transition-colors duration-300 ${isDark ? 'bg-white text-black hover:bg-cyan-400' : 'bg-neutral-900 text-white hover:bg-cyan-500'}`}
                data-testid="home-hero-primary-cta"
              >
                GET QUOTE
              </Link>
              <Link 
                to="/products" 
                className={`font-medium tracking-[0.1em] uppercase text-xs transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'}`}
                data-testid="home-hero-secondary-cta"
              >
                EXPLORE →
              </Link>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} className={isDark ? 'text-white/40' : 'text-neutral-400'} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS SECTION — Minimal, clean numbers
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" data-testid="project-stats-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center px-6 lg:px-0">
                  <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-1 font-mono text-transparent bg-clip-text ${isDark ? 'bg-gradient-to-b from-white to-white/60' : 'bg-gradient-to-b from-neutral-900 to-neutral-600'}`} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
                  </div>
                  <div className={`text-[10px] tracking-[0.25em] uppercase font-medium ${textMuted}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT FAMILIES — Full-width immersive cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28" data-testid="product-families-section">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase ${textPrimary}`}>
                PRODUCT FAMILIES
              </h2>
            </div>
          </FadeIn>

          {/* Product Family Cards - Horizontal scroll on mobile, grid on desktop */}
          <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
            {PRODUCT_FAMILIES.map((family, index) => {
              const colors = COLOR_CLASSES[family.color];
              return (
                <FadeIn key={family.id} delay={index} className="flex-shrink-0 w-[280px] lg:w-auto snap-center">
                  <Link 
                    to={family.link} 
                    className={`group block relative overflow-hidden border ${colors.border} ${colors.hover} transition-all duration-500 ${isDark ? '' : 'shadow-lg'}`}
                    style={{ aspectRatio: '3/4' }}
                    data-testid={`home-family-${family.id}`}
                  >
                    {/* Image */}
                    <img 
                      src={family.image} 
                      alt={family.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className={`text-[10px] tracking-[0.2em] uppercase mb-1 ${colors.text}`}>{family.tagline}</p>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wide">{family.name}</h3>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS — Full-bleed images
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProjects.length > 0 && (
        <section className="py-20 lg:py-28" data-testid="featured-projects-section">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${textPrimary}`}>PROJECTS</h2>
                <Link to="/projects" className={`${textSecondary} hover:${textPrimary} font-medium tracking-[0.1em] uppercase text-xs transition-colors`}>
                  VIEW ALL →
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredProjects.map((project, index) => (
                <FadeIn key={project._id || project.id} delay={index}>
                  <Link to="/projects" className={`group block relative overflow-hidden ${isDark ? '' : 'shadow-lg rounded-lg'}`} style={{ aspectRatio: '4/3' }} data-testid="home-featured-project">
                    <CdnImage 
                      src={project.image_url || project.thumbnail_url} 
                      alt={project.name || project.title} 
                      className="w-full h-full" 
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      w={600} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {project.location && (
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">{project.location}</p>
                      )}
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {project.name || project.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY BRIGHTLUXX — Minimal icon grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`py-20 lg:py-28 border-t ${borderColor}`} data-testid="why-brightluxx-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${textPrimary}`}>WHY BRIGHTLUXX</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {whyChoose.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || Award;
              return (
                <FadeIn key={item.title} delay={index}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <Icon size={28} className="text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${textPrimary}`}>{item.title}</h3>
                    <p className={`text-xs leading-relaxed ${textMuted}`}>{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PRODUCTS — Clean grid
      ═══════════════════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className={`py-20 lg:py-28 border-t ${borderColor}`} data-testid="featured-products-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold tracking-tight uppercase ${textPrimary}`}>PRODUCTS</h2>
                <Link to="/products" className={`${textSecondary} hover:${textPrimary} font-medium tracking-[0.1em] uppercase text-xs transition-colors`}>
                  VIEW ALL →
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <FadeIn key={product._id || product.id} delay={index}>
                  <Link to={`/products/${product.slug}`} className="group block" data-testid="home-featured-product">
                    <div className={`relative overflow-hidden mb-3 ${isDark ? '' : 'shadow-md rounded-lg'}`} style={{ aspectRatio: '1/1' }}>
                      <CdnImage 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full" 
                        imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        w={400} 
                      />
                    </div>
                    <p className="text-[10px] tracking-[0.15em] text-cyan-400 uppercase mb-1">{product.product_code}</p>
                    <h3 className={`text-sm font-bold uppercase tracking-wide group-hover:text-cyan-400 transition-colors ${textPrimary}`}>
                      {product.name}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION — Clean, minimal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`py-28 lg:py-36 border-t ${borderColor}`} data-testid="cta-section">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-8 ${textPrimary}`}>
              LET'S BUILD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">SOMETHING BRILLIANT</span>
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                to="/contact" 
                className={`font-bold tracking-[0.1em] uppercase px-10 py-5 text-xs transition-colors duration-300 ${isDark ? 'bg-white text-black hover:bg-cyan-400' : 'bg-neutral-900 text-white hover:bg-cyan-500'}`}
                data-testid="home-cta-contact"
              >
                START YOUR PROJECT
              </Link>
              <Link 
                to="/calculator" 
                className={`border font-bold tracking-[0.1em] uppercase px-10 py-5 text-xs transition-colors duration-300 ${isDark ? 'border-white/20 text-white hover:border-white/40' : 'border-neutral-300 text-neutral-900 hover:border-neutral-400'}`}
                data-testid="home-cta-calculator"
              >
                SCREEN CALCULATOR
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
