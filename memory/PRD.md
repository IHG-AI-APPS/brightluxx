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

### Viewing Distance Calculator — Mar 4, 2026
- Interactive tool at `/viewing-distance` with two modes:
  - "I know the Pixel Pitch" → calculates min/optimal/retina/max viewing distances
  - "I know the Viewing Distance" → recommends premium/recommended/budget pixel pitches
- Content type adjustment (Text/Mixed/Video) with multiplier
- Quick-select presets (Control Room, Boardroom, Corporate Lobby, etc.)
- Visual distance bar with color-coded zones
- Full reference table: all 13 pixel pitches with viewing distance ranges
- "How It Works" explainer cards
- 6 SEO-optimized FAQs with JSON-LD structured data
- Sidebar: Spec Pack CTA, Related Tools, Technical Guides, Design Assist CTA
- Added to Tools mega-menu in navbar, sitemap, and QuickInquiry form

### Power Consumption Estimator — Mar 4, 2026
- Interactive tool at `/power-estimator` for MEP engineers and specifiers
- Inputs: display size (W×H), pixel pitch (11 options), brightness %, hours/day, electricity rate (UAE/KSA/International)
- Outputs: max/avg power (kW), daily/monthly/annual kWh, running costs in local currency, CO2 emissions
- MEP specs: max current (A), breaker size, cable size, heat output (BTU/h & cooling tons)
- GCC Climate Note with HVAC guidance for extreme temperatures
- Full reference table: all pixel pitches with power consumption data
- Power-saving tips section and 6 SEO-optimized FAQs
- Added to Tools mega-menu in navbar, sitemap, and QuickInquiry form

### Installation Method Guide — Mar 4, 2026
- Comprehensive guide at `/installation-guide` covering 6 mounting methods:
  - Wall-Mounted (Surface), Recessed (Flush), Ceiling-Hung, Freestanding, Ground-Supported, Curved & Creative
- Each method: description, best-for applications, 6 technical specs, pros/cons, numbered installation sequence, GCC region note
- Accordion-style UI with quick nav buttons to jump between methods
- Comparison table: cost, complexity, aesthetics, best-for across all 6 methods
- Universal GCC considerations: Heat, Dust, Structural Standards, Maintenance
- Sidebar: Spec Pack CTA, Related Tools, Pre-Install Checklist (8 items), Site Support CTA
- 6 SEO-optimized FAQs with JSON-LD structured data
- Added to Tools mega-menu in navbar, sitemap, and QuickInquiry form

### Project Planner — Mar 4, 2026
- Multi-step wizard at `/project-planner` combining all specifier tools into one workflow
- 4 steps: Project basics → Dimensions → Usage → Results with PDF download
- Results: recommended pixel pitch, power requirements, installation method, budgetary estimate
- Lead-gated PDF: branded ReportLab PDF via `POST /api/project-planner/pdf`
- Added to Tools mega-menu and sitemap (priority 0.9)
- Testing: 59/59 tests passed (15 backend + 44 frontend)

### Sora 2 Hero Videos — Mar 4, 2026
- Two AI-generated 12-second hero videos using Sora 2 via Emergent LLM key (v2 — regenerated with cinematographer-level prompts)
  - Video 1: Cinematic aerial Dubai Marina at golden hour with Burj Khalifa, LED facade display on glass building, ARRI Alexa anamorphic lens style
  - Video 2: Photorealistic luxury Dubai mall interior with curved LED video wall, polished marble floors, elegant shoppers, brushed gold accents
- Prompts optimized with: specific camera equipment references, defined lighting logic, shallow depth of field, one subject/one camera move per clip
- HeroVideoPlayer component: crossfade transition between videos (800ms), poster image fallback
- Videos served from `/videos/hero-video-1.mp4` (7.6MB) and `/videos/hero-video-2.mp4` (7.9MB)
- Testing: 100% pass (11/11 backend, 21/21 frontend) — Iteration 37

### Enhanced AURA Chat Assistant — Mar 4, 2026
- Dynamic product knowledge: fetches all 57 products from MongoDB, auto-refreshes every 10 min
- Page-aware context: frontend sends current page URL; AURA tailors responses (28 page mappings)
- Expanded system prompt: all tools, services, case studies, DEA pages with internal links
- Quick action suggestion chips: 4 clickable buttons (Choose Pixel Pitch, Estimate Budget, Best Tech for Retail, Book Consultation)
- Clickable internal links: markdown [text](/path) rendered as gold links that navigate within the app
- GPT-5.2 badge in chat header
- Chat text exempt from global uppercase CSS rule
- Testing: 100% pass (12/12 backend, 20/20 frontend) — Iteration 36

### Site-wide UI/UX Consistency Audit — Mar 4, 2026
- Enforced `text-transform: uppercase` globally via `index.css` (body, body *)
- Removed 415 inline `textTransform: 'none'` overrides across 57 files
- Applied responsive fixes (flex-wrap, grid adjustments) to all tool pages
- Improved mobile typography: letter-spacing, readability adjustments
- Fixed mobile horizontal overflow on navbar menu
- Input/textarea/select elements excluded from uppercase via !important override
- Full regression tested: 100% pass (11/11 backend, 22/22 frontend) — Iteration 35

---

## Remaining Tasks
- (P1) Tender Monitoring Integration (ProTenders/MEED)
- (P2) Admin Dashboard V2 — unified lead management with analytics

## Admin: `/admin` — admin@brightluxx.com / brightluxx2025
