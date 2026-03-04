# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium, visually dramatic showcase website for Brightluxx to serve as a primary lead generation tool and high-end marketing asset. The focus is a "specifier knowledge base" to attract and convert architects, consultants, and designers in the UAE/GCC region.

## Stack
- **Frontend:** React (CRA) with Tailwind-style CSS variables, Lucide icons, Recharts
- **Backend:** FastAPI (Python) with Motor (async MongoDB)
- **Database:** MongoDB
- **CDN:** Emergent Object Storage with Pillow-based on-the-fly image processing
- **PDF:** fpdf2 for dynamic spec pack generation
- **Email:** Gmail SMTP (webadmin@ihgind.com → sales@metroplusads.com)

## Theme
"Deep Space Modern" — charcoal background (#0B0B0B), glassmorphism panels, gold/amber accents (--blx-gold-3)

---

## Completed Features

### Phase 1 — Core Site
- Product catalog with categories, search, filtering
- Product detail pages with specs, gallery
- Inspirations gallery
- Project portfolio
- Contact form with lead capture
- Admin CMS (CRUD for products, inspirations, projects, leads)
- Admin authentication (JWT)

### Phase 2 — Knowledge Base & Authority Pages
- Knowledge Base index page (`/knowledge`)
- COB vs MiP vs SMD guide
- Pixel Pitch guide
- Brightness & Nits guide
- IP Rating guide
- Refresh Rate guide
- Reusable components: SpecifierAnswerBox, ComparisonTable, FAQSection, KnowledgeHero

### Phase 3 — Application Landing Pages & Latest Tech
- 8 application landing pages (Retail, Hospitality, Corporate, Healthcare, Education, Outdoor, Transport, Worship)
- Data-driven architecture with centralized `data/applications.js`
- 4 Latest Tech pages (Glasses-free 3D, MicroLED, Transparent LED, AI-Powered)
- For Architects & Consultants hub page

### Phase 4 — Analytics & Performance Monitoring
- Custom analytics event tracking (`/api/track`)
- Analytics dashboard in admin (`/admin/analytics`)
- Performance metrics dashboard (`/admin/performance`)
- Privacy-focused, no third-party trackers

### Phase 5 — PDF Spec Packs
- Dynamic PDF generation with fpdf2 (10 spec packs)
- Branded layouts with Brightluxx styling
- Available packs: pixel-pitch, cob-mip-smd, brightness-nits, ip-rating, refresh-rate, retail-hospitality, outdoor-dooh, corporate-control, healthcare-wayfinding, education-campus

### Phase 6 — Enhanced Screen Calculator (Completed Mar 4, 2026)
- Interactive specification tool at `/calculator`
- Inputs: application type, screen dimensions, viewing distance, content type, environment
- Outputs: pixel pitch recommendation, resolution, brightness, technology, cost estimate, power/HVAC, alternative options
- Visual scale preview
- WhatsApp integration with pre-filled results

### Phase 7 — Lead-Gated Content (Completed Mar 4, 2026)
- SpecPackCTA component with name, email, company, role fields
- Lead data captured to MongoDB before PDF download
- Used across calculator page, application landing pages, knowledge base

### Phase 8 — Email Notifications (Completed Mar 4, 2026)
- Gmail SMTP integration (webadmin@ihgind.com)
- All notifications sent to sales@metroplusads.com
- Triggered on: spec pack downloads, contact form submissions
- Branded HTML emails with lead details
- Non-blocking (fire-and-forget via asyncio.to_thread)

---

## Pending / Upcoming Tasks

### P3 — Product Comparison Tool
- Interactive side-by-side product comparison
- Select 2-4 products to compare specs

### P4 — BIM/CAD Downloads
- Add downloadable BIM/CAD/Revit objects to For Architects page

### P5 — Dynamic Sitemap
- `/sitemap.xml` endpoint for SEO

### P6 — Backend Refactoring
- Split large `admin.py` into smaller resource-specific modules

### P7 — E2E Test Suite
- Comprehensive Playwright test suite

---

## Key Endpoints
- `POST /api/specpacks/{pack_id}/download` — Lead-gated spec pack download
- `GET /api/specpacks/{pack_id}/file` — Serve PDF file
- `POST /api/leads` — Contact form submission
- `POST /api/track` — Analytics event tracking
- `GET /api/admin/analytics` — Analytics dashboard data
- `GET /api/admin/performance` — Performance dashboard data

## Admin Credentials
- URL: `/admin`
- Email: `admin@brightluxx.com`
- Password: `brightluxx2025`

## Email Configuration
- SMTP: smtp.gmail.com:587
- Sender: webadmin@ihgind.com
- Notifications: sales@metroplusads.com
- No direct customer emails from the site
