import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Monitor, Eye } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "What pixel pitch do I need for a 3 metre viewing distance?", a: "At 3m, the minimum pixel pitch is P2.0 (3m / 1.5 = 2.0mm). For comfortable viewing with mixed content, P1.5 is ideal. For text-heavy content like dashboards, go tighter to P1.2. For pure video content, P2.5 is acceptable." },
  { q: "How do I calculate the resolution of my LED wall?", a: "Divide the screen dimension in millimetres by the pixel pitch. Example: a 4m wide wall at P1.5 = 4000mm / 1.5mm = 2,667 pixels wide. A 2.25m tall wall = 2250mm / 1.5mm = 1,500 pixels tall. Total: 2667 x 1500 (approximately 4K)." },
  { q: "Is a smaller pixel pitch always better?", a: "No. Over-specifying pixel pitch wastes budget without visible benefit. If your audience views from 10m, a P1.2 wall looks identical to P4 — but costs 4-5x more. Always match pitch to actual viewing distance." },
  { q: "What pixel pitch for a hotel lobby video wall?", a: "Hotel lobbies typically have viewing distances of 3-8m. P1.5-P2.5 is the sweet spot. For luxury properties where the display is a design centrepiece viewed closely, P1.2-P1.5 with COB or MiP technology for superior contrast." },
  { q: "What pixel pitch for an outdoor billboard in Dubai?", a: "Highway billboards viewed from 20-80m: P6-P10. Street-level signage viewed from 5-20m: P3.9-P6. The key factor is viewing distance, not the 'outdoor' label. All outdoor displays need IP65+ and 5,500+ nits regardless of pitch." },
  { q: "How does pixel pitch affect cost?", a: "Cost increases exponentially as pitch decreases. P0.7 costs roughly $12,000-20,000/sqm while P4 costs $600-1,500/sqm. The relationship is approximately: halving the pitch quadruples the cost, because you need 4x the LEDs per square metre." },
];

export default function PixelPitchGuide() {
  const faqJsonLd = buildFaqJsonLd(FAQS);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Pixel Pitch Guide: LED Display Resolution & Viewing Distance",
    "description": "How to specify the correct pixel pitch for LED displays based on viewing distance, content type, and application. Includes calculator, comparison tables, and cost analysis.",
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx" },
    "datePublished": "2026-01-15",
    "dateModified": "2026-03-01",
  };

  return (
    <div className="pb-20" data-testid="knowledge-pixel-pitch">
      <SEO
        title="Pixel Pitch Guide — LED Display Resolution & Viewing Distance"
        description="How to specify the correct pixel pitch for LED displays. Viewing distance formulas, application tables, resolution calculator, and cost analysis for architects and AV consultants."
        path="/knowledge/pixel-pitch-guide"
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <KnowledgeHero
        title="Pixel Pitch Guide"
        subtitle="The single most important specification for LED displays. Get it right and you save budget while delivering perfect image quality. Get it wrong and you either overspend or get visible pixelation."
        breadcrumb="Pixel Pitch"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <SpecifierAnswerBox
              title="Pixel Pitch Quick Reference"
              items={[
                "Minimum viewing distance (m) = Pixel Pitch (mm) x 1.5",
                "Comfortable viewing distance (m) = Pixel Pitch (mm) x 2.5",
                "Resolution = Screen dimension (mm) / Pixel pitch (mm)",
                "Halving the pixel pitch quadruples the cost (4x LEDs per sqm)",
                "For text/data: use minimum distance formula. For video: use comfortable distance.",
                "Most common error: over-specifying pitch (wasting budget on invisible resolution)",
              ]}
              recommendation="All LED display projects — this is the starting point for every specification"
            />

            {/* What is Pixel Pitch */}
            <h2 className="text-lg font-bold tracking-wider mb-4">What is Pixel Pitch?</h2>
            <div className="glass-panel p-6 mb-8">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4">
                Pixel pitch is the distance (in millimetres) between the centre of one LED pixel and the centre of the adjacent pixel. It determines three critical factors:
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Eye, label: 'Viewing Distance', desc: 'Smaller pitch = closer viewing' },
                  { icon: Monitor, label: 'Resolution', desc: 'Smaller pitch = more pixels' },
                  { icon: Ruler, label: 'Cost', desc: 'Smaller pitch = higher cost' },
                ].map(item => (
                  <div key={item.label} className="text-center py-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <item.icon size={20} className="text-[var(--blx-gold-3)] mx-auto mb-2" />
                    <div className="text-xs font-bold tracking-wider">{item.label}</div>
                    <div className="text-[0.625rem] text-[var(--blx-muted)] mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionDivider />

            {/* Formulas */}
            <h2 className="text-lg font-bold tracking-wider mb-4">The Viewing Distance Formula</h2>
            <div className="glass-panel p-6 mb-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ background: 'rgba(229,197,116,0.06)', border: '1px solid rgba(229,197,116,0.12)' }}>
                  <div className="text-xs text-[var(--blx-muted)] tracking-wider mb-1">MINIMUM VIEWING DISTANCE</div>
                  <div className="text-lg font-bold">Distance (m) = Pixel Pitch (mm) <span className="text-[var(--blx-gold-3)]">x 1.5</span></div>
                </div>
                <div className="p-4 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
                  <div className="text-xs text-[var(--blx-muted)] tracking-wider mb-1">COMFORTABLE VIEWING DISTANCE</div>
                  <div className="text-lg font-bold">Distance (m) = Pixel Pitch (mm) <span className="text-emerald-400">x 2.5</span></div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 mb-8">
              <h3 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-3">EXAMPLE CALCULATION</h3>
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed">
                <strong>Project:</strong> 4m wide x 2.25m tall lobby wall at P1.5<br />
                <strong>Horizontal pixels:</strong> 4000mm / 1.5mm = 2,667 pixels<br />
                <strong>Vertical pixels:</strong> 2250mm / 1.5mm = 1,500 pixels<br />
                <strong>Resolution:</strong> 2667 x 1500 (approximately 4K)<br />
                <strong>Min viewing distance:</strong> 1.5mm x 1.5 = 2.25m
              </p>
            </div>

            <SectionDivider />

            {/* Application Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Pixel Pitch by Application</h2>
            <ComparisonTable
              headers={['Application', 'Typical Distance', 'Pitch Range', 'Technology']}
              rows={[
                ['Control / Command Room', '1-3m', 'P0.7 - P1.2', 'COB / MiP'],
                ['Executive Boardroom', '2-4m', 'P0.9 - P1.5', 'COB / MiP'],
                ['Retail Close-up Display', '1-3m', 'P0.9 - P1.5', 'MiP / COB'],
                ['Hotel / Corporate Lobby', '3-8m', 'P1.5 - P2.5', 'MiP / SMD'],
                ['Conference / Ballroom', '5-12m', 'P2.5 - P3.9', 'SMD / MiP'],
                ['Mall Atrium Signage', '5-15m', 'P2.5 - P4', 'SMD'],
                ['Outdoor Street Level', '5-20m', 'P3.9 - P6', 'SMD (outdoor)'],
                ['Highway Billboard', '20-80m', 'P6 - P10', 'SMD (outdoor)'],
                ['Stadium Perimeter', '30-100m', 'P8 - P16', 'SMD (outdoor)'],
              ]}
              caption="RECOMMENDED PIXEL PITCH BY APPLICATION"
            />

            <SectionDivider />

            {/* Cost */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Cost vs Pixel Pitch</h2>
            <ComparisonTable
              headers={['Pixel Pitch', 'Cost/sqm (USD)', 'LEDs per sqm', 'Typical Tech']}
              rows={[
                ['P0.7', '$12,000 - $20,000', '2,040,816', 'COB / MiP'],
                ['P0.9', '$8,000 - $14,000', '1,234,568', 'COB / MiP'],
                ['P1.2', '$4,000 - $8,000', '694,444', 'COB / MiP / SMD'],
                ['P1.5', '$2,500 - $5,000', '444,444', 'MiP / SMD'],
                ['P2.5', '$1,200 - $2,500', '160,000', 'SMD'],
                ['P3.9', '$800 - $1,800', '65,746', 'SMD'],
                ['P6', '$600 - $1,200', '27,778', 'SMD (outdoor)'],
                ['P10', '$400 - $900', '10,000', 'SMD (outdoor)'],
              ]}
              caption="2026 MARKET PRICING (APPROXIMATE)"
            />

            <SectionDivider />

            <FAQSection faqs={FAQS} />

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/calculator" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="kb-calculator-cta">
                Try Our Screen Calculator <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent("Hi, I need help determining the right pixel pitch for my project. Can you assist?")}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]"
                data-testid="kb-whatsapp-cta"
              >
                WhatsApp a Specialist
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            <SpecPackCTA
              packId="pixel-pitch"
              title="Pixel Pitch Specification Pack"
              description="Complete pixel pitch reference PDF with viewing distance tables, resolution calculator, cost analysis, and application-specific recommendations."
            />
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-2">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/ip-rating-guide', label: 'IP Rating Guide' },
                  { to: '/knowledge/refresh-rate-guide', label: 'Refresh Rate Guide' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors">
                    <ArrowRight size={12} className="text-[var(--blx-gold-3)]" /> {link.label}
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
