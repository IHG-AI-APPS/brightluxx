import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { cdnUrl } from '../config/cdn';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a CDN-optimized image URL.
 * @param {string} src - The image source path
 * @param {object} opts - Options: { w: width, h: height, q: quality, f: format } (not used with external CDN)
 * @returns {string} Full CDN URL
 */
export function cdnImg(src, opts = {}) {
  if (!src) return '';
  // Use the centralized CDN URL helper
  return cdnUrl(src);
}
