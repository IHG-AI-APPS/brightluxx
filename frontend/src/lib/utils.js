import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a CDN-optimized image URL.
 * @param {string} src - The image source path (e.g., "/api/cdn/hero.webp" or "/uploads/hero.webp")
 * @param {object} opts - Options: { w: width, h: height, q: quality, f: format }
 * @returns {string} Optimized CDN URL
 */
export function cdnImg(src, opts = {}) {
  if (!src) return '';
  // Normalize old /uploads/ paths to /api/cdn/
  let url = src.startsWith('/uploads/') ? src.replace('/uploads/', '/api/cdn/') : src;
  // Only add params to CDN URLs
  if (!url.startsWith('/api/cdn/')) return url;
  const params = new URLSearchParams();
  if (opts.w) params.set('w', opts.w);
  if (opts.h) params.set('h', opts.h);
  if (opts.q) params.set('q', opts.q);
  if (opts.f) params.set('f', opts.f);
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}
