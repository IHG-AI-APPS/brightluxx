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

      // Build rich content snippet for div#root
      let contentParts = [];

      // Heading hierarchy from heading-data.json
      const headings = headingData[route];
      if (headings && headings.length) {
        contentParts.push(headings.map(h => `<${h.tag}>${esc(h.text)}</${h.tag}>`).join(""));
      }

      // Description paragraph
      if (meta.description) {
        contentParts.push(`<p>${esc(meta.description)}</p>`);
      }

      // Rich content from seed data (product specs, blog text, listing links)
      if (route.startsWith("/products/") && route !== "/products") {
        const slug = route.split("/products/")[1];
        const product = productsIndex[slug];
        if (product) {
          if (!headings || !headings.length) contentParts.unshift(`<h1>${esc(product.name || slug)}</h1>`);
          if (product.tagline) contentParts.push(`<p><strong>${esc(product.tagline)}</strong></p>`);
          if (product.description) contentParts.push(`<p>${esc(String(product.description).slice(0, 500))}</p>`);
          if (product.specifications && typeof product.specifications === "object") {
            const specs = Object.entries(product.specifications).slice(0, 8);
            if (specs.length) {
              contentParts.push("<dl>" + specs.map(([k,v]) => `<dt>${esc(k)}</dt><dd>${esc(String(v))}</dd>`).join("") + "</dl>");
            }
          }
          if (product.faq && product.faq.length) {
            contentParts.push("<h2>FAQ</h2>" + product.faq.slice(0, 4).map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(""));
          }
        }
      } else if (route.startsWith("/blog/") && route !== "/blog") {
        const slug = route.split("/blog/")[1];
        const blog = blogsIndex[slug];
        if (blog) {
          if (!headings || !headings.length) contentParts.unshift(`<h1>${esc(blog.title || slug)}</h1>`);
          if (blog.excerpt) contentParts.push(`<p>${esc(blog.excerpt)}</p>`);
          if (blog.content) contentParts.push(`<div>${String(blog.content).slice(0, 1000)}</div>`);
          if (blog.faq && blog.faq.length) {
            contentParts.push("<h2>FAQ</h2>" + blog.faq.slice(0, 4).map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(""));
          }
        }
      } else if (route.startsWith("/case-studies/") && route !== "/case-studies") {
        const slug = route.split("/case-studies/")[1];
        const cs = caseStudiesIndex[slug];
        if (cs) {
          if (!headings || !headings.length) contentParts.unshift(`<h1>${esc(cs.title || slug)}</h1>`);
          if (cs.challenge) contentParts.push(`<p>${esc(cs.challenge)}</p>`);
          if (cs.solution) contentParts.push(`<p>${esc(cs.solution)}</p>`);
          if (cs.location) contentParts.push(`<p>Location: ${esc(cs.location)}</p>`);
        }
      } else if (route === "/products") {
        // Product listing: add links to all products
        const productLinks = Object.entries(productsIndex).slice(0, 30).map(([slug, p]) =>
          `<a href="/products/${esc(slug)}">${esc(p.name || slug)}</a>`
        ).join(" · ");
        if (productLinks) contentParts.push(`<nav aria-label="Products">${productLinks}</nav>`);
      } else if (route === "/blog") {
        const blogLinks = Object.entries(blogsIndex).slice(0, 15).map(([slug, b]) =>
          `<a href="/blog/${esc(slug)}">${esc(b.title || slug)}</a>`
        ).join(" · ");
        if (blogLinks) contentParts.push(`<nav aria-label="Blog articles">${blogLinks}</nav>`);
      } else if (route === "/case-studies") {
        const csLinks = Object.entries(caseStudiesIndex).slice(0, 24).map(([slug, cs]) =>
          `<a href="/case-studies/${esc(slug)}">${esc(cs.title || slug)}</a>`
        ).join(" · ");
        if (csLinks) contentParts.push(`<nav aria-label="Case studies">${csLinks}</nav>`);
      }

      if (contentParts.length) {
        html = html.replace('<div id="root"></div>', `<div id="root">${contentParts.join("")}</div>`);
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

  // Generate 404.html page
  const notFoundMeta = {
    title: "404 — Page Not Found | Brightluxx",
    description: "The page you're looking for doesn't exist. Browse our LED display products and solutions.",
    canonical: `${PROD_URL}/404`,
    keywords: "",
    ogTitle: "404 — Page Not Found | Brightluxx",
    ogDescription: "The page you're looking for doesn't exist.",
    ogImage: DEFAULT_OG_IMAGE,
    schemas: [],
    h1: "Page Not Found",
  };
  let notFoundHtml = indexHtml;
  notFoundHtml = notFoundHtml.replace(/<title>[^<]*<\/title>/, `<title>${esc(notFoundMeta.title)}</title>`);
  notFoundHtml = notFoundHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(notFoundMeta.description)}"`);
  notFoundHtml = notFoundHtml.replace("</head>", `<meta name="robots" content="noindex">\n</head>`);
  notFoundHtml = notFoundHtml.replace(
    '<div id="root"></div>',
    `<div id="root"><div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#050508;color:#fff;font-family:system-ui,-apple-system,sans-serif"><div style="text-align:center;padding:2rem"><h1 style="font-size:6rem;font-weight:700;letter-spacing:-0.04em;margin:0 0 1rem;background:linear-gradient(135deg,#fff,#666);-webkit-background-clip:text;-webkit-text-fill-color:transparent">404</h1><p style="font-size:1.1rem;color:#999;margin:0 0 2rem">This page doesn't exist.</p><nav style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap"><a href="/" style="color:#22d3ee;padding:0.75rem 2rem;border:1px solid #22d3ee;border-radius:999px;text-decoration:none;transition:all 0.3s">Homepage</a><a href="/products" style="color:#22d3ee;padding:0.75rem 2rem;border:1px solid rgba(34,211,238,0.3);border-radius:999px;text-decoration:none">Products</a><a href="/contact" style="color:#22d3ee;padding:0.75rem 2rem;border:1px solid rgba(34,211,238,0.3);border-radius:999px;text-decoration:none">Contact</a></nav></div></div></div>`
  );
  fs.writeFileSync(path.join(BUILD_DIR, "404.html"), notFoundHtml);
  console.log("Generated 404.html");

  // ── Static redirect stubs (production frontend = Cloudflare static assets;
  //    no server runs, so redirects must exist as physical HTML files) ──
  const REDIRECT_STUBS = {
    "/our-works": "/projects",
    "/digital-solutions": "/solutions",
    "/products/led-display": "/products",
    "/products/indoor-led-display": "/indoor-led",
    "/products/outdoor-led-display": "/outdoor-led",
    "/products/spherical-led-display": "/products",
    "/products/transparent-led-display": "/glassmorph",
    "/products/rental-led-display": "/products",
    "/products/flexible-led-display": "/products",
    "/download-catalog": "/products",
    "/about-us": "/about",
    "/contact-us": "/contact",
    "/portfolio": "/projects",
    "/gallery": "/projects",
    "/led-screen-dubai": "/led-screen-suppliers-dubai",
    "/led-display-abu-dhabi": "/abu-dhabi",
    "/led-screen-saudi-arabia": "/saudi-arabia",
    "/led-screen-qatar": "/qatar",
  };
  // Tombstones: overwrite stale prerendered files left in the CDN store
  // from previous deploys (sync doesn't delete removed files)
  const TOMBSTONES = { "/products/hjdba": "/products" };

  const makeRedirectStub = (target) => {
    const absTarget = `${PROD_URL}${target}`;
    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>Redirecting to ${esc(absTarget)}</title>
<meta http-equiv="refresh" content="0;url=${esc(absTarget)}">
<link rel="canonical" href="${esc(absTarget)}">
<meta name="robots" content="noindex">
<script>window.location.replace(${JSON.stringify(target)});</script>
</head><body><p>This page has moved permanently to <a href="${esc(absTarget)}">${esc(absTarget)}</a>.</p></body></html>`;
  };

  let stubCount = 0;
  Object.entries(REDIRECT_STUBS).forEach(([src, target]) => {
    if (path.extname(src)) return;
    const dir = path.join(BUILD_DIR, src);
    const file = path.join(dir, "index.html");
    if (fs.existsSync(file)) return; // never overwrite a real prerendered page
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, makeRedirectStub(target));
    stubCount++;
  });
  Object.entries(TOMBSTONES).forEach(([src, target]) => {
    const dir = path.join(BUILD_DIR, src);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), makeRedirectStub(target));
    stubCount++;
  });
  console.log(`Generated ${stubCount} redirect stubs/tombstones`);

  console.log(`\nPre-rendered: ${success} pages, ${failed} errors out of ${routes.length} total.`);
}

run().catch(console.error);
