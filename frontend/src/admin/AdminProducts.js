import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { ImageUploader, GalleryUploader } from './ImageUploader';
import { Plus, Search, Pencil, Trash2, X, Save, Star, TrendingUp, Zap, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const EMPTY_PRODUCT = {
  product_code: '', name: '', category: '', tagline: '', description: '',
  pixel_pitch: '', resolution: '', brightness: '', application: '',
  key_specs: [], image_url: '', gallery: [], featured: false, trending: false, new_arrival: false, status: 'published'
};

export default function AdminProducts() {
  const { api } = useAdmin();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {id:...} = edit
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (catFilter) params.category = catFilter;
      const res = await api().get('/api/admin/products', { params });
      setProducts(res.data.products);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [api, page, search, catFilter]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => {
    api().get('/api/products/categories').then(r => setCategories(r.data.categories || [])).catch(() => {});
  }, [api]);

  const openNew = () => { setForm({...EMPTY_PRODUCT}); setEditing('new'); };
  const openEdit = (p) => {
    setForm({
      product_code: p.product_code || '', name: p.name || '', category: p.category || '',
      tagline: p.tagline || '', description: p.description || '',
      pixel_pitch: p.pixel_pitch || '', resolution: p.resolution || '', brightness: p.brightness || '',
      application: p.application || '', key_specs: p.key_specs || [], image_url: p.image_url || '',
      gallery: p.gallery || [], featured: !!p.featured, trending: !!p.trending, new_arrival: !!p.new_arrival,
      status: p.status || 'published'
    });
    setEditing(p.id);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing === 'new') {
        await api().post('/api/admin/products', form);
      } else {
        await api().put(`/api/admin/products/${editing}`, form);
      }
      setEditing(null);
      fetchProducts();
    } catch (e) { alert(e.response?.data?.detail || 'Error saving'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await api().delete(`/api/admin/products/${id}`); fetchProducts(); } catch (e) { alert('Error deleting'); }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selected.length} products?`)) return;
    try { await api().post('/api/admin/products/bulk-delete', selected); setSelected([]); fetchProducts(); } catch (e) { alert('Error'); }
  };

  const handleExport = async () => {
    try {
      const res = await api().get('/api/admin/export/products');
      const blob = new Blob([JSON.stringify(res.data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'products_export.json'; a.click();
    } catch (e) { alert('Export error'); }
  };

  const addSpec = () => setForm({...form, key_specs: [...form.key_specs, { label: '', value: '' }]});
  const updateSpec = (i, field, val) => {
    const specs = [...form.key_specs];
    specs[i] = {...specs[i], [field]: val};
    setForm({...form, key_specs: specs});
  };
  const removeSpec = (i) => setForm({...form, key_specs: form.key_specs.filter((_, idx) => idx !== i)});

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === products.length ? [] : products.map(p => p.id));

  return (
    <div className="p-6 lg:p-8" data-testid="admin-products-page">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-lg font-bold tracking-wider">Products</h1>
          <p className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider">{total} total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-glass px-4 py-2 text-xs flex items-center gap-2" data-testid="admin-export-products"><Download size={14} /> Export</button>
          <button onClick={openNew} className="btn-gold px-4 py-2 text-xs flex items-center gap-2" data-testid="admin-add-product-button"><Plus size={14} /> Add Product</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--blx-muted)]" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="w-full blx-search-input-sm bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] pr-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200" data-testid="admin-products-search" />
        </div>
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }} className="bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] py-2.5 px-3 min-w-[150px] focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200" data-testid="admin-products-category-filter">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.value} value={c.value}>{c.label} ({c.count})</option>)}
        </select>
        {selected.length > 0 && (
          <button onClick={handleBulkDelete} className="px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors duration-200" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171' }} data-testid="admin-bulk-delete">
            <Trash2 size={14} className="inline mr-1" /> Delete {selected.length}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="admin-products-table">
            <thead>
              <tr className="border-b border-[var(--blx-border)]">
                <th className="p-3 text-left w-10"><input type="checkbox" checked={selected.length === products.length && products.length > 0} onChange={toggleAll} className="accent-[var(--blx-gold-3)]" /></th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Product</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Code</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Category</th>
                <th className="p-3 text-left text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Pitch</th>
                <th className="p-3 text-center text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Flags</th>
                <th className="p-3 text-right text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({length: 5}).map((_, i) => <tr key={i}><td colSpan={7} className="p-3"><div className="h-10 bg-[var(--blx-glass)] rounded animate-pulse" /></td></tr>)
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="p-12 text-center text-xs text-[var(--blx-muted)] tracking-wider">No products found</td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200" data-testid={`admin-product-row-${p.product_code}`}>
                  <td className="p-3"><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} className="accent-[var(--blx-gold-3)]" /></td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {p.image_url && <img src={p.image_url} alt={p.name} className="w-10 h-8 object-cover rounded-lg flex-shrink-0" />}
                      <div>
                        <div className="text-xs font-bold tracking-wider">{p.name}</div>
                        <div className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider truncate max-w-[200px]">{p.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><span className="category-badge text-[0.5rem]">{p.product_code}</span></td>
                  <td className="p-3 text-xs text-[var(--blx-text-2)] tracking-wider capitalize">{(p.category || '').replace(/-/g, ' ')}</td>
                  <td className="p-3 text-xs text-[var(--blx-text-2)] tracking-wider">{p.pixel_pitch}</td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {p.featured && <Star size={12} className="text-[var(--blx-gold-3)]" fill="currentColor" />}
                      {p.trending && <TrendingUp size={12} className="text-emerald-400" />}
                      {p.new_arrival && <Zap size={12} className="text-sky-400" />}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-200" data-testid={`admin-edit-${p.product_code}`}><Pencil size={14} className="text-[var(--blx-muted)]" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-[rgba(220,38,38,0.08)] transition-colors duration-200" data-testid={`admin-delete-${p.product_code}`}><Trash2 size={14} className="text-[var(--blx-muted)]" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-[var(--blx-border)]">
            <span className="text-[0.625rem] text-[var(--blx-muted)] tracking-wider">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="btn-glass px-3 py-1.5 text-xs disabled:opacity-30"><ChevronLeft size={14} /></button>
              <button disabled={page >= pages} onClick={() => setPage(p => p + 1)} className="btn-glass px-3 py-1.5 text-xs disabled:opacity-30"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto" data-testid="admin-product-modal">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setEditing(null)} />
          <div className="relative glass-panel w-full max-w-3xl shadow-2xl mb-12" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--blx-border)]">
              <h2 className="text-sm font-bold tracking-wider">{editing === 'new' ? 'New Product' : 'Edit Product'}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-200" data-testid="admin-product-modal-close"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Product Code*</label>
                  <input value={form.product_code} onChange={e => setForm({...form, product_code: e.target.value})} placeholder="BL-XXX000" className="w-full py-2 text-xs" data-testid="admin-product-code-input" />
                </div>
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Name*</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" className="w-full py-2 text-xs" data-testid="admin-product-name-input" />
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Category*</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})} 
                    className="w-full py-2 text-xs bg-[var(--blx-bg-raised)]" 
                    data-testid="admin-product-category-input"
                  >
                    <option value="">Select category...</option>
                    {categories.map(cat => (
                      <option key={cat.value || cat} value={cat.value || cat}>
                        {cat.label || (typeof cat === 'string' ? cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : cat)}
                      </option>
                    ))}
                    <option value="__new__">+ Add New Category</option>
                  </select>
                  {form.category === '__new__' && (
                    <input 
                      value={form.newCategory || ''} 
                      onChange={e => setForm({...form, newCategory: e.target.value, category: e.target.value ? e.target.value : '__new__'})}
                      placeholder="Enter new category (e.g. cob-microled)"
                      className="w-full py-2 text-xs mt-2"
                      autoFocus
                    />
                  )}
                </div>
                <div>
                  <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Tagline</label>
                  <input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} placeholder="Short tagline" className="w-full py-2 text-xs" />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full py-2 text-xs resize-y" data-testid="admin-product-description-input" />
              </div>
              {/* Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['pixel_pitch', 'resolution', 'brightness', 'application'].map(f => (
                  <div key={f}>
                    <label className="text-[0.5rem] font-bold tracking-[0.15em] text-[var(--blx-muted)] mb-1 block capitalize">{f.replace('_', ' ')}</label>
                    <input value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} className="w-full py-1.5 text-xs" />
                  </div>
                ))}
              </div>
              {/* Image */}
              <ImageUploader
                value={form.image_url}
                onChange={(url) => setForm({...form, image_url: url})}
                label="Product Image"
              />
              {/* Gallery */}
              <GalleryUploader
                value={form.gallery || []}
                onChange={(urls) => setForm({...form, gallery: urls})}
                label="Gallery Images"
                max={8}
              />
              {/* Key Specs Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)]">Key Specs</label>
                  <button onClick={addSpec} className="btn-glass px-3 py-1 text-[0.625rem]" data-testid="admin-add-spec-button"><Plus size={12} className="inline mr-1" /> Add Spec</button>
                </div>
                <div className="space-y-2">
                  {(form.key_specs || []).map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input value={spec.label} onChange={e => updateSpec(i, 'label', e.target.value)} placeholder="Label" className="flex-1 py-1.5 text-xs" />
                      <input value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="Value" className="flex-1 py-1.5 text-xs" />
                      <button onClick={() => removeSpec(i)} className="p-1.5 rounded hover:bg-[rgba(220,38,38,0.1)] transition-colors duration-200"><X size={14} className="text-[var(--blx-muted)]" /></button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Flags */}
              <div className="flex flex-wrap gap-4">
                {[{key: 'featured', label: 'Featured', icon: Star}, {key: 'trending', label: 'Trending', icon: TrendingUp}, {key: 'new_arrival', label: 'New Arrival', icon: Zap}].map(f => (
                  <label key={f.key} className="flex items-center gap-2 cursor-pointer text-xs tracking-wider">
                    <input type="checkbox" checked={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.checked})} className="accent-[var(--blx-gold-3)]" />
                    <f.icon size={14} /> {f.label}
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer text-xs tracking-wider">
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="py-1 px-2 text-xs">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--blx-border)]">
              <button onClick={() => setEditing(null)} className="btn-glass px-6 py-2.5 text-xs">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.product_code || !form.name || !form.category} className="btn-gold px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50" data-testid="admin-product-save-button">
                <Save size={14} /> {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
