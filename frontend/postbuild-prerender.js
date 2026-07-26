/**
 * Post-build prerender script for PRODUCTION.
 * After `yarn build`, this generates per-route HTML files
 * with heading hierarchy, meta tags, and internal links pre-injected.
 * Production servers serve these route-specific HTML files to ALL visitors,
 * giving crawlers real content in the initial HTML response.
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

/** Fetch JSON from backend (synchronous-ish via callback). */
function fetchJSONSync(url) {
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

  let count = 0;

  for (const [route, headings] of Object.entries(headingData)) {
    if (!headings || !headings.length) continue;

    // Fetch SEO data and internal links from backend
    let seoData = null;
    let internalLinks = null;
    try {
      [seoData, internalLinks] = await Promise.all([
        fetchJSONSync(`${BACKEND}/api/prerender/page?path=${encodeURIComponent(route)}`),
        fetchJSONSync(`${BACKEND}/api/prerender/internal-links?path=${encodeURIComponent(route)}`),
      ]);
    } catch (e) {
      // Backend might not be running during build
    }

    const meta = seoData?.meta || {};
    const canonical = `${PROD_URL}${route}`;
    const title = meta.title ? esc(meta.title) + " | Brightluxx" : "Brightluxx — Premium LED Display Solutions";
    const desc = esc(meta.description || "");
    const kw = (meta.keywords || []).map(esc).join(", ");

    // Build heading HTML
    const headingHtml = headings.map((h) => `<${h.tag}>${esc(h.text)}</${h.tag}>`).join("");
    
    // Build internal links HTML
    let linksHtml = "";
    if (internalLinks && internalLinks.length) {
      const groups = {};
      internalLinks.forEach((l) => {
        const rel = l.rel || "related";
        if (!groups[rel]) groups[rel] = [];
        groups[rel].push(l);
      });
      for (const [, links] of Object.entries(groups)) {
        linksHtml += `<nav>`;
        links.forEach((l) => { linksHtml += `<a href="${esc(l.path)}">${esc(l.name)}</a>`; });
        linksHtml += `</nav>`;
      }
    }

    // Description paragraph
    const descPara = desc ? `<p>${desc}</p>` : "";

    // Inject into the root div
    let html = indexHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${headingHtml}${descPara}${linksHtml}</div>`
    );

    // Replace title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    
    // Replace meta description
    html = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${desc}"`
    );

    // Inject canonical + keywords before </head>
    const extraMeta = [
      `<link rel="canonical" href="${canonical}">`,
      kw ? `<meta name="keywords" content="${kw}">` : "",
    ].filter(Boolean).join("\n    ");
    
    html = html.replace("</head>", `    ${extraMeta}\n  </head>`);

    // Write to build/{route}/index.html
    const routeDir = route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route);
    fs.mkdirSync(routeDir, { recursive: true });

    const outFile = route === "/" 
      ? path.join(BUILD_DIR, "index.html")
      : path.join(routeDir, "index.html");
    
    fs.writeFileSync(outFile, html);
    count++;
  }

  // Also copy llms.txt to build root
  const llmsSrc = path.join(__dirname, "public", "llms.txt");
  if (fs.existsSync(llmsSrc)) {
    fs.copyFileSync(llmsSrc, path.join(BUILD_DIR, "llms.txt"));
    console.log("Copied llms.txt to build/");
  }

  console.log(`Pre-rendered ${count} pages with heading hierarchy + internal links.`);
}

run().catch(console.error);
