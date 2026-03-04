import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Thermometer, Wind, Droplets } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "How many nits for outdoor LED in Dubai sun?", a: "Dubai direct sunlight regularly exceeds 100,000 lux. For full outdoor installations, specify minimum 5,500 nits with 7,000-10,000 nits recommended. For south and west-facing displays, add 30% extra. Always request brightness specification at 40C ambient temperature, not lab conditions at 25C." },
  { q: "How bright should an indoor lobby LED wall be?", a: "For a hotel or corporate lobby, 800-1,500 nits is typically sufficient. If the lobby has large glass facades letting in direct sunlight, increase to 2,000-3,500 nits. If the space has controlled lighting (no natural light), 600-800 nits provides optimal image quality with lower power consumption." },
  { q: "Does brightness decrease in heat?", a: "Yes. LED brightness degrades at high temperatures. In the GCC where ambient can reach 50C, specify 20-30% higher brightness than the minimum requirement to compensate for thermal derating. Always ask vendors for brightness specs at operating temperature, not standard 25C lab conditions." },
  { q: "What's the difference between nits and lumens?", a: "Nits (cd/m2) measure luminance — brightness per unit area as perceived by the viewer. Lumens measure total light output. For LED displays, nits is the correct specification. A 5,000-nit display is roughly 10x brighter than a typical laptop screen (500 nits)." },
  { q: "Should I use auto-brightness for outdoor displays?", a: "Yes, always. Auto-brightness sensors save 30-50% energy by dimming at night and in cloudy weather, while ensuring maximum brightness in direct sunlight. This also extends LED lifespan significantly. Budget for ambient light sensors in every outdoor specification." },
  { q: "Do I need higher brightness for a north-facing outdoor display?", a: "North-facing displays in the Northern Hemisphere (including UAE) receive significantly less direct sunlight. You can typically specify 20-30% lower brightness than south/west-facing, saving considerable cost. A north-facing billboard can work well at 5,000-6,000 nits vs 8,000+ for south-facing." },
];

export default function BrightnessNitsGuide() {
  const faqJsonLd = buildFaqJsonLd(FAQS);
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "TechArticle",
    "headline": "LED Display Brightness & Nits Guide for UAE & GCC",
    "description": "How to specify LED display brightness for indoor, semi-outdoor, and full outdoor installations in Dubai and the Gulf region's extreme light and heat conditions.",
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "datePublished": "2026-01-15", "dateModified": "2026-03-01",
  };

  return (
    <div className="pb-20" data-testid="knowledge-brightness-nits">
      <SEO
        title="Brightness & Nits Guide — LED Displays for UAE & GCC"
        description="How to specify LED display brightness for Dubai and Gulf environments. Indoor, semi-outdoor, and outdoor nits recommendations with heat derating, solar orientation, and HVAC impact guidance."
        path="/knowledge/brightness-nits-guide"
        jsonLd={[faqJsonLd, articleJsonLd]}
      />
      <KnowledgeHero title="Brightness &amp; Nits Guide" subtitle="Correctly specifying brightness is critical in the GCC. Too low and content is invisible in sunlight. Too high and you waste energy, generate excess heat, and reduce lifespan." breadcrumb="Brightness & Nits" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <SpecifierAnswerBox
              title="Brightness Quick Reference (UAE/GCC)"
              items={[
                "Indoor (controlled lighting): 600-1,200 nits",
                "Indoor (glass facade/skylight): 2,000-3,500 nits",
                "Semi-outdoor (under canopy): 3,000-5,000 nits",
                "Full outdoor (direct UAE sun): 5,500-10,000 nits",
                "Always specify brightness at operating temperature (40C+), not lab 25C",
                "Add 30% for west/south-facing outdoor displays in Gulf region",
                "Auto-brightness sensors save 30-50% energy — always include",
              ]}
              recommendation="All outdoor and semi-outdoor LED projects in UAE, Saudi Arabia, Qatar, and GCC"
            />

            <h2 className="text-lg font-bold tracking-wider mb-4">Understanding Nits (cd/m2)</h2>
            <div className="glass-panel p-6 mb-8">
              <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                A "nit" (candela per square metre) measures luminance — how bright a display appears to the human eye. In the GCC, extreme ambient light demands significantly higher brightness than temperate climates.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: '500', label: 'Laptop screen', icon: '💻' },
                  { value: '1,200', label: 'Indoor LED wall', icon: '🏢' },
                  { value: '5,000', label: 'Semi-outdoor', icon: '⛱' },
                  { value: '10,000', label: 'Dubai outdoor', icon: '☀' },
                ].map(item => (
                  <div key={item.label} className="text-center py-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="text-lg font-bold text-[var(--blx-gold-3)]">{item.value}</div>
                    <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider" style={{ textTransform: 'none' }}>{item.label} (nits)</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">Brightness by Environment (GCC Specific)</h2>
            <ComparisonTable
              headers={['Environment', 'Ambient Light', 'Min Nits', 'Recommended', 'Notes']}
              rows={[
                ['Dark room / cinema', '< 50 lux', '200', '400-600', 'Lower = better contrast'],
                ['Office / conference', '300-500 lux', '400', '600-800', 'Anti-glare coating helps'],
                ['Retail (indoor)', '500-1,000 lux', '800', '1,000-1,500', 'Bright retail lighting'],
                ['Mall atrium', '1,000-2,000 lux', '1,200', '1,500-2,500', 'Skylights add ambient'],
                ['Lobby (glass facade)', '2,000-5,000 lux', '2,000', '2,500-3,500', 'Direct sun through glass'],
                ['Semi-outdoor canopy', '5K-20K lux', '3,000', '4,000-5,000', 'Shaded but open air'],
                ['Outdoor (shaded)', '10K-30K lux', '4,000', '5,000-6,000', 'Under overhang'],
                ['Full outdoor Dubai', '60K-120K lux', '5,500', '7,000-10,000', 'Direct Gulf sun'],
              ]}
              caption="BRIGHTNESS SPECIFICATION TABLE"
            />

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">GCC Climate Factors</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Thermometer, title: 'Heat Impact', color: 'rgba(239,68,68,0.08)', items: ['LED brightness degrades at high temperatures', 'Specify 20-30% higher to account for thermal derating', 'Request brightness at 40C ambient, not 25C lab', 'Operating range: -10C to +55C minimum'] },
                { icon: Wind, title: 'Sand & Dust', color: 'rgba(245,158,11,0.08)', items: ['Fine sand blocks airflow and coats surfaces', 'IP54+ minimum for semi-outdoor', 'COB technology is inherently better in dust', 'Include maintenance schedule in specification'] },
                { icon: Sun, title: 'Solar Orientation', color: 'rgba(229,197,116,0.08)', items: ['West/south-facing: add 30% to brightness spec', 'North-facing: can reduce 20-30% (cost saving)', 'Auto-brightness sensors essential for all outdoor', 'Sunrise/sunset glare angles need consideration'] },
                { icon: Droplets, title: 'Humidity & Salt', color: 'rgba(59,130,246,0.08)', items: ['Coastal areas: marine-grade connectors required', 'Humidity causes condensation on cold glass', 'Anti-condensation heating for transparent LED', 'IP65+ for any coastal outdoor installation'] },
              ].map(card => (
                <div key={card.title} className="rounded-xl p-5" style={{ background: card.color, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <card.icon size={16} className="text-[var(--blx-gold-3)]" />
                    <h3 className="text-xs font-bold tracking-[0.15em]">{card.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((item, i) => (
                      <li key={i} className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>- {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <SectionDivider />

            <h2 className="text-lg font-bold tracking-wider mb-6">Power &amp; Heat Considerations</h2>
            <ComparisonTable
              headers={['Brightness', 'Typical Power', 'Heat Output', 'HVAC Impact']}
              rows={[
                ['600-1,200 nits', '200-400 W/sqm', '~300 BTU/sqm/hr', 'Minimal'],
                ['1,200-2,500 nits', '400-600 W/sqm', '~500 BTU/sqm/hr', 'Moderate'],
                ['2,500-5,000 nits', '600-900 W/sqm', '~800 BTU/sqm/hr', 'Significant'],
                ['5,000-10,000 nits', '900-1,500 W/sqm', '~1,200 BTU/sqm/hr', 'Major planning'],
              ]}
              caption="POWER & THERMAL IMPACT BY BRIGHTNESS"
            />

            <SectionDivider />
            <FAQSection faqs={FAQS} />

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="kb-contact-cta">
                Get Brightness Recommendation <ArrowRight size={14} />
              </Link>
              <a href={`https://wa.me/971559954274?text=${encodeURIComponent("Hi, I need help specifying LED brightness for an outdoor project in Dubai. Can you advise?")}`} target="_blank" rel="noopener noreferrer" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]" data-testid="kb-whatsapp-cta">
                WhatsApp a Specialist
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            <SpecPackCTA packId="brightness-nits" title="Brightness & Nits Spec Pack" description="Complete brightness specification guide for GCC environments. Includes environment tables, thermal derating calculations, and solar orientation guidance." />
            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-2">
                {[
                  { to: '/knowledge/cob-vs-mip-vs-smd', label: 'COB vs MiP vs SMD' },
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/ip-rating-guide', label: 'IP Rating Guide' },
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
