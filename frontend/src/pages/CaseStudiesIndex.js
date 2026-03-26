import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Building2, ShoppingBag, Briefcase, Plane, Film, Heart, Trophy, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';
import TiltCard from '../components/TiltCard';

const API = process.env.REACT_APP_BACKEND_URL || '';

// Hero background image - modern lobby with LED display
const HERO_IMAGE = '/downloaded-images/ext_a29f21dc4090.jpgs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwTEVEJTIwZGlzcGxheSUyMHNjcmVlbiUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NzM4NTgyMzR8MA&ixlib=rb-4.1.0&q=85';

// Category icons
const CATEGORY_ICONS = {
  hospitality: Building2,
  retail: ShoppingBag,
  corporate: Briefcase,
  transport: Plane,
  entertainment: Film,
  healthcare: Heart,
  sports: Trophy,
  all: Monitor
};

// Short titles for categories
const CATEGORY_SHORT = {
  hospitality: 'Hospitality',
  retail: 'Retail',
  corporate: 'Corporate',
  transport: 'Transport',
  entertainment: 'Entertainment',
  healthcare: 'Healthcare',
  sports: 'Sports'
};

/* Minimal Case Study Card with 3D Tilt Effect */
const CaseStudyCard = ({ caseStudy, index }) => {
  const category = caseStudy.category?.toLowerCase() || 'hospitality';
  const Icon = CATEGORY_ICONS[category] || Building2;
  const shortCategory = CATEGORY_SHORT[category] || caseStudy.category;
  
  // Extract short title - first part before dash or colon, max 3 words
  const shortTitle = caseStudy.title
    .split(/[-—:]/)[ 0]
    .trim()
    .split(' ')
    .slice(0, 3)
    .join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        tiltIntensity={8}
        scale={1.02}
        glareEnabled={true}
        glareMaxOpacity={0.12}
        className="rounded-2xl"
      >
        <Link
          to={`/case-studies/${caseStudy.slug || caseStudy.id}`}
          className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
          data-testid={`case-study-card-${caseStudy.id}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={caseStudy.thumbnail || caseStudy.hero_image}
              alt={shortTitle}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Hover glow */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Concept badge - top right */}
          {caseStudy.is_hypothetical && (
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-amber-500/20 backdrop-blur-sm text-amber-400 border border-amber-500/30 px-2 py-1 text-[9px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1">
                <Sparkles size={10} /> Concept
              </span>
            </div>
          )}

          {/* Content - Centered at bottom */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 text-center">
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)' 
              }}
            >
              <Icon size={20} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
            </div>

            {/* Category label */}
            <span className="text-[10px] text-cyan-400 font-semibold tracking-[0.15em] uppercase mb-2">
              {shortCategory}
            </span>

            {/* Title - Short */}
            <h3 
              className="text-lg font-semibold tracking-wide mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2"
              style={{ color: '#ffffff' }}
            >
              {shortTitle}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/60 mb-3">
              <MapPin size={12} />
              <span>{caseStudy.location}</span>
            </div>

            {/* View CTA - appears on hover */}
            <div 
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{ color: '#22d3ee' }}
            >
              <span>View Project</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Border on hover */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
        </Link>
      </TiltCard>
    </motion.div>
  );
};

export default function CaseStudiesIndex() {
  const { isDark } = useTheme();
  const [caseStudies, setCaseStudies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const pageBg = isDark ? 'bg-[#050508]' : 'bg-neutral-50';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

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
    : caseStudies.filter(cs => cs.category?.toLowerCase() === activeCategory);

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-500`} data-testid="case-studies-index">
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

      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="LED display installation" 
            className="w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/40 via-transparent to-[#050508]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[{ name: 'Home', path: '/' }, { name: 'Case Studies', path: null }]} 
              className="text-white/60 mb-8" 
            />
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Project Portfolio
              </p>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                style={{ color: '#ffffff' }}
                data-testid="case-studies-title"
              >
                Real World{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  Installations
                </span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg">
                LED display projects across UAE and GCC.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap gap-2" data-testid="case-study-filters">
            {categories.map(cat => {
              const Icon = CATEGORY_ICONS[cat.id] || Monitor;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase transition-all rounded-full flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500 text-black'
                      : isDark 
                        ? 'bg-white/5 border border-white/10 text-gray-400 hover:border-cyan-500/30 hover:text-white'
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-600 hover:border-cyan-400'
                  }`}
                  data-testid={`filter-${cat.id}`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className={`text-center py-12 ${textSecondary}`}>
              <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading projects...
            </div>
          ) : filtered.length === 0 ? (
            <div className={`text-center py-12 ${textSecondary}`}>
              No case studies found for this category.
            </div>
          ) : (
            <div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" 
              data-testid="case-studies-grid"
            >
              {filtered.map((cs, index) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Minimal Stats */}
      <section className="py-12 border-t border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { value: `${caseStudies.length}+`, label: 'Projects' },
              { value: '7', label: 'Industries' },
              { value: '100%', label: 'Success' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
                  {stat.value}
                </div>
                <div className={`text-[10px] ${textSecondary} uppercase tracking-[0.15em] mt-1`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight mb-4 ${textPrimary}`}>
              Have a similar project?
            </h2>
            <p className={`${textSecondary} text-sm mb-8`}>
              Our team provides free specification support and budgetary estimates.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
                data-testid="case-studies-contact-cta"
              >
                Discuss Your Project <ArrowRight size={16} />
              </Link>
              <Link 
                to="/solutions" 
                className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-900/5 hover:bg-neutral-900/10'} ${textPrimary} font-semibold px-8 py-3 rounded-full transition-all inline-flex items-center gap-2 border border-white/10`}
                data-testid="case-studies-solutions-cta"
              >
                Browse Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
