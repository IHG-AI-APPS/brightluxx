#!/usr/bin/env node
/* Generates the permanent URL control sheets from the prerendered build:
   /app/memory/seo-control/url-inventory.csv + url-inventory.md
   Run after yarn build: node seo-url-inventory.js */
const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "build");
const OUT_DIR = "/app/memory/seo-control";
const PROD = "https://brightluxx.com";

function decode(s){return s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'");}
function collect(dir, base) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name !== "static") out.push(...collect(path.join(dir, e.name), `${base}/${e.name}`)); }
    else if (e.name === "index.html") out.push({ route: base || "/", file: path.join(dir, "index.html") });
  }
  return out;
}
function classify(route, isStub) {
  if (isStub) return "redirect-stub";
  if (route === "/") return "home";
  if (route.startsWith("/products/")) return "product";
  if (route === "/products") return "product-listing";
  if (route.startsWith("/blog/")) return "blog-article";
  if (route.startsWith("/case-studies/")) return "case-study";
  if (route.startsWith("/solutions/")) return "solution";
  if (route.startsWith("/applications/")) return "application";
  if (route.startsWith("/technology/") || route.startsWith("/latest-tech")) return "technology";
  if (route.startsWith("/knowledge/") || route.startsWith("/contractors/")) return "guide";
  if (route.startsWith("/tools") || ["/calculator","/budget-estimator","/project-planner","/technology-selector","/compare-products","/compare-brands","/led-calculator"].includes(route)) return "tool";
  if (["/dubai","/abu-dhabi","/saudi-arabia","/qatar","/oman","/kuwait","/bahrain","/led-screen-suppliers-dubai"].includes(route)) return "location";
  if (route.startsWith("/pixelvue") || ["/lumimorph","/naturatex","/signatouch","/glassmorph"].includes(route)) return "product-family";
  if (route.startsWith("/inspirations")) return "inspiration";
  return "page";
}
function fetchText(url){return new Promise(res=>{const r=http.get(url,{timeout:5000},x=>{let d="";x.on("data",c=>d+=c);x.on("end",()=>res(x.statusCode===200?d:null));});r.on("error",()=>res(null));r.on("timeout",()=>{r.destroy();res(null);});});}
const csvEsc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

async function run() {
  const sitemapXml = await fetchText("http://localhost:8001/api/sitemap.xml");
  const sitemapRoutes = new Set();
  if (sitemapXml) {
    let m; const re = /<loc>([^<]+)<\/loc>/g;
    while ((m = re.exec(sitemapXml)) !== null) {
      let u = m[1]; if (u.startsWith(PROD)) u = u.slice(PROD.length).replace(/\/$/, "") || "/";
      sitemapRoutes.add(u);
    }
  }
  const rows = collect(BUILD_DIR, "").map(({ route, file }) => {
    const html = fs.readFileSync(file, "utf8");
    const isStub = /http-equiv="refresh"/i.test(html);
    const noindex = /name="robots" content="[^"]*noindex/.test(html);
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
    const h1 = decode(((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "").replace(/<[^>]+>/g, "")).trim();
    const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "").trim();
    return {
      url: `${PROD}${route === "/" ? "" : route}` || PROD,
      type: classify(route, isStub),
      indexable: isStub || noindex ? "no" : "yes",
      canonical,
      sitemap: sitemapRoutes.has(route) ? "yes" : "no",
      h1: h1.slice(0, 120),
      topic: title.split("|")[0].trim().slice(0, 100),
      language: "en",
      status: isStub ? "301-intent (stub until Cloudflare rule live)" : "live",
    };
  }).sort((a, b) => a.url.localeCompare(b.url));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const header = ["URL","Type","Indexable","Canonical","Sitemap","H1","Primary Topic","Language","Status"];
  const csv = [header.join(","), ...rows.map(r => [r.url,r.type,r.indexable,r.canonical,r.sitemap,r.h1,r.topic,r.language,r.status].map(csvEsc).join(","))].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "url-inventory.csv"), csv);

  const byType = {};
  rows.forEach(r => { byType[r.type] = (byType[r.type] || 0) + 1; });
  const md = [
    `# Brightluxx URL Inventory — ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `Total URLs: ${rows.length} · Indexable: ${rows.filter(r => r.indexable === "yes").length} · Redirect stubs: ${rows.filter(r => r.type === "redirect-stub").length}`,
    ``,
    `## Counts by type`,
    ...Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([t, n]) => `- ${t}: ${n}`),
    ``,
    `## Full inventory`,
    `| URL | Type | Indexable | Sitemap | H1 | Language | Status |`,
    `|---|---|---|---|---|---|---|`,
    ...rows.map(r => `| ${r.url} | ${r.type} | ${r.indexable} | ${r.sitemap} | ${r.h1.replace(/\|/g, "\\|")} | ${r.language} | ${r.status} |`),
  ].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "url-inventory.md"), md);
  console.log(`Inventory written: ${rows.length} URLs -> ${OUT_DIR}/url-inventory.{csv,md}`);
  if (!sitemapXml) console.log("NOTE: backend sitemap unreachable; Sitemap column all 'no'.");
}
run();
