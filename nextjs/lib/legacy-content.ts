import embeddedPages from '../data/legacy-pages.json';

export type LegacyPage = { route: string; title: string; description: string; canonical: string; h1: string; schemaTypes: string[] };

type EmbeddedPage = LegacyPage & { classification: string; html: string; jsonLd: string[] };
const pages = embeddedPages as EmbeddedPage[];

export async function getInventory(): Promise<LegacyPage[]> {
  return pages;
}

export async function getLegacyPage(route: string) {
  return pages.find((candidate) => candidate.route === route) || null;
}

export async function getIndexableRoutes() {
  const inventory = await getInventory();
  return inventory.filter((page) => page.schemaTypes && !page.route.includes('hjdba') && !page.route.includes('404') && !['/our-works', '/digital-solutions', '/download-catalog', '/about-us', '/contact-us', '/portfolio', '/gallery'].includes(page.route));
}