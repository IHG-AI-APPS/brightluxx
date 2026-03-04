import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Ruler, Sun, Shield, Camera, Download, Sliders, Monitor } from 'lucide-react';
import SEO from '../../components/SEO';
import { buildFaqJsonLd } from '../../components/KnowledgeBase';

const GUIDES = [
  {
    slug: 'cob-vs-mip-vs-smd',
    icon: Cpu,
    title: 'COB vs MiP vs SMD',
    subtitle: 'LED Technology Comparison',
    description: 'Comprehensive comparison of LED display technologies. Specification tables, viewing distance guidance, and vendor checklists.',
    tags: ['Technology', 'Specification', 'Comparison'],
    specPack: true,
  },
  {
    slug: 'pixel-pitch-guide',
    icon: Ruler,
    title: 'Pixel Pitch Guide',
    subtitle: 'Resolution & Viewing Distance',
    description: 'How to specify the correct pixel pitch. Viewing distance formulas, application tables, resolution calculator, and cost analysis.',
    tags: ['Resolution', 'Viewing Distance', 'Cost'],
    specPack: true,
  },
  {
    slug: 'brightness-nits-guide',
    icon: Sun,
    title: 'Brightness & Nits Guide',
    subtitle: 'For UAE & GCC Environments',
    description: 'Brightness specification for Gulf environments. Indoor, semi-outdoor, and outdoor recommendations with thermal derating and solar orientation.',
    tags: ['Brightness', 'UAE', 'Outdoor'],
    specPack: true,
  },
  {
    slug: 'ip-rating-guide',
    icon: Shield,
    title: 'IP Rating & Serviceability',
    subtitle: 'Protection & Maintenance Access',
    description: 'Understanding IP ratings and front vs rear service access. UAE-specific guidance for dust, heat, salt air, and maintenance.',
    tags: ['Protection', 'Maintenance', 'Durability'],
    specPack: true,
  },
  {
    slug: 'refresh-rate-guide',
    icon: Camera,
    title: 'Refresh Rate & Camera Guide',
    subtitle: 'Flicker-Free Displays',
    description: 'Eliminating flicker, banding, and moire on camera. Refresh rate tables, greyscale bit depth, and processing system guidance.',
    tags: ['Camera', 'Broadcast', 'Refresh Rate'],
    specPack: true,
  },
  {
    slug: 'processing-calibration',
    icon: Sliders,
    title: 'Processing & Calibration',
    subtitle: 'Image Quality Fundamentals',
    description: 'Video processing systems, camera-based calibration, colour management, and content delivery. The specifications that define image quality.',
    tags: ['Processing', 'Calibration', 'Colour'],
    specPack: true,
  },
  {
    slug: 'cms-multi-site',
    icon: Monitor,
    title: 'CMS for Multi-Site Signage',
    subtitle: 'Content Management Networks',
    description: 'Specifying and deploying content management systems for multi-location signage networks. Platform comparison, cost analysis, and UAE use cases.',
    tags: ['CMS', 'Multi-Site', 'Network'],
    specPack: true,
  },
];

const TOP_FAQS = [
  { q: "What pixel pitch should I specify for a 5m viewing distance?", a: "At 5m, minimum pitch is P3.3 (5/1.5). P2.5 is the sweet spot for most applications." },
  { q: "COB vs MiP vs SMD: which is best for luxury retail?", a: "MiP is optimal — COB-level contrast with field serviceability." },
  { q: "How many nits for outdoor LED in Dubai sun?", a: "Minimum 5,500 nits, recommended 7,000-10,000 nits for south/west-facing." },
  { q: "What IP rating for semi-outdoor canopies in UAE?", a: "IP54 minimum for canopy installations to handle Gulf dust and rain." },
  { q: "What refresh rate avoids moire on camera?", a: "3,840Hz eliminates moire for phone cameras. 7,680Hz for broadcast." },
];

export default function KnowledgeIndex() {
  const faqJsonLd = buildFaqJsonLd(TOP_FAQS);

  return (
    <div className="py-20" data-testid="knowledge-index">
      <SEO
        title="LED Display Knowledge Base — Specification Guides for Architects & Consultants"
        description="Technical specification guides for LED displays. Pixel pitch, brightness, IP ratings, refresh rates, COB vs MiP vs SMD comparison. Free spec packs for architects, consultants, and AV designers."
        path="/knowledge"
        jsonLd={[faqJsonLd]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER KNOWLEDGE BASE</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">
            LED Display<br />Specification Guides
          </h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-2xl leading-relaxed" style={{ textTransform: 'none' }}>
            Technical reference library for architects, AV consultants, and project specifiers. Each guide includes downloadable spec packs with comparison tables, vendor checklists, and UAE/GCC-specific recommendations.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {GUIDES.map(guide => (
            <Link
              key={guide.slug}
              to={`/knowledge/${guide.slug}`}
              className="glass-panel p-6 group hover:border-[rgba(229,197,116,0.2)] transition-all duration-300"
              data-testid={`knowledge-card-${guide.slug}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <guide.icon size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                {guide.specPack && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded text-[0.5rem] font-bold tracking-wider text-[var(--blx-gold-3)]" style={{ background: 'rgba(229,197,116,0.08)' }}>
                    <Download size={10} /> PDF
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold tracking-wider mb-1 group-hover:text-[var(--blx-gold-3)] transition-colors">{guide.title}</h3>
              <p className="text-[0.625rem] text-[var(--blx-gold-3)] tracking-wider mb-3">{guide.subtitle}</p>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>{guide.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {guide.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[0.5rem] tracking-wider text-[var(--blx-muted)]" style={{ background: 'rgba(255,255,255,0.04)' }}>{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs text-[var(--blx-gold-3)] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read Guide <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FOR ARCHITECTS & CONSULTANTS</div>
          <h2 className="text-lg sm:text-xl font-bold tracking-wider mb-3">Need Help Specifying?</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-lg mx-auto mb-6" style={{ textTransform: 'none' }}>
            Our technical team offers free 15-minute design-assist calls. We help architects and consultants select the right technology, pixel pitch, and specifications for their projects.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
              Book a Design Assist Call <ArrowRight size={14} />
            </Link>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent("Hi, I'm an architect/consultant and need help specifying LED displays for a project. Can we schedule a quick call?")}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em]"
            >
              WhatsApp Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
