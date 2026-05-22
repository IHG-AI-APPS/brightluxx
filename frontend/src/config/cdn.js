/**
 * CDN configuration — All media served from files.ihgbrands.com
 */
export const EXTERNAL_CDN = 'https://files.ihgbrands.com';

/**
 * Helper function to get the full CDN URL for an asset.
 * @param {string} path - The asset path
 * @returns {string} - Full CDN URL
 */
export function cdnUrl(path) {
  if (!path) return '';
  
  // Already a full URL pointing to our CDN
  if (path.startsWith('https://files.ihgbrands.com')) {
    return path;
  }
  
  // Already a full external URL - return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Handle local asset folder paths (logos still in /assets/)
  if (cleanPath.startsWith('assets/')) {
    return `${EXTERNAL_CDN}/${cleanPath}`;
  }
  
  // Handle directory-based paths → flatten to CDN
  if (cleanPath.startsWith('generated-images/') ||
      cleanPath.startsWith('downloaded-images/') ||
      cleanPath.startsWith('uploads/') ||
      cleanPath.startsWith('artmorph/') ||
      cleanPath.startsWith('site-images/') ||
      cleanPath.startsWith('nav-images/') ||
      cleanPath.startsWith('homepage/')) {
    const flattened = cleanPath.replace(/\//g, '_');
    return `${EXTERNAL_CDN}/${flattened}`;
  }
  
  // Handle old /api/cdn/ paths
  if (cleanPath.startsWith('api/cdn/')) {
    const filename = cleanPath.replace('api/cdn/', '');
    return `${EXTERNAL_CDN}/uploads_${filename}`;
  }
  
  // Default: assume it's in uploads
  return `${EXTERNAL_CDN}/uploads_${cleanPath}`;
}

/**
 * Helper function for video assets.
 */
export function cdnVideoUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('https://files.ihgbrands.com')) return filename;
  if (filename.startsWith('http')) return filename;
  
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('videos/')) {
    return `${EXTERNAL_CDN}/${cleanName.replace(/\//g, '_')}`;
  }
  return `${EXTERNAL_CDN}/videos_${cleanName}`;
}

/**
 * Helper function for asset files (logos, favicons, etc.)
 */
export function cdnAssetUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('https://files.ihgbrands.com')) return filename;
  if (filename.startsWith('http')) return filename;
  
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('assets/')) {
    return `${EXTERNAL_CDN}/${cleanName}`;
  }
  return `${EXTERNAL_CDN}/assets/${cleanName}`;
}
