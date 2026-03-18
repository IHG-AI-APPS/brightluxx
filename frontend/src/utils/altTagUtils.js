/**
 * Image Alt Tag Utilities for SEO Optimization
 * Follows the formula: [Product Type] [Key Spec] [Application/Location] [Brand]
 * Max 125 characters for accessibility
 */

/**
 * Generate optimized alt tag for product images
 * @param {Object} product - Product object with name, category, specs
 * @returns {string} Optimized alt text
 */
export function generateProductAlt(product) {
  if (!product) return 'LED display Brightluxx';
  
  const { name, category, pixel_pitch, brightness, application } = product;
  
  // Build alt tag components
  const parts = [];
  
  // Product name/type
  if (name) parts.push(name);
  
  // Key spec (pixel pitch or brightness)
  if (pixel_pitch) parts.push(pixel_pitch);
  else if (brightness) parts.push(`${brightness} nits`);
  
  // Application context
  if (application) parts.push(`for ${application}`);
  else if (category) parts.push(getCategoryContext(category));
  
  // Brand
  parts.push('Brightluxx Dubai');
  
  // Join and truncate to 125 chars
  return truncateAlt(parts.join(' '));
}

/**
 * Generate optimized alt tag for installation/case study images
 * @param {Object} project - Project/case study object
 * @returns {string} Optimized alt text
 */
export function generateInstallationAlt(project) {
  if (!project) return 'LED display installation Dubai';
  
  const { title, client, location, category, technology } = project;
  
  const parts = [];
  
  // Project type
  if (title) parts.push(title);
  else parts.push('LED display installation');
  
  // Technology if available
  if (technology) parts.push(technology);
  
  // Location
  if (location) parts.push(location);
  else if (client) parts.push(`at ${client}`);
  
  // Category context
  if (category) parts.push(getCategoryContext(category));
  
  return truncateAlt(parts.join(' '));
}

/**
 * Generate optimized alt tag for solution/industry images
 * @param {string} industry - Industry name
 * @param {string} context - Additional context (e.g., "video wall", "digital signage")
 * @returns {string} Optimized alt text
 */
export function generateSolutionAlt(industry, context = 'LED display') {
  const parts = [context, 'for', industry, 'Dubai UAE'];
  return truncateAlt(parts.join(' '));
}

/**
 * Generate optimized alt tag for technology images
 * @param {string} techName - Technology name (e.g., "MicroLED", "COB")
 * @param {string} detail - Additional detail
 * @returns {string} Optimized alt text
 */
export function generateTechnologyAlt(techName, detail = '') {
  const parts = [techName, 'LED technology'];
  if (detail) parts.push(detail);
  parts.push('Brightluxx');
  return truncateAlt(parts.join(' '));
}

/**
 * Generate optimized alt tag for application/gallery images
 * @param {string} appName - Application name
 * @param {number} index - Image index for gallery
 * @returns {string} Optimized alt text
 */
export function generateApplicationAlt(appName, index = null) {
  const parts = ['LED screen installation'];
  if (appName) parts.push(`for ${appName}`);
  parts.push('Dubai');
  if (index !== null) parts.push(`example ${index + 1}`);
  return truncateAlt(parts.join(' '));
}

/**
 * Generate optimized alt tag for hero/banner images
 * @param {string} pageName - Page name or section
 * @param {string} context - Context description
 * @returns {string} Optimized alt text
 */
export function generateHeroAlt(pageName, context = '') {
  const parts = [pageName];
  if (context) parts.push(context);
  parts.push('LED displays Brightluxx Dubai');
  return truncateAlt(parts.join(' '));
}

/**
 * Get context phrase for product category
 * @param {string} category - Product category slug
 * @returns {string} Context phrase
 */
function getCategoryContext(category) {
  const contexts = {
    'cob-microled': 'COB MicroLED display',
    'mip': 'MiP LED display',
    'fine-pitch-indoor': 'fine pitch indoor display',
    'all-in-one': 'all-in-one LED display',
    'dvled': 'direct view LED',
    'transparent': 'transparent LED screen',
    'flexible': 'flexible LED display',
    'outdoor': 'outdoor LED screen Dubai',
    'high-brightness': 'high brightness outdoor display',
    'rental': 'rental LED screen',
    'creative': 'creative LED display',
    'interactive-floor': 'interactive floor LED',
    'cinema': 'cinema LED screen',
    'mesh': 'LED mesh display',
    'poster': 'LED poster display',
    'naked-eye-3d': '3D LED display',
    'shelf-edge': 'shelf edge LED',
    'sphere': 'LED sphere display',
    'indoor': 'indoor LED screen',
    'retail': 'retail LED display',
    'corporate': 'corporate video wall',
    'hospitality': 'hospitality LED display',
    'healthcare': 'healthcare digital signage',
    'education': 'education LED display',
    'transportation': 'transportation LED signage'
  };
  
  return contexts[category] || 'LED display';
}

/**
 * Truncate alt text to 125 characters
 * @param {string} text - Alt text to truncate
 * @returns {string} Truncated text
 */
function truncateAlt(text) {
  if (!text) return 'LED display Brightluxx';
  if (text.length <= 125) return text;
  return text.substring(0, 122) + '...';
}

/**
 * Validate alt text meets SEO requirements
 * @param {string} alt - Alt text to validate
 * @returns {Object} Validation result with issues
 */
export function validateAlt(alt) {
  const issues = [];
  
  if (!alt || alt.trim() === '') {
    issues.push('Alt text is empty');
  }
  
  if (alt && alt.length > 125) {
    issues.push('Alt text exceeds 125 characters');
  }
  
  if (alt && alt.toLowerCase().startsWith('image of')) {
    issues.push('Alt text should not start with "image of"');
  }
  
  if (alt && alt.toLowerCase().startsWith('photo of')) {
    issues.push('Alt text should not start with "photo of"');
  }
  
  return {
    valid: issues.length === 0,
    issues,
    length: alt?.length || 0
  };
}

// Pre-built alt tags for common images
export const COMMON_ALTS = {
  // Product family images
  lumimorph: 'LumiMorph texture LED display with wood finish Brightluxx Dubai',
  naturatex: 'NaturaTex decorative LED screen natural texture Brightluxx',
  signatouch: 'SignaTouch interactive kiosk touchscreen display Dubai',
  glassmorph: 'GlassMorph transparent smart glass LED Dubai',
  pixelvue: 'PixelVue commercial LED display digital signage',
  
  // Solution images
  retail: 'Retail LED display shopping mall Dubai digital signage',
  corporate: 'Corporate video wall conference room LED display Dubai',
  outdoor: 'Outdoor LED billboard high brightness Dubai highway',
  events: 'Event LED screen concert stage rental display Dubai',
  hospitality: 'Hotel lobby LED video wall luxury hospitality Dubai',
  healthcare: 'Hospital digital signage LED display healthcare UAE',
  
  // Technology images
  microled: 'MicroLED technology ultra-fine pixel premium display',
  cob: 'COB LED chip-on-board technology close-up',
  transparent: 'Transparent LED screen see-through glass display',
  
  // Location images
  dubai: 'LED screen installation Dubai skyline cityscape',
  abuDhabi: 'LED display Abu Dhabi corporate building',
  saudiArabia: 'LED video wall Saudi Arabia Vision 2030 project'
};
