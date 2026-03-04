# Brightluxx — Product Requirements Document

## Original Problem Statement
Build a premium LED display showcase website for Brightluxx targeting architects, consultants, designers, and contractors in UAE/GCC. Focus on specifier knowledge base + lead generation. Strategy: "Specification Engine" dominating search for digital display technical and commercial queries.

## Stack
- **Frontend:** React (CRA), CSS variables, Lucide icons, Recharts, Playwright
- **Backend:** FastAPI, Motor (async MongoDB), emergentintegrations (GPT-5.2)
- **DB:** MongoDB | **CDN:** Emergent Object Storage + Pillow
- **PDF:** fpdf2 (spec packs), reportlab (cheat sheets, BIM refs)
- **Email:** Gmail SMTP → sales@metroplusads.com
- **AI:** OpenAI GPT-5.2 via emergentintegrations for AURA chat

## Theme: "Deep Space Modern" — #0B0B0B, glassmorphism, gold/amber

---

## Completed Features

### Core Site
- Product catalog (57 products), CMS, admin panel, JWT auth, analytics, contact form

### Knowledge Base (8 articles) + Application Pages (8) + Latest Tech (4)

### Technology Pillar Pages (9) + For Architects Hub

### Case Studies (8) — 6 verticals with JSON-LD

### CPD / Lunch & Learn Programme — 6 sessions, booking form

### SLA Gap Analysis Guide — tier comparison, 8 gaps, 28-item checklist

### Design Assist Service — free spec support, booking form + email

### Digital Experience Architecture — 6 app categories, positioning page

### LinkedIn Landing Page — standalone specifier toolkit LP

### Technology Selector Quiz — 5-step quiz, rule-based scoring, lead-gated

### AURA Chat Assistant — Mar 4, 2026
- AI-powered floating chat widget on ALL pages (GPT-5.2)
- Custom AI-generated golden orb avatar
- Expert LED specification advice using comprehensive system prompt
- Session-based conversation history (MongoDB)
- Lead capture after 3+ messages (soft gate with skip option)
- Email notifications on lead capture
- Knowledge of all technologies, case studies, specs, and services

### Contractor Hub — Value Engineering, SEO Pages, Spec Substitution

### Tools (mega-menu) — Calculator, Estimator, Comparison, CPD, Design Assist, Technology Selector

### E2E Test Suite — 66 Playwright tests + pytest backend tests

### Technical SEO — 117+ URL sitemap, JSON-LD, Gmail SMTP notifications

### UI/UX Polish — Mar 4, 2026
- Removed "Made with Emergent" badge
- Removed "Contact" nav link; header: Products, Solutions, Technologies, Case Studies, Tools, Resources, Get Quote
- Added floating WhatsApp button (971559954274) stacked with AURA chat icon (desktop)
- Added sticky mobile CTA bar with WhatsApp + Get Quote (mobile only, with safe-area support)
- Desktop: floating buttons bottom-right; Mobile: sticky bar at bottom — no duplication
- Quick Inquiry floating form: appears after 30% scroll on product, solution, technology, and application pages
  - Auto-fills page context (e.g., "MicroLED technology"), submits to `/api/quick-inquiry`
  - Saves lead to MongoDB + sends email notification
  - Dismissible per-page via sessionStorage
- Updated E2E smoke test to match current nav structure (22/22 pass)

### Exit-Intent Popup — Mar 4, 2026
- "Free Site Visit & Quote" popup triggered when desktop users move cursor to leave
- 8-second delay before activation to avoid annoying early visitors
- Form: Name, Company, Work Email, Phone/WhatsApp, Project Brief
- Backend `POST /api/site-visit-request` saves lead + sends email notification
- Once per session (sessionStorage), dismissible via close or backdrop click

### P1: Digital Experience Detail Pages — Mar 4, 2026
- **Media Facades** (`/digital-experience/media-facades`) — 5 FAQs, 6 specs, 6 applications, 6 design considerations, GCC context
- **Immersive LED Rooms** (`/digital-experience/immersive-led-rooms`) — 5 FAQs, 6 specs, 6 applications, 6 design considerations, GCC context
- **Retail Experiential Screens** (`/digital-experience/retail-experiential-screens`) — 5 FAQs, 6 specs, 6 applications, 6 design considerations, GCC context
- Shared component `DeaPageDetail.js` with data-driven rendering from `deaPages.js`
- Each page: hero with background image, overview, tech specs, applications grid, gallery, GCC market context, design considerations, FAQ accordion, bottom CTA, sidebar (Specifier Tools, Design Assist CTA, related pages, related technologies)
- Linked from Digital Experience Architecture overview page ("Full Guide" buttons)
- Added to sitemap.xml (3 new URLs)
- WhatsApp number updated site-wide to 971559954274 (24 files)
- JSON-LD structured data for SEO on each page
- QuickInquiry scroll-triggered form on all detail pages

---

## Remaining Tasks
- (P2) Enhance Specifier Toolkit: viewing distance calculator, installation diagrams, power consumption estimators
- (P3) Tender Monitoring Integration (ProTenders/MEED)

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
