import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Download, MessageCircle, Phone } from 'lucide-react';
import CdnImage from '../components/CdnImage';
import SEO from '../components/SEO';
import { SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';
import { APPLICATIONS, getApplication } from '../data/applications';

export default function ApplicationLanding() {
  const { appId } = useParams();
  const app = getApplication(appId);

  if (!app) return <Navigate to="/applications" replace />;

  const faqJsonLd = buildFaqJsonLd(app.faqs);
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": app.title,
    "description": app.heroDescription,
    "provider": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "areaServed": { "@type": "Place", "name": "UAE, GCC" },
    "serviceType": "LED Display Solutions",
  };

  return (
    <div className="pb-20" data-testid={`app-landing-${app.id}`}>
      <SEO
        title={`${app.title} — Brightluxx UAE`}
        description={app.heroDescription}
        path={`/applications/${app.id}`}
        jsonLd={[faqJsonLd, pageJsonLd]}
      />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16" data-testid="app-hero">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute inset-0 overflow-hidden">
          <CdnImage src={app.heroImage} alt={app.title} className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/applications" className="hover:text-[var(--blx-text-2)] transition-colors">Applications</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{app.shortTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">{app.title}</h1>
          <p className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">{app.heroTagline}</p>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8" style={{ textTransform: 'none' }}>{app.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="app-hero-quote-cta">
              Get a Budgetary Estimate <ArrowRight size={14} />
            </Link>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent(app.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2"
              data-testid="app-hero-whatsapp-cta"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            {/* Mini Spec Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Recommended Specifications</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {app.specs.map((spec, i) => (
                <div key={i} className="glass-panel p-4" data-testid={`app-spec-${i}`}>
                  <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1">{spec.label}</div>
                  <div className="text-sm font-bold text-[var(--blx-gold-3)]">{spec.value}</div>
                  <div className="text-[0.625rem] text-[var(--blx-text-2)] mt-1" style={{ textTransform: 'none' }}>{spec.detail}</div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Applications Grid */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Applications</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {app.applications.map((a, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`app-use-case-${i}`}>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold tracking-[0.12em] mb-1.5">{a.name}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{a.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Project Gallery */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Project Gallery</h2>
            <div className="grid grid-cols-3 gap-3 mb-10">
              {app.projectImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden" data-testid={`app-project-img-${i}`}>
                  <CdnImage src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* UAE Context */}
            <h2 className="text-lg font-bold tracking-wider mb-4">Where This Works in UAE</h2>
            <div className="glass-panel p-6 mb-10">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{app.uaeContext}</p>
            </div>

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={app.faqs} title="Common Questions" />

            {/* Bottom CTAs */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Ready to Specify?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Get a budgetary estimate or book a 15-minute design assist call with our technical team.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="app-bottom-quote-cta">
                  Get Budgetary Estimate <ArrowRight size={14} />
                </Link>
                <a href={`https://wa.me/971559910711?text=${encodeURIComponent(app.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="app-bottom-whatsapp-cta">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559910711" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="app-bottom-call-cta">
                  <Phone size={14} /> +971 55 991 0711
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId={app.specPackId}
              title={`${app.shortTitle} Spec Pack`}
              description={`Download the complete specification guide for ${app.shortTitle.toLowerCase()} LED installations. Includes recommended specs, BOQ template, and vendor checklist.`}
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">EXPLORE OTHER APPLICATIONS</h3>
              <div className="space-y-1">
                {APPLICATIONS.filter(a => a.id !== app.id).slice(0, 6).map(a => (
                  <Link
                    key={a.id}
                    to={`/applications/${a.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors"
                    style={{ textTransform: 'none' }}
                  >
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" />
                    {a.shortTitle}
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
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/ip-rating-guide', label: 'IP Rating Guide' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">BOOK A DEMO</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Visit our showroom or request a virtual demo to see LED displays in action.
              </p>
              <Link to="/showroom" className="block text-center py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors" data-testid="app-showroom-cta">
                Visit Showroom
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
