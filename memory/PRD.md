# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium, visually dramatic showcase website for Brightluxx to serve as a primary lead generation tool and high-end marketing asset. The focus is a "specifier knowledge base" to attract and convert architects, consultants, designers, AND contractors in the UAE/GCC region.

## Stack
- **Frontend:** React (CRA) with Tailwind-style CSS variables, Lucide icons, Recharts
- **Backend:** FastAPI (Python) with Motor (async MongoDB)
- **Database:** MongoDB
- **CDN:** Emergent Object Storage with Pillow-based on-the-fly image processing
- **PDF:** fpdf2 for dynamic spec pack generation
- **Email:** Gmail SMTP (webadmin@ihgind.com → sales@metroplusads.com)

## Theme
"Deep Space Modern" — charcoal background (#0B0B0B), glassmorphism panels, gold/amber accents (--blx-gold-3)

## Target Audiences
1. **Architects & Consultants** — specifiers who need technical data, spec packs, BIM/CAD
2. **Contractors & Procurement** — value engineering, cost control, spec substitution, BOQ templates
3. **End Users** — hotel owners, mall operators, retailers seeking LED solutions

---

## Completed Features

### Phase 1 — Core Site
- Product catalog with categories, search, filtering
- Product detail pages with specs, gallery
- Inspirations gallery
- Project portfolio
- Contact form with lead capture + email notification
- Admin CMS (CRUD for products, inspirations, projects, leads)
- Admin authentication (JWT)

### Phase 2 — Knowledge Base & Authority Pages
- Knowledge Base index page (`/knowledge`)
- COB vs MiP vs SMD guide
- Pixel Pitch guide
- Brightness & Nits guide
- IP Rating guide
- Refresh Rate guide

### Phase 3 — Application Landing Pages & Latest Tech
- 8 application landing pages (Retail, Hospitality, Corporate, Healthcare, Education, Outdoor, Transport, Worship)
- 4 Latest Tech pages (Glasses-free 3D, MicroLED, Transparent LED, AI-Powered)
- For Architects & Consultants hub page

### Phase 4 — Analytics & Performance Monitoring
- Custom analytics event tracking (`/api/track`)
- Admin dashboards for analytics and performance

### Phase 5 — PDF Spec Packs (Lead-Gated)
- Dynamic PDF generation with fpdf2 (10 spec packs)
- Lead capture form (name, email, company, role) before download
- Email notification to sales@metroplusads.com on download

### Phase 6 — Enhanced Screen Calculator (Completed Mar 4, 2026)
- Interactive specification tool at `/calculator`
- Instant pixel pitch, resolution, brightness, technology, cost, power/HVAC recommendations

### Phase 7 — Email Notifications (Completed Mar 4, 2026)
- Gmail SMTP integration (webadmin@ihgind.com → sales@metroplusads.com)
- Triggered on spec pack downloads and contact form submissions
- Non-blocking fire-and-forget pattern

### Phase 8 — Contractor Lead Generation (Completed Mar 4, 2026)
- **Value Engineering Hub** (`/value-engineering`) — substitution tables, cost guides, FAQ
- **3 Contractor SEO Pages** (`/contractors/:pageId`):
  - dvLED vs LCD comparison with 5-year TCO analysis
  - LED Cost per sqm UAE guide with pricing tables
  - LED Installation Guide with 5-phase checklists
- **Specification Substitution Service** (`/spec-substitution`) — upload form with file attachments, email notification, 24-hour response promise
- **Navbar updated** — Removed Inspirations from header (kept in footer)

---

## Pending / Upcoming Tasks

### Phase B — Content Expansion
- (P1) **2 New Authority pages** — Processing & Calibration guide, CMS for Multi-Site guide
- (P2) **2 New Spec Packs** — Supermarket promotions, Residential cinema wall
- (P3) **Budget Estimator Tool** — input size/pitch/indoor-outdoor → estimated cost range
- (P4) **Specifier Cheat Sheets** — 1-page PDFs (pixel pitch, brightness, COB vs MiP, outdoor checklist)

### Phase C — Technical SEO & Assets
- (P5) **BIM/CAD Downloads** — Revit families, CAD blocks on For Architects page
- (P6) **Dynamic sitemap.xml** — auto-generated from all routes
- (P7) **Enhanced structured data** — JSON-LD across all pages

### Phase D — Platform
- (P8) **Backend Refactoring** — Split large admin.py
- (P9) **E2E Test Suite** — Playwright tests

---

## Key Endpoints
- `POST /api/specpacks/{pack_id}/download` — Lead-gated spec pack download
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
- No direct customer emails from the site
