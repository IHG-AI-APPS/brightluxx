#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const origin = process.env.NEXT_PARITY_ORIGIN;
if (!origin) throw new Error('NEXT_PARITY_ORIGIN must be configured');

const baselinePath = path.resolve(__dirname, '..', '..', 'migration-baseline', 'routes.json');
const reportPath = path.resolve(__dirname, '..', '..', 'migration-baseline', 'next-route-parity-report.json');
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const redirects = [
  ['/our-works', '/projects'], ['/digital-solutions', '/solutions'], ['/products/led-display', '/products'],
  ['/products/indoor-led-display', '/indoor-led'], ['/products/outdoor-led-display', '/outdoor-led'],
  ['/products/spherical-led-display', '/products'], ['/products/transparent-led-display', '/glassmorph'],
  ['/products/rental-led-display', '/products'], ['/products/flexible-led-display', '/products'],
  ['/download-catalog', '/products'], ['/about-us', '/about'], ['/contact-us', '/contact'], ['/portfolio', '/projects'],
  ['/gallery', '/projects'], ['/led-screen-dubai', '/led-screen-suppliers-dubai'], ['/led-display-abu-dhabi', '/abu-dhabi'],
  ['/led-screen-saudi-arabia', '/saudi-arabia'], ['/led-screen-qatar', '/qatar'],
];
const redirectSources = new Set(redirects.map(([source]) => source));
const expected = baseline.filter((page) => page.classification === 'indexable' && !redirectSources.has(page.route));
const capture = (html, re) => (html.match(re) || [])[1] || '';
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const compact = (value) => decode(value).replace(/\s+/g, ' ').trim();
const canonical = (value) => compact(value).replace(/^https:\/\/brightluxx\.com\/$/, 'https://brightluxx.com');
const schemaTypes = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
  try {
    const data = JSON.parse(match[1]);
    return (Array.isArray(data) ? data : [data]).flatMap((item) => Array.isArray(item['@type']) ? item['@type'] : [item['@type']]).filter(Boolean);
  } catch { return ['INVALID_JSON_LD']; }
});

async function check(page) {
  const response = await fetch(`${origin}${page.route}`);
  const html = await response.text();
  const actual = {
    status: response.status,
    title: compact(capture(html, /<title>([^<]*)<\/title>/)),
    description: compact(capture(html, /<meta name="description" content="([^"]*)"/)),
    canonical: canonical(capture(html, /<link rel="canonical" href="([^"]*)"/)),
    h1: compact(capture(html, /<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]*>/g, '')),
    schemaTypes: schemaTypes(html),
  };
  const failures = [];
  if (actual.status !== 200) failures.push(`status:${actual.status}`);
  for (const field of ['title', 'description', 'h1']) if (compact(page[field] || '') !== actual[field]) failures.push(`${field}:mismatch`);
  if (canonical(page.canonical || '') !== actual.canonical) failures.push('canonical:mismatch');
  for (const type of page.schemaTypes || []) if (!actual.schemaTypes.includes(type)) failures.push(`schema:${type}:missing`);
  return { route: page.route, failures, actual };
}

async function main() {
  const results = [];
  const queue = [...expected];
  await Promise.all(Array.from({ length: 12 }, async () => {
    while (queue.length) results.push(await check(queue.shift()));
  }));
  const sitemap = await fetch(`${origin}/sitemap.xml`).then((response) => response.text());
  const missingSitemapRoutes = expected.filter((page) => !sitemap.includes(`<loc>https://brightluxx.com${page.route === '/' ? '' : page.route}</loc>`)).map((page) => page.route);
  const statusTests = await Promise.all([
    ...redirects.map(([route, destination]) => fetch(`${origin}${route}`, { redirect: 'manual' }).then((response) => ({ route, destination, status: response.status, location: response.headers.get('location') }))),
    fetch(`${origin}/definitely-missing`).then((response) => ({ route: '/definitely-missing', status: response.status })),
    fetch(`${origin}/products/hjdba`).then((response) => ({ route: '/products/hjdba', status: response.status })),
  ]);
  const failures = results.filter((result) => result.failures.length);
  const report = { checkedAt: new Date().toISOString(), origin, expectedRoutes: expected.length, failedRoutes: failures.length, missingSitemapRoutes, statusTests, failures: failures.slice(0, 100) };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  const badStatus = statusTests.some((test) => test.destination ? test.status !== 308 || test.location !== test.destination : test.route === '/definitely-missing' ? test.status !== 404 : test.status !== 410);
  if (failures.length || missingSitemapRoutes.length || badStatus) process.exit(1);
}

main().catch((error) => { console.error(error); process.exit(1); });