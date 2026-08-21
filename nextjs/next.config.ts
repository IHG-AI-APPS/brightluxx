import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

if (!process.env.API_ORIGIN) throw new Error('API_ORIGIN must be configured');

initOpenNextCloudflareForDev();

const legacyRedirects = [
  ['/our-works', '/projects'], ['/digital-solutions', '/solutions'], ['/products/led-display', '/products'],
  ['/products/indoor-led-display', '/indoor-led'], ['/products/outdoor-led-display', '/outdoor-led'],
  ['/products/spherical-led-display', '/products'], ['/products/transparent-led-display', '/glassmorph'],
  ['/products/rental-led-display', '/products'], ['/products/flexible-led-display', '/products'],
  ['/download-catalog', '/products'], ['/about-us', '/about'], ['/contact-us', '/contact'],
  ['/portfolio', '/projects'], ['/gallery', '/projects'], ['/led-screen-dubai', '/led-screen-suppliers-dubai'],
  ['/led-display-abu-dhabi', '/abu-dhabi'], ['/led-screen-saudi-arabia', '/saudi-arabia'], ['/led-screen-qatar', '/qatar'],
];

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${process.env.API_ORIGIN}/api/:path*` }];
  },
};

export default nextConfig;