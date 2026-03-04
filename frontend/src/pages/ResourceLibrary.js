import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Box, Layers, Download, CheckCircle, Filter, ArrowRight, BookOpen, X } from 'lucide-react';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'specpack', label: 'Spec Packs' },
  { id: 'cheatsheet', label: 'Cheat Sheets' },
  { id: 'bim', label: 'BIM / CAD' },
  { id: 'guide', label: 'Knowledge Base' },
];

const RESOURCES = [
  // Spec Packs
  { id: 'sp-cob', cat: 'specpack', title: 'COB vs MiP vs SMD', desc: 'Technology comparison with specification tables', tags: ['Technology', 'Comparison'], packId: 'cob-mip-smd' },
  { id: 'sp-pitch', cat: 'specpack', title: 'Pixel Pitch Guide', desc: 'Viewing distance formulas and cost analysis', tags: ['Pixel Pitch', 'Calculator'], packId: 'pixel-pitch' },
  { id: 'sp-bright', cat: 'specpack', title: 'Brightness & Nits', desc: 'GCC-specific brightness specification', tags: ['Brightness', 'Outdoor'], packId: 'brightness-nits' },
  { id: 'sp-ip', cat: 'specpack', title: 'IP Rating Guide', desc: 'Protection ratings and serviceability', tags: ['IP Rating', 'Outdoor'], packId: 'ip-rating' },
  { id: 'sp-refresh', cat: 'specpack', title: 'Refresh Rate Guide', desc: 'Camera-friendly specification', tags: ['Refresh Rate', 'Broadcast'], packId: 'refresh-rate' },
  { id: 'sp-retail', cat: 'specpack', title: 'Retail & Hospitality', desc: 'Application-specific spec pack', tags: ['Retail', 'Hospitality'], packId: 'retail-hospitality' },
  { id: 'sp-outdoor', cat: 'specpack', title: 'Outdoor & DOOH', desc: 'Outdoor billboard specification', tags: ['Outdoor', 'DOOH'], packId: 'outdoor-dooh' },
  { id: 'sp-corp', cat: 'specpack', title: 'Corporate & Control Room', desc: 'Fine-pitch specification', tags: ['Corporate', 'Control Room'], packId: 'corporate-control' },
  { id: 'sp-health', cat: 'specpack', title: 'Healthcare', desc: 'Hospital signage specification', tags: ['Healthcare', 'Wayfinding'], packId: 'healthcare-wayfinding' },
  { id: 'sp-edu', cat: 'specpack', title: 'Education', desc: 'Campus signage specification', tags: ['Education', 'Campus'], packId: 'education-campus' },
  { id: 'sp-super', cat: 'specpack', title: 'Supermarket', desc: 'Promotions network specification', tags: ['Supermarket', 'Retail'], packId: 'supermarket-promotions' },
  { id: 'sp-resi', cat: 'specpack', title: 'Residential Cinema', desc: 'Home cinema wall specification', tags: ['Residential', 'Premium'], packId: 'residential-cinema' },
  // Cheat Sheets
  { id: 'cs-pitch', cat: 'cheatsheet', title: 'Pixel Pitch Cheat Sheet', desc: 'One-page quick reference: viewing distance, resolution, cost per sqm', tags: ['Pixel Pitch', 'Quick Ref'], docId: 'pixel-pitch-cheatsheet' },
  { id: 'cs-bright', cat: 'cheatsheet', title: 'Brightness & Nits Cheat Sheet', desc: 'UAE/GCC environment brightness guide on one page', tags: ['Brightness', 'UAE'], docId: 'brightness-cheatsheet' },
  { id: 'cs-tech', cat: 'cheatsheet', title: 'COB vs MiP vs SMD Cheat Sheet', desc: 'Technology comparison quick reference', tags: ['Technology', 'Comparison'], docId: 'cob-mip-smd-cheatsheet' },
  { id: 'cs-outdoor', cat: 'cheatsheet', title: 'Outdoor Durability Checklist', desc: 'Heat, dust, IP, service access checklist for UAE', tags: ['Outdoor', 'UAE', 'Checklist'], docId: 'outdoor-checklist' },
  // BIM / CAD
  { id: 'bim-aio', cat: 'bim', title: 'All-in-One dvLED Reference', desc: 'Dimensions, mounting, electrical for 110"-216" displays', tags: ['dvLED', 'Indoor'], bimId: 'all-in-one-dvled' },
  { id: 'bim-fp', cat: 'bim', title: 'Fine-Pitch Wall Reference', desc: 'Cabinet-based video wall. P0.9 to P1.9 configurations', tags: ['Fine Pitch', 'Video Wall'], bimId: 'fine-pitch-wall' },
  { id: 'bim-od', cat: 'bim', title: 'Outdoor Cabinet Reference', desc: 'IP65 outdoor cabinets. P3.9 to P10 with structural specs', tags: ['Outdoor', 'Billboard'], bimId: 'outdoor-cabinet' },
  { id: 'bim-tf', cat: 'bim', title: 'Transparent LED Film Reference', desc: 'Window-mount display. Adhesive mounting and controller details', tags: ['Transparent', 'Retail'], bimId: 'transparent-film' },
  // Knowledge Base (links, not downloads)
  { id: 'kb-cob', cat: 'guide', title: 'COB vs MiP vs SMD — Full Guide', desc: 'Deep-dive technology comparison with real-install insights', tags: ['Technology'], link: '/knowledge/cob-vs-mip-vs-smd' },
  { id: 'kb-pitch', cat: 'guide', title: 'Pixel Pitch Explained', desc: 'Resolution, viewing distance, cost analysis, and calculator', tags: ['Pixel Pitch'], link: '/knowledge/pixel-pitch-guide' },
  { id: 'kb-bright', cat: 'guide', title: 'Brightness & Nits Guide', desc: 'Indoor vs outdoor GCC brightness specification', tags: ['Brightness', 'Outdoor'], link: '/knowledge/brightness-nits-guide' },
  { id: 'kb-ip', cat: 'guide', title: 'IP Rating & Serviceability', desc: 'Protection ratings, front vs rear service, UAE requirements', tags: ['IP Rating'], link: '/knowledge/ip-rating-guide' },
  { id: 'kb-rr', cat: 'guide', title: 'Refresh Rate & Camera Guide', desc: 'Flicker-free, camera-friendly specification', tags: ['Refresh Rate', 'Broadcast'], link: '/knowledge/refresh-rate-guide' },
  { id: 'kb-proc', cat: 'guide', title: 'Processing & Calibration', desc: 'Video processing, calibration workflows, colour management', tags: ['Processing', 'Calibration'], link: '/knowledge/processing-calibration' },
  { id: 'kb-cms', cat: 'guide', title: 'CMS for Multi-Site Signage', desc: 'Content management for multi-location networks', tags: ['CMS', 'Multi-Site'], link: '/knowledge/cms-multi-site' },
  { id: 'kb-sla', cat: 'guide', title: 'SLA Gap Analysis', desc: 'Common SLA gaps, tier comparison, and audit checklist for LED display contracts', tags: ['SLA', 'Contracts', 'Maintenance'], link: '/sla-guide' },
];

const CAT_ICONS = { specpack: FileText, cheatsheet: Layers, bim: Box, guide: BookOpen };

function DownloadCard({ item }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url;
      if (item.packId) {
        const res = await fetch(`${API}/api/specpacks/${item.packId}/download`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, pack_id: item.packId }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.docId) {
        const res = await fetch(`${API}/api/downloads/cheatsheet/${item.docId}/request`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.bimId) {
        const res = await fetch(`${API}/api/downloads/bim/${item.bimId}/request`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name }),
        });
        const d = await res.json();
        url = d.download_url;
      }
      if (url) {
        window.open(`${API}${url}`, '_blank');
        setDone(true);
        setShowForm(false);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const Icon = CAT_ICONS[item.cat] || FileText;
  const catLabel = item.cat === 'specpack' ? 'SPEC PACK' : item.cat === 'cheatsheet' ? 'CHEAT SHEET' : item.cat === 'bim' ? 'BIM / CAD' : 'GUIDE';

  // Knowledge base items link out instead of download
  if (item.link) {
    return (
      <Link to={item.link} className="glass-panel p-5 group hover:border-[rgba(229,197,116,0.2)] transition-all flex flex-col" data-testid={`resource-${item.id}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
            <Icon size={15} className="text-[var(--blx-gold-3)]" />
          </div>
          <span className="text-[0.45rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>{catLabel}</span>
        </div>
        <h3 className="text-xs font-bold tracking-wider mb-1.5 group-hover:text-[var(--blx-gold-3)] transition-colors">{item.title}</h3>
        <p className="text-[0.625rem] text-[var(--blx-muted)] leading-relaxed flex-1 mb-3">{item.desc}</p>
        <div className="flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)]">
          Read Guide <ArrowRight size={10} />
        </div>
      </Link>
    );
  }

  return (
    <div className="glass-panel p-5 flex flex-col" data-testid={`resource-${item.id}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)' }}>
          <Icon size={15} className="text-[var(--blx-gold-3)]" />
        </div>
        <span className="text-[0.45rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>{catLabel}</span>
      </div>
      <h3 className="text-xs font-bold tracking-wider mb-1.5">{item.title}</h3>
      <p className="text-[0.625rem] text-[var(--blx-muted)] leading-relaxed flex-1 mb-3">{item.desc}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {item.tags.map(t => (
          <span key={t} className="text-[0.45rem] font-bold tracking-wider text-[var(--blx-muted)] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>{t}</span>
        ))}
      </div>

      {done ? (
        <div className="flex items-center gap-1.5 text-[0.625rem] text-emerald-400 font-bold">
          <CheckCircle size={12} /> Downloaded
        </div>
      ) : showForm ? (
        <form onSubmit={handleDownload} className="space-y-2">
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required
            className="w-full px-3 py-2 rounded-lg text-[0.625rem] bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
            data-testid={`resource-name-${item.id}`} />
          <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full px-3 py-2 rounded-lg text-[0.625rem] bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
            data-testid={`resource-email-${item.id}`} />
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="flex-1 py-2 rounded-lg text-[0.5625rem] font-bold tracking-wider flex items-center justify-center gap-1.5"
              style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }} data-testid={`resource-submit-${item.id}`}>
              {loading ? 'Preparing...' : <><Download size={10} /> Download PDF</>}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-3 py-2 rounded-lg text-[0.5625rem] border border-[var(--blx-border)] text-[var(--blx-muted)] hover:text-[var(--blx-text)]">
              <X size={10} />
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 text-[0.5625rem] font-bold tracking-wider text-[var(--blx-gold-3)] hover:underline" data-testid={`resource-download-${item.id}`}>
          <Download size={10} /> Download PDF
        </button>
      )}
    </div>
  );
}

export default function ResourceLibrary() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      if (activeCategory !== 'all' && r.cat !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const counts = useMemo(() => ({
    all: RESOURCES.length,
    specpack: RESOURCES.filter(r => r.cat === 'specpack').length,
    cheatsheet: RESOURCES.filter(r => r.cat === 'cheatsheet').length,
    bim: RESOURCES.filter(r => r.cat === 'bim').length,
    guide: RESOURCES.filter(r => r.cat === 'guide').length,
  }), []);

  return (
    <div className="pb-20" data-testid="resource-library-page">
      <SEO
        title="LED Display Specification Resources — Spec Packs, Cheat Sheets, BIM References"
        description="Complete resource library for LED display specifiers. 12 spec packs, 4 cheat sheets, 4 BIM/CAD references, and 7 technical guides. Downloadable PDFs for architects, consultants, and contractors in UAE/GCC."
        path="/resources"
      />

      {/* Hero */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 blx-led-grid opacity-30" />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[0.625rem] font-bold tracking-[0.2em] text-[var(--blx-gold-3)] mb-3">SPECIFICATION RESOURCES</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider mb-3" data-testid="resource-library-title">Resource Library</h1>
          <p className="text-sm text-[var(--blx-text-2)] max-w-xl mb-8">
            {RESOURCES.length} downloadable resources for LED display specification. Spec packs, cheat sheets, BIM references, and technical guides — everything you need in one place.
          </p>

          {/* Search */}
          <div className="relative max-w-md" data-testid="resource-search">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
            <input
              type="text"
              placeholder="Search resources... (e.g. pixel pitch, outdoor, retail)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none transition-colors"
              data-testid="resource-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)] hover:text-[var(--blx-text)]">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8" data-testid="resource-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-[0.625rem] font-bold tracking-[0.12em] transition-all ${
                activeCategory === cat.id
                  ? 'bg-[rgba(229,197,116,0.12)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]'
                  : 'border border-[var(--blx-border)] text-[var(--blx-text-2)] hover:border-[var(--blx-border-2)] hover:text-[var(--blx-text)]'
              }`}
              data-testid={`resource-filter-${cat.id}`}
            >
              {cat.label} <span className="ml-1 text-[var(--blx-muted)]">{counts[cat.id]}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[var(--blx-muted)]" data-testid="resource-count">
            {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'} {searchQuery && `matching "${searchQuery}"`}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" data-testid="resource-grid">
            {filtered.map(item => <DownloadCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-16" data-testid="resource-empty">
            <Search size={32} className="text-[var(--blx-muted)] mx-auto mb-4" />
            <p className="text-sm text-[var(--blx-muted)]">No resources match your search. Try a different term.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-xs font-bold text-[var(--blx-gold-3)] hover:underline">
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(229,197,116,0.08) 0%, rgba(183,142,58,0.04) 100%)', border: '1px solid rgba(229,197,116,0.15)' }}>
          <h2 className="text-lg font-bold tracking-wider mb-3">Need Something Specific?</h2>
          <p className="text-sm text-[var(--blx-text-2)] max-w-md mx-auto mb-6">
            Can't find what you need? Our technical team can prepare custom specification documents, project-specific technical drawings, or tailored cost analyses.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/for-architects" className="btn-gold px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="resource-architects-cta">
              For Architects <ArrowRight size={14} />
            </Link>
            <Link to="/value-engineering" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="resource-contractors-cta">
              For Contractors <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-glass px-6 py-3 text-xs font-bold tracking-[0.15em] flex items-center gap-2" data-testid="resource-contact-cta">
              Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
