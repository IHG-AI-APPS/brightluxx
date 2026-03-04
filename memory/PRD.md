# Brightluxx — Digital LED Screen Technologies Showcase

## Original Problem Statement
Premium showcase website for Brightluxx, specializing in digital LED screen technologies. Strategy: become a specifier knowledge base + spec pack factory targeting architects/consultants/designers in UAE + GCC.

## User Personas
- **Architects/Interior Designers**: Specifying LED displays for projects
- **AV Consultants**: Recommending solutions with comparison data
- **Business Owners**: Looking for LED display solutions
- **Event Organizers**: Seeking rental LED panels

## Tech Stack
- **Frontend**: React 19 + Router + Tailwind + Shadcn/UI + Recharts
- **Backend**: FastAPI (Python)
- **Database**: MongoDB 7.0
- **CDN**: Emergent Object Storage + Pillow optimization
- **PDF**: ReportLab for branded spec packs

## What's Been Implemented

### Phase 1 — Core Site (Complete)
- [x] 14+ public pages + Admin CMS + JWT auth
- [x] Real images from brightluxx.com (CDN + blur-up lazy loading)
- [x] SEO meta tags + JSON-LD structured data
- [x] Analytics & Performance monitoring dashboards (27/27 tests)

### Phase 2 — Knowledge Base & GEO (Complete, March 4)
- [x] 5 Authority Pages: COB vs MiP vs SMD, Pixel Pitch, Brightness/Nits, IP Rating, Refresh Rate
- [x] KnowledgeBase.js reusable components
- [x] 10 Branded Spec Pack PDFs (ReportLab, email-gated)
- [x] FAQ JSON-LD + TechArticle JSON-LD (GEO optimization)
- [x] Testing: 100% pass (iteration_16)

### Phase 3 — Application Landing Pages (Complete, March 4)
- [x] **8 Application Landing Pages** (data-driven from applications.js):
  - Hospitality, Retail & Mall, Healthcare, Education, Corporate/Control Room, Outdoor DOOH, Supermarket, Residential
  - Each with: hero, mini spec table, 6 use cases, project gallery, UAE context, FAQ with schema, spec pack CTA, WhatsApp CTA
- [x] **Applications Index** (/applications) with 8 industry cards + hero images
- [x] **For Architects & Consultants Hub** (/for-architects):
  - 4 service cards (Spec Packs, Technical Guides, BIM/CAD, Design Assist)
  - 10 direct spec pack PDF downloads
  - Knowledge Base links
  - BIM/CAD request section (WhatsApp)
  - Design Assist call booking + CPD Lunch & Learn
- [x] JSON-LD schemas: FAQPage + Service on every page
- [x] Contextual WhatsApp CTAs per application
- [x] Testing: 100% pass (iteration_17)

### Admin Credentials
- URL: `/admin`, Email: `admin@brightluxx.com`, Password: `brightluxx2025`

## Prioritized Backlog

### P1 — Latest Tech Showcase Pages (Next)
- Glasses-free 3D signage, MicroLED Ultra Premium, MiP advancements, Stretch Signage (32:9)
- Each with: UAE context, "where this works", spec guidance

### P2 — Enhanced Lead Capture & Conversion
- Smart WhatsApp CTA (context-aware per page/product)
- "Get Budgetary Estimate" form (same-day response promise)
- "Book Design Assist Call" (15-min calendar integration)
- Real email notifications (SendGrid)

### P2 — Screen Calculator & Comparison Tools
- Interactive screen calculator
- Product comparison tool

### P3 — Backend & Infrastructure
- Modularize admin.py
- Dynamic sitemap.xml
- E2E test suite

## Key Pages
- `/knowledge` - Knowledge Base index (5 guides)
- `/knowledge/{guide}` - 5 authority pages
- `/applications` - Applications index (8 industries)
- `/applications/{id}` - 8 application landing pages
- `/for-architects` - Specifier hub page

## Mocked/Incomplete
- Lead/Quote submission saves to DB but does NOT send email notifications
