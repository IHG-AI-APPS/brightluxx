import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Box, Layers, Download, CheckCircle, ArrowRight, BookOpen, X, Eye, Sparkles, Grid3X3, Cpu, Monitor, Zap, Table, BarChart3, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

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
  specpack: 'from-cyan-500 to-blue-600',
  cheatsheet: 'from-emerald-500 to-teal-600',
  bim: 'from-purple-500 to-pink-600',
  guide: 'from-amber-500 to-orange-600'
};

// Brightluxx Logo Component
const BrightluxxLogo = ({ size = 'md', dark = false }) => {
  const sizes = {
    sm: { img: 'h-5', text: 'text-[8px]' },
    md: { img: 'h-7', text: 'text-[10px]' },
    lg: { img: 'h-10', text: 'text-xs' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <img 
        src="https://files.ihgbrands.com/brightluxx/assets/brightluxx-logo-nav.png" 
        alt="Brightluxx" 
        className={`${s.img} object-contain ${dark ? 'brightness-0' : ''}`}
      />
    </div>
  );
};

// Full Document Preview Component with actual content visualization
function DocumentPreview({ item }) {
  const Icon = CAT_ICONS[item.category] || FileText;
  const gradient = CAT_COLORS[item.category] || 'from-cyan-500 to-blue-600';
  
  return (
    <div className={`relative h-44 rounded-t-xl bg-gradient-to-br ${gradient} overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
        backgroundSize: '12px 12px'
      }} />
      
      {/* Document paper */}
      <div className="absolute inset-3 bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Document Header with Brightluxx Logo */}
        <div className="h-10 bg-[#0a0a0f] flex items-center justify-between px-3">
          <img 
            src="https://files.ihgbrands.com/brightluxx/assets/brightluxx-logo-nav.png" 
            alt="Brightluxx" 
            className="h-5 object-contain"
          />
          <span className="text-[8px] font-bold text-cyan-400 tracking-wider uppercase">{item.category === 'specpack' ? 'SPECIFICATION PACK' : item.category === 'cheatsheet' ? 'CHEAT SHEET' : item.category === 'bim' ? 'BIM REFERENCE' : 'TECHNICAL GUIDE'}</span>
        </div>
        
        {/* Document Content */}
        <div className="p-3 bg-white">
          {/* Title */}
          <div className="text-[9px] font-bold text-gray-800 mb-2 leading-tight">{item.title}</div>
          
          {/* Content varies by category */}
          {item.category === 'specpack' && (
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-1">
                <div className="h-5 rounded bg-gray-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div className="h-5 rounded bg-gray-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="h-5 rounded bg-gray-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                </div>
              </div>
              <div className="h-1.5 w-full rounded bg-gray-100" />
              <div className="h-1.5 w-3/4 rounded bg-gray-100" />
              <Table size={12} className="text-gray-300 mx-auto mt-1" />
            </div>
          )}
          
          {item.category === 'cheatsheet' && (
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className={`h-1 rounded bg-gray-${100 + i * 50}`} style={{ width: `${70 - i * 10}%` }} />
                </div>
              ))}
              <Zap size={12} className="text-gray-300 mx-auto mt-1" />
            </div>
          )}
          
          {item.category === 'bim' && (
            <div className="relative h-16">
              <div className="absolute inset-1 border border-dashed border-gray-300 rounded" />
              <div className="absolute top-2 left-2 w-8 h-5 border border-gray-400 rounded-sm bg-gray-50" />
              <div className="absolute bottom-2 right-2 w-6 h-8 border border-gray-400 rounded-sm bg-gray-50" />
              <Ruler size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
            </div>
          )}
          
          {item.category === 'guide' && (
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-2/3 rounded bg-gray-100" />
              <BarChart3 size={12} className="text-gray-300 mx-auto mt-1" />
            </div>
          )}
        </div>
      </div>
      
      {/* Category icon badge */}
      <div className="absolute top-1.5 right-1.5">
        <div className="w-6 h-6 rounded-md bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Icon size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
}

// Full Preview Modal with complete document view
function PreviewModal({ item, onClose, onDownload }) {
  const Icon = CAT_ICONS[item.category] || FileText;
  const gradient = CAT_COLORS[item.category] || 'from-cyan-500 to-blue-600';
  const catLabel = item.category === 'specpack' ? 'SPECIFICATION PACK' : item.category === 'cheatsheet' ? 'CHEAT SHEET' : item.category === 'bim' ? 'BIM / CAD REFERENCE' : 'TECHNICAL GUIDE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-4xl w-full max-h-[90vh] overflow-hidden bg-[#0a0a0f] rounded-2xl border border-white/10 shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-white">{item.title}</h3>
              <span className="text-[10px] font-bold tracking-[0.15em] text-cyan-400 uppercase">{catLabel}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-500 hover:text-white transition-all">
            <X size={22} />
          </button>
        </div>
        
        {/* Document Preview Area */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Full Document Preview */}
          <div className={`rounded-xl bg-gradient-to-br ${gradient} p-1 mb-6`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              {/* Document Header */}
              <div className="bg-[#0a0a0f] px-6 py-4 flex items-center justify-between">
                <img 
                  src="https://files.ihgbrands.com/brightluxx/assets/brightluxx-logo-nav.png" 
                  alt="Brightluxx" 
                  className="h-8 object-contain"
                />
                <div className="text-right">
                  <div className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">{catLabel}</div>
                  <div className="text-[9px] text-gray-500">LED Display Specification Document</div>
                </div>
              </div>
              
              {/* Document Body */}
              <div className="p-6">
                {/* Document Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-6">{item.description}</p>
                
                {/* Document Content Preview Based on Category */}
                {item.category === 'specpack' && (
                  <div className="space-y-4">
                    {/* Comparison Table Preview */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Technology Comparison</span>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-4 gap-3 mb-3">
                          <div className="text-[10px] font-bold text-gray-500 uppercase">Feature</div>
                          <div className="text-[10px] font-bold text-cyan-600 uppercase text-center">COB</div>
                          <div className="text-[10px] font-bold text-emerald-600 uppercase text-center">MiP</div>
                          <div className="text-[10px] font-bold text-purple-600 uppercase text-center">SMD</div>
                        </div>
                        {['Pixel Pitch', 'Contrast Ratio', 'Surface Protection', 'Best For'].map((row, i) => (
                          <div key={i} className="grid grid-cols-4 gap-3 py-2 border-t border-gray-100">
                            <div className="text-[10px] text-gray-600">{row}</div>
                            <div className="h-2 bg-cyan-100 rounded" />
                            <div className="h-2 bg-emerald-100 rounded" />
                            <div className="h-2 bg-purple-100 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {['Resolution Guide', 'Power Requirements', 'Cost Analysis'].map((spec, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-[9px] font-bold text-gray-500 uppercase mb-2">{spec}</div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-gray-200 rounded w-full" />
                            <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                            <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.category === 'cheatsheet' && (
                  <div className="space-y-4">
                    {/* Quick Reference Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-emerald-50 px-4 py-2 border-b border-gray-200">
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Quick Reference</span>
                      </div>
                      <div className="p-4 space-y-2">
                        {['Pixel Pitch → Viewing Distance', 'Resolution by Screen Size', 'Cost per SQM Range', 'Power Consumption', 'Recommended Applications'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-xs text-gray-700">{item}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded ml-auto max-w-[100px]" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Formula Box */}
                    <div className="bg-gray-900 rounded-lg p-4 text-center">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Key Formula</div>
                      <div className="text-sm font-mono text-emerald-400">Viewing Distance (m) = Pixel Pitch (mm) × 3</div>
                    </div>
                  </div>
                )}
                
                {item.category === 'bim' && (
                  <div className="space-y-4">
                    {/* Technical Drawing Preview */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-purple-50 px-4 py-2 border-b border-gray-200">
                        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Technical Specifications</span>
                      </div>
                      <div className="p-6 bg-gray-50">
                        {/* Mock CAD Drawing */}
                        <div className="relative aspect-video border-2 border-dashed border-gray-300 rounded bg-white">
                          <div className="absolute top-4 left-4 w-24 h-16 border-2 border-purple-400 rounded flex items-center justify-center">
                            <Monitor size={20} className="text-purple-400" />
                          </div>
                          <div className="absolute bottom-4 right-4 text-[9px] text-gray-500">
                            <div>W: XXXXmm</div>
                            <div>H: XXXXmm</div>
                            <div>D: XXmm</div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <Ruler size={24} className="text-gray-300 mx-auto mb-1" />
                            <div className="text-[10px] text-gray-400">Dimensional Drawing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Spec List */}
                    <div className="grid grid-cols-2 gap-3">
                      {['Mounting Details', 'Electrical Requirements', 'Ventilation Specs', 'Weight Distribution'].map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Box size={12} className="text-purple-400" />
                          <span className="text-[10px] text-gray-600">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.category === 'guide' && (
                  <div className="space-y-4">
                    {/* Article Preview */}
                    <div className="prose prose-sm max-w-none">
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-3/4" />
                      </div>
                      
                      <div className="my-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="text-[10px] font-bold text-amber-700 uppercase mb-1">Key Insight</div>
                        <div className="h-1.5 bg-amber-200 rounded w-full mb-1" />
                        <div className="h-1.5 bg-amber-200 rounded w-2/3" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <img 
                    src="https://files.ihgbrands.com/brightluxx/assets/brightluxx-logo-nav.png" 
                    alt="Brightluxx" 
                    className="h-5 object-contain opacity-50"
                  />
                  <div className="text-[9px] text-gray-400">© 2026 Brightluxx LED Solutions | www.brightluxx.com</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(item.tags || []).map(t => (
              <span key={t} className="text-[10px] font-bold tracking-wider text-gray-500 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">{t}</span>
            ))}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-5 border-t border-white/[0.06] bg-white/[0.02]">
          <button 
            onClick={onDownload}
            className="w-full py-4 rounded-xl text-sm font-bold tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Download size={18} /> Download Full PDF Document
          </button>
        </div>
      </motion.div>
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
    if (e) e.preventDefault();
    setLoading(true);
    try {
      let url;
      
      if (item.file_url) {
        window.open(item.file_url, '_blank');
        setDone(true);
        setShowForm(false);
        setShowPreview(false);
        setLoading(false);
        return;
      }
      
      if (item.pack_id) {
        const res = await fetch(`${API}/api/specpacks/${item.pack_id}/download`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email || 'download@brightluxx.com', name: name || 'Resource Download', pack_id: item.pack_id }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.doc_id) {
        const res = await fetch(`${API}/api/downloads/cheatsheet/${item.doc_id}/request`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email || 'download@brightluxx.com', name: name || 'Resource Download' }),
        });
        const d = await res.json();
        url = d.download_url;
      } else if (item.bim_id) {
        const res = await fetch(`${API}/api/downloads/bim/${item.bim_id}/request`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email || 'download@brightluxx.com', name: name || 'Resource Download' }),
        });
        const d = await res.json();
        url = d.download_url;
      }
      if (url) {
        window.open(`${API}${url}`, '_blank');
        setDone(true);
        setShowForm(false);
        setShowPreview(false);
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm flex items-center gap-2 text-white text-xs font-bold tracking-wider">
              <Eye size={14} /> Preview Document
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
                  {loading ? 'Preparing...' : <><Download size={12} /> Download</>}
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
        <PreviewModal 
          item={item} 
          onClose={() => setShowPreview(false)} 
          onDownload={() => { setShowPreview(false); setShowForm(true); }}
        />
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
        title="LED Display Specification Resources | Spec Sheets, BIM Files Dubai"
        description="Download LED display spec packs, cheat sheets, BIM/CAD files, and technical guides. Free resources for architects, consultants & contractors in UAE & GCC."
        path="/resources"
        keywords="LED display spec sheets, video wall specifications, BIM files LED, technical guides, download PDF, Dubai architects"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: null }
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "LED Display Specification Resources",
          "description": "Downloadable spec packs, cheat sheets, BIM references, and technical guides for LED display specifiers",
          "url": "https://brightluxx.com/resources",
          "provider": { "@type": "Organization", "name": "Brightluxx" }
        }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Resources', path: null }]} className="text-gray-500 mb-8" />
          
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
                style={{ paddingLeft: '48px' }}
                className="w-full pr-12 py-4 rounded-xl text-sm bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all"
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
                <FadeInSection key={item.id} delay={3 + i * 0.3}>
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
          <FadeInSection delay={filtered.length > 0 ? Math.min(filtered.length + 4, 10) : 5}>
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
