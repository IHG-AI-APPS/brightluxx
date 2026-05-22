import React, { useState, useRef, useEffect } from 'react';
import { cdnUrl, EXTERNAL_CDN } from '../config/cdn';

/**
 * CdnImage — Lazy-loading image with blur-up placeholder.
 * Images are served from files.ihgbrands.com CDN.
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

  // Get the full CDN URL
  const fullCdnUrl = cdnUrl(src);
  
  // For blur placeholder, use a smaller version (external CDN doesn't support resize, so use same image)
  const blurSrc = fullCdnUrl;
  const fullSrc = fullCdnUrl;

  return (
    <div ref={containerRef} className={`cdn-img-wrap ${className}`} data-testid="cdn-image">
      {/* Blur placeholder - tiny image with CSS blur */}
      <img
        src={blurSrc}
        alt=""
        aria-hidden="true"
        className={`cdn-img-blur ${loaded ? 'cdn-img-hide' : ''} ${imgClassName}`}
      />
      {/* Full image - loads when in viewport */}
      {inView && (
        <img
          src={fullSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          className={`cdn-img-full ${loaded ? 'cdn-img-show' : ''} ${imgClassName}`}
          data-testid="cdn-image-full"
        />
      )}
    </div>
  );
}
