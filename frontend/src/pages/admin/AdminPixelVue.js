import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, Save, X, GripVertical } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  { value: 'poster', label: 'LED Poster Series' },
  { value: 'commercial', label: 'Commercial Series' },
  { value: 'creative', label: 'Creative Series' }
];

const ICON_OPTIONS = [
  'Monitor', 'Wifi', 'Zap', 'Shield', 'Eye', 'Smartphone', 'Layers', 'RotateCcw', 
  'Move', 'Sun', 'Thermometer', 'Droplets', 'Maximize2', 'Grid3X3', 'Puzzle',
  'Presentation', 'Users', 'Video', 'Mic', 'Store', 'Tag', 'ShoppingBag',
  'Hand', 'Coffee', 'Waves', 'Building2', 'Ruler', 'FolderClosed', 'Circle',
  'Footprints', 'Gamepad2', 'Theater', 'Music', 'Wind', 'Feather', 'Cloud',
  'Sparkles', 'Shirt', 'Battery'
];

export default function AdminPixelVue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSections, setExpandedSections] = useState({});

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/pixelvue/admin/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleActive = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/pixelvue/admin/products/${productId}/toggle-active`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error(`Failed to update visibility (${res.status})`);
      await fetchProducts();
    } catch (error) {
      console.error('Error toggling product:', error);
      alert(error.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${API_URL}/api/pixelvue/admin/products/${productId}`, {
        method: 'DELETE'
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const emptyProduct = {
    name: '',
    slug: '',
    category: 'poster',
    tagline: '',
    description: '',
    hero_image: '',
    quick_specs: [{ label: '', value: '' }],
    features: [{ icon: 'Monitor', title: '', desc: '' }],
    applications: [{ name: '', desc: '' }],
    specifications: [{ label: '', value: '' }],
    faqs: [{ question: '', answer: '' }],
    seo_title: '',
    seo_description: '',
    is_active: true,
    order: products.length
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6" data-testid="admin-pixelvue">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">PixelVue Products</h1>
            <p className="text-neutral-400 mt-1">Manage LED display products</p>
          </div>
          <button
            onClick={() => { setEditingProduct(emptyProduct); setIsCreating(true); }}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-rose-500' : 'bg-neutral-800 hover:bg-neutral-700'}`}
          >
            All ({products.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === cat.value ? 'bg-rose-500' : 'bg-neutral-800 hover:bg-neutral-700'}`}
            >
              {cat.label} ({products.filter(p => p.category === cat.value).length})
            </button>
          ))}
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12 text-neutral-400">Loading products...</div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-neutral-900 border rounded-lg p-4 ${product.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <GripVertical size={20} className="text-neutral-600 cursor-move" />
                  
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
                    {product.hero_image ? (
                      <img src={product.hero_image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">No img</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        product.category === 'poster' ? 'bg-blue-500/20 text-blue-400' :
                        product.category === 'commercial' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 truncate">{product.tagline}</p>
                    <p className="text-xs text-neutral-500 mt-1">/{product.slug}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(product.id)}
                      className={`p-2 rounded-lg transition-colors ${product.is_active ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
                      title={product.is_active ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                    >
                      {product.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => { setEditingProduct(product); setIsCreating(false); }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                No products found. Click "Add Product" to create one.
              </div>
            )}
          </div>
        )}

        {/* Edit/Create Modal */}
        {editingProduct && (
          <ProductEditor
            product={editingProduct}
            isCreating={isCreating}
            onClose={() => { setEditingProduct(null); setIsCreating(false); }}
            onSave={() => { fetchProducts(); setEditingProduct(null); setIsCreating(false); }}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
          />
        )}
      </div>
    </div>
  );
}

function ProductEditor({ product, isCreating, onClose, onSave, expandedSections, setExpandedSections }) {
  const [formData, setFormData] = useState(product);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };

  const handleAddArrayItem = (field, template) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
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
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = isCreating 
        ? `${API_URL}/api/pixelvue/admin/products`
        : `${API_URL}/api/pixelvue/admin/products/${product.id}`;
      
      const res = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to save product');
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
      {expandedSections[name] && (
        <div className="p-4 space-y-4 bg-neutral-950">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-neutral-900 rounded-xl w-full max-w-4xl mx-4 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{isCreating ? 'Create Product' : 'Edit Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <Section title="Basic Information" name="basic">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-24"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Hero Image URL</label>
              <input
                type="text"
                value={formData.hero_image}
                onChange={(e) => handleChange('hero_image', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
              />
            </div>
          </Section>

          {/* Quick Specs */}
          <Section title={`Quick Specs (${formData.quick_specs?.length || 0})`} name="quick_specs">
            {formData.quick_specs?.map((spec, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  placeholder="Label"
                  value={spec.label}
                  onChange={(e) => handleArrayChange('quick_specs', index, 'label', e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => handleArrayChange('quick_specs', index, 'value', e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('quick_specs', index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('quick_specs', { label: '', value: '' })}
              className="text-sm text-rose-400 hover:text-rose-300"
            >
              + Add Spec
            </button>
          </Section>

          {/* Features */}
          <Section title={`Features (${formData.features?.length || 0})`} name="features">
            {formData.features?.map((feature, index) => (
              <div key={index} className="p-3 bg-neutral-900 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <select
                    value={feature.icon}
                    onChange={(e) => handleArrayChange('features', index, 'icon', e.target.value)}
                    className="w-32 bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-2 text-sm"
                  >
                    {ICON_OPTIONS.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Title"
                    value={feature.title}
                    onChange={(e) => handleArrayChange('features', index, 'title', e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('features', index)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={feature.desc}
                  onChange={(e) => handleArrayChange('features', index, 'desc', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('features', { icon: 'Monitor', title: '', desc: '' })}
              className="text-sm text-rose-400 hover:text-rose-300"
            >
              + Add Feature
            </button>
          </Section>

          {/* Applications */}
          <Section title={`Applications (${formData.applications?.length || 0})`} name="applications">
            {formData.applications?.map((app, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  placeholder="Name"
                  value={app.name}
                  onChange={(e) => handleArrayChange('applications', index, 'name', e.target.value)}
                  className="w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={app.desc}
                  onChange={(e) => handleArrayChange('applications', index, 'desc', e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('applications', index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('applications', { name: '', desc: '' })}
              className="text-sm text-rose-400 hover:text-rose-300"
            >
              + Add Application
            </button>
          </Section>

          {/* Specifications */}
          <Section title={`Specifications (${formData.specifications?.length || 0})`} name="specifications">
            {formData.specifications?.map((spec, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  placeholder="Label"
                  value={spec.label}
                  onChange={(e) => handleArrayChange('specifications', index, 'label', e.target.value)}
                  className="w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => handleArrayChange('specifications', index, 'value', e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('specifications', index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('specifications', { label: '', value: '' })}
              className="text-sm text-rose-400 hover:text-rose-300"
            >
              + Add Specification
            </button>
          </Section>

          {/* FAQs */}
          <Section title={`FAQs (${formData.faqs?.length || 0})`} name="faqs">
            {formData.faqs?.map((faq, index) => (
              <div key={index} className="p-3 bg-neutral-900 rounded-lg space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleArrayChange('faqs', index, 'question', e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('faqs', index)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleArrayChange('faqs', index, 'answer', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm h-20"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('faqs', { question: '', answer: '' })}
              className="text-sm text-rose-400 hover:text-rose-300"
            >
              + Add FAQ
            </button>
          </Section>

          {/* SEO */}
          <Section title="SEO Settings" name="seo">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">SEO Title</label>
              <input
                type="text"
                value={formData.seo_title || ''}
                onChange={(e) => handleChange('seo_title', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">SEO Description</label>
              <textarea
                value={formData.seo_description || ''}
                onChange={(e) => handleChange('seo_description', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-20"
              />
            </div>
          </Section>
        </form>

        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
