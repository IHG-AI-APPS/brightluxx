import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
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

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, projRes] = await Promise.all([
          getProducts({ featured: true }),
          getProjects({ featured: true })
        ]);
        setFeaturedProducts(prodRes.data.products.slice(0, 4));
        setFeaturedProjects(projRes.data.projects.slice(0, 3));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div data-testid="home-page">
      <SEO
        title="Premium LED Display Solutions"
        description="Brightluxx — Leading supplier of digital LED screens in UAE. Indoor, outdoor, transparent, flexible, and rental LED displays. Gulf-grade engineering, local support."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Brightluxx",
            "url": BASE_URL,
            "logo": resolveImage("/api/cdn/brightluxx_logo_white.webp"),
            "description": "Premium digital LED display solutions for retail, corporate, outdoor, events, and creative installations across UAE and MENA.",
            "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE" },
            "contactPoint": { "@type": "ContactPoint", "telephone": "+971-55-991-0711", "contactType": "sales", "availableLanguage": ["English", "Arabic"] },
            "sameAs": ["https://brightluxx.com"]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Brightluxx",
            "url": BASE_URL,
            "description": "Premium digital LED display solutions — indoor, outdoor, transparent, flexible, rental, and creative LED screens.",
            "publisher": { "@type": "Organization", "name": "Brightluxx" }
          }
        ]}
      />      {/* Hero Section — Dual Sora 2 Videos + LED Grid */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16" data-testid="hero-section">
        <div className="hero-video-container mx-4 sm:mx-6 lg:mx-auto max-w-[1320px] blx-led-grid-strong">
          <HeroVideoPlayer />
          <div className="hero-overlay">
            <div className="max-w-2xl">
              <div className="text-[0.6875rem] tracking-[0.28em] text-[var(--blx-gold-3)] mb-5 font-bold">
                Premium LED Displays
              </div>
              <h1 className="mb-4" data-testid="hero-title">
                Engineered for
                <br />
                <span className="text-gradient">Brilliance</span>
              </h1>
              <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-lg font-light tracking-widest">
                OEM-grade LED technology. UAE-ready delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-gold px-8 py-3.5"
                  data-testid="home-hero-primary-cta"
                >
                  Get Quote
                </Link>
                <Link
                  to="/products"
                  className="btn-glass px-8 py-3.5"
                  data-testid="home-hero-secondary-cta"
                >
                  Explore Products
                </Link>
              </div>
            </div>
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
                    <p className="text-xs text-[var(--blx-text-2)] mb-4 leading-relaxed tracking-wider">
                      {door.desc}
                    </p>
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
                <p className="text-xs text-[var(--blx-text-2)] tracking-wider">
                  {item.desc}
                </p>
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
              <Link
                to="/products"
                className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200"
              >
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-14 sm:py-20 relative blx-led-grid" data-testid="featured-projects">
          <div className="absolute inset-0 bg-[var(--blx-bg-raised)]" style={{zIndex: -1}} />
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between mb-8">
              <h2>Recent Projects</h2>
              <Link
                to="/projects"
                className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-bold flex items-center gap-2 text-xs tracking-widest transition-colors duration-200"
              >
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

      {/* CTA Section */}
      <section className="py-20 sm:py-28 relative blx-noise" data-testid="cta-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl mx-auto tracking-wider">
            Expert consultation. Detailed quote within 2 hours.
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
