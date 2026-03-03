# Brightluxx Website Redesign — Development Plan

## 1) Objectives
- Ship a premium, cinematic Brightluxx marketing site (dark stage + metallic gold) derived from the logo.
- Implement new content architecture: **Products / Inspirations / Projects / Contact** (keep **Showroom** + **Configurator**).
- Stand up a reliable backend with new models + endpoints and seed data (BL-* product codes).
- Ensure core lead-capture flow works end-to-end (front→API→Mongo) and pages render fast, responsive, and stable.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation: LLM + Data API)
**Goal:** prove the riskiest part works before building the full UX: **LLM-assisted product copy generation + new API endpoints + Mongo persistence**.

**User stories**
1. As an admin/dev, I can seed products with BL-* codes so the Products page has real content.
2. As an admin/dev, I can generate consultant-style descriptions via LLM so product cards feel premium.
3. As a visitor, I can fetch products from `/api/products` and see consistent fields (name, code, specs, images).
4. As a visitor, I can fetch inspirations and projects from `/api/inspirations` and `/api/projects`.
5. As a visitor, I can submit a lead and see a success response while data is stored in Mongo.

**Steps**
- Websearch: best-practice prompt pattern for “B2B consultant-style product description” (short + scannable).
- Create a minimal Python test script:
  - Calls the LLM once with a sample raw spec blob → returns structured JSON (title, shortDesc, bullets, keySpecs).
  - Validates JSON schema + length constraints.
- Backend overhaul (FastAPI):
  - New collections: `products`, `inspirations`, `projects`.
  - Add endpoints: `GET /api/products`, `GET /api/products/{slug}`, `GET /api/inspirations`, `GET /api/projects`.
  - Keep: `/api/leads`, `/api/health`.
- Seed script:
  - Insert ~12–20 products (BL- prefix), 12 inspirations, 8 projects.
  - Use the proven LLM prompt to generate descriptions for seeded products.
- Verify with curl/pytest:
  - Endpoints return correct payload shapes and published filtering (if used).

**Exit criteria (must pass before Phase 2)**
- LLM test script returns valid JSON for 3 sample products.
- All new endpoints return non-empty data and no 500s.
- Lead creation still works and inserts into `leads`.

---

### Phase 2 — V1 App Development (Frontend + Backend Wiring)
**Goal:** implement the new premium UX using design_guidelines + shipped hero video.

**User stories**
1. As a visitor, I land on a cinematic homepage with autoplay hero video and clear CTAs.
2. As a visitor, I can browse Products with filters/search and quick-view specs.
3. As a visitor, I can browse Inspirations as a visual gallery with minimal copy.
4. As a visitor, I can browse Projects and open a project detail view with media/specs.
5. As a visitor, I can contact Brightluxx via form or WhatsApp in one click.

**Steps**
- Global styling setup:
  - Update fonts in `index.css`: **Fraunces** (display) + **Manrope** (body).
  - Remove `transition: all` usages; add missing lightburst tokens.
- Navigation + layout:
  - Rewrite Navbar to minimalist style using **logo image** (`/assets/brightluxx-logo.png`).
  - Update Footer to match new IA.
- Routing:
  - Update `App.js` routes to: `/` `/products` `/inspirations` `/projects` `/showroom` `/configurator` `/contact`.
  - Update `api.js` for new endpoints.
- Home page rewrite:
  - Implement hero using `/assets/hero-video.mp4` with poster fallback.
  - 3 entry doors → Products / Inspirations / Projects.
  - Trust strip + final CTA with lead capture.
- Products page:
  - Grid of ProductCards with BL code badge + top specs.
  - Filter bar (category/pitch/indoor-outdoor) + search.
  - Quick view (Dialog desktop / Drawer mobile) with specs Table.
- Inspirations page:
  - Masonry-like gallery (grid/columns) + hover reveal.
- Projects page:
  - Case study card grid + detail view (Tabs: Overview/Media/Specs).
- Contact page:
  - Restyle existing lead form to match design system + sonner toast.
- Conclude Phase 2 with 1 full E2E test pass via testing agent.

**Exit criteria**
- All pages render without console errors.
- Products load from backend and quick-view works on desktop + mobile.
- Lead form submit shows success UI and DB insert confirmed.

---

### Phase 3 — Testing, Polish, Performance
**User stories**
1. As a visitor, the site feels fast and smooth on mobile and desktop.
2. As a visitor, I can navigate all pages without broken links.
3. As a visitor, reduced-motion users aren’t forced into heavy animations.
4. As a visitor, images/videos load reliably with graceful fallbacks.
5. As the business, forms and CTAs are consistently visible and drive leads.

**Steps**
- Automated + manual testing:
  - Backend endpoint tests (status codes, schema checks).
  - Frontend UI checks (routes, loading states, empty states).
- Visual QA:
  - Screenshot verification across key breakpoints.
- Performance:
  - Optimize hero video usage (preload metadata, poster).
  - Ensure placeholders when product images missing.
- Final pass: copy trimming (minimal text), spacing, hover/focus states.
- Conclude Phase 3 with testing agent run and bugfix iteration.

---

### Phase 4 — Future Enhancements (Post-V1)
**User stories**
1. As an admin, I can manage products/projects/inspirations in a CMS UI.
2. As sales, I receive real email notifications for new leads.
3. As marketing, I can A/B test hero CTAs and track conversions.
4. As a visitor, I can download gated resources after lead capture.
5. As a visitor, I can request a quote from any product detail.

**Steps**
- Add admin panel (simple protected routes) for CRUD content management.
- Integrate email (SMTP/SendGrid) + optional Slack/WhatsApp notification.
- Add analytics events for CTA clicks + form submissions.

---

## 3) Next Actions (Immediate)
1. Implement Phase 1 POC script for LLM product copy (validate JSON + constraints).
2. Rewrite `backend/server.py` with new models + endpoints and keep leads.
3. Add seed script to populate `products/inspirations/projects` (12–20 products).
4. Smoke test endpoints with curl.
5. Start Phase 2: font swap + navbar/logo + routes + Home hero video.

---

## 4) Success Criteria
- Backend: `/api/products`, `/api/inspirations`, `/api/projects` return stable, well-structured data; `/api/leads` remains functional.
- Frontend: New routes live; Home hero video autoplays; Products grid + quick view works; Inspirations/Projects render with media-first UI.
- Leads: contact form reliably stores submissions; success feedback visible; WhatsApp CTAs work.
- Quality: No `transition: all`, minimal gradients per rules, responsive layout, no broken links, no console errors.
