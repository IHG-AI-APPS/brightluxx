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
      <section className="relative hero-glow py-20" data-testid="hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight" data-testid="hero-title">
              Premium LED Displays
              <br />
              <span className="text-gradient">Engineered for UAE</span>
            </h1>
            <p className="text-base md:text-lg text-[var(--blx-text-2)] leading-relaxed mb-8 max-w-3xl mx-auto">
              From MicroLED precision to outdoor DOOH brilliance. OEM-grade technology, UAE-ready delivery. 
              Built for extreme heat. Tuned for maximum visibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[var(--blx-accent)] text-[var(--blx-bg)] rounded-lg font-semibold hover:bg-[var(--blx-accent-2)] transition-colors inline-flex items-center justify-center gap-2"
                data-testid="cta-get-quote"
              >
                Get Quote in 2 Hours
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/technologies"
                className="px-8 py-4 bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-lg font-semibold hover:border-[var(--blx-accent)] transition-colors"
                data-testid="cta-explore-tech"
              >
                Explore Technologies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Entry Doors */}
      <section className="py-14 sm:py-20" data-testid="entry-doors-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technologies Door */}
            <Link to="/technologies" className="entry-door group" data-testid="door-technologies">
              <img
                src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800"
                alt="Technologies"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Technologies</h3>
                <p className="text-[var(--blx-text-2)] mb-4">
                  MicroLED, 3D displays, transparent screens, outdoor DOOH. Explore the latest LED innovations.
                </p>
                <div className="flex items-center text-[var(--blx-accent)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Applications Door */}
            <Link to="/applications" className="entry-door group" data-testid="door-applications">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="Applications"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Applications</h3>
                <p className="text-[var(--blx-text-2)] mb-4">
                  Retail, corporate, outdoor advertising, events. See where our displays make an impact.
                </p>
                <div className="flex items-center text-[var(--blx-accent)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Case Studies Door */}
            <Link to="/case-studies" className="entry-door group" data-testid="door-case-studies">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Case Studies"
                className="entry-door-image"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 font-display">Case Studies</h3>
                <p className="text-[var(--blx-text-2)] mb-4">
                  Real UAE projects. Proven results. See our installations across Dubai and beyond.
                </p>
                <div className="flex items-center text-[var(--blx-accent)] font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-[var(--blx-bg-raised)] border-y border-[var(--blx-border)]" data-testid="trust-strip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] rounded-lg flex items-center justify-center mb-3">
                <Zap className="text-[var(--blx-accent)]" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Built for UAE Heat</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
                -20°C to +60°C operation. Advanced thermal management for extreme conditions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] rounded-lg flex items-center justify-center mb-3">
                <Shield className="text-[var(--blx-accent)]" size={24} />
              </div>
              <h4 className="font-semibold mb-2">UAE-Ready Delivery</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
                Local support. Fast installation. Comprehensive SLA coverage across UAE.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[var(--blx-panel)] rounded-lg flex items-center justify-center mb-3">
                <Clock className="text-[var(--blx-accent)]" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Quote in 2 Hours</h4>
              <p className="text-sm text-[var(--blx-text-2)]">
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
      <section className="py-20 bg-[var(--blx-panel)] border-y border-[var(--blx-border)]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-[var(--blx-text-2)] mb-8">
            Get expert consultation and a detailed quote within 2 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-[var(--blx-accent)] text-[var(--blx-bg)] rounded-lg font-semibold hover:bg-[var(--blx-accent-2)] transition-colors inline-flex items-center justify-center gap-2"
              data-testid="cta-contact"
            >
              Get in Touch
              <ArrowRight size={20} />
            </Link>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent('Hi, I want to learn more about Brightluxx LED displays')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors inline-flex items-center justify-center gap-2"
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