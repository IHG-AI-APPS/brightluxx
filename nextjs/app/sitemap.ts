import type { MetadataRoute } from 'next';
import { getIndexableRoutes } from '../lib/legacy-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getIndexableRoutes();
  return routes.map((page) => ({ url: `https://brightluxx.com${page.route === '/' ? '' : page.route}` }));
}