# Brightluxx Changelog

## Aug 27, 2026 — P3 Next.js Component Maintainability Refactor
- Split the isolated target’s dense navigation, comparison and RFQ components into focused reusable modules; reformatted the legacy catch-all, compare and contact route files without changing their behavior or visual system.
- Added pathname-change menu reset for the persistent App Router header. The navigation inventory is unchanged from the pre-refactor Next target; no valid route, API or static parity behavior was removed.
- Verification: ESLint, `yarn cf:build`, TypeScript and OpenNext bundling passed. An isolated Node 22.23.0 runtime restored local workerd preview; browser checks now pass header closure, comparison, differences-only and RFQ carry-over. Iteration 165 also passed representative SSR/SEO route contracts and local timing probes. **NO APIs are mocked.**
- Remote Cloudflare and GSC acceptance remain blocked pending authorized staging; local timings are not a fair remote CRA comparison. The documented rapid-transition analytics abort trace remains non-user-facing; settled navigation works.

## Current Session — Stage C Accepted
- Iteration 140 independently resolved and verified the mobile consent/comparison/contact-control collision at 430, 390, and 360.
- Final Stage C evidence decision: PASS. The 1440 redesign is intentional; all responsive interaction, raw SEO, hydration, and workerd checks pass.
- Performance report records stronger total delivery/runtime metrics with a non-blocking initial-JS comparability warning (remote CRA versus local workerd). Stage D was not started.

## Current Session — Approved Premium-Minimal Stage C Refinement
- Refined Stage C homepage copy to the approved concise architectural direction while preserving SEO semantics in visible supporting copy and server HTML.
- Iteration 138 independently passed raw SEO, interaction, desktop/mobile hydration, and no-console-error checks; no API is mocked.
- Performance measurement remains the sole Stage C acceptance blocker. Stage D and production cutover remain blocked.

## Current Session — Stage C Acceptance Evidence
- Generated persistent matched CRA/Next screenshots across 1440, 1024, 768, 430, 390, and 360; iteration 137 completed independent functional, raw HTML, and hydration checks without mocked APIs.
- Stage C correctly remains **NOT READY**: P1 drift at 1440 and P0 visual drift at 1024/768/430/390/360 affect header, hero, CTAs, fixed controls, and mobile layout. The internal dashboard now displays this evidence.
- Stage D is blocked; no production or CRA changes were made.

## Current Session — Next.js Stage C Foundation
- Added the staging-only `/__migration-parity` acceptance dashboard and secured it with noindex, robots exclusion, and sitemap exclusion; iteration 135 independently passed the route fix and boundary checks.
- Replaced the homepage snapshot with server-rendered accepted Phase 1 content and a small `HomeCounters` client island. Raw HTML retained the approved H1, hero CTAs, canonical, JSON-LD, and final counter values.
- **Not accepted:** full visual/performance homepage parity and the entire Stage D catalogue/Finder migration remain outstanding; no cutover occurred.

## Current Session — Next.js Migration Stages A/B
- Reconciled all 352 CRA baseline routes with the Next target: 333 canonical statics, 18 native redirects, and one native 410 tombstone; the manifest-backed check was independently retested in iteration 133.
- Added an isolated Next shared visual shell: responsive header/mega menu, mobile navigation, footer, cookie consent, fixed WhatsApp/phone actions, and comparison tray count as small client islands around a server layout.
- **No cutover:** visual and functional page parity remains incomplete; CRA is intact as rollback and remote Cloudflare preview still needs scoped credentials.

## Current Session — Next.js Migration Foundation (Not Deployable)
- Captured a CRA baseline and created a separate Next.js App Router/OpenNext target without modifying or deleting the working CRA release.
- Verified local workerd HTTP behavior and 333 canonical raw-HTML parity routes with zero metadata/canonical/H1/schema mismatches; redirects, 404, 410, robots, sitemap, and llms pass.
- **Not accepted:** visual parity and all interactive Phase 1/2/3 features are still CRA-only. Cloudflare remote preview requires scoped credentials; no production deployment or cutover occurred.

## Current Session — Commercial UX + SEO Upgrade, Phase 3 Complete
- Finalized the persistent three-product comparison journey: explicit fourth-product feedback, picker close behavior, difference-only mode, reliable clear behavior, and mobile tray clearance above the bottom navigation.
- Completed comparison-to-RFQ handoff: selected codes now appear on `/contact?products=...` and submit as `product_interest` with `comparison_request` source.
- Added print/PDF comparison styling that removes controls and preserves a readable black-on-white landscape table.
- Verification: iteration 131 passed all scoped frontend checks; final build produced 337 prerendered pages plus 15 stubs with 0 errors and SEO regression PASS / 0 failures (43 pre-existing metadata warnings).

## Current Session — Commercial UX + SEO Upgrade, Phase 2
- Rebuilt product discovery around By Product / By Application / By Technology paths in `/products`, desktop navigation, and mobile navigation. Added the lightweight non-indexable four-step product finder and mobile filter bottom sheet.
- Improved search for pitch notation and buyer terminology, upgraded product cards with available decision data and working Compare action, and normalized existing refresh-rate values from `key_specs` without fabricating specifications.
- Verified: build 337 prerendered routes / 0 errors; SEO regression PASS / 0 critical failures. Iteration 130 caught compare CTA overlap and refresh-rate field parity; both were fixed and self-verified.

## Current Session — Commercial UX + SEO Upgrade, Phase 1
- Updated homepage hero positioning: **ENGINEERING BRILLIANCE** is now a tagline, with a single descriptive H1 and clear `Explore Solutions` / `Start Your Project` CTA hierarchy.
- Added solution-first discovery, evidence-led project cards from existing project data, technology-first product-family cards, industry/application paths, professional/digital-signage/resource pathways, and static technical-insight links. Homepage prerender output now contains the final offer, semantic final counters, and crawlable internal links.
- Fixed the mobile hero CTA safe zone after iteration 129: at 390×844 both CTAs clear the consent banner and fixed mobile nav, with no horizontal overflow. `yarn build`: 337 prerendered routes / 0 errors; SEO regression: PASS / 0 critical failures.
- Naming audit note: homepage labels are now clear; existing LumiMorph terminology differs between older static homepage copy (fine-pitch/MicroLED) and its landing pages (textured luminous panels). No cross-site metadata/page rewrite was made in this phase.

## Current Session — Deployment Readiness Remediation
- Removed destructive product cleanup from startup seed migration; Atlas/production deployments now preserve data not present in the packaged seed file.
- Made frontend CDN configuration mandatory through `REACT_APP_CDN_URL`, added wildcard CORS compatibility that disables cross-origin credentials in wildcard mode, and cleaned malformed `.gitignore` entries while ignoring `memory/test_credentials.md`.
- Verified: local backend health 200; `yarn build` prerendered 337 routes with 0 errors and SEO regression passed; final deployment-agent result **PASS** with no blockers. No Docker changes made.
- Confirmed the earlier Kubernetes readiness timeout was caused by the backend aborting before port 8001 bound; current deployment-agent analysis passes against the exact CORS startup error.

## Current Session — Arabic Phase 1 + SEO Regression Coverage
- Added native RTL Arabic landing pages for homepage (`/ar-ae/`), Dubai (`/ar-ae/dubai`), and UAE (`/ar-ae/uae`) with project-led copy, Arabic FAQs, enquiry/product CTAs, and an English-language path where a real counterpart exists.
- Extended static prerendering with Arabic initial HTML, `lang="ar"`, `dir="rtl"`, canonical metadata, JSON-LD, and narrowly scoped `en-AE`/`x-default` hreflang. `/ar-ae/uae` correctly omits an alternate to the nonexistent `/uae` English route.
- Added Arabic paths to dynamic sitemap and SEO required-route regression checks. Verification: build gate passed at 337 prerendered pages / 0 errors; SEO regression 0 failures; iteration 128 passed 7/7 backend/static checks and all preview route checks.
- Cloudflare rule application and true edge 301/404/410 behavior remain unverified and platform/account-dependent; no claim of live status-code correction is made.

## Current Session — Cloudflare Edge Reverification
- Raw production `curl -I` retested all 19 legacy redirect mappings, one wildcard child path, `/products/hjdba`, and a random unknown path. Every response remains HTTP 200; no mapped legacy path emitted `Location`; public HTML retains forced `no-cache, no-store, must-revalidate`.
- Added `memory/seo-control/emergent-worker-support-request.md`: an evidence-backed, ready-to-send request for genuine 301/404/410 status preservation and configurable static/HTML cache behavior. It is prepared, **not submitted**; Cloudflare/user support-account access is required.

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

## GSC Indexing Fixes — Aug 18, 2026
- Root cause of "Duplicate without user-selected canonical": /dubai, /bahrain, /oman were real React routes but had NO page_seo docs → not prerendered → production served homepage shell with homepage canonical. Added page_seo docs with unique titles/descriptions/self-canonicals; now prerendered (322 pages total).
- Noindex audit: 16 noindex pages in our build, ALL intentional (404.html, 14 legacy redirect stubs, hjdba tombstone). GSC's count of 29 includes stale R2 files from old builds + client-rendered noindex on unknown URLs (also intentional).
- Production verified via raw curl: redirect stubs + tombstone ARE live (correct content), but HTTP status is 200 everywhere — Cloudflare worker layer (platform-owned). True 404/301/cache-control requires either user's own Cloudflare rules on brightluxx.com or Emergent support (support@emergent.sh) — see support answer in chat.
- hjdba: deleted from production DB (API returns 404), page tombstoned with noindex+redirect.

## GCC City Page Differentiation — Aug 18, 2026
- Created /app/frontend/src/data/locationContent.json: unique per-city projects + 5 unique FAQs for /dubai, /abu-dhabi, /qatar, /saudi-arabia, /kuwait, /bahrain, /oman (real projects only where they exist — Dubai 4, Abu Dhabi 2, Saudi 1; others FAQ-only to avoid fabricating installs).
- New components: /app/frontend/src/components/LocationExtras.js (LocationProjects grid + LocationFAQ accordion with FAQPage JSON-LD). Injected before {/* CTA */} in all 7 city pages (script-patched; imports after SEO import).
- postbuild-prerender.js: injects location projects+FAQs into prerendered HTML and appends FAQPage schema (NOTE: meta.schemas expects JSON STRINGS, not objects — objects render as [object Object]).
- Verified: all 7 prerendered pages have unique FAQ content + valid FAQPage schema, self-canonicals; UI accordion works. 322 pages, 0 errors. NEEDS DEPLOY.

## GCC City Hero Images — Aug 19, 2026
- Generated 7 city-accurate skyline heroes (Burj Khalifa/Dubai, Etihad Towers/Abu Dhabi, West Bay/Doha, Kingdom Centre/Riyadh, Kuwait Towers, Bahrain WTC/Manama, Mutrah Corniche/Muscat) at 104–172KB WebP (old heroes were 0.76–3MB). Script: /app/scripts/gen_city_heroes.py. CDN: site-images/hero_<city>.webp.
- Updated HERO_IMAGE in 6 pages; AbuDhabiPage had NO hero image (plain gradient) — added skyline layer under translucent amber gradient.
- Rebuilt (322 pages), screenshots verified Kuwait + Abu Dhabi. NEEDS DEPLOY.

## /dubai Page Rebuild for SEO — Aug 19, 2026
- ROOT CAUSE of 19 impressions/month: /dubai wasn't prerendered + had homepage canonical until Aug 18 fix — Google saw it as a homepage duplicate. Internal-link parity with /abu-dhabi already existed (both in footer).
- Rebuilt /dubai: H1 "LED Screen Supplier in Dubai"; keyword-rich intro (all 8 target keywords naturally placed) with links to /indoor-led, /outdoor-led, /signage-solutions, /led-screen-suppliers-dubai; NEW sections: Dubai Areas We Serve (Jebel Ali, Al Quoz, Business Bay, JLT, Al Nahda, Al Satwa, Downtown, DIFC), Dubai Signage Regulations & Power (Municipality permit, DED signboard, RTA brightness, DEWA 3-phase), Dubai Case Studies (6 live + 8 static links), Google Map embed (Jebel Ali showroom), 7 FAQs incl. "best LED display suppliers in Dubai" and "storefront screen size".
- All content is data-driven via locationContent.json (intro/areas/regulations/caseStudies keys) and injected into prerendered HTML by postbuild (verified all 8 checks in build/dubai/index.html). page_seo /dubai meta updated to keyword title/desc. Cross-link added from /led-screen-suppliers-dubai → /dubai.
- Fixed address inconsistency: Dubai contact card said Al Quoz; Contact page says Jebel Ali Industrial Area 1 — aligned to Jebel Ali.
- 322 pages, 0 errors; sections verified via screenshot + testids. NEEDS DEPLOY.

## Content Expansion: Tools Hub, Blogs, Mission-Critical, Suppliers Sync — Aug 19, 2026
- 3 new blog posts (DB-driven, auto-prerendered, FAQ schema): led-display-pricing-guide-uae (targets 3x3 video wall cost, price per sq ft, cost per sqm), indoor-vs-outdoor-led-screen-dubai, led-wall-buyers-checklist. All link to /dubai as hub. Blog prerender content slice raised 1000→6000 chars.
- New pages: /tools (hub, 6 tool cards), /tools/led-wall-size-calculator, /tools/video-wall-resolution-calculator (both interactive, testing-agent-verified math), /mission-critical-displays (control room/command center vertical, FAQPage schema, links ADNOC case study + /solutions/control-rooms + /abu-dhabi). Files: src/pages/tools/*, src/pages/MissionCriticalDisplays.js. Note: /viewing-distance and /led-calculator already existed.
- /led-screen-suppliers-dubai: added 5-question supplier-selection FAQ accordion (locationContent.json key) with FAQPage schema; removed overlapping/contradictory old warranty FAQ (said 3yr vs standard 2yr).
- "More free LED tools" link strips added to /calculator and /led-calculator.
- BUG FIXED (testing agent): /led-calculator, /configurator, /showroom, /compare, /lumimorph-elite 404'd on direct load (never prerendered). Fixed by adding page_seo docs — page_seo paths auto-register in prerender routes + sitemap. LESSON: every new React route needs a page_seo doc or it 404s in production static serving.
- Testing: iteration_127 passed (calculator math, blogs, FAQs, links); follow-up fixes verified via curl (all 200). 334 pages. NEEDS DEPLOY.

## Rich Results / Schema Expansion — Aug 19, 2026
- Organization + LocalBusiness schema now SITEWIDE (Jebel Ali address, +971559954274, geo, hours, priceRange, GCC areaServed) — added in BOTH schema paths: backend routes/ssr_meta.py (_global_business_schemas) AND postbuild buildMetaFromSeed. Removed old duplicate minimal org block from injectMeta.
- KEY ARCHITECTURE FACT: postbuild-prerender prefers live backend /api/ssr/meta when backend is up (admin rebuild path), falls back to buildMetaFromSeed offline (PRODUCTION pipeline path — no backend during platform build). Both paths must be kept in sync. Backend also caches meta in-memory (_meta_cache TTL) — restart backend after page_seo DB edits before rebuilding.
- Solutions: added 3 unique visible FAQs to all 11 solutions (DB field `faqs` — plural, matches solutions_api model; NOT `faq`), rendered in SolutionDetail.js + injected into prerendered body + FAQPage & Service schema in both schema paths.
- Products already had Product schema with price offers + FAQPage (all 94, price_range low/high USD). Blogs already had Article+FAQPage.
- Meta rewrites (page_seo) for zero-click pages: /abu-dhabi (ADNOC-Trusted), /oman (from OMR 180/m²), /bahrain (5–10 day delivery), /kuwait (55°C-rated), /pixelvue (Official Range & Prices), /technology/3d-anamorphic-led (3D Billboard Cost & Examples). Fixed empty /pixelvue canonical.
- AggregateRating/Review NOT implemented — awaiting real customer reviews from user (no fabrication).
- Verified in build: home [WebPage,Org,LocalBusiness], solution [Service,FAQPage,Breadcrumb,Org,LB], product [Product,FAQPage,Breadcrumb,Org,LB], blog [Article,FAQPage,...]. 334 pages. NEEDS DEPLOY.

## City Page Depth Parity — Aug 19, 2026
- Added areas-served (5-6 real districts each) + signage-regulations (3 each, country-specific authorities: DMT/ADDED/ADDC, Ministry of Municipality/Ashghal/KAHRAMAA, Baladiya/SASO/SEC, Kuwait Municipality/MEW, Municipalities Affairs/EWA, Muscat Municipality/Nama) to /abu-dhabi, /qatar, /saudi-arabia, /kuwait, /bahrain, /oman via locationContent.json.
- New reusable components LocationAreas + LocationRegulations in LocationExtras.js; rendered on all 6 pages (script-patched before LocationProjects). postbuild auto-injects both into prerendered HTML (pre-existing loc.areas/loc.regulations injection).
- Verified: all 6 prerendered pages contain both sections; /qatar screenshot confirmed UI. 334 pages, 0 errors. NEEDS DEPLOY.

## 2026-06 (fork) — SEO Regression Suite + URL Control Sheets
- Built permanent SEO regression suite: `frontend/seo-regression.js` + allow-list config `frontend/seo-regression.config.json`. Runs automatically at end of every `yarn build` (added to build script) and fails the build (exit 1) on critical regressions.
- Checks: page existence for required routes, SPA-shell detection, title/description presence+length, exactly one absolute HTTPS self-canonical, robots noindex leaks, exactly one H1, JSON-LD validity, OG/Twitter tags, real internal hrefs, placeholder content, stale Al Quoz address in PostalAddress schema, redirect-stub sanity (noindex/canonical/no chains), duplicate titles/canonicals (FAIL) + descriptions/H1s (WARN), /products listing has real product links, city-page content uniqueness (3-gram Jaccard, max 55%), sitemap validation (no query URLs, no stubs/noindex, every URL has HTML).
- Proved detection: injected 8 controlled failures (empty root, missing canonical, dup title, broken JSON-LD, noindex leak, double H1, lorem ipsum, wrong canonical) — suite caught all 10 resulting failures with exit 1; restored; clean run = PASS (0 failures, 43 non-blocking warnings: 41 title-long, 2 description-long).
- FIXED real regression found by suite: every prerendered page had 2 H1s (noscript template H1 + content H1). postbuild-prerender.js now demotes noscript H1 to <p><strong> and guarantees exactly one H1 in #root (auto-injects meta.h1 when content lacks one). Rebuild: 334 pages, 0 errors, suite PASS.
- Permanent control sheets in /app/memory/seo-control/: url-inventory.csv+md (349 URLs, generated via `frontend/seo-url-inventory.js`), redirect-map.csv (20 Cloudflare 301 rules w/ semantic targets incl. spherical→sculptled-sphere-3d, flexible→sculptled-ribbon-flex, wp-content catalog PDF), deleted-urls.csv (hjdba 410 intent), README.md with verification curl commands.
- Reports: frontend/seo-reports/seo-regression-report.{json,md}. Standalone: `yarn seo:test`.
- Preview smoke-tested: /dubai renders correctly after H1 changes.
- NOT DONE (external dependencies): Cloudflare redirect rules (user must add in dashboard per redirect-map.csv), genuine 404/410 (platform worker), HTML cache rules, Arabic SEO phase 1, author profiles, GSC revalidation.

## 2026-06 — Production Deployment (verified live)
- Deploy run 4e4559c3-a102-4b45-a0f6-0bf37c900615 LIVE at brightluxx-showcase.emergent.host / brightluxx.com.
- Two pipeline failures fixed en route: (1) pre-existing ReferenceError in postbuild-prerender.js — buildMetaFromSeed lacked solutionsIndex param, only surfaced in offline Cloud Build mode; fixed with 2-line scope fix, verified locally with backend stopped (334 pages, 0 errors, suite PASS). (2) Deployer fixed Dockerfile.cloudbuild manifest — frontend-build stage now COPYs backend/seed_data_full.json.
- Live raw-HTML verification (17 routes, no JS): /, /products, all 7 city pages, /blog, /case-studies, /resources, product/solution/blog/case-study/knowledge representatives — ALL PASS: 200, title, description, exactly 1 H1, correct self-canonical, body copy, valid JSON-LD, OG tags. Single-H1 fix confirmed live (<noscript><div><p><strong> signal present).
- robots.txt, sitemap index -> /api/sitemap.xml (317 URLs), llms.txt all live.
- Still pending (external): Cloudflare 301 rules (sheets in /app/memory/seo-control/cloudflare-implementation-sheet.md), platform worker 404/410 fix (http-status-handoff.md has exact support request), cache rules (cloudflare-cache-rules.md). Legacy + unknown URLs still return 200; HTML still no-store.
