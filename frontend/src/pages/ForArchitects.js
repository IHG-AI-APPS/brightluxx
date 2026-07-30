import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Phone, MessageCircle, BookOpen, Briefcase, Ruler, PenTool, CheckCircle, Box, Layers } from 'lucide-react';
import { getRecaptchaHeaders } from '../utils/recaptcha';
import SEO from '../components/SEO';
import { SpecPackCTA } from '../components/KnowledgeBase';

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
  { id: 'supermarket-promotions', title: 'Supermarket', desc: 'Promotions network specification' },
  { id: 'residential-cinema', title: 'Residential Cinema', desc: 'Home cinema wall specification' },
];

const BIM_ITEMS = [
  { id: 'all-in-one-dvled', title: 'All-in-One dvLED Display', desc: 'Standard sizes: 110", 136", 163", 216". Wall-mount reference with dimensions, weight, and electrical.' },
  { id: 'fine-pitch-wall', title: 'Fine-Pitch LED Wall', desc: 'Cabinet-based video wall configurations. P0.9 to P1.9 with mounting frame details.' },
  { id: 'outdoor-cabinet', title: 'Outdoor LED Cabinet', desc: 'IP65 outdoor cabinets. P3.9 to P10 with structural and weather protection specs.' },
  { id: 'transparent-film', title: 'Transparent LED Film', desc: 'Window-mount transparent display. Adhesive mounting details and controller specs.' },
];

const CHEATSHEETS = [
  { id: 'pixel-pitch-cheatsheet', title: 'Pixel Pitch', desc: 'Viewing distance, resolution, cost per sqm' },
  { id: 'brightness-cheatsheet', title: 'Brightness & Nits', desc: 'UAE/GCC environment brightness guide' },
  { id: 'cob-mip-smd-cheatsheet', title: 'COB vs MiP vs SMD', desc: 'Technology comparison quick reference' },
  { id: 'outdoor-checklist', title: 'Outdoor Durability', desc: 'Heat, dust, IP, service access checklist' },
];

const API = process.env.REACT_APP_BACKEND_URL || '';

function LeadGatedDownload({ docType, docId, title, children }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [fax, setFax] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rcHeaders = await getRecaptchaHeaders('download_request');
      const res = await fetch(`${API}/api/downloads/${docType}/${docId}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...rcHeaders },
        body: JSON.stringify({ email, name, fax }),
      });
      const data = await res.json();
      if (data.download_url) {
        window.open(`${API}${data.download_url}`, '_blank');
        setDownloaded(true);
        setShowForm(false);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (downloaded) {
    return (
      <div className="flex items-center gap-2 text-[0.625rem] text-emerald-400">
        <CheckCircle size={12} /> Downloaded
      </div>
    );
  }

  if (showForm) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-1.5 items-end">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required
          className="w-20 px-2 py-1.5 rounded text-[0.625rem] bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
          className="w-32 px-2 py-1.5 rounded text-[0.625rem] bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none" />
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
          <input type="text" name="fax" value={fax} onChange={e => setFax(e.target.value)} autoComplete="off" tabIndex={-1} />
        </div>
        <button type="submit" disabled={loading} className="px-3 py-1.5 rounded text-[0.5rem] font-bold tracking-wider" style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }} data-testid={`download-submit-${docId}`}>
          {loading ? '...' : 'GET'}
        </button>
      </form>
    );
  }

  return (
    <button onClick={() => setShowForm(true)} className="text-[0.625rem] font-bold tracking-wider text-[var(--blx-gold-3)] hover:underline flex items-center gap-1" data-testid={`download-btn-${docId}`}>
      <Download size={10} /> {children || 'Download'}
    </button>
  );
}

export default function ForArchitects() {
  return (
    <div className="pb-20" data-testid="for-architects-page">
      <SEO
        title="For Architects & Consultants — LED Display Specification Resources"
        description="Specification resources for architects, AV consultants, and interior designers. Downloadable spec packs, BIM/CAD references, cheat sheets, and design-assist services for LED display projects in UAE and GCC."
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider leading-tight mb-4">Specification<br />Resources</h1>
            <p className="text-sm text-[var(--blx-text-2)] leading-relaxed mb-8">
              Everything you need to specify LED displays with confidence. Downloadable spec packs, BIM/CAD technical references, specifier cheat sheets, and direct access to our technical team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#bim-cad" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <Box size={14} /> BIM / CAD References
              </a>
              <a href="#cheatsheets" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <FileText size={14} /> Cheat Sheets
              </a>
              <a href="#design-assist" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                <Phone size={14} /> Design Assist
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: FileText, title: '12 Spec Packs', desc: 'PDF specification guides for every application and technology', count: '12 PDFs' },
            { icon: Box, title: '4 BIM References', desc: 'Technical reference docs with dimensions, mounting & electrical', count: '4 docs' },
            { icon: Layers, title: '4 Cheat Sheets', desc: 'One-page quick reference for pixel pitch, brightness, technology', count: '4 PDFs' },
            { icon: Briefcase, title: 'Design Assist', desc: 'Free 15-min technical consultation to help specify the right solution', count: 'Free' },
          ].map(service => (
            <div key={service.title} className="glass-panel p-5" data-testid={`architect-service-${service.title.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <service.icon size={18} className="text-[var(--blx-gold-3)]" />
                </div>
                <span className="text-[0.5rem] font-bold tracking-wider text-[var(--blx-gold-3)] px-2 py-1 rounded" style={{ background: 'rgba(229,197,116,0.08)' }}>{service.count}</span>
              </div>
              <h3 className="text-xs font-bold tracking-[0.15em] mb-2">{service.title}</h3>
              <p className="text-[0.6875rem] text-[var(--blx-text-2)] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* BIM / CAD Section */}
        <div id="bim-cad" className="mb-16 scroll-mt-24">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">BIM / CAD RESOURCES</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">Technical Reference Documents</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl">
            Downloadable technical reference PDFs with dimensions, mounting details, electrical requirements, and specification tables. For custom Revit families or AutoCAD blocks, contact our team.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {BIM_ITEMS.map(item => (
              <div key={item.id} className="glass-panel p-5 flex items-start gap-4" data-testid={`bim-item-${item.id}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Box size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold tracking-wider mb-1">{item.title}</h4>
                  <p className="text-[0.625rem] text-[var(--blx-muted)] mb-2">{item.desc}</p>
                  <LeadGatedDownload docType="bim" docId={item.id} title={item.title}>PDF Reference</LeadGatedDownload>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-panel p-4 flex items-center gap-4" style={{ background: 'rgba(229,197,116,0.04)', border: '1px solid rgba(229,197,116,0.1)' }}>
            <PenTool size={16} className="text-[var(--blx-gold-3)] flex-shrink-0" />
            <p className="text-xs text-[var(--blx-text-2)] flex-1">
              Need custom Revit families, AutoCAD blocks, or project-specific technical drawings?
            </p>
            <a href="https://wa.me/971559954274?text=Hi%2C%20I%20need%20custom%20BIM%2FCAD%20files%20for%20LED%20displays%20for%20my%20project." target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-wider border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors flex items-center gap-1.5" data-testid="bim-custom-request">
              <MessageCircle size={12} /> Request Custom Files
            </a>
          </div>
        </div>

        {/* Cheat Sheets Section */}
        <div id="cheatsheets" className="mb-16 scroll-mt-24">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFIER CHEAT SHEETS</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">One-Page Quick Reference</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl">
            Compact, printable one-page reference sheets. Keep on your desk or share with your team.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CHEATSHEETS.map(cs => (
              <div key={cs.id} className="glass-panel p-5" data-testid={`cheatsheet-${cs.id}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <FileText size={16} className="text-[var(--blx-gold-3)]" />
                </div>
                <h4 className="text-xs font-bold tracking-wider mb-1">{cs.title}</h4>
                <p className="text-[0.625rem] text-[var(--blx-muted)] mb-3">{cs.desc}</p>
                <LeadGatedDownload docType="cheatsheet" docId={cs.id} title={cs.title}>Download PDF</LeadGatedDownload>
              </div>
            ))}
          </div>
        </div>

        {/* Spec Packs Section */}
        <div id="spec-packs" className="mb-16 scroll-mt-24">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFICATION PACKS</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">Full Specification Guides</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-8 max-w-xl">
            Comprehensive PDF guides for tender documents. Each includes recommended specs, comparison tables, vendor checklists, and UAE/GCC climate guidance.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SPEC_PACKS.map(pack => (
              <a key={pack.id} href={`${API}/api/specpacks/${pack.id}/file`} target="_blank" rel="noopener noreferrer"
                className="glass-panel p-4 flex items-center gap-3 group hover:border-[rgba(229,197,116,0.2)] transition-all" data-testid={`specpack-${pack.id}`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,116,0.08)' }}>
                  <Download size={14} className="text-[var(--blx-gold-3)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[0.6875rem] font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{pack.title}</h4>
                  <p className="text-[0.5625rem] text-[var(--blx-muted)]">{pack.desc}</p>
                </div>
                <span className="text-[0.5rem] font-bold tracking-wider text-[var(--blx-muted)] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>PDF</span>
              </a>
            ))}
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="mb-16">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">TECHNICAL REFERENCE</div>
          <h2 className="text-lg font-bold tracking-wider mb-2">Knowledge Base</h2>
          <p className="text-sm text-[var(--blx-text-2)] mb-6 max-w-xl">
            In-depth technical guides covering LED display specification fundamentals.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { to: '/knowledge/cob-vs-mip-vs-smd', title: 'COB vs MiP vs SMD' },
              { to: '/knowledge/pixel-pitch-guide', title: 'Pixel Pitch Guide' },
              { to: '/knowledge/brightness-nits-guide', title: 'Brightness & Nits' },
              { to: '/knowledge/ip-rating-guide', title: 'IP Rating Guide' },
              { to: '/knowledge/refresh-rate-guide', title: 'Refresh Rate Guide' },
              { to: '/knowledge/processing-calibration', title: 'Processing & Calibration' },
              { to: '/knowledge/cms-multi-site', title: 'CMS for Multi-Site' },
            ].map(guide => (
              <Link key={guide.to} to={guide.to} className="glass-panel p-4 group hover:border-[rgba(229,197,116,0.2)] transition-all flex items-center gap-2">
                <BookOpen size={14} className="text-[var(--blx-gold-3)]" />
                <h4 className="text-[0.6875rem] font-bold tracking-wider group-hover:text-[var(--blx-gold-3)] transition-colors">{guide.title}</h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Design Assist / CPD */}
        <div id="design-assist" className="scroll-mt-24">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.1) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.2)' }} data-testid="design-assist-section">
              <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">FREE SERVICE</div>
              <h3 className="text-base font-bold tracking-wider mb-3">Design Assist Call</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4">
                Book a free 15-minute call with our technical team. We help architects and consultants select the right technology, pixel pitch, brightness, and specifications.
              </p>
              <ul className="space-y-1.5 mb-6">
                {['Technology selection (COB/MiP/SMD)', 'Pixel pitch recommendation', 'Budgetary guidance', 'UAE climate considerations', 'Structural & electrical'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={10} className="text-[var(--blx-gold-3)]" />
                    <span className="text-[0.6875rem] text-[var(--blx-text-2)]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-gold px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="design-assist-cta">
                  Book a Call <ArrowRight size={14} />
                </Link>
                <a href="tel:+971559954274" className="btn-glass px-5 py-2.5 text-xs font-bold tracking-[0.15em] flex items-center gap-2">
                  <Phone size={14} /> +971 4 258 5754
                </a>
              </div>
            </div>

            <div className="glass-panel p-8" data-testid="cpd-section">
              <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">CPD PROGRAM</div>
              <h3 className="text-base font-bold tracking-wider mb-3">Lunch &amp; Learn</h3>
              <p className="text-xs text-[var(--blx-text-2)] leading-relaxed mb-4">
                We offer a 30-minute CPD-accredited presentation for architecture and design teams:
              </p>
              <div className="glass-panel p-4 mb-4" style={{ background: 'rgba(229,197,116,0.04)' }}>
                <h4 className="text-xs font-bold tracking-wider mb-2">"Specifying dvLED Walls in GCC: Pitch, Brightness, IP, Service"</h4>
                <p className="text-[0.625rem] text-[var(--blx-muted)]">Covers technology selection, specification best practices, common mistakes, and UAE-specific requirements. Available in-office or virtual.</p>
              </div>
              <a href="https://wa.me/971559954274?text=Hi%2C%20I%27d%20like%20to%20arrange%20a%20CPD%2FLunch%20%26%20Learn%20session%20on%20LED%20display%20specification%20for%20our%20team." target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-[0.15em] border border-[var(--blx-gold-3)] text-[var(--blx-gold-3)] hover:bg-[rgba(229,197,116,0.08)] transition-colors" data-testid="cpd-request-btn">
                <MessageCircle size={14} /> Arrange a Session
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
