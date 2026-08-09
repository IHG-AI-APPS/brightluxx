import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { Search, Sparkles, ChevronDown, ChevronUp, Save, RefreshCw, AlertCircle, CheckCircle, XCircle, Loader2, Filter, Zap, BarChart3, Globe, FileText, Tag, Image } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

function ScoreBadge({ score }) {
  const color = score >= 70 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : score >= 40 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20';
  const icon = score >= 70 ? <CheckCircle size={12} /> : score >= 40 ? <AlertCircle size={12} /> : <XCircle size={12} />;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold tracking-wider border ${color}`} data-testid="seo-score-badge">
      {icon} {score}/100
    </span>
  );
}

function ScoreBar({ score }) {
  const color = score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
    </div>
  );
}

function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null;
  return (
    <div className="grid grid-cols-5 gap-2 mt-3">
      {Object.entries(breakdown).map(([key, val]) => (
        <div key={key} className="text-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-[0.55rem] font-bold tracking-widest text-[var(--blx-muted)] uppercase mb-1">{key.replace('_', ' ')}</div>
          <div className={`text-sm font-bold ${val.score >= val.max * 0.7 ? 'text-emerald-400' : val.score >= val.max * 0.4 ? 'text-amber-400' : 'text-red-400'}`}>
            {val.score}/{val.max}
          </div>
          <div className="text-[0.5rem] text-[var(--blx-muted)] mt-0.5 leading-tight">{val.tip}</div>
        </div>
      ))}
    </div>
  );
}

function PageEditor({ page, token, onSave, onClose }) {
  const [form, setForm] = useState({
    meta_title: page.meta_title || '',
    meta_description: page.meta_description || '',
    keywords: (page.keywords || []).join(', '),
    image_alt: page.image_alt || '',
    og_title: page.og_title || '',
    og_description: page.og_description || '',
    canonical_url: page.canonical_url || '',
    schema_type: page.schema_type || 'WebPage',
    noindex: page.noindex || false,
  });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genField, setGenField] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        ...form,
        keywords: form.keywords ? form.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
      };
      const res = await fetch(`${API}/api/admin/seo/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      onSave(data);
    } finally {
      setSaving(false);
    }
  };

  const handleAIGenerate = async (fields = null) => {
    const targetFields = fields || ['meta_title', 'meta_description', 'keywords', 'image_alt', 'og_title', 'og_description'];
    setGenerating(true);
    if (fields?.length === 1) setGenField(fields[0]);
    else setGenField('all');
    try {
      const res = await fetch(`${API}/api/admin/seo/ai-generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ page_id: page.id, fields: targetFields }),
      });
      const data = await res.json();
      if (data.generated) {
        const g = data.generated;
        setForm(prev => {
          const updated = { ...prev };
          if ('meta_title' in g) updated.meta_title = g.meta_title;
          if ('meta_description' in g) updated.meta_description = g.meta_description;
          if ('keywords' in g) updated.keywords = Array.isArray(g.keywords) ? g.keywords.join(', ') : g.keywords;
          if ('image_alt' in g) updated.image_alt = g.image_alt;
          if ('og_title' in g) updated.og_title = g.og_title;
          if ('og_description' in g) updated.og_description = g.og_description;
          return updated;
        });
        if (data.page) onSave(data.page);
      }
    } finally {
      setGenerating(false);
      setGenField(null);
    }
  };

  const charCount = (val, min, max) => {
    const len = val.length;
    const color = len >= min && len <= max ? 'text-emerald-400' : len > 0 ? 'text-amber-400' : 'text-red-400';
    return <span className={`text-[0.55rem] font-mono ${color}`}>{len} / {min}-{max}</span>;
  };

  const fieldLabel = (label, icon, fieldName, min, max, value) => (
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-[0.6rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] uppercase flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="flex items-center gap-2">
        {min && max && charCount(value, min, max)}
        <button
          onClick={() => handleAIGenerate([fieldName])}
          disabled={generating}
          className="text-[0.55rem] font-bold tracking-wider text-cyan-400 hover:text-cyan-300 disabled:opacity-30 flex items-center gap-1"
          data-testid={`ai-gen-${fieldName}`}
        >
          {generating && genField === fieldName ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />} AI
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto pb-8" onClick={onClose}>
      <div className="w-full max-w-3xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} data-testid="seo-editor-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold tracking-wider">{page.name}</h3>
            <p className="text-[0.6rem] text-[var(--blx-muted)] tracking-wider mt-0.5">{page.path}</p>
          </div>
          <div className="flex items-center gap-3">
            <ScoreBadge score={page.score} />
            <button
              onClick={() => handleAIGenerate()}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-xs font-bold tracking-wider text-cyan-300 hover:from-cyan-500/30 hover:to-violet-500/30 disabled:opacity-30 transition-all"
              data-testid="ai-generate-all-btn"
            >
              {generating && genField === 'all' ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              AI Generate All
            </button>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="px-5 pt-3">
          <ScoreBreakdown breakdown={page.score_breakdown} />
        </div>

        {/* Fields */}
        <div className="p-5 space-y-4">
          {/* Meta Title */}
          <div>
            {fieldLabel('Meta Title', <FileText size={10} />, 'meta_title', 50, 60, form.meta_title)}
            <input
              value={form.meta_title}
              onChange={e => setForm(p => ({ ...p, meta_title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
              placeholder="Page Title — Brightluxx | LED Display Solutions"
              data-testid="seo-meta-title-input"
            />
          </div>

          {/* Meta Description */}
          <div>
            {fieldLabel('Meta Description', <FileText size={10} />, 'meta_description', 150, 160, form.meta_description)}
            <textarea
              value={form.meta_description}
              onChange={e => setForm(p => ({ ...p, meta_description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
              placeholder="Compelling description with keywords and call-to-action..."
              data-testid="seo-meta-desc-input"
            />
          </div>

          {/* Keywords */}
          <div>
            {fieldLabel('Keywords', <Tag size={10} />, 'keywords', null, null, '')}
            <input
              value={form.keywords}
              onChange={e => setForm(p => ({ ...p, keywords: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
              placeholder="LED display Dubai, MicroLED solutions, digital signage UAE..."
              data-testid="seo-keywords-input"
            />
            <p className="text-[0.5rem] text-[var(--blx-muted)] mt-1">Comma-separated. Aim for 5-7 keywords.</p>
          </div>

          {/* Image Alt Text */}
          <div>
            {fieldLabel('Hero Image Alt Text', <Image size={10} />, 'image_alt', 10, 125, form.image_alt)}
            <input
              value={form.image_alt}
              onChange={e => setForm(p => ({ ...p, image_alt: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
              placeholder="Descriptive alt text for the page hero image..."
              data-testid="seo-image-alt-input"
            />
          </div>

          {/* OG Title & Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              {fieldLabel('OG Title', <Globe size={10} />, 'og_title', 50, 60, form.og_title)}
              <input
                value={form.og_title}
                onChange={e => setForm(p => ({ ...p, og_title: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
                placeholder="Social-optimized title..."
                data-testid="seo-og-title-input"
              />
            </div>
            <div>
              {fieldLabel('OG Description', <Globe size={10} />, 'og_description', 100, 120, form.og_description)}
              <input
                value={form.og_description}
                onChange={e => setForm(p => ({ ...p, og_description: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
                placeholder="Engaging social share description..."
                data-testid="seo-og-desc-input"
              />
            </div>
          </div>

          {/* Advanced */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5">
            <div>
              <label className="text-[0.6rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] uppercase block mb-1.5">Canonical URL</label>
              <input
                value={form.canonical_url}
                onChange={e => setForm(p => ({ ...p, canonical_url: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs focus:border-cyan-500/50 focus:outline-none"
                placeholder="https://brightluxx.com/..."
              />
            </div>
            <div>
              <label className="text-[0.6rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] uppercase block mb-1.5">Schema Type</label>
              <select
                value={form.schema_type}
                onChange={e => setForm(p => ({ ...p, schema_type: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs focus:border-cyan-500/50 focus:outline-none"
              >
                <option value="WebPage">WebPage</option>
                <option value="Product">Product</option>
                <option value="FAQPage">FAQPage</option>
                <option value="Article">Article</option>
                <option value="Organization">Organization</option>
                <option value="ContactPage">ContactPage</option>
                <option value="CollectionPage">CollectionPage</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.noindex} onChange={e => setForm(p => ({ ...p, noindex: e.target.checked }))} className="rounded" />
                <span className="text-xs text-[var(--blx-muted)]">noindex</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-white/10 text-xs font-bold tracking-wider hover:bg-white/5 transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--blx-gold-3)] text-black text-xs font-bold tracking-wider hover:opacity-90 disabled:opacity-30 transition-all"
            data-testid="seo-save-btn"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSEO() {
  const { token } = useAdmin();
  const [pages, setPages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editPage, setEditPage] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('score_asc');
  const [bulkGenerating, setBulkGenerating] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pagesRes, statsRes] = await Promise.all([
        fetch(`${API}/api/admin/seo/pages`, { headers }),
        fetch(`${API}/api/admin/seo/stats`, { headers }),
      ]);
      setPages(await pagesRes.json());
      setStats(await statsRes.json());
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const categories = ['All', ...new Set(pages.map(p => p.category).filter(Boolean))];

  const filtered = pages
    .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.path.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score_asc') return a.score - b.score;
      if (sortBy === 'score_desc') return b.score - a.score;
      return a.name.localeCompare(b.name);
    });

  const handleSave = (updated) => {
    setPages(prev => prev.map(p => p.id === updated.id ? updated : p));
    setEditPage(updated);
  };

  const handleBulkGenerate = async () => {
    const lowScore = filtered.filter(p => p.score < 40).map(p => p.id);
    if (lowScore.length === 0) return;
    setBulkGenerating(true);
    try {
      await fetch(`${API}/api/admin/seo/ai-generate-bulk`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_ids: lowScore.slice(0, 10) }),
      });
      await fetchData();
    } finally {
      setBulkGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--blx-gold-3)]" />
      </div>
    );
  }

  const needsWorkCount = stats ? (stats.needs_work || 0) + (stats.missing || 0) : 0;

  return (
    <div className="p-6 max-w-[1400px] mx-auto" data-testid="admin-seo-page">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold tracking-wider" data-testid="seo-page-title">SEO Manager</h1>
          <p className="text-[0.65rem] text-[var(--blx-muted)] tracking-wider mt-1">Manage meta tags, keywords, and SEO scores for every page</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors" data-testid="seo-refresh-btn">
            <RefreshCw size={14} />
          </button>
          <button
            onClick={handleBulkGenerate}
            disabled={bulkGenerating || filtered.filter(p => p.score < 40).length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-xs font-bold tracking-wider text-cyan-300 hover:from-cyan-500/30 hover:to-violet-500/30 disabled:opacity-30 transition-all"
            data-testid="bulk-ai-generate-btn"
          >
            {bulkGenerating ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            AI Fix Low Scores
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5" data-testid="stat-total">
            <div className="text-[0.55rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1">TOTAL PAGES</div>
            <div className="text-2xl font-bold">{stats.total_pages}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5" data-testid="stat-avg-score">
            <div className="text-[0.55rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1">AVG SCORE</div>
            <div className={`text-2xl font-bold ${stats.avg_score >= 70 ? 'text-emerald-400' : stats.avg_score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>{stats.avg_score}</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10" data-testid="stat-optimized">
            <div className="text-[0.55rem] font-bold tracking-[0.2em] text-emerald-400/60 mb-1">OPTIMIZED</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.optimized}</div>
          </div>
          <div className={`p-4 rounded-xl ${needsWorkCount === 0 ? 'bg-white/[0.02] border border-white/5' : 'bg-red-500/5 border border-red-500/10'}`} data-testid="stat-needs-work">
            <div className={`text-[0.55rem] font-bold tracking-[0.2em] mb-1 ${needsWorkCount === 0 ? 'text-[var(--blx-muted)]' : 'text-red-400/60'}`}>NEEDS WORK</div>
            <div className={`text-2xl font-bold ${needsWorkCount === 0 ? '' : 'text-red-400'}`}>{needsWorkCount}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pages..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs focus:border-cyan-500/50 focus:outline-none"
            data-testid="seo-search-input"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter size={12} className="text-[var(--blx-muted)]" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-lg text-[0.6rem] font-bold tracking-wider transition-colors ${categoryFilter === cat ? 'bg-[var(--blx-gold-3)]/10 text-[var(--blx-gold-3)] border border-[var(--blx-gold-3)]/30' : 'text-[var(--blx-muted)] hover:bg-white/5 border border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[0.6rem] font-bold tracking-wider focus:outline-none"
        >
          <option value="score_asc">Score: Low to High</option>
          <option value="score_desc">Score: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Page List */}
      <div className="space-y-1.5" data-testid="seo-pages-list">
        {filtered.map(page => (
          <div
            key={page.id}
            onClick={() => setEditPage(page)}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all group"
            data-testid={`seo-page-row-${page.path.replace(/\//g, '-')}`}
          >
            <div className="flex-shrink-0">
              <ScoreBadge score={page.score} />
            </div>
            <div className="w-28 flex-shrink-0">
              <ScoreBar score={page.score} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider truncate">{page.name}</span>
                <span className="text-[0.5rem] text-[var(--blx-muted)] tracking-wider px-2 py-0.5 rounded bg-white/5">{page.category}</span>
              </div>
              <div className="text-[0.55rem] text-[var(--blx-muted)] tracking-wider truncate mt-0.5">{page.path}</div>
            </div>
            <div className="flex-1 min-w-0 hidden lg:block">
              <div className="text-[0.6rem] text-[var(--blx-text-2)] truncate">{page.meta_title || '—'}</div>
              <div className="text-[0.5rem] text-[var(--blx-muted)] truncate mt-0.5">{page.meta_description?.slice(0, 80) || 'No description'}...</div>
            </div>
            <div className="hidden md:flex items-center gap-1 flex-wrap max-w-[200px]">
              {(page.keywords || []).slice(0, 3).map((kw, i) => (
                <span key={i} title={kw} className="text-[0.5rem] px-1.5 py-0.5 rounded bg-white/5 text-[var(--blx-muted)] truncate max-w-[80px]">{kw}</span>
              ))}
              {(page.keywords || []).length > 3 && <span title={page.keywords.slice(3).join(', ')} className="text-[0.5rem] text-[var(--blx-muted)]">+{page.keywords.length - 3}</span>}
            </div>
            <ChevronDown size={14} className="text-[var(--blx-muted)] group-hover:text-white transition-colors" />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--blx-muted)]">
          <BarChart3 size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-xs tracking-wider">No pages found</p>
        </div>
      )}

      {/* Editor Modal */}
      {editPage && (
        <PageEditor
          page={editPage}
          token={token}
          onSave={handleSave}
          onClose={() => setEditPage(null)}
        />
      )}
    </div>
  );
}
