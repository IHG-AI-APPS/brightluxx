/**
 * Post-build prerender script for PRODUCTION.
 * After `craco build`, this generates per-route HTML files with:
 *   - Route-specific <title>, <meta description>, <link canonical>
 *   - OG/Twitter tags
 *   - JSON-LD schemas (Product, FAQPage, Article, BreadcrumbList, etc.)
 *   - Heading hierarchy for crawlers
 *   - Organization + SiteNavigationElement schemas
 *
 * Uses /api/ssr/meta for all metadata (same source as preview prerender-server.js).
 * Fetches routes from /api/sitemap.xml so ALL indexed pages get proper metadata.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "build");
const DATA_FILE = path.join(__dirname, "heading-data.json");
const PROD_URL = "https://brightluxx.com";
const BACKEND = "http://localhost:8001";

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fetchJSON(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); } catch { resolve(null); }
        });
      })
      .on("error", () => resolve(null));
  });
}

function fetchText(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", () => resolve(""));
  });
}

/** Extract route paths from sitemap XML */
function extractRoutesFromSitemap(xml) {
  const routes = new Set();
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    let url = match[1];
    // Strip base URL to get path
    if (url.startsWith(PROD_URL)) {
      url = url.slice(PROD_URL.length) || "/";
    }
    if (url && !url.startsWith("/api/")) {
      routes.add(url);
    }
  }
  return routes;
}

/** Inject SSR metadata into HTML — mirrors prerender-server.js injectSSRMeta */
function injectSSRMeta(html, meta) {
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${esc(meta.description)}"`
  );
  // Canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${esc(meta.canonical)}"`);
  } else {
    html = html.replace("</head>", `<link rel="canonical" href="${esc(meta.canonical)}">\n</head>`);
  }
  // OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(meta.og_title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(meta.og_description)}"`);
  if (meta.og_image) {
    html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${esc(meta.og_image)}"`);
  }
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${esc(meta.canonical)}"`);
  // Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(meta.og_title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(meta.og_description)}"`);
  // Keywords
  if (meta.keywords) {
    if (html.includes('<meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${esc(meta.keywords)}"`);
    } else {
      html = html.replace("</head>", `<meta name="keywords" content="${esc(meta.keywords)}">\n</head>`);
    }
  }
  // noindex
  if (meta.noindex) {
    html = html.replace("</head>", `<meta name="robots" content="noindex, nofollow">\n</head>`);
  }
  // Noscript H1
  html = html.replace(/<noscript>\s*<div>\s*<h1>[^]*?<\/h1>/, `<noscript><div><h1>${esc(meta.h1)}</h1>`);
  // Inject schemas (Product, FAQPage, Article, BreadcrumbList, WebPage, etc.)
  if (meta.schemas && Array.isArray(meta.schemas)) {
    const schemaScripts = meta.schemas
      .map((s) => `<script type="application/ld+json">${s}</script>`)
      .join("\n");
    html = html.replace("</head>", `${schemaScripts}\n</head>`);
  }
  return html;
}

/** Inject Organization + SiteNavigation JSON-LD */
function injectGlobalSchemas(html, internalLinks) {
  const schemas = [];

  // Organization + LocalBusiness (always present)
  schemas.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness"],
      name: "Brightluxx",
      legalName: "Brightluxx LED Display Solutions",
      url: "https://brightluxx.com",
      logo: "https://files.ihgbrands.com/assets/brightluxx-logo-nav.png",
      description: "Premium LED display manufacturer and solutions provider in Dubai, UAE.",
      foundingDate: "2005",
      address: { "@type": "PostalAddress", streetAddress: "Jebel Ali Industrial Area 1", addressLocality: "Dubai", addressCountry: "AE" },
      geo: { "@type": "GeoCoordinates", latitude: 24.9857, longitude: 55.0272 },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "Qatar" },
        { "@type": "Country", name: "Kuwait" },
      ],
      knowsAbout: ["LED Displays", "MicroLED", "Digital Signage", "Video Walls", "Transparent LED", "Interactive Kiosks", "Smart Glass"],
    })
  );

  // SiteNavigationElement
  if (internalLinks && internalLinks.length) {
    const navItems = internalLinks.slice(0, 30).map((l) => ({
      "@type": "SiteNavigationElement",
      name: l.name,
      url: PROD_URL + l.path,
    }));
    schemas.push(JSON.stringify({ "@context": "https://schema.org", "@graph": navItems }));
  }

  const scripts = schemas.map((s) => `<script type="application/ld+json">${s}</script>`).join("\n");
  html = html.replace("</head>", `${scripts}\n</head>`);
  return html;
}

async function run() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.log("No build/ directory found, skipping prerender.");
    return;
  }

  const indexHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf8");

  // Load heading data (optional — enriches body for crawlers)
  let headingData = {};
  if (fs.existsSync(DATA_FILE)) {
    headingData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }

  // 1. Get ALL routes from sitemap
  console.log("Fetching sitemap routes from backend...");
  const sitemapXml = await fetchText(`${BACKEND}/api/sitemap.xml`);
  const sitemapRoutes = extractRoutesFromSitemap(sitemapXml);

  // 2. Merge with heading-data routes
  Object.keys(headingData).forEach((r) => sitemapRoutes.add(r));

  // Ensure homepage is included
  sitemapRoutes.add("/");

  const allRoutes = Array.from(sitemapRoutes).sort();
  console.log(`Found ${allRoutes.length} routes to pre-render.`);

  let success = 0;
  let failed = 0;

  for (const route of allRoutes) {
    try {
      // Fetch SSR meta from our comprehensive endpoint
      const [ssrMeta, internalLinks] = await Promise.all([
        fetchJSON(`${BACKEND}/api/ssr/meta?path=${encodeURIComponent(route)}`),
        fetchJSON(`${BACKEND}/api/prerender/internal-links?path=${encodeURIComponent(route)}`),
      ]);

      let html = indexHtml;

      // Inject heading snippet into root div
      const headings = headingData[route];
      if (headings && headings.length) {
        const headingHtml = headings.map((h) => `<${h.tag}>${esc(h.text)}</${h.tag}>`).join("");
        const descPara = ssrMeta?.description ? `<p>${esc(ssrMeta.description)}</p>` : "";
        let linksHtml = "";
        if (internalLinks && internalLinks.length) {
          linksHtml = `<nav>${internalLinks.map((l) => `<a href="${esc(l.path)}">${esc(l.name)}</a>`).join("")}</nav>`;
        }
        html = html.replace('<div id="root"></div>', `<div id="root">${headingHtml}${descPara}${linksHtml}</div>`);
      }

      // Inject SSR metadata (<title>, canonical, OG, schemas)
      if (ssrMeta) {
        html = injectSSRMeta(html, ssrMeta);
      }

      // Inject global schemas (Organization, SiteNavigation)
      html = injectGlobalSchemas(html, internalLinks);

      // Write to build/{route}/index.html
      const routeDir = route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route);
      fs.mkdirSync(routeDir, { recursive: true });

      const outFile = route === "/" ? path.join(BUILD_DIR, "index.html") : path.join(routeDir, "index.html");
      fs.writeFileSync(outFile, html);
      success++;
    } catch (err) {
      console.error(`  ERROR: ${route}: ${err.message}`);
      failed++;
    }
  }

  // Copy static files
  const llmsSrc = path.join(__dirname, "public", "llms.txt");
  if (fs.existsSync(llmsSrc)) {
    fs.copyFileSync(llmsSrc, path.join(BUILD_DIR, "llms.txt"));
  }

  console.log(`\nPre-rendered: ${success} pages, ${failed} errors out of ${allRoutes.length} total.`);
  if (failed > 0) {
    console.log("Note: Failed pages will serve default CRA index.html (generic metadata).");
  }
}

run().catch(console.error);
