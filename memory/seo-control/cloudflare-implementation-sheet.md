# Cloudflare Redirect Rules — Implementation Sheet (brightluxx.com zone)

Source of truth: `/app/memory/seo-control/redirect-map.csv` (semantic destinations verified against the live route inventory — do not change targets).

**How to add:** Cloudflare Dashboard → your zone `brightluxx.com` → Rules → Redirect Rules → Create Rule (or use one Bulk Redirect List). Every rule: **301 Permanent**, **Preserve query string = ON**. All targets are final destinations — no chains.

| # | OLD URL | NEW URL | STATUS | QUERY STRING | NOTES |
|---|---------|---------|--------|--------------|-------|
| 1 | `/our-works` and `/our-works/*` | `https://brightluxx.com/projects` | 301 | Preserve | Wildcard covers child paths |
| 2 | `/portfolio` | `https://brightluxx.com/projects` | 301 | Preserve | Legacy alias |
| 3 | `/gallery` | `https://brightluxx.com/projects` | 301 | Preserve | Legacy alias |
| 4 | `/digital-solutions` | `https://brightluxx.com/solutions` | 301 | Preserve | Legacy nav name |
| 5 | `/about-us` | `https://brightluxx.com/about` | 301 | Preserve | |
| 6 | `/contact-us` | `https://brightluxx.com/contact` | 301 | Preserve | |
| 7 | `/download-catalog` | `https://brightluxx.com/products` | 301 | Preserve | Update target if a real /catalog page is built |
| 8 | `/products/led-display` | `https://brightluxx.com/products` | 301 | Preserve | Generic legacy category |
| 9 | `/products/indoor-led-display` | `https://brightluxx.com/indoor-led` | 301 | Preserve | Semantic: indoor hub |
| 10 | `/products/outdoor-led-display` | `https://brightluxx.com/outdoor-led` | 301 | Preserve | Semantic: outdoor hub |
| 11 | `/products/transparent-led-display` | `https://brightluxx.com/glassmorph` | 301 | Preserve | Semantic: transparent family |
| 12 | `/products/spherical-led-display` | `https://brightluxx.com/products/sculptled-sphere-3d` | 301 | Preserve | Semantic: current sphere product |
| 13 | `/products/rental-led-display` | `https://brightluxx.com/products` | 301 | Preserve | No rental hub exists yet |
| 14 | `/products/flexible-led-display` | `https://brightluxx.com/products/sculptled-ribbon-flex` | 301 | Preserve | Semantic: current flexible product |
| 15 | `/led-screen-dubai` | `https://brightluxx.com/led-screen-suppliers-dubai` | 301 | Preserve | Consolidate Dubai supplier intent |
| 16 | `/led-display-abu-dhabi` | `https://brightluxx.com/abu-dhabi` | 301 | Preserve | |
| 17 | `/led-screen-saudi-arabia` | `https://brightluxx.com/saudi-arabia` | 301 | Preserve | |
| 18 | `/led-screen-qatar` | `https://brightluxx.com/qatar` | 301 | Preserve | |
| 19 | `/wp-content/uploads/2022/05/BRIGHTLUXX-CATALOG-2022-Ver1.pdf` | `https://brightluxx.com/products` | 301 | Preserve | Old catalog PDF; retarget when a catalog page exists |
| 20 | `/products/hjdba` | — | **410 preferred** | — | Deleted test product; if 410 unavailable in your plan, use 301 → `/products` as interim |

**Rule expression examples (Cloudflare Redirect Rules):**
- Single: `(http.request.uri.path eq "/about-us")` → Dynamic redirect `concat("https://brightluxx.com/about")`, 301, preserve query string.
- Wildcard: `(starts_with(http.request.uri.path, "/our-works"))` → `https://brightluxx.com/projects`, 301.

**Rules of engagement:**
- Never redirect unrelated/unknown URLs to the homepage merely to hide a 404.
- No chains: each old URL points at the final canonical destination.
- After saving, verify each with `curl -I https://brightluxx.com/<old-url>` — expect `301` + direct final `location:` header. Then flip Status to `live-cloudflare` in redirect-map.csv.
