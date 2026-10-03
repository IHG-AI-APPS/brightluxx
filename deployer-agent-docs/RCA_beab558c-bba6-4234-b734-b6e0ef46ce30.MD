# RCA — brightluxx.com still serves the legacy CRA site after redeploy

## Problem statement
User completed a redeploy expecting the live root (https://brightluxx.com/) to serve the
Next.js / OpenNext target, but the root still shows the legacy CRA (Create React App) site.

## Verdict (answers to the three questions)
1. **Did the deployment build `/app/frontend` instead of `/app/nextjs`? — YES. This is the root cause.**
2. **Does the custom domain map to an old service/artifact? — NO.** Domains are healthy and serve the *current* artifact; it is simply the wrong app.
3. **Is CDN caching/routing blocking the new build? — NO.** The live 200 is the freshly-published artifact for the active run; it is CRA because the build built CRA.

## Evidence

### Deployment configuration
- `describe_deployment_state`: active run `beab558c-...` (type `replacement`, status **success**),
  template `fastapi_react_mongo_shadcn_base_image`, `frontend_type: cloudflare` (static files
  served from R2 by a Cloudflare worker). This is the FARM/CRA template — there is no Next.js
  deploy target configured.

### The build builds `/frontend` (CRA), never `/nextjs`
From the deployment override `build-frontend-artifacts.sh` (gs://.../app-router-parity/deployment/):
```
SOURCE_DIR="${SOURCE_DIR:-/workspace/source}"
if [ ! -d "${SOURCE_DIR}/frontend" ]; then ... exit 0; fi
cd "${SOURCE_DIR}/frontend"
...
yarn build
if [ -d "build" ]; then BUILD_DIR="build"; elif [ -d "dist" ]; then BUILD_DIR="dist"; ...
s5cmd ... sync . "s3://${CLOUDFLARE_ARTIFACTS_BUCKET}/${DEPLOYMENT_NAME}/${TAG}/build/"
```
The script is hardcoded to `cd ${SOURCE_DIR}/frontend`, run `yarn build`, and sync the CRA
`build/` output to R2. It **never references `/nextjs`**. `config.yaml` env_paths also point at
`frontend/.env` only.

### Both apps exist in the pulled source (eph sandbox on the active run)
- `/app/scratch/frontend` — CRA app: `craco.config.js`, `cra-template` in package.json,
  pre-built `build/` dir → **this is the legacy CRA site now live**.
- `/app/scratch/nextjs` — the intended target: `next@16.3.2`, `@opennextjs/cloudflare@1.20.2`,
  scripts `build: next build`, `cf:build: opennextjs-cloudflare build`; contains
  `.open-next/`, `open-next.config.ts`, `wrangler.jsonc`, `MIGRATION_STATUS.md`. **This app is
  never built or deployed.**

### Live site = current CRA artifact (not stale cache, not old artifact)
- `preview_health_check` on https://brightluxx-showcase.emergent.host/ → **200**, body is a
  static SPA `index.html` (GTM + brightluxx meta), i.e. the CRA build — no `/_next/` assets.
- The worker serves R2 path `${DEPLOYMENT_NAME}/${TAG}/build/` where `TAG` = the active run id,
  so the served bytes are the newest build. The build itself is CRA, so a cache purge / hard
  refresh will NOT change what is served.

### Domain / routing is healthy
- `list_domains`: `www.brightluxx.com` and `brightluxx.com` both `verified:true`,
  `ssl_status:active`, provider cloudflare, root_redirect enabled.
- `check_domain_status` reports "A records do not point to expected IPs" — this is the normal
  state for a **proxied Cloudflare custom hostname** (orange-cloud), and the site resolves and
  returns 200, so routing is fine. Not the cause.

## Root cause
The deployment is configured as a FARM/CRA app (`fastapi_react_mongo_shadcn_base_image`,
cloudflare static-R2 frontend). Its `build-frontend-artifacts.sh` always builds `/frontend`
(CRA) and publishes the static `build/` to R2. The Next.js/OpenNext app under `/nextjs` is never
built or deployed, so every redeploy re-publishes the CRA site. The custom domain and CDN are
working correctly — they just serve the (wrong) current artifact.

## Corrective action
This is NOT a one-line "point the build dir at /nextjs" change. OpenNext does **not** emit a
static `build/` dir for R2 static hosting — it produces a Cloudflare **Worker + assets**
(`.open-next/`) deployed via `wrangler deploy` (`yarn cf:build` / `opennextjs-cloudflare`). The
current static-R2 serving model is incompatible with OpenNext, so the deployment must be
switched to a Next.js/OpenNext deploy target, not patched in place.

Recommended (E1 / platform):
1. Reconfigure this deployment to target `/app/nextjs` using a Next.js/OpenNext (Cloudflare
   Workers) deployment template — build with `yarn cf:build` and deploy the `.open-next` worker
   via `wrangler`, instead of syncing a CRA `build/` dir to R2.
2. Ensure `nextjs/.env.production` / wrangler env carries the production `BACKEND_URL` /
   backend routing equivalent to the current FARM backend.
3. After the Next.js target is live, decommission/ignore the `/frontend` CRA path so redeploys
   stop republishing it.
4. No domain change required — `brightluxx.com` / `www.brightluxx.com` are verified with active
   SSL and will serve the new worker once it is promoted. A cache purge is only cosmetic; it is
   unnecessary once the correct app is built.

## Not the cause (ruled out)
- Custom domain / SSL / DNS — healthy.
- CDN caching — serving the current artifact; cache purge won't help.
- No build/runtime failure — the active run succeeded; it just built the wrong app.
