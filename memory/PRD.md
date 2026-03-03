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
├── pages/                 # Public pages (Home, Products, Solutions, About, etc.)
├── admin/                 # CMS admin panel
├── components/            # Shared UI components (Navbar, Footer, StickyCTA)
```

## Admin Credentials
- Email: admin@brightluxx.com
- Password: brightluxx2025

## What's Implemented (Complete)
- Full public website: Home, Products, Solutions (NEW), Inspirations, Projects, Showroom, About (NEW), Contact
- **57 products** across 19 categories (including road-signal, flexible, cob-microled)
- **26 real projects** from brightluxx.com (Nesto, Indian Pavilion Expo 2020, Division Nine, etc.)
- 22 inspirations
- Solutions page with 8 industry verticals (Retail, Corporate, Outdoor, Events, Creative, Traffic, Immersive, Transparent)
- About Us page (IHG Industry LLC, since 2012, Vision & Mission) — footer link only
- Screen Calculator and Product Comparison tools
- Complete CMS with CRUD for all content types
- JWT auth with access + refresh tokens, rate limiting, password change
- Image upload with server-side WebP optimization
- Security headers, data import/export
- Mobile responsive design
- Backend refactored into modular structure

## What's Mocked
- Lead capture saves to DB only — no real email notification service

## Backlog (Prioritized)
- **P1:** Image CDN/Object Storage for scalable media delivery
- **P2:** Real email service (SendGrid/Resend) for lead notifications
- **P3:** Advanced analytics integration
