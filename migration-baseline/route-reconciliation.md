# Brightluxx Route Reconciliation — CRA Baseline to Next.js

- Baseline routes: **352**
- Canonical Next.js 200 routes: **333**
- Native redirects: **18**
- Native tombstones: **1**
- Unexplained route gap: **0**

| Old route | Type | Next.js status | Expected HTTP status | Indexable? | Action required |
| --- | --- | --- | --- | --- | --- |
| /our-works | redirect | native 308 → /projects | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /digital-solutions | redirect | native 308 → /solutions | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/led-display | redirect | native 308 → /products | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/indoor-led-display | redirect | native 308 → /indoor-led | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/outdoor-led-display | redirect | native 308 → /outdoor-led | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/spherical-led-display | redirect | native 308 → /products | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/transparent-led-display | redirect | native 308 → /glassmorph | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/rental-led-display | redirect | native 308 → /products | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/flexible-led-display | redirect | native 308 → /products | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /download-catalog | redirect | native 308 → /products | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /about-us | redirect | native 308 → /about | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /contact-us | redirect | native 308 → /contact | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /portfolio | redirect | native 308 → /projects | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /gallery | redirect | native 308 → /projects | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /led-screen-dubai | redirect | native 308 → /led-screen-suppliers-dubai | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /led-display-abu-dhabi | redirect | native 308 → /abu-dhabi | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /led-screen-saudi-arabia | redirect | native 308 → /saudi-arabia | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /led-screen-qatar | redirect | native 308 → /qatar | 308 permanent redirect | No | Keep explicit Next.js redirect; exclude from sitemap. |
| /products/hjdba | tombstone | native 410 | 410 gone | No | Keep explicit Route Handler. Product was intentionally retired; preserve its native gone response. |

All 19 non-canonical baseline routes are deliberately represented natively. No canonical content route is missing.
