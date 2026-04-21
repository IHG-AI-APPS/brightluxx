/**
 * Prerender Proxy Server
 *
 * Sits in front of the CRA dev server (port 3001).
 * - Regular users → proxied transparently to CRA.
 * - Search-engine crawlers → CRA HTML with heading tags injected
 *   inside <div id="root"> so they appear in the initial HTML.
 *
 * In production builds the same heading injection is done by
 * postbuild-prerender.js instead.
 */

const http = require("http");
const { spawn } = require("child_process");
const path = require("path");

const PORT = parseInt(process.env.PORT || "3000", 10);
const CRA_PORT = 3001;
const BACKEND = "http://localhost:8001";
const PROD_URL = "https://brightluxx.com";

/* ── Crawler detection ─────────────────────────────────────────── */
const CRAWLER_RE =
  /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|telegrambot|discordbot|redditbot|pinterestbot|applebot|semrushbot|ahrefsbot|mj12bot|rogerbot|embedly|quora|pinterest|w3c_validator|lighthouse/i;

/* ── Start CRA dev server on CRA_PORT ──────────────────────────── */
const cra = spawn("npx", ["craco", "start"], {
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

/** Build the heading + meta snippet that gets injected into <div id="root">. */
function buildSnippet(headings, meta) {
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

  // Internal navigation links (helps crawl budget / link discovery)
  parts.push(
    `<nav aria-label="Main navigation">` +
      `<a href="/">Home</a>` +
      `<a href="/products">Products</a>` +
      `<a href="/solutions">Solutions</a>` +
      `<a href="/lumimorph">LumiMorph</a>` +
      `<a href="/naturatex">NaturaTex</a>` +
      `<a href="/signatouch">SignaTouch</a>` +
      `<a href="/glassmorph">GlassMorph</a>` +
      `<a href="/pixelvue">PixelVue</a>` +
      `<a href="/contact">Contact</a>` +
      `</nav>`
  );

  return parts.join("");
}

/** Inject page-specific meta tags into <head>. */
function injectMeta(html, routePath, meta) {
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

  // Inject additional meta right before </head>
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
  ]
    .filter(Boolean)
    .join("\n    ");

  html = html.replace("</head>", `    ${extra}\n  </head>`);

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

function startProxy() {
  const server = http.createServer(async (req, res) => {
    const ua = req.headers["user-agent"] || "";
    const isCrawler = CRAWLER_RE.test(ua);
    const isAsset = /\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|map|json|woff|woff2|ttf|mp4|webm|ogg|pdf|xml)(\?.*)?$/.test(
      req.url
    );
    const isApi = req.url.startsWith("/api");

    // ── Crawler on a page route → inject headings ──
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
            "X-Cache": "hit",
          });
          res.end(cached.html);
          return;
        }

        // Fetch CRA HTML + backend data in parallel
        const [craRes, prerender] = await Promise.all([
          fetchRaw(`http://localhost:${CRA_PORT}${req.url}`),
          fetchJSON(
            `${BACKEND}/api/prerender/page?path=${encodeURIComponent(routePath)}`
          ),
        ]);

        console.log(`[PRERENDER] CRA status: ${craRes.status}, headings: ${prerender?.headings?.length || 0}`);

        if (craRes.status === 200 && prerender && prerender.headings && prerender.headings.length) {
          let html = craRes.body;
          const snippet = buildSnippet(prerender.headings, prerender.meta);

          // Inject heading snippet into <div id="root">
          html = html.replace(
            '<div id="root"></div>',
            `<div id="root">${snippet}</div>`
          );

          // Inject page-specific meta tags
          html = injectMeta(html, routePath, prerender.meta);

          // Cache the result
          prerenderCache[routePath] = { html, time: Date.now() };

          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Length": Buffer.byteLength(html),
            "X-Prerendered": "true",
          });
          res.end(html);
          return;
        }
      } catch (err) {
        // Fall through to proxy on any error
        console.error("Prerender error:", err.message);
      }
    }

    // ── Default: transparent proxy to CRA ──
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

console.log("Starting CRA dev server on port", CRA_PORT, "...");
waitForCRA();
