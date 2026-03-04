import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Droplets, Wrench } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "What IP rating is needed for semi-outdoor canopies in UAE?", a: "Minimum IP54 for semi-outdoor under canopies. This protects against fine Gulf sand/dust ingress and splashing rain. If the display faces open weather or is near a water feature, upgrade to IP65. Always specify front and rear IP ratings separately." },
  { q: "What does IP65 mean for an LED display?", a: "IP65 means complete dust-tight protection (6) and protection against water jets from any direction (5). This is the standard minimum for permanent outdoor LED installations in the UAE. It handles rain, dust storms, and cleaning with pressure washers." },
  { q: "Do I need front-service or rear-service access?", a: "Front-service if the display is wall-mounted with no rear access corridor (most common in UAE high-rise and flush-mount installations). Rear-service if there's a 600mm+ service void behind the display. Front-service panels cost more but save on structural requirements." },
  { q: "Is IP20 sufficient for indoor LED walls?", a: "IP20 is fine for controlled indoor environments (offices, boardrooms, meeting rooms). For public indoor spaces (mall, lobby, restaurant), IP30+ is recommended to protect against accidental contact. Near kitchens/bars or humid areas, specify IP43+." },
  { q: "What about salt air corrosion near the coast?", a: "Coastal installations in UAE (JBR, Palm Jumeirah, Saadiyat Island, etc.) face salt-air corrosion. Specify marine-grade connectors, conformal coating on PCBs, and IP65 minimum all-round. Consider stainless steel or marine-grade aluminium for the cabinet structure." },
  { q: "How wide should a rear service corridor be?", a: "Minimum 600mm for a technician to work comfortably. Ideal is 800mm-1000mm. Account for module depth when removed (typically 100-300mm). Ensure the corridor has adequate lighting, power outlets, and ventilation." },
];

export default function IpRatingGuide() {
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <div className="pb-20" data-testid="knowledge-ip-rating">
      <SEO
        title="IP Rating & Serviceability Guide — LED Displays"
        description="Understanding IP protection ratings and front vs rear service access for LED displays. UAE-specific guidance for dust, heat, salt air, and maintenance requirements."
        path="/knowledge/ip-rating-guide"
        jsonLd={[faqJsonLd]}
      />
      <KnowledgeHero title="IP Rating &amp; Serviceability" subtitle="Correct protection rating prevents costly failures. Front vs rear service access determines installation feasibility and ongoing maintenance costs." breadcrumb="IP Rating" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <SpecifierAnswerBox
              title="IP Rating Quick Reference"
              items={[
                "IP format: IPXY — X = solids protection (0-6), Y = liquids protection (0-9)",
                "Indoor (controlled): IP20-IP30 sufficient",
                "Indoor (public/F&B): IP30-IP43 recommended",
                "Semi-outdoor canopy (UAE): IP54 minimum front",
                "Full outdoor (UAE): IP65 front, IP54 rear minimum",
                "Coastal areas: IP65 all-round + marine-grade connectors",
                "Always specify front AND rear IP ratings separately",
              ]}
              recommendation="All outdoor, semi-outdoor, and high-humidity installations in UAE/GCC"
            />

            <h2 className="text-lg font-bold tracking-wider mb-6">IP Rating Explained</h2>
            <div className="glass-panel p-6 mb-8">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                IP (Ingress Protection) ratings follow the format IPXY. The first digit (X) rates protection against solid particles, and the second digit (Y) rates protection against liquids.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-3">FIRST DIGIT — SOLIDS</h4>
                  {[
                    ['0', 'No protection'],
                    ['1', 'Objects > 50mm'],
                    ['2', 'Fingers > 12.5mm'],
                    ['3', 'Tools > 2.5mm'],
                    ['4', 'Wires > 1mm'],
                    ['5', 'Dust-protected'],
                    ['6', 'Dust-tight (complete)'],
                  ].map(([val, desc]) => (
                    <div key={val} className="flex items-center gap-3 py-1.5 border-b border-[var(--blx-hairline)] last:border-0">
                      <span className="text-sm font-bold text-[var(--blx-gold-3)] w-6">{val}</span>
                      <span className="text-xs text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{desc}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-[0.15em] text-[var(--blx-gold-3)] mb-3">SECOND DIGIT — LIQUIDS</h4>
                  {[
                    ['0', 'No protection'],
                    ['1', 'Vertical drips'],
                    ['3', 'Spraying water (60 deg)'],
                    ['4', 'Splashing water'],
                    ['5', 'Water jets'],
                    ['6', 'Powerful water jets'],
                    ['7', 'Temporary immersion'],
                    ['8', 'Prolonged immersion'],
                  ].map(([val, desc]) => (
                    <div key={val} className="flex items-center gap-3 py-1.5 border-b border-[var(--blx-hairline)] last:border-0">
                      <span className="text-sm font-bold text-[var(--blx-gold-3)] w-6">{val}</span>
                      <span className="text-xs text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">IP Rating by Application (UAE/GCC)</h2>
            <ComparisonTable
              headers={['Application', 'Min Front IP', 'Min Rear IP', 'Notes']}
              rows={[
                ['Indoor (A/C room)', 'IP20', 'IP20', 'Standard indoor panels'],
                ['Indoor (lobby/atrium)', 'IP30', 'IP20', 'Public area, splash risk'],
                ['Indoor (F&B / kitchen)', 'IP43', 'IP20', 'Steam, grease, cleaning'],
                ['Semi-outdoor (canopy)', 'IP54', 'IP43', 'Dubai dust + rain'],
                ['Outdoor (permanent)', 'IP65', 'IP54', 'Full weather exposure'],
                ['Outdoor (coastal UAE)', 'IP65', 'IP65', 'Salt air corrosion risk'],
                ['Outdoor (ground level)', 'IP65', 'IP54', 'Cleaning water exposure'],
                ['Pool / water feature', 'IP67', 'IP65', 'Splash zone proximity'],
              ]}
              caption="IP RATING SPECIFICATION BY APPLICATION"
            />

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">Front vs Rear Service Access</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl p-5" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench size={16} className="text-[var(--blx-gold-3)]" />
                  <h3 className="text-xs font-bold tracking-[0.15em]">Front Service</h3>
                </div>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] mb-3 leading-relaxed" style={{ textTransform: 'none' }}>Modules are removed and replaced from the viewing side.</p>
                <ul className="space-y-1.5">
                  {['Flush wall-mounted (no rear corridor)', 'High-rise facade installation', 'Ceiling-hung over public areas', 'Architectural integration (sealed void)', 'Most common in UAE high-rise buildings'].map((item, i) => (
                    <li key={i} className="text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-5" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="text-[var(--blx-gold-3)]" />
                  <h3 className="text-xs font-bold tracking-[0.15em]">Rear Service</h3>
                </div>
                <p className="text-[0.6875rem] text-[var(--blx-text-2)] mb-3 leading-relaxed" style={{ textTransform: 'none' }}>Modules are accessed from behind the display.</p>
                <ul className="space-y-1.5">
                  {['Service corridor available (min 600mm deep)', 'Stadium perimeter boards', 'Free-standing or double-sided totems', 'Lower cost panels', 'Requires structural depth planning'].map((item, i) => (
                    <li key={i} className="text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <SectionDivider />
            <FAQSection faqs={FAQS} />

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">Get IP Rating Advice <ArrowRight size={14} /></Link>
              <a href={`https://wa.me/971559910711?text=${encodeURIComponent("Hi, I need help specifying IP ratings for an LED installation. Can you advise?")}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]">WhatsApp a Specialist</a>
            </div>
          </div>

          <aside className="space-y-6">
            <SpecPackCTA packId="ip-rating" title="IP Rating & Serviceability Pack" description="Complete IP rating guide with UAE-specific recommendations, front vs rear service comparison, and environmental protection specifications." />
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-2">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/refresh-rate-guide', label: 'Refresh Rate Guide' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
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
