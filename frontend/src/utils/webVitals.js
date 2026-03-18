/**
 * Core Web Vitals Optimization Utilities
 * Implements best practices for LCP, INP, and CLS optimization
 * 
 * Targets:
 * - LCP: < 2.5 seconds
 * - INP: < 200 milliseconds
 * - CLS: < 0.1
 */

// ============================================
// LCP (Largest Contentful Paint) Optimizations
// ============================================

/**
 * Preload critical images for LCP optimization
 * Should be called in index.html or early in app lifecycle
 */
export function preloadCriticalImage(src, fetchPriority = 'high') {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = fetchPriority;
  document.head.appendChild(link);
}

/**
 * Preload critical fonts to prevent FOIT/FOUT
 */
export function preloadFont(src, type = 'font/woff2') {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = type;
  link.href = src;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Generate optimized image srcset for responsive loading
 * Reduces bandwidth by 50-70% on mobile
 */
export function generateSrcSet(baseUrl, widths = [320, 640, 960, 1280, 1920]) {
  return widths
    .map(w => `${baseUrl}?w=${w} ${w}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints = {
  sm: '100vw',
  md: '50vw',
  lg: '33vw'
}) {
  return `(max-width: 640px) ${breakpoints.sm}, (max-width: 1024px) ${breakpoints.md}, ${breakpoints.lg}`;
}

// ============================================
// INP (Interaction to Next Paint) Optimizations
// ============================================

/**
 * Debounce function for optimizing frequent events
 * Prevents excessive re-renders and long tasks
 */
export function debounce(func, wait = 150) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for rate-limiting event handlers
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Yield to main thread during long tasks
 * Breaks up heavy computations to improve INP
 */
export async function yieldToMain() {
  return new Promise(resolve => {
    if ('scheduler' in window && 'yield' in window.scheduler) {
      window.scheduler.yield().then(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Run heavy computation in chunks to avoid blocking main thread
 */
export async function processInChunks(items, processor, chunkSize = 10) {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(processor));
    await yieldToMain();
  }
  return results;
}

// ============================================
// CLS (Cumulative Layout Shift) Optimizations
// ============================================

/**
 * Calculate aspect ratio padding for responsive containers
 * Reserves space before content loads to prevent CLS
 */
export function getAspectRatioPadding(width, height) {
  return `${(height / width) * 100}%`;
}

/**
 * Common aspect ratios with pre-calculated padding
 */
export const ASPECT_RATIOS = {
  '16:9': '56.25%',
  '4:3': '75%',
  '1:1': '100%',
  '3:2': '66.67%',
  '21:9': '42.86%',
  '9:16': '177.78%', // Vertical video
};

/**
 * Generate placeholder style for image containers
 * Prevents CLS by reserving space
 */
export function getPlaceholderStyle(width, height, bgColor = '#1a1a1a') {
  return {
    position: 'relative',
    paddingBottom: getAspectRatioPadding(width, height),
    backgroundColor: bgColor,
    overflow: 'hidden',
  };
}

// ============================================
// Performance Monitoring
// ============================================

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(onReport) {
  if (typeof window === 'undefined') return;

  // Use web-vitals library if available
  import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
    onCLS(onReport);
    onINP(onReport);
    onLCP(onReport);
    onFCP(onReport);
    onTTFB(onReport);
  }).catch(() => {
    // Fallback: Use PerformanceObserver
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          onReport({
            name: entry.entryType,
            value: entry.startTime || entry.value,
            id: entry.id,
          });
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
    } catch (e) {
      console.warn('Performance monitoring not supported');
    }
  });
}

/**
 * Log performance metrics to console (dev only)
 */
export function logPerformance() {
  if (process.env.NODE_ENV !== 'development') return;
  
  reportWebVitals((metric) => {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2));
  });
}

// ============================================
// Resource Hints
// ============================================

/**
 * Add DNS prefetch for external domains
 */
export function dnsPrefetch(domain) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  document.head.appendChild(link);
}

/**
 * Add preconnect for critical third-party origins
 */
export function preconnect(origin, crossOrigin = true) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  if (crossOrigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Prefetch likely next navigation targets
 */
export function prefetchPage(url) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

// ============================================
// Image Optimization Helpers
// ============================================

/**
 * Check if browser supports WebP
 */
export function supportsWebP() {
  if (typeof document === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Check if browser supports AVIF
 */
export async function supportsAVIF() {
  if (typeof Image === 'undefined') return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABc0WkAgQADABACMA';
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalImageFormat() {
  if (await supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpg';
}

// ============================================
// Lazy Loading Utilities
// ============================================

/**
 * Create an Intersection Observer for lazy loading
 */
export function createLazyObserver(callback, options = {}) {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: load immediately
    return { observe: () => callback(true), disconnect: () => {} };
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(true, entry.target);
      }
    });
  }, {
    rootMargin: options.rootMargin || '100px',
    threshold: options.threshold || 0,
  });
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element, margin = 100) {
  if (typeof window === 'undefined' || !element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + margin &&
    rect.bottom >= -margin &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + margin &&
    rect.right >= -margin
  );
}
