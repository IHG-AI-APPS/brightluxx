import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X, RefreshCw, Package, Sparkles, FolderKanban } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

const TYPES = [
  { id: 'product_category', label: 'Product Categories', icon: Package, color: '#60a5fa' },
  { id: 'inspiration_category', label: 'Inspiration Categories', icon: Sparkles, color: '#f472b6' },
  { id: 'project_sector', label: 'Project Sectors', icon: FolderKanban, color: '#4ade80' },
];

export default function AdminTaxonomy() {
  const [taxonomy, setTaxonomy] = useState({ product_category: [], inspiration_category: [], project_sector: [] });
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('product_category');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ type: 'product_category', value: '', label: '', description: '', order: 0, is_active: true });

  const token = localStorage.getItem('blx_admin_token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/taxonomy`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTaxonomy(data.taxonomy || {});
      setTotals(data.totals || {});
    } catch (err) {
      console.error('Failed to fetch taxonomy:', err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`${API}/api/admin/taxonomy/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(`Synced: ${data.synced.product_category} product categories, ${data.synced.inspiration_category} inspiration categories, ${data.synced.project_sector} project sectors`);
      fetchData();
    } catch (err) {
      console.error('Sync failed:', err);
    }
    setSyncing(false);
  };

  const openCreate = (type) => {
    setEditing(null);
    setForm({ type, value: '', label: '', description: '', order: 0, is_active: true });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      type: item.type,
      value: item.value,
      label: item.label,
      description: item.description || '',
      order: item.order || 0,
      is_active: item.is_active !== false,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `${API}/api/admin/taxonomy/${editing.id}` : `${API}/api/admin/taxonomy`;
      const method = editing ? 'PUT' : 'POST';
      const payload = editing 
        ? { label: form.label, description: form.description, order: form.order, is_active: form.is_active }
        : form;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setShowModal(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.detail || 'Error saving');
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.label}"? This won't remove the category from existing items.`)) return;
    try {
      await fetch(`${API}/api/admin/taxonomy/${item.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const toggleActive = async (item) => {
    try {
      await fetch(`${API}/api/admin/taxonomy/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ is_active: !item.is_active }),
      });
      fetchData();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const currentItems = taxonomy[activeTab] || [];
  const currentType = TYPES.find(t => t.id === activeTab);

  return (
    <div className="p-6" data-testid="admin-taxonomy-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Categories & Sectors</h1>
          <p className="text-sm text-[var(--blx-muted)] mt-1">
            Manage categories for products, inspirations, and project sectors
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          data-testid="sync-taxonomy-btn"
        >
          <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync from Data'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeTab === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-black' 
                  : 'bg-[var(--blx-bg-raised)] border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
              style={isActive ? { background: type.color } : {}}
              data-testid={`tab-${type.id}`}
            >
              <Icon size={16} />
              {type.label}
              <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${isActive ? 'bg-black/20' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                {totals[type.id] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="glass-panel">
        <div className="flex items-center justify-between p-4 border-b border-[var(--blx-border)]">
          <h2 className="text-sm font-bold tracking-wider flex items-center gap-2">
            {currentType && <currentType.icon size={16} style={{ color: currentType.color }} />}
            {currentType?.label}
          </h2>
          <button
            onClick={() => openCreate(activeTab)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="add-taxonomy-btn"
          >
            <Plus size={12} /> Add New
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[var(--blx-muted)]">Loading...</div>
        ) : currentItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[var(--blx-muted)] mb-3">No items yet</p>
            <button onClick={handleSync} className="text-sm text-[var(--blx-gold-3)] hover:underline">
              Sync from existing data
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--blx-border)]">
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">LABEL</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-wider text-[var(--blx-muted)]">VALUE (SLUG)</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">ITEMS</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">ORDER</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-wider text-[var(--blx-muted)]">STATUS</th>
                <th className="px-4 py-3 text-right text-xs font-bold tracking-wider text-[var(--blx-muted)]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm">{item.label}</div>
                    {item.description && <div className="text-xs text-[var(--blx-muted)]">{item.description}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)]">{item.value}</code>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-medium">{item.count || 0}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-[var(--blx-muted)]">
                    {item.order || 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto ${
                        item.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.is_active ? <Check size={12} /> : <X size={12} />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-[var(--blx-gold-3)]"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[var(--blx-muted)] hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--blx-bg-raised)] rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-[var(--blx-border)]">
              <h2 className="text-lg font-bold">{editing ? 'Edit Item' : 'Add New Item'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {!editing && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Value (slug) *</label>
                  <input
                    type="text"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    required
                    placeholder="e.g., cob-microled"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                  <p className="text-[0.65rem] text-[var(--blx-muted)] mt-1">URL-friendly identifier (no spaces)</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Label *</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  required
                  placeholder="e.g., COB MicroLED"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="Optional description..."
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
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
                >
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
