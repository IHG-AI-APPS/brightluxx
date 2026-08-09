import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, Save, X } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ICON_OPTIONS = [
  'Building2', 'Hotel', 'ShoppingBag', 'Plane', 'Heart', 'GraduationCap',
  'Landmark', 'Factory', 'Car', 'Utensils', 'Music', 'Trophy', 'Briefcase',
  'Church', 'Building', 'Store', 'Warehouse', 'Home'
];

export default function AdminSolutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSolution, setEditingSolution] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const fetchSolutions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/solutions/admin/all`);
      const data = await res.json();
      setSolutions(data);
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const handleToggleActive = async (solutionId) => {
    try {
      const res = await fetch(`${API_URL}/api/solutions/admin/${solutionId}/toggle-active`, { method: 'POST' });
      if (!res.ok) throw new Error(`Failed to update visibility (${res.status})`);
      await fetchSolutions();
    } catch (error) {
      console.error('Error toggling solution:', error);
      alert(error.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (solutionId) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;
    try {
      await fetch(`${API_URL}/api/solutions/admin/${solutionId}`, { method: 'DELETE' });
      fetchSolutions();
    } catch (error) {
      console.error('Error deleting solution:', error);
    }
  };

  const emptySolution = {
    title: '',
    slug: '',
    tagline: '',
    description: '',
    icon: 'Building2',
    hero_image: '',
    features: [{ title: '', description: '', icon: '' }],
    benefits: [{ title: '', description: '' }],
    use_cases: [''],
    related_products: [],
    related_technologies: [],
    stats: [{ value: '', label: '' }],
    faqs: [{ question: '', answer: '' }],
    seo_title: '',
    seo_description: '',
    is_active: true,
    order: solutions.length
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6" data-testid="admin-solutions">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Solutions / Industries</h1>
            <p className="text-neutral-400 mt-1">Manage industry solution pages</p>
          </div>
          <button
            onClick={() => { setEditingSolution(emptySolution); setIsCreating(true); }}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} /> Add Solution
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-neutral-400">Loading solutions...</div>
        ) : (
          <div className="grid gap-4">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className={`bg-neutral-900 border rounded-lg p-4 ${solution.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-rose-400 flex-shrink-0">
                    {solution.icon?.charAt(0) || 'S'}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{solution.title}</h3>
                    <p className="text-sm text-neutral-400 truncate">{solution.tagline}</p>
                    <p className="text-xs text-neutral-500">/{solution.slug}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(solution.id)}
                      className={`p-2 rounded-lg transition-colors ${solution.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}
                    >
                      {solution.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => { setEditingSolution(solution); setIsCreating(false); }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(solution.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {solutions.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                No solutions found. Click "Add Solution" to create one.
              </div>
            )}
          </div>
        )}

        {editingSolution && (
          <SolutionEditor
            solution={editingSolution}
            isCreating={isCreating}
            onClose={() => { setEditingSolution(null); setIsCreating(false); }}
            onSave={() => { fetchSolutions(); setEditingSolution(null); setIsCreating(false); }}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
          />
        )}
      </div>
    </div>
  );
}

function SolutionEditor({ solution, isCreating, onClose, onSave, expandedSections, setExpandedSections }) {
  const [formData, setFormData] = useState(solution);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = isCreating 
        ? `${API_URL}/api/solutions/admin/create`
        : `${API_URL}/api/solutions/admin/${solution.id}`;
      
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
        className="w-full flex items-center justify-between p-4 bg-neutral-900 hover:bg-neutral-800 transition-colors"
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
          <h2 className="text-xl font-bold">{isCreating ? 'Create Solution' : 'Edit Solution'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">{error}</div>}

          <Section title="Basic Information" name="basic">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Slug *</label>
                <input type="text" value={formData.slug} onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Icon</label>
                <select value={formData.icon} onChange={(e) => handleChange('icon', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
                  {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
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
              <label className="block text-sm text-neutral-400 mb-1">Hero Image URL</label>
              <input type="text" value={formData.hero_image} onChange={(e) => handleChange('hero_image', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
            </div>
          </Section>

          <Section title={`Features (${formData.features?.length || 0})`} name="features">
            {formData.features?.map((feature, index) => (
              <div key={index} className="p-3 bg-neutral-900 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <input type="text" placeholder="Title" value={feature.title} onChange={(e) => handleArrayChange('features', index, 'title', e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                  <button type="button" onClick={() => handleRemoveArrayItem('features', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                </div>
                <input type="text" placeholder="Description" value={feature.description} onChange={(e) => handleArrayChange('features', index, 'description', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('features', { title: '', description: '', icon: '' })} className="text-sm text-rose-400 hover:text-rose-300">+ Add Feature</button>
          </Section>

          <Section title={`Benefits (${formData.benefits?.length || 0})`} name="benefits">
            {formData.benefits?.map((benefit, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input type="text" placeholder="Title" value={benefit.title} onChange={(e) => handleArrayChange('benefits', index, 'title', e.target.value)} className="w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <input type="text" placeholder="Description" value={benefit.description} onChange={(e) => handleArrayChange('benefits', index, 'description', e.target.value)} className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
                <button type="button" onClick={() => handleRemoveArrayItem('benefits', index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('benefits', { title: '', description: '' })} className="text-sm text-rose-400 hover:text-rose-300">+ Add Benefit</button>
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
        </form>

        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Solution'}
          </button>
        </div>
      </div>
    </div>
  );
}
