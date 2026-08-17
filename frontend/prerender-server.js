/**
 * Prerender Server — Dual-mode frontend server
 *
 * PRODUCTION MODE (build/ directory exists):
 *   Serves pre-rendered static HTML files directly — no CRA dev server.
 *   Full SEO content in initial HTML for ALL users and crawlers.
 *   Server-side 301 redirects, proper HTTP 404s, cache headers.
 *
 * DEV MODE (no build/ directory):
 *   Proxies to CRA dev server on port 3001.
 *   Injects SSR metadata for all users.
 *   Full content injection for search engine/AI crawlers.
 */

const http = require("http");
const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

// Load .env for FORCE_DEV_MODE and other settings
try { require("dotenv").config({ path: path.join(__dirname, ".env") }); } catch {}

const PORT = parseInt(process.env.PORT || "3000", 10);
const CRA_PORT = 3001;
const BACKEND = "http://localhost:8001";
const PROD_URL = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "")
  : "https://brightluxx.com";

/* ── Production mode detection ─────────────────────────────────── */
const BUILD_DIR = path.join(__dirname, "build");
const IS_PRODUCTION =
  fs.existsSync(BUILD_DIR) && fs.existsSync(path.join(BUILD_DIR, "index.html"));

/* ── Crawler detection (includes AI crawlers) ──────────────────── */
const CRAWLER_RE =
  /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|telegrambot|discordbot|redditbot|pinterestbot|applebot|semrushbot|ahrefsbot|mj12bot|rogerbot|embedly|quora|pinterest|w3c_validator|lighthouse|gptbot|chatgpt-user|oai-searchbot|claudebot|anthropic-ai|perplexitybot|cohere-ai|bytespider|meta-externalagent|iaskspider|youbot|petalbot/i;

/* ── CRA dev server (DEV MODE only) ────────────────────────────── */
let cra = null;
if (!IS_PRODUCTION) {
  cra = spawn("npx", ["craco", "start"], {
    cwd: path.resolve(__dirname),
    env: {
      ...process.env,
      PORT: String(CRA_PORT),
      BROWSER: "none",
      HOST: "0.0.0.0",
    },
    stdio: "inherit",
  });

  cra.on("error", (err) => console.error("CRA spawn error:", err));
  cra.on("exit", (code) => {
    console.error("CRA exited with code", code);
    process.exit(code ?? 1);
  });

  /* ── Graceful shutdown: kill CRA child on parent exit ──────────── */
  function cleanup() {
    try {
      cra.kill("SIGKILL");
    } catch {}
  }
  process.on("exit", cleanup);
  process.on("SIGTERM", () => { cleanup(); process.exit(0); });
  process.on("SIGINT", () => { cleanup(); process.exit(0); });
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err.message);
    cleanup();
    process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
  });
}

/* ── Helpers ───────────────────────────────────────────────────── */

/** Simple TTL cache for prerender data. */
const prerenderCache = {};
const CACHE_TTL = 600000; // 10 minutes

/** Fetch JSON from internal URL (no external deps needed). */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", reject);
  });
}

/** Fetch raw body from internal URL. */
function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    http
      .get(
        {
          hostname: parsed.hostname,
          port: parsed.port,
          path: parsed.pathname + parsed.search,
          headers: { Accept: "text/html,application/xhtml+xml,*/*" },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () =>
            resolve({ body: data, headers: res.headers, status: res.statusCode })
          );
        }
      )
      .on("error", reject);
  });
}

/** Escape HTML entities in text. */
function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inject SSR meta from /api/ssr/meta into HTML <head>.
 *  Used by BOTH crawler and browser paths for consistent meta. */
function injectSSRMeta(html, meta) {
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  // Replace meta description
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(meta.description)}"`);
  // Replace canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${esc(meta.canonical)}"`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${esc(meta.canonical)}">\n</head>`);
  }
  // Replace OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(meta.og_title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(meta.og_description)}"`);
  if (meta.og_image) html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${esc(meta.og_image)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${esc(meta.canonical)}"`);
  // Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(meta.og_title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(meta.og_description)}"`);
  // Keywords
  if (meta.keywords) {
    if (html.includes('<meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${esc(meta.keywords)}"`);
    } else {
      html = html.replace('</head>', `<meta name="keywords" content="${esc(meta.keywords)}">\n</head>`);
    }
  }
  // Replace noscript H1 (whitespace-tolerant regex)
  html = html.replace(/<noscript>\s*<div>\s*<h1>[^]*?<\/h1>/, `<noscript><div><h1>${esc(meta.h1)}</h1>`);
  // Inject FAQ schema if present
  if (meta.faq_schema) {
    html = html.replace('</head>', `<script type="application/ld+json">${meta.faq_schema}</script>\n</head>`);
  }
  // Inject all schemas (Product, FAQPage, etc.)
  if (meta.schemas && Array.isArray(meta.schemas)) {
    const schemaScripts = meta.schemas.map(s => `<script type="application/ld+json">${s}</script>`).join('\n');
    html = html.replace('</head>', `${schemaScripts}\n</head>`);
  }
  return html;
}


/** Build the heading + meta + internal links snippet for <div id="root">. */
function buildSnippet(headings, meta, internalLinks) {
  const parts = [];

  // Heading hierarchy (the main SEO signal crawlers need)
  if (headings && headings.length) {
    headings.forEach((h) => {
      parts.push(`<${h.tag}>${esc(h.text)}</${h.tag}>`);
    });
  }

  // Descriptive paragraph
  if (meta && meta.description) {
    parts.push(`<p>${esc(meta.description)}</p>`);
  }

  // Internal links grouped by relationship type (rich semantic linking)
  if (internalLinks && internalLinks.length) {
    // Group links by semantic relationship
    const groups = {};
    internalLinks.forEach((l) => {
      const rel = l.rel || "related";
      if (!groups[rel]) groups[rel] = [];
      groups[rel].push(l);
    });

    // Map rel types to human-readable section labels for crawlers
    const relLabels = {
      "home": "Site",
      "hub": "Browse",
      "action": "Get Started",
      "child": "Products in This Range",
      "parent": "Part of",
      "sibling": "Also in This Range",
      "sibling-family": "Other Product Families",
      "related-product": "Related Products",
      "product-family": "Product Families",
      "related-guide": "Technical Guides",
      "related-solution": "Related Solutions",
      "resource": "Resources",
      "social-proof": "Our Work",
      "sibling-article": "Related Articles",
      "child-article": "Articles",
      "audience": "For Professionals",
      "related-tool": "Tools & Services",
      "tool": "Tools",
      "service": "Services",
      "trust": "About Us",
      "content": "Content",
      "sibling-content": "Explore More",
      "related-family": "Other Product Lines",
      "sibling-location": "Other Locations",
      "geo-landing": "LED Screens by Location",
      "lifestyle": "Lifestyle Solutions",
      "related": "Related",
    };

    // Render grouped nav sections
    for (const [rel, links] of Object.entries(groups)) {
      const label = relLabels[rel] || rel;
      parts.push(`<nav aria-label="${esc(label)}">`);
      links.forEach((l) => {
        parts.push(`<a href="${esc(l.path)}">${esc(l.name)}</a>`);
      });
      parts.push(`</nav>`);
    }
  }

  return parts.join("");
}

/** Inject page-specific meta tags into <head>. */
function injectMeta(html, routePath, meta, internalLinks) {
  if (!meta || !meta.title) return html;

  const canonical = `${PROD_URL}${routePath}`;
  const title = esc(meta.title) + " | Brightluxx";
  const desc = esc(meta.description || "");
  const kw = (meta.keywords || []).map(esc).join(", ");
  const ogTitle = esc(meta.og_title || meta.title) + " | Brightluxx";
  const ogDesc = esc(meta.og_description || meta.description || "");
  const imgAlt = esc(meta.image_alt || meta.title);

  // Replace default <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  );

  // Replace default meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${desc}"`
  );

  // Build JSON-LD BreadcrumbList + SiteNavigationElement
  const jsonLdScripts = [];

  // Organization + LocalBusiness schema (always present)
  jsonLdScripts.push(JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "Brightluxx",
    "legalName": "Brightluxx LED Display Solutions",
    "url": "https://brightluxx.com",
    "logo": "https://files.ihgbrands.com/assets/brightluxx-logo-nav.png",
    "description": "Premium LED display manufacturer and solutions provider in Dubai, UAE.",
    "foundingDate": "2005",
    "address": {"@type": "PostalAddress", "streetAddress": "Jebel Ali Industrial Area 1", "addressLocality": "Dubai", "addressCountry": "AE"},
    "geo": {"@type": "GeoCoordinates", "latitude": 24.9857, "longitude": 55.0272},
    "areaServed": [
      {"@type": "Country", "name": "United Arab Emirates"},
      {"@type": "Country", "name": "Saudi Arabia"},
      {"@type": "Country", "name": "Qatar"},
      {"@type": "Country", "name": "Kuwait"}
    ],
    "knowsAbout": ["LED Displays", "MicroLED", "Digital Signage", "Video Walls", "Transparent LED", "Interactive Kiosks", "Smart Glass"]
  }));

  // BreadcrumbList schema — REMOVED: now injected by /api/ssr/meta with accurate page titles

  // SiteNavigationElement for internal links
  if (internalLinks && internalLinks.length) {
    const navItems = internalLinks.slice(0, 30).map((l) => ({
      "@type": "SiteNavigationElement",
      name: l.name,
      url: PROD_URL + l.path,
    }));
    jsonLdScripts.push(JSON.stringify({
      "@context": "https://schema.org",
      "@graph": navItems,
    }));
  }

  // Inject additional meta + JSON-LD right before </head>
  const extra = [
    `<link rel="canonical" href="${canonical}">`,
    kw ? `<meta name="keywords" content="${kw}">` : "",
    `<meta property="og:title" content="${ogTitle}">`,
    `<meta property="og:description" content="${ogDesc}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image:alt" content="${imgAlt}">`,
    `<meta name="twitter:title" content="${ogTitle}">`,
    `<meta name="twitter:description" content="${ogDesc}">`,
    `<meta name="twitter:image:alt" content="${imgAlt}">`,
    ...jsonLdScripts.map((s) => `<script type="application/ld+json">${s}</script>`),
  ]
    .filter(Boolean)
    .join("\n    ");

  html = html.replace("</head>", `    ${extra}\n  </head>`);

  return html;
}

/** Inject only JSON-LD schemas (no canonical/OG) — used on crawler path where injectSSRMeta handles meta. */
function injectMetaJsonLdOnly(html, meta, internalLinks) {
  const jsonLdScripts = [];

  // Organization + LocalBusiness schema (always present)
  jsonLdScripts.push(JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "Brightluxx",
    "legalName": "Brightluxx LED Display Solutions",
    "url": "https://brightluxx.com",
    "logo": "https://files.ihgbrands.com/assets/brightluxx-logo-nav.png",
    "description": "Premium LED display manufacturer and solutions provider in Dubai, UAE.",
    "foundingDate": "2005",
    "address": {"@type": "PostalAddress", "streetAddress": "Jebel Ali Industrial Area 1", "addressLocality": "Dubai", "addressCountry": "AE"},
    "geo": {"@type": "GeoCoordinates", "latitude": 24.9857, "longitude": 55.0272},
    "areaServed": [
      {"@type": "Country", "name": "United Arab Emirates"},
      {"@type": "Country", "name": "Saudi Arabia"},
      {"@type": "Country", "name": "Qatar"},
      {"@type": "Country", "name": "Kuwait"}
    ],
    "knowsAbout": ["LED Displays", "MicroLED", "Digital Signage", "Video Walls", "Transparent LED", "Interactive Kiosks", "Smart Glass"]
  }));

  // SiteNavigationElement for internal links
  if (internalLinks && internalLinks.length) {
    const navItems = internalLinks.slice(0, 30).map((l) => ({
      "@type": "SiteNavigationElement",
      name: l.name,
      url: PROD_URL + l.path,
    }));
    jsonLdScripts.push(JSON.stringify({
      "@context": "https://schema.org",
      "@graph": navItems,
    }));
  }

  if (jsonLdScripts.length) {
    const scripts = jsonLdScripts.map((s) => `<script type="application/ld+json">${s}</script>`).join("\n    ");
    html = html.replace("</head>", `    ${scripts}\n  </head>`);
  }

  return html;
}

/* ── Wait for CRA, then start proxy ────────────────────────────── */

function waitForCRA() {
  const check = () => {
    http
      .get(`http://localhost:${CRA_PORT}`, (res) => {
        res.resume(); // drain
        startProxy();
      })
      .on("error", () => setTimeout(check, 1000));
  };
  check();
}

/* ── WordPress legacy URL redirects ────────────────────────────── */
const WP_REDIRECTS = {
  "/our-works/": "/projects",
  "/our-works": "/projects",
  "/digital-solutions/": "/solutions",
  "/digital-solutions": "/solutions",
  "/products/led-display": "/products",
  "/products/led-display/": "/products",
  "/products/indoor-led-display": "/indoor-led",
  "/products/indoor-led-display/": "/indoor-led",
  "/products/outdoor-led-display": "/outdoor-led",
  "/products/outdoor-led-display/": "/outdoor-led",
  "/products/spherical-led-display": "/products",
  "/products/spherical-led-display/": "/products",
  "/products/cube-led-display-p3": "/products",
  "/products/cube-led-display-p3/": "/products",
  "/products/transparent-led-display": "/glassmorph",
  "/products/transparent-led-display/": "/glassmorph",
  "/products/rental-led-display": "/products",
  "/products/rental-led-display/": "/products",
  "/products/flexible-led-display": "/products",
  "/products/flexible-led-display/": "/products",
  "/download-catalog/": "/products",
  "/download-catalog": "/products",
  "/about-us/": "/about",
  "/about-us": "/about",
  "/contact-us/": "/contact",
  "/contact-us": "/contact",
  "/services/": "/solutions",
  "/services": "/solutions",
  "/portfolio/": "/projects",
  "/portfolio": "/projects",
  "/gallery/": "/projects",
  "/gallery": "/projects",
  "/led-screen-dubai": "/led-screen-suppliers-dubai",
  "/led-display-abu-dhabi": "/abu-dhabi",
  "/led-screen-saudi-arabia": "/saudi-arabia",
  "/led-screen-qatar": "/qatar",
  "/led-screen-kuwait": "/kuwait",
  "/resource-library": "/resources",
  "/digital-experience": "/digital-experience-architecture",
};

/* ── Known valid routes (for 404 detection) ────────────────────── */
const KNOWN_ROUTES = new Set([
  "/", "/products", "/product-families", "/solutions", "/contact", "/about",
  "/lumimorph", "/lumimorph/elite", "/lumimorph/grande", "/lumimorph/mini",
  "/naturatex", "/naturatex/holoveil",
  "/signatouch", "/signatouch/touch-kiosk", "/signatouch/smart-signage", "/signatouch/self-service",
  "/glassmorph", "/glassmorph/smart-film", "/glassmorph/led-film", "/glassmorph/media-glass", "/glassmorph/flying-display",
  "/pixelvue", "/art-immersive", "/luxury-home-cinema",
  "/applications", "/knowledge",
  "/knowledge/cob-vs-mip-vs-smd", "/knowledge/pixel-pitch-guide", "/knowledge/brightness-nits-guide",
  "/knowledge/ip-rating-guide", "/knowledge/refresh-rate-guide", "/knowledge/processing-calibration",
  "/knowledge/cms-multi-site",
  "/blog", "/case-studies", "/projects", "/inspirations",
  "/faq", "/factory-tour", "/for-architects", "/for-contractors", "/design-assist", "/cpd-programme",
  "/tech-guide", "/budget-estimator", "/signage-solutions",
  "/indoor-led", "/outdoor-led",
  "/led-screen-suppliers-dubai", "/abu-dhabi", "/saudi-arabia",
  "/qatar", "/kuwait", "/government-solutions",
  "/digital-experience-architecture", "/latest-tech", "/resources",
  "/calculator", "/viewing-distance", "/power-estimator", "/project-planner", "/technology-selector",
  "/compare-brands", "/compare-products", "/technology",
  "/sla-guide", "/supplier-registration", "/technical-support",
  "/spec-substitution", "/value-engineering", "/installation-guide", "/distribution",
  "/lp/specifier-toolkit",
  "/admin", "/admin/login", "/admin/seo",
]);

/* Dynamic route patterns */
const DYNAMIC_PATTERNS = [
  /^\/products\/[a-z0-9-]+$/,
  /^\/blog\/[a-z0-9-]+$/,
  /^\/case-studies\/[a-z0-9-]+$/,
  /^\/projects\/[a-z0-9-]+$/,
  /^\/applications\/[a-z0-9-]+$/,
  /^\/inspirations\/[a-z0-9-]+$/,
  /^\/solutions\/[a-z0-9-]+$/,
  /^\/technology\/[a-z0-9-]+$/,
  /^\/pixelvue\/[a-z0-9-]+$/,
  /^\/indoor-led\/[a-z0-9-p.]+$/,
  /^\/outdoor-led\/[a-z0-9-p.]+$/,
  /^\/latest-tech\/[a-z0-9-]+$/,
  /^\/contractors\/[a-z0-9-]+$/,
  /^\/digital-experience\/[a-z0-9-]+$/,
  /^\/tools\/[a-z0-9-]+$/,
  /^\/admin\/.+$/,
];

function isKnownRoute(path) {
  if (KNOWN_ROUTES.has(path)) return true;
  return DYNAMIC_PATTERNS.some((p) => p.test(path));
}

function startProxy() {
  const server = http.createServer(async (req, res) => {
    const ua = req.headers["user-agent"] || "";
    const isCrawler = CRAWLER_RE.test(ua);
    const routePath = (req.url || "/").split("?")[0];
    const isAsset = /\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|map|json|woff|woff2|ttf|mp4|webm|ogg|pdf|xml|txt)(\?.*)?$/.test(
      req.url
    );
    const isApi = req.url.startsWith("/api");

    // ── WordPress legacy redirects (for ALL users, not just crawlers) ──
    if (!isAsset && !isApi && WP_REDIRECTS[routePath]) {
      const newPath = WP_REDIRECTS[routePath];
      res.writeHead(301, {
        Location: newPath,
        "X-Redirect-Reason": "WordPress legacy URL",
      });
      res.end();
      return;
    }

    // ── /wp-content/ catch-all redirect ──
    if (routePath.startsWith("/wp-content/") || routePath.startsWith("/wp-admin/") || routePath.startsWith("/wp-includes/")) {
      res.writeHead(301, { Location: "/products" });
      res.end();
      return;
    }

    // ── Serve llms.txt as plain text (not SPA) ──
    if (routePath === "/llms.txt") {
      try {
        const fs = require("fs");
        const path = require("path");
        const llmsPath = path.join(__dirname, "public", "llms.txt");
        const content = fs.readFileSync(llmsPath, "utf8");
        res.writeHead(200, {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Length": Buffer.byteLength(content),
        });
        res.end(content);
        return;
      } catch (e) {
        // Fall through to proxy
      }
    }

    // ── Crawler on a page route → inject headings + meta ──
    if (isCrawler && !isAsset && !isApi) {
      try {
        const routePath = req.url.split("?")[0];
        console.log(`[PRERENDER] Crawler detected for ${routePath} (UA: ${ua.substring(0, 50)})`);

        // Check cache first
        const cached = prerenderCache[routePath];
        if (cached && Date.now() - cached.time < CACHE_TTL) {
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Length": Buffer.byteLength(cached.html),
            "X-Prerendered": "true",
            "X-SSR-Meta": "injected",
            "X-Cache": "hit",
          });
          res.end(cached.html);
          return;
        }

        // Fetch CRA HTML + backend data + internal links + SSR meta in parallel
        const [craRes, prerender, internalLinks, ssrMeta] = await Promise.all([
          fetchRaw(`http://localhost:${CRA_PORT}${req.url}`),
          fetchJSON(`${BACKEND}/api/prerender/page?path=${encodeURIComponent(routePath)}`),
          fetchJSON(`${BACKEND}/api/prerender/internal-links?path=${encodeURIComponent(routePath)}`),
          fetchJSON(`${BACKEND}/api/ssr/meta?path=${encodeURIComponent(routePath)}`).catch(() => null),
        ]);

        console.log(`[PRERENDER] CRA status: ${craRes.status}, headings: ${prerender?.headings?.length || 0}, links: ${internalLinks?.length || 0}`);

        if (craRes.status === 200) {
          let html = craRes.body;

          // Inject heading snippet into <div id="root"> if headings available
          if (prerender && prerender.headings && prerender.headings.length) {
            const snippet = buildSnippet(prerender.headings, prerender.meta, internalLinks);
            html = html.replace(
              '<div id="root"></div>',
              `<div id="root">${snippet}</div>`
            );
          }

          // Use unified SSR meta for head injection (same as browser path)
          if (ssrMeta) {
            html = injectSSRMeta(html, ssrMeta);
          }
          // Inject JSON-LD schemas only (Organization, SiteNavigation) — skip canonical/OG
          // since injectSSRMeta already handles those from /api/ssr/meta
          if (prerender && prerender.meta) {
            html = injectMetaJsonLdOnly(html, prerender.meta, internalLinks);
          }

          // Cache the result
          prerenderCache[routePath] = { html, time: Date.now() };

          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Length": Buffer.byteLength(html),
            "X-Prerendered": "true",
            "X-SSR-Meta": "injected",
          });
          res.end(html);
          return;
        }
      } catch (err) {
        console.error("Prerender error:", err.message);
      }
    }

    // ── Default: transparent proxy to CRA with SSR meta injection ──
    // For HTML page routes (not assets/api), inject page-specific meta tags
    const needsMetaInjection = !isAsset && !isApi;

    if (needsMetaInjection) {
      // ── 404 for unknown routes ──
      if (!isKnownRoute(routePath) && !routePath.startsWith("/admin")) {
        try {
          const [craRes, ssrMeta] = await Promise.all([
            fetchRaw(`http://localhost:${CRA_PORT}${req.url}`),
            fetchJSON(`${BACKEND}/api/ssr/meta?path=${encodeURIComponent(routePath)}`).catch(() => null),
          ]);
          if (craRes.status === 200) {
            let html = ssrMeta ? injectSSRMeta(craRes.body, ssrMeta) : craRes.body;
            // Replace title for 404
            html = html.replace(/<title>[^<]*<\/title>/, "<title>404 — Page Not Found | Brightluxx</title>");
            res.writeHead(404, {
              "Content-Type": "text/html; charset=utf-8",
              "Content-Length": Buffer.byteLength(html),
              "X-SSR-Meta": "404",
            });
            res.end(html);
            return;
          }
        } catch {}
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      try {
        const [craRes, ssrMeta] = await Promise.all([
          fetchRaw(`http://localhost:${CRA_PORT}${req.url}`),
          fetchJSON(`${BACKEND}/api/ssr/meta?path=${encodeURIComponent(routePath)}`).catch(() => null),
        ]);

        if (craRes.status === 200 && ssrMeta) {
          let html = injectSSRMeta(craRes.body, ssrMeta);
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Length": Buffer.byteLength(html),
            "X-SSR-Meta": "injected",
          });
          res.end(html);
          return;
        }

        // If meta fetch failed but CRA succeeded, serve CRA as-is
        if (craRes.status === 200) {
          res.writeHead(craRes.status, craRes.headers);
          res.end(craRes.body);
          return;
        }
      } catch (err) {
        console.error("SSR meta injection error:", err.message);
      }
    }

    // ── Fallback: raw proxy to CRA (assets, API, or when meta injection fails) ──
    const proxyReq = http.request(
      {
        hostname: "localhost",
        port: CRA_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        try {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        } catch {}
      }
    );

    proxyReq.on("error", (err) => {
      try {
        if (!res.headersSent) {
          res.writeHead(502);
          res.end("Backend unavailable");
        }
      } catch {}
    });

    req.on("error", () => { try { proxyReq.destroy(); } catch {} });
    res.on("error", () => { try { proxyReq.destroy(); } catch {} });

    req.pipe(proxyReq, { end: true });
  });

  // Handle WebSocket upgrade for HMR
  server.on("upgrade", (req, socket, head) => {
    socket.on("error", () => { try { socket.destroy(); } catch {} });

    const proxyReq = http.request({
      hostname: "localhost",
      port: CRA_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    });

    proxyReq.on("upgrade", (proxyRes, proxySocket, proxyHead) => {
      proxySocket.on("error", () => { try { socket.destroy(); } catch {} });
      socket.on("error", () => { try { proxySocket.destroy(); } catch {} });

      socket.write(
        `HTTP/1.1 101 Switching Protocols\r\n` +
          Object.entries(proxyRes.headers)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\r\n") +
          "\r\n\r\n"
      );
      proxySocket.write(head);
      proxySocket.pipe(socket);
      socket.pipe(proxySocket);
    });

    proxyReq.on("error", () => { try { socket.destroy(); } catch {} });
    proxyReq.end();
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Prerender proxy on :${PORT} → CRA :${CRA_PORT} (crawler injection active)`
    );
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   PRODUCTION MODE — Serve pre-rendered static files directly
═══════════════════════════════════════════════════════════════════════ */
function startProductionServer() {
  const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogg": "audio/ogg",
    ".pdf": "application/pdf",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".map": "application/json",
    ".wasm": "application/wasm",
  };

  // Load 404 page
  const notFoundPath = path.join(BUILD_DIR, "404.html");
  const notFoundHtml = fs.existsSync(notFoundPath)
    ? fs.readFileSync(notFoundPath, "utf8")
    : `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404 — Page Not Found | Brightluxx</title><meta name="robots" content="noindex"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#050508;color:#fff;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}a{color:#22d3ee;text-decoration:none}.c{text-align:center}.c h1{font-size:6rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:1rem;background:linear-gradient(135deg,#fff,#999);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.c p{font-size:1.1rem;color:#999;margin-bottom:2rem}.c a{display:inline-block;padding:0.75rem 2rem;border:1px solid #22d3ee;border-radius:999px;transition:all 0.3s}a:hover{background:#22d3ee;color:#050508}</style></head><body><div class="c"><h1>404</h1><p>This page doesn't exist.</p><a href="/">Back to Brightluxx</a></div></body></html>`;

  // SPA shell for admin routes
  const spaShell = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf8");

  function serveFile(res, filePath, cacheControl) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    try {
      const stat = fs.statSync(filePath);
      const content = fs.readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": stat.size,
        "Cache-Control": cacheControl || "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not Found");
    }
  }

  const server = http.createServer((req, res) => {
    const url = req.url || "/";
    const routePath = url.split("?")[0].replace(/\/+$/, "") || "/";
    const ext = path.extname(routePath);

    // ── WordPress legacy 301 redirects ──
    const target = WP_REDIRECTS[routePath] || WP_REDIRECTS[routePath + "/"];
    if (target) {
      res.writeHead(301, {
        Location: target,
        "Cache-Control": "public, max-age=86400",
        "X-Redirect-Reason": "WordPress legacy URL",
      });
      res.end();
      return;
    }

    // ── /wp-content/ catch-all redirect ──
    if (routePath.startsWith("/wp-content/") || routePath.startsWith("/wp-admin/") || routePath.startsWith("/wp-includes/")) {
      res.writeHead(301, { Location: "/products", "Cache-Control": "public, max-age=86400" });
      res.end();
      return;
    }

    // ── Static files with extension → serve from build/ ──
    if (ext) {
      const filePath = path.join(BUILD_DIR, routePath);
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(BUILD_DIR))) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const isFingerprinted = routePath.startsWith("/static/");
        const cache = isFingerprinted
          ? "public, max-age=31536000, immutable"
          : "public, max-age=3600";
        serveFile(res, filePath, cache);
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
      return;
    }

    // ── Admin routes → always serve SPA shell ──
    if (routePath.startsWith("/admin")) {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": Buffer.byteLength(spaShell),
        "Cache-Control": "no-cache",
      });
      res.end(spaShell);
      return;
    }

    // ── Page routes → serve pre-rendered HTML ──
    const htmlFile =
      routePath === "/"
        ? path.join(BUILD_DIR, "index.html")
        : path.join(BUILD_DIR, routePath, "index.html");

    if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
      serveFile(res, htmlFile, "public, max-age=300");
    } else {
      // Unknown route → HTTP 404
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      res.end(notFoundHtml);
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    const count = require("child_process")
      .execSync(`find "${BUILD_DIR}" -name "index.html" | wc -l`)
      .toString()
      .trim();
    console.log(
      `[PRODUCTION] Static server on :${PORT} — ${count} pre-rendered pages from build/`
    );
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   ENTRY POINT — Choose mode based on build/ directory
═══════════════════════════════════════════════════════════════════════ */
if (IS_PRODUCTION) {
  console.log("[MODE] Production — serving pre-rendered static files");
  startProductionServer();
} else {
  console.log("[MODE] Development — starting CRA dev server on port", CRA_PORT);
  waitForCRA();
}
