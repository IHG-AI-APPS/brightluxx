# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium LED display showcase website for Brightluxx targeting architects, consultants, designers, and contractors in UAE/GCC. Focus on specifier knowledge base + lead generation. Strategy: "Specification Engine" dominating search for digital display technical and commercial queries.

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

### Technology Pillar Pages (9) — Mar 4, 2026
- Technology Hub index page (/technology) with 9 tech cards
- Individual technology pages: MicroLED, COB LED, MiP LED, Fine Pitch LED, All-in-One dvLED, Transparent LED, 3D Anamorphic LED, Creative LED, Media Facade
- Each page includes: spec tables, comparison charts, use cases, FAQs, spec pack CTA, related technologies sidebar
- Navbar "Technologies" link with active state highlighting

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
- (P1) Product Comparison Tool — interactive compare feature linked from Tools mega-menu
- (P2) Case Studies Section — project examples for verticals (Retail, Hospitality, Corporate, etc.)
- (P3) CPD / Lunch & Learn Program Page
- (P4) SLA Gap Analysis
- (P5) E2E Playwright Test Suite
- (P6) Tender Monitoring Integration
- (P7) Enhanced JSON-LD structured data across all pages

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
