# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium LED display showcase website for Brightluxx targeting architects, consultants, designers, and contractors in UAE/GCC. Focus on specifier knowledge base + lead generation.

## Stack
- **Frontend:** React (CRA), CSS variables, Lucide icons, Recharts
- **Backend:** FastAPI, Motor (async MongoDB)
- **DB:** MongoDB | **CDN:** Emergent Object Storage + Pillow
- **PDF:** fpdf2 (spec packs), reportlab (cheat sheets, BIM refs)
- **Email:** Gmail SMTP → sales@metroplusads.com

## Theme: "Deep Space Modern" — #0B0B0B, glassmorphism, gold/amber

---

## Completed Features (All Phases)

### Core Site
- Product catalog, CMS, admin panel, JWT auth, analytics, contact form

### Knowledge Base (7 articles)
- COB vs MiP vs SMD, Pixel Pitch, Brightness, IP Rating, Refresh Rate, Processing & Calibration, CMS Multi-Site

### Application Pages (8) + Latest Tech (4) + For Architects Hub

### Contractor Hub
- Value Engineering, 3 Contractor SEO Pages, Spec Substitution Service

### Tools (with mega-menu)
- Screen Calculator, Budget Estimator, Product Comparison

### Lead-Gated Downloads (20 assets)
- 12 spec packs, 4 cheat sheets, 4 BIM references

### Resource Library (Mar 4, 2026)
- Searchable/filterable hub page (`/resources`) with all 27 resources
- Category filters: Spec Packs (12), Cheat Sheets (4), BIM/CAD (4), Knowledge Base (7)
- Search by title, description, and tags
- Added "Resources" to navbar

### Technical SEO
- Dynamic `/api/sitemap.xml` with 94+ URLs
- Email notifications (Gmail SMTP) for all lead events

---

## Remaining Tasks
- (P1) Enhanced JSON-LD structured data across all pages
- (P2) E2E Playwright test suite
- (P3) CPD/Lunch & Learn booking form
- (P4) LinkedIn ad landing pages

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
