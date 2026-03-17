import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const COLOR_OPTIONS = [
  { value: 'rose', label: 'Rose (PixelVue)', preview: 'bg-rose-500' },
  { value: 'cyan', label: 'Cyan (LumiMorph)', preview: 'bg-cyan-500' },
  { value: 'emerald', label: 'Emerald (NaturaTex)', preview: 'bg-emerald-500' },
  { value: 'amber', label: 'Amber (SignaTouch)', preview: 'bg-amber-500' },
  { value: 'violet', label: 'Violet (GlassMorph)', preview: 'bg-violet-500' }
];

export default function AdminProductFamilies() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchFamilies = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/product-families/admin/all`);
      const data = await res.json();
      setFamilies(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFamilies(); }, [fetchFamilies]);

  const handleToggleActive = async (id) => {
    await fetch(`${API_URL}/api/product-families/admin/${id}/toggle-active`, { method: 'POST' });
    fetchFamilies();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product family?')) return;
    await fetch(`${API_URL}/api/product-families/admin/${id}`, { method: 'DELETE' });
    fetchFamilies();
  };

  const emptyFamily = {
    name: '',
    slug: '',
    tagline: '',
    description: '',
    hero_image: '',
    hero_video: '',
    brand_color: 'rose',
    accent_color: '',
    stats: [{ value: '', label: '' }],
    overview: '',
    key_features: [''],
    products: [],
    categories: [],
    use_cases: [''],
    gallery: [],
    faqs: [{ question: '', answer: '' }],
    seo_title: '',
    seo_description: '',
    is_active: true,
    order: families.length
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6" data-testid="admin-product-families">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Families</h1>
            <p className="text-neutral-400 mt-1">Manage product line landing pages (LumiMorph, NaturaTex, etc.)</p>
          </div>
          <button
            onClick={() => { setEditing(emptyFamily); setIsCreating(true); }}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg"
          >
            <Plus size={20} /> Add Family
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-neutral-400">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {families.map(family => (
              <div
                key={family.id}
                className={`bg-neutral-900 border rounded-lg p-4 ${family.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                    family.hero_image ? '' : `bg-${family.brand_color}-500/20`
                  }`}>
                    {family.hero_image ? (
                      <img src={family.hero_image} alt={family.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-${family.brand_color}-400 text-xl font-bold`}>
                        {family.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{family.name}</h3>
                      <span className={`w-3 h-3 rounded-full bg-${family.brand_color}-500`} title={family.brand_color}></span>
                    </div>
                    <p className="text-sm text-neutral-400">{family.tagline}</p>
                    <p className="text-xs text-neutral-500 mt-1">/{family.slug} • {family.products?.length || 0} products</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(family.id)}
                      className={`p-2 rounded-lg ${family.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}
                    >
                      {family.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => { setEditing(family); setIsCreating(false); }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(family.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {families.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                No product families found. Click "Add Family" to create one.
              </div>
            )}
          </div>
        )}

        {editing && (
          <FamilyEditor
            family={editing}
            isCreating={isCreating}
            onClose={() => { setEditing(null); setIsCreating(false); }}
            onSave={() => { fetchFamilies(); setEditing(null); setIsCreating(false); }}
          />
        )}
      </div>
    </div>
  );
}

function FamilyEditor({ family, isCreating, onClose, onSave }) {
  const [formData, setFormData] = useState(family);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({ basic: true });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => {
        if (i !== index) return item;
        return typeof item === 'object' ? { ...item, [key]: value } : value;
      })
    }));
  };

  const handleAddArrayItem = (field, template) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), template]
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      const url = isCreating 
        ? `${API_URL}/api/product-families/admin/create`
        : `${API_URL}/api/product-families/admin/${family.id}`;
      
      const res = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to save');
      }
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const Section = ({ title, name, children }) => (
    <div className="border border-neutral-800 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection(name)}
        className="w-full flex items-center justify-between p-4 bg-neutral-900 hover:bg-neutral-800"
      >
        <span className="font-medium">{title}</span>
        {expandedSections[name] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections[name] && <div className="p-4 space-y-4 bg-neutral-950">{children}</div>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-neutral-900 rounded-xl w-full max-w-4xl mx-4 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{isCreating ? 'Create Product Family' : 'Edit Product Family'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">{error}</div>}

          <Section title="Basic Information" name="basic">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Name *</label>
                <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Slug *</label>
                <input type="text" value={formData.slug} onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Brand Color</label>
                <select value={formData.brand_color} onChange={(e) => handleChange('brand_color', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
                  {COLOR_OPTIONS.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Order</label>
                <input type="number" value={formData.order} onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Tagline</label>
              <input type="text" value={formData.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-24" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Overview</label>
              <textarea value={formData.overview} onChange={(e) => handleChange('overview', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-24" />
            </div>
          </Section>

          <Section title="Media" name="media">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Hero Image URL</label>
              <input type="text" value={formData.hero_image} onChange={(e) => handleChange('hero_image', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Hero Video URL (optional)</label>
              <input type="text" value={formData.hero_video || ''} onChange={(e) => handleChange('hero_video', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
            </div>
          </Section>

          <Section title={`Stats (${formData.stats?.length || 0})`} name="stats">
            {formData.stats?.map((stat, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" placeholder="Value (e.g., 500+)" value={stat.value} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} className="w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <input type="text" placeholder="Label" value={stat.label} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <button type="button" onClick={() => handleRemoveArrayItem('stats', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('stats', { value: '', label: '' })} className="text-sm text-rose-400 hover:text-rose-300">+ Add Stat</button>
          </Section>

          <Section title={`Key Features (${formData.key_features?.length || 0})`} name="key_features">
            {formData.key_features?.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" placeholder="Feature" value={feature} onChange={(e) => handleArrayChange('key_features', index, null, e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <button type="button" onClick={() => handleRemoveArrayItem('key_features', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('key_features', '')} className="text-sm text-rose-400 hover:text-rose-300">+ Add Feature</button>
          </Section>

          <Section title={`Use Cases (${formData.use_cases?.length || 0})`} name="use_cases">
            {formData.use_cases?.map((useCase, index) => (
              <div key={index} className="flex gap-2">
                <input type="text" placeholder="Use case" value={useCase} onChange={(e) => handleArrayChange('use_cases', index, null, e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <button type="button" onClick={() => handleRemoveArrayItem('use_cases', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('use_cases', '')} className="text-sm text-rose-400 hover:text-rose-300">+ Add Use Case</button>
          </Section>

          <Section title={`FAQs (${formData.faqs?.length || 0})`} name="faqs">
            {formData.faqs?.map((faq, index) => (
              <div key={index} className="p-3 bg-neutral-900 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <input type="text" placeholder="Question" value={faq.question} onChange={(e) => handleArrayChange('faqs', index, 'question', e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                  <button type="button" onClick={() => handleRemoveArrayItem('faqs', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                </div>
                <textarea placeholder="Answer" value={faq.answer} onChange={(e) => handleArrayChange('faqs', index, 'answer', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm h-20" />
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('faqs', { question: '', answer: '' })} className="text-sm text-rose-400 hover:text-rose-300">+ Add FAQ</button>
          </Section>

          <Section title="SEO Settings" name="seo">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">SEO Title</label>
              <input type="text" value={formData.seo_title || ''} onChange={(e) => handleChange('seo_title', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">SEO Description</label>
              <textarea value={formData.seo_description || ''} onChange={(e) => handleChange('seo_description', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-20" />
            </div>
          </Section>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Family'}
          </button>
        </div>
      </div>
    </div>
  );
}
