import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, FileText, Layers, Box, BookOpen, Check, X, Search, Filter, Upload, File, ExternalLink } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

const CATEGORIES = [
  { id: 'specpack', label: 'Spec Pack', icon: FileText },
  { id: 'cheatsheet', label: 'Cheat Sheet', icon: Layers },
  { id: 'bim', label: 'BIM / CAD', icon: Box },
  { id: 'guide', label: 'Knowledge Base', icon: BookOpen },
];

const CAT_ICONS = { specpack: FileText, cheatsheet: Layers, bim: Box, guide: BookOpen };

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'specpack',
    tags: '',
    pack_id: '',
    doc_id: '',
    bim_id: '',
    link: '',
    file_url: '',
    is_active: true,
    order: 0,
  });

  const token = localStorage.getItem('blx_admin_token');

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setResources(data.resources || []);
      setCounts(data.counts || {});
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openCreateModal = () => {
    setEditingResource(null);
    setForm({
      title: '',
      description: '',
      category: 'specpack',
      tags: '',
      pack_id: '',
      doc_id: '',
      bim_id: '',
      link: '',
      file_url: '',
      is_active: true,
      order: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setForm({
      title: resource.title || '',
      description: resource.description || '',
      category: resource.category || 'specpack',
      tags: (resource.tags || []).join(', '),
      pack_id: resource.pack_id || '',
      doc_id: resource.doc_id || '',
      bim_id: resource.bim_id || '',
      link: resource.link || '',
      file_url: resource.file_url || '',
      is_active: resource.is_active !== false,
      order: resource.order || 0,
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API}/api/admin/resources/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, file_url: data.file_url });
        alert(`File uploaded successfully: ${file.name}`);
      } else {
        alert(data.detail || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      pack_id: form.pack_id || null,
      doc_id: form.doc_id || null,
      bim_id: form.bim_id || null,
      link: form.link || null,
      file_url: form.file_url || null,
      is_active: form.is_active,
      order: parseInt(form.order) || 0,
    };

    try {
      const url = editingResource
        ? `${API}/api/admin/resources/${editingResource.id}`
        : `${API}/api/admin/resources`;
      const method = editingResource ? 'PUT' : 'POST';

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
        fetchResources();
      }
    } catch (err) {
      console.error('Failed to save resource:', err);
    }
    setSaving(false);
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;

    try {
      const res = await fetch(`${API}/api/admin/resources/${resourceId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchResources();
      }
    } catch (err) {
      console.error('Failed to delete resource:', err);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm('This will seed default resources. Continue?')) return;

    try {
      const res = await fetch(`${API}/api/admin/resources/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      fetchResources();
    } catch (err) {
      console.error('Failed to seed resources:', err);
    }
  };

  const toggleActive = async (resource) => {
    try {
      await fetch(`${API}/api/admin/resources/${resource.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: !resource.is_active }),
      });
      fetchResources();
    } catch (err) {
      console.error('Failed to toggle resource:', err);
    }
  };

  const filteredResources = resources.filter(r => {
    if (filterCat !== 'all' && r.category !== filterCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6" data-testid="admin-resources-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Resource Library</h1>
          <p className="text-sm text-[var(--blx-muted)] mt-1">
            Manage spec packs, cheat sheets, BIM references, and knowledge base guides
          </p>
        </div>
        <div className="flex gap-2">
          {counts.all === 0 && (
            <button
              onClick={handleSeed}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              data-testid="seed-resources-btn"
            >
              Seed Default Resources
            </button>
          )}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="add-resource-btn"
          >
            <Plus size={16} /> Add Resource
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-[var(--blx-gold-3)]">{counts.all || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Total</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{counts.active || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Active</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{counts.inactive || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Inactive</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.specpack || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Spec Packs</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.cheatsheet || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Cheat Sheets</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.bim || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">BIM / CAD</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-2xl font-bold">{counts.guide || 0}</div>
          <div className="text-xs text-[var(--blx-muted)]">Guides</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-[var(--blx-bg-raised)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
            data-testid="search-resources"
          />
        </div>
        <div className="flex gap-2">
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
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterCat === cat.id ? 'bg-[var(--blx-gold-3)] text-black' : 'bg-[var(--blx-bg-raised)] border border-[var(--blx-border)]'
              }`}
            >
              <cat.icon size={12} /> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Table */}
      {loading ? (
        <div className="text-center py-12 text-[var(--blx-muted)]">Loading...</div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 glass-panel">
          <FileText size={40} className="mx-auto mb-4 text-[var(--blx-muted)]" />
          <p className="text-[var(--blx-muted)]">No resources found</p>
          {counts.all === 0 && (
            <button onClick={handleSeed} className="mt-4 text-[var(--blx-gold-3)] text-sm hover:underline">
              Seed default resources
            </button>
          )}
        </div>
      ) : (
        <div className="glass-panel overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-border)]">
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">RESOURCE</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">CATEGORY</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">TAGS</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">STATUS</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">ORDER</th>
                <th className="px-4 py-3 text-right text-xs font-bold tracking-wider text-[var(--blx-muted)]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource) => {
                const Icon = CAT_ICONS[resource.category] || FileText;
                return (
                  <tr key={resource.id} className="border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(229,197,116,0.1)]">
                          <Icon size={14} className="text-[var(--blx-gold-3)]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">
                            {resource.title}
                            {resource.file_url && (
                              <a 
                                href={resource.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[var(--blx-gold-3)] hover:text-[var(--blx-gold-2)]"
                                title="View uploaded file"
                              >
                                <File size={12} />
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-[var(--blx-muted)] truncate max-w-[300px]">{resource.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.05)]">
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(resource.tags || []).slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.03)] text-[var(--blx-muted)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(resource)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          resource.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                        title={resource.is_active ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                      >
                        {resource.is_active ? <Check size={12} /> : <X size={12} />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[var(--blx-muted)]">
                      {resource.order}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(resource)}
                          className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                          title="Edit"
                          data-testid={`edit-resource-${resource.id}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-red-400"
                          title="Delete"
                          data-testid={`delete-resource-${resource.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--blx-bg-raised)] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--blx-border)]">
              <h2 className="text-lg font-bold">{editingResource ? 'Edit Resource' : 'Add New Resource'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  data-testid="resource-title-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none"
                  data-testid="resource-description-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="resource-category-select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                    data-testid="resource-order-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Technology, Comparison, UAE"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  data-testid="resource-tags-input"
                />
              </div>

              {/* Category-specific fields */}
              {form.category === 'specpack' && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Pack ID (for download)</label>
                  <input
                    type="text"
                    value={form.pack_id}
                    onChange={(e) => setForm({ ...form, pack_id: e.target.value })}
                    placeholder="e.g., cob-mip-smd"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              )}

              {form.category === 'cheatsheet' && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Doc ID (for download)</label>
                  <input
                    type="text"
                    value={form.doc_id}
                    onChange={(e) => setForm({ ...form, doc_id: e.target.value })}
                    placeholder="e.g., pixel-pitch-cheatsheet"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              )}

              {form.category === 'bim' && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">BIM ID (for download)</label>
                  <input
                    type="text"
                    value={form.bim_id}
                    onChange={(e) => setForm({ ...form, bim_id: e.target.value })}
                    placeholder="e.g., all-in-one-dvled"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              )}

              {form.category === 'guide' && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Link (internal page path)</label>
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="e.g., /knowledge/pixel-pitch-guide"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              )}

              {/* File Upload Section */}
              {form.category !== 'guide' && (
                <div className="border border-dashed border-[var(--blx-border)] rounded-lg p-4">
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">
                    Upload Document (PDF, DOC, DOCX, XLS, XLSX, ZIP)
                  </label>
                  
                  {form.file_url ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(229,197,116,0.1)] border border-[rgba(229,197,116,0.2)]">
                      <File size={20} className="text-[var(--blx-gold-3)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">File uploaded</p>
                        <a 
                          href={form.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--blx-gold-3)] hover:underline flex items-center gap-1"
                        >
                          View file <ExternalLink size={10} />
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, file_url: '' })}
                        className="p-1 rounded hover:bg-[rgba(255,255,255,0.1)]"
                        title="Remove file"
                      >
                        <X size={14} className="text-[var(--blx-muted)]" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                        className="hidden"
                        data-testid="resource-file-input"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                        data-testid="resource-upload-btn"
                      >
                        {uploading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[var(--blx-gold-3)] border-t-transparent rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={14} /> Choose File
                          </>
                        )}
                      </button>
                      <p className="text-[0.65rem] text-[var(--blx-muted)]">
                        Or enter document ID above for existing files
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="is_active" className="text-sm">Active (visible on website)</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
                  data-testid="save-resource-btn"
                >
                  {saving ? 'Saving...' : editingResource ? 'Update Resource' : 'Create Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
