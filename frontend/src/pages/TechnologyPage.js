import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, Calculator, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';
import { TECHNOLOGIES } from '../data/technologies';
import QuickInquiry from '../components/QuickInquiry';

function SpecTable({ specs, title }) {
  return (
    <div className="glass-panel overflow-hidden mb-10" data-testid="tech-spec-table">
      <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">{title || 'TECHNICAL SPECIFICATIONS'}</div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {specs.map(([label, value], i) => (
              <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                <td className="py-3 px-5 text-[0.625rem] font-bold tracking-[0.12em] text-[var(--blx-muted)] w-[40%]">{label}</td>
                <td className="py-3 px-5 text-xs" style={{ textTransform: 'none' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TechnologyPage() {
  const { techId } = useParams();
  const tech = TECHNOLOGIES.find(t => t.id === techId);

  if (!tech) return <Navigate to="/solutions" replace />;

  const faqJsonLd = buildFaqJsonLd(tech.faqs);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${tech.title} — Specification Guide for UAE/GCC`,
    "description": tech.heroDesc,
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-03-04",
    "about": { "@type": "Thing", "name": tech.title },
  };

  const relatedTechs = tech.relatedTech.map(id => TECHNOLOGIES.find(t => t.id === id)).filter(Boolean);

  return (
    <div className="pb-20" data-testid={`tech-page-${tech.id}`}>
      <SEO
        title={`${tech.title} — Specification Guide | Brightluxx UAE`}
        description={tech.heroDesc}
        path={`/technology/${tech.id}`}
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-20 pb-16" data-testid="tech-hero">
        <div className="absolute inset-0 blx-led-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/technology" className="hover:text-[var(--blx-text-2)] transition-colors">Technology</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{tech.shortTitle}</span>
          </div>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">{tech.heroTagline}</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">{tech.title}</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8" style={{ textTransform: 'none' }}>
            {tech.heroDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-hero-quote-cta">
              Get Quote <ArrowRight size={14} />
            </Link>
            <a href={`https://wa.me/971559954274?text=${encodeURIComponent(`Hi, I'm interested in ${tech.title} for my project. Can you provide specifications and pricing?`)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-hero-whatsapp-cta">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            <SpecifierAnswerBox
              title={`${tech.shortTitle} — Specifier Quick Reference`}
              items={tech.specifierBox}
              recommendation={tech.specifierRec}
            />

            {/* Specs */}
            <h2 className="text-base font-bold tracking-wider mb-4">Technical Specifications</h2>
            <SpecTable specs={tech.specs} />

            <SectionDivider />

            {/* Comparison */}
            <h2 className="text-base font-bold tracking-wider mb-4">Technology Comparison</h2>
            <ComparisonTable
              caption={`${tech.shortTitle.toUpperCase()} COMPARISON`}
              headers={tech.comparison.headers}
              rows={tech.comparison.rows}
            />

            <SectionDivider />

            {/* Use Cases */}
            <h2 className="text-base font-bold tracking-wider mb-4">Where to Specify {tech.shortTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {tech.useCases.map((uc, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`tech-usecase-${i}`}>
                  <h3 className="text-xs font-bold tracking-[0.12em] mb-2">{uc.title}</h3>
                  <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{uc.desc}</p>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={tech.faqs} title={`${tech.shortTitle} FAQ`} />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Specifying {tech.shortTitle}?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Talk to our technical team about {tech.shortTitle.toLowerCase()} for your project. Free specification support, budgetary pricing, and sample arrangements.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  Request Budget Estimate <ArrowRight size={14} />
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
            <SpecPackCTA
              packId={tech.specPack}
              title={`${tech.shortTitle} Spec Pack`}
              description={`Download the ${tech.shortTitle} specification guide. Includes comparison tables, specification checklists, and UAE/GCC climate guidance.`}
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">SPECIFIER TOOLS</h3>
              <div className="space-y-2">
                <Link to="/calculator" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <Calculator size={12} className="text-[var(--blx-gold-3)]" /> Screen Calculator
                </Link>
                <Link to="/budget-estimator" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                  <DollarSign size={12} className="text-[var(--blx-gold-3)]" /> Budget Estimator
                </Link>
              </div>
            </div>

            {relatedTechs.length > 0 && (
              <div className="glass-panel p-5">
                <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TECHNOLOGIES</h3>
                <div className="space-y-1">
                  {relatedTechs.map(rt => (
                    <Link key={rt.id} to={`/technology/${rt.id}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                      <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {rt.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">ALL TECHNOLOGIES</h3>
              <div className="space-y-1">
                {TECHNOLOGIES.filter(t => t.id !== tech.id).map(t => (
                  <Link key={t.id} to={`/technology/${t.id}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={10} className="text-[var(--blx-muted)]" /> {t.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <QuickInquiry context={`${tech.title} technology`} />
    </div>
  );
}
