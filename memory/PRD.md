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
- **Frontend**: React + React Router + Tailwind-style CSS variables + Shadcn/UI components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (Motor async driver)
- **Image Processing**: Pillow for WebP optimization
- **Web Scraping**: BeautifulSoup4 + WordPress REST API

## Architecture
```
/app/
├── backend/
│   ├── server.py          # FastAPI entry point (~60 lines)
│   ├── models.py          # Pydantic models
│   ├── database.py        # MongoDB connection
│   ├── security.py        # Auth, JWT, password hashing
│   ├── dependencies.py    # Rate limiter
│   ├── seed_data.py       # Initial data seeding
│   └── routes/
│       ├── admin.py       # CMS admin endpoints
│       ├── auth.py        # Auth endpoints
│       ├── public.py      # Public API endpoints
│       └── static.py      # Static file serving
├── frontend/
│   └── src/
│       ├── App.js         # Router (public + admin)
│       ├── pages/         # All public pages
│       ├── admin/         # Admin panel components
│       └── components/    # Shared components
└── frontend/public/uploads/ # Real images (WebP)
```

## What's Been Implemented

### Completed (as of March 2026)
- [x] Full public site: Home, Products, Inspirations, Projects, Contact, Showroom, Calculator, Compare, Tech Guide, Configurator
- [x] Solutions page with 8 solution categories
- [x] **Solution Detail Pages** (/solutions/:id) — 8 dedicated pages with hero, description, applications, benefits, featured project, recommended products, and cross-navigation
- [x] **Product Detail Pages** (/products/:slug) — Full product pages with image gallery, specs table, quote form, related products, WhatsApp CTA, and breadcrumb navigation
- [x] About Us page with company info, vision, mission, capabilities
- [x] Admin CMS panel (products, projects, inspirations, leads management)
- [x] JWT authentication with refresh tokens
- [x] Rate limiting on critical endpoints
- [x] Backend refactored from monolith to modular routes/models/utils
- [x] **Real image replacement**: All 100+ images downloaded from brightluxx.com WordPress media library, converted to WebP, mapped to all products (57), projects (26), and inspirations (22)
- [x] **Image CDN Integration**: All 194 images migrated to Emergent Object Storage. CDN endpoint (`/api/cdn/{path}`) with on-the-fly optimization (resize, quality, format conversion). Admin uploads go directly to cloud storage.
- [x] **Blur-up Lazy Loading**: CdnImage component with 78-byte blur placeholders, IntersectionObserver-based lazy loading, and smooth CSS opacity transitions. Applied to all 135 images across all pages.
- [x] Database seeded with real product data and project data from brightluxx.com

### Admin Credentials
- URL: `/admin`
- Username: `admin@brightluxx.com`
- Password: `brightluxx2025`

## Prioritized Backlog

### P1 — Next Up
- Real email notifications for lead capture (SendGrid integration)
- Further modularize admin.py route file by resource

### P3
- Advanced analytics integration (privacy-focused)
- SEO optimization (meta tags, Open Graph, structured data)

## Key APIs
- `GET /api/products?category=X` — Public product listing with optional category filter
- `GET /api/projects` — Public project listing
- `GET /api/inspirations` — Public inspirations
- `POST /api/contact` — Lead submission
- `POST /api/admin/login` — Admin authentication
- `CRUD /api/admin/products|projects|inspirations|leads` — Admin management

## DB Collections
- `products`: {name, category, product_code, pixel_pitch, brightness, image_url, gallery, specs, ...}
- `projects`: {title, sector, location, image_url, description, ...}
- `inspirations`: {title, description, image_url, category, ...}
- `leads`: {name, email, message, status, ...}
- `admins`: {username, hashed_password}
