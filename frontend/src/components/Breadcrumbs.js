import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_NAMES = {
  'products': 'Products', 'product-families': 'Product Families',
  'solutions': 'Solutions', 'contact': 'Contact', 'about': 'About',
  'lumimorph': 'LumiMorph', 'elite': 'Elite', 'grande': 'Grande', 'mini': 'Mini',
  'naturatex': 'NaturaTex', 'holoveil': 'HoloVeil',
  'signatouch': 'SignaTouch', 'touch-kiosk': 'Touch Kiosk',
  'smart-signage': 'Smart Signage', 'self-service': 'Self Service',
  'glassmorph': 'GlassMorph', 'smart-film': 'Smart Film',
  'led-film': 'LED Film', 'media-glass': 'Media Glass', 'flying-display': 'Flying Display',
  'pixelvue': 'PixelVue', 'art-immersive': 'Art & Immersive',
  'luxury-home-cinema': 'Luxury Home Cinema', 'knowledge': 'Knowledge Hub',
  'blog': 'Blog', 'case-studies': 'Case Studies', 'projects': 'Projects',
  'faq': 'FAQ', 'indoor-led': 'Indoor LED', 'outdoor-led': 'Outdoor LED',
  'for-architects': 'For Architects', 'design-assist': 'Design Assist',
  'budget-estimator': 'Budget Estimator', 'factory-tour': 'Factory Tour',
  'led-screen-suppliers-dubai': 'LED Screens Dubai', 'abu-dhabi': 'Abu Dhabi',
  'saudi-arabia': 'Saudi Arabia', 'qatar': 'Qatar', 'kuwait': 'Kuwait',
  'inspirations': 'Inspirations', 'applications': 'Applications',
  'digital-experience-architecture': 'Digital Experience',
};

/**
 * Breadcrumbs Component — auto-generates from URL when no items provided.
 */
export default function Breadcrumbs({ items, className = '' }) {
  const location = useLocation();
  
  // Auto-generate from URL if no items passed
  let breadcrumbs;
  if (items && items.length > 0) {
    breadcrumbs = items[0]?.path === '/' ? items : [{ name: 'Home', path: '/' }, ...items];
  } else {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    breadcrumbs = [{ name: 'Home', path: '/' }];
    let acc = '';
    parts.forEach((part, i) => {
      acc += '/' + part;
      const name = ROUTE_NAMES[part] || part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      breadcrumbs.push({ name, path: i < parts.length - 1 ? acc : null });
    });
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm ${className}`}
      data-testid="breadcrumbs"
    >
      <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li 
              key={crumb.path || index} 
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500 mx-1 flex-shrink-0" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span 
                  className="text-gray-400 font-medium truncate max-w-[200px]"
                  itemProp="name"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  itemProp="item"
                >
                  {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                  <span itemProp="name">{crumb.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumb items from path segments
 * @param {string} pathname - Current pathname
 * @param {Object} labels - Custom labels for path segments
 */
export function generateBreadcrumbs(pathname, labels = {}) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', path: '/' }];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = labels[segment] || formatSegment(segment);
    breadcrumbs.push({
      name: label,
      path: index === segments.length - 1 ? null : currentPath
    });
  });

  return breadcrumbs;
}

/**
 * Format URL segment into readable label
 */
function formatSegment(segment) {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Common breadcrumb configurations
export const BREADCRUMB_LABELS = {
  'products': 'Products',
  'solutions': 'Solutions',
  'technology': 'Technology',
  'case-studies': 'Case Studies',
  'applications': 'Applications',
  'resources': 'Resources',
  'tools': 'Tools',
  'knowledge': 'Knowledge Base',
  'lumimorph': 'LumiMorph',
  'naturatex': 'NaturaTex',
  'signatouch': 'SignaTouch',
  'glassmorph': 'GlassMorph',
  'pixelvue': 'PixelVue',
  'abu-dhabi': 'Abu Dhabi',
  'saudi-arabia': 'Saudi Arabia',
  'compare-brands': 'Compare Brands',
  'led-screen-suppliers-dubai': 'LED Screen Suppliers Dubai',
  'government-solutions': 'Government Solutions',
  'budget-estimator': 'Budget Estimator',
  'viewing-distance': 'Viewing Distance Calculator',
  'power-estimator': 'Power Estimator',
  'led-calculator': 'LED Calculator',
  'calculator': 'Screen Calculator',
  'technology-selector': 'Technology Selector',
  'project-planner': 'Project Planner',
  'installation-guide': 'Installation Guide',
  'cob-led': 'COB LED',
  'microled': 'MicroLED',
  'fine-pitch': 'Fine Pitch',
  'transparent': 'Transparent LED',
  'outdoor': 'Outdoor',
  'indoor': 'Indoor'
};
