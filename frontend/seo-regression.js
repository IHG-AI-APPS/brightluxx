#!/usr/bin/env node
/* SEO regression suite for the prerendered build output (frontend/build).
   Run after `yarn build`. Exits non-zero on any critical FAIL. */
const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "build");
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "seo-regression.config.json"), "utf8"));
const PROD = CONFIG.prodUrl;
const REPORT_DIR = path.join(__dirname, "seo-reports");

const issues = []; // {level: FAIL|WARN, route, check, detail}
const fail = (route, check, detail) => issues.push({ level: "FAIL", route, check, detail });
const warn = (route, check, detail) => issues.push({ level: "WARN", route, check, detail });

function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
}
function attr(html, re) { const m = html.match(re); return m ? decode(m[1]).trim() : null; }
function allMatches(html, re) { const out = []; let m; while ((m = re.exec(html)) !== null) out.push(m[1]); return out; }

function collectPages(dir, base) {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === "static") continue;
      pages.push(...collectPages(path.join(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name === "index.html") {
      pages.push({ route: base === "" ? "/" : base, file: path.join(dir, "index.html") });
    }
  }
  return pages;
}

function parsePage(p) {
  const html = fs.readFileSync(p.file, "utf8");
  const isStub = /http-equiv="refresh"/i.test(html);
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<noscript|$)/);
  const rootHtml = rootMatch ? rootMatch[1] : "";
  const rootText = decode(rootHtml.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return {
    ...p, html, isStub,
    title: attr(html, /<title>([^<]*)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    canonicals: allMatches(html, /<link rel="canonical" href="([^"]*)"/g),
    robots: allMatches(html, /<meta name="robots" content="([^"]*)"/g),
    ogTitle: attr(html, /<meta property="og:title" content="([^"]*)"/),
    ogDescription: attr(html, /<meta property="og:description" content="([^"]*)"/),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/),
    twitterCard: attr(html, /<meta (?:name|property)="twitter:card" content="([^"]*)"/),
    h1s: allMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map(h => decode(h.replace(/<[^>]+>/g, "")).trim()),
    jsonLd: allMatches(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    rootText,
    rootAnchors: allMatches(rootHtml, /<a [^>]*href="([^"]*)"/g),
  };
}

function shingles(text, n = 3) {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i <= words.length - n; i++) set.add(words.slice(i, i + n).join(" "));
  return set;
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

function fetchText(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 5000 }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(res.statusCode === 200 ? data : null));
    });
    req.on("error", () => resolve(null));
    req.on("timeout", () => { req.destroy(); resolve(null); });
  });
}

async function run() {
  if (!fs.existsSync(BUILD_DIR)) { console.error("FAIL: build/ directory missing. Run yarn build first."); process.exit(1); }

  const pages = collectPages(BUILD_DIR, "").map(parsePage);
  const stubs = pages.filter(p => p.isStub);
  const indexable = pages.filter(p => !p.isStub && !CONFIG.noindexAllowed.includes(p.route));
  console.log(`Scanning ${pages.length} pages (${indexable.length} indexable, ${stubs.length} redirect stubs)`);

  // ── Global structural checks ─────────────────────────────
  if (pages.length < CONFIG.minTotalPages)
    fail("(global)", "page-count", `Only ${pages.length} pages in build; expected >= ${CONFIG.minTotalPages}`);
  for (const r of CONFIG.requiredRoutes) {
    const p = pages.find(x => x.route === r);
    if (!p) fail(r, "required-route-missing", "No prerendered HTML for this required route");
    else if (p.isStub) fail(r, "required-route-is-stub", "Required route was overwritten by a redirect stub");
  }
  for (const [prefix, min] of Object.entries(CONFIG.minRouteCounts)) {
    const n = indexable.filter(p => p.route.startsWith(prefix) && p.route !== prefix.replace(/\/$/, "")).length;
    if (n < min) fail("(global)", "route-count", `${prefix}* has ${n} indexable pages; expected >= ${min}`);
  }
  if (!fs.existsSync(path.join(BUILD_DIR, "404.html")))
    fail("(global)", "404-page", "build/404.html missing");
  else {
    const h404 = fs.readFileSync(path.join(BUILD_DIR, "404.html"), "utf8");
    if (!/name="robots" content="[^"]*noindex/.test(h404)) fail("/404.html", "404-noindex", "404.html must carry noindex");
  }

  // ── Per-page checks (indexable pages) ────────────────────
  const placeholderRes = CONFIG.placeholderPatterns.map(p => new RegExp(p, "i"));
  for (const p of indexable) {
    const r = p.route;
    // SPA shell
    if (!p.rootText || p.rootText.length < 40)
      fail(r, "spa-shell", `div#root has no prerendered content (${p.rootText.length} chars)`);
    // Title
    if (!p.title) fail(r, "title-missing", "No <title>");
    else {
      if (p.title.length < CONFIG.titleLength.min) warn(r, "title-short", `${p.title.length} chars: "${p.title}"`);
      if (p.title.length > CONFIG.titleLength.max) warn(r, "title-long", `${p.title.length} chars`);
    }
    // Description
    if (!p.description) fail(r, "description-missing", "No meta description");
    else {
      if (p.description.length < CONFIG.descriptionLength.min) warn(r, "description-short", `${p.description.length} chars`);
      if (p.description.length > CONFIG.descriptionLength.max) warn(r, "description-long", `${p.description.length} chars`);
    }
    // Canonical
    if (p.canonicals.length !== 1) fail(r, "canonical-count", `${p.canonicals.length} canonical tags (expected exactly 1)`);
    else {
      const c = p.canonicals[0];
      if (!c.startsWith("https://")) fail(r, "canonical-not-https", c);
      else if (!c.startsWith(PROD)) fail(r, "canonical-wrong-domain", c);
      else {
        const expected = CONFIG.canonicalExceptions[r] || (r === "/" ? `${PROD}/` : `${PROD}${r}`);
        if (c.replace(/\/$/, "") !== expected.replace(/\/$/, ""))
          fail(r, "canonical-mismatch", `canonical=${c} expected=${expected}`);
      }
    }
    // Robots
    const noindexTags = p.robots.filter(x => /noindex/i.test(x));
    if (noindexTags.length) fail(r, "unexpected-noindex", `robots="${noindexTags[0]}" on an indexable page`);
    // H1
    if (p.h1s.length === 0) fail(r, "h1-missing", "No <h1> in prerendered HTML");
    else if (p.h1s.length > 1) fail(r, "h1-multiple", `${p.h1s.length} h1 tags: ${p.h1s.slice(0, 3).join(" | ")}`);
    // JSON-LD
    p.jsonLd.forEach((block, i) => {
      try { JSON.parse(block); } catch (e) { fail(r, "jsonld-invalid", `block ${i + 1}: ${e.message}`); }
    });
    if (p.jsonLd.length === 0) warn(r, "jsonld-missing", "No JSON-LD structured data");
    // OG / Twitter
    if (!p.ogTitle) warn(r, "og-title-missing", "No og:title");
    if (!p.ogDescription) warn(r, "og-description-missing", "No og:description");
    if (!p.ogImage) warn(r, "og-image-missing", "No og:image");
    else if (!p.ogImage.startsWith("https://")) fail(r, "og-image-not-https", p.ogImage);
    if (!p.twitterCard) warn(r, "twitter-card-missing", "No twitter:card");
    // Internal links must be real root-relative or same-domain hrefs
    for (const a of p.rootAnchors) {
      if (!(a.startsWith("/") || a.startsWith(PROD) || a.startsWith("https://") || a.startsWith("mailto:") || a.startsWith("tel:")))
        fail(r, "bad-internal-href", `href="${a}"`);
      if (a === "#" || a === "" || a.startsWith("javascript:"))
        fail(r, "bad-internal-href", `href="${a}"`);
    }
    // Placeholder content
    const scanText = `${p.title || ""} ${p.description || ""} ${p.rootText}`;
    for (const re of placeholderRes) {
      const m = scanText.match(re);
      if (m) fail(r, "placeholder-content", `Matched "${m[0]}"`);
    }
    // Forbidden address fragments inside PostalAddress schema
    for (const block of p.jsonLd) {
      for (const frag of CONFIG.forbiddenAddressFragments) {
        if (block.includes('"PostalAddress"') && block.includes(frag))
          fail(r, "stale-address-schema", `PostalAddress contains "${frag}"`);
      }
    }
  }

  // ── Redirect stub sanity ─────────────────────────────────
  for (const s of stubs) {
    if (!/name="robots" content="noindex"/.test(s.html)) fail(s.route, "stub-missing-noindex", "Redirect stub lacks noindex");
    if (s.canonicals.length !== 1 || !s.canonicals[0].startsWith(PROD)) fail(s.route, "stub-canonical", "Stub must carry a single canonical to its target");
    else {
      const targetRoute = s.canonicals[0].slice(PROD.length) || "/";
      const target = pages.find(p => p.route === targetRoute);
      if (!target) fail(s.route, "stub-target-missing", `Redirect target ${targetRoute} has no prerendered page`);
      else if (target.isStub) fail(s.route, "stub-chain", `Redirect target ${targetRoute} is itself a stub (redirect chain)`);
    }
  }

  // ── Duplicate detection across indexable pages ───────────
  const dupCheck = (field, level, allowKey) => {
    const map = new Map();
    for (const p of indexable) {
      const v = field === "h1" ? p.h1s[0] : field === "canonical" ? p.canonicals[0] : p[field];
      if (!v) continue;
      if (!map.has(v)) map.set(v, []);
      map.get(v).push(p.route);
    }
    for (const [v, routes] of map) {
      if (routes.length > 1 && !(CONFIG[allowKey] || []).includes(v)) {
        const rec = { level, route: routes.join(", "), check: `duplicate-${field}`, detail: `"${String(v).slice(0, 90)}"` };
        issues.push(rec);
      }
    }
  };
  dupCheck("title", "FAIL", "duplicateTitleAllowed");
  dupCheck("canonical", "FAIL", null);
  dupCheck("description", "WARN", "duplicateDescriptionAllowed");
  dupCheck("h1", "WARN", null);

  // ── /products listing must contain real products ─────────
  const prodPage = pages.find(p => p.route === "/products");
  if (prodPage) {
    const productLinks = prodPage.rootAnchors.filter(a => a.startsWith("/products/"));
    if (productLinks.length < 10) fail("/products", "products-listing", `Only ${productLinks.length} product links in initial HTML (expected >= 10)`);
  }

  // ── City page content uniqueness ─────────────────────────
  const cityPages = CONFIG.cityRoutes.map(r => pages.find(p => p.route === r)).filter(Boolean);
  const citySh = cityPages.map(p => ({ route: p.route, sh: shingles(p.rootText) }));
  for (let i = 0; i < citySh.length; i++) {
    for (let j = i + 1; j < citySh.length; j++) {
      const sim = jaccard(citySh[i].sh, citySh[j].sh);
      if (sim > CONFIG.citySimilarityMax)
        fail(`${citySh[i].route} vs ${citySh[j].route}`, "city-content-duplicate", `similarity ${(sim * 100).toFixed(1)}% > ${CONFIG.citySimilarityMax * 100}%`);
    }
  }

  // ── Sitemap validation ───────────────────────────────────
  const sitemapXml = await fetchText(CONFIG.backendSitemap);
  if (!sitemapXml) {
    warn("(sitemap)", "sitemap-unreachable", `${CONFIG.backendSitemap} not reachable; sitemap checks skipped`);
  } else {
    const locs = allMatches(sitemapXml, /<loc>([^<]+)<\/loc>/g);
    if (locs.length < CONFIG.minTotalPages * 0.8)
      fail("(sitemap)", "sitemap-count", `Only ${locs.length} URLs in sitemap`);
    for (const loc of locs) {
      if (/[?&]/.test(loc)) fail("(sitemap)", "sitemap-query-url", loc);
      if (!loc.startsWith(PROD)) { fail("(sitemap)", "sitemap-wrong-domain", loc); continue; }
      const route = loc.slice(PROD.length).replace(/\/$/, "") || "/";
      if (route.startsWith("/api/")) continue;
      const page = pages.find(p => p.route === route);
      if (!page) fail("(sitemap)", "sitemap-missing-page", `${loc} has no prerendered HTML`);
      else if (page.isStub) fail("(sitemap)", "sitemap-lists-stub", `${loc} is a redirect stub and must not be in the sitemap`);
      else if (CONFIG.noindexAllowed.includes(route)) fail("(sitemap)", "sitemap-lists-noindex", loc);
    }
  }

  // ── Report ───────────────────────────────────────────────
  const fails = issues.filter(i => i.level === "FAIL");
  const warns = issues.filter(i => i.level === "WARN");
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const report = {
    timestamp: new Date().toISOString(),
    pagesScanned: pages.length,
    indexable: indexable.length,
    stubs: stubs.length,
    result: fails.length ? "FAIL" : "PASS",
    failCount: fails.length,
    warnCount: warns.length,
    issues,
  };
  fs.writeFileSync(path.join(REPORT_DIR, "seo-regression-report.json"), JSON.stringify(report, null, 2));
  const md = [
    `# SEO Regression Report — ${report.timestamp}`,
    ``,
    `**Result: ${report.result}** — ${pages.length} pages scanned (${indexable.length} indexable, ${stubs.length} redirect stubs)`,
    `Failures: ${fails.length} · Warnings: ${warns.length}`,
    ``,
    ...(fails.length ? ["## Failures (critical)", "", "| Route | Check | Detail |", "|---|---|---|",
      ...fails.map(i => `| ${i.route} | ${i.check} | ${String(i.detail).replace(/\|/g, "\\|")} |`), ""] : ["## Failures", "", "None ✅", ""]),
    ...(warns.length ? ["## Warnings (non-blocking)", "", "| Route | Check | Detail |", "|---|---|---|",
      ...warns.map(i => `| ${i.route} | ${i.check} | ${String(i.detail).replace(/\|/g, "\\|")} |`)] : []),
  ].join("\n");
  fs.writeFileSync(path.join(REPORT_DIR, "seo-regression-report.md"), md);

  console.log(`\n──────── SEO REGRESSION: ${report.result} ────────`);
  console.log(`Failures: ${fails.length}  Warnings: ${warns.length}`);
  for (const i of fails.slice(0, 40)) console.log(`  FAIL [${i.check}] ${i.route} — ${i.detail}`);
  if (fails.length > 40) console.log(`  ... and ${fails.length - 40} more failures`);
  const warnSummary = {};
  warns.forEach(w => { warnSummary[w.check] = (warnSummary[w.check] || 0) + 1; });
  Object.entries(warnSummary).forEach(([k, n]) => console.log(`  WARN [${k}] x${n}`));
  console.log(`Report: seo-reports/seo-regression-report.{json,md}`);
  process.exit(fails.length ? 1 : 0);
}

run().catch((e) => { console.error("Suite crashed:", e); process.exit(1); });
