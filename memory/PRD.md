# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium, visually dramatic showcase website for Brightluxx to serve as a primary lead generation tool and high-end marketing asset for architects, consultants, designers, and contractors in the UAE/GCC region.

## Stack
- **Frontend:** React (CRA), CSS variables, Lucide icons, Recharts
- **Backend:** FastAPI (Python), Motor (async MongoDB)
- **Database:** MongoDB
- **CDN:** Emergent Object Storage + Pillow
- **PDF:** fpdf2 (spec packs), reportlab (cheat sheets, BIM refs)
- **Email:** Gmail SMTP (webadmin@ihgind.com → sales@metroplusads.com)

## Theme
"Deep Space Modern" — #0B0B0B, glassmorphism, gold/amber accents

---

## Completed Features

### Core Site (Phase 1-4)
- Product catalog, CMS, admin panel, JWT auth
- Inspirations, projects, contact form
- 8 application landing pages, 4 Latest Tech pages
- Custom analytics & performance monitoring

### Knowledge Base (7 articles)
- COB vs MiP vs SMD, Pixel Pitch, Brightness & Nits, IP Rating, Refresh Rate
- Processing & Calibration (Phase 9), CMS for Multi-Site (Phase 9)

### Contractor Lead Generation (Phase 8)
- Value Engineering Hub, 3 Contractor SEO Pages, Spec Substitution Service

### Specifier Tools
- Screen Calculator, Budget Estimator, Product Comparison
- Tools mega-menu with grouped categories

### Lead-Gated Downloads
- 12 spec packs (fpdf2)
- 4 cheat sheets: pixel pitch, brightness, COB/MiP/SMD, outdoor checklist (reportlab)
- 4 BIM/CAD references: All-in-One dvLED, Fine-Pitch Wall, Outdoor Cabinet, Transparent Film (reportlab)

### Email Notifications (Phase 7)
- Gmail SMTP for all lead events → sales@metroplusads.com

### Technical SEO (Phase C — Mar 4, 2026)
- Dynamic `/api/sitemap.xml` (94 URLs, includes DB products)
- Lead-gated downloads: `/api/downloads/{type}/{id}/request` + `/api/downloads/{type}/{id}/file`
- For Architects page fully updated with BIM, cheat sheets, spec packs, design assist, CPD

---

## Pending / Upcoming Tasks

### Phase D — Platform & Polish
- (P1) **Backend Refactoring** — Split large admin.py
- (P2) **Enhanced structured data** — JSON-LD across all pages
- (P3) **E2E Test Suite** — Playwright tests

---

## Key Endpoints
| Endpoint | Method | Description |
|---|---|---|
| `/api/sitemap.xml` | GET | Dynamic XML sitemap |
| `/api/specpacks/{id}/download` | POST | Lead-gated spec pack |
| `/api/specpacks/{id}/file` | GET | Serve spec pack PDF |
| `/api/downloads/{type}/{id}/request` | POST | Lead-gated cheat sheet/BIM |
| `/api/downloads/{type}/{id}/file` | GET | Serve cheat sheet/BIM PDF |
| `/api/downloads/catalog` | GET | List all downloads |
| `/api/spec-substitution` | POST | Spec substitution + file upload |
| `/api/leads` | POST | Contact form |
| `/api/track` | POST | Analytics event |

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
