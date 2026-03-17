import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Cpu, Building2, FolderOpen, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

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

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

export default function CaseStudiesIndex() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/case-studies`);
        const data = await res.json();
        setCaseStudies(data.case_studies || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to fetch case studies:', err);
      }
      setLoading(false);
    };
    fetchCaseStudies();
  }, []);

  const filtered = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === activeCategory);

  // Separate featured and regular case studies
  const featured = filtered.filter(cs => cs.featured);
  const regular = filtered.filter(cs => !cs.featured);

  return (
    <div className="bg-[#050508]" data-testid="case-studies-index">
      <SEO
        title="LED Display Case Studies — Projects in UAE, KSA, GCC | Brightluxx"
        description="Explore real-world LED display installations across hospitality, retail, corporate, transport, entertainment, and healthcare in the UAE/GCC region."
        path="/case-studies"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "LED Display Case Studies",
          "description": "Real-world LED display installations across UAE/GCC.",
          "publisher": { "@type": "Organization", "name": "Brightluxx" }
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Project Portfolio</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6 leading-[0.95]" data-testid="case-studies-title">
              Case
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 block">
                Studies
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed">
              Real-world and conceptual LED display installations across the UAE and GCC. Each case study includes project specifications, technology rationale, and measurable outcomes.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <FadeInSection>
            <div className="flex items-start gap-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
              <Info size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-cyan-400 font-bold">Note:</span> Some case studies are conceptual demonstrations created for inspirational purposes to showcase potential LED display applications. These are marked with a <Sparkles size={12} className="inline text-amber-400" /> icon. All technical specifications reflect real-world capabilities of our products.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Category Filters */}
          <FadeInSection>
            <div className="flex flex-wrap gap-2 mb-10" data-testid="case-study-filters">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all rounded-lg ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500 text-black'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:border-cyan-500/30 hover:text-white'
                  }`}
                  data-testid={`filter-${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* Results count */}
          <div className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
            {loading ? 'Loading...' : `${filtered.length} Project${filtered.length !== 1 ? 's' : ''}`}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-500 tracking-wide">No case studies found for this category.</p>
            </div>
          ) : (
            <>
              {/* Featured Case Studies (larger cards) */}
              {featured.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {featured.map((cs, idx) => (
                    <FadeInSection key={cs.id} delay={idx}>
                      <Link
                        to={`/case-studies/${cs.slug || cs.id}`}
                        className="group block"
                        data-testid={`case-study-card-${cs.id}`}
                      >
                        <GlassCard className="relative h-[420px]">
                          {/* Image */}
                          <img
                            src={cs.thumbnail || cs.hero_image}
                            alt={cs.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                                {cs.category}
                              </span>
                              {cs.is_hypothetical && (
                                <span className="bg-amber-500/10 backdrop-blur-sm text-amber-400 border border-amber-500/20 px-2 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1">
                                  <Sparkles size={10} /> Concept
                                </span>
                              )}
                            </div>
                            <span className="bg-black/50 backdrop-blur-sm text-white border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                              {cs.technology} {cs.pixel_pitch}
                            </span>
                          </div>

                          {/* Featured Badge */}
                          <div className="absolute top-5 right-5">
                          </div>

                          {/* Content */}
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <h2 className="text-xl font-bold tracking-wide mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
                              {cs.title}
                            </h2>
                            
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400 mb-4">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-cyan-400" /> {cs.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-cyan-400" /> {cs.year}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Cpu size={12} className="text-cyan-400" /> {cs.display_size}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                              View Case Study <ArrowRight size={14} />
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    </FadeInSection>
                  ))}
                </div>
              )}

              {/* Regular Case Studies (3-column grid) */}
              {regular.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regular.map((cs, idx) => (
                    <FadeInSection key={cs.id} delay={idx + featured.length}>
                      <Link
                        to={`/case-studies/${cs.slug || cs.id}`}
                        className="group block"
                        data-testid={`case-study-card-${cs.id}`}
                      >
                        <GlassCard className="h-full">
                          {/* Image */}
                          <div className="relative h-52 overflow-hidden">
                            <img
                              src={cs.thumbnail || cs.hero_image}
                              alt={cs.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="bg-cyan-500/10 backdrop-blur-sm text-cyan-400 border border-cyan-500/20 px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold rounded-lg">
                                  {cs.category}
                                </span>
                                {cs.is_hypothetical && (
                                  <span className="bg-amber-500/10 backdrop-blur-sm text-amber-400 border border-amber-500/20 p-1 rounded-lg">
                                    <Sparkles size={10} />
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Tech Badge */}
                            <div className="absolute bottom-4 right-4">
                              <span className="bg-black/60 backdrop-blur-sm text-white border border-white/10 px-2 py-1 text-[9px] uppercase tracking-wider font-bold rounded">
                                {cs.pixel_pitch}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h2 className="text-sm font-bold tracking-wide mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                              {cs.title}
                            </h2>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-gray-500 mb-4">
                              <span className="flex items-center gap-1">
                                <MapPin size={10} className="text-cyan-400" /> {cs.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={10} className="text-cyan-400" /> {cs.year}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 normal-case">
                              {cs.challenge}
                            </p>
                            
                            <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-bold tracking-wider uppercase group-hover:gap-2 transition-all">
                              View Case Study <ArrowRight size={12} />
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    </FadeInSection>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <FadeInSection delay={2}>
            <GlassCard className="mt-20 p-10 lg:p-16 text-center" hover={false}>
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                Have a Similar Project?
              </span>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4">
                Let's Build
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">
                  Together
                </span>
              </h2>
              <p className="text-gray-400 text-sm mb-10 max-w-lg mx-auto tracking-wide">
                Our team provides free specification support, budgetary estimates, and technology recommendations for projects across the GCC region.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 rounded-lg"
                  data-testid="case-studies-contact-cta"
                >
                  Discuss Your Project <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/technology" 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 rounded-lg"
                  data-testid="case-studies-tech-cta"
                >
                  Browse Technologies <ArrowRight size={16} />
                </Link>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
