import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Factory, Package, Truck, ChevronDown, Layers, Leaf, Tv, Monitor, Sparkles, FileText, Calculator, BookOpen, MonitorPlay } from 'lucide-react';
import { getProducts, getProjects } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { BASE_URL, useSeoData } from '../components/SEO';
import { cdnUrl } from '../config/cdn';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem, 
  SpotlightCard
} from '../components/AppleAnimations';

const API = process.env.REACT_APP_BACKEND_URL;

if (!API) {
  throw new Error('REACT_APP_BACKEND_URL must be configured');
}

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

/* Apple-style Fade in animation wrapper */
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, delay: delay * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Hero video player with smooth transitions and PARALLAX support */
const HERO_POSTER = 'https://files.ihgbrands.com/hero-video-poster.webp';

const HeroVideoPlayer = ({ videos, posterImage, videoY, overlayOpacity }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRefs = useRef([]);

  const heroVideos = videos?.length > 0 ? videos : ['https://files.ihgbrands.com/videos_hero-video-converted.mp4'];

  // Handle video transitions
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
    <div className="absolute inset-0 overflow-hidden" data-testid="hero-video-player">
      {/* Dark background shown until video loads */}
      <div className={`absolute inset-0 bg-[#050508] transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Parallax video container */}
      <motion.div 
        className="absolute inset-0 scale-110"
        style={{ y: videoY }}
      >
        {heroVideos.map((src, idx) => (
          <video
            key={src}
            ref={el => videoRefs.current[idx] = el}
            autoPlay={idx === 0}
            muted
            playsInline
            loop={heroVideos.length === 1}
            preload={idx === 0 ? 'auto' : 'none'}
            poster={idx === 0 ? (posterImage || HERO_POSTER) : undefined}
            onCanPlay={() => { if (idx === 0) setVideoReady(true); }}
            data-testid={`home-hero-video-${idx}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
            style={{ opacity: idx === activeIdx ? 1 : fading && idx === (activeIdx + 1) % heroVideos.length ? 1 : 0 }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </motion.div>
      
      {/* Cinematic gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/20"
        style={{ opacity: overlayOpacity }}
      />
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

/* ═══════════════════════════════════════════════════════════════════════
   HERO WITH PARALLAX — Apple-style scroll-linked animations
═══════════════════════════════════════════════════════════════════════ */
const HeroWithParallax = ({ hero, isLoaded }) => {
  const heroRef = useRef(null);
  const { isDark } = useTheme();
  
  // Scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms - video moves slower, creating depth
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150]); // Video moves down slowly
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Content moves up faster
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Content fades out
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]); // Overlay darkens
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // Subtle scale on scroll
  
  // Smooth springs for buttery animations
  const smoothVideoY = useSpring(videoY, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={heroRef}
      className="relative h-screen min-h-[600px] flex items-end overflow-hidden" 
      data-testid="hero-section"
    >
      {/* Parallax video background */}
      <motion.div className="absolute inset-0" style={{ scale: smoothScale }}>
        {isLoaded ? (
          <HeroVideoPlayer 
            videos={hero.video_urls}
            posterImage={hero.poster_image}
            videoY={smoothVideoY}
            overlayOpacity={overlayOpacity}
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#050508]" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/20"
              style={{ opacity: overlayOpacity }}
            />
          </div>
        )}
      </motion.div>
      
      {/* Hero Content - Moves faster (parallax effect) and fades out */}
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-72 sm:pb-24 lg:pb-28"
        style={{ y: smoothContentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p className="mb-5 text-xs font-bold tracking-[0.22em] text-cyan-300 uppercase" data-testid="hero-brand-tagline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            Engineering Brilliance
          </motion.p>
          <h1 className="max-w-5xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] mb-6" data-testid="hero-title" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
            LED Display &amp; Digital Signage Solutions for UAE &amp; GCC
          </h1>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-white/80 mb-8" data-testid="hero-description">
            Design, supply, engineering, installation and lifecycle support for premium LED displays, digital signage, MicroLED, transparent displays and immersive visual systems.
          </p>
          
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/solutions" className={`relative group overflow-hidden font-bold tracking-[0.1em] uppercase px-7 py-4 text-xs transition-colors duration-300 ${isDark ? 'bg-white text-black hover:bg-cyan-300' : 'bg-neutral-900 text-white hover:bg-cyan-500'}`} data-testid="home-hero-primary-cta">
              Explore Solutions
            </Link>
            <Link 
              to="/contact" 
              className="group font-bold tracking-[0.1em] uppercase text-xs transition-colors text-white/90 hover:text-cyan-200 flex items-center gap-2 border-b border-white/35 hover:border-cyan-200 pb-1"
              data-testid="home-hero-secondary-cta"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Start Your Project
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with glow */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="relative"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-white/50" />
            <div className="absolute inset-0 blur-md bg-cyan-400/30 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
};

/* Default data */
const DEFAULT_STATS = [
  { value: '2000', suffix: '+', label: 'Screens Installed' },
  { value: '750', suffix: '+', label: 'Satisfied Clients' },
  { value: '1000', suffix: '+', label: 'Projects Completed' },
  { value: '15000', suffix: ' m²', label: 'LED Installed' },
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
    tagline: 'FINE-PITCH & MICROLED',
    color: 'cyan',
    icon: Layers,
    image: 'https://files.ihgbrands.com/brightluxx/site-images/opt-family-lumimorph.webp',
    link: '/lumimorph'
  },
  { 
    id: 'naturatex', 
    name: 'NATURATEX', 
    tagline: 'ARCHITECTURAL / TEXTURE DISPLAYS',
    color: 'emerald',
    icon: Leaf,
    image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_fam_naturatex.webp',
    link: '/naturatex'
  },
  { 
    id: 'signatouch', 
    name: 'SIGNATOUCH', 
    tagline: 'INTERACTIVE DIGITAL SIGNAGE',
    color: 'amber',
    icon: Monitor,
    image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_fam_signatouch.webp',
    link: '/signatouch'
  },
  { 
    id: 'glassmorph', 
    name: 'GLASSMORPH', 
    tagline: 'TRANSPARENT LED & SMART GLASS',
    color: 'violet',
    icon: Sparkles,
    image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_fam_glassmorph.webp',
    link: '/glassmorph'
  },
  { 
    id: 'pixelvue', 
    name: 'PIXELVUE', 
    tagline: 'PROFESSIONAL LED DISPLAYS',
    color: 'rose',
    icon: Tv,
    image: 'https://files.ihgbrands.com/brightluxx/site-images/opt_fam_pixelvue.webp',
    link: '/pixelvue'
  },
];

const SOLUTION_PATHS = [
  { title: 'Retail & Hospitality', copy: 'Customer-facing LED, video walls and digital experiences for premium spaces.', link: '/solutions/retail' },
  { title: 'Corporate & Control Rooms', copy: 'Reliable visual systems for collaboration, monitoring and mission-critical information.', link: '/solutions/corporate' },
  { title: 'Architecture & Public Realm', copy: 'Integrated display surfaces for façades, atria and high-impact public environments.', link: '/solutions/architecture' },
  { title: 'Digital Signage', copy: 'Commercial displays, interactive touchpoints and content-led visual communication.', link: '/signage-solutions' },
];

const PROJECT_CONTEXT = {
  'dubai-mall-digital-atrium': { application: 'Retail atrium', technology: 'COB LED' },
  'szr-dooh-network': { application: 'Outdoor / DOOH', technology: 'High-brightness LED' },
  'adnoc-command-centre': { application: 'Command centre', technology: 'COB MicroLED video wall' },
};

const INDUSTRY_PATHS = [
  { title: 'Retail', link: '/solutions/retail' },
  { title: 'Hospitality', link: '/solutions/retail' },
  { title: 'Corporate', link: '/solutions/corporate' },
  { title: 'Government', link: '/government-solutions' },
  { title: 'Control Rooms', link: '/solutions/control-rooms' },
  { title: 'Events & XR', link: '/solutions/entertainment' },
];

const TECHNICAL_INSIGHTS = [
  { title: 'LED Display Pricing Guide UAE (2026)', copy: 'Cost drivers by LED type, plus the questions that shape a project estimate.', link: '/blog/led-display-pricing-guide-uae' },
  { title: 'Indoor vs Outdoor LED Screen', copy: 'A practical guide to brightness, IP rating, pixel pitch and operating conditions.', link: '/blog/indoor-vs-outdoor-led-screen-dubai' },
  { title: 'LED Wall Buyer’s Checklist', copy: 'Twelve questions that help project teams evaluate display capability and lifecycle support.', link: '/blog/led-wall-buyers-checklist' },
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
  const seoData = useSeoData('/');
  const heroAlt = seoData?.image_alt || 'Brightluxx Premium LED Display Solutions';

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
        title="LED Screen Supplier Dubai | Video Wall & Display Solutions UAE"
        description="Dubai's trusted LED screen supplier since 2005. MicroLED, outdoor, indoor, transparent displays. Local stock, same-day delivery, 24/7 support. 500+ installations across UAE & GCC."
        path="/"
        keywords="LED screen supplier Dubai, LED display UAE, video wall Dubai, outdoor LED screen, indoor LED display, transparent LED, MicroLED Dubai, digital signage UAE"
        jsonLd={{
          "@type": "Organization", 
          "name": "Brightluxx",
          "url": BASE_URL, 
          "logo": cdnUrl('hero_banner.webp'),
          "sameAs": ["https://www.instagram.com/brightluxx/", "https://www.linkedin.com/company/brightluxx/"],
          "foundingDate": "2005",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" }
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Full-screen immersive video with Apple-style PARALLAX
      ═══════════════════════════════════════════════════════════════════════ */}
      <HeroWithParallax hero={hero} isLoaded={!!homeContent} />

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS SECTION — Glassmorphism cards with animated counters
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 relative overflow-hidden" data-testid="project-stats-section">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <StaggerItem key={stat.label}>
                  <SpotlightCard className={`glass-card rounded-2xl p-6 lg:p-8 text-center group hover:scale-[1.02] transition-transform duration-300`}>
                    <output className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-mono text-transparent bg-clip-text ${isDark ? 'bg-gradient-to-b from-white to-white/60' : 'bg-gradient-to-b from-neutral-900 to-neutral-600'}`} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`} aria-label={`${Number(stat.value).toLocaleString()}${stat.suffix || ''} ${stat.label}`}>
                      <span aria-hidden="true"><AnimatedCounter end={stat.value} suffix={stat.suffix || ''} prefix={stat.prefix || ''} /></span>
                      <span className="sr-only">{Number(stat.value).toLocaleString()}{stat.suffix || ''} {stat.label}</span>
                    </output>
                    <div className={`text-[10px] tracking-[0.25em] uppercase font-medium ${textMuted}`}>
                      {stat.label}
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.15)' }} />
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DISCOVERY PATHS — Solution intent before proprietary product families
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`py-20 lg:py-28 border-y ${borderColor}`} data-testid="home-discovery-paths">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">Start with the project</p>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>
                Choose your solution
              </h2>
              <p className={`mt-4 text-sm md:text-base leading-7 ${textSecondary}`}>Begin with the environment and experience you need to create. Our teams then guide the technology, engineering and support requirements.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-l border-white/10">
            {SOLUTION_PATHS.map((solution) => (
              <Link key={solution.title} to={solution.link} className={`group min-h-[210px] border-r border-b ${borderColor} p-7 md:p-8 transition-colors duration-300 ${isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-neutral-50'}`} data-testid={`home-solution-${solution.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                <ArrowRight className="mb-10 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" size={22} aria-hidden="true" />
                <h3 className={`text-xl font-bold mb-3 ${textPrimary}`}>{solution.title}</h3>
                <p className={`text-sm leading-6 ${textSecondary}`}>{solution.copy}</p>
              </Link>
            ))}
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
              <div className="flex items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">Project evidence</p>
                  <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>Featured installations</h2>
                </div>
                <Link to="/projects" className={`${textSecondary} hover:${textPrimary} font-medium tracking-[0.1em] uppercase text-xs transition-colors`} data-testid="home-projects-view-all">
                  View all →
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredProjects.map((project, index) => {
                const context = PROJECT_CONTEXT[project.slug] || {};
                return (
                <FadeIn key={project._id || project.id} delay={index}>
                  <Link to="/projects" className={`group block relative overflow-hidden ${isDark ? '' : 'shadow-lg rounded-lg'}`} style={{ aspectRatio: '4/3' }} data-testid={`home-featured-project-${project.slug || index}`}>
                    <CdnImage 
                      src={project.image_url || project.thumbnail_url} 
                      alt={project.name || project.title} 
                      className="w-full h-full" 
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      w={600} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      {project.location && (
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">{project.location}</p>
                      )}
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {project.name || project.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold tracking-[0.12em] uppercase text-cyan-200">
                        {context.application && <span>{context.application}</span>}
                        {context.technology && <span className="text-white/75">{context.technology}</span>}
                      </div>
                      {project.description && <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/75">{project.description}</p>}
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-white">View Project <ArrowRight size={14} aria-hidden="true" /></span>
                    </div>
                  </Link>
                </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28 relative" data-testid="product-families-section">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mb-12 lg:mb-16">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">Core technologies</p>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>Technology first. Brightluxx family second.</h2>
              <p className={`mt-4 text-sm md:text-base leading-7 ${textSecondary}`}>Start with the display capability your project needs, then explore the Brightluxx family built around it.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer staggerDelay={0.1} className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
            {PRODUCT_FAMILIES.map((family) => {
              const colors = COLOR_CLASSES[family.color];
              return (
                <StaggerItem key={family.id} className="flex-shrink-0 w-[280px] lg:w-auto snap-center">
                  <Link to={family.link} className={`group block relative overflow-hidden rounded-lg border ${colors.border} transition-colors duration-300 ${colors.hover} ${isDark ? '' : 'shadow-lg'}`} style={{ aspectRatio: '3/4' }} data-testid={`home-family-${family.id}`}>
                    <motion.img src={family.image} alt={`${family.tagline} — ${family.name}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className={`text-[10px] tracking-[0.16em] uppercase mb-2 ${colors.text}`}>{family.tagline}</p>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wide">{family.name}</h3>
                      <p className="mt-2 text-xs text-white/70">Brightluxx product family</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

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
                    <p className={`text-xs leading-relaxed ${textMuted}`}>{item.desc || item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`border-t ${borderColor}`} data-testid="home-industries-section">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className={`px-6 py-16 md:px-12 md:py-20 lg:border-r ${borderColor}`}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">Built around the brief</p>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>Visual systems for the places people work, visit and gather.</h2>
            <p className={`mt-5 max-w-xl text-sm md:text-base leading-7 ${textSecondary}`}>Explore applications before products to find the right balance of viewing distance, visual impact, service access and operating conditions.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 border-l border-t border-white/10">
            {INDUSTRY_PATHS.map((industry) => (
              <Link key={industry.title} to={industry.link} className={`min-h-[124px] border-r border-b ${borderColor} p-5 text-sm font-bold transition-colors duration-300 ${isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-neutral-50'} ${textPrimary}`} data-testid={`home-industry-${industry.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                <span className="block h-full content-end">{industry.title}<ArrowRight className="mt-3 text-cyan-400" size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-t ${borderColor}`} data-testid="home-professional-pathways">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-3">
          <div className={`p-8 md:p-10 lg:border-r ${borderColor}`}>
            <FileText className="mb-8 text-cyan-400" size={24} aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-cyan-400 mb-3">For professionals</p>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>Architects &amp; consultants</h2>
            <p className={`mt-4 text-sm leading-7 ${textSecondary}`}>Bring display, structural and specification requirements together early in the project process.</p>
            <Link to="/for-architects" className={`mt-7 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} hover:text-cyan-400 transition-colors`} data-testid="home-architects-link">Explore professional resources <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className={`p-8 md:p-10 lg:border-r ${borderColor}`}>
            <MonitorPlay className="mb-8 text-cyan-400" size={24} aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-cyan-400 mb-3">Digital environments</p>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>Digital signage solutions</h2>
            <p className={`mt-4 text-sm leading-7 ${textSecondary}`}>Discover commercial signage, display hardware and interactive experiences for visitor-facing environments.</p>
            <Link to="/signage-solutions" className={`mt-7 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} hover:text-cyan-400 transition-colors`} data-testid="home-digital-signage-link">Explore digital signage <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="p-8 md:p-10">
            <BookOpen className="mb-8 text-cyan-400" size={24} aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-cyan-400 mb-3">Technical planning</p>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>Resources &amp; calculators</h2>
            <p className={`mt-4 text-sm leading-7 ${textSecondary}`}>Use practical tools to plan screen size, viewing distance, power and project budgets before specification.</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              <Link to="/calculator" className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} hover:text-cyan-400 transition-colors`} data-testid="home-calculator-link"><Calculator size={15} aria-hidden="true" /> Screen calculator</Link>
              <Link to="/knowledge" className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} hover:text-cyan-400 transition-colors`} data-testid="home-knowledge-link">Knowledge hub <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
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
          LIFESTYLE SHOWCASE — Home Cinema & Art Installations
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`py-20 lg:py-28 border-t ${borderColor}`} data-testid="lifestyle-section">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className={`text-xs tracking-[0.2em] uppercase ${textSecondary} mb-4`}>LIFESTYLE SOLUTIONS</p>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>
                Beyond Commercial
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Home Cinema Card */}
            <FadeIn delay={0.1}>
              <Link 
                to="/luxury-home-cinema"
                className={`group block overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-amber-500/30' : 'bg-white border-neutral-200 hover:border-amber-300'} border transition-all duration-500`}
                data-testid="home-cinema-widget"
              >
                <div className="aspect-[16/10] md:aspect-video overflow-hidden relative">
                  <img 
                    src="https://files.ihgbrands.com/downloaded-images_ext_6f178933d1b4.jpg"
                    alt="Luxury Home Cinema"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'} text-xs font-medium mb-3`}>
                    <Tv className="w-3 h-3" />
                    HOME CINEMA
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 ${textPrimary}`}>Luxury Home Cinema</h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>Indoor theaters, outdoor poolside screens, yacht entertainment systems</p>
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'} group-hover:gap-3 transition-all`}>
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>

            {/* Art & Immersive Card */}
            <FadeIn delay={0.2}>
              <Link 
                to="/art-immersive"
                className={`group block overflow-hidden rounded-2xl ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-violet-500/30' : 'bg-white border-neutral-200 hover:border-violet-300'} border transition-all duration-500`}
                data-testid="art-immersive-widget"
              >
                <div className="aspect-[16/10] md:aspect-video overflow-hidden relative">
                  <img 
                    src="https://files.ihgbrands.com/site-images_opt_ext_bc8c12ee1348.webp"
                    alt="Art & Immersive"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-700'} text-xs font-medium mb-3`}>
                    <Sparkles className="w-3 h-3" />
                    ART & XR
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 ${textPrimary}`}>Art & Immersive</h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>NFT galleries, virtual production stages, immersive museums</p>
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-violet-400' : 'text-violet-600'} group-hover:gap-3 transition-all`}>
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className={`py-20 lg:py-28 border-t ${borderColor}`} data-testid="home-insights-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">From the technical desk</p>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary}`}>Latest technical insights</h2>
            </div>
            <Link to="/blog" className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} hover:text-cyan-400 transition-colors`} data-testid="home-insights-view-all">View all insights <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {TECHNICAL_INSIGHTS.map((insight) => (
              <Link key={insight.link} to={insight.link} className={`group border ${borderColor} p-6 md:p-7 transition-colors duration-300 ${isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-neutral-50'}`} data-testid={`home-insight-${insight.link.split('/').pop()}`}>
                <BookOpen className="mb-12 text-cyan-400" size={21} aria-hidden="true" />
                <h3 className={`text-xl font-bold leading-snug ${textPrimary}`}>{insight.title}</h3>
                <p className={`mt-4 text-sm leading-6 ${textSecondary}`}>{insight.copy}</p>
                <span className={`mt-7 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${textPrimary} group-hover:text-cyan-400 transition-colors`}>Read insight <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION — Clean, minimal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`py-28 lg:py-36 border-t ${borderColor}`} data-testid="cta-section">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-8 ${textPrimary}`}>
              LET’S BUILD<br />
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
