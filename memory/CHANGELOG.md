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
