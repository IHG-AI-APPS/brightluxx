/**
 * SEO Schema Utilities
 * Helper functions to generate JSON-LD structured data for various page types
 */

const PRODUCTION_URL = 'https://brightluxx.com';
const ORGANIZATION_NAME = 'Brightluxx';

/**
 * Generate Product Schema for LED display products
 * @param {Object} product - Product data from API
 * @param {string} path - URL path (e.g., /pixelvue/iposter-pro)
 */
export function generateProductSchema(product, path) {
  if (!product) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name || product.title,
    "description": product.description || product.short_description || product.tagline,
    "image": product.hero_image_url || product.image || `${PRODUCTION_URL}/assets/products/${product.slug}.jpg`,
    "brand": {
      "@type": "Brand",
      "name": ORGANIZATION_NAME
    },
    "manufacturer": {
      "@type": "Organization",
      "name": ORGANIZATION_NAME,
      "url": PRODUCTION_URL
    },
    "category": product.category || "LED Display",
    "sku": product.sku || product.slug,
    "mpn": product.mpn || product.model || product.slug,
    "url": `${PRODUCTION_URL}${path}`,
    "offers": {
      "@type": "Offer",
      "url": `${PRODUCTION_URL}${path}`,
      "priceCurrency": "AED",
      "price": "0",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": ORGANIZATION_NAME
      }
    },
    ...(product.specifications && {
      "additionalProperty": Object.entries(product.specifications).slice(0, 10).map(([key, value]) => ({
        "@type": "PropertyValue",
        "name": key,
        "value": typeof value === 'object' ? JSON.stringify(value) : String(value)
      }))
    })
  };
}

/**
 * Generate FAQ Schema from FAQ items
 * @param {Array} faqItems - Array of {q: question, a: answer} objects
 */
export function generateFAQSchema(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q || item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a || item.answer
      }
    }))
  };
}

/**
 * Generate BreadcrumbList Schema
 * @param {Array} items - Array of {name, path} objects (ordered from home to current)
 */
export function generateBreadcrumbSchema(items) {
  if (!items || items.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${PRODUCTION_URL}${item.path}`
    }))
  };
}

/**
 * Generate Service Schema for solution pages
 * @param {Object} service - Service/solution data
 * @param {string} path - URL path
 */
export function generateServiceSchema(service, path) {
  if (!service) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title || service.name,
    "description": service.description || service.short_description,
    "provider": {
      "@type": "Organization",
      "name": ORGANIZATION_NAME,
      "url": PRODUCTION_URL
    },
    "url": `${PRODUCTION_URL}${path}`,
    "serviceType": service.category || "LED Display Solutions",
    "areaServed": [
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Oman" }
    ],
    ...(service.image && { "image": service.image })
  };
}

/**
 * Generate Article Schema for blog posts
 * @param {Object} article - Blog post data
 * @param {string} path - URL path
 */
export function generateArticleSchema(article, path) {
  if (!article) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.description,
    "image": article.image_url || article.image,
    "author": {
      "@type": "Organization",
      "name": ORGANIZATION_NAME,
      "url": PRODUCTION_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": ORGANIZATION_NAME,
      "url": PRODUCTION_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${PRODUCTION_URL}/assets/brightluxx-logo-512.png`
      }
    },
    "url": `${PRODUCTION_URL}${path}`,
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.updated_at || article.published_at || article.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${PRODUCTION_URL}${path}`
    }
  };
}

/**
 * Generate VideoObject Schema for pages with videos
 * @param {Object} video - Video data
 */
export function generateVideoSchema(video) {
  if (!video) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || "Brightluxx LED Display Showcase",
    "description": video.description || "Premium LED display solutions by Brightluxx",
    "thumbnailUrl": video.thumbnail || video.poster || `${PRODUCTION_URL}/assets/video-thumbnail.jpg`,
    "uploadDate": video.uploadDate || new Date().toISOString(),
    "contentUrl": video.url,
    "embedUrl": video.embedUrl || video.url,
    "duration": video.duration || "PT1M",
    "publisher": {
      "@type": "Organization",
      "name": ORGANIZATION_NAME,
      "url": PRODUCTION_URL
    }
  };
}

/**
 * Generate ItemList Schema for product listing pages
 * @param {Array} items - Array of products/items
 * @param {string} listName - Name of the list
 * @param {string} basePath - Base URL path for items
 */
export function generateItemListSchema(items, listName, basePath) {
  if (!items || items.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "numberOfItems": items.length,
    "itemListElement": items.slice(0, 20).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${PRODUCTION_URL}${basePath}/${item.slug}`,
      "name": item.name || item.title
    }))
  };
}

export default {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateVideoSchema,
  generateItemListSchema
};
