import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Cpu } from 'lucide-react';
import SEO from '../components/SEO';
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from '../data/caseStudies';

export default function CaseStudiesIndex() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  return (
    <div className="pb-20" data-testid="case-studies-index">
      <SEO
        title="LED Display Case Studies — Projects in UAE, KSA, GCC | Brightluxx"
        description="Explore real-world LED display installations across hospitality, retail, corporate, transport, entertainment, and healthcare in the UAE/GCC region. Specification precedents for architects and consultants."
        path="/case-studies"
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">PROJECT PORTFOLIO</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Case Studies</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl leading-relaxed" style={{ textTransform: 'none' }}>
            Real-world LED display installations across the UAE and GCC. Each case study includes project specifications, technology rationale, and measurable outcomes — designed as specification precedents for architects and consultants.
          </p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10" data-testid="case-study-filters">
          {CASE_STUDY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[0.625rem] font-bold tracking-[0.15em] transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[var(--blx-gold-3)] text-[#0B0B0B]'
                  : 'glass-panel hover:border-[rgba(229,197,116,0.2)]'
              }`}
              data-testid={`filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-6">
          {filtered.length} PROJECT{filtered.length !== 1 ? 'S' : ''}
        </div>

        {/* Case Study Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(cs => (
            <Link
              key={cs.id}
              to={`/case-studies/${cs.id}`}
              className="glass-panel overflow-hidden group hover:border-[rgba(229,197,116,0.2)] transition-all duration-300"
              data-testid={`case-study-card-${cs.id}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={cs.thumbnail}
                  alt={cs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(11,11,11,0.9) 100%)' }} />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] px-2.5 py-1 rounded-full" style={{ background: 'rgba(11,11,11,0.7)', backdropFilter: 'blur(8px)' }}>
                    {cs.category.toUpperCase()}
                  </span>
                  <span className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-text-2)] px-2.5 py-1 rounded-full" style={{ background: 'rgba(11,11,11,0.7)', backdropFilter: 'blur(8px)' }}>
                    {cs.technology} {cs.pixelPitch}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-sm font-bold tracking-wider mb-3 group-hover:text-[var(--blx-gold-3)] transition-colors leading-relaxed">{cs.title}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.625rem] text-[var(--blx-muted)] mb-4">
                  <span className="flex items-center gap-1.5"><MapPin size={10} /> {cs.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={10} /> {cs.year}</span>
                  <span className="flex items-center gap-1.5"><Cpu size={10} /> {cs.displaySize}</span>
                </div>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed line-clamp-2 mb-4" style={{ textTransform: 'none' }}>
                  {cs.challenge}
                </p>
                <div className="flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] group-hover:gap-2.5 transition-all">
                  View Case Study <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <h2 className="text-lg font-bold tracking-wider mb-3">Have a Similar Project?</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
            Our team provides free specification support, budgetary estimates, and technology recommendations for projects across the GCC region.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="case-studies-contact-cta">
              Discuss Your Project <ArrowRight size={14} />
            </Link>
            <Link to="/technology" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="case-studies-tech-cta">
              Browse Technologies <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
