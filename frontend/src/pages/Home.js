import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, Award, Factory, Package, Truck, GraduationCap, Wrench, Settings, HeartHandshake } from 'lucide-react';
import { getProducts, getProjects } from '../api';
import CdnImage from '../components/CdnImage';
import SEO, { resolveImage, BASE_URL } from '../components/SEO';

/* Scroll-triggered glow hook */
const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const GlowCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`blx-scroll-glow ${inView ? 'in-view' : ''} ${className}`}>
      {children}
    </div>
  );
};

/* Hero video player — crossfade between two Sora 2 videos */
const HERO_VIDEOS = ['/videos/hero-video-1.mp4', '/videos/hero-video-2.mp4'];

const HeroVideoPlayer = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const video0Ref = useRef(null);
  const video1Ref = useRef(null);
  const refs = useRef([video0Ref, video1Ref]);

  useEffect(() => {
    const activeVideo = refs.current[activeIdx]?.current;
    if (!activeVideo) return;

    const onEnded = () => {
      setFading(true);
      const nextIdx = (activeIdx + 1) % HERO_VIDEOS.length;
      const nextVideo = refs.current[nextIdx]?.current;
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
  }, [activeIdx]);

  return (
    <div className="relative w-full h-full" data-testid="hero-video-player">
      {HERO_VIDEOS.map((src, idx) => (
        <video
          key={src}
          ref={idx === 0 ? video0Ref : video1Ref}
          autoPlay={idx === 0}
          muted
          playsInline
          preload={idx === 0 ? 'auto' : 'metadata'}
          poster="/api/cdn/hero_banner.webp"
          data-testid={`home-hero-video-${idx}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]"
          style={{ opacity: idx === activeIdx ? 1 : fading && idx === (activeIdx + 1) % HERO_VIDEOS.length ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
};

/* Animated counter */
const AnimatedCounter = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = end / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
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
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* Client logo carousel */
const CLIENT_LOGOS = [
  'RTA Dubai', 'Dubai Police', 'DEWA', 'Emirates NBD', 'Dubai Islamic Bank',
  'Etihad Airways', 'Sharjah Airport', 'ADNOC', 'Emaar', 'Carrefour',
  'Mashreq Bank', 'RAKBANK', 'Al Naboodah', 'Jumeirah Group', 'BEEAH',
  'City Centre', 'Abu Dhabi Islamic Bank', 'Ministry of Finance UAE',
];

/* Partner technology brands */
const PARTNER_BRANDS = [
  { name: 'NovaStar', desc: 'Video Processing' },
  { name: 'Colorlight', desc: 'LED Controllers' },
  { name: 'Unilumin', desc: 'LED Modules' },
  { name: 'Philips', desc: 'LED Components' },
];

/* Why Choose data */
const WHY_CHOOSE = [
  { icon: Award, title: 'Established Since 2005', desc: 'Nearly two decades of LED display excellence in the UAE market.' },
  { icon: Factory, title: 'In-House Production', desc: 'Complete manufacturing control for consistent quality and customization.' },
  { icon: Package, title: 'Local Stock Availability', desc: '2,000+ sqm of LED displays ready for immediate delivery from our Dubai warehouse.' },
  { icon: Settings, title: 'Complete LED Solutions', desc: 'End-to-end: design, supply, install, configure, and maintain.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-week delivery across UAE. Express options for urgent projects.' },
  { icon: GraduationCap, title: 'Training & Technical Support', desc: 'On-site training, 24/7 helpdesk, and remote diagnostics.' },
  { icon: HeartHandshake, title: 'After-Sales Service', desc: 'Preventive maintenance contracts, spare parts, and rapid response repairs.' },
  { icon: Wrench, title: 'Low Maintenance Solutions', desc: 'Front-serviceable designs, hot-swappable modules, and self-diagnostic systems.' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    getProducts({ limit: 4, featured: true }).then(res => {
      const data = res?.data || res;
      setFeaturedProducts(Array.isArray(data) ? data : data?.products || []);
    }).catch(() => {});
    getProjects({ limit: 3, featured: true }).then(res => {
      const data = res?.data || res;
      setFeaturedProjects(Array.isArray(data) ? data : data?.projects || []);
    }).catch(() => {});
  }, []);

  return (
    <div>
      <SEO
        title="Brightluxx — Premium LED Displays | Dubai & GCC"
        description="OEM-grade LED display technology. MicroLED, outdoor, rental & transparent screens. UAE-ready delivery. Established since 2005."
        path="/"
        schemaType="Organization"
        schemaData={{
          "@type": "Organization", "name": "Brightluxx",
          "url": BASE_URL, "logo": resolveImage('/api/cdn/hero_banner.webp'),
          "sameAs": [
            "https://www.instagram.com/brightluxx/",
            "https://www.linkedin.com/company/brightluxx/",
            "https://www.facebook.com/brightluxx/",
            "https://www.youtube.com/@brightluxx"
          ],
          "foundingDate": "2005",
          "address": { "@type": "PostalAddress", "streetAddress": "Jebel Ali Industrial Area 1", "addressLocality": "Dubai", "addressCountry": "AE" }
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16" data-testid="hero-section">
        <div className="hero-video-container mx-4 sm:mx-6 lg:mx-auto max-w-[1320px] blx-led-grid-strong">
          <HeroVideoPlayer />
          <div className="hero-overlay">
            <div className="max-w-2xl">
              <div className="text-[0.6875rem] tracking-[0.28em] text-[var(--blx-gold-3)] mb-5 font-bold">
                Premium LED Displays — Since 2005
              </div>
              <h1 className="mb-4" data-testid="hero-title">
                Engineered for
                <br />
                <span className="text-gradient">Brilliance</span>
              </h1>
              <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-lg font-light tracking-widest">
                OEM-grade LED technology. UAE-ready delivery. 1,500+ screens installed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-gold px-8 py-3.5" data-testid="home-hero-primary-cta">
                  Get Quote
                </Link>
                <Link to="/products" className="btn-glass px-8 py-3.5" data-testid="home-hero-secondary-cta">
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Statistics */}
      <section className="py-12 sm:py-16" data-testid="project-stats-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 1500, suffix: '+', label: 'Screens Installed' },
              { value: 500, suffix: '+', label: 'Satisfied Clients' },
              { value: 800, suffix: '+', label: 'Projects Completed' },
              { value: 12000, suffix: '', label: 'Sqm LED Installed', prefix: '' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-6 text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="text-3xl sm:text-4xl font-bold text-[var(--blx-gold-3)] mb-2" style={{ fontFamily: 'var(--blx-font)' }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </div>
                <div className="text-[0.625rem] tracking-[0.2em] text-[var(--blx-text-2)] font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Entry Doors */}
      <section className="py-14 sm:py-20" data-testid="entry-doors-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              to: '/products', img: '/api/cdn/cob_microled_1.webp',
              title: 'Products', desc: 'MicroLED, outdoor, rental, transparent. Full range.', cta: 'Browse'
            }, {
              to: '/inspirations', img: '/api/cdn/insp_retail.webp',
              title: 'Inspirations', desc: 'See how LED transforms spaces across industries.', cta: 'Discover'
            }, {
              to: '/projects', img: '/api/cdn/proj_indian_pavilion___expo_2020_dubai.webp',
              title: 'Projects', desc: 'Real installations. Proven results across UAE and MENA.', cta: 'View'
            }].map((door) => (
              <GlowCard key={door.to}>
                <Link to={door.to} className="entry-door group block" data-testid={`home-entry-door-${door.title.toLowerCase()}`}>
                  <CdnImage src={door.img} alt={door.title} className="entry-door-image" w={600} eager />
                  <div className="p-6">
                    <h3 className="text-xl mb-2">{door.title}</h3>
                    <p className="text-xs text-[var(--blx-text-2)] mb-4 leading-relaxed tracking-wider">{door.desc}</p>
                    <div className="flex items-center text-[var(--blx-gold-3)] text-xs font-bold group-hover:gap-3 gap-2 transition-[gap] duration-200 tracking-widest">
                      <span>{door.cta}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-14 sm:py-20 relative blx-led-grid" data-testid="trust-strip">
        <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[{
              icon: Zap, title: 'Gulf-Grade Engineering', desc: 'Rated to 60C. Built for extreme heat.'
            }, {
              icon: Shield, title: 'Local Support', desc: 'UAE-based team. Fast delivery and installation.'
            }, {
              icon: Clock, title: 'Quote in 2 Hours', desc: 'Fast response. Expert consultation.'
            }].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 glass-panel flex items-center justify-center mb-4">
                  <item.icon className="text-[var(--blx-gold-3)]" size={20} />
                </div>
                <h4 className="text-sm font-bold mb-2 tracking-widest">{item.title}</h4>
                <p className="text-xs text-[var(--blx-text-2)] tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-14 sm:py-20" data-testid="featured-products">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2>Featured Products</h2>
              <Link to="/products" className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <GlowCard key={product._id}>
                  <div className="product-card group" data-testid="products-product-card">
                    <div className="relative overflow-hidden">
                      <CdnImage src={product.image_url} alt={product.name} className="w-full h-48" w={400} />
                      <div className="absolute top-3 left-3">
                        <span className="category-badge">{product.product_code}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold mb-1">{product.name}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-muted)] mb-3 tracking-wider">{product.tagline}</p>
                      <div className="flex gap-3 text-[0.6875rem] text-[var(--blx-text-2)] tracking-wider">
                        <span>{product.pixel_pitch}</span>
                        <span className="text-[var(--blx-border-2)]">|</span>
                        <span>{product.brightness}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Brightluxx */}
      <section className="py-14 sm:py-20 relative blx-led-grid" data-testid="why-choose-section">
        <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">WHY CHOOSE US</div>
            <h2 className="mb-3">Why Brightluxx</h2>
            <p className="text-xs text-[var(--blx-text-2)] max-w-xl mx-auto tracking-wider">
              Nearly 20 years of trusted LED display solutions. From design to delivery, we are your complete partner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <GlowCard key={item.title}>
                <div className="glass-panel p-6 h-full" data-testid={`why-choose-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.15)' }}>
                    <item.icon size={18} className="text-[var(--blx-gold-3)]" />
                  </div>
                  <h4 className="text-xs font-bold mb-2 tracking-widest">{item.title}</h4>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed tracking-wider">{item.desc}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Clients Logo Carousel */}
      <section className="py-14 sm:py-20" data-testid="happy-clients-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">TRUSTED BY THE BEST</div>
            <h2 className="mb-3">Our Valued Clients</h2>
          </div>
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-8 animate-scroll-x">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 px-6 py-4 glass-panel flex items-center justify-center min-w-[160px]"
                  data-testid={i < CLIENT_LOGOS.length ? `client-logo-${i}` : undefined}
                >
                  <span className="text-[0.6875rem] font-bold tracking-wider text-[var(--blx-text-2)] whitespace-nowrap">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-14 sm:py-20 relative blx-led-grid" data-testid="featured-projects">
          <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between mb-8">
              <h2>Recent Projects</h2>
              <Link to="/projects" className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <GlowCard key={project._id}>
                  <div className="product-card group" data-testid="project-case-study-card">
                    <CdnImage src={project.image_url} alt={project.title} className="w-full h-52" w={600} />
                    <div className="p-5">
                      <div className="text-[0.625rem] tracking-[0.2em] text-[var(--blx-muted)] mb-1 font-bold">
                        {project.sector} &middot; {project.location}
                      </div>
                      <h3 className="text-sm font-bold mb-2">{project.title}</h3>
                      <div className="flex gap-3 text-[0.6875rem] text-[var(--blx-text-2)] tracking-wider">
                        {project.metrics.slice(0, 2).map((m, i) => (
                          <span key={i}>{m.label}: {m.value}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technology Partners */}
      <section className="py-14 sm:py-20" data-testid="technology-partners-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-[0.625rem] tracking-[0.3em] text-[var(--blx-gold-3)] mb-3 font-bold">TECHNOLOGY PARTNERS</div>
            <h2 className="mb-3">Powered by Industry Leaders</h2>
            <p className="text-xs text-[var(--blx-text-2)] max-w-lg mx-auto tracking-wider">
              We integrate world-class components to deliver uncompromising quality.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNER_BRANDS.map((brand) => (
              <div key={brand.name} className="glass-panel p-6 text-center" data-testid={`partner-${brand.name.toLowerCase()}`}>
                <div className="text-lg font-bold mb-1 tracking-wider">{brand.name}</div>
                <div className="text-[0.625rem] text-[var(--blx-gold-3)] tracking-[0.15em] font-bold">{brand.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 relative blx-noise" data-testid="cta-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl mx-auto tracking-wider">
            Expert consultation. Detailed quotation. Professional installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-10 py-4" data-testid="cta-contact">
              Get in Touch
            </Link>
            <a
              href={`https://wa.me/971559954274?text=${encodeURIComponent('Hi, I want to learn more about Brightluxx LED displays')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-10 py-4"
              data-testid="site-header-whatsapp-link"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
