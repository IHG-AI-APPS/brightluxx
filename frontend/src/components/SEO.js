import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/tracker';
import { cdnUrl, EXTERNAL_CDN } from '../config/cdn';

const SITE_NAME = 'Brightluxx';
const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
const PRODUCTION_URL = 'https://brightluxx.com';
const DEFAULT_IMAGE = cdnUrl('hero_banner.webp');
const DEFAULT_DESCRIPTION = 'Premium digital LED display solutions for retail, corporate, outdoor, events, and creative installations. UAE-based with Gulf-grade engineering.';

// In-memory cache for SEO data to avoid refetching
const seoCache = {};

// Organization Schema - Added to every page for Knowledge Panel eligibility
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brightluxx",
  "alternateName": ["IHG Industry L.L.C", "Brightluxx LED", "Brightluxx Digital Displays"],
  "url": PRODUCTION_URL,
  "logo": `${PRODUCTION_URL}/assets/brightluxx-logo-512.png`,
  "description": "Premium LED display solutions for retail, corporate, outdoor, events, and creative installations. UAE-based manufacturer since 2005.",
  "foundingDate": "2005",
  "foundingLocation": {
    "@type": "Place",
    "name": "Dubai, United Arab Emirates"
  },
  "sameAs": [
    "https://www.linkedin.com/company/brightluxx",
    "https://www.instagram.com/brightluxx",
    "https://www.facebook.com/brightluxx"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Quoz Industrial Area 3",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+971-55-995-4274",
      "contactType": "sales",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": ["AE", "SA", "QA", "KW", "BH", "OM"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+971-55-995-4274",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"]
    }
  ],
  "areaServed": [
    {"@type": "Country", "name": "United Arab Emirates"},
    {"@type": "Country", "name": "Saudi Arabia"},
    {"@type": "Country", "name": "Qatar"},
    {"@type": "Country", "name": "Kuwait"},
    {"@type": "Country", "name": "Bahrain"},
    {"@type": "Country", "name": "Oman"}
  ],
  "knowsAbout": [
    "LED Displays",
    "Digital Signage", 
    "Video Walls",
    "Transparent LED",
    "MicroLED Technology",
    "COB LED",
    "Indoor LED Screens",
    "Outdoor LED Screens",
    "Interactive Displays",
    "Touch Kiosks"
  ],
  "slogan": "Engineered for Brilliance",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 200
  }
};

// WebSite Schema with SearchAction for sitelinks search box
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Brightluxx",
  "url": PRODUCTION_URL,
  "description": DEFAULT_DESCRIPTION,
  "publisher": {
    "@type": "Organization",
    "name": "Brightluxx"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${PRODUCTION_URL}/products?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// LocalBusiness Schema for local SEO
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brightluxx Dubai Showroom",
  "image": `${PRODUCTION_URL}/assets/showroom.jpg`,
  "@id": `${PRODUCTION_URL}/#localbusiness`,
  "url": PRODUCTION_URL,
  "telephone": "+971-55-995-4274",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Quoz Industrial Area 3",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1173,
    "longitude": 55.2222
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$$$",
  "currenciesAccepted": "AED",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

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
  // Convert local paths to external CDN URLs
  return cdnUrl(image);
}

export { BASE_URL, SITE_NAME };

/**
 * Generate BreadcrumbList schema from breadcrumb array
 * @param {Array} breadcrumbs - Array of {name, path} objects
 */
function generateBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length < 2) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      ...(index < breadcrumbs.length - 1 && crumb.path ? { "item": `${PRODUCTION_URL}${crumb.path}` } : {})
    }))
  };
}

/**
 * Generate FAQPage schema from FAQ array
 * @param {Array} faqs - Array of {question, answer} objects
 */
function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Product schema for LED displays
 * @param {Object} product - Product details
 */
function generateProductSchema(product) {
  if (!product) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Brightluxx"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Brightluxx"
    },
    ...(product.sku && { "sku": product.sku }),
    ...(product.category && { "category": product.category }),
    ...(product.specs && {
      "additionalProperty": Object.entries(product.specs).map(([name, value]) => ({
        "@type": "PropertyValue",
        "name": name,
        "value": value
      }))
    }),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Brightluxx"
      }
    }
  };
}

/**
 * Generate Service schema
 * @param {Object} service - Service details
 */
function generateServiceSchema(service) {
  if (!service) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.type,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Brightluxx",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "areaServed": [
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Oman" }
    ]
  };
}

// Export schema generators
export { generateBreadcrumbSchema, generateFAQSchema, generateProductSchema, generateServiceSchema };

/**
 * SEO — Dynamic meta tags + JSON-LD for every page (React 19 compatible).
 * Props:
 *   title: string — page title (appended with " | Brightluxx")
 *   description: string — meta description (120-155 chars recommended)
 *   image: string — OG image URL (CDN path or absolute)
 *   path: string — page path for canonical URL
 *   type: string — og:type (default "website")
 *   noIndex: boolean — prevent indexing
 *   jsonLd: object|array — JSON-LD structured data to inject
 *   breadcrumbs: array — [{name, path}] for BreadcrumbList schema
 *   faqs: array — [{question, answer}] for FAQPage schema
 *   product: object — Product details for Product schema
 *   service: object — Service details for Service schema
 *   keywords: string — meta keywords (comma separated)
 */
export default function SEO({ 
  title, 
  description, 
  image, 
  path = '', 
  type = 'website', 
  noIndex = false, 
  jsonLd,
  breadcrumbs,
  faqs,
  product,
  service,
  keywords
}) {
  const location = useLocation();
  const pagePath = path || location.pathname;
  const [adminSeo, setAdminSeo] = useState(seoCache[pagePath] || null);
  const fetchedRef = useRef(false);

  // Fetch admin SEO data for this page path
  useEffect(() => {
    if (pagePath.startsWith('/admin')) return;
    if (seoCache[pagePath]) {
      setAdminSeo(seoCache[pagePath]);
      return;
    }
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetch(`${BASE_URL}/api/seo/page-meta?path=${encodeURIComponent(pagePath)}`)
      .then(r => r.json())
      .then(data => {
        if (data && (data.meta_title || data.meta_description)) {
          seoCache[pagePath] = data;
          setAdminSeo(data);
        }
      })
      .catch(() => {});
  }, [pagePath]);

  // Admin data overrides props (admin > props > defaults)
  const effectiveTitle = adminSeo?.meta_title || title;
  const effectiveDesc = adminSeo?.meta_description || description || DEFAULT_DESCRIPTION;
  const effectiveKeywords = adminSeo?.keywords?.length ? adminSeo.keywords.join(', ') : keywords;
  const effectiveOgTitle = adminSeo?.og_title || effectiveTitle;
  const effectiveOgDesc = adminSeo?.og_description || effectiveDesc;
  const effectiveNoIndex = adminSeo?.noindex ?? noIndex;

  const pageTitle = effectiveTitle ? `${effectiveTitle} | ${SITE_NAME}` : `${SITE_NAME} — Premium LED Display Solutions`;
  const pageDescription = effectiveDesc;
  const canonicalUrl = adminSeo?.canonical_url || `${PRODUCTION_URL}${pagePath}`;
  const ogImage = resolveImage(image);

  useEffect(() => {
    document.title = pageTitle;
    setMeta('description', pageDescription);
    setCanonical(canonicalUrl);

    // Keywords meta tag
    if (effectiveKeywords) {
      setMeta('keywords', effectiveKeywords);
    }

    // Open Graph
    setMeta('og:title', effectiveOgTitle ? `${effectiveOgTitle} | ${SITE_NAME}` : pageTitle, 'property');
    setMeta('og:description', effectiveOgDesc, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'en_AE', 'property');

    // OG Image Alt (critical for image SEO)
    const imageAlt = adminSeo?.image_alt || effectiveTitle || 'Brightluxx LED Display';
    setMeta('og:image:alt', imageAlt, 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', effectiveOgTitle ? `${effectiveOgTitle} | ${SITE_NAME}` : pageTitle);
    setMeta('twitter:description', effectiveOgDesc);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:image:alt', imageAlt);

    // Robots
    setMeta('robots', effectiveNoIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('author', 'Brightluxx');
    setMeta('geo.region', 'AE');
    setMeta('geo.placename', 'Dubai, United Arab Emirates');

    // JSON-LD - Always include Organization schema + page-specific schema
    const allSchemas = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];
    
    // Add LocalBusiness schema only on homepage and contact page
    if (pagePath === '/' || pagePath === '/contact' || pagePath === '/about') {
      allSchemas.push(LOCAL_BUSINESS_SCHEMA);
    }
    
    // Add FAQ schema if provided
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) {
      allSchemas.push(faqSchema);
    }
    
    // Add Product schema if provided
    const productSchema = generateProductSchema(product);
    if (productSchema) {
      allSchemas.push(productSchema);
    }
    
    // Add Service schema if provided
    const serviceSchema = generateServiceSchema(service);
    if (serviceSchema) {
      allSchemas.push(serviceSchema);
    }
    
    // Add page-specific JSON-LD if provided
    if (jsonLd) {
      const pageSchemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      allSchemas.push(...pageSchemas);
    }
    
    setJsonLd(allSchemas);

    // Auto-track page view (skip admin pages)
    if (!effectiveNoIndex && !canonicalUrl.includes('/admin')) {
      trackPageView(pagePath);
    }

    return () => {
      setJsonLd(null);
    };
  }, [pageTitle, pageDescription, canonicalUrl, ogImage, type, effectiveNoIndex, effectiveKeywords, effectiveOgTitle, effectiveOgDesc, effectiveTitle, adminSeo, jsonLd, pagePath, faqs, product, service]);

  return null;
}

export { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA, PRODUCTION_URL };

/**
 * Hook to access SEO data (including image_alt) for the current page.
 * Use this in page components to get admin-set hero image alt text.
 */
export function useSeoData(pagePath) {
  const location = useLocation();
  const resolvedPath = pagePath || location.pathname;
  const [seoData, setSeoData] = useState(seoCache[resolvedPath] || null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (resolvedPath.startsWith('/admin')) return;
    if (seoCache[resolvedPath]) {
      setSeoData(seoCache[resolvedPath]);
      return;
    }
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetch(`${BASE_URL}/api/seo/page-meta?path=${encodeURIComponent(resolvedPath)}`)
      .then(r => r.json())
      .then(data => {
        if (data && (data.meta_title || data.meta_description || data.image_alt)) {
          seoCache[resolvedPath] = data;
          setSeoData(data);
        }
      })
      .catch(() => {});
  }, [resolvedPath]);

  return seoData;
}
