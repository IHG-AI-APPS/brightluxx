# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium LED display showcase website for Brightluxx targeting architects, consultants, designers, and contractors in UAE/GCC. Focus on specifier knowledge base + lead generation. Strategy: "Specification Engine" dominating search for digital display technical and commercial queries.

## Stack
- **Frontend:** React (CRA), CSS variables, Lucide icons, Recharts, Playwright
- **Backend:** FastAPI, Motor (async MongoDB)
- **DB:** MongoDB | **CDN:** Emergent Object Storage + Pillow
- **PDF:** fpdf2 (spec packs), reportlab (cheat sheets, BIM refs)
- **Email:** Gmail SMTP → sales@metroplusads.com

## Theme: "Deep Space Modern" — #0B0B0B, glassmorphism, gold/amber

---

## Completed Features

### Core Site
- Product catalog (57 products), CMS, admin panel, JWT auth, analytics, contact form

### Knowledge Base (8 articles)
- COB vs MiP vs SMD, Pixel Pitch, Brightness, IP Rating, Refresh Rate, Processing & Calibration, CMS Multi-Site, SLA Gap Analysis

### Application Pages (8) + Latest Tech (4) + For Architects Hub

### Technology Pillar Pages (9)
- MicroLED, COB LED, MiP LED, Fine Pitch LED, All-in-One dvLED, Transparent LED, 3D Anamorphic LED, Creative LED, Media Facade

### Case Studies (8)
- 8 case studies across 6 verticals with JSON-LD

### CPD / Lunch & Learn Programme
- 6 session topics, booking form, email notifications

### SLA Gap Analysis Guide
- SLA tier comparison, 8 gaps, 28-item audit checklist

### Design Assist Service
- Free spec support for architects, booking form + email

### Digital Experience Architecture
- 6 application categories positioning Brightluxx for next-wave projects

### LinkedIn Landing Page
- Standalone specifier toolkit LP for ad campaigns

### Technology Selector Quiz
- Interactive 5-step quiz, rule-based scoring, lead-gated results

### Contractor Hub
- Value Engineering, 3 SEO Pages, Spec Substitution Service

### Tools (mega-menu)
- Screen Calculator, Budget Estimator, Product Comparison, CPD, Design Assist, Technology Selector

### Lead-Gated Downloads (20+ assets)
- 12 spec packs, 4 cheat sheets, 4 BIM references, SLA checklist

### Resource Library — 28+ resources

### Technical SEO & JSON-LD
- Dynamic sitemap (117+ URLs), structured data across all pages
- Email notifications (Gmail SMTP) for all lead events

### E2E Playwright Test Suite — Mar 4, 2026
- 66 tests across 5 test files, 100% pass rate
- **smoke.spec.js** (29): All 20 pages load, navbar links, Tools mega-menu
- **lead-capture.spec.js** (7): Contact, Design Assist, CPD, LinkedIn LP forms
- **technology-selector.spec.js** (4): Full quiz flow, lead gate unlock, back/restart
- **content-pages.spec.js** (20): 9 tech pages, 8 case studies, SLA guide, DEA, CPD
- **admin-and-api.spec.js** (6): Admin login, 5 API endpoints
- Run: `cd /app/frontend && npx playwright test`

---

## Remaining Tasks
- (P6) Tender Monitoring Integration

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
## Email: smtp.gmail.com:587 — webadmin@ihgind.com → sales@metroplusads.com
