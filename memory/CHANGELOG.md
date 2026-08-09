# Brightluxx Changelog

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
