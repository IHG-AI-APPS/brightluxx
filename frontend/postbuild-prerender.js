/**
 * Post-build prerender script for PRODUCTION.
 * After `craco build`, this generates per-route HTML files with:
 *   - Route-specific <title>, <meta description>, <link canonical>
 *   - OG/Twitter tags, JSON-LD schemas
 *
 * CRITICAL: This reads metadata DIRECTLY from seed_data_full.json and
 * heading-data.json — no backend HTTP calls needed. This ensures it works
 * in CI/build environments where the backend isn't running.
 *
 * Falls back to HTTP calls to /api/ssr/meta if backend IS available.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "build");
const DATA_FILE = path.join(__dirname, "heading-data.json");
const SEED_FILE = path.join(__dirname, "..", "backend", "seed_data_full.json");
const PROD_URL = "https://brightluxx.com";
const SITE_NAME = "Brightluxx";
const DEFAULT_OG_IMAGE = "https://files.ihgbrands.com/uploads_hero_banner.webp";
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
    const req = http.get(url, { timeout: 3000 }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    });
    req.on("error", () => resolve(null));
    req.on("timeout", () => { req.destroy(); resolve(null); });
  });
}

function fetchText(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 3000 }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    });
    req.on("error", () => resolve(""));
    req.on("timeout", () => { req.destroy(); resolve(""); });
  });
}

// ── Path → Title mapping (mirrors ssr_meta.py PATH_TITLES) ──
const PATH_TITLES = {
  "/": "Premium LED Display Solutions in Dubai, UAE",
  "/products": "LED Display Products — Indoor, Outdoor, Creative & Transparent",
  "/solutions": "LED Display Solutions by Industry",
  "/technology": "LED Display Technology — COB, MiP, MicroLED & More",
  "/contact": "Contact Us — LED Display Enquiries Dubai, UAE",
  "/about": "About Brightluxx — LED Display Manufacturer Since 2005",
  "/blog": "Blog — LED Display Industry Insights & News",
  "/faq": "Frequently Asked Questions — LED Displays",
  "/case-studies": "Case Studies — LED Display Projects Across UAE",
  "/projects": "Project Portfolio — LED Display Installations",
  "/resources": "Resources — Spec Packs, Cheat Sheets & BIM References",
  "/knowledge": "Knowledge Hub — LED Display Technical Guides",
  "/calculator": "LED Screen Size Calculator",
  "/budget-estimator": "LED Display Budget Estimator",
  "/viewing-distance": "Viewing Distance & Pixel Pitch Calculator",
  "/power-estimator": "LED Display Power Consumption Estimator",
  "/project-planner": "LED Project Planner — Timeline & Specifications",
  "/technology-selector": "LED Technology Selector Quiz",
  "/product-families": "LED Display Product Families",
  "/lumimorph": "LumiMorph — Fine-Pitch Modular LED Displays",
  "/naturatex": "NaturaTex — Texture Screen Technology",
  "/signatouch": "SignaTouch — Interactive Digital Signage & Kiosks",
  "/glassmorph": "GlassMorph — Smart Glass & Transparent LED",
  "/pixelvue": "PixelVue — Standard & Specialty LED Displays",
  "/led-screen-suppliers-dubai": "LED Screen Suppliers in Dubai — Brightluxx",
  "/abu-dhabi": "LED Display Supplier Abu Dhabi — Brightluxx",
  "/saudi-arabia": "LED Display Solutions Saudi Arabia — Brightluxx",
  "/qatar": "LED Screen Solutions Qatar — Brightluxx",
  "/kuwait": "LED Display Solutions Kuwait — Brightluxx",
  "/government-solutions": "Government LED Display Solutions — Brightluxx UAE",
  "/indoor-led": "Indoor LED Displays — Fine Pitch P0.4 to P4",
  "/outdoor-led": "Outdoor LED Displays — Weatherproof P2.5 to P10",
  "/for-architects": "LED Displays for Architects — Specification Resources",
  "/for-contractors": "LED Displays for Contractors — Installation Guides",
  "/compare-brands": "Compare LED Display Brands — Brightluxx vs Competitors",
  "/applications": "LED Display Applications by Industry",
  "/inspirations": "LED Display Inspirations Gallery",
  "/latest-tech": "Latest LED Display Technology",
};

function titleFromPath(p) {
  if (PATH_TITLES[p]) return PATH_TITLES[p];
  const segs = p.split("/").filter(Boolean);
  if (!segs.length) return "Premium LED Display Solutions in Dubai, UAE";
  return segs.map(s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())).join(" — ");
}

/** Build metadata from seed data (offline — no backend needed) */
function buildMetaFromSeed(route, seoIndex, productsIndex, blogsIndex, caseStudiesIndex) {
  const seo = seoIndex[route];
  
  let rawTitle, description, canonical, keywords, ogImage, schemas;
  canonical = `${PROD_URL}${route}`;
  ogImage = DEFAULT_OG_IMAGE;
  schemas = [];

  if (seo) {
    rawTitle = seo.meta_title || titleFromPath(route);
    description = seo.meta_description || "";
    keywords = (seo.keywords || []).join(", ");
    ogImage = seo.og_image || DEFAULT_OG_IMAGE;
  } else {
    rawTitle = titleFromPath(route);
    description = `${rawTitle}. Premium LED display solutions by Brightluxx in Dubai, UAE.`;
    keywords = "";
  }

  const title = rawTitle.toLowerCase().includes("brightluxx") ? rawTitle : `${rawTitle} | ${SITE_NAME}`;
  const ogTitle = title;
  const ogDescription = (seo && seo.og_description) || description;

  // Build schemas based on route type
  if (route.startsWith("/products/")) {
    const slug = route.split("/products/")[1];
    const product = productsIndex[slug];
    if (product) {
      // Product schema
      const productSchema = {
        "@context": "https://schema.org", "@type": "Product",
        name: product.name || "", description: product.description || product.tagline || "",
        sku: product.product_code || "", url: canonical,
        brand: { "@type": "Brand", name: product.brand || "Brightluxx" },
        image: product.image_url || DEFAULT_OG_IMAGE,
        category: product.category || "LED Display",
      };
      if (product.price_range) {
        productSchema.offers = {
          "@type": "AggregateOffer",
          priceCurrency: product.price_range.currency || "USD",
          lowPrice: product.price_range.low || 0,
          highPrice: product.price_range.high || 0,
          availability: `https://schema.org/${product.availability || "InStock"}`,
        };
      }
      schemas.push(JSON.stringify(productSchema));
      // FAQ schema
      if (product.faq && product.faq.length) {
        schemas.push(JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: product.faq.map(f => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }));
      }
    }
  } else if (route.startsWith("/blog/") && route !== "/blog") {
    const slug = route.split("/blog/")[1];
    const blog = blogsIndex[slug];
    if (blog) {
      schemas.push(JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: (blog.title || rawTitle).slice(0, 110),
        description: blog.excerpt || description,
        url: canonical,
        image: blog.cover_image || blog.image_url || DEFAULT_OG_IMAGE,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME },
        datePublished: blog.created_at ? String(blog.created_at).slice(0, 10) : undefined,
        articleSection: "LED Display Technology",
      }));
      if (blog.faq && blog.faq.length) {
        schemas.push(JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: blog.faq.map(f => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }));
      }
    }
  } else if (route.startsWith("/case-studies/") && route !== "/case-studies") {
    const slug = route.split("/case-studies/")[1];
    const cs = caseStudiesIndex[slug];
    if (cs) {
      schemas.push(JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: (cs.title || rawTitle).slice(0, 110),
        description: cs.challenge || description,
        url: canonical, image: cs.hero_image || cs.thumbnail || DEFAULT_OG_IMAGE,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME },
        articleSection: "Case Study",
      }));
    }
  } else if (route.startsWith("/technology/") || route.startsWith("/knowledge/") ||
             route.startsWith("/contractors/") || route.startsWith("/latest-tech/")) {
    schemas.push(JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: rawTitle.slice(0, 110), description, url: canonical,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME },
    }));
  } else {
    schemas.push(JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage",
      name: rawTitle, description, url: canonical,
      publisher: { "@type": "Organization", name: SITE_NAME },
    }));
  }

  // BreadcrumbList for non-homepage
  if (route !== "/") {
    const segs = route.split("/").filter(Boolean);
    const items = [{ "@type": "ListItem", position: 1, name: "Home", item: PROD_URL }];
    let accum = "";
    segs.forEach((seg, i) => {
      accum += "/" + seg;
      items.push({
        "@type": "ListItem", position: i + 2,
        name: seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        ...(i < segs.length - 1 ? { item: PROD_URL + accum } : {}),
      });
    });
    schemas.push(JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }));
  }

  return { title, description, canonical, keywords, ogTitle, ogDescription, ogImage, schemas, h1: rawTitle };
}

/** Inject SSR metadata into HTML */
function injectMeta(html, meta) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(meta.description)}"`);
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${esc(meta.canonical)}"`);
  } else {
    html = html.replace("</head>", `<link rel="canonical" href="${esc(meta.canonical)}">\n</head>`);
  }
  // OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(meta.ogTitle)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(meta.ogDescription)}"`);
  if (meta.ogImage) html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${esc(meta.ogImage)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${esc(meta.canonical)}"`);
  // Twitter
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(meta.ogTitle)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(meta.ogDescription)}"`);
  // Keywords
  if (meta.keywords) {
    if (html.includes('<meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${esc(meta.keywords)}"`);
    } else {
      html = html.replace("</head>", `<meta name="keywords" content="${esc(meta.keywords)}">\n</head>`);
    }
  }
  // Noscript H1
  html = html.replace(/<noscript>\s*<div>\s*<h1>[^]*?<\/h1>/, `<noscript><div><h1>${esc(meta.h1)}</h1>`);
  // Schemas
  if (meta.schemas && meta.schemas.length) {
    const scripts = meta.schemas.map(s => `<script type="application/ld+json">${s}</script>`).join("\n");
    html = html.replace("</head>", `${scripts}\n</head>`);
  }
  // Organization schema (always)
  const orgSchema = JSON.stringify({
    "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"],
    name: "Brightluxx", url: PROD_URL,
    logo: "https://files.ihgbrands.com/assets/brightluxx-logo-nav.png",
    description: "Premium LED display manufacturer and solutions provider in Dubai, UAE.",
    address: { "@type": "PostalAddress", streetAddress: "Jebel Ali Industrial Area 1", addressLocality: "Dubai", addressCountry: "AE" },
  });
  html = html.replace("</head>", `<script type="application/ld+json">${orgSchema}</script>\n</head>`);
  return html;
}

async function run() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.log("No build/ directory found, skipping prerender.");
    return;
  }

  const indexHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf8");

  // Load heading data
  let headingData = {};
  if (fs.existsSync(DATA_FILE)) {
    headingData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }

  // Load seed data for offline metadata generation
  let seoIndex = {}, productsIndex = {}, blogsIndex = {}, caseStudiesIndex = {};
  if (fs.existsSync(SEED_FILE)) {
    console.log("Loading metadata from seed_data_full.json (offline mode)...");
    const seed = JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
    (seed.page_seo || []).forEach(d => { seoIndex[d.path] = d; });
    (seed.products || []).forEach(d => { if (d.slug) productsIndex[d.slug] = d; });
    (seed.blogs || []).forEach(d => { if (d.slug) blogsIndex[d.slug] = d; });
    (seed.case_studies || []).forEach(d => { if (d.slug) caseStudiesIndex[d.slug] = d; });
    console.log(`  Loaded: ${Object.keys(seoIndex).length} SEO, ${Object.keys(productsIndex).length} products, ${Object.keys(blogsIndex).length} blogs, ${Object.keys(caseStudiesIndex).length} case studies`);
  }

  // Determine routes: try sitemap first (backend), fall back to seed data
  let allRoutes = new Set();

  // Try backend sitemap
  const sitemapXml = await fetchText(`${BACKEND}/api/sitemap.xml`);
  if (sitemapXml && sitemapXml.includes("<url>")) {
    const locRegex = /<loc>([^<]+)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(sitemapXml)) !== null) {
      let url = match[1];
      if (url.startsWith(PROD_URL)) url = url.slice(PROD_URL.length) || "/";
      if (url && !url.startsWith("/api/")) allRoutes.add(url);
    }
    console.log(`Fetched ${allRoutes.size} routes from backend sitemap.`);
  }

  // Always add routes from seed SEO data + heading data + collections
  Object.keys(seoIndex).forEach(r => allRoutes.add(r));
  Object.keys(headingData).forEach(r => allRoutes.add(r));
  Object.keys(productsIndex).forEach(s => allRoutes.add(`/products/${s}`));
  Object.keys(blogsIndex).forEach(s => allRoutes.add(`/blog/${s}`));
  Object.keys(caseStudiesIndex).forEach(s => allRoutes.add(`/case-studies/${s}`));
  // Add routes from other seed collections
  if (fs.existsSync(SEED_FILE)) {
    const seed = JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
    (seed.pixelvue_products || []).forEach(d => { if (d.slug) allRoutes.add(`/pixelvue/${d.slug}`); });
    (seed.inspirations || []).forEach(d => { if (d.slug) allRoutes.add(`/inspirations/${d.slug}`); });
    (seed.solutions || []).forEach(d => { if (d.slug) allRoutes.add(`/solutions/${d.slug}`); });
    (seed.applications_content || []).forEach(d => { if (d.slug) allRoutes.add(`/applications/${d.slug}`); });
    (seed.technologies_content || []).forEach(d => { if (d.slug) allRoutes.add(`/technology/${d.slug}`); });
  }
  // Hardcoded critical routes (always pre-render these)
  [
    "/", "/products", "/solutions", "/contact", "/about", "/blog", "/faq",
    "/case-studies", "/projects", "/resources", "/knowledge", "/product-families",
    "/pixelvue", "/lumimorph", "/naturatex", "/signatouch", "/glassmorph",
    "/technology", "/applications", "/inspirations",
    "/led-screen-suppliers-dubai", "/government-solutions", "/abu-dhabi",
    "/saudi-arabia", "/qatar", "/kuwait", "/compare-brands",
    "/indoor-led", "/outdoor-led", "/luxury-home-cinema", "/art-immersive",
    "/budget-estimator", "/project-planner", "/technology-selector", "/calculator",
    "/for-architects", "/for-contractors", "/latest-tech",
    "/applications/retail", "/applications/hospitality", "/applications/corporate",
    "/applications/healthcare", "/applications/education", "/applications/outdoor",
    "/applications/transport", "/applications/worship",
    "/solutions/retail", "/solutions/corporate", "/solutions/entertainment",
    "/solutions/transportation", "/solutions/worship", "/solutions/control-rooms",
    "/solutions/virtual-production", "/solutions/architecture",
    "/technology/cob-led", "/technology/cob", "/technology/microled",
    "/technology/mip-led", "/technology/gob", "/technology/hdr",
    "/technology/fine-pitch-led", "/technology/transparent-led",
    "/technology/creative-led", "/technology/3d-anamorphic-led",
    "/digital-experience-architecture",
    "/knowledge/cob-vs-mip-vs-smd", "/knowledge/pixel-pitch-guide",
    "/knowledge/brightness-nits-guide", "/knowledge/ip-rating-guide",
    "/knowledge/refresh-rate-guide", "/knowledge/processing-calibration",
    "/knowledge/cms-multi-site",
    "/sla-guide", "/supplier-registration", "/technical-support",
    "/spec-substitution", "/value-engineering", "/installation-guide",
    "/design-assist", "/cpd-programme", "/factory-tour", "/distribution",
    "/compare-products", "/lp/specifier-toolkit", "/signage-solutions",
    "/art-immersive", "/luxury-home-cinema",
    "/latest-tech/glasses-free-3d", "/latest-tech/microled",
    "/latest-tech/transparent-led", "/latest-tech/ai-powered",
    "/contractors/dvled-vs-lcd", "/contractors/led-cost-per-sqm",
    "/contractors/led-installation-guide",
    "/digital-experience/media-facades", "/digital-experience/immersive-led-rooms",
    "/digital-experience/retail-experiential-screens",
    "/tools/roi-calculator",
  ].forEach(r => allRoutes.add(r));
  allRoutes.add("/");

  const routes = Array.from(allRoutes).sort();
  console.log(`Total routes to pre-render: ${routes.length}`);

  let success = 0, failed = 0;

  for (const route of routes) {
    try {
      // Try backend first (richer data), fall back to seed
      let meta = null;
      const ssrMeta = await fetchJSON(`${BACKEND}/api/ssr/meta?path=${encodeURIComponent(route)}`);
      if (ssrMeta && ssrMeta.title) {
        meta = {
          title: ssrMeta.title,
          description: ssrMeta.description || "",
          canonical: ssrMeta.canonical || `${PROD_URL}${route}`,
          keywords: ssrMeta.keywords || "",
          ogTitle: ssrMeta.og_title || ssrMeta.title,
          ogDescription: ssrMeta.og_description || ssrMeta.description || "",
          ogImage: ssrMeta.og_image || DEFAULT_OG_IMAGE,
          schemas: ssrMeta.schemas || [],
          h1: ssrMeta.h1 || ssrMeta.title,
        };
      } else {
        // Offline: build from seed data
        meta = buildMetaFromSeed(route, seoIndex, productsIndex, blogsIndex, caseStudiesIndex);
      }

      let html = indexHtml;

      // Inject heading snippet
      const headings = headingData[route];
      if (headings && headings.length) {
        const headingHtml = headings.map(h => `<${h.tag}>${esc(h.text)}</${h.tag}>`).join("");
        const descPara = meta.description ? `<p>${esc(meta.description)}</p>` : "";
        html = html.replace('<div id="root"></div>', `<div id="root">${headingHtml}${descPara}</div>`);
      }

      // Inject metadata
      html = injectMeta(html, meta);

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
  if (fs.existsSync(llmsSrc) && fs.existsSync(BUILD_DIR)) {
    fs.copyFileSync(llmsSrc, path.join(BUILD_DIR, "llms.txt"));
  }

  console.log(`\nPre-rendered: ${success} pages, ${failed} errors out of ${routes.length} total.`);
}

run().catch(console.error);
