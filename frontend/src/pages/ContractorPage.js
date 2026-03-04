import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, Phone, Upload } from 'lucide-react';
import SEO from '../components/SEO';
import { SpecifierAnswerBox, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';
import { CONTRACTOR_SEO_PAGES, COST_PER_SQM_GUIDE, COST_BREAKDOWN } from '../data/contractors';

function DvledVsLcd({ page }) {
  return (
    <>
      {/* Comparison Table */}
      <h2 className="text-lg font-bold tracking-wider mb-6">Head-to-Head Comparison</h2>
      <div className="glass-panel overflow-hidden mb-10" data-testid="contractor-comparison-table">
        <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">dvLED vs LCD VIDEO WALL</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-hairline)]">
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">SPECIFICATION</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-gold-3)] py-3 px-5 text-center">dvLED</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">LCD</th>
              </tr>
            </thead>
            <tbody>
              {page.comparison.map((row, i) => (
                <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                  <td className="py-3 px-5 text-xs font-medium">{row.spec}</td>
                  <td className="py-3 px-5 text-xs text-center text-[var(--blx-gold-3)]" style={{ textTransform: 'none' }}>{row.dvled}</td>
                  <td className="py-3 px-5 text-xs text-center text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{row.lcd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SectionDivider />

      {/* TCO Analysis */}
      <h2 className="text-lg font-bold tracking-wider mb-6">5-Year Total Cost of Ownership</h2>
      <div className="glass-panel p-6 mb-10" data-testid="contractor-tco">
        <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-4">{page.tcoAnalysis.scenario}</div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {[
            { label: 'dvLED', data: page.tcoAnalysis.dvled, accent: true },
            { label: 'LCD', data: page.tcoAnalysis.lcd, accent: false },
          ].map((col) => (
            <div key={col.label} className="p-4 rounded-xl" style={{ background: col.accent ? 'rgba(229,197,116,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${col.accent ? 'rgba(229,197,116,0.15)' : 'var(--blx-border)'}` }}>
              <div className={`text-sm font-bold mb-3 ${col.accent ? 'text-[var(--blx-gold-3)]' : ''}`}>{col.label}</div>
              <div className="space-y-2 text-[0.6875rem]" style={{ textTransform: 'none' }}>
                <div className="flex justify-between"><span className="text-[var(--blx-muted)]">Hardware</span><span>${col.data.hardware.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--blx-muted)]">Installation</span><span>${col.data.install.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--blx-muted)]">Power (5yr)</span><span>${col.data.power5yr.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--blx-muted)]">Maintenance (5yr)</span><span>${col.data.maintenance5yr.toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-[var(--blx-hairline)] pt-2 font-bold">
                  <span>5-Year TCO</span>
                  <span className={col.accent ? 'text-[var(--blx-gold-3)]' : ''}>${col.data.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[0.625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{page.tcoAnalysis.note}</p>
      </div>
    </>
  );
}

function CostGuide() {
  return (
    <>
      <h2 className="text-lg font-bold tracking-wider mb-6">Hardware Cost by Pixel Pitch</h2>
      <div className="glass-panel overflow-hidden mb-10" data-testid="contractor-cost-table">
        <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">UAE MARKET PRICING — 2026</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-hairline)]">
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">PIXEL PITCH</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">TECHNOLOGY</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">PRICE / SQM</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">APPLICATION</th>
              </tr>
            </thead>
            <tbody>
              {COST_PER_SQM_GUIDE.map((row, i) => (
                <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                  <td className="py-3 px-5 text-xs font-bold text-[var(--blx-gold-3)]">{row.pitch}</td>
                  <td className="py-3 px-5 text-xs" style={{ textTransform: 'none' }}>{row.tech}</td>
                  <td className="py-3 px-5 text-xs text-center font-bold">{row.range}</td>
                  <td className="py-3 px-5 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--blx-hairline)]">
          <p className="text-[0.625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>
            Hardware costs only. Multiply by 1.3-1.4x for total installed project cost. Prices vary by brand, quantity, and project timeline.
          </p>
        </div>
      </div>

      <SectionDivider />

      <h2 className="text-lg font-bold tracking-wider mb-6">Project Cost Breakdown</h2>
      <div className="glass-panel overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-hairline)]">
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">ITEM</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">% OF BUDGET</th>
                <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">INCLUDES</th>
              </tr>
            </thead>
            <tbody>
              {COST_BREAKDOWN.map((row, i) => (
                <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                  <td className="py-3 px-5 text-xs font-medium">{row.item}</td>
                  <td className="py-3 px-5 text-xs text-center font-bold text-[var(--blx-gold-3)]">{row.pct}</td>
                  <td className="py-3 px-5 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function InstallationGuide({ page }) {
  return (
    <>
      {page.checklist.map((phase, pi) => (
        <div key={pi} className="mb-8">
          <h2 className="text-lg font-bold tracking-wider mb-4">{phase.phase}</h2>
          <div className="glass-panel p-5" data-testid={`contractor-checklist-${pi}`}>
            <div className="space-y-2.5">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function ContractorPage() {
  const { pageId } = useParams();
  const page = CONTRACTOR_SEO_PAGES.find(p => p.id === pageId);

  if (!page) return <Navigate to="/value-engineering" replace />;

  const faqJsonLd = buildFaqJsonLd(page.faqs);

  return (
    <div className="pb-20" data-testid={`contractor-page-${page.id}`}>
      <SEO
        title={`${page.title} — Brightluxx`}
        description={page.heroDescription}
        path={`/contractors/${page.id}`}
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-20 pb-12">
        <div className="absolute inset-0 blx-led-grid opacity-30" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/value-engineering" className="hover:text-[var(--blx-text-2)] transition-colors">Value Engineering</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">{page.shortTitle}</span>
          </div>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">{page.heroTagline}</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider leading-tight mb-4">{page.title}</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed" style={{ textTransform: 'none' }}>{page.heroDescription}</p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            {page.id === 'dvled-vs-lcd' && <DvledVsLcd page={page} />}
            {page.id === 'led-cost-per-sqm' && <CostGuide />}
            {page.id === 'led-installation-guide' && <InstallationGuide page={page} />}

            <SectionDivider />
            <FAQSection faqs={page.faqs} title="Common Questions" />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Need a Quote or Substitution Support?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Upload your tender specification and we'll provide equivalent alternatives with cost analysis — free of charge.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/spec-substitution" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Upload size={14} /> Submit Specification <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/971559910711" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="corporate-control"
              title="LED BOQ Template"
              description="Complete BOQ template for LED display tenders. All line items pre-filled: hardware, processing, structure, cabling, installation, CMS, and spares."
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">CONTRACTOR RESOURCES</h3>
              <div className="space-y-1">
                {[
                  { to: '/value-engineering', label: 'Value Engineering Hub' },
                  { to: '/contractors/dvled-vs-lcd', label: 'dvLED vs LCD Comparison' },
                  { to: '/contractors/led-cost-per-sqm', label: 'LED Cost per sqm Guide' },
                  { to: '/contractors/led-installation-guide', label: 'Installation Guide UAE' },
                  { to: '/spec-substitution', label: 'Spec Substitution Service' },
                  { to: '/calculator', label: 'Screen Calculator' },
                ].filter(l => l.to !== `/contractors/${page.id}`).map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
