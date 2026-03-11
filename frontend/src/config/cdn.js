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
  
  // Already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
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
  if (filename.startsWith('http')) return filename;
  const cleanName = filename.startsWith('/') ? filename.slice(1) : filename;
  if (cleanName.startsWith('videos/')) {
    return `${EXTERNAL_CDN}/${cleanName}`;
  }
  return `${EXTERNAL_CDN}/videos/${cleanName}`;
}
