const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execSync } = require('child_process');

const appRoot = '/app';
const scriptPath = path.join(appRoot, 'nextjs', 'scripts', 'reconcile-routes.js');
const manifestPath = path.join(appRoot, 'nextjs', '.next', 'prerender-manifest.json');
const baselinePath = path.join(appRoot, 'migration-baseline', 'routes.json');
const reconciliationPath = path.join(appRoot, 'migration-baseline', 'route-reconciliation.md');

const nonCanonicalRoutes = [
  '/our-works',
  '/digital-solutions',
  '/products/led-display',
  '/products/indoor-led-display',
  '/products/outdoor-led-display',
  '/products/spherical-led-display',
  '/products/transparent-led-display',
  '/products/rental-led-display',
  '/products/flexible-led-display',
  '/download-catalog',
  '/about-us',
  '/contact-us',
  '/portfolio',
  '/gallery',
  '/led-screen-dubai',
  '/led-display-abu-dhabi',
  '/led-screen-saudi-arabia',
  '/led-screen-qatar',
  '/products/hjdba',
];

function run() {
  const scriptSource = fs.readFileSync(scriptPath, 'utf8');
  assert(!scriptSource.includes('.filter(() => false)'), 'Found forced empty unexplained filter in script');
  assert(scriptSource.includes('prerender-manifest.json'), 'Script does not reference prerender manifest');
  assert(scriptSource.includes('Object.keys(prerenderManifest.routes)'), 'Script does not derive route keys from manifest');

  const output = execSync(`node ${scriptPath}`, { encoding: 'utf8' });

  assert(output.includes('- Baseline routes: **352**'), 'Baseline count is not 352');
  assert(output.includes('- Canonical Next.js 200 routes: **333**'), 'Canonical Next.js count is not 333');
  assert(output.includes('- Native redirects: **18**'), 'Native redirect count is not 18');
  assert(output.includes('- Native tombstones: **1**'), 'Native tombstone count is not 1');
  assert(output.includes('- Unexplained route gap: **0**'), 'Unexplained route gap is not 0');

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const baselineRoutes = new Set(baseline.map((entry) => entry.route));
  const canonicalBaselineCount = [...baselineRoutes].filter((route) => !nonCanonicalRoutes.includes(route)).length;
  const canonicalFromManifest = [...baselineRoutes].filter(
    (route) => !nonCanonicalRoutes.includes(route) && Object.prototype.hasOwnProperty.call(manifest.routes, route)
  ).length;

  assert.strictEqual(canonicalBaselineCount, 333, 'Canonical baseline route count should be 333');
  assert.strictEqual(canonicalFromManifest, 333, 'Canonical route count from manifest should be 333');
  assert.strictEqual(333 + 18 + 1, 352, 'Accounting identity failed: canonical + redirects + tombstones != baseline');

  const reconciliation = fs.readFileSync(reconciliationPath, 'utf8');
  for (const route of nonCanonicalRoutes) {
    assert(reconciliation.includes(`| ${route} |`), `Missing non-canonical route in reconciliation markdown: ${route}`);
  }
  assert(
    reconciliation.includes('All 19 non-canonical baseline routes are deliberately represented natively.'),
    'Success statement for 19 non-canonical routes is missing'
  );

  console.log('Iteration 133 route reconciliation checks passed');
}

run();