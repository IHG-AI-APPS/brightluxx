/**
 * Post-build prerender script.
 * Reads the built index.html, fetches heading data from heading-data.json,
 * and generates per-route HTML files with heading tags pre-injected.
 * These go into build/{route}/index.html so production servers serve them.
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "build");
const DATA_FILE = path.join(__dirname, "heading-data.json");
const PROD_URL = "https://brightluxx.com";

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function run() {
  if (!fs.existsSync(DATA_FILE)) {
    console.log("No heading-data.json found, skipping prerender.");
    return;
  }

  const indexHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf8");
  const headingData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  let count = 0;

  for (const [route, headings] of Object.entries(headingData)) {
    if (!headings || !headings.length) continue;

    // Build heading HTML snippet
    const snippet = headings
      .map((h) => `<${h.tag}>${esc(h.text)}</${h.tag}>`)
      .join("");

    // Inject into the root div
    let html = indexHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${snippet}</div>`
    );

    // Update canonical URL
    const canonical = `${PROD_URL}${route}`;
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`
    );

    // Write to build/{route}/index.html
    const routeDir = path.join(BUILD_DIR, route === "/" ? "" : route);
    fs.mkdirSync(routeDir, { recursive: true });

    const outFile = route === "/" 
      ? path.join(BUILD_DIR, "index.html")
      : path.join(routeDir, "index.html");
    
    fs.writeFileSync(outFile, html);
    count++;
  }

  console.log(`Pre-rendered ${count} pages with heading hierarchy.`);
}

run();
