# Brightluxx — Digital LED Screen Showcase Website

## Problem Statement
Premium showcase website for Brightluxx, a company specializing in digital LED screen technologies. Primary goals: lead generation and high-end marketing.

## Core Requirements
- **Theme:** "Deep Space Modern" — deep charcoal (#0B0B0B), glassmorphism, LED pixel grid overlay, gold/amber gradient CTAs
- **Typography:** Satoshi / SF Pro with strict hierarchy
- **Pages:** Home, Products, Solutions, Inspirations, Projects, Showroom, About, Contact
- **Tools:** Screen Calculator, Product Comparison, Technology Guide
- **CMS:** Dynamic admin panel managing all content with media uploads
- **Security:** Rate-limiting, JWT auth, bcrypt password hashing
- **Images:** All images self-hosted locally with WebP optimization — zero external URL dependencies

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, framer-motion, react-router-dom, axios
- **Backend:** FastAPI, Pydantic, Motor (async MongoDB), passlib, python-jose, Pillow
- **Database:** MongoDB (DB: brightluxx)

## Architecture
```
/app/backend/
├── server.py              # Slim entry point (58 lines)
├── database.py            # MongoDB connection + collections
├── models.py              # All Pydantic models
├── utils.py               # Helpers: serialize_doc, slugify, RateLimiter
├── auth.py                # JWT config, token creation, auth dependency
├── routes/
│   ├── public.py          # Public API routes
│   ├── admin.py           # Admin auth routes
│   ├── admin_crud.py      # Admin CRUD routes
│   └── upload.py          # File upload + image optimization
/app/frontend/src/
├── pages/                 # Public pages
├── admin/                 # CMS admin panel
├── components/            # Shared UI components
/app/frontend/public/uploads/ # All self-hosted images (WebP optimized)
```

## Admin Credentials
- Email: admin@brightluxx.com
- Password: brightluxx2025

## What's Implemented (Complete)
- Full public website with all pages
- **57 products** across 19 categories — all with local WebP images
- **26 real projects** from brightluxx.com — all with local images
- **22 inspirations** — all with local images
- Solutions page (8 industry verticals)
- About Us page (IHG Industry LLC, since 2012)
- Screen Calculator and Product Comparison tools
- Complete CMS with CRUD + media uploads
- JWT auth, rate limiting, password change, security headers
- Image upload with server-side WebP optimization (Pillow)
- Mobile responsive design
- Backend modular architecture

## What's Mocked
- Lead capture saves to DB only — no real email notification service

## Backlog (Prioritized)
- **P1:** Real email service (SendGrid/Resend) for lead notifications
- **P2:** Image CDN for production scalability
- **P3:** Advanced analytics integration
