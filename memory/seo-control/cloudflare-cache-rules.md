# Cloudflare Cache Rules — Recommended Configuration (brightluxx.com zone)

**Do not apply anything below to `/api/*` or dynamic paths.** These are recommendations to install in Cloudflare Dashboard → Rules → Cache Rules. Order matters — bypass rules first.

## Rule 1 (first): BYPASS — dynamic and API traffic
- Expression: `(starts_with(http.request.uri.path, "/api/"))`
- Cache eligibility: **Bypass cache**
- Covers: form submissions, quote/lead endpoints, sitemap.xml (`/api/sitemap.xml` is dynamic), image proxy, admin API, calculator/product data fetches, any authenticated or user-specific responses.

## Rule 2: LONG-LIVED IMMUTABLE — content-hashed static assets
CRA emits content-hashed filenames under `/static/` (e.g. `main.abc123.js`), so they are safe to cache forever.
- Expression: `(starts_with(http.request.uri.path, "/static/"))`
- Cache eligibility: Eligible for cache
- Edge TTL: 1 year · Browser TTL: 1 year (`public, max-age=31536000, immutable`)

## Rule 3: LONG-LIVED — fonts and versioned media
- Expression: `(http.request.uri.path.extension in {"woff" "woff2" "ttf" "webp" "avif" "png" "jpg" "jpeg" "svg" "ico"})`
- Cache eligibility: Eligible for cache
- Edge TTL: 30 days · Browser TTL: 7 days
- Note: product/hero images are served from the external CDN host already; this rule covers same-zone media only.

## Rule 4: CONSERVATIVE EDGE CACHE — public prerendered HTML
- Expression: `(not starts_with(http.request.uri.path, "/api/")) and (not starts_with(http.request.uri.path, "/admin"))` with content-type HTML (or simply: hostname eq brightluxx.com and path extension is empty)
- Cache eligibility: Eligible for cache
- **Edge TTL: 1 hour** · **Browser TTL: 0 (respect origin / no browser caching of HTML)**
- Rationale: prerendered HTML changes only on deploy; 1h edge TTL gives TTFB/CWV benefit with fast staleness recovery. Purge cache after each deploy (Dashboard → Caching → Purge Everything, or scoped purge).
- Blocker note: origin currently sends `no-cache, no-store, must-revalidate` on HTML (platform worker). Use "Edge TTL: Override origin" for this rule to take effect.

## Never cache
- `/api/*` (rule 1)
- `/admin*` HTML
- Anything returning user-specific or calculator-result content via API
- POST requests (Cloudflare never caches these by default)

## Post-install verification
```bash
curl -sI https://brightluxx.com/static/js/main.*.js | grep -iE "cache-control|cf-cache-status"
curl -sI https://brightluxx.com/dubai | grep -iE "cache-control|cf-cache-status"   # expect cf-cache-status HIT on 2nd request
curl -sI https://brightluxx.com/api/products | grep -iE "cf-cache-status"          # expect BYPASS/DYNAMIC
```
