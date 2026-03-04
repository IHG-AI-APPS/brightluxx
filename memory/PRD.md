# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium, visually dramatic showcase website for Brightluxx to serve as a primary lead generation tool and high-end marketing asset. The focus is a "specifier knowledge base" to attract and convert architects, consultants, designers, AND contractors in the UAE/GCC region.

## Stack
- **Frontend:** React (CRA) with Tailwind-style CSS variables, Lucide icons, Recharts
- **Backend:** FastAPI (Python) with Motor (async MongoDB)
- **Database:** MongoDB
- **CDN:** Emergent Object Storage with Pillow-based on-the-fly image processing
- **PDF:** fpdf2/ReportLab for dynamic spec pack generation
- **Email:** Gmail SMTP (webadmin@ihgind.com → sales@metroplusads.com)

## Theme
"Deep Space Modern" — charcoal background (#0B0B0B), glassmorphism panels, gold/amber accents (--blx-gold-3)

## Target Audiences
1. **Architects & Consultants** — specifiers who need technical data, spec packs, BIM/CAD
2. **Contractors & Procurement** — value engineering, cost control, spec substitution, BOQ templates
3. **End Users** — hotel owners, mall operators, retailers seeking LED solutions

---

## Completed Features

### Phase 1-4 (Previous Sessions)
- Full product catalog, CMS, admin panel, JWT auth
- Inspirations gallery, project portfolio
- Contact form with email notification
- 5 original authority pages (COB vs MiP, Pixel Pitch, Brightness, IP Rating, Refresh Rate)
- 8 application landing pages
- 4 Latest Tech pages
- For Architects & Consultants hub
- Custom analytics & performance monitoring

### Phase 5 — PDF Spec Packs (Lead-Gated)
- 12 spec packs with dynamic PDF generation
- Lead capture form (name, email, company, role) before download

### Phase 6 — Enhanced Screen Calculator (Mar 4, 2026)
- Interactive specification tool at `/calculator`

### Phase 7 — Email Notifications (Mar 4, 2026)
- Gmail SMTP → sales@metroplusads.com for all lead events

### Phase 8 — Contractor Lead Generation (Mar 4, 2026)
- Value Engineering Hub (`/value-engineering`)
- 3 Contractor SEO Pages (`/contractors/:pageId`)
- Specification Substitution Service (`/spec-substitution`)

### Phase 9 — Content Expansion (Mar 4, 2026)
- **Processing & Calibration Guide** (`/knowledge/processing-calibration`) — video processing comparison, calibration workflow, CMS options
- **CMS for Multi-Site Guide** (`/knowledge/cms-multi-site`) — platform comparison, deployment architecture, UAE use cases
- **Budget Estimator** (`/budget-estimator`) — instant project cost estimates by size/pitch with line-item breakdown, power requirements, WhatsApp CTA
- **2 New Spec Packs** — Supermarket Promotions, Residential Cinema Wall (total: 12 packs)
- Knowledge Base index updated to show 7 guides

---

## Pending / Upcoming Tasks

### Phase C — Technical SEO & Assets
- (P1) **Dynamic sitemap.xml** — auto-generated from all routes
- (P2) **BIM/CAD Downloads** — Revit families, CAD blocks on For Architects page
- (P3) **Specifier Cheat Sheets** — 1-page downloadable PDFs

### Phase D — Platform
- (P4) **Product Comparison Tool enhancement** — improve existing compare page
- (P5) **Backend Refactoring** — Split large admin.py
- (P6) **E2E Test Suite** — Playwright tests

---

## Key Endpoints
- `POST /api/specpacks/{pack_id}/download` — Lead-gated spec pack download (12 packs)
- `GET /api/specpacks/{pack_id}/file` — Serve PDF file
- `POST /api/leads` — Contact form with email notification
- `POST /api/spec-substitution` — Spec substitution with file upload + email
- `POST /api/track` — Analytics event tracking
- `GET /api/admin/analytics` — Analytics dashboard data

## Admin Credentials
- URL: `/admin`
- Email: `admin@brightluxx.com`
- Password: `brightluxx2025`

## Email Configuration
- SMTP: smtp.gmail.com:587
- Sender: webadmin@ihgind.com
- Notifications: sales@metroplusads.com
