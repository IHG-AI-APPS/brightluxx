# Brightluxx — Stabilization & Testing Plan

## Objectives
- Restore *complete* UX by wiring newly-added features into the app shell (routes + navigation) without changing the approved “Deep Space Modern” system.
- Deliver a working V1 core flow: **Browse Products → Compare → Calculate Screen → Contact/Lead**.
- Add minimal missing frontend pieces (Compare page + API helpers) and fix testability issues (test IDs).
- Validate end-to-end behavior with build checks, screenshots, and automated testing; fix regressions.

---

## Implementation Steps

### Phase 1 — Core Flow Wiring (P0 fixes, no new scope)
**User stories**
1. As a user, I can open the Screen Calculator from navigation and get a recommendation.
2. As a user, I can compare 2–4 product codes and view differences in a single page.
3. As a user, I can access the Technology Guide to understand COB/MiP/Transparent/Interactive.
4. As a user, I can browse products by category and search without broken filters.
5. As a user, I can request a quote from any tool/result state via Contact.

**Work items**
- **Routes (P0):** Update `frontend/src/App.js` to import and route:
  - `/calculator` → `ScreenCalculator`
  - `/compare` → new `Compare`
  - `/tech-guide` → `TechGuide`
- **Compare Page (P0):** Create `frontend/src/pages/Compare.js` (MVP):
  - Accept product codes (input + chips), enforce 2–4 selection
  - Call compare endpoint and render spec comparison table
  - Provide CTAs to Products and Contact
  - Add required `data-testid` hooks
- **Navbar (P0):** Add “Tools” links (Calculator, Compare, Tech Guide) in desktop + mobile menus.
- **API helpers (P1):** Extend `frontend/src/api.js` with:
  - `compareProducts(product_codes)`
  - `calculateScreenSize(payload)`
  - Keep existing exports stable
- **Test ID uniqueness (P1):** Fix duplicate `data-testid="products-filter-select"` in Products category buttons (e.g., `products-filter-<category>`), keep the existing one for the container if needed.
- **Quick sanity check:** Load each new route and confirm no console/runtime errors.

**Exit gate**
- Users can reach Calculator/Compare/Tech Guide from both URL and Navbar.
- Compare works with real backend data (2–4 codes), handles empty/error states.

---

### Phase 2 — V1 Stabilization Testing (build + visuals + automated)
**User stories**
1. As a user, I can refresh any page and routing still works (no blank screen).
2. As a user, I can use Products search and category filters reliably.
3. As a user, I can submit the calculator form multiple times and results update.
4. As a user, I can open/close product quick view and still scroll the page.
5. As a user, I can complete the lead form and receive a success response.

**Work items**
- **Build verification:** Run esbuild / frontend build to ensure no compile errors; address blocking warnings if they impact behavior.
- **Screenshots:** Capture key pages/states:
  - Home, Products (filtered + modal), Compare (2 products), Calculator (results), Tech Guide, Contact
- **Automated testing:** Run the testing agent for backend + frontend E2E coverage.
- **Bug fixing loop:** Triage and fix failures by severity:
  - P0: navigation/routes, broken API calls, crashes
  - P1: incorrect data rendering, missing states, a11y regressions
  - P2: minor styling inconsistencies

**Exit gate**
- One clean test run (or only non-blocking warnings) + all core pages render.

---

### Phase 3 — UX Polish & Final Verification (no feature creep)
**User stories**
1. As a user, I see consistent layout/typography across Tools pages.
2. As a user, I can use Compare on mobile without layout breaking.
3. As a user, I always have a clear next step (Products/Contact/WhatsApp).
4. As a user, loading and empty states look intentional (not broken).
5. As a user, the app feels fast (no unnecessary rerenders/spinners).

**Work items**
- **Consistency pass:** Ensure new pages use existing components/classes (`glass-panel`, `btn-gold`, `btn-glass`, `spec-table`, tokens).
- **Responsive pass:** Check key breakpoints for Compare and Calculator.
- **Final screenshots:** Re-capture all pages after fixes.

**Exit gate**
- Stable V1 user journey + consistent Deep Space Modern styling + final screenshots.

---

## Next Actions (Immediate)
1. Update `App.js` to add missing routes for Calculator/Compare/Tech Guide.
2. Implement `Compare.js` MVP page and wire to backend.
3. Add Navbar links for Tools.
4. Add API helper functions for calculator + compare.
5. Fix Products filter `data-testid` duplication.
6. Run build check, take screenshots, then run testing agent and fix findings.

---

## Success Criteria
- **Functional:**
  - `/calculator`, `/compare`, `/tech-guide` accessible and usable via Navbar.
  - Compare supports 2–4 product codes and renders a clear comparison.
  - Calculator returns recommendation + matching products without errors.
  - Products filtering/search + quick view modal still works.
- **Quality:**
  - Frontend build passes; no runtime crashes.
  - Automated tests pass (or only explicitly accepted non-blocking warnings).
  - All key interactive elements have stable, unique `data-testid`s.
- **UX:**
  - Consistent Deep Space Modern styling across new pages; responsive on mobile/desktop.
