import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/tracker';

const SITE_NAME = 'Brightluxx';
const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
const DEFAULT_IMAGE = `${BASE_URL}/api/cdn/hero_banner.webp?w=1200&q=80`;
const DEFAULT_DESCRIPTION = 'Premium digital LED display solutions for retail, corporate, outdoor, events, and creative installations. UAE-based with Gulf-grade engineering.';

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setJsonLd(data) {
  // Remove existing JSON-LD scripts managed by SEO component
  document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());
  if (!data) return;
  const items = Array.isArray(data) ? data : [data];
  items.forEach((item, i) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', `seo-${i}`);
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

/** Resolve image to absolute URL */
export function resolveImage(image) {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith('http')) return image;
  if (image.startsWith('/api/cdn/')) return `${BASE_URL}${image}?w=1200&q=80`;
  if (image.startsWith('/')) return `${BASE_URL}${image}`;
  return image;
}

export { BASE_URL, SITE_NAME };

/**
 * SEO — Dynamic meta tags + JSON-LD for every page (React 19 compatible).
 * Props:
 *   title: string — page title (appended with " | Brightluxx")
 *   description: string — meta description
 *   image: string — OG image URL (CDN path or absolute)
 *   path: string — page path for canonical URL
 *   type: string — og:type (default "website")
 *   noIndex: boolean — prevent indexing
 *   jsonLd: object|array — JSON-LD structured data to inject
 */
export default function SEO({ title, description, image, path = '', type = 'website', noIndex = false, jsonLd }) {
  const location = useLocation();
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium LED Display Solutions`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${BASE_URL}${path || location.pathname}`;
  const ogImage = resolveImage(image);

  useEffect(() => {
    document.title = pageTitle;
    setMeta('description', pageDescription);
    setCanonical(canonicalUrl);

    // Open Graph
    setMeta('og:title', pageTitle, 'property');
    setMeta('og:description', pageDescription, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'en_AE', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDescription);
    setMeta('twitter:image', ogImage);

    // Robots
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('author', 'Brightluxx');
    setMeta('geo.region', 'AE');

    // JSON-LD
    setJsonLd(jsonLd);

    // Auto-track page view (skip admin pages)
    if (!noIndex && !canonicalUrl.includes('/admin')) {
      trackPageView(path || location.pathname);
    }

    return () => setJsonLd(null);
  }, [pageTitle, pageDescription, canonicalUrl, ogImage, type, noIndex, jsonLd]);

  return null;
}
