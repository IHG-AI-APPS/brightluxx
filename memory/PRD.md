# Brightluxx — Digital LED Screen Technologies Showcase

## Original Problem Statement
Premium showcase website for Brightluxx, a company specializing in digital LED screen technologies. Goals: lead generation, high-end marketing, and a fully dynamic CMS. Strategy pivoted to become a specifier knowledge base + spec pack factory targeting architects/consultants/designers in UAE + GCC.

## User Personas
- **Architects/Interior Designers**: Specifying LED displays for projects — need tech guidance, spec packs, BIM/CAD
- **AV Consultants**: Recommending solutions — need comparison data, vendor checklists
- **Business Owners/Marketers**: Looking for LED display solutions for their venues
- **Event Organizers**: Seeking rental LED panels for events
- **Government/Traffic**: Infrastructure & road signage needs

## Core Requirements
- **Theme**: "Deep Space Modern" — deep charcoal (#0B0B0B), Glassmorphism, LED pixel grid overlay, gold/amber CTA gradients
- **Typography**: Satoshi font with strict hierarchy
- **Pages**: Home, Products, Inspirations, Projects, Solutions, About Us, Contact, Showroom, Calculator, Compare, Tech Guide, Configurator, + Knowledge Base (5 authority pages)
- **CMS**: Full admin panel to manage all content
- **SEO/GEO**: FAQ schema, JSON-LD structured data, TechArticle schema — optimized for Google + AI search (ChatGPT/Perplexity/Gemini)
- **Lead Capture**: Email-gated spec pack downloads, quote forms, WhatsApp CTAs

## Tech Stack
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn/UI + Recharts
- **Backend**: FastAPI (Python)
- **Database**: MongoDB 7.0 (Motor async driver)
- **Image Processing**: Pillow for WebP optimization
- **Object Storage**: Emergent Object Storage (CDN)
- **PDF Generation**: ReportLab for branded spec pack PDFs

## Architecture
```
/app/
├── backend/
│   ├── server.py, database.py, auth.py, utils.py, storage.py
│   ├── specpack_generator.py   # Branded PDF generation
│   └── routes/
│       ├── admin.py, admin_crud.py, public.py
│       ├── cdn.py, analytics.py, upload.py
│       └── specpacks.py        # Spec pack download + lead capture
├── frontend/src/
│   ├── App.js, api.js, lib/tracker.js
│   ├── components/
│   │   ├── KnowledgeBase.js    # Reusable: SpecifierAnswerBox, ComparisonTable, FAQSection, SpecPackCTA, KnowledgeHero
│   │   ├── CdnImage.js, SEO.js, Navbar.js, Footer.js, StickyCTA.js
│   │   └── ui/                 # Shadcn components
│   ├── pages/
│   │   ├── knowledge/          # 5 authority pages + index
│   │   └── [14 other pages]
│   └── admin/                  # 10 admin panel components
```

## What's Been Implemented

### Phase 1 — Core Site (Complete)
- [x] Full public site with 14+ pages
- [x] Admin CMS panel with JWT auth
- [x] Real images from brightluxx.com
- [x] Image CDN + blur-up lazy loading
- [x] SEO meta tags + JSON-LD structured data
- [x] Analytics & Performance monitoring dashboards (27/27 tests)

### Phase 2 — Knowledge Base & GEO (Complete, March 4 2026)
- [x] **5 Authority Pages** with deep technical content:
  - COB vs MiP vs SMD comparison
  - Pixel Pitch Guide (formulas, application tables, cost analysis)
  - Brightness & Nits Guide (GCC-specific, thermal derating, solar orientation)
  - IP Rating & Front Serviceability Guide
  - Refresh Rate & Camera-Friendly Guide
- [x] **Knowledge Base Index** (/knowledge) with guide cards
- [x] **Reusable Components**: SpecifierAnswerBox, ComparisonTable, FAQSection, SpecPackCTA, KnowledgeHero
- [x] **10 Branded Spec Pack PDFs** generated server-side (ReportLab):
  - 5 technology guides + 5 application-specific packs
  - Professional dark-theme branding with gold accents
  - Tables, checklists, vendor questions, UAE/GCC guidance
- [x] **Email-Gated Downloads**: Lead captured to MongoDB before PDF served
- [x] **FAQ JSON-LD Schema** on all knowledge pages (GEO optimization)
- [x] **TechArticle JSON-LD** on key pages
- [x] **Navigation Updated**: "Knowledge" link in navbar with prefix-based active state
- [x] **WhatsApp CTAs**: Contextual pre-filled messages per page
- [x] **Testing**: 100% pass rate (iteration_16) — all backend + frontend tests passed

## Prioritized Backlog

### P1 — Application Landing Pages (Next)
- Hospitality, Retail/Mall, Healthcare, Education, Supermarket, Corporate/Control Room, Outdoor DOOH, Residential Cinema Wall
- Each with: hero visual, mini spec table, 3 project images, spec pack CTA, WhatsApp CTA

### P1 — "For Architects & Consultants" Hub Page
- Dedicated specifier hub: spec packs, CAD/BIM info, lunch & learn CTA

### P1 — Latest Tech Showcase Pages
- Glasses-free 3D, MicroLED Ultra Premium, MiP advancements, Stretch Signage

### P2 — Enhanced Lead Capture & Email
- Real email notifications (SendGrid) for lead/quote submissions
- Smart WhatsApp CTA with contextual pre-filled messages
- "Get Budgetary Estimate", "Book Design Assist Call"

### P2 — Screen Calculator & Comparison Tools
- Interactive screen calculator
- Product comparison tool

### P3 — Backend Refactoring & Infrastructure
- Modularize admin.py
- Dynamic sitemap.xml
- E2E test suite

## Key APIs
- `GET /api/specpacks` — List all 10 spec packs
- `POST /api/specpacks/{id}/download` — Lead capture + download URL
- `GET /api/specpacks/{id}/file` — Serve branded PDF
- `POST /api/track` — Analytics event tracking
- `GET /api/admin/analytics|performance` — Dashboard data
- `GET /api/cdn/{path}` — CDN image proxy

## DB Collections
- `products`, `projects`, `inspirations`, `leads`, `admins`
- `analytics_events`, `performance_metrics`

## Mocked/Incomplete
- Lead/Quote submission saves to DB but does NOT send email notifications
