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

### Knowledge Base (8 articles)
- COB vs MiP vs SMD, Pixel Pitch, Brightness, IP Rating, Refresh Rate, Processing & Calibration, CMS Multi-Site, SLA Gap Analysis

### Application Pages (8) + Latest Tech (4) + For Architects Hub

### Technology Pillar Pages (9) — Mar 4, 2026
- MicroLED, COB LED, MiP LED, Fine Pitch LED, All-in-One dvLED, Transparent LED, 3D Anamorphic LED, Creative LED, Media Facade

### Case Studies Section (8) — Mar 4, 2026
- 8 case studies across 6 verticals with JSON-LD (CollectionPage + Article schema)

### CPD / Lunch & Learn Programme — Mar 4, 2026
- 6 session topics, booking form, email notifications, JSON-LD (EducationalOrganization)

### SLA Gap Analysis Guide — Mar 4, 2026
- SLA tier comparison, 8 gaps with fixes, 28-item audit checklist, JSON-LD (TechArticle)

### Design Assist Service — Mar 4, 2026
- Free specification support for architects/consultants (/design-assist)
- 6 service types, 4-step process, firm type targeting (4 specifier categories)
- Booking form with lead capture + email notifications via Gmail SMTP
- JSON-LD (Service schema), linked from Tools mega-menu

### Digital Experience Architecture — Mar 4, 2026
- Positioning page for next-wave LED-in-architecture trend (/digital-experience-architecture)
- 6 application categories: Media Facades, Immersive Rooms, Retail Experiential, Corporate Experience, Digital Wayfinding, 3D Anamorphic
- Each with spec tables, project lists, and Design Assist CTAs
- JSON-LD (Article schema)

### LinkedIn Landing Page — Mar 4, 2026
- Specifier Toolkit lead capture LP (/lp/specifier-toolkit)
- Standalone (no navbar/footer) for ad campaigns
- 7 toolkit items, lead form posting to /api/leads
- Post-submit: direct links to Calculator, Resources, Spec Packs

### Contractor Hub
- Value Engineering, 3 Contractor SEO Pages, Spec Substitution Service

### Tools (with mega-menu)
- Screen Calculator, Budget Estimator, Product Comparison, CPD Programme, Design Assist

### Lead-Gated Downloads (20+ assets)
- 12 spec packs, 4 cheat sheets, 4 BIM references, SLA checklist

### Resource Library
- Searchable/filterable hub page (/resources) with 28+ resources

### Technical SEO & JSON-LD
- Dynamic /api/sitemap.xml with 115+ URLs
- JSON-LD structured data: Organization, WebSite, Service, Article, TechArticle, CollectionPage, EducationalOrganization, Product
- Email notifications (Gmail SMTP) for all lead events

---

## Remaining Tasks
- (P5) E2E Playwright Test Suite
- (P6) Tender Monitoring Integration

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
