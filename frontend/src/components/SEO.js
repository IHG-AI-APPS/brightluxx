import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

/**
 * SEO — Dynamic meta tags for every page (React 19 compatible).
 * Props:
 *   title: string — page title (appended with " | Brightluxx")
 *   description: string — meta description
 *   image: string — OG image URL (CDN path or absolute)
 *   path: string — page path for canonical URL
 *   type: string — og:type (default "website")
 *   noIndex: boolean — prevent indexing
 */
export default function SEO({ title, description, image, path = '', type = 'website', noIndex = false }) {
  const location = useLocation();
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium LED Display Solutions`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${BASE_URL}${path || location.pathname}`;

  let ogImage = DEFAULT_IMAGE;
  if (image) {
    if (image.startsWith('http')) {
      ogImage = image;
    } else if (image.startsWith('/api/cdn/')) {
      ogImage = `${BASE_URL}${image}?w=1200&q=80`;
    } else if (image.startsWith('/')) {
      ogImage = `${BASE_URL}${image}`;
    }
  }

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
  }, [pageTitle, pageDescription, canonicalUrl, ogImage, type, noIndex]);

  return null;
}
