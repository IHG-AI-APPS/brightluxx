# Brightluxx — Digital LED Screen Technologies Showcase

## Original Problem Statement
Premium showcase website for Brightluxx, a company specializing in digital LED screen technologies. Goals: lead generation, high-end marketing, and a fully dynamic CMS.

## User Personas
- **Business Owners/Marketers**: Looking for LED display solutions for their venues
- **Event Organizers**: Seeking rental LED panels for events
- **Architects/Interior Designers**: Looking for creative LED installations
- **Government/Traffic**: Infrastructure & road signage needs

## Core Requirements
- **Theme**: "Deep Space Modern" — deep charcoal (#0B0B0B), Glassmorphism, LED pixel grid overlay, gold/amber CTA gradients
- **Typography**: Satoshi font with strict hierarchy
- **Pages**: Home, Products, Inspirations, Projects, Solutions (with detail pages), About Us, Contact, Showroom, Calculator, Compare, Tech Guide, Configurator
- **CMS**: Full admin panel to manage all content (products, projects, inspirations, leads)
- **Security**: Rate-limiting, JWT refresh tokens, secure auth
- **Images**: ALL real images from brightluxx.com WordPress site — NO AI-generated images

## Tech Stack
- **Frontend**: React 19 + React Router + Tailwind CSS variables + Shadcn/UI + Recharts
- **Backend**: FastAPI (Python)
- **Database**: MongoDB 7.0 (Motor async driver)
- **Image Processing**: Pillow for WebP optimization
- **Object Storage**: Emergent Object Storage (CDN)

## Architecture
```
/app/
├── backend/
│   ├── server.py          # FastAPI entry + perf middleware
│   ├── database.py        # MongoDB connection (7 collections)
│   ├── auth.py            # JWT auth + admin verification
│   ├── utils.py           # Helpers (serialize_doc, rate limiter)
│   ├── storage.py         # Emergent Object Storage utility
│   └── routes/
│       ├── admin.py       # Admin auth + CRUD
│       ├── admin_crud.py  # Extended admin CRUD ops
│       ├── public.py      # Public API endpoints
│       ├── cdn.py         # CDN image proxy with optimization
│       ├── analytics.py   # Event tracking + admin dashboards
│       └── upload.py      # File upload handling
├── frontend/src/
│   ├── App.js             # Router (public + admin)
│   ├── api.js             # Axios API client
│   ├── lib/tracker.js     # Privacy-focused analytics tracker
│   ├── components/
│   │   ├── CdnImage.js    # Lazy-loading blur-up image component
│   │   ├── SEO.js         # Meta tags + JSON-LD structured data
│   │   ├── Navbar.js, Footer.js, StickyCTA.js
│   │   └── ui/            # Shadcn components
│   ├── pages/             # 14 public pages
│   └── admin/             # 10 admin panel components
```

## What's Been Implemented

### Completed (as of March 4, 2026)
- [x] Full public site: Home, Products, Inspirations, Projects, Contact, Showroom, Calculator, Compare, Tech Guide, Configurator, About
- [x] Solutions page with 8 solution categories + detail pages
- [x] Product Detail Pages with gallery, specs, quote form, related products
- [x] Admin CMS panel (products, projects, inspirations, leads management)
- [x] JWT authentication with refresh tokens + rate limiting
- [x] Real images from brightluxx.com (100+ images, WebP format)
- [x] Image CDN Integration (Emergent Object Storage, on-the-fly optimization)
- [x] Blur-up Lazy Loading (CdnImage component with IntersectionObserver)
- [x] SEO Meta Tags & Open Graph (dynamic across all 14 pages)
- [x] JSON-LD Structured Data (Product, Organization, WebSite, ItemList, BreadcrumbList, LocalBusiness)
- [x] **Analytics & Performance Monitoring** — Custom privacy-focused event tracking system:
  - Frontend tracker (sendBeacon with Blob) auto-tracks page views on all pages via SEO component
  - Tracks: page_view, product_view, cta_click, quote_request events
  - Performance middleware records response times for all /api/ endpoints
  - Admin Analytics Dashboard: page views, unique visitors, top pages, top products, device breakdown, referrers, CTA clicks, lead funnel
  - Admin Performance Dashboard: total requests, avg/p95 response times, endpoint table, status codes, slowest endpoints, system health
  - Period selectors (7d/14d/30d for analytics, 1d/3d/7d for performance)
  - **Tested**: 27/27 backend tests passed, all frontend rendering verified

### Admin Credentials
- URL: `/admin`
- Username: `admin@brightluxx.com`
- Password: `brightluxx2025`

## Prioritized Backlog

### P1 — Next Up
- Real email notifications for lead capture (SendGrid integration)
- Screen Calculator Tool (interactive calculator feature)
- Product Comparison Tool (side-by-side comparison)

### P2
- Further modularize admin.py route file by resource
- Dynamic sitemap.xml endpoint for SEO

### P3
- E2E test suite (Playwright/Cypress)
- Web scraping robustness improvements

## Key APIs
- `GET /api/products?category=X` — Public product listing
- `GET /api/products/:slug` — Product detail
- `GET /api/projects`, `GET /api/inspirations` — Public listings
- `POST /api/leads` — Lead submission
- `POST /api/admin/login` — Admin authentication
- `CRUD /api/admin/products|projects|inspirations|leads` — Admin management
- `GET /api/cdn/{path}` — CDN image proxy with optimization
- `POST /api/track` — Public analytics event tracking
- `GET /api/admin/analytics` — Analytics dashboard data (auth required)
- `GET /api/admin/performance` — Performance dashboard data (auth required)
- `GET /api/health` — System health check

## DB Collections
- `products`: {name, category, product_code, pixel_pitch, brightness, image_url, gallery, specs, ...}
- `projects`: {title, sector, location, image_url, description, ...}
- `inspirations`: {title, description, image_url, category, ...}
- `leads`: {name, email, message, status, source, ...}
- `admins`: {id, email, password, name, role, created_at}
- `analytics_events`: {event, page, referrer, product_slug, category, session_id, screen_width, ip_hash, ua_short, ts}
- `performance_metrics`: {endpoint, response_time_ms, status_code, ts}

## Mocked/Incomplete
- Lead/Quote submission saves to DB but does NOT send email notifications (planned: SendGrid integration)
