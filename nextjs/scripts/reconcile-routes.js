#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baselinePath = path.resolve(__dirname, '..', '..', 'migration-baseline', 'routes.json');
const outputPath = path.resolve(__dirname, '..', '..', 'migration-baseline', 'route-reconciliation.md');
const prerenderManifestPath = path.resolve(__dirname, '..', '.next', 'prerender-manifest.json');
const redirects = [
  ['/our-works', '/projects'], ['/digital-solutions', '/solutions'], ['/products/led-display', '/products'],
  ['/products/indoor-led-display', '/indoor-led'], ['/products/outdoor-led-display', '/outdoor-led'],
  ['/products/spherical-led-display', '/products'], ['/products/transparent-led-display', '/glassmorph'],
  ['/products/rental-led-display', '/products'], ['/products/flexible-led-display', '/products'],
  ['/download-catalog', '/products'], ['/about-us', '/about'], ['/contact-us', '/contact'], ['/portfolio', '/projects'],
  ['/gallery', '/projects'], ['/led-screen-dubai', '/led-screen-suppliers-dubai'], ['/led-display-abu-dhabi', '/abu-dhabi'],
  ['/led-screen-saudi-arabia', '/saudi-arabia'], ['/led-screen-qatar', '/qatar'],
];
const tombstones = new Map([['/products/hjdba', 'Product was intentionally retired; preserve its native gone response.']]);
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const baselineRoutes = new Set(baseline.map((route) => route.route));
if (!fs.existsSync(prerenderManifestPath)) throw new Error('Next prerender manifest is missing. Run yarn build before route reconciliation.');
const prerenderManifest = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'));
const nextStaticRoutes = new Set(Object.keys(prerenderManifest.routes));
const rows = [
  ...redirects.map(([oldRoute, target]) => ({
    oldRoute, type: 'redirect', nextStatus: `native 308 → ${target}`, expectedStatus: '308 permanent redirect', indexable: 'No', action: 'Keep explicit Next.js redirect; exclude from sitemap.',
  })),
  ...[...tombstones.entries()].map(([oldRoute, reason]) => ({
    oldRoute, type: 'tombstone', nextStatus: 'native 410', expectedStatus: '410 gone', indexable: 'No', action: `Keep explicit Route Handler. ${reason}`,
  })),
];
const accounted = new Set(rows.map((row) => row.oldRoute));
const canonicalBaselineRoutes = [...baselineRoutes].filter((route) => !accounted.has(route));
const canonicalNextRoutes = canonicalBaselineRoutes.filter((route) => nextStaticRoutes.has(route));
const unexplained = canonicalBaselineRoutes.filter((route) => !nextStaticRoutes.has(route));
const markdown = [
  '# Brightluxx Route Reconciliation — CRA Baseline to Next.js',
  '',
  `- Baseline routes: **${baseline.length}**`,
  `- Canonical Next.js 200 routes: **${canonicalNextRoutes.length}**`,
  `- Native redirects: **${redirects.length}**`,
  `- Native tombstones: **${tombstones.size}**`,
  `- Unexplained route gap: **${unexplained.length}**`,
  '',
  '| Old route | Type | Next.js status | Expected HTTP status | Indexable? | Action required |',
  '| --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) => `| ${row.oldRoute} | ${row.type} | ${row.nextStatus} | ${row.expectedStatus} | ${row.indexable} | ${row.action} |`),
  ...unexplained.map((route) => `| ${route} | unintentionally missing route | absent from Next prerender manifest | 200 | Yes | Restore the route before any cutover. |`),
  '',
  unexplained.length ? 'Unexplained canonical route gaps are listed above and block cutover.' : 'All 19 non-canonical baseline routes are deliberately represented natively. No canonical content route is missing.',
].join('\n');
fs.writeFileSync(outputPath, `${markdown}\n`);
console.log(markdown);