# plan.md — Brightluxx Premium Showcase Website (CMS-driven)

## 1) Objectives
- Launch a premium, dark-first marketing showcase for Brightluxx (OEM LED brand) optimized for UAE lead generation.
- Deliver a CMS-managed content system for Technologies, Applications, Case Studies, ISE/What’s New, and gated Resources.
- Prove (via POC) the failure-prone core: supplier-site scraping + AI-assisted content generation + media/spec ingestion.
- Implement fast lead capture flows (forms + WhatsApp CTA) with configurable email routing (mock first).

## 2) Implementation Steps (Phased)

### Phase 1 — Core POC (Isolation: scraping + AI generation + content normalization)
**Goal:** validate we can reliably ingest supplier content and turn it into publishable “Technology” entries.

**User stories (POC)**
1. As an admin, I can provide a supplier URL and extract title/spec bullets/images into a normalized JSON.
2. As an admin, I can run AI to generate a premium UAE-focused description from the extracted specs.
3. As an admin, I can approve/edit the generated content before saving.
4. As an editor, I can upload/attach images/videos and see them render correctly.
5. As a marketer, I can preview a Technology page from the ingested data.

**Steps**
- Websearch best practices for resilient scraping (static vs JS sites) + Playwright patterns + rate limiting.
- Define a **normalized content schema** (Technology) used everywhere:
  - name, tagline, heroMedia, gallery[], keySpecs[], comparisonFields, applications[], FAQs, SEO fields.
- Build standalone Python scripts:
  - `scrape_test.py`: URL → extracted raw fields (BeautifulSoup first; fallback Playwright).
  - `ai_generate_test.py`: normalized input → generated copy (OpenAI/Claude) + validation rules.
  - `ingest_test.py`: combines scrape + AI → outputs final JSON ready for DB.
- Add guardrails:
  - source attribution fields, duplicate detection, selector configs per supplier domain, retry/backoff.
- **Exit criteria:** at least 2 supplier pages (once links provided) successfully ingested into the normalized JSON with usable copy + media links.

---

### Phase 2 — V1 App Development (MVP, no auth initially)
**Goal:** ship working public site + minimal CMS editing to publish content; focus on lead-gen UX.

**User stories (V1)**
1. As a visitor, I can quickly choose between Technologies / Applications / Case Studies from the home hero.
2. As a visitor, I can watch a technology reel and understand key benefits within 10 seconds.
3. As a visitor, I can compare LED options (MiP vs COB vs SMD) via a quick compare table.
4. As a visitor, I can submit a “Get Quote in 2 Hours” form and receive confirmation.
5. As a visitor, I can click a sticky WhatsApp CTA on any page to start a chat.

**Backend (FastAPI + MongoDB)**
- Implement core REST endpoints:
  - Public: list/detail for Technologies, Applications, Case Studies, Updates, Resources.
  - Leads: create lead (store + mock email send).
  - Media: upload (images/video) + serve URLs (GridFS or local dev storage; cloud-ready abstraction).
- Data models + migrations/seed script with sample content.
- Basic SEO fields per content type (title, meta, canonical slug).

**Frontend (React/Vite + Tailwind + Framer Motion)**
- Dark-first premium UI: Inter/Space Grotesk, large type, generous spacing, minimal borders.
- Core pages:
  - Home (hero reel, 3 entry doors, proof blocks, sticky CTA)
  - Technologies hub + Technology detail (media gallery, specs, quick compare, CTA)
  - Applications hub + detail (use-cases + recommended tech)
  - Case studies index + detail (video + metrics)
  - What’s New (ISE-style monthly updates)
  - Contact (fast form + map placeholder)
- Lead-gen components:
  - Multi-step/sectioned form with file upload, confirmation state, spam protection (honeypot).
  - Sticky CTA (Book demo / WhatsApp / Get quote).

**End-of-phase testing**
- 1 full E2E pass: browse hubs → open detail → submit lead → verify stored lead + mock email log.
- Performance smoke test: hero video lazy-load, images optimized, responsive checks.

---

### Phase 3 — CMS + Editorial Workflow (then add admin auth)
**Note:** auth slows automated testing; confirm before enabling.

**User stories (CMS)**
1. As an admin, I can create/edit/publish/unpublish Technologies with rich media.
2. As an admin, I can manage Case Studies with metrics and video embeds/uploads.
3. As an admin, I can post monthly “What’s New” updates and schedule publish dates.
4. As a marketer, I can create gated Resources and capture leads before download.
5. As an admin, I can see a simple leads inbox with filters (city, application, timeline).

**Steps**
- Add Admin UI (minimal) for CRUD across all collections.
- Add JWT auth + role(s): Admin/Editor.
- Add versioning fields (draft/published, updatedBy, timestamps).
- Add SEO editor per page + auto-sitemap generation.
- E2E test: login → create technology → publish → visible on public site.

---

### Phase 4 — Production hardening + integrations
**User stories (hardening)**
1. As a visitor, pages load fast on mobile even with video.
2. As sales, I receive real emails with lead details and attachments.
3. As an admin, I can re-run ingestion on a supplier URL and update an existing Technology.
4. As marketing, I can track CTA conversions by page.
5. As an owner, I can deploy safely with environment-based configs.

**Steps**
- Replace mock email with real SMTP config; verify forwarding sales@brightluxx.com → sales@metroplusads.com.
- Add analytics events (CTA clicks, form submit) + basic dashboard.
- Media optimization pipeline: thumbnails, compression guidance, CDN-ready storage.
- Scraper integration into CMS (save selector profiles per supplier domain).
- Security/ops: rate limiting on forms, input validation, backups, env secrets.
- Final regression test suite + deployment runbook.

## 3) Next Actions
- You provide: supplier website links + existing Brightluxx/other site links for projects.
- Confirm: preferred hosting (VPS vs managed) and media storage choice (local vs S3-compatible).
- Confirm: WhatsApp CTA method (wa.me link vs Business API later).
- Approve: content schema (Technology/CaseStudy/Update/Resource fields) before coding.

## 4) Success Criteria
- POC: at least 2 supplier pages ingested end-to-end (scrape → AI copy → normalized JSON) with repeatable process.
- V1: public site ships with premium UI, fast navigation, and working lead capture stored + routed (mock then real).
- CMS: admin can publish/edit all key content types without developer help.
- Lead-gen: measurable CTA conversions, clear user journeys, and reliable email delivery once configured.
- Stability: no broken media, no broken routes, responsive across mobile/desktop, and regression checks pass.