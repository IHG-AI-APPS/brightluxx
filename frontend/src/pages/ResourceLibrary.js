import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Box, Layers, Download, CheckCircle, ArrowRight, BookOpen, X, Eye, Sparkles, File, Grid3X3, Cpu, Monitor, Zap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const API = process.env.REACT_APP_BACKEND_URL || '';

const useInView = (ref, threshold = 0.15) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`
    backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

const CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: Grid3X3 },
  { id: 'specpack', label: 'Spec Packs', icon: FileText },
  { id: 'cheatsheet', label: 'Cheat Sheets', icon: Layers },
  { id: 'bim', label: 'BIM / CAD', icon: Box },
  { id: 'guide', label: 'Knowledge Base', icon: BookOpen },
];

const CAT_ICONS = { specpack: FileText, cheatsheet: Layers, bim: Box, guide: BookOpen };
const CAT_COLORS = { 
  specpack: 'from-cyan-500 to-blue-500',
  cheatsheet: 'from-emerald-500 to-teal-500',
  bim: 'from-purple-500 to-pink-500',
  guide: 'from-amber-500 to-orange-500'
};

// Branded document preview component
function DocumentPreview({ item }) {
  const Icon = CAT_ICONS[item.category] || FileText;
  const gradient = CAT_COLORS[item.category] || 'from-cyan-500 to-blue-500';
  
  // Generate visual elements based on category
  const getPreviewContent = () => {
    switch(item.category) {
      case 'specpack':
        return (
          <>
            <div className="absolute top-4 left-4 right-4 space-y-2">
              <div className="h-2 w-3/4 rounded bg-white/20" />
              <div className="h-1.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-2/3 rounded bg-white/10" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 rounded bg-white/10" />
                ))}
              </div>
            </div>
            <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={40} />
          </>
        );
      case 'cheatsheet':
        return (
          <>
            <div className="absolute top-4 left-4 right-4 space-y-1.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className={`h-1.5 rounded bg-white/${10 + (i % 3) * 5}`} style={{ width: `${50 + Math.random() * 40}%` }} />
                </div>
              ))}
            </div>
            <Zap className="absolute bottom-4 right-4 text-white/20" size={32} />
          </>
        );
      case 'bim':
        return (
          <>
            <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded" />
            <div className="absolute top-6 left-6 w-16 h-10 border border-white/30 rounded" />
            <div className="absolute bottom-6 right-6 w-12 h-16 border border-white/30 rounded" />
            <Monitor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={36} />
          </>
        );
      case 'guide':
        return (
          <>
            <div className="absolute top-4 left-4 right-4 space-y-2">
              <div className="h-3 w-2/3 rounded bg-white/20" />
              <div className="h-1.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-3/4 rounded bg-white/10" />
            </div>
            <BookOpen className="absolute bottom-4 right-4 text-white/20" size={28} />
          </>
        );
      default:
        return <File className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={40} />;
    }
  };
  
  return (
    <div className={`relative h-36 rounded-t-xl bg-gradient-to-br ${gradient} overflow-hidden`}>
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '16px 16px'
      }} />
      
      {/* Document frame */}
      <div className="absolute inset-3 bg-[#0a0a0f]/80 rounded-lg shadow-2xl">
        {getPreviewContent()}
      </div>
      
      {/* Brightluxx branding */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-cyan-400 flex items-center justify-center">
          <span className="text-[6px] font-black text-black">BL</span>
        </div>
        <span className="text-[8px] font-bold text-white/60 tracking-wider">BRIGHTLUXX</span>
      </div>
      
      {/* Category badge */}
      <div className="absolute top-2 right-2">
        <div className="px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
          <Icon size={12} className="text-white/80" />
        </div>
      </div>
    </div>
  );
}

function DownloadCard({ item }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url;
      
      if (item.file_url) {
        window.open(item.file_url, '_blank');
        setDone(true);
        setShowForm(false);
        setLoading(false);
        return;
      }
      
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

  // Knowledge base items link out
  if (item.link) {
    return (
      <Link to={item.link} className="group block" data-testid={`resource-${item.id}`}>
        <GlassCard className="h-full flex flex-col">
          <DocumentPreview item={item} />
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-bold tracking-[0.15em] text-cyan-400 uppercase">{catLabel}</span>
            </div>
            <h3 className="text-sm font-bold tracking-wide mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{item.description}</p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider">
              Read Guide <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </GlassCard>
      </Link>
    );
  }

  return (
    <div data-testid={`resource-${item.id}`}>
      <GlassCard className="h-full flex flex-col group">
        {/* Preview Section */}
        <div className="relative cursor-pointer" onClick={() => setShowPreview(true)}>
          <DocumentPreview item={item} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm flex items-center gap-2 text-white text-xs font-bold tracking-wider">
              <Eye size={14} /> Preview
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold tracking-[0.15em] text-cyan-400 uppercase">{catLabel}</span>
            <span className="text-[9px] text-gray-600">PDF</span>
          </div>
          <h3 className="text-sm font-bold tracking-wide mb-2">{item.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{item.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(item.tags || []).map(t => (
              <span key={t} className="text-[9px] font-bold tracking-wider text-gray-500 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06]">{t}</span>
            ))}
          </div>

          {/* Download Section */}
          {done ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle size={14} /> Downloaded Successfully
            </div>
          ) : showForm ? (
            <form onSubmit={handleDownload} className="space-y-2">
              <input 
                type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required
                className="w-full px-3 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all"
                data-testid={`resource-name-${item.id}`} 
              />
              <input 
                type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-3 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all"
                data-testid={`resource-email-${item.id}`} 
              />
              <div className="flex gap-2">
                <button 
                  type="submit" disabled={loading} 
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-50 cursor-not-allowed bg-cyan-500/50' : 'bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'} text-black`}
                  data-testid={`resource-submit-${item.id}`}
                >
                  {loading ? 'Preparing...' : <><Download size={12} /> Download PDF</>}
                </button>
                <button 
                  type="button" onClick={() => setShowForm(false)} 
                  className="px-3 py-2.5 rounded-lg text-xs border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <X size={12} />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setShowPreview(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-wider text-gray-400 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:text-white transition-all"
              >
                <Eye size={12} /> Preview
              </button>
              <button 
                onClick={() => setShowForm(true)} 
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
                data-testid={`resource-download-${item.id}`}
              >
                <Download size={12} /> Download
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
          <div className="max-w-2xl w-full bg-[#0a0a0f] rounded-2xl border border-white/[0.08] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${CAT_COLORS[item.category]} bg-opacity-20`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wide text-white">{item.title}</h3>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-cyan-400 uppercase">{catLabel}</span>
                  </div>
                </div>
                <button onClick={() => setShowPreview(false)} className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-500 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden mb-6">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
                
                {/* Mock PDF preview */}
                <div className="absolute inset-6 bg-white rounded shadow-2xl overflow-hidden">
                  <div className="h-8 bg-gray-100 border-b flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded bg-cyan-500 flex items-center justify-center">
                        <span className="text-sm font-black text-white">BL</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{item.title}</div>
                        <div className="text-xs text-gray-500">BRIGHTLUXX Specification Document</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-3/4 rounded bg-gray-200" />
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="h-2 w-2/3 rounded bg-gray-100" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-8 rounded bg-gray-100" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Brightluxx watermark */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded bg-cyan-400 flex items-center justify-center">
                    <span className="text-[8px] font-black text-black">BL</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/80 tracking-wider">BRIGHTLUXX</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">{item.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {(item.tags || []).map(t => (
                  <span key={t} className="text-[10px] font-bold tracking-wider text-gray-500 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]">{t}</span>
                ))}
              </div>
              
              <button 
                onClick={() => { setShowPreview(false); setShowForm(true); }}
                className="w-full py-3.5 rounded-lg text-sm font-bold tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download Full PDF
              </button>
            </div>
          </div>
        </div>
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
    <div className="bg-[#050508] min-h-screen" data-testid="resource-library-page">
      <SEO
        title="LED Display Specification Resources — Spec Packs, Cheat Sheets, BIM References"
        description="Complete resource library for LED display specifiers. Spec packs, cheat sheets, BIM/CAD references, and technical guides. Downloadable PDFs for architects, consultants, and contractors in UAE/GCC."
        path="/resources"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <FadeInSection>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">Specification Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" data-testid="resource-library-title">
              Resource
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-3">Library</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl tracking-wide leading-relaxed mb-8">
              {counts.all || 0} downloadable resources for LED display specification. Spec packs, cheat sheets, BIM references, and technical guides — everything you need in one place.
            </p>

            {/* Search */}
            <div className="relative max-w-xl" data-testid="resource-search">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search resources... (e.g. pixel pitch, outdoor, retail)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl text-sm bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all"
                data-testid="resource-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Category Filter */}
          <FadeInSection delay={1}>
            <div className="flex flex-wrap gap-3 mb-8" data-testid="resource-filters">
              {CATEGORIES.map(cat => {
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'bg-white/[0.03] text-gray-400 border border-white/[0.08] hover:border-white/20 hover:text-white'
                    }`}
                    data-testid={`resource-filter-${cat.id}`}
                  >
                    <CatIcon size={14} />
                    {cat.label}
                    <span className={`ml-1 ${activeCategory === cat.id ? 'text-cyan-400/60' : 'text-gray-600'}`}>{counts[cat.id]}</span>
                  </button>
                );
              })}
            </div>
          </FadeInSection>

          {/* Results Count */}
          <FadeInSection delay={2}>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500" data-testid="resource-count">
                {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'resource' : 'resources'} ${searchQuery ? `matching "${searchQuery}"` : ''}`}
              </p>
            </div>
          </FadeInSection>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-500">Loading resources...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="resource-grid">
              {filtered.map((item, i) => (
                <FadeInSection key={item.id} delay={3 + i * 0.5}>
                  <DownloadCard item={item} />
                </FadeInSection>
              ))}
            </div>
          ) : (
            <FadeInSection delay={3}>
              <div className="text-center py-20" data-testid="resource-empty">
                <Search size={40} className="text-gray-600 mx-auto mb-4" />
                <p className="text-lg font-bold text-white mb-2">No resources found</p>
                <p className="text-sm text-gray-500 mb-4">Try a different search term or category.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                  className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            </FadeInSection>
          )}

          {/* Bottom CTA */}
          <FadeInSection delay={filtered.length > 0 ? filtered.length + 4 : 5}>
            <GlassCard className="mt-16 p-10 lg:p-14" hover={false}>
              <div className="text-center">
                <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Need Something Specific?</span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
                  Custom
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 ml-2">Documentation</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 tracking-wide">
                  Can't find what you need? Our technical team can prepare custom specification documents, project-specific technical drawings, or tailored cost analyses.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/for-architects" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-wider px-8 py-4 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] inline-flex items-center gap-2 text-sm"
                    data-testid="resource-architects-cta"
                  >
                    For Architects <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/value-engineering" 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="resource-contractors-cta"
                  >
                    For Contractors <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all inline-flex items-center gap-2 text-sm"
                    data-testid="resource-contact-cta"
                  >
                    Contact Us <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
