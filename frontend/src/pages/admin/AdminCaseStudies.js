import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Search, Upload, Image, X, ExternalLink, MapPin, Calendar, Cpu, Building2 } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

const CATEGORIES = [
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'retail', label: 'Retail' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'transport', label: 'Transport' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'healthcare', label: 'Healthcare' },
];

const TECHNOLOGIES = [
  { id: 'microled', label: 'MicroLED' },
  { id: 'cob-led', label: 'COB LED' },
  { id: 'fine-pitch-led', label: 'Fine Pitch LED' },
  { id: 'creative-led', label: 'Creative LED' },
  { id: 'transparent-led', label: 'Transparent LED' },
  { id: 'all-in-one-dvled', label: 'All-in-One dvLED' },
  { id: '3d-anamorphic-led', label: '3D Anamorphic LED' },
];

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState('hero');
  const fileInputRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'hospitality',
    location: '',
    year: new Date().getFullYear().toString(),
    client: '',
    consultant: '',
    contractor: '',
    hero_image: '',
    thumbnail: '',
    technology: 'MicroLED',
    tech_id: 'microled',
    pixel_pitch: '',
    display_size: '',
    challenge: '',
    solution: '',
    results: [''],
    specs: [['', '']],
    tags: '',
    is_published: true,
    featured: false,
  });

  const token = localStorage.getItem('blx_admin_token');

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/case-studies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCaseStudies(data.case_studies || []);
      setCounts(data.counts || {});
    } catch (err) {
      console.error('Failed to fetch case studies:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const openCreateModal = () => {
    setEditingCase(null);
    setForm({
      title: '',
      slug: '',
      category: 'hospitality',
      location: '',
      year: new Date().getFullYear().toString(),
      client: '',
      consultant: '',
      contractor: '',
      hero_image: '',
      thumbnail: '',
      technology: 'MicroLED',
      tech_id: 'microled',
      pixel_pitch: '',
      display_size: '',
      challenge: '',
      solution: '',
      results: [''],
      specs: [['', '']],
      tags: '',
      is_published: true,
      featured: false,
    });
    setShowModal(true);
  };

  const openEditModal = (cs) => {
    setEditingCase(cs);
    setForm({
      title: cs.title || '',
      slug: cs.slug || '',
      category: cs.category || 'hospitality',
      location: cs.location || '',
      year: cs.year || new Date().getFullYear().toString(),
      client: cs.client || '',
      consultant: cs.consultant || '',
      contractor: cs.contractor || '',
      hero_image: cs.hero_image || '',
      thumbnail: cs.thumbnail || '',
      technology: cs.technology || 'MicroLED',
      tech_id: cs.tech_id || 'microled',
      pixel_pitch: cs.pixel_pitch || '',
      display_size: cs.display_size || '',
      challenge: cs.challenge || '',
      solution: cs.solution || '',
      results: cs.results?.length ? cs.results : [''],
      specs: cs.specs?.length ? cs.specs : [['', '']],
      tags: (cs.tags || []).join(', '),
      is_published: cs.is_published !== false,
      featured: cs.featured || false,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API}/api/admin/case-studies/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert(errData.detail || `Upload failed (HTTP ${res.status})`);
        setUploading(false);
        return;
      }
      const data = await res.json();
      if (data.success && data.image_url) {
        if (uploadType === 'hero') {
          setForm({ ...form, hero_image: data.image_url });
        } else {
          setForm({ ...form, thumbnail: data.image_url });
        }
      } else {
        alert(data.detail || 'Upload completed but no URL returned');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please check your connection and try again.');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addResult = () => {
    setForm({ ...form, results: [...form.results, ''] });
  };

  const updateResult = (index, value) => {
    const newResults = [...form.results];
    newResults[index] = value;
    setForm({ ...form, results: newResults });
  };

  const removeResult = (index) => {
    setForm({ ...form, results: form.results.filter((_, i) => i !== index) });
  };

  const addSpec = () => {
    setForm({ ...form, specs: [...form.specs, ['', '']] });
  };

  const updateSpec = (index, field, value) => {
    const newSpecs = [...form.specs];
    newSpecs[index][field] = value;
    setForm({ ...form, specs: newSpecs });
  };

  const removeSpec = (index) => {
    setForm({ ...form, specs: form.specs.filter((_, i) => i !== index) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      category: form.category,
      location: form.location,
      year: form.year,
      client: form.client,
      consultant: form.consultant,
      contractor: form.contractor,
      hero_image: form.hero_image || null,
      thumbnail: form.thumbnail || null,
      technology: form.technology,
      tech_id: form.tech_id,
      pixel_pitch: form.pixel_pitch,
      display_size: form.display_size,
      challenge: form.challenge,
      solution: form.solution,
      results: form.results.filter(r => r.trim()),
      specs: form.specs.filter(s => s[0].trim() && s[1].trim()),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      is_published: form.is_published,
      featured: form.featured,
    };

    try {
      const url = editingCase
        ? `${API}/api/admin/case-studies/${editingCase.id}`
        : `${API}/api/admin/case-studies`;
      const method = editingCase ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchCaseStudies();
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to save');
      }
    } catch (err) {
      console.error('Failed to save case study:', err);
    }
    setSaving(false);
  };

  const handleDelete = async (caseId) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;

    try {
      const res = await fetch(`${API}/api/admin/case-studies/${caseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchCaseStudies();
      }
    } catch (err) {
      console.error('Failed to delete case study:', err);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm('This will seed existing case studies data. Continue?')) return;

    try {
      const res = await fetch(`${API}/api/admin/case-studies/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      fetchCaseStudies();
    } catch (err) {
      console.error('Failed to seed case studies:', err);
    }
  };

  const togglePublished = async (cs) => {
    try {
      await fetch(`${API}/api/admin/case-studies/${cs.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_published: !cs.is_published }),
      });
      fetchCaseStudies();
    } catch (err) {
      console.error('Failed to toggle case study:', err);
    }
  };

  const toggleFeatured = async (cs) => {
    try {
      await fetch(`${API}/api/admin/case-studies/${cs.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !cs.featured }),
      });
      fetchCaseStudies();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const filteredCaseStudies = caseStudies.filter(cs => {
    if (filterCat !== 'all' && cs.category !== filterCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return cs.title.toLowerCase().includes(q) || cs.client?.toLowerCase().includes(q) || cs.location?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6" data-testid="admin-case-studies-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Case Studies</h1>
          <p className="text-sm text-[var(--blx-muted)] mt-1">
            Manage project case studies and portfolio
          </p>
        </div>
        <div className="flex gap-2">
          {counts.total === 0 && (
            <button
              onClick={handleSeed}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              data-testid="seed-case-studies-btn"
            >
              Load Existing Data
            </button>
          )}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="add-case-study-btn"
          >
            <Plus size={16} /> New Case Study
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-[var(--blx-gold-3)]">{counts.total || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Total</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{counts.published || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Published</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{counts.drafts || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Drafts</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{counts.featured || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Featured</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.hospitality || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Hospitality</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.retail || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Retail</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-4 py-2 rounded-lg text-sm blx-search-input-sm bg-[var(--blx-bg-raised)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
            data-testid="search-case-studies"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCat('all')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              filterCat === 'all' ? 'bg-[var(--blx-gold-3)] text-black' : 'bg-[var(--blx-bg-raised)] border border-[var(--blx-border)]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filterCat === cat.id ? 'bg-[var(--blx-gold-3)] text-black' : 'bg-[var(--blx-bg-raised)] border border-[var(--blx-border)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      {loading ? (
        <div className="text-center py-12 text-[var(--blx-muted)]">Loading...</div>
      ) : filteredCaseStudies.length === 0 ? (
        <div className="text-center py-12 glass-panel">
          <Building2 size={40} className="mx-auto mb-4 text-[var(--blx-muted)]" />
          <p className="text-[var(--blx-muted)]">No case studies found</p>
          {counts.total === 0 && (
            <button onClick={handleSeed} className="mt-4 text-[var(--blx-gold-3)] text-sm hover:underline">
              Load existing data
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCaseStudies.map((cs) => (
            <div key={cs.id} className="glass-panel overflow-hidden" data-testid={`case-study-card-${cs.id}`}>
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-32 h-32 flex-shrink-0 bg-[rgba(255,255,255,0.05)]">
                  {cs.thumbnail ? (
                    <img src={cs.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image size={24} className="text-[var(--blx-muted)]" />
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold tracking-wider truncate">{cs.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => togglePublished(cs)}
                        className={`p-1 rounded ${cs.is_published ? 'text-emerald-400' : 'text-amber-400'}`}
                        title={cs.is_published ? 'Published' : 'Draft'}
                      >
                        {cs.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => toggleFeatured(cs)}
                        className={`p-1 rounded ${cs.featured ? 'text-purple-400' : 'text-[var(--blx-muted)]'}`}
                        title={cs.featured ? 'Featured' : 'Not featured'}
                      >
                        <Star size={14} fill={cs.featured ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.625rem] text-[var(--blx-muted)] mb-2">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {cs.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {cs.year}</span>
                    <span className="flex items-center gap-1"><Cpu size={10} /> {cs.technology}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.5rem] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)]">{cs.category}</span>
                    <span className="text-[0.5rem] text-[var(--blx-muted)]">{cs.pixel_pitch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {cs.is_published && (
                      <a
                        href={`/case-studies/${cs.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.625rem] text-[var(--blx-gold-3)] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={10} /> View
                      </a>
                    )}
                    <button
                      onClick={() => openEditModal(cs)}
                      className="text-[0.625rem] text-[var(--blx-text-2)] hover:text-[var(--blx-gold-3)] flex items-center gap-1"
                    >
                      <Pencil size={10} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
                      className="text-[0.625rem] text-[var(--blx-text-2)] hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 size={10} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[var(--blx-bg-raised)] rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col my-auto">
            <div className="p-6 border-b border-[var(--blx-border)] flex-shrink-0">
              <h2 className="text-lg font-bold">{editingCase ? 'Edit Case Study' : 'Create New Case Study'}</h2>
            </div>
            <form id="case-study-form" onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Images */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Hero Image</label>
                  {form.hero_image ? (
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <img src={form.hero_image} alt="Hero" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, hero_image: '' })}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-32 border border-dashed border-[var(--blx-border)] rounded-lg flex items-center justify-center">
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      <button
                        type="button"
                        onClick={() => { setUploadType('hero'); fileInputRef.current?.click(); }}
                        disabled={uploading}
                        className="text-xs text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                      >
                        {uploading ? 'Uploading...' : 'Upload Hero'}
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Thumbnail</label>
                  {form.thumbnail ? (
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <img src={form.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, thumbnail: '' })}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-32 border border-dashed border-[var(--blx-border)] rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => { setUploadType('thumbnail'); fileInputRef.current?.click(); }}
                        disabled={uploading}
                        className="text-xs text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                      >
                        {uploading ? 'Uploading...' : 'Upload Thumbnail'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              </div>

              {/* Category, Location, Year */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                    placeholder="Dubai, UAE"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Year *</label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              </div>

              {/* Client, Consultant, Contractor */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Client *</label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Consultant</label>
                  <input
                    type="text"
                    value={form.consultant}
                    onChange={(e) => setForm({ ...form, consultant: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Contractor</label>
                  <input
                    type="text"
                    value={form.contractor}
                    onChange={(e) => setForm({ ...form, contractor: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              </div>

              {/* Technology */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Technology *</label>
                  <select
                    value={form.tech_id}
                    onChange={(e) => {
                      const tech = TECHNOLOGIES.find(t => t.id === e.target.value);
                      setForm({ ...form, tech_id: e.target.value, technology: tech?.label || e.target.value });
                    }}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  >
                    {TECHNOLOGIES.map((tech) => (
                      <option key={tech.id} value={tech.id}>{tech.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Pixel Pitch *</label>
                  <input
                    type="text"
                    value={form.pixel_pitch}
                    onChange={(e) => setForm({ ...form, pixel_pitch: e.target.value })}
                    required
                    placeholder="P1.2"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Display Size *</label>
                  <input
                    type="text"
                    value={form.display_size}
                    onChange={(e) => setForm({ ...form, display_size: e.target.value })}
                    required
                    placeholder="12m x 3.5m (42 sqm)"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              </div>

              {/* Challenge & Solution */}
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Challenge *</label>
                <textarea
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Solution *</label>
                <textarea
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none"
                />
              </div>

              {/* Results */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-[var(--blx-muted)]">Results & Impact</label>
                  <button type="button" onClick={addResult} className="text-xs text-[var(--blx-gold-3)]">+ Add Result</button>
                </div>
                <div className="space-y-2">
                  {form.results.map((result, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={result}
                        onChange={(e) => updateResult(i, e.target.value)}
                        placeholder="Result statement..."
                        className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                      />
                      {form.results.length > 1 && (
                        <button type="button" onClick={() => removeResult(i)} className="p-2 text-red-400">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-[var(--blx-muted)]">Technical Specifications</label>
                  <button type="button" onClick={addSpec} className="text-xs text-[var(--blx-gold-3)]">+ Add Spec</button>
                </div>
                <div className="space-y-2">
                  {form.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={spec[0]}
                        onChange={(e) => updateSpec(i, 0, e.target.value)}
                        placeholder="Label"
                        className="w-1/3 px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                      />
                      <input
                        type="text"
                        value={spec[1]}
                        onChange={(e) => updateSpec(i, 1, e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                      />
                      {form.specs.length > 1 && (
                        <button type="button" onClick={() => removeSpec(i)} className="p-2 text-red-400">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="luxury, 5-star, lobby"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                />
              </div>

              {/* Publish options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>
            </form>
            <div className="flex gap-3 p-6 border-t border-[var(--blx-border)] flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="case-study-form"
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
              >
                {saving ? 'Saving...' : editingCase ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
