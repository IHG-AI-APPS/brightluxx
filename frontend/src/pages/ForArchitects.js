import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Phone, MessageCircle, BookOpen, Briefcase, Ruler, PenTool } from 'lucide-react';
import SEO from '../components/SEO';

const SPEC_PACKS = [
  { id: 'cob-mip-smd', title: 'COB vs MiP vs SMD', desc: 'Technology comparison with specification tables' },
  { id: 'pixel-pitch', title: 'Pixel Pitch Guide', desc: 'Viewing distance formulas and cost analysis' },
  { id: 'brightness-nits', title: 'Brightness & Nits', desc: 'GCC-specific brightness specification' },
  { id: 'ip-rating', title: 'IP Rating Guide', desc: 'Protection ratings and serviceability' },
  { id: 'refresh-rate', title: 'Refresh Rate Guide', desc: 'Camera-friendly specification' },
  { id: 'retail-hospitality', title: 'Retail & Hospitality', desc: 'Application-specific spec pack' },
  { id: 'outdoor-dooh', title: 'Outdoor & DOOH', desc: 'Outdoor billboard specification' },
  { id: 'corporate-control', title: 'Corporate & Control Room', desc: 'Fine-pitch specification' },
  { id: 'healthcare-wayfinding', title: 'Healthcare', desc: 'Hospital signage specification' },
  { id: 'education-campus', title: 'Education', desc: 'Campus signage specification' },
];

const API = process.env.REACT_APP_BACKEND_URL || '';

export default function ForArchitects() {
  return (
    <div className="pb-20" data-testid="for-architects-page">
      <SEO
        title="For Architects & Consultants — LED Display Specification Resources"
        description="Specification resources for architects, AV consultants, and interior designers. Downloadable spec packs, technical guides, BIM/CAD information, and design-assist services for LED display projects in UAE and GCC."
        path="/for-architects"
        jsonLd={[{
          "@context": "https://schema.org", "@type": "Service",
          "name": "LED Display Specification Services for Architects",
          "provider": { "@type": "Organization", "name": "Brightluxx" },
          "areaServed": "UAE, GCC",
          "serviceType": "LED Display Consulting & Specification Support",
        }]}
      />

      {/* Hero */}
      <div className="relative pt-24 pb-16" data-testid="architects-hero">
        <div className="absolute inset-0 blx-led-grid opacity-50" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-4">FOR ARCHITECTS & CONSULTANTS</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">
              Specification<br />Resources
            </h1>
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-8" style={{ textTransform: 'none' }}>
              Everything you need to specify LED displays with confidence. Downloadable spec packs, technical reference guides, and direct access to our technical team for design-assist consultations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#spec-packs" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <Download size={14} /> Download Spec Packs
              </a>
              <a href="#design-assist" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <Phone size={14} /> Book Design Assist Call
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: FileText, title: 'Spec Packs', desc: 'Downloadable PDF specification guides for every application and technology' },
            { icon: Ruler, title: 'Technical Guides', desc: '5 deep-dive reference articles covering pixel pitch, brightness, IP, refresh rate' },
            { icon: PenTool, title: 'BIM / CAD', desc: 'Revit families and CAD blocks for common LED display configurations' },
            { icon: Briefcase, title: 'Design Assist', desc: 'Free 15-min technical consultation to help specify the right solution' },
          ].map(service => (
            <div key={service.title} className="glass-panel p-5" data-testid={`architect-service-${service.title.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(229,197,116,0.08)' }}>
                <service.icon size={18} className="text-[var(--blx-gold-3)]" />
              </div>
              <h3 className="text-xs font-bold tracking-[0.15em] mb-2">{service.title}</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed" style={{ textTransform: 'none' }}>{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Spec Packs Section */}
        <div id="spec-packs" className="mb-16 scroll-mt-24">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">DOWNLOADABLE RESOURCES</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">Specification Packs</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl" style={{ textTransform: 'none' }}>
            Professional PDF guides ready for your tender documents. Each includes recommended specs, comparison tables, vendor checklists, and UAE/GCC climate guidance.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SPEC_PACKS.map(pack => (
              <a
                key={pack.id}
                href={`${API}/api/specpacks/${pack.id}/file`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 flex items-center gap-4 group hover:border-[rgba(229,197,116,0.2)] transition-all"
                data-testid={`specpack-download-${pack.id}`}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Download size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{pack.title}</h4>
                  <p className="text-[0.625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{pack.desc}</p>
                </div>
                <span className="text-[0.5rem] font-bold tracking-wider text-[var(--blx-muted)] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>PDF</span>
              </a>
            ))}
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="mb-16">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">TECHNICAL REFERENCE</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">Knowledge Base</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl" style={{ textTransform: 'none' }}>
            In-depth technical guides covering the fundamentals of LED display specification.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { to: '/knowledge/cob-vs-mip-vs-smd', title: 'COB vs MiP vs SMD', desc: 'Technology comparison' },
              { to: '/knowledge/pixel-pitch-guide', title: 'Pixel Pitch Guide', desc: 'Resolution & viewing distance' },
              { to: '/knowledge/brightness-nits-guide', title: 'Brightness & Nits', desc: 'GCC environment guide' },
              { to: '/knowledge/ip-rating-guide', title: 'IP Rating Guide', desc: 'Protection & serviceability' },
              { to: '/knowledge/refresh-rate-guide', title: 'Refresh Rate Guide', desc: 'Camera-friendly spec' },
            ].map(guide => (
              <Link key={guide.to} to={guide.to} className="glass-panel p-4 group hover:border-[rgba(229,197,116,0.2)] transition-all" data-testid={`kb-link-${guide.title.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-[var(--blx-gold-3)]" />
                  <h4 className="text-xs font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{guide.title}</h4>
                </div>
                <p className="text-[0.625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* BIM / CAD Section */}
        <div className="mb-16">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">DESIGN TOOLS</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">BIM / CAD Resources</h2>
          <div className="glass-panel p-6">
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
              Revit families and AutoCAD blocks for common LED display configurations are available on request. Our technical team can also provide custom detail drawings for your specific project requirements.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {['All-in-One dvLED (standard sizes)', 'Fine-pitch indoor wall (typical configurations)', 'Outdoor cabinet (P4/P6/P8/P10)', 'Transparent LED film (window mount)', 'Typical mounting details (wall, hanging, curved)', 'Structural loading requirements'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--blx-gold-3)]" />
                  <span className="text-xs text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{item}</span>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/971559910711?text=${encodeURIComponent("Hi, I'm an architect and need BIM/CAD files for LED displays for my project. Can you provide Revit families or CAD blocks?")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors"
              data-testid="bim-cad-request-btn"
            >
              <MessageCircle size={14} /> Request BIM/CAD Files
            </a>
          </div>
        </div>

        {/* Design Assist / CPD */}
        <div id="design-assist" className="scroll-mt-24">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.1) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.2)' }} data-testid="design-assist-section">
              <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FREE SERVICE</div>
              <h3 className="text-base font-bold tracking-wider mb-3">Design Assist Call</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                Book a free 15-minute call with our technical team. We help architects and consultants select the right technology, pixel pitch, brightness, and specifications for their projects.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Technology selection (COB/MiP/SMD)', 'Pixel pitch recommendation', 'Budgetary guidance', 'UAE climate considerations', 'Structural & electrical requirements'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--blx-gold-3)]" />
                    <span className="text-[0.6875rem] text-[var(--blx-text-2)]" style={{ textTransform: 'none' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-gold px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  Book a Call <ArrowRight size={14} />
                </Link>
                <a href="tel:+971559910711" className="btn-glass px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </div>

            <div className="glass-panel p-8" data-testid="cpd-section">
              <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">CPD PROGRAM</div>
              <h3 className="text-base font-bold tracking-wider mb-3">Lunch &amp; Learn</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4" style={{ textTransform: 'none' }}>
                We offer a 30-minute CPD-accredited presentation for architecture and design teams:
              </p>
              <div className="glass-panel p-4 mb-4" style={{ background: 'rgba(229,197,116,0.04)' }}>
                <h4 className="text-xs font-bold tracking-wider mb-2" style={{ textTransform: 'none' }}>"Specifying dvLED Walls in GCC: Pitch, Brightness, IP, Service"</h4>
                <p className="text-[0.625rem] text-[var(--blx-muted)]" style={{ textTransform: 'none' }}>Covers technology selection, specification best practices, common mistakes, and UAE-specific requirements. Available in-office or virtual.</p>
              </div>
              <a
                href={`https://wa.me/971559910711?text=${encodeURIComponent("Hi, I'd like to arrange a CPD/Lunch & Learn session on LED display specification for our architecture team. Can you provide details?")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors"
                data-testid="cpd-request-btn"
              >
                <MessageCircle size={14} /> Arrange a Session
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
