import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, Phone, Sparkles } from 'lucide-react';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';
import { LATEST_TECH, getLatestTech } from '../data/latestTech';

export default function LatestTechDetail() {
  const { techId } = useParams();
  const tech = getLatestTech(techId);

  if (!tech) return <Navigate to="/latest-tech" replace />;

  const faqJsonLd = buildFaqJsonLd(tech.faqs);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": tech.title,
    "description": tech.heroDescription,
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-04",
    "about": "LED Display Technology",
  };

  return (
    <div className="pb-20" data-testid={`latest-tech-${tech.id}`}>
      <SEO
        title={`${tech.title} — Brightluxx UAE`}
        description={tech.heroDescription}
        path={`/latest-tech/${tech.id}`}
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-20 pb-16" data-testid="tech-hero">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute inset-0 overflow-hidden">
          <CdnImage src={tech.heroImage} alt={tech.title} className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/latest-tech" className="hover:text-[var(--blx-text-2)] transition-colors">Latest Technology</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{tech.shortTitle}</span>
          </div>
          {tech.badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.5rem] font-bold tracking-[0.2em] mb-4" style={{ background: 'rgba(229,197,116,0.12)', color: 'var(--blx-gold-3)', border: '1px solid rgba(229,197,116,0.2)' }}>
              <Sparkles size={10} /> {tech.badge}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">{tech.title}</h1>
          <p className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">{tech.heroTagline}</p>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8">{tech.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-hero-cta">
              Get Specification Advice <ArrowRight size={14} />
            </Link>
            <a href={`https://wa.me/971559954274?text=${encodeURIComponent(tech.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-hero-whatsapp">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            {tech.sections.map((section, si) => (
              <React.Fragment key={si}>
                {si > 0 && <SectionDivider />}
                <h2 className="text-lg font-bold tracking-wider mb-4">{section.title}</h2>

                {section.content && (
                  <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4">{section.content}</p>
                )}

                {section.bullets && (
                  <div className="glass-panel p-6 mb-6">
                    <ul className="space-y-3">
                      {section.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-3">
                          <CheckCircle size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-[var(--blx-text-2)] leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.specs && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {section.specs.map((spec, spi) => (
                      <div key={spi} className="glass-panel p-4" data-testid={`tech-spec-${spi}`}>
                        <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1">{spec.label}</div>
                        <div className="text-sm font-bold text-[var(--blx-gold-3)]">{spec.value}</div>
                        <div className="text-[0.625rem] text-[var(--blx-text-2)] mt-1">{spec.detail}</div>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}

            <SectionDivider />

            {/* What to Specify */}
            <div className="glass-panel p-6 mb-8" style={{ background: 'rgba(229,197,116,0.04)', borderColor: 'rgba(229,197,116,0.12)' }}>
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">WHAT TO SPECIFY</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-3">
                When specifying {tech.shortTitle.toLowerCase()} technology for your project, include these items in your tender document:
              </p>
              <ul className="space-y-1.5">
                {['Technology type and specific model/series', 'Pixel pitch (if LED-based)', 'Brightness and contrast requirements', 'Viewing distance and optimal zone', 'Content management system', 'Installation and structural requirements', 'Warranty and maintenance SLA', 'Content creation requirements'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--blx-gold-3)]" />
                    <span className="text-[0.6875rem] text-[var(--blx-text-2)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SectionDivider />
            <FAQSection faqs={tech.faqs} />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Ready to Explore {tech.shortTitle}?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6">
                Our technical team can advise on the best {tech.shortTitle.toLowerCase()} solutions for your specific project requirements.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="tech-bottom-cta">
                  Discuss Your Project <ArrowRight size={14} />
                </Link>
                <a href={`https://wa.me/971559954274?text=${encodeURIComponent(tech.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559954274" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Phone size={14} /> +971 55 991 0711
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="cob-mip-smd"
              title="Technology Spec Pack"
              description="Download the complete LED technology comparison guide including COB, MiP, SMD, and MicroLED specifications."
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">MORE LATEST TECH</h3>
              <div className="space-y-1">
                {LATEST_TECH.filter(t => t.id !== tech.id).map(t => (
                  <Link key={t.id} to={`/latest-tech/${t.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <Sparkles size={10} className="text-[var(--blx-gold-3)]" /> {t.shortTitle}
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">TECHNICAL GUIDES</h3>
              <div className="space-y-1">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">VISIT OUR SHOWROOM</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4">See the latest LED technologies in person at our Dubai showroom.</p>
              <Link to="/showroom" className="block text-center py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors">
                Book a Visit
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
