import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/tracker';
import { cdnUrl, EXTERNAL_CDN } from '../config/cdn';

const SITE_NAME = 'Brightluxx';
const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
const PRODUCTION_URL = 'https://brightluxx.com';
const DEFAULT_IMAGE = cdnUrl('hero_banner.webp');
const DEFAULT_DESCRIPTION = 'Premium digital LED display solutions for retail, corporate, outdoor, events, and creative installations. UAE-based with Gulf-grade engineering.';

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

function setAmpHtml(url) {
  let el = document.querySelector('link[rel="amphtml"]');
  if (url) {
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'amphtml');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  } else if (el) {
    el.remove();
  }
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
 *   ampUrl: string — URL to AMP version of this page (optional)
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
  keywords,
  ampUrl
}) {
  const location = useLocation();
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium LED Display Solutions`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${BASE_URL}${path || location.pathname}`;
  const ogImage = resolveImage(image);

  useEffect(() => {
    document.title = pageTitle;
    setMeta('description', pageDescription);
    setCanonical(canonicalUrl);
    
    // AMP HTML link
    setAmpHtml(ampUrl);

    // Keywords meta tag
    if (keywords) {
      setMeta('keywords', keywords);
    }

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
    setMeta('geo.placename', 'Dubai, United Arab Emirates');

    // JSON-LD - Always include Organization schema + page-specific schema
    const allSchemas = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];
    
    // Add LocalBusiness schema only on homepage and contact page
    if (path === '/' || path === '/contact' || path === '/about') {
      allSchemas.push(LOCAL_BUSINESS_SCHEMA);
    }
    
    // Add breadcrumb schema if provided
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
    if (breadcrumbSchema) {
      allSchemas.push(breadcrumbSchema);
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
    if (!noIndex && !canonicalUrl.includes('/admin')) {
      trackPageView(path || location.pathname);
    }

    return () => {
      setJsonLd(null);
      setAmpHtml(null); // Clean up AMP link
    };
  }, [pageTitle, pageDescription, canonicalUrl, ogImage, type, noIndex, jsonLd, path, breadcrumbs, faqs, product, service, keywords, ampUrl]);

  return null;
}

export { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA, PRODUCTION_URL };
