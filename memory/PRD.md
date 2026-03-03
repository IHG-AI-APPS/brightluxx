# Brightluxx — Digital LED Screen Showcase Website

## Problem Statement
Premium showcase website for Brightluxx, a company specializing in digital LED screen technologies. Primary goals: lead generation and high-end marketing.

## Core Requirements
- **Theme:** "Deep Space Modern" — deep charcoal (#0B0B0B), glassmorphism, LED pixel grid overlay, gold/amber gradient CTAs
- **Typography:** Satoshi / SF Pro with strict hierarchy
- **Pages:** Home, Products, Inspirations, Projects, Showroom, Contact
- **Tools:** Screen Calculator, Product Comparison
- **CMS:** Dynamic admin panel managing all content (Products, Inspirations, Projects, Leads) with media uploads
- **Security:** Rate-limiting, JWT auth, bcrypt password hashing

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, framer-motion, react-router-dom, axios
- **Backend:** FastAPI, Pydantic, Motor (async MongoDB), passlib, python-jose, Pillow
- **Database:** MongoDB (DB: brightluxx)

## Architecture
```
/app/backend/
├── server.py              # Slim entry point (58 lines): app, CORS, middleware, router includes
├── database.py            # MongoDB connection + collection references
├── models.py              # All Pydantic models
├── utils.py               # Helpers: serialize_doc, slugify, RateLimiter, get_client_ip
├── auth.py                # JWT config, token creation, get_current_admin dependency
├── routes/
│   ├── public.py          # Public routes (products, inspirations, projects, leads, search, calculator)
│   ├── admin.py           # Admin auth (login, refresh, me, change-password, stats)
│   ├── admin_crud.py      # Admin CRUD (products, inspirations, projects, leads, export/import)
│   └── upload.py          # File upload + image optimization
/app/frontend/src/
├── admin/                 # CMS admin panel components
├── pages/                 # Public-facing pages
├── components/            # Shared UI components
```

## Admin Credentials
- Email: admin@brightluxx.com
- Password: brightluxx2025

## What's Implemented (Complete)
- Full public website with all pages and tools
- 41 products across 17 categories
- 22 inspirations, 9 projects
- Screen Calculator and Product Comparison tools
- Complete CMS with CRUD for all content types
- JWT auth with access (4h) + refresh (7d) tokens
- Rate limiting (login: 5/min, leads: 10/min) with X-Forwarded-For support
- Password change with validation
- Image upload with server-side optimization (Pillow -> WebP variants)
- Security headers (X-Frame-Options, X-XSS-Protection, nosniff)
- Data import/export functionality
- Mobile responsive design
- **Backend refactored** from monolithic 837-line server.py into modular files (Feb 2026)

## What's Mocked
- Lead capture saves to DB only — no real email notification service

## Backlog (Prioritized)
- **P1:** Image CDN/Object Storage integration for scalable media delivery
- **P2:** Real email service (SendGrid/Resend) for lead notifications
- **P3:** Advanced analytics integration
