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
- Product catalog (57 products), CMS, admin panel, JWT auth, analytics, contact form

### Knowledge Base (7 articles)
- COB vs MiP vs SMD, Pixel Pitch, Brightness, IP Rating, Refresh Rate, Processing & Calibration, CMS Multi-Site

### Application Pages (8) + Latest Tech (4) + For Architects Hub

### Technology Pillar Pages (9) — Mar 4, 2026
- Technology Hub index page (/technology) with 9 tech cards
- MicroLED, COB LED, MiP LED, Fine Pitch LED, All-in-One dvLED, Transparent LED, 3D Anamorphic LED, Creative LED, Media Facade
- Each page: spec tables, comparison charts, use cases, FAQs, spec pack CTA, related technologies sidebar

### Case Studies Section (8) — Mar 4, 2026
- Index page (/case-studies) with category filters (Hospitality, Retail, Corporate, Transport, Entertainment, Healthcare)
- 8 detailed case studies with challenge/solution/results format, spec tables, technology links

### CPD / Lunch & Learn Programme — Mar 4, 2026
- Landing page (/cpd-programme) with 6 specialist session topics
- Booking form with lead capture (name, email, company, role, topic, format, group size, date)
- Backend API (POST /api/cpd/request) with email notifications via Gmail SMTP
- Linked from Tools mega-menu in navbar
- Stats, How It Works, Programme Formats, Why Attend sidebar, Coverage Area

### Contractor Hub
- Value Engineering, 3 Contractor SEO Pages, Spec Substitution Service

### Tools (with mega-menu)
- Screen Calculator, Budget Estimator, Product Comparison, CPD Programme

### Lead-Gated Downloads (20 assets)
- 12 spec packs, 4 cheat sheets, 4 BIM references

### Resource Library
- Searchable/filterable hub page (/resources) with all 27 resources

### Technical SEO
- Dynamic /api/sitemap.xml with 110+ URLs
- Email notifications (Gmail SMTP) for all lead events

---

## Remaining Tasks
- (P4) SLA Gap Analysis
- (P5) E2E Playwright Test Suite
- (P6) Tender Monitoring Integration
- (P7) Enhanced JSON-LD structured data across all pages

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
