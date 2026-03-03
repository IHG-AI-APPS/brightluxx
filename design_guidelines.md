{
  "brand": {
    "name": "Brightluxx",
    "attributes": [
      "cinematic",
      "premium",
      "dramatic minimalism",
      "architectural-tech",
      "high-trust B2B",
      "Dubai luxury"
    ],
    "north_star": "Apple/Samsung-level restraint: minimal copy, maximal craft. Black stage + metallic gold accents + glass + noise + cinematic motion. Every section reads like a product film still."
  },
  "typography": {
    "font_loading": {
      "google_fonts": [
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500,600,700&family=Manrope:wght@300;400;500;600&display=swap"
      ],
      "css_instruction": "Replace current Montserrat heading font with Fraunces for display headings; keep Manrope for body/UI. Use only in /app/frontend/src/index.css @import section."
    },
    "pairing": {
      "display": {
        "family": "Fraunces",
        "usage": [
          "H1/H2 hero lines",
          "section titles",
          "product series names",
          "short editorial quotes"
        ],
        "notes": "Fraunces has modern serifs and a luxury editorial feel that matches a metallic serif logo without looking old-fashioned. Keep letter-spacing tight (-0.02em to -0.04em)."
      },
      "body": {
        "family": "Manrope",
        "usage": [
          "navigation",
          "spec labels",
          "forms",
          "microcopy"
        ],
        "notes": "Manrope reads crisp on dark UIs and supports a premium, tech-forward vibe."
      },
      "numerals": {
        "family": "Manrope",
        "css": "font-variant-numeric: tabular-nums;",
        "usage": [
          "spec tables",
          "product codes",
          "dimensions"
        ]
      }
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg",
      "body": "text-sm md:text-base",
      "small": "text-xs md:text-sm",
      "ui_label": "text-xs uppercase tracking-[0.18em]"
    },
    "copy_rules": [
      "Minimal text. Prefer single-sentence value statements.",
      "Replace paragraphs with bullet specs, badges, and short captions.",
      "Never center-align long text blocks; use left alignment for readability.",
      "Use title case for page titles; sentence case for microcopy."
    ]
  },
  "color_system": {
    "gradient_policy": {
      "allowed": [
        "Only as decorative overlays in hero/video sections",
        "Only as metallic gold sheen on large primary CTAs",
        "Never as reading-area backgrounds"
      ],
      "restricted": [
        "No saturated purple/pink/blue gradients",
        "No gradients on small elements (<100px)",
        "No gradients covering >20% viewport",
        "No stacked gradients"
      ]
    },
    "palette": {
      "base": {
        "bg": "#0A0A0A",
        "bg_2": "#0F0F0F",
        "surface": "rgba(18,18,18,0.55)",
        "surface_solid": "#121212",
        "surface_2": "#171717"
      },
      "text": {
        "primary": "#F5F5F5",
        "secondary": "#D4C5B0",
        "muted": "#A39A8B",
        "placeholder": "rgba(245,245,245,0.55)"
      },
      "gold": {
        "gold_1": "#B8860B",
        "gold_2": "#C59F4A",
        "gold_3": "#E5C574",
        "gold_4": "#F0D78C"
      },
      "semantics": {
        "border": "rgba(240,215,140,0.14)",
        "border_strong": "rgba(240,215,140,0.22)",
        "ring": "rgba(240,215,140,0.40)",
        "success": "#6FD39B",
        "danger": "#E35D5D"
      }
    },
    "design_tokens_css": {
      "where": "/app/frontend/src/index.css :root",
      "instruction": "Keep existing --blx-* tokens but add semantic aliases used by Tailwind/shadcn theme mapping if needed. Avoid changing blacks; adjust only typography and add 'lightburst' accent tokens below.",
      "add_tokens": {
        "--blx-lightburst": "radial-gradient(closest-side, rgba(240,215,140,0.38), rgba(240,215,140,0) 70%)",
        "--blx-lightburst-soft": "radial-gradient(closest-side, rgba(229,197,116,0.18), rgba(229,197,116,0) 72%)",
        "--blx-hairline": "rgba(245,245,245,0.08)",
        "--blx-focus": "0 0 0 3px rgba(240,215,140,0.40)"
      }
    }
  },
  "layout": {
    "grid": {
      "container": "max-w-[1200px] xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8",
      "section_spacing": "py-14 sm:py-20",
      "hero_spacing": "pt-6 sm:pt-10 pb-12 sm:pb-16",
      "bento_rules": [
        "Home uses a 12-col grid on desktop; 1-col stacking on mobile.",
        "Use 2–3x more spacing than feels comfortable.",
        "Prefer large media tiles with short captions at bottom-left."
      ]
    },
    "header": {
      "style": "Clean, cinematic sticky nav with blur + hairline border; logo left; 5 links + CTA right; hamburger -> Sheet on mobile.",
      "interaction": [
        "Hide on scroll down, reveal on scroll up (optional: framer-motion)",
        "Active route: thin gold underline + slightly brighter text"
      ],
      "data_testid": {
        "nav": "site-header-nav",
        "mobile_menu_button": "site-header-mobile-menu-button",
        "cta_quote": "site-header-request-quote-button",
        "whatsapp": "site-header-whatsapp-link"
      }
    },
    "page_templates": {
      "home": [
        "Full-bleed hero video (85vh), rounded container, overlay gradient already exists",
        "Three 'entry doors' (Products / Inspirations / Projects) as large cards",
        "Trust strip (logos or numbers) minimal",
        "CTA band with lead capture teaser + WhatsApp"
      ],
      "products": [
        "Filter bar (sticky on desktop) + grid",
        "Product cards: image 16:10, BLX code badge, 3 top specs",
        "Details: Dialog/Drawer with spec table"
      ],
      "inspirations": [
        "Masonry-like gallery (use CSS columns or grid with varying spans)",
        "Hover reveals category + 'View'"
      ],
      "projects": [
        "Case study cards with hero image + minimal facts (location, sector, screen size)",
        "Detail view uses Tabs: Overview / Media / Specs"
      ],
      "showroom": [
        "Single hero media + prominent external link button",
        "FAQ accordion for hardware/browser requirements"
      ],
      "configurator": [
        "Single hero media + prominent external link button",
        "Stepper-like explanation using Cards"
      ],
      "contact": [
        "Two-column: form + contact card (WhatsApp, phone, address)",
        "Map/visual optional as muted background image"
      ]
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui/",
      "use_components": [
        "button.jsx",
        "card.jsx",
        "navigation-menu.jsx (or simple nav + sheet.jsx)",
        "sheet.jsx",
        "dialog.jsx",
        "drawer.jsx",
        "tabs.jsx",
        "badge.jsx",
        "table.jsx",
        "input.jsx",
        "textarea.jsx",
        "select.jsx",
        "separator.jsx",
        "carousel.jsx (optional for projects)",
        "scroll-area.jsx",
        "sonner.jsx"
      ]
    },
    "custom_components_to_build_js": {
      "notes": "Project uses .js (not .tsx). Create components in /app/frontend/src/components/ (not ui) and compose shadcn primitives.",
      "list": [
        {
          "name": "VideoHero",
          "purpose": "Autoplay muted loop hero video with poster fallback + overlay + CTA",
          "data_testid": [
            "home-hero-video",
            "home-hero-primary-cta",
            "home-hero-secondary-cta"
          ]
        },
        {
          "name": "EntryDoorCard",
          "purpose": "The 3 doors on Home (Products/Inspirations/Projects) with hover lift + media",
          "data_testid": [
            "home-entry-door-products",
            "home-entry-door-inspirations",
            "home-entry-door-projects"
          ]
        },
        {
          "name": "LightburstX",
          "purpose": "Reusable decorative 'X lightburst' motif as subtle background accent",
          "data_testid": [
            "decor-lightburst-x"
          ]
        },
        {
          "name": "ProductCard",
          "purpose": "Product tile grid card with BLX code, key specs, quick view",
          "data_testid": [
            "products-product-card"
          ]
        },
        {
          "name": "LeadCapturePanel",
          "purpose": "Minimal form panel used on Home CTA section and Contact page",
          "data_testid": [
            "lead-capture-form",
            "lead-capture-submit-button",
            "lead-capture-whatsapp-button"
          ]
        }
      ]
    },
    "buttons": {
      "style": "Luxury / Elegant",
      "variants": {
        "primary": {
          "name": "Gold",
          "tailwind": "rounded-[var(--blx-radius-md)] bg-[linear-gradient(135deg,#B78E3A_0%,#C59F4A_34%,#E5C574_68%,#F0D78C_100%)] text-[#0A0A0A] shadow-[0_14px_30px_rgba(0,0,0,0.55)]",
          "hover": "hover:shadow-[0_20px_44px_rgba(0,0,0,0.65)] hover:translate-y-[-1px]",
          "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(240,215,140,0.40)] focus-visible:ring-offset-0",
          "transition_rule": "Use transition-[box-shadow,transform,background-color] duration-[var(--blx-dur-2)] ease-[var(--blx-ease-out)] (no transition-all).",
          "data_testid": "primary-cta-button"
        },
        "secondary": {
          "name": "Glass",
          "tailwind": "rounded-[var(--blx-radius-md)] bg-[rgba(18,18,18,0.55)] border border-[rgba(240,215,140,0.22)] text-[var(--blx-text)] backdrop-blur-md",
          "hover": "hover:bg-[rgba(18,18,18,0.70)] hover:border-[rgba(240,215,140,0.40)]",
          "data_testid": "secondary-cta-button"
        },
        "ghost": {
          "name": "Hairline",
          "tailwind": "rounded-[var(--blx-radius-md)] bg-transparent border border-[rgba(245,245,245,0.10)] text-[var(--blx-text)]",
          "hover": "hover:border-[rgba(240,215,140,0.22)] hover:bg-[rgba(240,215,140,0.06)]",
          "data_testid": "ghost-button"
        }
      }
    },
    "cards": {
      "base": "bg-[var(--blx-panel)] border border-[var(--blx-border)] rounded-[var(--blx-radius-lg)] shadow-[var(--blx-shadow-soft)]",
      "hover": "hover:shadow-[var(--blx-shadow-lift)] hover:-translate-y-1 hover:border-[rgba(240,215,140,0.35)] transition-[transform,box-shadow,border-color] duration-[var(--blx-dur-3)] ease-[var(--blx-ease-out)]",
      "data_testid": "media-card"
    },
    "forms": {
      "input": "Use shadcn Input/Textarea and apply className='bg-[rgba(10,10,10,0.55)] border-[var(--blx-border)] text-[var(--blx-text)] placeholder:text-[rgba(245,245,245,0.55)] focus-visible:ring-2 focus-visible:ring-[rgba(240,215,140,0.40)]' and add data-testid.",
      "validation": "Errors should appear as a single line under field in muted red (#E35D5D) with data-testid like 'contact-form-email-error'.",
      "submit": "Use gold primary button; disable state: opacity-60 cursor-not-allowed; keep text readable."
    },
    "tables_specs": {
      "use": "table.jsx",
      "style": "Header row uses bg-[var(--blx-bg-raised)] uppercase tracking-[0.08em]; rows hover: bg-[rgba(240,215,140,0.04)].",
      "data_testid": "product-specs-table"
    },
    "gallery": {
      "inspirations_grid": "Mobile: 1 col; md: 2; lg: 3; allow occasional 2x span tiles for drama.",
      "hover": "On hover: subtle zoom on image + bottom gradient scrim (black) + gold label.",
      "data_testid": "inspirations-gallery"
    }
  },
  "motion_microinteractions": {
    "principles": [
      "Cinematic, slow, deliberate. No bouncy playful easing.",
      "Use opacity+translate for entrances. Keep distances small (8–24px).",
      "Hover lifts should be 2–6px max; glow subtle and gold-tinted.",
      "Never animate layout-affecting properties heavily (avoid width/height thrash)."
    ],
    "recommended_library": {
      "name": "framer-motion",
      "why": "For scroll reveals, nav hide/reveal, and hero door staggered entrances.",
      "install": "npm i framer-motion",
      "usage_scaffold_js": "// example\nimport { motion } from 'framer-motion';\n\nexport default function FadeUp({ children, delay = 0 }) {\n  return (\n    <motion.div\n      initial={{ opacity: 0, y: 18 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, amount: 0.35 }}\n      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}\n    >\n      {children}\n    </motion.div>\n  );\n}\n"
    },
    "hero_video": {
      "rules": [
        "Autoplay muted loop playsInline.",
        "Provide poster image fallback.",
        "Add subtle vignette overlay already in App.css (OK).",
        "Optional: on scroll, gently reduce overlay opacity for parallax feel."
      ],
      "data_testid": "home-hero-video"
    },
    "lightburst_motif": {
      "implementation": "Create an absolutely-positioned decorative div with background: var(--blx-lightburst) and a rotated X mask (CSS clip-path or SVG). Keep opacity 0.10–0.18 and ensure it never affects readability.",
      "tailwind_hint": "absolute -z-10 pointer-events-none opacity-15 blur-0",
      "data_testid": "decor-lightburst-x"
    }
  },
  "media": {
    "video_hero": {
      "requirements": [
        "4K feel but optimized: provide 1080p mp4 + poster jpg/webp",
        "Keep hero copy minimal: 1 headline, 1 subline, 2 CTAs",
        "Avoid text-heavy overlays"
      ],
      "stock_video_sources": [
        "Pexels (LED wall / stage screens)",
        "Coverr (technology abstract)",
        "Artgrid/Storyblocks (paid - premium)"
      ]
    },
    "image_urls": {
      "hero_poster": [
        {
          "url": "https://images.unsplash.com/photo-1699742983091-8465fbc56a5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85",
          "description": "Dark abstract LED lighting scene; use as hero poster fallback."
        }
      ],
      "products_placeholders": [
        {
          "url": "https://images.unsplash.com/photo-1654246513422-2429316733c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85",
          "description": "Use as product grid placeholder when supplier image missing."
        },
        {
          "url": "https://images.unsplash.com/photo-1588593578282-a3f494078ad0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85",
          "description": "Abstract frame detail; good for spec-focused product tiles."
        }
      ],
      "dubai_context": [
        {
          "url": "https://images.unsplash.com/photo-1583680093447-2acef3f67f0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMG5pZ2h0JTIwYXJjaGl0ZWN0dXJlJTIwbGlnaHRzfGVufDB8fHxibGFja3wxNzcyNTU5ODYzfDA&ixlib=rb-4.1.0&q=85",
          "description": "Dubai skyline at night; use in Contact/Showroom context band (very subtle, low opacity)."
        }
      ],
      "projects_inspiration": [
        {
          "url": "https://images.pexels.com/photos/1103969/pexels-photo-1103969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "LED-lit stadium facade; use as Project cover placeholder."
        },
        {
          "url": "https://images.pexels.com/photos/29861346/pexels-photo-29861346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "Modern facade with LED lights; use in Inspirations gallery."
        }
      ]
    }
  },
  "iconography": {
    "library": "lucide-react",
    "rules": [
      "No emoji icons.",
      "Keep icon stroke 1.75–2; color: rgba(245,245,245,0.78) or gold for emphasis."
    ]
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast: gold text only on black, never on mid-gray panels unless tested.",
      "Visible focus states: use ring color rgba(240,215,140,0.40).",
      "Keyboard navigable nav/menu/dialogs (shadcn already helps).",
      "Video: provide pause control for reduced motion users (optional), and respects prefers-reduced-motion for animations."
    ],
    "reduced_motion": {
      "css_hint": "@media (prefers-reduced-motion: reduce) { .animate-fade-up { animation: none; } html { scroll-behavior: auto; } }"
    }
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid (kebab-case, role-based).",
    "examples": [
      "data-testid='products-filter-select'",
      "data-testid='products-search-input'",
      "data-testid='product-quick-view-button'",
      "data-testid='project-case-study-card'",
      "data-testid='contact-form-submit-button'",
      "data-testid='whatsapp-quick-contact-button'"
    ]
  },
  "extra_libraries": {
    "optional": [
      {
        "name": "react-intersection-observer",
        "why": "Trigger subtle reveal animations without heavy scroll listeners.",
        "install": "npm i react-intersection-observer",
        "usage": "Use to add 'is-visible' class for fade-up transitions."
      }
    ],
    "do_not_add": [
      "Heavy three.js backgrounds (risking performance and distraction)",
      "Particle backgrounds (too generic; conflicts with premium minimalism)"
    ]
  },
  "instructions_to_main_agent": [
    "Keep existing token system in index.css; swap heading font to Fraunces and body to Manrope; ensure all headings use .font-display (Fraunces).",
    "Remove all 'transition: all' occurrences in App.css and replace with explicit transition-[transform,box-shadow,border-color,background-color] (per rules).",
    "Hero must be video-first: autoplay muted loop playsInline; overlay copy: 1 headline + 1 subline + 2 CTAs max. Add data-testid to video and CTAs.",
    "Implement 3 'entry doors' on Home as large media cards; each door uses an image/video still + short caption; hover lift + subtle gold glow.",
    "Products: grid cards with BLX codes; quick view in Dialog on desktop and Drawer on mobile. Specs in shadcn Table with tabular numbers.",
    "Inspirations: gallery grid with varying tile sizes; use AspectRatio and Card; hover reveals label and a View button.",
    "Projects: case study cards; detail uses Tabs; include sticky CTA to Contact/WhatsApp.",
    "Contact: lead capture form uses shadcn Form/Input/Textarea; show success toast via sonner; WhatsApp button always visible.",
    "Use noise overlay utility (.blx-noise) behind hero and key bands; keep opacity low.",
    "Gradients: only for hero overlay and primary CTA sheen; never for long reading sections; keep gradient area <20% viewport.",
    "All interactive and key informational elements must have data-testid in kebab-case."
  ],
  "general_ui_ux_design_guidelines": [
    "You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms",
    "You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text",
    "NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json",
    "\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead.\n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
  ]
}
