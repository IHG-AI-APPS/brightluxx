/**
 * CDN configuration for all media assets.
 * Migrated from files.ihgbrands.com to local /recovered/ serving.
 * Files served from /app/frontend/public/recovered/ via the dev/production server.
 */

// No longer using external CDN — files served locally
export const EXTERNAL_CDN = '';

/**
 * Helper function to get the URL for an asset.
 * @param {string} path - The asset path (e.g., 'uploads/image.webp' or just 'image.webp')
 * @returns {string} - URL to the asset
 */
export function cdnUrl(path) {
  if (!path) return '';
  
  // Already a full external URL (Emergent static, etc.) - return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Paths already pointing to /recovered/ 
  if (cleanPath.startsWith('recovered/')) {
    return `/${cleanPath}`;
  }
  
  // Handle local asset folder paths (logos, etc. still in /assets/)
  if (cleanPath.startsWith('assets/')) {
    return `/${cleanPath}`;
  }
  
  // Handle old directory-based paths → flatten to /recovered/
  if (cleanPath.startsWith('generated-images/') ||
      cleanPath.startsWith('downloaded-images/') ||
      cleanPath.startsWith('uploads/') ||
      cleanPath.startsWith('artmorph/') ||
      cleanPath.startsWith('site-images/') ||
      cleanPath.startsWith('nav-images/') ||
      cleanPath.startsWith('homepage/')) {
    const flattened = cleanPath.replace(/\//g, '_');
    return `/recovered/${flattened}`;
  }
  
  // Handle old /api/cdn/ paths
  if (cleanPath.startsWith('api/cdn/')) {
    const filename = cleanPath.replace('api/cdn/', '');
    return `/recovered/uploads_${filename}`;
  }
  
  // Default: assume it's in recovered/uploads_
  return `/recovered/uploads_${cleanPath}`;
}

/**
 * Helper function for video assets.
 * @param {string} filename - Video filename
 * @returns {string} - URL for video
 */
export function cdnVideoUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('recovered/')) return `/${cleanName}`;
  if (cleanName.startsWith('videos/')) {
    return `/recovered/${cleanName.replace(/\//g, '_')}`;
  }
  return `/recovered/videos_${cleanName}`;
}

/**
 * Helper function for asset files (logos, favicons, etc.)
 * @param {string} filename - Asset filename
 * @returns {string} - URL for asset
 */
export function cdnAssetUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('assets/')) {
    return `/${cleanName}`;
  }
  return `/assets/${cleanName}`;
}
