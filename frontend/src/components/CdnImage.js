import React, { useState, useRef, useEffect } from 'react';
import { cdnUrl, EXTERNAL_CDN } from '../config/cdn';

const API = process.env.REACT_APP_BACKEND_URL || '';

/**
 * CdnImage — Lazy-loading image with optimization proxy.
 * Heavy CDN images are routed through /api/img for WebP conversion + resize.
 * Unsplash/Pexels images use their native size params.
 *
 * Props:
 *   src: string — Image path or full URL
 *   alt: string
 *   className: string — applied to the wrapper
 *   imgClassName: string — applied to the img element
 *   w: number — optional width for optimization
 *   q: number — optional quality (default 82)
 *   eager: boolean — skip lazy loading (for above-the-fold images)
 */
export default function CdnImage({ src, alt = '', className = '', imgClassName = '', w, q, eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const containerRef = useRef(null);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (eager || inView) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, inView]);

  if (!src) {
    return (
      <div className={`bg-[rgba(255,255,255,0.03)] ${className}`} ref={containerRef} />
    );
  }

  // Get optimized image URL
  const fullCdnUrl = cdnUrl(src);
  let fullSrc = fullCdnUrl;
  const targetW = w || 600;
  const targetQ = q || 75;

  if (fullSrc.includes('unsplash.com') && !fullSrc.includes('w=')) {
    fullSrc += (fullSrc.includes('?') ? '&' : '?') + `w=${targetW}&q=${targetQ}&auto=format`;
  } else if (fullSrc.includes('pexels.com') && !fullSrc.includes('w=')) {
    fullSrc += (fullSrc.includes('?') ? '&' : '?') + `w=${targetW}`;
  } else if (fullSrc.includes('site-images/opt-') || fullSrc.includes('site-images_opt')) {
    // Already pre-optimized WebP on CDN — serve directly
  } else if (fullSrc.includes('ihgbrands.com') || fullSrc.includes('generated-images')) {
    // Route heavy CDN images through optimization proxy
    fullSrc = `${API}/api/img?url=${encodeURIComponent(fullSrc)}&w=${targetW}&q=${targetQ}`;
  }

  return (
    <div ref={containerRef} className={`cdn-img-wrap ${className}`} data-testid="cdn-image">
      {/* Placeholder - solid color until image loads */}
      {!loaded && (
        <div
          aria-hidden="true"
          className={`cdn-img-blur ${imgClassName}`}
          style={{ background: 'rgba(255,255,255,0.03)' }}
        />
      )}
      {/* Full image - loads when in viewport */}
      {inView && (
        <img
          src={fullSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width={w || undefined}
          onLoad={() => setLoaded(true)}
          className={`cdn-img-full ${loaded ? 'cdn-img-show' : ''} ${imgClassName}`}
          data-testid="cdn-image-full"
        />
      )}
    </div>
  );
}
