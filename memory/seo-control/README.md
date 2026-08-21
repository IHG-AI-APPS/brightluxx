# SEO Control Sheets — Brightluxx

Permanent control files for URL governance. Do not delete.

| File | Purpose | How it's maintained |
|---|---|---|
| `url-inventory.csv` / `.md` | Every prerendered URL: type, indexability, canonical, sitemap membership, H1, topic, language, status | **Generated** — run `cd /app/frontend && node seo-url-inventory.js` after every `yarn build` |
| `redirect-map.csv` | Legacy URL → new URL 301 map. Source of truth for Cloudflare Redirect Rules | **Hand-curated** — update when URLs move; flip Status to `live-cloudflare` after rules are verified with `curl -I` |
| `deleted-urls.csv` | Intentionally removed URLs that should return 410 | **Hand-curated** |

## Regression suite
- `frontend/seo-regression.js` runs automatically at the end of every `yarn build` and **fails the build** on any critical SEO regression (missing titles/canonicals/H1s, SPA shells, noindex leaks, duplicate titles, broken JSON-LD, placeholder content, city-content duplication, sitemap drift).
- Allow-list config: `frontend/seo-regression.config.json` — only add exceptions there deliberately, never to silence a real regression.
- Reports: `frontend/seo-reports/seo-regression-report.{json,md}`.
- Standalone run: `cd /app/frontend && yarn seo:test`

## Verification commands after Cloudflare rules go live
```bash
curl -I https://brightluxx.com/our-works/          # expect 301 -> /projects
curl -I https://brightluxx.com/products/led-display # expect 301 -> /products
curl -I https://brightluxx.com/dubai                # expect 200
curl -I https://brightluxx.com/no-such-page-984723  # still 200 until platform worker fix
```
