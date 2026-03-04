import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, Zap, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import { KnowledgeHero, SpecifierAnswerBox, ComparisonTable, FAQSection, buildFaqJsonLd, SpecPackCTA, SectionDivider } from '../../components/KnowledgeBase';

const FAQS = [
  { q: "What pixel pitch should I specify for a 5m viewing distance?", a: "At 5 metres, the minimum pixel pitch is P3.3 (5m / 1.5). For comfortable viewing, P2.0 (5m / 2.5). For most applications at 5m, P2.5 is the sweet spot balancing cost and quality. If content includes fine text, go tighter to P1.5-P2.0." },
  { q: "COB vs MiP vs SMD: which is best for luxury retail?", a: "MiP is the optimal choice for luxury retail. It offers COB-level contrast (8,000-12,000:1) and deep blacks that make product imagery pop, while maintaining single-LED field serviceability for easy maintenance. COB is the premium alternative if budget allows and module-level repair is acceptable." },
  { q: "How many nits for outdoor LED in Dubai sun?", a: "Dubai direct sunlight can reach 100,000+ lux. For outdoor displays, specify minimum 5,500 nits, with 7,000-10,000 nits recommended for south and west-facing installations. Add 20-30% headroom for thermal derating in 45C+ ambient temperatures." },
  { q: "What refresh rate avoids moire on camera?", a: "For phone cameras (the most common scenario in 2026), 3,840Hz eliminates visible banding and moire. For professional broadcast cameras, specify 7,680Hz. COB and MiP panels with smooth surfaces naturally produce less moire than SMD at any refresh rate." },
  { q: "Is COB worth the premium over SMD?", a: "Yes, if image quality matters and the viewing distance is under 3 metres. COB delivers 4x the contrast ratio, 40% power savings, and 2x the lifespan. The higher upfront cost is offset by lower operating costs over 5+ years. For pitches above P2.5, SMD remains the best value." },
  { q: "What IP rating is needed for semi-outdoor canopies in UAE?", a: "Minimum IP54 for semi-outdoor installations under canopies in the UAE. This protects against fine sand/dust ingress and splashing rain. If the display is near a pool, water feature, or receives direct rain, upgrade to IP65." },
  { q: "MiP vs COB: which technology is newer?", a: "MiP is the newest mainstream technology (2024-2026 mass production), while COB has been commercially available since 2020. MiP was developed to combine COB's contrast with SMD's repairability. Both are considered premium/next-gen technologies compared to traditional SMD." },
  { q: "Can I mix technologies in one installation?", a: "Technically possible but not recommended. Colour matching between different LED technologies is difficult, especially as they age differently. If using multiple display areas, each area can use different tech, but a single continuous wall should use one technology throughout." },
];

export default function CobVsMipVsSmd() {
  const faqJsonLd = buildFaqJsonLd(FAQS);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "COB vs MiP vs SMD: LED Display Technology Comparison Guide",
    "description": "Comprehensive comparison of COB, MiP, and SMD LED display technologies for architects and AV specifiers. Includes specification tables, UAE climate guidance, and vendor checklists.",
    "author": { "@type": "Organization", "name": "Brightluxx" },
    "publisher": { "@type": "Organization", "name": "Brightluxx", "url": "https://brightluxx.com" },
    "datePublished": "2026-01-15",
    "dateModified": "2026-03-01",
    "about": "LED Display Technology",
  };

  return (
    <div className="pb-20" data-testid="knowledge-cob-mip-smd">
      <SEO
        title="COB vs MiP vs SMD — LED Technology Comparison Guide"
        description="Comprehensive comparison of COB, MiP, and SMD LED display technologies. Specification tables, viewing distances, UAE climate guidance, and vendor checklists for architects and consultants."
        path="/knowledge/cob-vs-mip-vs-smd"
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      <KnowledgeHero
        title="COB vs MiP vs SMD"
        subtitle="A comprehensive specification guide for architects, consultants, and AV designers. Understand the differences, when to specify each, and what matters in UAE installations."
        breadcrumb="COB vs MiP vs SMD"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Main Content */}
          <div>
            <SpecifierAnswerBox
              title="Quick Specification Reference"
              items={[
                "SMD: Best value for pixel pitch > 1.5mm. Proven, easy single-LED repair. Ideal for outdoor and rental. Contrast 3,000-5,000:1.",
                "COB: Premium choice for sub-1.2mm pitch. Superior 20,000:1 contrast, dust/moisture proof. 40% power savings. Module-level repair only.",
                "MiP: Best of both worlds — COB-level contrast (8,000-12,000:1) with SMD-level field serviceability. Fastest-growing technology in 2025-2026.",
                "For UAE outdoor: SMD with IP65+ and 5,500+ nits minimum. For UAE premium indoor: COB or MiP with 3,840Hz+ refresh.",
                "Cost per sqm at P1.2: SMD $2,500-4,000 | MiP $3,500-6,000 | COB $5,000-8,000.",
              ]}
              recommendation="Retail flagships, corporate boardrooms, hotel lobbies, control rooms, broadcast studios, medical imaging"
            />

            {/* Technology Overview */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Technology Overview</h2>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: Zap, title: 'SMD (Surface Mount Device)', color: 'rgba(59,130,246,0.12)',
                  desc: 'The industry standard for over 15 years. Individual RGB LED chips are packaged and soldered onto a PCB. SMD offers the widest range of pixel pitches, the lowest cost for larger pitches, and the easiest field repair — a single LED can be replaced on-site by a technician.',
                  specs: [
                    { label: 'Contrast', value: '3,000-5,000:1' },
                    { label: 'Min Pitch', value: '0.9mm' },
                    { label: 'Lifespan', value: '50,000-80,000 hrs' },
                    { label: 'Repair', value: 'Single LED' },
                  ],
                },
                {
                  icon: Cpu, title: 'COB (Chip-on-Board)', color: 'rgba(229,197,116,0.12)',
                  desc: 'LED chips are mounted directly onto the PCB and covered with a protective resin layer. This eliminates the individual LED packaging, creating a smooth, seamless surface with dramatically better contrast and inherent protection against dust and moisture. COB is the premium choice for fine-pitch applications.',
                  specs: [
                    { label: 'Contrast', value: '15,000-20,000:1' },
                    { label: 'Min Pitch', value: '0.4mm' },
                    { label: 'Lifespan', value: '100,000+ hrs' },
                    { label: 'Power', value: '-40% vs SMD' },
                  ],
                },
                {
                  icon: Layers, title: 'MiP (Mini LED in Package)', color: 'rgba(16,185,129,0.12)',
                  desc: 'The newest mainstream technology combining advantages of both. Mini LED chips are individually packaged at a much smaller scale than SMD, achieving COB-like contrast while maintaining field serviceability. MiP is growing at 2x year-over-year and is becoming the go-to for mid-to-high-end installations.',
                  specs: [
                    { label: 'Contrast', value: '8,000-12,000:1' },
                    { label: 'Min Pitch', value: '0.4mm' },
                    { label: 'Lifespan', value: '80,000-100,000 hrs' },
                    { label: 'Growth', value: '2x YoY' },
                  ],
                },
              ].map(tech => (
                <div key={tech.title} className="glass-panel p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tech.color }}>
                      <tech.icon size={18} className="text-[var(--blx-gold-3)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wider">{tech.title}</h3>
                      <p className="text-xs text-[var(--blx-text-2)] mt-2 leading-relaxed" style={{ textTransform: 'none' }}>{tech.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {tech.specs.map(s => (
                      <div key={s.label} className="text-center py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="text-sm font-bold text-[var(--blx-gold-3)]">{s.value}</div>
                        <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* Comparison Table */}
            <h2 className="text-lg font-bold tracking-wider mb-6">Head-to-Head Comparison</h2>
            <ComparisonTable
              headers={['Specification', 'SMD', 'COB', 'MiP']}
              rows={[
                ['Contrast Ratio', '3,000-5,000:1', 'best', '8,000-12,000:1'],
                ['Black Uniformity', 'fair', 'best', 'good'],
                ['Power Consumption', 'Baseline 100%', '60-70%', '65-75%'],
                ['Viewing Angle', '140-160 deg', 'best', '160+ deg'],
                ['Dust Resistance', 'fair', 'best', 'good'],
                ['Field Repair', 'best', 'Module only', 'good'],
                ['Repair Cost', 'best', 'Medium-High', 'good'],
                ['Lifespan', '50K-80K hrs', 'best', '80K-100K hrs'],
                ['Cost (P1.2/sqm)', 'best', '$5K-8K', '$3.5K-6K'],
                ['Colour Accuracy', 'DCI-P3 80%+', 'best', 'DCI-P3 90%+'],
                ['Refresh Rate', '1,920-3,840Hz', 'best', '3,840-7,680Hz'],
                ['Camera Friendly', 'fair', 'best', 'good'],
              ]}
              caption="DETAILED TECHNOLOGY COMPARISON"
            />

            <SectionDivider />

            {/* When to Specify */}
            <h2 className="text-lg font-bold tracking-wider mb-6">When to Specify Each</h2>
            <div className="space-y-4 mb-10">
              {[
                { title: 'Choose SMD when', items: ['Budget is the primary constraint', 'Pixel pitch is 1.5mm or larger', 'Outdoor or rental/events application', 'On-site single-LED repair is critical', 'Content is mostly text or simple graphics at distance'], color: 'rgba(59,130,246,0.08)' },
                { title: 'Choose COB when', items: ['Image quality and contrast are paramount', 'Pixel pitch is sub-1.2mm (control rooms, broadcast)', 'Dusty or humid environment', 'Display runs 16+ hours daily (lifespan matters)', 'Budget allows premium specification'], color: 'rgba(229,197,116,0.08)' },
                { title: 'Choose MiP when', items: ['COB quality with SMD serviceability needed', 'Fine pitch (0.7-1.5mm) with field repair requirement', 'Retail flagship or brand experience', 'Camera-friendly applications (broadcast, social content)', 'Mid-high budget, long-term TCO optimisation'], color: 'rgba(16,185,129,0.08)' },
              ].map(section => (
                <div key={section.title} className="rounded-xl p-5" style={{ background: section.color, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-xs font-bold tracking-[0.15em] mb-3">{section.title}</h3>
                  <ul className="space-y-1.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Shield size={12} className="text-[var(--blx-gold-3)] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <SectionDivider />

            {/* UAE Considerations */}
            <h2 className="text-lg font-bold tracking-wider mb-6">UAE &amp; GCC Climate Considerations</h2>
            <div className="glass-panel p-6 mb-10">
              <ul className="space-y-3">
                {[
                  'Ambient temperatures regularly exceed 45C — ensure operating range covers -10C to +55C',
                  'Fine sand and dust require IP54+ for semi-outdoor; IP65+ for full outdoor installations',
                  'Direct sunlight in Dubai exceeds 100,000 lux — outdoor displays need 5,000+ nits minimum',
                  'Condensation risk on external glass — consider anti-condensation heating for transparent LED',
                  'Salt-air corrosion near coastal areas (JBR, Palm, Saadiyat) — specify marine-grade connectors',
                  'Front-service access is critical for high-rise installations common in Dubai and Abu Dhabi',
                  'Power supply must handle 220V/50Hz with surge protection for common grid fluctuations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--blx-gold-3)] font-bold text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-xs text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SectionDivider />

            {/* FAQ Section */}
            <FAQSection faqs={FAQS} />

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="kb-contact-cta">
                Get Design Assist Consultation <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/971559954274?text=${encodeURIComponent("Hi, I need help specifying LED technology (COB/MiP/SMD) for my project. Can you assist?")}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]"
                data-testid="kb-whatsapp-cta"
              >
                WhatsApp a Specialist
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SpecPackCTA
              packId="cob-mip-smd"
              title="COB vs MiP vs SMD Spec Pack"
              description="Complete technology comparison PDF with specification tables, vendor checklist, and UAE climate guidance. Ready for your tender documents."
            />

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">RELATED GUIDES</h3>
              <div className="space-y-2">
                {[
                  { to: '/knowledge/pixel-pitch-guide', label: 'Pixel Pitch Guide' },
                  { to: '/knowledge/brightness-nits-guide', label: 'Brightness & Nits Guide' },
                  { to: '/knowledge/ip-rating-guide', label: 'IP Rating Guide' },
                  { to: '/knowledge/refresh-rate-guide', label: 'Refresh Rate Guide' },
                ].map(link => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[var(--blx-text-2)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--blx-text)] transition-colors" style={{ textTransform: 'none' }}>
                    <ArrowRight size={12} className="text-[var(--blx-gold-3)]" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <h3 className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">NEED HELP SPECIFYING?</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Our technical team offers free 15-minute design-assist calls for architects and consultants.
              </p>
              <Link to="/contact" className="block text-center py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors">
                Book a Call
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
