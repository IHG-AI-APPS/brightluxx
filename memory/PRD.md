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
/app/backend/server.py       — Main API (auth, CRUD, uploads, security)
/app/frontend/src/admin/     — CMS admin panel components
/app/frontend/src/pages/     — Public-facing pages
/app/frontend/src/components/ — Shared UI components
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
- Image upload with server-side optimization (Pillow → WebP variants)
- Security headers (X-Frame-Options, X-XSS-Protection, nosniff)
- Data import/export functionality
- Mobile responsive design

## What's Mocked
- Lead capture saves to DB only — no real email notification service

## Backlog (Prioritized)
- **P1:** Image CDN/Object Storage integration for scalable media delivery
- **P2:** Real email service (SendGrid/Resend) for lead notifications
- **P3:** Advanced analytics integration
- **P3:** Server.py refactoring (split into routes, models, utils)
