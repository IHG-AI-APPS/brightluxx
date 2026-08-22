export type LegacyPage = { route: string; title: string; description: string; canonical: string; h1: string; schemaTypes: string[] };

type EmbeddedPage = LegacyPage & { classification: string; html: string; jsonLd: string[] };
const assetPath = '/_data/legacy-pages.json';
let pagesPromise: Promise<EmbeddedPage[]> | undefined;

async function loadPages(): Promise<EmbeddedPage[]> {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    const { readFile } = await import('node:fs/promises');
    return JSON.parse(await readFile(`${process.cwd()}/public/_data/legacy-pages.json`, 'utf8')) as EmbeddedPage[];
  }
  const { getCloudflareContext } = await import('@opennextjs/cloudflare');
  const assets = getCloudflareContext().env.ASSETS;
  if (!assets) throw new Error('Legacy page asset binding is unavailable');
  const response = await assets.fetch(`https://brightluxx.com${assetPath}`);
  if (!response.ok) throw new Error(`Legacy page asset request failed: ${response.status}`);
  return response.json() as Promise<EmbeddedPage[]>;
}

async function getPages() {
  pagesPromise ||= loadPages();
  return pagesPromise;
}

export async function getInventory(): Promise<EmbeddedPage[]> {
  return getPages();
}

export async function getLegacyPage(route: string) {
  const pages = await getPages();
  return pages.find((candidate) => candidate.route === route) || null;
}

export async function getIndexableRoutes() {
  const inventory = await getInventory();
  return inventory.filter((page) => page.classification === 'indexable' && Array.isArray(page.schemaTypes) && page.schemaTypes.length > 0);
}

export function getPageKeywords(page: LegacyPage) {
  const routeTerms = page.route.split('/').filter(Boolean).flatMap((part) => part.split('-')).filter((term) => term.length > 2);
  return Array.from(new Set([...page.title.replace(/[|—–]/g, ' ').split(/\s+/), ...routeTerms, 'LED display', 'digital signage', 'Brightluxx', 'UAE', 'GCC'])).filter((term) => term.length > 2).slice(0, 14);
}

export function enrichLegacyHtml(html: string, page: LegacyPage) {
  const alt = `${page.h1} — Brightluxx LED display and digital signage solution`.replace(/"/g, '&quot;');
  return html.replace(/<img(?![^>]*\balt=)/gi, `<img alt="${alt}"`);
}