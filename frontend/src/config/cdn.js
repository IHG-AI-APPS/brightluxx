/**
 * External CDN configuration for all media assets.
 * All images and videos are served from the external file server.
 */
export const EXTERNAL_CDN = 'https://files.ihgbrands.com/brightluxx';

/**
 * Helper function to get the full CDN URL for an asset.
 * @param {string} path - The asset path (e.g., 'uploads/image.webp' or just 'image.webp')
 * @returns {string} - Full CDN URL
 */
export function cdnUrl(path) {
  if (!path) return '';
  
  // Already a full URL pointing to our CDN
  if (path.startsWith('https://files.ihgbrands.com')) {
    return path;
  }
  
  // Already a full external URL (other domains) - return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Handle local generated images - redirect to CDN
  if (cleanPath.startsWith('generated-images/')) {
    return `${EXTERNAL_CDN}/${cleanPath}`;
  }
  
  // Handle local downloaded images - redirect to CDN
  if (cleanPath.startsWith('downloaded-images/')) {
    return `${EXTERNAL_CDN}/${cleanPath}`;
  }
  
  // Handle assets folder (logos, etc.)
  if (cleanPath.startsWith('assets/')) {
    return `${EXTERNAL_CDN}/${cleanPath}`;
  }
  
  // Handle old /api/cdn/ paths
  if (cleanPath.startsWith('api/cdn/')) {
    const filename = cleanPath.replace('api/cdn/', '');
    return `${EXTERNAL_CDN}/uploads/${filename}`;
  }
  
  // Handle paths that already include 'uploads/'
  if (cleanPath.startsWith('uploads/')) {
    return `${EXTERNAL_CDN}/${cleanPath}`;
  }
  
  // Default: assume it's an uploads file
  return `${EXTERNAL_CDN}/uploads/${cleanPath}`;
}

/**
 * Helper function for video assets.
 * @param {string} filename - Video filename
 * @returns {string} - Full CDN URL for video
 */
export function cdnVideoUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('https://files.ihgbrands.com')) return filename;
  if (filename.startsWith('http')) return filename;
  
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('videos/')) {
    return `${EXTERNAL_CDN}/${cleanName}`;
  }
  return `${EXTERNAL_CDN}/videos/${cleanName}`;
}

/**
 * Helper function for asset files (logos, favicons, etc.)
 * @param {string} filename - Asset filename
 * @returns {string} - Full CDN URL for asset
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
