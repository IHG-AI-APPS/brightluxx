# Brightluxx Website Redesign — Development Plan (Updated)

## 1) Objectives
- Ship a premium, cinematic Brightluxx marketing site (dark stage + metallic gold) derived from the logo.
- Implement the new content architecture: **Products / Inspirations / Projects / Contact** (preserve **Showroom** + **Configurator**).
- Provide a reliable backend with new models + endpoints and seeded content (BL-* product codes).
- Ensure core lead-capture flow works end-to-end (front → API → Mongo) and the site renders fast, responsive, and stable.
- Ensure **logo usage is correct across dark UI**:
  - Use the **dark-background variant only** (gold text + X lightburst) with **transparent background**.
  - Avoid using the dual-version reference image in production UI.
- Complete comprehensive testing and verify site quality with minimal console noise.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation: LLM + Data API) ✅ COMPLETED
**Goal:** prove the riskiest part works before building the full UX: **product data API + Mongo persistence**.

**Delivered (What’s done)**
- Backend overhaul (FastAPI + MongoDB):
  - New collections: `products`, `inspirations`, `projects`.
  - Endpoints implemented:
    - `GET /api/products` (supports `category`, `featured`, `search`)
    - `GET /api/products/{slug}`
    - `GET /api/inspirations` (supports `category`)
    - `GET /api/projects` (supports `sector`, `featured`)
    - `GET /api/projects/{slug}`
    - `POST /api/leads` (kept + confirmed working)
    - `GET /api/health`
    - `GET /api/search` (basic product search)
- Seed script created and executed:
  - Seeded **12 products** with **BL-** prefixed product codes
  - Seeded **12 inspirations**
  - Seeded **6 projects**
  - Preserved leads collection
- API verification:
  - Manual curl smoke tests confirmed correct payload shapes and non-empty data.

**Exit criteria (met)**
- All new endpoints return stable non-empty data without 500s.
- Lead creation works and inserts into `leads`.
- Backend tests: **100% pass rate (37/37)**.

---

### Phase 2 — V1 App Development (Frontend + Backend Wiring) ✅ COMPLETED
**Goal:** implement the new premium UX using design guidelines + hero video.

**Delivered (What’s done)**
- Global styling setup:
  - Fonts implemented in `index.css`: **Fraunces** (display) + **Manrope** (body).
  - Premium dark theme tokens + gold accents added.
  - Avoided `transition: all`; used scoped transitions.
  - Noise overlay utility + premium hover/press states.
- Navigation + layout:
  - Minimalist Navbar.
  - Updated Footer with new IA and contact details.
  - Sticky mobile CTA bar (WhatsApp + Get Quote).
- Routing + API wiring:
  - Updated `App.js` routes: `/` `/products` `/inspirations` `/projects` `/showroom` `/configurator` `/contact`.
  - Updated `api.js` to use new endpoints.
- Home page rewrite:
  - Cinematic autoplay hero video (`/assets/hero-video.mp4`) with poster fallback.
  - 3 “entry doors” to Products / Inspirations / Projects.
  - Trust strip + CTA section.
- Products page:
  - Grid of product cards with BL code badges.
  - Filters (category) + search.
  - Quick-view modal with a specs table and CTAs.
- Inspirations page:
  - Masonry-style gallery (CSS columns) + category filters.
- Projects page:
  - Case study card grid + sector filters.
  - Project detail modal including metrics + products used.
- Contact page:
  - Restyled lead capture form consistent with new design system.
  - WhatsApp integration and success-state UI.
- Preserved experiences:
  - **Virtual Showroom** and **Product Configurator** remain functional and visually compatible with the new theme.
- Cleanup:
  - Removed legacy/unused pages and old files from previous IA.

**Exit criteria (met)**
- All pages render and navigate correctly.
- Products load from backend; quick-view works.
- Lead form submit shows success UI and persists to DB.

---

### Phase 3 — Testing, Polish, Performance ✅ COMPLETED
**Goal:** validate quality, stability, and end-to-end lead generation.

**Delivered (What’s done)**
- Comprehensive test pass:
  - Backend: **100% (37/37)**
  - Frontend: **98%** (only minor console warnings; no functional impact)
- Visual QA:
  - Screenshot verification across key routes: Home, Products (+ modal), Inspirations, Projects (+ modal), Contact, Showroom.
- Stability:
  - Confirmed WhatsApp CTAs work with pre-filled messages.
  - Confirmed lead capture inserts into Mongo and shows success UI.

**Noted (minor)**
- Minor console warnings (cosmetic only) reported around the product modal specs table hydration.

---

### Phase 3.5 — Logo Asset Finalization ✅ COMPLETED
**Goal:** fix logo usage logic based on the provided dual-version reference (white bg + black bg).

**Context**
- User-provided logo file contained **two logo versions side-by-side**:
  - Left: logo on **white background** (reference for light backgrounds)
  - Right: logo on **black background** (reference for dark backgrounds)

**Delivered (What’s done)**
- Extracted **only** the dark-background logo (right half), removed the black background, and produced a transparent PNG.
- Deployed the transparent dark-optimized logo across the site:
  - Navbar logo updated to: `/assets/brightluxx-logo-dark.png`
  - Footer logo updated to: `/assets/brightluxx-logo-dark.png`

**Exit criteria (met)**
- Gold text and the **X lightburst effect** render cleanly on the dark theme.
- No white/black reference blocks appear in production UI.

---

### Phase 4 — Future Enhancements (Post-V1)
**User stories**
1. As an admin, I can manage products/projects/inspirations in a CMS UI.
2. As sales, I receive real email notifications for new leads.
3. As marketing, I can A/B test hero CTAs and track conversions.
4. As a visitor, I can download gated resources after lead capture.
5. As a visitor, I can deep-link/share individual products and projects with dedicated detail pages.
6. As brand owner, I can maintain multiple logo variants (light/dark) and swap them safely without editing UI code.

**Steps**
- Admin panel:
  - Add protected CRUD UI for `products`, `inspirations`, `projects`.
- Notifications:
  - Integrate email (SMTP/SendGrid) + optional Slack/WhatsApp notifications for new leads.
- Analytics:
  - Add event tracking for CTAs, filters, modal opens, and form submissions.
- Content pipeline:
  - Implement real scraping ingestion from supplier sources (Unilumin, Leyard, etc.) into `products`.
  - Add scheduled refresh + deduplication.
- Performance/SEO:
  - Add preloading strategies for hero media.
  - Add meta tags, OpenGraph, structured data for products/projects.
- Brand assets:
  - Store official logo variants as separate assets (e.g., `logo-dark.svg`, `logo-light.svg`) and document usage rules.

---

## 3) Next Actions (Immediate)
1. (Optional) Resolve the minor console hydration warnings in the product specs table.
2. Replace placeholder inspiration/project media with fully licensed brand-approved assets.
3. Add conversion tracking (CTA clicks, form submits) and define KPIs.
4. Implement lead notification delivery (email/WhatsApp/Slack) for sales follow-up.
5. Start supplier scraping ingestion pipeline to continuously expand the product catalog.
6. (Brand) Provide/export **official SVG** logo variants (dark/light) for pixel-perfect scaling; swap PNG for SVG once available.

---

## 4) Success Criteria
- Backend: `/api/products`, `/api/inspirations`, `/api/projects` return stable, well-structured data; `/api/leads` remains functional.
- Frontend: New routes live; Home hero video autoplays; Products grid + quick view works; Inspirations/Projects render with media-first UI.
- Leads: contact form reliably stores submissions; success feedback visible; WhatsApp CTAs work.
- Branding: production UI uses the **transparent dark-background logo variant only** on the dark theme (gold + X lightburst), with no reference background blocks.
- Quality: scoped transitions (no `transition: all`), minimal gradients, responsive layout, no broken links, and only minor/no console warnings.
