import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Calculator, DollarSign, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import { FAQSection, buildFaqJsonLd, SectionDivider } from '../components/KnowledgeBase';
import { DEA_PAGES, getDeaPage } from '../data/deaPages';
import QuickInquiry from '../components/QuickInquiry';

function SpecCard({ spec }) {
  return (
    <div className="glass-panel p-4">
      <div className="text-[0.5625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1">{spec.label}</div>
      <div className="text-sm font-bold text-[var(--blx-gold-3)]">{spec.value}</div>
      <div className="text-[0.625rem] text-[var(--blx-text-2)] mt-1">{spec.detail}</div>
    </div>
  );
}

function ApplicationCard({ app, index }) {
  return (
    <div className="glass-panel p-5" data-testid={`dea-detail-app-${index}`}>
      <div className="flex items-start gap-3">
        <CheckCircle2 size={16} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] mb-1.5">{app.name}</h3>
          <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{app.desc}</p>
        </div>
      </div>
    </div>
  );
}

function DesignCard({ item, index }) {
  return (
    <div className="glass-panel p-5" data-testid={`dea-design-${index}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
          <Lightbulb size={14} className="text-[var(--blx-gold-3)]" />
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-[0.12em] mb-1.5">{item.title}</h3>
          <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function DeaPageDetail() {
  const { pageId } = useParams();
  const page = getDeaPage(pageId);

  if (!page) return <Navigate to="/digital-experience-architecture" replace />;

  const faqJsonLd = buildFaqJsonLd(page.faqs);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${page.title} — LED Solutions for UAE/GCC | Brightluxx`,
    "description": page.heroDescription,
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-03-04",
    "about": { "@type": "Thing", "name": page.title },
  };

  const otherPages = DEA_PAGES.filter(p => p.id !== page.id);

  return (
    <div className="pb-20" data-testid={`dea-detail-${page.id}`}>
      <SEO
        title={`${page.title} — LED Solutions for UAE/GCC | Brightluxx`}
        description={page.heroDescription}
        path={`/digital-experience/${page.id}`}
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute inset-0 overflow-hidden">
          <img src={page.heroImage} alt={page.title} className="w-full h-full object-cover opacity-15" loading="eager" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/digital-experience-architecture" className="hover:text-[var(--blx-text-2)] transition-colors">Digital Experience</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{page.shortTitle}</span>
          </div>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">{page.heroTagline}</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-2">{page.heroTitle}</h1>
          <p className="text-sm text-[var(--blx-text-2)] font-medium tracking-wider mb-4">{page.heroSubtitle}</p>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8">{page.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/design-assist" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-detail-da-cta">
              Request Design Assist <ArrowRight size={14} />
            </Link>
            <a
              href={`https://wa.me/971559954274?text=${encodeURIComponent(page.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2"
              data-testid="dea-detail-wa-cta"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Main Content */}
          <div>
            {/* Overview */}
            <h2 className="text-lg font-bold tracking-wider mb-4">{page.overview.title}</h2>
            <div className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-10 space-y-4">
              {page.overview.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <SectionDivider />

            {/* Specifications */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Technical Specifications</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {page.specs.map((spec, i) => (
                <SpecCard key={i} spec={spec} />
              ))}
            </div>

            <SectionDivider />

            {/* Applications */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Applications</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {page.applications.map((app, i) => (
                <ApplicationCard key={i} app={app} index={i} />
              ))}
            </div>

            <SectionDivider />

            {/* Project Gallery */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Project Gallery</h2>
            <div className="grid grid-cols-3 gap-3 mb-10">
              {page.projectImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden" data-testid={`dea-detail-img-${i}`}>
                  <img src={img} alt={`${page.title} project ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* GCC Context */}
            <h2 className="text-lg font-bold tracking-wider mb-4">{page.gccContext.title}</h2>
            <div className="glass-panel p-6 mb-10">
              <div className="text-sm text-[var(--blx-text-2)] leading-relaxed space-y-4">
                {page.gccContext.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <SectionDivider />

            {/* Design Considerations */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Design Considerations</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {page.designConsiderations.map((item, i) => (
                <DesignCard key={i} item={item} index={i} />
              ))}
            </div>

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={page.faqs} title="Frequently Asked Questions" />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Ready to Specify {page.shortTitle}?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6">
                Get a budgetary estimate or book a free design assist call with our engineering team.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-detail-bottom-quote">
                  Get Budgetary Estimate <ArrowRight size={14} />
                </Link>
                <a href={`https://wa.me/971559954274?text=${encodeURIComponent(page.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-detail-bottom-wa">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559954274" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="dea-detail-bottom-call">
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Tools */}
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">SPECIFIER TOOLS</h3>
              <div className="space-y-2">
                <Link to="/calculator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  <Calculator size={14} className="text-[var(--blx-gold-3)]" />
                  <div>
                    <div className="text-xs font-bold tracking-wider">Screen Calculator</div>
                    <div className="text-[0.5rem] text-[var(--blx-muted)]">Size, resolution & pixel pitch</div>
                  </div>
                </Link>
                <Link to="/budget-estimator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  <DollarSign size={14} className="text-[var(--blx-gold-3)]" />
                  <div>
                    <div className="text-xs font-bold tracking-wider">Budget Estimator</div>
                    <div className="text-[0.5rem] text-[var(--blx-muted)]">Project cost by size & pitch</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Design Assist CTA */}
            <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.06) 0%, rgba(183,142,58,0.03) 100%)', border: '1px solid rgba(229,197,116,0.12)' }}>
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-2">FREE DESIGN ASSIST</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed mb-4">
                Our engineers help you specify the right LED technology for your project — from concept to BOQ.
              </p>
              <Link to="/design-assist" className="btn-gold w-full py-2.5 text-[0.625rem] font-bold tracking-[0.12em] flex items-center justify-center gap-2">
                Request Design Assist <ArrowRight size={12} />
              </Link>
            </div>

            {/* Other DEA Pages */}
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">EXPLORE MORE</h3>
              <div className="space-y-1">
                {otherPages.map(p => (
                  <Link
                    key={p.id}
                    to={`/digital-experience/${p.id}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors"
                  >
                    <p.icon size={14} className="text-[var(--blx-gold-3)] flex-shrink-0" />
                    {p.title}
                  </Link>
                ))}
                <Link
                  to="/digital-experience-architecture"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-gold-3)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                >
                  <ArrowRight size={14} /> All Digital Experiences
                </Link>
              </div>
            </div>

            {/* Related Technologies */}
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED TECHNOLOGIES</h3>
              <div className="space-y-1">
                {page.relatedTechs.map(techId => (
                  <Link
                    key={techId}
                    to={`/technology/${techId}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors"
                  >
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {techId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <QuickInquiry context={`${page.title} LED solutions`} />
    </div>
  );
}
