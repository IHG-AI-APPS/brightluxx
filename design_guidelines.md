{
  "brand": {
    "name": "Brightluxx",
    "positioning": {
      "archetype": "Premium OEM LED display technology partner (UAE-first).",
      "tone": [
        "benefit-led",
        "confident",
        "technical-but-scannable",
        "minimal",
        "premium product-launch energy"
      ],
      "north_star": "Feel like an Apple/Samsung product reveal, not an industrial catalog. Every scroll answers: what it is, why it matters, and how to book a demo today.",
      "primary_success_actions": [
        "Book a demo",
        "WhatsApp inquiry",
        "Request quote/spec consult",
        "Gated download lead capture"
      ]
    },
    "uae_trust_story": {
      "must_include_everywhere": [
        "Heat/dust readiness and outdoor reliability",
        "Local response / SLA phrasing",
        "UAE install proof (logos, locations, metrics)",
        "Certifications (use card row + badges)"
      ],
      "copy_snippets": [
        "Built for UAE heat. Tuned for maximum nits.",
        "OEM-grade engineering. UAE-ready delivery.",
        "From pitch to install—fast, local, accountable."
      ]
    }
  },
  "visual_personality": {
    "style_fusion": {
      "layout": "Samsung Newsroom-style big, cinematic sections + Absen-style segmentation (Applications/Technologies) + Barco-style spec credibility.",
      "surface_language": "Dark matte ‘graphite’ panels, minimal borders, soft elevation, and controlled glow accents (cyan/emerald).",
      "signature_motif": "‘Pixel grid’ micro-pattern and subtle scanline/noise overlay used sparingly (5–10% opacity).",
      "avoid": [
        "catalog grids with dense cards",
        "busy gradients",
        "neon cyberpunk",
        "purple accents"
      ]
    },
    "iconography": {
      "library": "lucide-react (already installed per rules).",
      "stroke": "1.5–2px",
      "usage": "Icons only for quick scanning: specs, benefits, trust. No emoji icons."
    }
  },
  "color_system": {
    "mode": "dark-first (default)",
    "palette": {
      "bg": {
        "base": "#0B0D10",
        "raised": "#11141A",
        "panel": "#151A22",
        "border": "rgba(255,255,255,0.08)"
      },
      "text": {
        "primary": "#F5F7FB",
        "secondary": "#B8C0CC",
        "muted": "#7E8796",
        "on_accent": "#071014"
      },
      "accent": {
        "primary": "#00D4AA",
        "primary_2": "#36C6FF",
        "success": "#10B981",
        "warning": "#F6C177",
        "danger": "#F87171"
      },
      "focus_ring": "rgba(54,198,255,0.45)",
      "shadow": {
        "soft": "0 10px 30px rgba(0,0,0,0.35)",
        "lift": "0 20px 60px rgba(0,0,0,0.55)"
      }
    },
    "gradients": {
      "rules": {
        "max_viewport_coverage": "20%",
        "usage_only": [
          "hero background overlays",
          "section decorative halos",
          "large CTA background only"
        ],
        "never": [
          "text-heavy areas",
          "small UI elements < 100px",
          "stacked gradients",
          "dark/saturated combos"
        ]
      },
      "allowed_gradients": {
        "hero_halo": "radial-gradient(60% 60% at 20% 10%, rgba(54,198,255,0.22) 0%, rgba(54,198,255,0) 60%), radial-gradient(50% 50% at 80% 30%, rgba(0,212,170,0.18) 0%, rgba(0,212,170,0) 55%)",
        "section_edge": "linear-gradient(90deg, rgba(0,212,170,0.12) 0%, rgba(54,198,255,0.10) 45%, rgba(0,0,0,0) 100%)"
      },
      "enforcement_rule": "IF gradient area exceeds 20% of viewport OR impacts readability THEN replace with solid bg (bg.base/bg.raised) + subtle noise."
    },
    "design_tokens_css": {
      "where": "/app/frontend/src/index.css",
      "instructions": "Override shadcn HSL vars to match palette; keep dark as default by applying class 'dark' to <html> or <body>. Add extra CSS custom props for glow/noise.",
      "tokens": ":root {\n  --blx-bg: #0B0D10;\n  --blx-bg-raised: #11141A;\n  --blx-panel: #151A22;\n  --blx-border: rgba(255,255,255,0.08);\n  --blx-text: #F5F7FB;\n  --blx-text-2: #B8C0CC;\n  --blx-muted: #7E8796;\n  --blx-accent: #00D4AA;\n  --blx-accent-2: #36C6FF;\n  --blx-ring: rgba(54,198,255,0.45);\n  --blx-radius-lg: 18px;\n  --blx-radius-md: 12px;\n  --blx-shadow-soft: 0 10px 30px rgba(0,0,0,.35);\n  --blx-shadow-lift: 0 20px 60px rgba(0,0,0,.55);\n}\n.dark {\n  color-scheme: dark;\n}\n::selection { background: rgba(0,212,170,.25); }\n"
    }
  },
  "typography": {
    "font_pairing": {
      "display": "Space Grotesk (Google Fonts)",
      "body": "Inter (Google Fonts)",
      "fallback": "system-ui, -apple-system, Segoe UI, Roboto"
    },
    "loading": {
      "instruction": "Use Google Fonts import in index.html or CSS with font-display: swap; prefer variable fonts if available.",
      "css_snippet": "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');\nhtml { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }\nh1,h2,h3,.font-display { font-family: 'Space Grotesk', Inter, system-ui; letter-spacing: -0.02em; }\n"
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg text-[color:var(--blx-text-2)] leading-relaxed",
      "section_title": "text-2xl md:text-3xl font-semibold",
      "card_title": "text-lg font-semibold",
      "body": "text-sm md:text-base leading-7 text-[color:var(--blx-text-2)]",
      "micro": "text-xs uppercase tracking-[0.16em] text-[color:var(--blx-muted)]"
    },
    "numbers_specs": {
      "style": "Use tabular-nums for spec tables and metrics.",
      "class": "tabular-nums"
    }
  },
  "layout": {
    "grid": {
      "container": "max-w-6xl mx-auto px-4 sm:px-6",
      "section_spacing": "py-14 sm:py-20",
      "bento": "Use 12-col mental model; implement as Tailwind grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6",
      "doors_pattern_home": "3 ‘entry doors’ as tall cards: md:col-span-4 each, fixed min-h for consistency"
    },
    "navigation": {
      "pattern": "Sticky top nav with translucent panel + blur; on mobile use Sheet drawer.",
      "cta": "Keep primary CTA visible (Book Demo) + WhatsApp icon button; never hide both."
    },
    "page_templates": {
      "home": [
        "Hero video reel + headline + 2 CTAs",
        "3 Entry Doors (Technologies / Applications / Case Studies)",
        "Trust strip (UAE installs + certifications)",
        "Signature tech highlights (bento)",
        "Case study teaser carousel",
        "Resources teaser (gated)",
        "Footer with contact + quick links"
      ],
      "hub_pages": [
        "Hero header (short) + filters/search",
        "Segment grid (cards) + ‘compare’ affordance",
        "CTA band (book consult)"
      ],
      "detail_pages": [
        "Media gallery (video + images)",
        "Benefit bullets (3–6)",
        "Specs table (scannable)",
        "Quick compare (2–3 items)",
        "Recommended applications/tags",
        "Sticky CTA rail (mobile bottom bar)"
      ]
    }
  },
  "components": {
    "component_path": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "table": "/app/frontend/src/components/ui/table.jsx",
      "carousel": "/app/frontend/src/components/ui/carousel.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "form": "/app/frontend/src/components/ui/form.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "select": "/app/frontend/src/components/ui/select.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "sonner_toast": "/app/frontend/src/components/ui/sonner.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "aspect_ratio": "/app/frontend/src/components/ui/aspect-ratio.jsx",
      "skeleton": "/app/frontend/src/components/ui/skeleton.jsx"
    },
    "global_patterns": {
      "surface_classes": {
        "panel": "bg-[color:var(--blx-panel)] border border-white/10 rounded-[var(--blx-radius-lg)] shadow-[var(--blx-shadow-soft)]",
        "raised": "bg-[color:var(--blx-bg-raised)] border border-white/10 rounded-[var(--blx-radius-md)]",
        "hairline_divider": "border-t border-white/10"
      },
      "cta_buttons": {
        "primary": {
          "component": "<Button>",
          "tailwind": "bg-[color:var(--blx-accent)] text-[color:var(--blx-on-accent)] hover:bg-[color:var(--blx-accent)]/90 focus-visible:ring-2 focus-visible:ring-[color:var(--blx-ring)]",
          "shape": "Luxury/Elegant: radius 10–12px, tall padding",
          "data_testid": "primary-cta-button"
        },
        "secondary": {
          "tailwind": "bg-transparent border border-white/15 text-[color:var(--blx-text)] hover:bg-white/5",
          "data_testid": "secondary-cta-button"
        },
        "whatsapp_floating": {
          "pattern": "Floating Action Button on desktop; sticky bottom bar on mobile.",
          "label": "WhatsApp 0559910711",
          "data_testid": "whatsapp-sticky-cta"
        }
      },
      "badges": {
        "usage": "Use for tags: MicroLED, MiP, COB, Outdoor DOOH, Transparent, 3D, Fine-pitch. Keep subtle, no loud fills.",
        "classes": "bg-white/5 text-[color:var(--blx-text-2)] border border-white/10"
      }
    },
    "home_hero": {
      "video": {
        "behavior": "Autoplay muted loop, playsinline, poster image, fallback static image. Keep 8–12s cinematic montage.",
        "overlay": "Use hero_halo gradient + 35–45% black scrim to ensure text contrast.",
        "controls": "No default controls; provide ‘Sound on’ optional toggle (muted by default) using a small Button.",
        "data_testid": {
          "video": "home-hero-video",
          "sound_toggle": "home-hero-sound-toggle"
        }
      },
      "layout": {
        "left": "Headline + subhead + CTAs",
        "right": "Optional stats stack (nits, pitch, IP rating) on desktop only",
        "tailwind": "grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
      }
    },
    "entry_doors": {
      "component": "Card + hover lift",
      "interaction": "On hover: translateY(-2px) + subtle glow shadow; on focus: ring.",
      "tailwind": "group relative overflow-hidden",
      "data_testid_examples": [
        "home-door-technologies",
        "home-door-applications",
        "home-door-case-studies"
      ]
    },
    "technology_detail": {
      "gallery": {
        "component": "Carousel + AspectRatio",
        "pattern": "First slide video, rest images; thumbnails optional; Skeleton while loading.",
        "data_testid": "tech-detail-media-gallery"
      },
      "specs_table": {
        "component": "Table",
        "pattern": "2-column key/value with section separators; keep 8–12 rows max before collapse.",
        "interaction": "Accordion for advanced specs",
        "data_testid": "tech-detail-specs-table"
      },
      "quick_compare": {
        "component": "Tabs (MiP vs COB etc)",
        "pattern": "3 bullets per tab; avoid dense paragraphs.",
        "data_testid": "tech-detail-quick-compare"
      }
    },
    "case_studies": {
      "index": {
        "component": "Card grid + Carousel for featured",
        "card_contents": "30–60s highlight video thumbnail, 3 metrics, sector tag, location (Dubai/Abu Dhabi/etc)",
        "data_testid": "case-studies-grid"
      },
      "detail": {
        "sections": [
          "Hero video + project headline",
          "Outcome metrics (3–5)",
          "Challenges / Solution / Result (Accordion)",
          "Tech used (badges)",
          "CTA (Book similar install consult)"
        ]
      }
    },
    "resources_gated": {
      "pattern": "Dialog with form gate before download; success toast + auto download.",
      "component": "Dialog + Form + Button + Sonner",
      "data_testid": {
        "resource_card": "resource-card",
        "gate_open": "resource-gate-open-button",
        "gate_submit": "resource-gate-submit-button"
      }
    },
    "contact_form": {
      "fields": [
        "Name",
        "Company",
        "Phone",
        "Email",
        "City",
        "Application",
        "Timeline",
        "Budget"
      ],
      "ux": {
        "pattern": "2-step form on desktop (Details -> Requirements). On mobile keep single column.",
        "confirmation": "Instant success state + WhatsApp alternative; never leave user uncertain.",
        "validation": "Inline; error text uses muted red and clear language."
      },
      "components": [
        "Form",
        "Input",
        "Select",
        "Textarea",
        "Button",
        "Sonner"
      ],
      "data_testid": {
        "submit": "contact-form-submit-button",
        "name": "contact-form-name-input",
        "company": "contact-form-company-input",
        "phone": "contact-form-phone-input",
        "email": "contact-form-email-input",
        "city": "contact-form-city-input",
        "application": "contact-form-application-select",
        "timeline": "contact-form-timeline-select",
        "budget": "contact-form-budget-select"
      }
    }
  },
  "motion": {
    "principles": [
      "Motion is purposeful: reveal, reinforce hierarchy, and guide toward CTA.",
      "Avoid long or bouncy easings; premium = controlled.",
      "Respect prefers-reduced-motion and disable parallax/auto animations."
    ],
    "micro_interactions": {
      "buttons": "hover: bg shift + 1px lift; active: scale(0.98); focus-visible ring",
      "cards": "hover: translateY(-2px) + shadow lift; border brightens from 10% -> 16%",
      "links": "underline appears on hover with 150ms ease",
      "scroll": "Section headers fade+rise (8–12px) when entering viewport"
    },
    "implementation": {
      "library": "framer-motion",
      "install": "npm i framer-motion",
      "starter_patterns_js": {
        "fade_up": "import { motion } from 'framer-motion';\n\nexport const FadeUp = ({ children, delay = 0 }) => (\n  <motion.div\n    initial={{ opacity: 0, y: 12 }}\n    whileInView={{ opacity: 1, y: 0 }}\n    viewport={{ once: true, margin: '-80px' }}\n    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}\n  >\n    {children}\n  </motion.div>\n);\n"
      },
      "parallax": {
        "approach": "Only subtle parallax on hero background media (1–3% translate). Do not parallax text.",
        "note": "Disable on mobile if it affects performance."
      }
    }
  },
  "media_video": {
    "performance": {
      "hero_video": [
        "Use .mp4 (H.264) fallback + .webm if possible",
        "Keep hero to ~8–12s and <= 6–10MB target",
        "Use poster attribute (first-frame JPG)"
      ],
      "loading": [
        "Lazy-load below-the-fold videos",
        "Use IntersectionObserver to pause off-screen videos",
        "Use Skeleton placeholders"
      ],
      "image": [
        "Prefer modern formats (webp/avif) if pipeline supports",
        "Use responsive sizes and avoid full-res downloads on mobile",
        "Use blur-up placeholders"
      ]
    },
    "player_ui": {
      "pattern": "Minimal chrome. If controls needed on case studies: show only on hover/tap.",
      "data_testid": "video-player"
    }
  },
  "responsive": {
    "breakpoints": {
      "mobile": "<640px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px"
    },
    "mobile_first_rules": [
      "Thumb-first: sticky bottom CTA bar (WhatsApp + Book Demo).",
      "Nav becomes Sheet drawer; keep one primary CTA always visible.",
      "Tap targets min 44px height. Buttons use py-3 px-4 minimum.",
      "Spec tables collapse into Accordion sections on mobile."
    ]
  },
  "accessibility": {
    "wcag": "AA minimum",
    "requirements": [
      "All interactive elements must be keyboard reachable",
      "Visible focus states (ring uses --blx-ring)",
      "Avoid low-contrast gray text on dark backgrounds",
      "Provide captions/subtitles where possible for case study videos",
      "Respect prefers-reduced-motion"
    ],
    "forms": [
      "Always pair Label with Input",
      "Error messages must be explicit and linked (aria-describedby)",
      "Phone input should allow international formats if future expansion"
    ]
  },
  "seo_content": {
    "structure": [
      "One H1 per page with UAE keyword modifiers where natural",
      "Scannable sections with H2/H3",
      "Case study pages include metadata (location, sector, tech)"
    ],
    "keyword_examples": [
      "LED screen Dubai",
      "video wall UAE",
      "outdoor LED display Dubai",
      "transparent LED display UAE",
      "fine pitch LED video wall"
    ]
  },
  "testing": {
    "data_testid_rule": "All interactive and key informational elements MUST have data-testid in kebab-case. This includes buttons, links, form fields, tabs triggers, carousel controls, toasts content, and key metrics.",
    "examples": [
      "nav-book-demo-button",
      "nav-whatsapp-button",
      "tech-card-microled",
      "hub-filter-select",
      "specs-accordion-trigger",
      "case-study-metric-roi"
    ]
  },
  "image_urls": {
    "uae_context": [
      {
        "category": "home_trust_strip_bg_optional",
        "description": "Dubai skyline night (subtle, blurred behind trust strip; use low opacity)",
        "url": "https://images.unsplash.com/photo-1577908884587-a89c28d6c1af?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "case_studies_hero_optional",
        "description": "Dubai skyline across water at night (use as poster or fallback behind video)",
        "url": "https://images.unsplash.com/photo-1590991650746-29a47faf8c41?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      }
    ],
    "tech_texture": [
      {
        "category": "hero_or_section_overlay",
        "description": "LED/pixel close-up texture (use as very subtle overlay; 5–8% opacity, mix-blend-mode: screen)",
        "url": "https://images.unsplash.com/photo-1618659394322-2642df4f430c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "resource_cards_background_optional",
        "description": "Device/screen in dark environment (use as masked card bg with heavy blur)",
        "url": "https://images.unsplash.com/photo-1650234083203-41aaf2cfeae6?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      }
    ]
  },
  "instructions_to_main_agent": {
    "setup": [
      "Make dark mode default by adding class 'dark' to the root element.",
      "Replace existing shadcn tokens in /app/frontend/src/index.css with Brightluxx tokens (keep the shadcn variable structure but map to our palette).",
      "Remove Create-React-App starter styles in App.css; avoid centering containers."
    ],
    "core_ui_build": [
      "Implement sticky top nav (NavigationMenu + Sheet for mobile) with CTAs.",
      "Implement mobile sticky bottom CTA bar: WhatsApp + Book Demo.",
      "Home hero: video with poster + overlay + 2 CTA buttons + trust strip.",
      "Hub pages: segmented cards with filters; no dense catalog grid.",
      "Detail pages: media gallery (Carousel), specs Table with Accordion for advanced specs, quick compare via Tabs.",
      "Use Sonner for all success/error toasts."
    ],
    "motion": [
      "Use framer-motion FadeUp wrapper for section entrance; keep durations 0.45–0.6s.",
      "Add hover lift interactions via Tailwind only (no transition: all)."
    ],
    "data_testids": [
      "Add data-testid to every CTA, nav action, tab trigger, filter, and form input.",
      "Use stable IDs based on role (not visual)."
    ],
    "performance": [
      "Lazy-load videos and heavy images below fold; pause offscreen videos.",
      "Prefer poster + short hero reel; do not autoplay multiple videos on one viewport."
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
