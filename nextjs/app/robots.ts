import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/configurator', '/calculator', '/compare', '/__migration-parity'] }], sitemap: 'https://brightluxx.com/sitemap.xml' };
}