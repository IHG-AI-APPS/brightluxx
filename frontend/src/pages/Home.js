import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { getTechnologies, getApplications, getCaseStudies, getUpdates } from '../api';

const Home = () => {
  const [featuredTech, setFeaturedTech] = useState([]);
  const [featuredApps, setFeaturedApps] = useState([]);
  const [featuredCases, setFeaturedCases] = useState([]);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techRes, appsRes, casesRes, updatesRes] = await Promise.all([
          getTechnologies({ featured: true }),
          getApplications({ featured: true }),
          getCaseStudies({ featured: true }),
          getUpdates({ limit: 3 })
        ]);
        
        setFeaturedTech(techRes.data.technologies.slice(0, 3));
        setFeaturedApps(appsRes.data.applications.slice(0, 3));
        setFeaturedCases(casesRes.data.caseStudies.slice(0, 3));
        setLatestUpdates(updatesRes.data.updates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
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
    <div className="" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16" data-testid="hero-section">
        {/* Hero Image/Video Container */}
        <div className="hero-video-container mb-8 sm:mb-12 mx-4 sm:mx-6 max-w-7xl" style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <img
            src="/generated/hero_main.png"
            alt="Luxury LED Display Wall"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-xs uppercase tracking-[0.24em] text-[var(--blx-gold-3)] mb-4 font-medium">
                  OEM LED Display Excellence
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display mb-6 leading-[1.1]" data-testid="hero-title">
                  Premium LED Displays
                  <br />
                  <span className="text-gradient">Engineered for UAE</span>
                </h1>
                <p className="text-base md:text-lg text-[var(--blx-text)] leading-relaxed mb-8 max-w-3xl mx-auto font-light drop-shadow-lg">
                  From MicroLED precision to outdoor DOOH brilliance. OEM-grade technology, UAE-ready delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/contact"
                    className="btn-gold px-10 py-4 text-base"
                    data-testid="cta-get-quote"
                  >
                    Get Quote in 2 Hours
                  </Link>
                  <Link
                    to="/technologies"
                    className="btn-glass px-10 py-4 text-base"
                    data-testid="cta-explore-tech"
                  >
                    Explore Technologies
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Entry Doors */}
      <section className="py-14 sm:py-20" data-testid="entry-doors-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technologies Door */}
            <Link to="/technologies" className="entry-door group" data-testid="door-technologies">
              <img
                src="/generated/microled_display.png"
                alt="Technologies"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Technologies</h3>
                <p className="text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  MicroLED, 3D displays, transparent screens, outdoor DOOH. Explore the latest LED innovations.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Applications Door */}
            <Link to="/applications" className="entry-door group" data-testid="door-applications">
              <img
                src="/generated/transparent_led_retail.png"
                alt="Applications"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Applications</h3>
                <p className="text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  Retail, corporate, outdoor advertising, events. See where our displays make an impact.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Case Studies Door */}
            <Link to="/case-studies" className="entry-door group" data-testid="door-case-studies">
              <img
                src="/generated/corporate_boardroom.png"
                alt="Case Studies"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Case Studies</h3>
                <p className="text-[var(--blx-text-2)] mb-4 leading-relaxed">
                  Real UAE projects. Proven results. See our installations across Dubai and beyond.
                </p>
                <div className="flex items-center text-[var(--blx-gold-3)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 sm:py-20 bg-[var(--blx-bg-raised)] border-y border-[var(--blx-border)]" data-testid="trust-strip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-[var(--blx-gold-3)]" size={26} />
              </div>
              <h4 className="font-semibold text-lg mb-3">Built for UAE Heat</h4>
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed">
                -20°C to +60°C operation. Advanced thermal management for extreme conditions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-[var(--blx-gold-3)]" size={26} />
              </div>
              <h4 className="font-semibold text-lg mb-3">UAE-Ready Delivery</h4>
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed">
                Local support. Fast installation. Comprehensive SLA coverage across UAE.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-xl flex items-center justify-center mb-4">
                <Clock className="text-[var(--blx-gold-3)]" size={26} />
              </div>
              <h4 className="font-semibold text-lg mb-3">Quote in 2 Hours</h4>
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed">
                Fast response. Clear pricing. Expert consultation for your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Technologies */}
      <section className="py-14 sm:py-20" data-testid="featured-technologies">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold font-display mb-2">Featured Technologies</h2>
              <p className="text-[var(--blx-text-2)]">Latest innovations in LED display technology</p>
            </div>
            <Link
              to="/technologies"
              className="text-[var(--blx-accent)] hover:text-[var(--blx-accent-2)] font-medium flex items-center gap-2"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTech.map((tech) => (
              <Link
                key={tech._id}
                to={`/technologies/${tech.slug}`}
                className="tech-card group"
                data-testid={`tech-card-${tech.slug}`}
              >
                <img
                  src={tech.heroMedia.url}
                  alt={tech.heroMedia.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4">{tech.tagline}</p>
                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-14 sm:py-20 bg-[var(--blx-bg-raised)]" data-testid="featured-case-studies">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold font-display mb-2">UAE Success Stories</h2>
              <p className="text-[var(--blx-text-2)]">Real projects. Proven results.</p>
            </div>
            <Link
              to="/case-studies"
              className="text-[var(--blx-accent)] hover:text-[var(--blx-accent-2)] font-medium flex items-center gap-2"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCases.map((caseStudy) => (
              <Link
                key={caseStudy._id}
                to={`/case-studies/${caseStudy.slug}`}
                className="tech-card group"
                data-testid={`case-card-${caseStudy.slug}`}
              >
                <img
                  src={caseStudy.heroImage}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-[var(--blx-muted)] mb-2">
                    {caseStudy.category}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{caseStudy.title}</h3>
                  <p className="text-sm text-[var(--blx-text-2)] mb-4">{caseStudy.location}</p>
                  <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>View Project</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      {latestUpdates.length > 0 && (
        <section className="py-14 sm:py-20" data-testid="latest-updates">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold font-display mb-2">What's New</h2>
                <p className="text-[var(--blx-text-2)]">Latest ISE launches and industry updates</p>
              </div>
              <Link
                to="/updates"
                className="text-[var(--blx-accent)] hover:text-[var(--blx-accent-2)] font-medium flex items-center gap-2"
              >
                View All
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestUpdates.map((update) => (
                <Link
                  key={update._id}
                  to={`/updates/${update.slug}`}
                  className="tech-card group"
                  data-testid={`update-card-${update.slug}`}
                >
                  <img
                    src={update.heroImage}
                    alt={update.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-[var(--blx-accent)] mb-2">
                      {update.category}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                    <p className="text-sm text-[var(--blx-text-2)] mb-4 line-clamp-2">{update.excerpt}</p>
                    <div className="flex items-center text-[var(--blx-accent)] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-[var(--blx-panel)] border-y border-[var(--blx-border)] relative blx-noise" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg md:text-xl text-[var(--blx-text-2)] mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            Get expert consultation and a detailed quote within 2 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/contact"
              className="btn-gold px-10 py-4 text-base"
              data-testid="cta-contact"
            >
              Get in Touch
            </Link>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want to learn more about Brightluxx LED displays')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-10 py-4 text-base"
              data-testid="cta-whatsapp"
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