import React, { useState, useRef, useEffect } from 'react';

/**
 * CdnImage — Lazy-loading image with blur-up placeholder.
 * Uses the CDN endpoint's resize capability for ultra-tiny (20px) blur previews.
 *
 * Props:
 *   src: string — CDN image path (e.g., "/api/cdn/hero.webp")
 *   alt: string
 *   className: string — applied to the wrapper
 *   imgClassName: string — applied to the img element
 *   w: number — optional CDN width optimization for the full image
 *   q: number — optional CDN quality (default 82)
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

  // Build CDN URLs
  const isCdn = src.startsWith('/api/cdn/');
  const blurSrc = isCdn ? `${src}?w=20&q=10` : src;
  const params = new URLSearchParams();
  if (w) params.set('w', w);
  if (q) params.set('q', q);
  const fullSrc = isCdn && params.toString() ? `${src}?${params}` : src;

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
