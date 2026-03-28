import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from './AdminContext';
import { Globe, Building2, Share2, Code, Search as SearchIcon, Save, CheckCircle2, AlertCircle, Image, Upload, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const INPUT = "w-full bg-[rgba(255,255,255,0.04)] border border-[var(--blx-border)] rounded-lg text-xs tracking-wider text-[var(--blx-text)] px-4 py-2.5 focus:outline-none focus:border-[var(--blx-gold-3)] transition-colors duration-200";
const LABEL = "text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-1.5 block";

function Field({ label, name, value, onChange, type = 'text', placeholder, rows }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {rows ? (
        <textarea name={name} value={value || ''} onChange={onChange} rows={rows} placeholder={placeholder} className={`${INPUT} resize-none`} data-testid={`site-${name}`} />
      ) : (
        <input type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className={INPUT} data-testid={`site-${name}`} />
      )}
    </div>
  );
}

function FileUploadField({ label, name, value, onChange, api, accept = 'image/*' }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api().post('/api/admin/upload', formData);
      if (res.data?.url) {
        onChange(res.data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex gap-2">
        <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="URL or upload a file" className={`${INPUT} flex-1`} data-testid={`site-${name}`} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-glass px-3 py-2 text-[0.6rem] flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50"
          data-testid={`site-${name}-upload-btn`}
        >
          <Upload size={12} /> {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input ref={fileRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
      </div>
      {value && (
        <div className="mt-2 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--blx-border)] flex items-center gap-3">
          <img src={value} alt="Preview" className="h-8 w-auto max-w-[120px] object-contain" onError={e => { e.target.style.display = 'none'; }} />
          <span className="text-[0.55rem] text-[var(--blx-muted)] truncate flex-1">{value}</span>
        </div>
      )}
    </div>
  );
}

export default function AdminSiteSettings() {
  const { api } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    api().get('/api/site-settings')
      .then(r => setSettings(r.data))
      .catch(() => setMsg({ type: 'error', text: 'Failed to load settings' }))
      .finally(() => setLoading(false));
  }, [api]);

  const update = (section, field, value) => {
    setSettings(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      await api().put('/api/site-settings', settings);
      setMsg({ type: 'success', text: 'Settings saved! Changes will reflect on the site immediately.' });
    } catch {
      setMsg({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-[var(--blx-glass)] rounded w-48" /><div className="h-40 bg-[var(--blx-glass)] rounded-xl" /></div></div>;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl" data-testid="admin-site-settings-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wider">Site Settings</h1>
          <p className="text-xs text-[var(--blx-muted)] tracking-wider mt-1">Manage logo, company details, social links, and embeds</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-gold px-5 py-2 text-xs flex items-center gap-2 disabled:opacity-50" data-testid="site-settings-save">
          <Save size={14} /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {msg.text && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-xs tracking-wider ${msg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`} data-testid="site-settings-msg">
          {msg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {msg.text}
        </div>
      )}

      {/* Branding */}
      <div className="glass-panel p-6" data-testid="site-settings-branding">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-5 flex items-center gap-2"><Image size={14} /> Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUploadField label="Logo" name="logo_url" value={settings?.branding?.logo_url} onChange={v => update('branding', 'logo_url', v)} api={api} accept="image/png,image/jpeg,image/svg+xml,image/webp" />
          <FileUploadField label="Favicon" name="favicon_url" value={settings?.branding?.favicon_url} onChange={v => update('branding', 'favicon_url', v)} api={api} accept="image/x-icon,image/png,image/svg+xml" />
          <Field label="Company Name" name="company_name" value={settings?.branding?.company_name} onChange={e => update('branding', 'company_name', e.target.value)} />
          <Field label="Tagline" name="tagline" value={settings?.branding?.tagline} onChange={e => update('branding', 'tagline', e.target.value)} />
          <Field label="Established Year" name="established_year" value={settings?.branding?.established_year} onChange={e => update('branding', 'established_year', e.target.value)} />
        </div>
      </div>

      {/* Company Contact */}
      <div className="glass-panel p-6" data-testid="site-settings-contact">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-5 flex items-center gap-2"><Building2 size={14} /> Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Phone Number" name="phone" value={settings?.contact?.phone} onChange={e => update('contact', 'phone', e.target.value)} placeholder="+971 4 258 5754" />
          <Field label="Email" name="email" value={settings?.contact?.email} onChange={e => update('contact', 'email', e.target.value)} type="email" placeholder="sales@company.com" />
          <Field label="WhatsApp Number" name="whatsapp" value={settings?.contact?.whatsapp} onChange={e => update('contact', 'whatsapp', e.target.value)} placeholder="+971559954274" />
          <Field label="Address" name="address" value={settings?.contact?.address} onChange={e => update('contact', 'address', e.target.value)} placeholder="Full street address" />
        </div>
      </div>

      {/* Social Media */}
      <div className="glass-panel p-6" data-testid="site-settings-social">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-5 flex items-center gap-2"><Share2 size={14} /> Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Instagram" name="instagram" value={settings?.social?.instagram} onChange={e => update('social', 'instagram', e.target.value)} placeholder="https://instagram.com/..." />
          <Field label="Facebook" name="facebook" value={settings?.social?.facebook} onChange={e => update('social', 'facebook', e.target.value)} placeholder="https://facebook.com/..." />
          <Field label="LinkedIn" name="linkedin" value={settings?.social?.linkedin} onChange={e => update('social', 'linkedin', e.target.value)} placeholder="https://linkedin.com/company/..." />
          <Field label="YouTube" name="youtube" value={settings?.social?.youtube} onChange={e => update('social', 'youtube', e.target.value)} placeholder="https://youtube.com/@..." />
          <Field label="Twitter / X" name="twitter" value={settings?.social?.twitter} onChange={e => update('social', 'twitter', e.target.value)} placeholder="https://x.com/..." />
          <Field label="TikTok" name="tiktok" value={settings?.social?.tiktok} onChange={e => update('social', 'tiktok', e.target.value)} placeholder="https://tiktok.com/@..." />
        </div>
      </div>

      {/* Embeds */}
      <div className="glass-panel p-6" data-testid="site-settings-embeds">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-5 flex items-center gap-2"><Code size={14} /> Embeds</h3>
        <Field label="Google Maps Embed Code" name="google_map" value={settings?.embeds?.google_map} onChange={e => update('embeds', 'google_map', e.target.value)} rows={4} placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' />
        {settings?.embeds?.google_map && (
          <div className="mt-3 rounded-lg overflow-hidden border border-[var(--blx-border)]" data-testid="map-preview">
            <div dangerouslySetInnerHTML={{ __html: settings.embeds.google_map }} className="[&>iframe]:w-full [&>iframe]:h-48 [&>iframe]:border-0" />
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="glass-panel p-6" data-testid="site-settings-seo">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-5 flex items-center gap-2"><SearchIcon size={14} /> SEO Defaults</h3>
        <div className="space-y-4">
          <Field label="Default Meta Title" name="meta_title" value={settings?.seo?.meta_title} onChange={e => update('seo', 'meta_title', e.target.value)} placeholder="Company — Tagline" />
          <Field label="Default Meta Description" name="meta_description" value={settings?.seo?.meta_description} onChange={e => update('seo', 'meta_description', e.target.value)} rows={3} placeholder="Brief description for search engines..." />
          <Field label="Default OG Image URL" name="og_image" value={settings?.seo?.og_image} onChange={e => update('seo', 'og_image', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      {/* Save bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="btn-gold px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50" data-testid="site-settings-save-bottom">
          <Save size={14} /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
