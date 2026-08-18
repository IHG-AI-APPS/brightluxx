# Brightluxx Changelog

## Aug 10, 2026 — Production Site Audit Fixes (Phase 1-3)

### SEO/AI Visibility (Critical)
- **Production-mode static server**: `prerender-server.js` now detects build/ directory and serves pre-rendered HTML directly — no CRA dev server proxy. TTFB: <1ms (was 1.4-2.2s)
- **Rich initial HTML for ALL users**: Product detail pages include name, description, specs, FAQ. Blog/case-study listings include item links. All content visible before JS loads
- **319 pre-rendered pages** with unique per-route `<title>`, `<meta description>`, canonical, OG tags, JSON-LD schemas
- **HTTP 404**: Unknown routes properly return 404 with branded page (not 200 with homepage shell)
- **301 redirects**: All legacy WordPress URLs redirect server-side (not JS-only): /our-works/ → /projects, /digital-solutions/ → /solutions, /download-catalog/, /products/led-display, /products/indoor-led-display/, /products/spherical-led-display/, /products/cube-led-display-p3, /wp-content/* → /products
- **AI crawler detection**: Added GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, OAI-SearchBot, Anthropic-AI, Cohere-AI, ByteSpider, Meta-ExternalAgent, YouBot
- **llms.txt**: Served as text/plain with company overview, product families, locations, key facts

### Content/QA
- **Deleted test product** "hjdba" (slug, product_code "test") from DB and sitemap
- **Google Maps embed** added to site settings for contact page

### Performance
- **Self-hosted fonts**: Removed Google Fonts (Inter) and cdnfonts.com (Satoshi) origins. All fonts now self-hosted from /fonts/
- **Cache headers**: HTML=300s, fingerprinted assets=1yr immutable, fonts=1hr (correctly set by our server; may be overridden by ingress in preview)
- **Hero video fix**: Switched to CDN source (files.ihgbrands.com) which supports Range requests (206). Added Range/HEAD support to media proxy endpoint. CDN video is 3.1MB vs 58MB object storage version
- **Admin API call noise**: /api/admin/me no longer called on public pages (gated to admin routes/cookie presence)
- **Cookie consent**: Hidden on /admin routes



## Aug 9, 2026 — Structured Data + Reviews + Smart Cache Purge
- Extended `_build_schemas()` in ssr_meta.py to cover ALL page types (Article/WebPage/BreadcrumbList)
- 31 previously schema-less pages now have JSON-LD in initial HTML
- Customer review collection system: submit, moderate, display with AggregateRating in Product schema
- Smart cache purge: admin saves auto-clear SSR cache (product, blog, case study, SEO, reviews)
- Fixed critical clear_ssr_cache name collision (sync helper vs async route handler)
- PII-safe public review projection (no email/spam_score exposure)
- Product-exists check before anti-spam, proper 30-day duplicate window
- 64/64 pytest pass (iter_122 + iter_123 combined)

## Aug 9, 2026 — Dynamic XML Sitemap Enhancement
- Rebuilt `/api/sitemap.xml` as fully DB-driven (286 URLs from 8 collections)
- Fixed redirect filtering (8 WP legacy URLs excluded), status filter bug, case studies inclusion
- Added 10-min TTL to SSR meta cache, exception logging in sitemap DB blocks
- 31/31 pytest pass (iteration_122)

## Aug 9, 2026 — Blog FAQ + Product Schema Markup
- 15/15 blogs enriched with AI-generated FAQ (FAQPage JSON-LD)
- Product schema.org/Product added to all 94 products via SSR injection
- Schema fields: brand, manufacturer, availability, price_range, warranty, condition

## Aug 9, 2026 — SEO DB Expansion + Product Enrichment
- SEO coverage expanded: 55 → 205 pages (150 new entries)
- 94 products enriched with FAQ (6-8 Q&As), applications (4-6 use cases), expanded descriptions
- Total: 244/244 generated, 0 errors

## Jul 30, 2026 — Server-Side Meta Injection (Search Console Fix)
- Built `/api/ssr/meta` endpoint for page-specific metadata
- Fixed all 4 Search Console audit findings (unique titles, canonicals, soft 404s, legacy URLs)

## Jul 30, 2026 — Navbar Split + Auth Cookies + Array Keys
- Split 961-line Navbar into 5 modular components
- Migrated auth tokens from localStorage to httpOnly cookies
- Targeted stable React key replacements

## Jul 30, 2026 — Code Review Remediation
- Hardcoded secrets moved to env/config, MD5→SHA-256, DOMPurify sanitization
- Bare except blocks fixed, Mongo serialization fixed

## Jul 30, 2026 — Anti-Spam & Lead Quality
- Honeypot fields, content quality checks, disposable email rejection
- Rate limiting, geo IP enrichment, phone validation
- reCAPTCHA v3 infrastructure (awaiting Google keys)

## Production Architecture Discovery + Image/Perf/Redirect Fixes — Aug 18, 2026
**KEY FINDING (deployer agent):** Production frontend is served by a Cloudflare edge worker from static R2 assets. `prerender-server.js` NEVER runs in production — only `yarn build` output is deployed. The worker does SPA fallback (200 for unknown URLs), sets its own `no-cache, no-store` on HTML, and cannot do 301s. All server-level fixes must live in static build artifacts or backend /api/*.

### Fixed this session
- **Broken project images**: `projects` collection + seed had dead local `/downloaded-images/`, `/generated-images/` paths (files deleted May 22 CDN migration). All 8 projects now use optimized CDN WebPs (`brightluxx/site-images/opt-proj-*.webp`, 41–139KB, verified HTTP 200 image/webp). 2 lost files (MoE facade, DIFC lounge) regenerated via AI. Zero dead paths remain in DB (10 collections scanned) or seed or prerendered HTML.
- **/api/cdn/***: now 301-redirects to `files.ihgbrands.com/uploads_<flattened>` (routes/redirects.py, single source; duplicate removed from public.py).
- **Heavy homepage PNGs**: 4 PRODUCT_FAMILIES images (1.4–1.5MB PNG) → WebP 67–101KB, uploaded to CDN, Home.js updated (`opt_fam_*.webp`).
- **Slow APIs**: `/api/products` + `/api/projects` gained `limit` param (homepage payload 196KB → 20KB). Server-side response cache active (x-api-cache HIT ~1.5ms). Cache-Control `public, max-age=300` at origin for public GETs (added seo/page-meta, img, media to _CACHEABLE). NOTE: preview ingress rewrites this to no-store — expected; production nginx passes origin headers.
- **Legacy redirects**: postbuild-prerender.js now generates static redirect stubs (meta refresh 0 + canonical + noindex) for 19 legacy WP URLs — works under Cloudflare static serving. 15 written (rest are real pages: /products/cube-led-display-p3 is a real product, /led-screen-dubai real SEO page).
- **hjdba tombstone**: `build/products/hjdba/index.html` redirect stub overwrites the stale R2 file on next deploy (R2 sync doesn't delete old files). Production API already returns 404 for it.
- Testing: iteration_126 — 13/13 backend, 100% frontend (94 products, 8 projects, 0 broken images).

### Platform limitations (cannot fix from code — Cloudflare worker owned)
- True HTTP 404 status for unknown URLs (worker serves SPA shell 200; NotFound page sets client-side noindex).
- True HTTP 301 (meta-refresh stubs are the SEO-equivalent workaround).
- `Cache-Control: no-store` on HTML pages (worker sets it).
- `/wp-content/*` catch-all redirect (infinite paths can't be static files).
→ User can request worker-level rules from Emergent support if HTTP-level codes are required.

## Code Review Fixes — Aug 18, 2026
Applied: img_proxy cache key md5→sha256; removed dead duplicate fetchProducts in SignageSolutionsLanding + LuxuryHomeCinemaLanding; error logging added to empty catches (SEO.js page-meta fetch, PixelVueLanding, SignageSolutionsLanding, LuxuryHomeCinemaLanding, AdminResources, AdminCaseStudies).
False positives (no change, verified): rebuild.py "exec()" is asyncio.create_subprocess_exec (safe, no shell); pyflakes found 0 undefined variables; "is" comparisons are all `is None`/`is True` on real bools; test md5 mention is an assertion string; AdminContext.js:15 localStorage is the stale-token REMOVAL migration; CookieConsent localStorage stores only consent preference.
Deferred deliberately: array-index keys bulk rewrite (previously broke 14 pages — see do-not-retry ledger); sessionStorage admin token fallback (cookie-first auth already primary, deliberate prior security decision); oversized-component splits + complexity refactors of postbuild-prerender.js/prerender-server.js (refactor only after production behavior is confirmed stable, per roadmap); IntersectionObserver dep warnings (standard reveal-hook pattern with [] deps is correct).

## Per-Product AI Image Generation — Aug 18, 2026
- Generated 94 bespoke photorealistic product images (Gemini Nano Banana via Emergent LLM key), one per product, prompt-matched to exact product type (poster totems, transparent facades, LED floors, channel letters, gas-price signs, XR stages, pool screens, controllers, etc.) in brand dark/amber aesthetic.
- Script: /app/scripts/gen_product_images.py (resumable/idempotent — skips products already on prod_<slug>.webp). 94 ok, 0 failed, all 32–150KB WebP.
- Uploaded to CDN site-images/prod_<slug>.webp; DB products.image_url updated (94 unique, 0 duplicates); seed_data_full.json re-exported (508 docs); prerender rebuilt (319 pages).
- CdnImage.js: site-images/* now bypasses /api/img proxy (files are pre-optimized; proxying added latency).
- Verified: /products grid shows unique on-topic images, 0 proxied, all 94 CDN URLs return 200 image/webp.
- NEEDS DEPLOY: production picks up new images via seed_migration + new build.

## Product Gallery Images + Redirect Map Bug Fixes — Aug 18, 2026
- Generated 188 gallery images (2 extra angles per product: close-up detail + alternate environmental view), 0 failures, all ≤150KB WebP on CDN (prod_<slug>_g1/_g2.webp). Script: /app/scripts/gen_gallery_images.py (idempotent). products.gallery set for all 94 (old dead /generated/*.png galleries replaced).
- ProductDetail.js: new gallery UI — main image + 3 clickable thumbnails (amber active ring), data-testids product-main-image / product-gallery-thumbnails / product-gallery-thumb-N. Verified click-switch works.
- BUG FIXED: legacy redirect maps (prerender-server.js WP_REDIRECTS, postbuild REDIRECT_STUBS, and the inline client-side wp map in public/index.html) redirected /products/cube-led-display-p3 → /products even though it is a REAL product, AND /services → /solutions even though Services is a REAL page (App.js:312). Removed both from all three maps. NOTE: the inline map in public/index.html is the client-side redirect fallback that runs in production (Cloudflare static) — keep the three maps in sync and never add real routes to them.
- Seed re-exported (508 docs incl. 188 gallery URLs), prerender rebuilt (319 pages). NEEDS DEPLOY.
- Gotcha: browsers cache 301s aggressively — test redirect changes with a query-string cache-buster.
