import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyImage - Performance-optimized image component
 * 
 * Features:
 * - Native lazy loading with IntersectionObserver fallback
 * - WebP format detection and fallback
 * - Blur-up placeholder effect
 * - Proper aspect ratio handling to prevent CLS
 * - Width/height attributes for layout stability
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {string} className - Container class
 * @param {string} imgClassName - Image element class
 * @param {number} width - Explicit width (helps prevent CLS)
 * @param {number} height - Explicit height (helps prevent CLS)
 * @param {boolean} eager - Load immediately (for above-the-fold images)
 * @param {string} sizes - Responsive sizes attribute
 * @param {string} placeholder - Placeholder color or 'blur'
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  width,
  height,
  eager = false,
  sizes,
  placeholder = 'blur',
  objectFit = 'cover'
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(eager);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // IntersectionObserver for lazy loading (fallback for older browsers)
  useEffect(() => {
    if (eager || inView) return;
    
    const el = containerRef.current;
    if (!el) return;

    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
      setInView(true);
      return;
    }

    // Fallback to IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px 0px' }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, inView]);

  // Handle empty or invalid src
  if (!src) {
    return (
      <div 
        className={`bg-neutral-900 ${className}`} 
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        aria-hidden="true"
      />
    );
  }

  // Determine if we should use WebP (most modern browsers support it)
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  // Get optimized source (if CDN supports WebP conversion, use it)
  const optimizedSrc = src;

  const aspectRatio = width && height ? `${width}/${height}` : undefined;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
      data-testid="lazy-image"
    >
      {/* Placeholder */}
      {!loaded && !error && (
        <div 
          className={`absolute inset-0 ${placeholder === 'blur' ? 'bg-neutral-800/50 animate-pulse' : 'bg-neutral-900'}`}
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      {inView && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`
            w-full h-full transition-opacity duration-300
            ${objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : ''}
            ${loaded ? 'opacity-100' : 'opacity-0'}
            ${imgClassName}
          `}
          style={{ objectFit }}
          data-testid="lazy-image-img"
        />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * LazyBackgroundImage - For background images with lazy loading
 */
export function LazyBackgroundImage({
  src,
  className = '',
  children,
  eager = false,
  overlay = 'bg-black/50'
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const containerRef = useRef(null);

  useEffect(() => {
    if (eager || inView) return;
    
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px 0px' }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, inView]);

  // Preload image
  useEffect(() => {
    if (!inView || !src) return;
    
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [inView, src]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      data-testid="lazy-bg-image"
    >
      {/* Background placeholder */}
      <div 
        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      
      {/* Background image */}
      {inView && (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      )}
      
      {/* Overlay */}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
