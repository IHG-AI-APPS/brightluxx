import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Plus, Trash2, GripVertical, Image, Video, Type, BarChart3, Layout, Zap } from 'lucide-react';
import { ImageUploader } from '../../admin/ImageUploader';

const API = process.env.REACT_APP_BACKEND_URL || '';

const ICON_OPTIONS = ['Factory', 'Package', 'Truck', 'GraduationCap', 'Wrench', 'HeartHandshake', 'Shield', 'Clock', 'Award', 'Zap', 'Settings'];

export default function AdminHomepage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasChanges, setHasChanges] = useState(false);

  const token = localStorage.getItem('blx_admin_token');

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/homepage-content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error('Failed to fetch homepage content:', err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const updateContent = (updates) => {
    setContent({ ...content, ...updates });
    setHasChanges(true);
  };

  const updateHero = (field, value) => {
    setContent({
      ...content,
      hero: { ...content.hero, [field]: value }
    });
    setHasChanges(true);
  };

  const updateStat = (index, field, value) => {
    const stats = [...(content.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    updateContent({ stats });
  };

  const addStat = () => {
    const stats = [...(content.stats || []), { value: '0', label: 'New Stat', suffix: '' }];
    updateContent({ stats });
  };

  const removeStat = (index) => {
    const stats = content.stats.filter((_, i) => i !== index);
    updateContent({ stats });
  };

  const updateEntryDoor = (index, field, value) => {
    const doors = [...(content.entry_doors || [])];
    doors[index] = { ...doors[index], [field]: value };
    updateContent({ entry_doors: doors });
  };

  const updateWhyItem = (index, field, value) => {
    const items = [...(content.why_brightluxx_items || [])];
    items[index] = { ...items[index], [field]: value };
    updateContent({ why_brightluxx_items: items });
  };

  const addWhyItem = () => {
    const items = [...(content.why_brightluxx_items || []), { icon: 'Zap', title: 'New Feature', description: 'Description here' }];
    updateContent({ why_brightluxx_items: items });
  };

  const removeWhyItem = (index) => {
    const items = content.why_brightluxx_items.filter((_, i) => i !== index);
    updateContent({ why_brightluxx_items: items });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/homepage-content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setHasChanges(false);
        alert('Homepage content saved!');
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save');
    }
    setSaving(false);
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all homepage content to defaults? This cannot be undone.')) return;
    try {
      await fetch(`${API}/api/admin/homepage-content/reset`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContent();
      setHasChanges(false);
      alert('Homepage reset to defaults');
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  if (loading || !content) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: Video },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'entry_doors', label: 'Entry Doors', icon: Layout },
    { id: 'sections', label: 'Section Titles', icon: Type },
    { id: 'why', label: 'Why Brightluxx', icon: Zap },
  ];

  return (
    <div className="p-6" data-testid="admin-homepage-editor">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Homepage Editor</h1>
          <p className="text-sm text-[var(--blx-muted)] mt-1">
            Customize the homepage content and sections
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
          >
            <RotateCcw size={14} /> Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            style={{ background: 'var(--blx-gold-grad)', color: '#0B0B0B' }}
            data-testid="save-homepage-btn"
          >
            <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          You have unsaved changes
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="glass-panel p-2 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-[var(--blx-gold-3)] text-black font-medium'
                      : 'hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <Icon size={16} /> {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 glass-panel p-6">
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold mb-4">Hero Section</h2>
              
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Headline</label>
                <input
                  value={content.hero?.headline || ''}
                  onChange={(e) => updateHero('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Subheadline</label>
                <input
                  value={content.hero?.subheadline || ''}
                  onChange={(e) => updateHero('subheadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">CTA Button Text</label>
                  <input
                    value={content.hero?.cta_text || ''}
                    onChange={(e) => updateHero('cta_text', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">CTA Link</label>
                  <input
                    value={content.hero?.cta_link || ''}
                    onChange={(e) => updateHero('cta_link', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Video URLs (one per line)</label>
                <textarea
                  value={(content.hero?.video_urls || []).join('\n')}
                  onChange={(e) => updateHero('video_urls', e.target.value.split('\n').filter(Boolean))}
                  rows={3}
                  placeholder="https://example.com/video1.mp4"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-1">Poster Image URL</label>
                <input
                  value={content.hero?.poster_image || ''}
                  onChange={(e) => updateHero('poster_image', e.target.value)}
                  placeholder="https://example.com/poster.webp"
                  className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none font-mono"
                />
              </div>
            </div>
          )}

          {/* Statistics */}
          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Statistics</h2>
                <button onClick={addStat} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-[var(--blx-gold-3)] text-black">
                  <Plus size={12} /> Add Stat
                </button>
              </div>

              <div className="space-y-4">
                {(content.stats || []).map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                    <GripVertical size={16} className="text-[var(--blx-muted)]" />
                    <input
                      value={stat.value}
                      onChange={(e) => updateStat(i, 'value', e.target.value)}
                      placeholder="500"
                      className="w-20 px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] text-center"
                    />
                    <input
                      value={stat.suffix}
                      onChange={(e) => updateStat(i, 'suffix', e.target.value)}
                      placeholder="+"
                      className="w-12 px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] text-center"
                    />
                    <input
                      value={stat.label}
                      onChange={(e) => updateStat(i, 'label', e.target.value)}
                      placeholder="Projects Delivered"
                      className="flex-1 px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                    />
                    <button onClick={() => removeStat(i)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entry Doors */}
          {activeSection === 'entry_doors' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold mb-4">Entry Doors (3 Cards)</h2>

              <div className="space-y-6">
                {(content.entry_doors || []).map((door, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                    <div className="text-xs font-bold text-[var(--blx-gold-3)] mb-3">CARD {i + 1}</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Title</label>
                        <input
                          value={door.title}
                          onChange={(e) => updateEntryDoor(i, 'title', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">CTA Text</label>
                        <input
                          value={door.cta_text}
                          onChange={(e) => updateEntryDoor(i, 'cta_text', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Description</label>
                        <input
                          value={door.description}
                          onChange={(e) => updateEntryDoor(i, 'description', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Link</label>
                        <input
                          value={door.link}
                          onChange={(e) => updateEntryDoor(i, 'link', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Image URL</label>
                        <input
                          value={door.image}
                          onChange={(e) => updateEntryDoor(i, 'image', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Titles */}
          {activeSection === 'sections' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold mb-4">Section Titles</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                  <div className="text-xs font-bold text-[var(--blx-gold-3)] mb-3">FEATURED PRODUCTS SECTION</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[var(--blx-muted)] mb-1">Title</label>
                      <input
                        value={content.featured_products_title || ''}
                        onChange={(e) => updateContent({ featured_products_title: e.target.value })}
                        className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--blx-muted)] mb-1">Subtitle</label>
                      <input
                        value={content.featured_products_subtitle || ''}
                        onChange={(e) => updateContent({ featured_products_subtitle: e.target.value })}
                        className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                  <div className="text-xs font-bold text-[var(--blx-gold-3)] mb-3">PROJECTS SECTION</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[var(--blx-muted)] mb-1">Title</label>
                      <input
                        value={content.projects_title || ''}
                        onChange={(e) => updateContent({ projects_title: e.target.value })}
                        className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--blx-muted)] mb-1">Subtitle</label>
                      <input
                        value={content.projects_subtitle || ''}
                        onChange={(e) => updateContent({ projects_subtitle: e.target.value })}
                        className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                  <div className="text-xs font-bold text-[var(--blx-gold-3)] mb-3">WHY BRIGHTLUXX SECTION</div>
                  <div>
                    <label className="block text-xs text-[var(--blx-muted)] mb-1">Title</label>
                    <input
                      value={content.why_brightluxx_title || ''}
                      onChange={(e) => updateContent({ why_brightluxx_title: e.target.value })}
                      className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Why Brightluxx */}
          {activeSection === 'why' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Why Brightluxx Features</h2>
                <button onClick={addWhyItem} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-[var(--blx-gold-3)] text-black">
                  <Plus size={12} /> Add Feature
                </button>
              </div>

              <div className="space-y-4">
                {(content.why_brightluxx_items || []).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                    <div className="flex-shrink-0">
                      <label className="block text-xs text-[var(--blx-muted)] mb-1">Icon</label>
                      <select
                        value={item.icon}
                        onChange={(e) => updateWhyItem(i, 'icon', e.target.value)}
                        className="w-32 px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                      >
                        {ICON_OPTIONS.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Title</label>
                        <input
                          value={item.title}
                          onChange={(e) => updateWhyItem(i, 'title', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Description</label>
                        <input
                          value={item.description}
                          onChange={(e) => updateWhyItem(i, 'description', e.target.value)}
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                    </div>
                    <button onClick={() => removeWhyItem(i)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400 mt-6">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
