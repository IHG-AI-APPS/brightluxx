# Brightluxx Next.js Migration Status

## Do Not Deploy Yet

This workspace is an isolated migration target at `/app/nextjs`. The live CRA application in `/app/frontend` remains untouched and is the rollback source of truth.

## Verified foundation

- Next.js 16.3.2 App Router builds through `@opennextjs/cloudflare` 1.20.2.
- Local Cloudflare/workerd preview passes 337 saved-content routes, 18 permanent redirect checks (HTTP 308), a genuine unknown-route HTTP 404, a genuine tombstone HTTP 410, `robots.txt`, `sitemap.xml`, and `llms.txt`.
- The route-parity gate compares server HTML title, description, canonical, H1, and JSON-LD schema types against the saved CRA baseline with zero failures.
- Route content and JSON-LD are embedded at build time, avoiding unsupported Worker filesystem reads.

## Not accepted / still required

- The current parity renderer carries SEO content only. It is **not visual parity** with the CRA UI and does not yet reproduce navigation, filters, Finder, comparison, forms, downloads, calculators, or analytics events.
- Phase 1/2/3 client functionality must be migrated as isolated client components inside their server-rendered pages before any cutover.
- Cloudflare remote preview and deployment are blocked until scoped Cloudflare credentials are supplied. Local workerd preview is not a production preview deployment.
- Bundle/performance, full visual regression, end-to-end functional parity, production HTTP validation, and the post-migration Phase 3 acceptance suite remain pending.

## Current compatible tooling

- Node in this environment: 20.20.2.
- Wrangler 4.86.0 is intentionally pinned because it supports Node 20. The newer current Wrangler releases require Node 22.
- The configured workerd compatibility date is `2026-05-03`, the newest date supported by this locally available Wrangler/workerd combination.