# HTTP Status Handoff — 301 / 410 / 404 (brightluxx.com)

## Classification

### 301 — Old URL has an appropriate replacement
All 19 mappings in `cloudflare-implementation-sheet.md` (rows 1–19). Implemented at Cloudflare zone level. Until then the build ships noindex meta-refresh stubs — these are **temporary mitigation only, NOT the intended final implementation**.

### 410 — Intentionally removed, no replacement
| URL | Reason | Current behavior | Intended |
|---|---|---|---|
| `/products/hjdba` | Test product deleted from catalog | HTTP 200 + noindex tombstone stub (platform worker limitation); API `/api/products/hjdba` correctly returns 404 | HTTP 410 Gone |

### 404 — Unknown / nonexistent URLs
Any route not in the 349-URL inventory (e.g. `/this-page-does-not-exist-928374923`).
- Intended: HTTP 404 + branded `404.html` (already built, carries noindex).
- Current: **HTTP 200 + SPA shell** — soft 404.

## Platform blocker (cannot be fixed in app code)
The Emergent Cloudflare worker that serves the static frontend rewrites every unmatched route to the SPA shell with **HTTP 200** and stamps HTML with `cache-control: no-cache, no-store, must-revalidate`. The application has no Node server running in production, so app-level status codes cannot apply. Do not hack around this in the app — it risks breaking prerendering.

## Current-session raw-curl audit

All configured legacy paths remain uncorrected at the edge: 19 redirect targets plus an `/our-works/legacy-child` wildcard probe returned **HTTP 200** with no `Location` header. `/products/hjdba` and a random nonexistent route also returned **HTTP 200**. HTML responses retain `cache-control: no-cache, no-store, must-revalidate`.

**Conclusion:** Cloudflare redirect/410 rules are not live in the user-owned zone, and the managed Worker still needs a platform status-preservation fix. Do not mark any map row `live-cloudflare` until each direct response is verified by raw `curl -I`.

## Exact requirement to send to Emergent platform support
> "Unknown/nonexistent routes must preserve the application's intended 404/410 HTTP status rather than being rewritten by the platform Worker to HTTP 200. Specifically for brightluxx-showcase.emergent.host (custom domain brightluxx.com):
> 1. When a requested path has no matching file in the static store, serve `/404.html` with **HTTP status 404** (not 200 SPA fallback).
> 2. Support a configurable list of permanently deleted paths that return **HTTP 410** (currently: `/products/hjdba`).
> 3. Allow HTML responses to carry configurable cache headers instead of the forced `no-cache, no-store, must-revalidate`."

The full ready-to-send email, including 301 preservation and raw-curl evidence, is in `emergent-worker-support-request.md`.

## Verification commands (after fixes)
```bash
curl -I https://brightluxx.com/about-us                              # 301 -> /about
curl -I https://brightluxx.com/this-page-does-not-exist-928374923    # 404
curl -I https://brightluxx.com/products/hjdba                        # 410 (where supported)
curl -I https://brightluxx.com/dubai                                 # 200, no redirect
```
