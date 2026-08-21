# Ready-to-Send Emergent Support Request — Brightluxx Edge Statuses

**To:** support@emergent.sh  
**Subject:** Brightluxx Cloudflare Worker must preserve 301, 404, and 410 HTTP statuses

Hello Emergent Support,

Please escalate this as a platform-level Cloudflare Worker/R2 static-site behavior issue for the Brightluxx deployment.

**Deployment / domain**
- Emergent deployment: `brightluxx-showcase.emergent.host`
- Custom domain: `brightluxx.com`
- Frontend: static CRA/CRACO prerendered assets served through the managed Cloudflare Worker

**Required Worker behavior**
1. When a requested frontend path has no matching static file or configured application route, serve the deployed branded `/404.html` with a genuine **HTTP 404** status. Do not rewrite this response to a 200 SPA shell.
2. Support a configurable list of intentionally deleted frontend paths that return genuine **HTTP 410 Gone**. Current path: `/products/hjdba`.
3. Preserve genuine **HTTP 301** responses and direct `Location` headers for configured Cloudflare redirect rules. The Brightluxx zone has a controlled legacy redirect map; the Worker must not convert matched redirect responses into 200 SPA fallbacks.
4. Make cache behavior configurable at the edge:
   - content-hashed `/static/*` JS/CSS: immutable long-lived cache;
   - static media/fonts: long-lived cache;
   - prerendered public HTML: conservative edge cache permitted;
   - `/api/*`, admin, and user-specific traffic: bypass cache.
   The Worker currently forces `Cache-Control: no-cache, no-store, must-revalidate` on public HTML.

**Current raw-curl evidence (current session)**
- 19 legacy targets tested, including `/our-works`, `/portfolio`, `/about-us`, product aliases, GCC city aliases, and the legacy catalog PDF: all return **HTTP 200**, no `Location` header.
- `/products/hjdba`: returns **HTTP 200** instead of 410.
- `/this-page-does-not-exist`: returns **HTTP 200** instead of 404.
- Public HTML returns `cache-control: no-cache, no-store, must-revalidate`.

The site already ships static redirect/tombstone/404 HTML as mitigation, but app code cannot set final HTTP status at the managed Worker layer. Please confirm the Worker configuration change, an expected timeline, and how to verify it with raw `curl -I`.

Thank you.

## Post-resolution verification

```bash
curl -I https://brightluxx.com/about-us
# HTTP 301 + Location: https://brightluxx.com/about

curl -I https://brightluxx.com/products/hjdba
# HTTP 410

curl -I https://brightluxx.com/this-page-does-not-exist
# HTTP 404

curl -I https://brightluxx.com/dubai
# HTTP 200; cache policy matches configured public HTML rule
```