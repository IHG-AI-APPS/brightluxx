import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { getProducts, getProjects } from '../api';

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
      {/* Hero Section - Video */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16" data-testid="hero-section">
        <div className="hero-video-container mx-4 sm:mx-6 lg:mx-auto max-w-[1320px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1699742983091-8465fbc56a5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85"
            data-testid="home-hero-video"
            className="w-full h-full object-cover"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.24em] text-[var(--blx-gold-3)] mb-4 font-medium font-sans">
                Premium LED Displays
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display mb-4 leading-[1.1]" data-testid="hero-title">
                Engineered for
                <br />
                <span className="text-gradient">Brilliance</span>
              </h1>
              <p className="text-sm md:text-base text-[var(--blx-text-2)] mb-8 max-w-lg font-light leading-relaxed">
                OEM-grade LED technology. UAE-ready delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-gold px-8 py-3.5 text-sm"
                  data-testid="home-hero-primary-cta"
                >
                  Get Quote
                </Link>
                <Link
                  to="/products"
                  className="btn-glass px-8 py-3.5 text-sm"
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
            <Link to="/products" className="entry-door group" data-testid="home-entry-door-products">
              <img
                src="/generated/microled_display.png"
                alt="Products"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-display">Products</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  MicroLED, outdoor, rental, transparent. Explore our full range.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] text-sm font-medium group-hover:gap-3 gap-2 transition-[gap] duration-200">
                  <span>Browse</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            <Link to="/inspirations" className="entry-door group" data-testid="home-entry-door-inspirations">
              <img
                src="/generated/3d_holographic_mall.png"
                alt="Inspirations"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-display">Inspirations</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  See how LED transforms spaces across industries.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] text-sm font-medium group-hover:gap-3 gap-2 transition-[gap] duration-200">
                  <span>Discover</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            <Link to="/projects" className="entry-door group" data-testid="home-entry-door-projects">
              <img
                src="/generated/outdoor_dooh_dubai.png"
                alt="Projects"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-display">Projects</h3>
                <p className="text-sm text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  Real installations. Proven results across UAE and MENA.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] text-sm font-medium group-hover:gap-3 gap-2 transition-[gap] duration-200">
                  <span>View</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-14 sm:py-20 bg-[var(--blx-bg-raised)] border-y border-[var(--blx-border)]" data-testid="trust-strip">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-[var(--blx-gold-3)]" size={22} />
              </div>
              <h4 className="font-semibold text-base mb-2">Gulf-Grade Engineering</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
                Rated to 60C. Built for extreme heat.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-[var(--blx-gold-3)]" size={22} />
              </div>
              <h4 className="font-semibold text-base mb-2">Local Support</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
                UAE-based team. Fast delivery and installation.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Clock className="text-[var(--blx-gold-3)]" size={22} />
              </div>
              <h4 className="font-semibold text-base mb-2">Quote in 2 Hours</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
                Fast response. Expert consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-14 sm:py-20" data-testid="featured-products">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display">Featured Products</h2>
              <Link
                to="/products"
                className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-medium flex items-center gap-2 text-sm transition-colors duration-200"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="product-card group"
                  data-testid={`products-product-card`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="category-badge">{product.product_code}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-xs text-[var(--blx-muted)] mb-3">{product.tagline}</p>
                    <div className="flex gap-3 text-xs text-[var(--blx-text-2)]">
                      <span>{product.pixel_pitch}</span>
                      <span className="text-[var(--blx-border-2)]">|</span>
                      <span>{product.brightness}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-14 sm:py-20 bg-[var(--blx-bg-raised)]" data-testid="featured-projects">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display">Recent Projects</h2>
              <Link
                to="/projects"
                className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-4)] font-medium flex items-center gap-2 text-sm transition-colors duration-200"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className="product-card group"
                  data-testid={`project-case-study-card`}
                >
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wider text-[var(--blx-muted)] mb-1">
                      {project.sector} &middot; {project.location}
                    </div>
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <div className="flex gap-3 text-xs text-[var(--blx-text-2)]">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <span key={i}>{m.label}: {m.value}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 sm:py-28 relative blx-noise" data-testid="cta-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display mb-4 leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base text-[var(--blx-text-2)] mb-8 max-w-xl mx-auto">
            Expert consultation. Detailed quote within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-10 py-4 text-sm" data-testid="cta-contact">
              Get in Touch
            </Link>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want to learn more about Brightluxx LED displays')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-10 py-4 text-sm"
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
