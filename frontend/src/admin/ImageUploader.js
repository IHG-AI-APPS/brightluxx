import React, { useState, useRef, useCallback } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAdmin } from './AdminContext';

/**
 * ImageUploader — Reusable component for CMS image fields.
 * Supports: file upload (drag-drop + click) + URL input fallback.
 *
 * Props:
 *   value: string (current image URL)
 *   onChange: (url: string) => void
 *   label?: string
 *   compact?: boolean (smaller variant for gallery items)
 */
export const ImageUploader = ({ value, onChange, label, compact = false }) => {
  const { api } = useAdmin();
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleUpload = useCallback(async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api().post('/api/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        onChange(res.data.url);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [api, onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setError('');
  };

  if (compact) {
    return (
      <div className="relative group" data-testid="image-uploader-compact">
        {value ? (
          <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-[var(--blx-border)]">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              onClick={handleClear}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(220,38,38,0.9)' }}
            >
              <X size={10} className="text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-16 rounded-lg border border-dashed border-[var(--blx-border)] flex flex-col items-center justify-center hover:border-[var(--blx-gold-3)] transition-colors duration-200"
          >
            {uploading ? <Loader2 size={14} className="animate-spin text-[var(--blx-gold-3)]" /> : <Upload size={14} className="text-[var(--blx-muted)]" />}
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
    );
  }

  return (
    <div data-testid="image-uploader">
      {label && <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2 block">{label}</label>}

      {/* Mode Toggle */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors duration-200 ${
            mode === 'upload' ? 'bg-[rgba(229,197,116,0.1)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]' : 'text-[var(--blx-muted)] hover:bg-[rgba(255,255,255,0.04)]'
          }`}
          data-testid="image-uploader-mode-upload"
        >
          <Upload size={12} /> Upload File
        </button>
        <button
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.625rem] font-bold tracking-wider rounded-lg transition-colors duration-200 ${
            mode === 'url' ? 'bg-[rgba(229,197,116,0.1)] text-[var(--blx-gold-3)] border border-[rgba(229,197,116,0.2)]' : 'text-[var(--blx-muted)] hover:bg-[rgba(255,255,255,0.04)]'
          }`}
          data-testid="image-uploader-mode-url"
        >
          <LinkIcon size={12} /> Paste URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
            dragOver
              ? 'border-[var(--blx-gold-3)] bg-[rgba(229,197,116,0.05)]'
              : 'border-[var(--blx-border)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.02)]'
          } ${value ? 'p-2' : 'p-6'}`}
          data-testid="image-uploader-dropzone"
        >
          {value ? (
            <div className="relative">
              <img src={value} alt="Uploaded" className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={(e) => { e.stopPropagation(); handleClear(); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                data-testid="image-uploader-clear"
              >
                <X size={14} className="text-white" />
              </button>
              <div className="absolute bottom-2 left-2 text-[0.5rem] font-bold tracking-wider px-2 py-1 rounded-md" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--blx-gold-3)' }}>
                Click to replace
              </div>
            </div>
          ) : (
            <div className="text-center">
              {uploading ? (
                <Loader2 size={24} className="mx-auto text-[var(--blx-gold-3)] animate-spin mb-2" />
              ) : (
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(229,197,116,0.08)', border: '1px solid rgba(229,197,116,0.12)' }}>
                  <ImageIcon size={20} className="text-[var(--blx-gold-3)]" />
                </div>
              )}
              <p className="text-xs font-bold tracking-wider mb-1">
                {uploading ? 'Uploading...' : dragOver ? 'Drop here' : 'Drag & drop or click'}
              </p>
              <p className="text-[0.5625rem] text-[var(--blx-muted)] tracking-wider">
                JPG, PNG, WebP, GIF, SVG up to 10MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="image-uploader-file-input"
          />
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              placeholder="https://example.com/image.jpg"
              className="flex-1 py-2 text-xs"
              data-testid="image-uploader-url-input"
            />
            <button
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              className="btn-gold px-4 py-2 text-xs disabled:opacity-40"
              data-testid="image-uploader-url-submit"
            >
              Set
            </button>
          </div>
          {value && (
            <div className="mt-2 relative">
              <img src={value} alt="Preview" className="h-24 rounded-lg object-cover" />
              <button
                onClick={handleClear}
                className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-[0.625rem] tracking-wider mt-2" style={{ color: '#f87171', }} data-testid="image-uploader-error">{error}</p>
      )}
    </div>
  );
};

/**
 * GalleryUploader — Multi-image uploader for gallery fields.
 *
 * Props:
 *   value: string[] (array of image URLs)
 *   onChange: (urls: string[]) => void
 *   label?: string
 *   max?: number
 */
export const GalleryUploader = ({ value = [], onChange, label, max = 10 }) => {
  const { api } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = useCallback(async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).slice(0, max - value.length).forEach(f => formData.append('files', f));
      const res = await api().post('/api/admin/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        const newUrls = res.data.uploaded.map(u => u.url);
        onChange([...value, ...newUrls]);
      }
    } catch (err) {
      console.error('Gallery upload error:', err);
    } finally {
      setUploading(false);
    }
  }, [api, onChange, value, max]);

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  }, [handleUpload]);

  return (
    <div data-testid="gallery-uploader">
      {label && <label className="text-[0.5625rem] font-bold tracking-[0.2em] text-[var(--blx-muted)] mb-2 block">{label}</label>}

      <div className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <div key={i} className="relative group w-20 h-16 rounded-lg overflow-hidden border border-[var(--blx-border)]">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => handleRemove(i)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(220,38,38,0.9)' }}
              data-testid={`gallery-remove-${i}`}
            >
              <X size={10} className="text-white" />
            </button>
          </div>
        ))}

        {value.length < max && (
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-20 h-16 rounded-lg border-2 border-dashed border-[var(--blx-border)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--blx-gold-3)] transition-colors duration-200"
            data-testid="gallery-add-button"
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin text-[var(--blx-gold-3)]" />
            ) : (
              <>
                <Upload size={14} className="text-[var(--blx-muted)]" />
                <span className="text-[0.4375rem] text-[var(--blx-muted)] mt-0.5 tracking-wider">{value.length}/{max}</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
        data-testid="gallery-file-input"
      />
    </div>
  );
};
