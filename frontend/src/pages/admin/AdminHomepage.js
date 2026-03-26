import React, { useState, useEffect, useRef } from 'react';
import { Save, RotateCcw, Plus, Trash2, GripVertical, Image, Video, Type, BarChart3, Layout, Zap, Upload, X, Film, Loader2, Users } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || '';

const ICON_OPTIONS = ['Factory', 'Package', 'Truck', 'GraduationCap', 'Wrench', 'HeartHandshake', 'Shield', 'Clock', 'Award', 'Zap', 'Settings'];

// File uploader component for images
const ImageUploadField = ({ value, onChange, label }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('blx_admin_token');

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch(`${API}/api/admin/homepage/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        alert(data.detail || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">{label}</label>
      <div className="space-y-2">
        {value && (
          <div className="relative inline-block">
            <img src={value} alt="" className="h-24 rounded-lg object-cover" />
            <button
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleUpload(e.target.files?.[0])}
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <span className="text-[0.625rem] text-[var(--blx-muted)] self-center">or</span>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste URL"
            className="flex-1 px-3 py-2 rounded-lg text-xs bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
};

// Video uploader component  
const VideoUploadField = ({ videos, onChange, posterImage, onPosterChange }) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [previewIndex, setPreviewIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);
  const token = localStorage.getItem('blx_admin_token');

  const handleVideoUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch(`${API}/api/admin/homepage/upload-video`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange([...videos, data.url]);
      } else {
        alert(data.detail || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handlePosterUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch(`${API}/api/admin/homepage/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onPosterChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const addUrlVideo = () => {
    if (urlInput.trim()) {
      onChange([...videos, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeVideo = (index) => {
    onChange(videos.filter((_, i) => i !== index));
    // Adjust preview index if necessary
    if (previewIndex >= videos.length - 1 && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Hero Videos</label>
        
        {/* Video Preview */}
        {videos.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--blx-muted)]">Preview ({previewIndex + 1} of {videos.length})</span>
              {videos.length > 1 && (
                <div className="flex gap-1">
                  <button
                    onClick={() => { setVideoPlaying(false); setPreviewIndex(prev => (prev - 1 + videos.length) % videos.length); }}
                    className="p-1 rounded hover:bg-[rgba(255,255,255,0.1)] text-[var(--blx-muted)]"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => { setVideoPlaying(false); setPreviewIndex(prev => (prev + 1) % videos.length); }}
                    className="p-1 rounded hover:bg-[rgba(255,255,255,0.1)] text-[var(--blx-muted)]"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black border border-[var(--blx-border)] relative">
              <video
                key={videos[previewIndex]}
                src={videos[previewIndex]}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onLoadedData={(e) => { e.target.play().catch(() => {}); }}
                onPlaying={() => setVideoPlaying(true)}
                onWaiting={() => setVideoPlaying(false)}
                onError={() => setVideoPlaying(false)}
              />
              {!videoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50">
                  <span className="text-xs text-white/70 px-2 py-1 rounded">Video Loading...</span>
                </div>
              )}
            </div>
            <p className="text-[0.625rem] text-[var(--blx-muted)] mt-1">
              Current: {videos[previewIndex]}
            </p>
          </div>
        )}
        
        {/* Video list */}
        <div className="space-y-2 mb-3">
          {videos.map((url, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                previewIndex === i 
                  ? 'bg-[var(--blx-gold-3)]/10 border-[var(--blx-gold-3)]' 
                  : 'bg-[rgba(255,255,255,0.02)] border-[var(--blx-border)] hover:border-[var(--blx-gold-3)]/50'
              }`}
              onClick={() => setPreviewIndex(i)}
            >
              <Film size={14} className={previewIndex === i ? 'text-[var(--blx-gold-3)]' : 'text-[var(--blx-muted)]'} />
              <span className="text-xs font-mono flex-1 truncate">{url}</span>
              <button onClick={(e) => { e.stopPropagation(); removeVideo(i); }} className="p-1 text-red-400 hover:bg-red-500/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Upload buttons */}
        <div className="flex flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleVideoUpload(e.target.files?.[0])}
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addUrlVideo()}
              placeholder="Or paste video URL..."
              className="flex-1 min-w-[200px] px-3 py-2 rounded-lg text-xs bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none font-mono"
            />
            <button onClick={addUrlVideo} className="px-3 py-2 rounded-lg text-xs font-medium bg-[var(--blx-gold-3)] text-black">
              Add
            </button>
          </div>
        </div>
        <p className="text-[0.625rem] text-[var(--blx-muted)] mt-2">Supported: MP4, WebM, MOV (max 100MB)</p>
      </div>

      {/* Poster Image */}
      <div>
        <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Poster Image (shown before video loads)</label>
        <div className="flex items-start gap-3">
          {posterImage && (
            <div className="relative">
              <img src={posterImage} alt="Poster" className="h-20 rounded-lg object-cover" />
              <button
                onClick={() => onPosterChange('')}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          )}
          <div className="flex-1 flex gap-2">
            <input
              type="file"
              ref={posterInputRef}
              onChange={(e) => handlePosterUpload(e.target.files?.[0])}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />
            <button
              onClick={() => posterInputRef.current?.click()}
              className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
            >
              <Upload size={14} /> Upload Poster
            </button>
            <input
              type="text"
              value={posterImage || ''}
              onChange={(e) => onPosterChange(e.target.value)}
              placeholder="Or paste URL..."
              className="flex-1 px-3 py-2 rounded-lg text-xs bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-[var(--blx-gold-3)] outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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

  // Client management
  const updateClient = (index, field, value) => {
    const clients = [...(content.clients || [])];
    clients[index] = { ...clients[index], [field]: value };
    updateContent({ clients });
  };

  const addClient = () => {
    const clients = [...(content.clients || []), { name: 'New Client', logo_url: '' }];
    updateContent({ clients });
  };

  const removeClient = (index) => {
    const clients = (content.clients || []).filter((_, i) => i !== index);
    updateContent({ clients });
  };

  // Showcase Reel management
  const updateShowcaseReel = (field, value) => {
    setContent({
      ...content,
      showcase_reel: { ...content.showcase_reel, [field]: value }
    });
    setHasChanges(true);
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
    { id: 'showcase', label: 'Showcase Reel', icon: Film },
    { id: 'clients', label: 'Clients', icon: Users },
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

              {/* Video Upload Section */}
              <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                <VideoUploadField
                  videos={content.hero?.video_urls || []}
                  onChange={(urls) => updateHero('video_urls', urls)}
                  posterImage={content.hero?.poster_image || ''}
                  onPosterChange={(url) => updateHero('poster_image', url)}
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
                        <ImageUploadField
                          label="Card Image"
                          value={door.image}
                          onChange={(url) => updateEntryDoor(i, 'image', url)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Showcase Reel */}
          {activeSection === 'showcase' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold">Video Showcase Reel</h2>
                <p className="text-xs text-[var(--blx-muted)] mt-1">
                  Add a showcase video to highlight your LED installations. This section only appears on the homepage when enabled and a video URL is provided.
                </p>
              </div>

              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                <div>
                  <label className="text-sm font-medium">Enable Showcase Section</label>
                  <p className="text-xs text-[var(--blx-muted)]">When disabled, this section won't appear on the homepage</p>
                </div>
                <button
                  onClick={() => updateShowcaseReel('enabled', !content.showcase_reel?.enabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${content.showcase_reel?.enabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${content.showcase_reel?.enabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Video URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.showcase_reel?.video_url || ''}
                    onChange={(e) => updateShowcaseReel('video_url', e.target.value)}
                    placeholder="https://example.com/showcase-video.mp4"
                    className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-cyan-500 outline-none font-mono"
                  />
                </div>
                <p className="text-[0.625rem] text-[var(--blx-muted)] mt-1">
                  Paste a direct video URL (MP4 recommended). Video will auto-play, muted, looping.
                </p>
              </div>

              {/* Video Preview */}
              {content.showcase_reel?.video_url && (
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Preview</label>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black border border-[var(--blx-border)]">
                    <video
                      src={content.showcase_reel.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Section Text */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Section Title</label>
                  <input
                    type="text"
                    value={content.showcase_reel?.title || 'See It In Action'}
                    onChange={(e) => updateShowcaseReel('title', e.target.value)}
                    placeholder="See It In Action"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-cyan-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--blx-muted)] mb-2">Section Subtitle</label>
                  <input
                    type="text"
                    value={content.showcase_reel?.subtitle || 'Real installations across UAE and beyond'}
                    onChange={(e) => updateShowcaseReel('subtitle', e.target.value)}
                    placeholder="Real installations across UAE and beyond"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)] focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`p-4 rounded-lg border ${content.showcase_reel?.enabled && content.showcase_reel?.video_url ? 'bg-green-500/10 border-green-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${content.showcase_reel?.enabled && content.showcase_reel?.video_url ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="text-sm">
                    {content.showcase_reel?.enabled && content.showcase_reel?.video_url 
                      ? 'Showcase section is ACTIVE and will appear on the homepage'
                      : content.showcase_reel?.enabled 
                        ? 'Section is enabled but no video URL provided — add a video to activate'
                        : 'Section is disabled — enable and add a video URL to show it on the homepage'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Clients */}
          {activeSection === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Client Logos</h2>
                <button
                  onClick={addClient}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border border-[var(--blx-border)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <Plus size={14} /> Add Client
                </button>
              </div>
              <p className="text-xs text-[var(--blx-muted)]">
                Manage the client logos shown in the scrolling carousel. You can add a logo image or just show the client name.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(content.clients || []).map((client, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)]">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[0.625rem] font-bold text-[var(--blx-gold-3)]">#{i + 1}</span>
                      <button
                        onClick={() => removeClient(i)}
                        className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                        title="Remove client"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-[var(--blx-muted)] mb-1">Client Name *</label>
                        <input
                          value={client.name || ''}
                          onChange={(e) => updateClient(i, 'name', e.target.value)}
                          placeholder="Company name"
                          className="w-full px-2 py-1.5 rounded text-sm bg-[var(--blx-bg)] border border-[var(--blx-border)]"
                        />
                      </div>
                      <div>
                        <ImageUploadField
                          label="Logo (optional)"
                          value={client.logo_url || ''}
                          onChange={(url) => updateClient(i, 'logo_url', url)}
                        />
                      </div>
                      {/* Preview */}
                      <div className="p-3 rounded-lg glass-panel text-center">
                        {client.logo_url ? (
                          <img src={client.logo_url} alt={client.name} className="h-8 mx-auto object-contain" />
                        ) : (
                          <span className="text-xs font-bold tracking-wider text-[var(--blx-text-2)]">{client.name || 'Client Name'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {(content.clients || []).length === 0 && (
                <div className="text-center py-8 glass-panel">
                  <Users size={32} className="mx-auto mb-3 text-[var(--blx-muted)]" />
                  <p className="text-sm text-[var(--blx-muted)]">No clients added yet</p>
                  <button onClick={addClient} className="mt-3 text-xs text-[var(--blx-gold-3)]">+ Add your first client</button>
                </div>
              )}
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
