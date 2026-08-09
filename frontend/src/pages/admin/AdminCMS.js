import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronDown, ChevronUp, Cpu, Building, FileText } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState('technologies');

  const tabs = [
    { id: 'technologies', label: 'Technologies', icon: Cpu, color: 'cyan' },
    { id: 'applications', label: 'Applications', icon: Building, color: 'green' },
    { id: 'site-content', label: 'Site Content', icon: FileText, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6" data-testid="admin-cms">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-neutral-400 mt-1">Manage technologies, applications, and site pages</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-neutral-800 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? `bg-${tab.color}-500/20 text-${tab.color}-400 border border-${tab.color}-500/50` 
                  : 'bg-neutral-800 hover:bg-neutral-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'technologies' && <TechnologiesPanel />}
        {activeTab === 'applications' && <ApplicationsPanel />}
        {activeTab === 'site-content' && <SiteContentPanel />}
      </div>
    </div>
  );
}

// ============ Technologies Panel ============
function TechnologiesPanel() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/technologies/admin/all`);
      const data = await res.json();
      setTechnologies(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/technologies/admin/${id}/toggle-active`, { method: 'POST' });
      if (!res.ok) throw new Error(`Failed to update visibility (${res.status})`);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this technology?')) return;
    await fetch(`${API_URL}/api/technologies/admin/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const emptyItem = {
    name: '', slug: '', tagline: '', description: '', hero_image: '', icon: 'Cpu', color: 'cyan',
    overview: '', specs: [], key_features: [], applications: [], advantages: [], considerations: [],
    faqs: [], related_products: [], related_technologies: [], seo_title: '', seo_description: '',
    is_active: true, order: technologies.length
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">LED Technologies</h2>
        <button onClick={() => { setEditing(emptyItem); setIsCreating(true); }} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Technology
        </button>
      </div>

      {loading ? <div className="text-center py-8 text-neutral-400">Loading...</div> : (
        <div className="space-y-3">
          {technologies.map(tech => (
            <div key={tech.id} className={`bg-neutral-900 border rounded-lg p-4 flex items-center gap-4 ${tech.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">{tech.name?.charAt(0)}</div>
              <div className="flex-1">
                <h3 className="font-medium">{tech.name}</h3>
                <p className="text-sm text-neutral-400">{tech.tagline}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleToggleActive(tech.id)} className={`p-2 rounded-lg ${tech.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}>
                  {tech.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button onClick={() => { setEditing(tech); setIsCreating(false); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(tech.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
          {technologies.length === 0 && <div className="text-center py-8 text-neutral-400">No technologies. Add one to get started.</div>}
        </div>
      )}

      {editing && (
        <GenericEditor
          item={editing}
          isCreating={isCreating}
          onClose={() => { setEditing(null); setIsCreating(false); }}
          onSave={() => { fetchData(); setEditing(null); setIsCreating(false); }}
          apiEndpoint="technologies"
          title="Technology"
          fields={['name', 'slug', 'tagline', 'description', 'hero_image', 'icon', 'color', 'overview']}
          arrayFields={['specs', 'key_features', 'applications', 'advantages', 'considerations', 'faqs']}
        />
      )}
    </div>
  );
}

// ============ Applications Panel ============
function ApplicationsPanel() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/applications/admin/all`);
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/applications/admin/${id}/toggle-active`, { method: 'POST' });
      if (!res.ok) throw new Error(`Failed to update visibility (${res.status})`);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    await fetch(`${API_URL}/api/applications/admin/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const emptyItem = {
    name: '', slug: '', tagline: '', description: '', hero_image: '', icon: 'Building', color: 'green',
    overview: '', use_cases: [], benefits: [], key_features: [], recommended_products: [],
    case_study_ids: [], gallery: [], faqs: [], seo_title: '', seo_description: '',
    is_active: true, order: applications.length
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Industry Applications</h2>
        <button onClick={() => { setEditing(emptyItem); setIsCreating(true); }} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Application
        </button>
      </div>

      {loading ? <div className="text-center py-8 text-neutral-400">Loading...</div> : (
        <div className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className={`bg-neutral-900 border rounded-lg p-4 flex items-center gap-4 ${app.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">{app.name?.charAt(0)}</div>
              <div className="flex-1">
                <h3 className="font-medium">{app.name}</h3>
                <p className="text-sm text-neutral-400">{app.tagline}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleToggleActive(app.id)} className={`p-2 rounded-lg ${app.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}>
                  {app.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button onClick={() => { setEditing(app); setIsCreating(false); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(app.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
          {applications.length === 0 && <div className="text-center py-8 text-neutral-400">No applications. Add one to get started.</div>}
        </div>
      )}

      {editing && (
        <GenericEditor
          item={editing}
          isCreating={isCreating}
          onClose={() => { setEditing(null); setIsCreating(false); }}
          onSave={() => { fetchData(); setEditing(null); setIsCreating(false); }}
          apiEndpoint="applications"
          title="Application"
          fields={['name', 'slug', 'tagline', 'description', 'hero_image', 'icon', 'color', 'overview']}
          arrayFields={['use_cases', 'benefits', 'key_features', 'faqs']}
        />
      )}
    </div>
  );
}

// ============ Site Content Panel ============
function SiteContentPanel() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/site-content/admin/all`);
      const data = await res.json();
      setPages(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggleActive = async (slug) => {
    try {
      const res = await fetch(`${API_URL}/api/site-content/admin/${slug}/toggle-active`, { method: 'POST' });
      if (!res.ok) throw new Error(`Failed to update visibility (${res.status})`);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Delete this page content?')) return;
    await fetch(`${API_URL}/api/site-content/admin/${slug}`, { method: 'DELETE' });
    fetchData();
  };

  const emptyItem = {
    page_slug: '', title: '', content: {}, seo_title: '', seo_description: '', is_active: true
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Site Pages Content</h2>
        <button onClick={() => { setEditing(emptyItem); setIsCreating(true); }} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Page
        </button>
      </div>

      {loading ? <div className="text-center py-8 text-neutral-400">Loading...</div> : (
        <div className="space-y-3">
          {pages.map(page => (
            <div key={page.id} className={`bg-neutral-900 border rounded-lg p-4 flex items-center gap-4 ${page.is_active ? 'border-neutral-800' : 'border-red-900/50 opacity-60'}`}>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{page.title}</h3>
                <p className="text-sm text-neutral-500">/{page.page_slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleToggleActive(page.page_slug)} className={`p-2 rounded-lg ${page.is_active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-400'}`}>
                  {page.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button onClick={() => { setEditing(page); setIsCreating(false); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(page.page_slug)} className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
          {pages.length === 0 && <div className="text-center py-8 text-neutral-400">No pages. Add one to get started.</div>}
        </div>
      )}

      {editing && (
        <SiteContentEditor
          item={editing}
          isCreating={isCreating}
          onClose={() => { setEditing(null); setIsCreating(false); }}
          onSave={() => { fetchData(); setEditing(null); setIsCreating(false); }}
        />
      )}
    </div>
  );
}

// ============ Generic Editor Modal ============
function GenericEditor({ item, isCreating, onClose, onSave, apiEndpoint, title, fields, arrayFields }) {
  const [formData, setFormData] = useState(item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      const url = isCreating 
        ? `${API_URL}/api/${apiEndpoint}/admin/create`
        : `${API_URL}/api/${apiEndpoint}/admin/${item.id}`;
      
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-neutral-900 rounded-xl w-full max-w-3xl mx-4 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{isCreating ? `Create ${title}` : `Edit ${title}`}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">{error}</div>}

          {/* Basic fields */}
          <div className="grid grid-cols-2 gap-4">
            {fields.slice(0, 2).map(field => (
              <div key={field}>
                <label className="block text-sm text-neutral-400 mb-1 capitalize">{field.replace('_', ' ')}</label>
                <input
                  type="text"
                  value={formData[field] || ''}
                  onChange={(e) => handleChange(field, field === 'slug' ? e.target.value.toLowerCase().replace(/\s+/g, '-') : e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                />
              </div>
            ))}
          </div>

          {fields.slice(2).map(field => (
            <div key={field}>
              <label className="block text-sm text-neutral-400 mb-1 capitalize">{field.replace('_', ' ')}</label>
              {field === 'description' || field === 'overview' ? (
                <textarea
                  value={formData[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-24"
                />
              ) : (
                <input
                  type="text"
                  value={formData[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                />
              )}
            </div>
          ))}

          {/* Array fields as collapsible sections */}
          {arrayFields.map(field => (
            <div key={field} className="border border-neutral-800 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection(field)}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 hover:bg-neutral-800"
              >
                <span className="font-medium capitalize">{field.replace('_', ' ')} ({formData[field]?.length || 0})</span>
                {expandedSections[field] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections[field] && (
                <div className="p-4 bg-neutral-950 text-sm text-neutral-400">
                  <p>Edit {field} in the JSON content editor (advanced feature)</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Site Content Editor ============
function SiteContentEditor({ item, isCreating, onClose, onSave }) {
  const [formData, setFormData] = useState(item);
  const [contentJson, setContentJson] = useState(JSON.stringify(item.content || {}, null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    
    try {
      // Parse JSON content
      const parsedContent = JSON.parse(contentJson);
      const payload = { ...formData, content: parsedContent };

      const res = await fetch(`${API_URL}/api/site-content/admin/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-neutral-900 rounded-xl w-full max-w-3xl mx-4 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{isCreating ? 'Create Page' : 'Edit Page'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Page Slug *</label>
              <input
                type="text"
                value={formData.page_slug}
                onChange={(e) => handleChange('page_slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                placeholder="e.g., about, faq, cpd"
                disabled={!isCreating}
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Content (JSON)</label>
            <textarea
              value={contentJson}
              onChange={(e) => setContentJson(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-64 font-mono text-sm"
              placeholder='{"hero": {"title": "...", "description": "..."}, "sections": [...]}'
            />
            <p className="text-xs text-neutral-500 mt-1">Enter page content as JSON. Structure depends on page type.</p>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">SEO Title</label>
            <input type="text" value={formData.seo_title || ''} onChange={(e) => handleChange('seo_title', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">SEO Description</label>
            <textarea value={formData.seo_description || ''} onChange={(e) => handleChange('seo_description', e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 h-20" />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-neutral-800">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>
    </div>
  );
}
