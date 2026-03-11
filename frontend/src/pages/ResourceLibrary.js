import React, { useState, useMemo, useEffect } from 'react';
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
      
      // If there's a direct file_url, use it
      if (item.file_url) {
        window.open(item.file_url, '_blank');
        setDone(true);
        setShowForm(false);
        setLoading(false);
        return;
      }
      
      // Otherwise use the legacy download endpoints
      if (item.pack_id) {
        const res = await fetch(`${API}/api/specpacks/${item.pack_id}/download`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, pack_id: item.pack_id }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.doc_id) {
        const res = await fetch(`${API}/api/downloads/cheatsheet/${item.doc_id}/request`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.bim_id) {
        const res = await fetch(`${API}/api/downloads/bim/${item.bim_id}/request`, {
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

  const Icon = CAT_ICONS[item.category] || FileText;
  const catLabel = item.category === 'specpack' ? 'SPEC PACK' : item.category === 'cheatsheet' ? 'CHEAT SHEET' : item.category === 'bim' ? 'BIM / CAD' : 'GUIDE';

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
        <p className="text-[0.625rem] text-[var(--blx-muted)] leading-relaxed flex-1 mb-3">{item.description}</p>
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
      <p className="text-[0.625rem] text-[var(--blx-muted)] leading-relaxed flex-1 mb-3">{item.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {(item.tags || []).map(t => (
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
  const [resources, setResources] = useState([]);
  const [counts, setCounts] = useState({ all: 0, specpack: 0, cheatsheet: 0, bim: 0, guide: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API}/api/resources`);
        const data = await res.json();
        setResources(data.resources || []);
        setCounts(data.counts || { all: 0, specpack: 0, cheatsheet: 0, bim: 0, guide: 0 });
      } catch (err) {
        console.error('Failed to fetch resources:', err);
      }
      setLoading(false);
    };
    fetchResources();
  }, []);

  const filtered = useMemo(() => {
    return resources.filter(r => {
      if (activeCategory !== 'all' && r.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || (r.tags || []).some(t => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [activeCategory, searchQuery, resources]);

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
            {counts.all || 0} downloadable resources for LED display specification. Spec packs, cheat sheets, BIM references, and technical guides — everything you need in one place.
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
            {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'resource' : 'resources'} ${searchQuery ? `matching "${searchQuery}"` : ''}`}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[var(--blx-muted)]">Loading resources...</p>
          </div>
        ) : filtered.length > 0 ? (
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
