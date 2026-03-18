/**
 * OptimizedImage Component
 * Implements Core Web Vitals best practices for images:
 * - LCP: Preload critical images, use fetchPriority
 * - CLS: Always reserve space with aspect ratio
 * - Performance: Lazy loading, WebP/AVIF with fallbacks, srcset
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import { createLazyObserver, ASPECT_RATIOS } from '../utils/webVitals';

/**
 * Generate optimized image URL with CDN parameters
 */
function getOptimizedUrl(src, width, format = 'webp') {
  if (!src) return '';
  
  // If already has query params, append
  const separator = src.includes('?') ? '&' : '?';
  
  // Handle CDN URLs (e.g., Cloudinary, imgix style)
  if (src.includes('cloudinary') || src.includes('imgix')) {
    return `${src}${separator}w=${width}&f=${format}&q=80`;
  }
  
  // For external media server
  if (src.includes('82.180.137.7') || src.includes('media.')) {
    // Return as-is since these are pre-optimized
    return src;
  }
  
  return src;
}

/**
 * OptimizedImage - Performance-first image component
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {number} width - Intrinsic width (for aspect ratio)
 * @param {number} height - Intrinsic height (for aspect ratio)
 * @param {string} aspectRatio - Predefined aspect ratio ('16:9', '4:3', '1:1', etc.)
 * @param {boolean} priority - If true, preload and disable lazy loading (for LCP images)
 * @param {string} sizes - Responsive sizes attribute
 * @param {string} className - Container className
 * @param {string} imgClassName - Image element className
 * @param {function} onLoad - Callback when image loads
 * @param {string} placeholder - Placeholder color or 'blur'
 * @param {string} objectFit - CSS object-fit value
 */
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 450,
  aspectRatio,
  priority = false,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  onLoad,
  placeholder = '#1a1a1a',
  objectFit = 'cover',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // Calculate aspect ratio padding
  const paddingBottom = aspectRatio 
    ? ASPECT_RATIOS[aspectRatio] || '56.25%'
    : `${(height / width) * 100}%`;

  // Set up lazy loading observer
  useEffect(() => {
    if (priority || isInView) return;

    const observer = createLazyObserver((inView) => {
      if (inView) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Preload priority images
  useEffect(() => {
    if (priority && src && typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      return () => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      };
    }
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  // Generate srcset for responsive images
  const srcSet = src ? [320, 640, 960, 1280, 1920]
    .filter(w => w <= width * 2) // Don't upscale
    .map(w => `${getOptimizedUrl(src, w)} ${w}w`)
    .join(', ') : '';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        paddingBottom,
        backgroundColor: placeholder !== 'blur' ? placeholder : '#1a1a1a',
      }}
      data-testid="optimized-image-container"
    >
      {(isInView || priority) && !hasError && (
        <picture>
          {/* WebP source */}
          <source
            type="image/webp"
            srcSet={srcSet}
            sizes={sizes}
          />
          {/* Fallback image */}
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
            style={{ objectFit }}
          />
        </picture>
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
          style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;

/**
 * HeroImage - Optimized component specifically for hero/LCP images
 * Always preloaded with high priority
 */
export const HeroImage = memo(function HeroImage(props) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="100vw"
    />
  );
});

/**
 * CardImage - Optimized for card grids
 * Lazy loaded with appropriate sizes
 */
export const CardImage = memo(function CardImage(props) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      aspectRatio="16:9"
    />
  );
});

/**
 * ThumbnailImage - Small preview images
 */
export const ThumbnailImage = memo(function ThumbnailImage(props) {
  return (
    <OptimizedImage
      {...props}
      width={200}
      height={150}
      sizes="200px"
      aspectRatio="4:3"
    />
  );
});
