import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Building2, Users, HardHat, Cpu, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { CASE_STUDIES } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { caseId } = useParams();
  const cs = CASE_STUDIES.find(c => c.id === caseId);

  if (!cs) return <Navigate to="/case-studies" replace />;

  const related = CASE_STUDIES.filter(c => c.id !== cs.id && (c.category === cs.category || c.techId === cs.techId)).slice(0, 3);

  return (
    <div className="pb-20" data-testid={`case-study-${cs.id}`}>
      <SEO
        title={`${cs.title} | LED Case Study — Brightluxx`}
        description={cs.challenge.slice(0, 160)}
        path={`/case-studies/${cs.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": cs.title,
          "description": cs.challenge.slice(0, 160),
          "author": { "@type": "Organization", "name": "Brightluxx" },
          "publisher": { "@type": "Organization", "name": "Brightluxx" },
          "datePublished": `${cs.year}-01-01`,
          "about": { "@type": "Thing", "name": cs.technology }
        }}
      />

      {/* Hero Image */}
      <div className="relative h-[45vh] min-h-[320px]">
        <img src={cs.heroImage} alt={cs.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/case-studies" className="hover:text-[var(--blx-text-2)] transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{cs.category.charAt(0).toUpperCase() + cs.category.slice(1)}</span>
          </div>
          <span className="inline-block text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(229,197,116,0.1)' }}>
            {cs.category.toUpperCase()}
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider leading-tight mb-4">{cs.title}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.6875rem] text-[var(--blx-text-2)]">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[var(--blx-gold-3)]" /> {cs.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[var(--blx-gold-3)]" /> {cs.year}</span>
            <span className="flex items-center gap-1.5"><Cpu size={12} className="text-[var(--blx-gold-3)]" /> {cs.technology} {cs.pixelPitch}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            {/* Project Team */}
            <div className="glass-panel p-5 mb-8">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1 flex items-center gap-1.5"><Building2 size={10} /> CLIENT</div>
                  <div className="text-xs font-bold tracking-wider">{cs.client}</div>
                </div>
                <div>
                  <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1 flex items-center gap-1.5"><Users size={10} /> CONSULTANT</div>
                  <div className="text-xs font-bold tracking-wider">{cs.consultant}</div>
                </div>
                <div>
                  <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1 flex items-center gap-1.5"><HardHat size={10} /> CONTRACTOR</div>
                  <div className="text-xs font-bold tracking-wider">{cs.contractor}</div>
                </div>
              </div>
            </div>

            {/* Challenge */}
            <h2 className="text-base font-bold tracking-wider mb-3">The Challenge</h2>
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-10">{cs.challenge}</p>

            {/* Solution */}
            <h2 className="text-base font-bold tracking-wider mb-3">Our Solution</h2>
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-10">{cs.solution}</p>

            {/* Results */}
            <h2 className="text-base font-bold tracking-wider mb-4">Results & Impact</h2>
            <div className="space-y-3 mb-10">
              {cs.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3 glass-panel p-4" data-testid={`case-result-${i}`}>
                  <CheckCircle2 size={16} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--blx-text-2)] leading-relaxed">{r}</span>
                </div>
              ))}
            </div>

            {/* Spec Table */}
            <h2 className="text-base font-bold tracking-wider mb-4">Technical Specifications</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="case-spec-table">
              <table className="w-full">
                <tbody>
                  {cs.specs.map(([label, value], i) => (
                    <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                      <td className="py-3 px-5 text-[0.625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)] w-[40%]">{label}</td>
                      <td className="py-3 px-5 text-xs">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom CTA */}
            <div className="p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Planning a Similar Project?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6">
                Get free specification support and budgetary pricing for your {cs.category} LED display project.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  Get a Quote <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/971559954274" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559954274" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Technology Link */}
            <Link to={`/technology/${cs.techId}`} className="glass-panel p-5 block group hover:border-[rgba(229,197,116,0.2)] transition-all" data-testid="case-tech-link">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">TECHNOLOGY USED</div>
              <div className="text-sm font-bold tracking-wider mb-1 group-hover:text-[var(--blx-gold-3)] transition-colors">{cs.technology}</div>
              <div className="text-[0.6875rem] text-[var(--blx-muted)]">Pixel Pitch: {cs.pixelPitch}</div>
              <div className="text-[0.6875rem] text-[var(--blx-muted)] mt-1">Display: {cs.displaySize}</div>
              <div className="flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] mt-3 group-hover:gap-2.5 transition-all">
                View Technology Guide <ArrowRight size={10} />
              </div>
            </Link>

            {/* Tags */}
            <div className="glass-panel p-5">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">TAGS</div>
              <div className="flex flex-wrap gap-1.5">
                {cs.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[0.5625rem] tracking-wider text-[var(--blx-muted)] rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel p-5">
              <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER TOOLS</div>
              <div className="space-y-2">
                <Link to="/calculator" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Screen Calculator
                </Link>
                <Link to="/budget-estimator" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Budget Estimator
                </Link>
                <Link to="/resources" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                  <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> Resource Library
                </Link>
              </div>
            </div>

            {/* Related Case Studies */}
            {related.length > 0 && (
              <div className="glass-panel p-5">
                <div className="text-[0.5rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">RELATED PROJECTS</div>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link key={r.id} to={`/case-studies/${r.id}`} className="block group" data-testid={`related-case-${r.id}`}>
                      <div className="flex gap-3">
                        <img src={r.thumbnail} alt={r.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                        <div>
                          <div className="text-[0.6875rem] font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors leading-tight">{r.title.split(' — ')[0]}</div>
                          <div className="text-[0.5625rem] text-[var(--blx-muted)] mt-0.5">{r.technology} {cs.pixelPitch} &middot; {r.location}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
