#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const sourceBuild = path.resolve(__dirname, '..', '..', 'frontend', 'build');
const sourceInventory = path.resolve(__dirname, '..', '..', 'migration-baseline', 'routes.json');
const destination = path.resolve(__dirname, '..', 'data', 'legacy-pages.json');
const inventory = JSON.parse(fs.readFileSync(sourceInventory, 'utf8'));
const root = (html) => html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<noscript|$)/)?.[1] || '';
const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const fileFor = (route) => route === '/' ? path.join(sourceBuild, 'index.html') : path.join(sourceBuild, route, 'index.html');

const pages = inventory
  .filter((page) => !page.route.includes('hjdba') && page.classification !== 'redirect')
  .map((page) => {
    const html = fs.readFileSync(fileFor(page.route), 'utf8');
    return { ...page, html: root(html), jsonLd: jsonLd(html) };
  });

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, `${JSON.stringify(pages)}\n`);
console.log(`Embedded ${pages.length} CRA page snapshots for Worker-safe parity rendering.`);