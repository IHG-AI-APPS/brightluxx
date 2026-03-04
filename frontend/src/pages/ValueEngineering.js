import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, DollarSign, Wrench, Clock, Building, FileText, Upload, MessageCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../components/KnowledgeBase';
import { VALUE_ENGINEERING_TABLE, COST_BREAKDOWN, COST_PER_SQM_GUIDE, CONTRACTOR_FAQS } from '../data/contractors';

export default function ValueEngineering() {
  const faqJsonLd = buildFaqJsonLd(CONTRACTOR_FAQS);

  return (
    <div className="pb-20" data-testid="value-engineering-page">
      <SEO
        title="LED Display Value Engineering — Cost Control for UAE Contractors"
        description="Value engineering guide for LED display contractors in UAE. Approved alternatives, cost per sqm guide, BOQ templates, and specification substitution support. Reduce costs without compromising quality."
        path="/value-engineering"
        jsonLd={[faqJsonLd]}
      />

      {/* Hero */}
      <div className="relative pt-20 pb-16" data-testid="ve-hero">
        <div className="absolute inset-0 blx-led-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-[0.625rem] text-[var(--blx-muted)] tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-[var(--blx-text-2)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--blx-gold-3)]">Value Engineering</span>
          </div>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FOR CONTRACTORS & PROCUREMENT</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Value Engineering<br/>LED Displays</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed mb-8" style={{ textTransform: 'none' }}>
            Reduce LED display costs by 20-40% without compromising on specification. Approved alternatives, cost breakdowns, BOQ templates, and free specification substitution support for UAE/GCC contractors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/spec-substitution" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="ve-hero-substitution-cta">
              Free Spec Substitution <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/971559910711?text=Hi%2C%20I%20have%20a%20tender%20with%20LED%20displays%20specified.%20Can%20you%20provide%20value%20engineering%20alternatives%3F" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="ve-hero-whatsapp-cta">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            <SpecifierAnswerBox
              title="Value Engineering LED Displays — Quick Reference"
              items={[
                'MiP achieves 85-90% of COB quality at 30-40% lower cost — most consultants accept this substitution',
                'dvLED All-in-One systems are 10-20% cheaper than traditional LCD video walls with better 5-year TCO',
                'Stepping up one pitch size (e.g. P1.2 → P1.5) saves 25-35% with negligible quality impact at typical viewing distances',
                'Standard cabinet formats save 20-30% over custom curved or shaped installations',
                'Always submit a specification comparison sheet showing equal or better performance vs. the original spec',
                'Budget rule: multiply hardware cost by 1.3-1.4x for total installed project cost in UAE',
              ]}
              recommendation="Fit-out contractors, MEP contractors, AV integrators, and procurement managers evaluating LED display tenders in GCC"
            />

            {/* Why contractors choose us */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Why Contractors Choose Brightluxx</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {[
                { icon: DollarSign, title: 'Cost Control', desc: 'Spec-matched alternatives at 20-40% less than tier-1 pricing. Same chips, same drivers, proven performance.' },
                { icon: Shield, title: 'Consultant Approval Support', desc: 'We prepare specification comparison documents to help you get substitution approved by the design consultant.' },
                { icon: Clock, title: 'Local Stock & Fast Delivery', desc: 'Dubai warehouse stock for common pitches. 2-4 week delivery for custom orders. No shipping surprises.' },
                { icon: Wrench, title: 'Installation & Commissioning', desc: 'Engineering support, site surveys, installation assistance, and commissioning. Reduce your subcontractor risk.' },
                { icon: Building, title: 'UAE Project Experience', desc: 'Delivered LED systems across hotels, malls, corporate offices, and outdoor installations throughout UAE and GCC.' },
                { icon: FileText, title: 'Complete Documentation', desc: 'Test reports, compliance certificates, warranty documents, and O&M manuals for project handover.' },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-5" data-testid={`ve-benefit-${i}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                      <item.icon size={16} className="text-[var(--blx-gold-3)]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-[0.12em] mb-1.5">{item.title}</h3>
                      <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Value Engineering Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Common Substitutions</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="ve-substitution-table">
              <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">SPECIFICATION SUBSTITUTION GUIDE</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">SPECIFIED</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">ALTERNATIVE</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">COST SAVING</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">RISK</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">NOTES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VALUE_ENGINEERING_TABLE.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--blx-hairline)] last:border-0">
                        <td className="py-3 px-5 text-xs font-medium" style={{ textTransform: 'none' }}>{row.specified}</td>
                        <td className="py-3 px-5 text-xs text-[var(--blx-gold-3)] font-bold" style={{ textTransform: 'none' }}>{row.alternative}</td>
                        <td className="py-3 px-5 text-xs text-center font-bold text-emerald-400">{row.costImpact}</td>
                        <td className="py-3 px-5 text-xs text-center">
                          <span className={`px-2 py-0.5 rounded text-[0.5rem] font-bold tracking-wider ${row.risk === 'low' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {row.risk.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <SectionDivider />

            {/* Cost per SQM Guide */}
            <h2 className="text-lg font-bold tracking-wider mb-6">LED Display Cost per sqm — UAE 2026</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="ve-cost-table">
              <div className="px-5 pt-5 pb-2 text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)]">HARDWARE COST GUIDE (EXCLUDES INSTALLATION)</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--blx-hairline)]">
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">PIXEL PITCH</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">TECHNOLOGY</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-center">PRICE / SQM</th>
                      <th className="text-[0.625rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] py-3 px-5 text-left">TYPICAL APPLICATION</th>
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
                  Prices are indicative hardware costs for UAE market (2026). Multiply by 1.3-1.4x for total installed project cost including processing, structure, cabling, installation, and CMS.
                </p>
              </div>
            </div>

            <SectionDivider />

            {/* Cost Breakdown */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Typical LED Project Cost Breakdown</h2>
            <div className="glass-panel overflow-hidden mb-10" data-testid="ve-breakdown-table">
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

            <SectionDivider />

            {/* FAQ */}
            <FAQSection faqs={CONTRACTOR_FAQS} title="Contractor FAQ" />

            {/* Bottom CTA */}
            <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
              <h2 className="text-lg font-bold tracking-wider mb-3">Have a Tender with LED Specified?</h2>
              <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6" style={{ textTransform: 'none' }}>
                Upload your BOQ or spec sheet. We'll provide equivalent alternatives with cost savings and consultant-ready comparison documents — free of charge.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/spec-substitution" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="ve-bottom-substitution-cta">
                  <Upload size={14} /> Submit Specification <ArrowRight size={14} />
                </Link>
                <a href="https://wa.me/971559910711?text=Hi%2C%20I%20have%20a%20tender%20with%20LED%20displays.%20Can%20you%20provide%20value%20engineering%20alternatives%3F" target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="ve-bottom-whatsapp-cta">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+971559910711" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="ve-bottom-call-cta">
                  <Phone size={14} /> +971 55 991 0711
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="corporate-control"
              title="Contractor BOQ Template"
              description="Download our LED video wall BOQ template with complete line items: modules, processing, structure, cabling, installation, CMS, and spare parts."
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">CONTRACTOR RESOURCES</h3>
              <div className="space-y-1">
                {[
                  { to: '/contractors/dvled-vs-lcd', label: 'dvLED vs LCD Cost Comparison' },
                  { to: '/contractors/led-cost-per-sqm', label: 'LED Cost per sqm Guide' },
                  { to: '/contractors/led-installation-guide', label: 'Installation Guide UAE' },
                  { to: '/spec-substitution', label: 'Free Spec Substitution' },
                  { to: '/calculator', label: 'Screen Calculator' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={10} className="text-[var(--blx-gold-3)]" /> {link.label}
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
