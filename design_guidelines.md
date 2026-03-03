{
  "brand": {
    "name": "Brightluxx",
    "design_personality": [
      "monolithic luxury",
      "modern opulence",
      "cinematic tech showcase",
      "UAE B2B executive-grade",
      "visual-first / minimal copy"
    ],
    "north_star": "Feels like an Apple keynote meets a Rolls‑Royce configurator: black stage, gold metal accents, cinematic motion, minimal words."
  },
  "design_tokens": {
    "notes": [
      "Replace existing cyan/teal tokens in /frontend/src/index.css with the system below.",
      "Gold must be the ONLY accent color. No cyan/teal/emerald anywhere (including selection state).",
      "Gradients are allowed only as decorative overlays & major CTA surfaces; must not exceed 20% viewport.",
      "Prefer solid near-black surfaces + metallic gold borders for readability."
    ],
    "css_custom_properties": {
      "global": "/* Brightluxx Luxury Tokens (replace :root in /frontend/src/index.css) */\n:root {\n  /* --- Base --- */\n  --blx-bg: #0A0A0A; /* stage black */\n  --blx-bg-2: #0F0F0F; /* panels behind media */\n  --blx-bg-raised: #141414; /* raised surfaces */\n  --blx-panel: #121212;\n  --blx-panel-2: #171717;\n\n  /* --- Text --- */\n  --blx-text: #F5F5F5;\n  --blx-text-2: #D4C5B0; /* champagne secondary */\n  --blx-muted: #A39A8B; /* muted champagne */\n  --blx-placeholder: rgba(245,245,245,0.55);\n\n  /* --- Gold (match logo direction) --- */\n  --blx-gold-1: #B78E3A; /* deep gold */\n  --blx-gold-2: #C59F4A; /* mid gold */\n  --blx-gold-3: #E5C574; /* bright gold */\n  --blx-gold-4: #F0D78C; /* highlight */\n\n  /* HSL equivalents (for Tailwind-like utilities, rings, alpha) */\n  --blx-gold-1-hsl: 41 53% 47%;\n  --blx-gold-2-hsl: 43 51% 54%;\n  --blx-gold-3-hsl: 44 67% 67%;\n  --blx-gold-4-hsl: 44 77% 75%;\n\n  /* --- Semantic --- */\n  --blx-border: rgba(240,215,140,0.14);\n  --blx-border-2: rgba(240,215,140,0.22);\n  --blx-accent: var(--blx-gold-3);\n  --blx-accent-2: var(--blx-gold-4);\n  --blx-ring: rgba(240,215,140,0.40);\n  --blx-danger: #E35D5D;\n  --blx-success: #6FD39B;\n\n  /* --- Radii --- */\n  --blx-radius-sm: 10px;\n  --blx-radius-md: 14px;\n  --blx-radius-lg: 22px;\n  --blx-radius-xl: 30px;\n\n  /* --- Shadows (dark, premium depth) --- */\n  --blx-shadow-soft: 0 12px 40px rgba(0,0,0,0.55);\n  --blx-shadow-lift: 0 24px 80px rgba(0,0,0,0.70);\n\n  /* --- Metallic gradients (use sparingly) --- */\n  --blx-gold-grad: linear-gradient(135deg, var(--blx-gold-1) 0%, var(--blx-gold-2) 34%, var(--blx-gold-3) 68%, var(--blx-gold-4) 100%);\n  --blx-gold-sheen: linear-gradient(90deg, rgba(240,215,140,0) 0%, rgba(240,215,140,0.25) 45%, rgba(240,215,140,0) 100%);\n\n  /* --- Motion --- */\n  --blx-ease-out: cubic-bezier(0.16, 1, 0.3, 1);\n  --blx-ease-in: cubic-bezier(0.7, 0, 0.84, 0);\n  --blx-dur-1: 160ms;\n  --blx-dur-2: 240ms;\n  --blx-dur-3: 420ms;\n}\n\n/* Selection must be gold, not teal */\n::selection {\n  background: rgba(240,215,140,0.22);\n}\n\nbody {\n  background: var(--blx-bg);\n  color: var(--blx-text);\n}\n\n/* Luxury noise overlay utility (apply to large sections only) */\n.blx-noise::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0.06;\n  mix-blend-mode: overlay;\n  background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E');\n}\n"
    },
    "tailwind_mapping_guidance": {
      "backgrounds": [
        "bg-[var(--blx-bg)]",
        "bg-[var(--blx-panel)]",
        "bg-[color:rgba(18,18,18,0.68)] for glass panels"
      ],
      "text": [
        "text-[var(--blx-text)]",
        "text-[var(--blx-text-2)]"
      ],
      "borders_and_rings": [
        "border-[var(--blx-border)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--blx-ring)]"
      ]
    }
  },
  "typography": {
    "font_pairing": {
      "display": {
        "google_font": "Montserrat",
        "weights": ["500", "600", "700"],
        "usage": "Headlines, nav, key labels; geometric condensed feel matching logo."
      },
      "body": {
        "google_font": "Inter",
        "weights": ["300", "400", "500"],
        "usage": "Minimal copy, specs tables, form labels."
      },
      "fallback_stack": "Montserrat, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    },
    "implementation_note": "Update /frontend/src/index.css @import to Montserrat + Inter; keep .font-display assigned to Montserrat.",
    "type_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]",
      "h2": "text-base md:text-lg text-[var(--blx-text-2)] tracking-[0.02em]",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-[-0.02em]",
      "body": "text-sm sm:text-base leading-relaxed text-[var(--blx-text)]/90",
      "micro": "text-xs uppercase tracking-[0.24em] text-[var(--blx-muted)]"
    },
    "letter_spacing_rules": [
      "Headlines: slightly tighter (-0.03em to -0.01em)",
      "Micro labels: wide tracking (0.18em–0.28em) to feel luxury",
      "Avoid long paragraphs; max 2 lines per block in marketing sections"
    ]
  },
  "layout_and_grid": {
    "mobile_first": true,
    "container": {
      "max_width": "max-w-[1200px]",
      "padding": "px-4 sm:px-6 lg:px-10",
      "vertical_rhythm": "py-16 sm:py-24"
    },
    "grid_system": {
      "default": "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10",
      "hero": "full-bleed media with constrained overlay content",
      "bento_doors": "3 doors: grid-cols-1 md:grid-cols-3 gap-5 md:gap-6; each door min-h-[360px] md:min-h-[520px]"
    },
    "luxury_spacing": [
      "Use 2x whitespace vs typical SaaS.",
      "Prefer single focal element per viewport.",
      "Cards should be large; avoid dense multi-row grids."
    ]
  },
  "components": {
    "component_path": {
      "shadcn_primary": [
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/navigation-menu.jsx",
        "/app/frontend/src/components/ui/sheet.jsx",
        "/app/frontend/src/components/ui/dialog.jsx",
        "/app/frontend/src/components/ui/carousel.jsx",
        "/app/frontend/src/components/ui/aspect-ratio.jsx",
        "/app/frontend/src/components/ui/separator.jsx",
        "/app/frontend/src/components/ui/tabs.jsx",
        "/app/frontend/src/components/ui/table.jsx",
        "/app/frontend/src/components/ui/form.jsx",
        "/app/frontend/src/components/ui/input.jsx",
        "/app/frontend/src/components/ui/textarea.jsx",
        "/app/frontend/src/components/ui/sonner.jsx"
      ]
    },
    "button_system": {
      "variants": {
        "primary": {
          "look": "Gold metallic gradient pill-rectangle (radius 10–12px), subtle inner highlight, soft glow on hover",
          "tailwind": "relative rounded-[12px] px-5 py-3 font-semibold text-black bg-[image:var(--blx-gold-grad)] shadow-[0_14px_30px_rgba(0,0,0,0.55)]",
          "hover": "hover:brightness-[1.03] hover:shadow-[0_20px_44px_rgba(0,0,0,0.65)]",
          "active": "active:scale-[0.98]",
          "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blx-ring)] focus-visible:ring-offset-0",
          "micro": "Add ::after sheen sweep on hover (only on CTA buttons)."
        },
        "secondary_glass": {
          "look": "Black glass with 1px gold border; text in champagne",
          "tailwind": "rounded-[12px] px-5 py-3 bg-[rgba(18,18,18,0.55)] border border-[var(--blx-border-2)] text-[var(--blx-text)] backdrop-blur-md",
          "hover": "hover:border-[rgba(240,215,140,0.40)] hover:bg-[rgba(18,18,18,0.68)]"
        },
        "ghost": {
          "look": "Text-only luxury link with animated underline",
          "tailwind": "bg-transparent text-[var(--blx-text)] hover:text-[var(--blx-accent-2)]"
        }
      },
      "data_testid_examples": [
        "data-testid=\"hero-primary-cta-button\"",
        "data-testid=\"nav-contact-link\""
      ]
    },
    "navigation": {
      "desktop": "Sticky black glass bar (existing .sticky-nav) but change border + accents to gold; add subtle bottom gold hairline.",
      "mobile": "Use shadcn Sheet for menu; include WhatsApp CTA inside sheet.",
      "interaction": [
        "Active link: gold dot + hairline underline",
        "On scroll: nav background becomes slightly more opaque"
      ]
    },
    "card_system": {
      "media_card": {
        "look": "Video/image-led card with gold trim, hover lift, and spec overlay",
        "tailwind": "group relative overflow-hidden rounded-[22px] border border-[var(--blx-border)] bg-[rgba(18,18,18,0.55)] backdrop-blur-md shadow-[var(--blx-shadow-soft)]",
        "hover": "hover:border-[rgba(240,215,140,0.38)] hover:shadow-[var(--blx-shadow-lift)]",
        "overlay": "Use gradient overlay: from rgba(10,10,10,0) to rgba(10,10,10,0.86) for text legibility"
      }
    },
    "forms": {
      "look": "Minimal fields, generous spacing, gold focus ring, no heavy backgrounds",
      "input_tailwind": "bg-[rgba(10,10,10,0.55)] border border-[var(--blx-border)] text-[var(--blx-text)] placeholder:text-[var(--blx-placeholder)] rounded-[14px] focus-visible:ring-2 focus-visible:ring-[var(--blx-ring)]",
      "rules": [
        "No more than 5 fields on contact.",
        "Always include WhatsApp quick action.",
        "Add data-testid on each input + submit button + error text."
      ]
    },
    "tables_specs": {
      "approach": "Specs appear as overlay drawer/dialog over video; avoid long tables on page.",
      "use": ["shadcn Dialog", "shadcn Table"]
    }
  },
  "page_blueprints": {
    "home": {
      "hero": [
        "Full-viewport (min-h-screen) cinematic loop video (autoplay muted playsInline).",
        "Minimal overlay: H1 + one supporting line + 2 CTAs (Request Quote / WhatsApp).",
        "Add subtle gold X-burst motif as decorative SVG in corner (opacity 0.12)."
      ],
      "three_entry_doors": [
        "3 large door cards with video backgrounds: Technologies / Applications / Case Studies.",
        "On hover: gold trim intensifies + spec preview chips slide up."
      ],
      "trust_indicators": [
        "Ultra-minimal: 4–6 client logos in monochrome, plus a single line: 'Trusted by luxury venues across UAE'."
      ]
    },
    "technologies_hub": {
      "layout": "Bento of large media cards. Each opens detail page or dialog with specs.",
      "interaction": "Hover reveal (scrim + 3 bullet specs)."
    },
    "technologies_detail": {
      "layout": "Top: wide 21:9 video; below: 2-column (story beats + spec drawer trigger).",
      "cta": "Sticky right-side CTA on desktop; sticky bottom bar on mobile."
    },
    "applications_hub": {
      "layout": "Full-bleed section strips with environment video backgrounds (retail, real estate, events).",
      "copy": "Only headline + 1 line."
    },
    "case_studies": {
      "layout": "Video testimonial cards + before/after slider (optional).",
      "components": "Carousel for testimonials, Dialog for project walkthrough video."
    },
    "ise_updates": {
      "layout": "Video-first cards (poster frames + short title). Keep text minimal.",
      "filters": "Tabs: Launches / Events / Press"
    },
    "contact": {
      "layout": "Background video with dark scrim; form as glass panel.",
      "cta": "Two options: WhatsApp immediate + form for formal inquiry."
    }
  },
  "video_and_image_guidelines": {
    "video_formats": {
      "primary": "MP4 (H.264) for broad support; consider WebM (VP9) as optional additional source.",
      "poster": "Always provide poster JPG/WEBP (first frame) for LCP + reduced motion.",
      "attributes": "autoplay muted loop playsInline preload=metadata"
    },
    "aspect_ratios": {
      "hero": "21:9 preferred (cinematic). Fallback 16:9 on mobile.",
      "cards": "4:3 or 16:9 depending on section; keep consistent within a grid.",
      "detail_banner": "21:9 or 2.35:1"
    },
    "optimization_strategy": [
      "Use adaptive sources: serve 720p to mobile, 1080p to desktop; gate 4K behind user intent (play button).",
      "Lazy load below-the-fold videos; use IntersectionObserver to pause offscreen videos.",
      "Use short loops (3–8s) and avoid hard cuts; slow pans feel premium.",
      "Compress aggressively; target <2.5MB for hero on mobile; <6MB on desktop where possible.",
      "Use <video> with poster + skeleton; never block first paint."
    ],
    "reduced_motion": "Respect prefers-reduced-motion: disable autoplay and show poster with a Play button."
  },
  "motion": {
    "library": {
      "recommended": "framer-motion",
      "install": "npm i framer-motion",
      "usage_js_note": "Project uses .js files; import { motion } from 'framer-motion' in .js components."
    },
    "timing": {
      "durations": {
        "micro": "160–240ms",
        "section_reveal": "420–600ms",
        "page_transition": "260–420ms"
      },
      "easing": "Use var(--blx-ease-out) for entrances; avoid bouncy easings (not luxury)."
    },
    "patterns": [
      "Scroll reveal: opacity 0 -> 1 + translateY 16 -> 0 (stagger 60ms)",
      "Hover lift: translateY -4px, gold border alpha increase",
      "Gold sheen sweep: pseudo-element translateX across CTA (only on hover)"
    ],
    "hero_parallax": {
      "approach": "Subtle parallax on hero overlay + background video (very small movement).",
      "implementation_hint": "Use requestAnimationFrame + scrollY or framer-motion useScroll/useTransform; clamp to 12–18px movement."
    }
  },
  "luxury_signature": {
    "x_burst": {
      "description": "Create an SVG 'X' light-burst motif (radiating lines) used as decorative layer behind hero text and as loading indicator.",
      "rules": [
        "Opacity 0.08–0.18",
        "Glow only in gold; no neon colors",
        "Do not place behind long text blocks"
      ]
    },
    "textures": {
      "brushed_metal_usage": "Use brushed gold texture ONLY for small accent strips or masked overlays (<=20% viewport).",
      "implementation": "Use CSS mask-image or low-opacity background-image on CTA sheen or section edge dividers."
    }
  },
  "accessibility": {
    "wcag": "WCAG AA minimum",
    "contrast": [
      "Ensure champagne text (#D4C5B0) is used for secondary only and still meets AA on near-black.",
      "Gold text on black is okay for short labels; for paragraphs use off-white (#F5F5F5)."
    ],
    "keyboard": [
      "Visible focus: gold ring (2px) on all interactive elements.",
      "No focus traps in dialogs/sheets (shadcn handles this)."
    ],
    "motion": [
      "Provide prefers-reduced-motion fallback.",
      "Avoid autoplay audio; videos always muted by default."
    ],
    "media": [
      "All videos must have descriptive aria-label on play controls.",
      "All images require alt text; keep it factual and concise."
    ]
  },
  "performance": {
    "core_web_vitals_strategy": [
      "LCP: use poster image as LCP element; delay video decode until after first render.",
      "Use responsive poster (srcset) + fetchpriority=high for hero poster.",
      "Defer non-critical animations; avoid heavy blur on mobile (backdrop-filter is expensive).",
      "Use CSS containment on large sections; keep DOM light (minimal text helps)."
    ],
    "video_playback_management": [
      "Pause videos when not visible (IntersectionObserver).",
      "Use a single hero video element; reuse sources across pages where possible.",
      "On mobile: default to poster + tap-to-play for hero if bandwidth saver is enabled."
    ]
  },
  "image_urls": {
    "hero_background_stills": [
      {
        "url": "https://images.unsplash.com/photo-1698864551603-0f7aefaebeb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWQlMjBkaXNwbGF5JTIwd2FsbCUyMGRhcmslMjBpbnRlcmlvcnxlbnwwfHx8YmxhY2t8MTc3MjU1NzM1OXww&ixlib=rb-4.1.0&q=85",
        "category": "hero",
        "description": "Dark luxury interior still (use as hero poster / fallback image)."
      },
      {
        "url": "https://images.unsplash.com/photo-1664499549018-e33fa305904b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBsZWQlMjBkaXNwbGF5JTIwd2FsbCUyMGRhcmslMjBpbnRlcmlvcnxlbnwwfHx8YmxhY2t8MTc3MjU1NzM1OXww&ixlib=rb-4.1.0&q=85",
        "category": "case-studies",
        "description": "Moody room still for case study poster frames."
      }
    ],
    "brushed_gold_textures": [
      {
        "url": "https://images.unsplash.com/photo-1609953460401-51a477509804?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJ1c2hlZCUyMG1ldGFsJTIwdGV4dHVyZSUyMGNsb3NlJTIwdXB8ZW58MHx8fHllbGxvd3wxNzcyNTU3MzYwfDA&ixlib=rb-4.1.0&q=85",
        "category": "decorative",
        "description": "Brushed gold texture for masked accents (<=20% viewport)."
      },
      {
        "url": "https://images.unsplash.com/photo-1545873692-64145c8c42ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxnb2xkJTIwYnJ1c2hlZCUyMG1ldGFsJTIwdGV4dHVyZSUyMGNsb3NlJTIwdXB8ZW58MHx8fHllbGxvd3wxNzcyNTU3MzYwfDA&ixlib=rb-4.1.0&q=85",
        "category": "decorative",
        "description": "Gold textile/metal look for subtle grain overlays."
      }
    ]
  },
  "instructions_to_main_agent": {
    "global_retheme": [
      "In /frontend/src/index.css: replace existing :root tokens (remove teal accent, text-gradient, hero-glow, section-edge that use teal).",
      "Update font imports to Montserrat + Inter and set headings to Montserrat.",
      "In /frontend/src/App.css: update hero overlay gradient to black + subtle gold haze (no teal).",
      "Do NOT set .App text-align:center anywhere. Keep content left-aligned by default."
    ],
    "component_updates": [
      "Update shadcn Button styling to implement primary gold gradient and glass secondary (ensure no transition:all).",
      "Create utility classes: .blx-gold-border, .blx-sheen, .blx-glass-panel.",
      "Add X-burst SVG component (pure decorative) and a gold spinner loader variant."
    ],
    "data_testid_policy": [
      "All buttons/links/inputs/dialog triggers/carousel controls must include data-testid.",
      "Use kebab-case role-based names (e.g., data-testid=\"contact-form-submit-button\")."
    ],
    "recommended_libraries": [
      {
        "name": "framer-motion",
        "why": "Scroll reveals, stagger, page fades, premium motion.",
        "install": "npm i framer-motion"
      }
    ],
    "media_handling": [
      "Implement IntersectionObserver hook to pause offscreen videos.",
      "Provide reduced-motion fallback (poster + play button)."
    ]
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
