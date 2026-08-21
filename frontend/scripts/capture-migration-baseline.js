#!/usr/bin/env node
/* Immutable CRA parity baseline for the Next.js migration. */
const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const buildDir = path.join(appRoot, 'build');
const outDir = path.resolve(appRoot, '..', 'migration-baseline');
const productionOrigin = 'https://brightluxx.com';
const previewOrigin = process.env.REACT_APP_BACKEND_URL;
const representatives = [
  '/', '/products', '/products/bl-cob060', '/dubai', '/saudi-arabia',
  '/solutions/retail', '/case-studies/adnoc-hq-command-center',
  '/resources', '/compare', '/contact',
];

const decode = (value = '') => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
const routeFromFile = (file) => {
  const relative = path.relative(buildDir, path.dirname(file));
  return relative === '' ? '/' : `/${relative.replaceAll(path.sep, '/')}`;
};
const collect = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(dir, entry.name);
  if (entry.isDirectory()) return entry.name === 'static' ? [] : collect(entryPath);
  return entry.name === 'index.html' ? [entryPath] : [];
});
const attr = (html, re) => decode((html.match(re) || [])[1] || '').trim();
const text = (html, re) => decode((html.match(re) || [])[1] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const schemaTypes = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      const values = Array.isArray(parsed) ? parsed : [parsed];
      return values.flatMap((value) => Array.isArray(value['@type']) ? value['@type'] : [value['@type']]).filter(Boolean);
    } catch { return ['INVALID_JSON_LD']; }
  });
const copy = (source, destination) => fs.copyFileSync(source, destination);
const size = (file) => fs.existsSync(file) ? fs.statSync(file).size : 0;

async function main() {
  if (!fs.existsSync(buildDir)) throw new Error('CRA build directory is missing. Run yarn build first.');
  fs.mkdirSync(path.join(outDir, 'raw-html'), { recursive: true });
  const routes = collect(buildDir).map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    const redirectTarget = attr(html, /<link rel="canonical" href="([^"]*)"/);
    const isRedirect = /http-equiv="refresh"/i.test(html);
    const isNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
    return {
      route: routeFromFile(file),
      classification: isRedirect ? 'redirect' : isNoindex ? 'non-indexable' : 'indexable',
      statusIntent: isRedirect ? '301' : '200',
      canonical: redirectTarget,
      title: attr(html, /<title>([^<]*)<\/title>/),
      description: attr(html, /<meta name="description" content="([^"]*)"/),
      h1: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/),
      schemaTypes: schemaTypes(html),
      sitemapStatus: isRedirect || isNoindex ? 'excluded' : 'expected',
      byteSize: Buffer.byteLength(html),
    };
  }).sort((a, b) => a.route.localeCompare(b.route));

  const assets = ['static/js', 'static/css'].flatMap((directory) => {
    const absolute = path.join(buildDir, directory);
    if (!fs.existsSync(absolute)) return [];
    return fs.readdirSync(absolute).map((file) => ({ file: `${directory}/${file}`, bytes: size(path.join(absolute, file)) }));
  });
  const assetTotals = {
    javascriptBytes: assets.filter((asset) => asset.file.endsWith('.js')).reduce((sum, asset) => sum + asset.bytes, 0),
    cssBytes: assets.filter((asset) => asset.file.endsWith('.css')).reduce((sum, asset) => sum + asset.bytes, 0),
    requestCount: assets.length,
  };

  for (const route of representatives) {
    const source = route === '/' ? path.join(buildDir, 'index.html') : path.join(buildDir, route, 'index.html');
    if (fs.existsSync(source)) copy(source, path.join(outDir, 'raw-html', `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '__')}.html`));
  }
  copy(path.join(appRoot, 'public', 'robots.txt'), path.join(outDir, 'robots.txt'));
  copy(path.join(appRoot, 'public', 'llms.txt'), path.join(outDir, 'llms.txt'));

  const report = {
    capturedAt: new Date().toISOString(),
    architecture: 'CRA + React Router + custom static prerendering',
    productionOrigin,
    baselinePreviewOrigin: previewOrigin || null,
    counts: {
      totalRoutes: routes.length,
      indexable: routes.filter((route) => route.classification === 'indexable').length,
      redirects: routes.filter((route) => route.classification === 'redirect').length,
      nonIndexable: routes.filter((route) => route.classification === 'non-indexable').length,
    },
    performanceBuildProxy: assetTotals,
    notes: [
      'Build asset byte counts are a reproducible payload proxy, not field Web Vitals.',
      'The deployed production origin requires separate post-cutover HTTP verification.',
      'The 43 existing metadata-length warnings are baseline warnings, not migration failures.',
    ],
  };
  fs.writeFileSync(path.join(outDir, 'routes.json'), `${JSON.stringify(routes, null, 2)}\n`);
  fs.writeFileSync(path.join(outDir, 'baseline-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(outDir, 'asset-manifest.json'), `${JSON.stringify(assets, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });