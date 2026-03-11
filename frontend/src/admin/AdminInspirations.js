import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { ImageUploader } from './ImageUploader';
import { Plus, Search, Pencil, Trash2, X, Save, Star, Download } from 'lucide-react';

const EMPTY = { title: '', category: '', description: '', image_url: '', featured: false, status: 'published' };

export default function AdminInspirations() {
  const { api } = useAdmin();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 30 };
      if (search) params.search = search;
      const res = await api().get('/api/admin/inspirations', { params });
      setItems(res.data.inspirations); setTotal(res.data.total);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [api, page, search]);

  useEffect(() => { fetch_(); }, [fetch_]);

  const openNew = () => { setForm({...EMPTY}); setEditing('new'); };
  const openEdit = (item) => {
    setForm({ title: item.title || '', category: item.category || '', description: item.description || '', image_url: item.image_url || '', featured: !!item.featured, status: item.status || 'published' });
    setEditing(item.id);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing === 'new') await api().post('/api/admin/inspirations', form);
      else await api().put(`/api/admin/inspirations/${editing}`, form);
      setEditing(null); fetch_();
    } catch (e) { alert(e.response?.data?.detail || 'Error'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await api().delete(`/api/admin/inspirations/${id}`); fetch_(); } catch (e) { alert('Error'); }
  };

  const handleExport = async () => {
    try {
      const res = await api().get('/api/admin/export/inspirations');
      const blob = new Blob([JSON.stringify(res.data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'inspirations_export.json'; a.click();
    } catch (e) { alert('Export error'); }
  };

  return (
    <div className="p-6 lg:p-8" data-testid="admin-inspirations-page">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div><h1 className="text-lg font-bold tracking-wider">Inspirations</h1><p className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider">{total} total</p></div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-glass px-4 py-2 text-xs flex items-center gap-2"><Download size={14} /> Export</button>
          <button onClick={openNew} className="btn-gold px-4 py-2 text-xs flex items-center gap-2" data-testid="admin-add-inspiration-button"><Plus size={14} /> Add Inspiration</button>
        </div>
      </div>

      <div className="mb-6"><div className="relative max-w-md"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" /><input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] pl-9 pr-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200" data-testid="admin-inspirations-search" /></div></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array.from({length: 6}).map((_, i) => <div key={i} className="glass-panel h-48 animate-pulse" />) :
        items.length === 0 ? <div className="col-span-full text-center py-12 text-xs text-[var(--blx-muted)] tracking-wider">No inspirations found</div> :
        items.map(item => (
          <div key={item.id} className="glass-panel overflow-hidden group" data-testid={`admin-inspiration-card-${item.id}`}>
            {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover" />}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="category-badge text-[0.5rem]">{item.category}</span>
                {item.featured && <Star size={12} className="text-[var(--blx-gold-3)]" fill="currentColor" />}
              </div>
              <h3 className="text-xs font-bold tracking-wider mb-1">{item.title}</h3>
              <p className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider line-clamp-2">{item.description}</p>
              <div className="flex gap-1 mt-3">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-200"><Pencil size={14} className="text-[var(--blx-muted)]" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-[rgba(220,38,38,0.08)] transition-colors duration-200"><Trash2 size={14} className="text-[var(--blx-muted)]" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="admin-inspiration-modal">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setEditing(null)} />
          <div className="relative glass-panel w-full max-w-lg shadow-2xl my-auto max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--blx-border)] flex-shrink-0">
              <h2 className="text-sm font-bold tracking-wider">{editing === 'new' ? 'New Inspiration' : 'Edit Inspiration'}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)]" data-testid="admin-inspiration-modal-close"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div><label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Title*</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-luxury w-full py-2 text-xs" data-testid="admin-inspiration-title-input" /></div>
              <div><label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Category*</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. retail, corporate" className="input-luxury w-full py-2 text-xs" data-testid="admin-inspiration-category-input" /></div>
              <div><label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="input-luxury w-full py-2 text-xs resize-y" /></div>
              <ImageUploader value={form.image_url} onChange={(url) => setForm({...form, image_url: url})} label="Image" />
              <label className="flex items-center gap-2 cursor-pointer text-xs tracking-wider"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-[var(--blx-gold-3)]" /><Star size={14} /> Featured</label>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--blx-border)] flex-shrink-0">
              <button onClick={() => setEditing(null)} className="btn-glass px-6 py-2.5 text-xs">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.category} className="btn-gold px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50" data-testid="admin-inspiration-save-button"><Save size={14} /> {saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
