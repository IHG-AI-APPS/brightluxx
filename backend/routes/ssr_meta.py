"""
Server-Side Meta Injection endpoint.
Returns page-specific title, description, canonical, H1, and OG data
for any given URL path. Used by the frontend server to inject correct
metadata into <head> before sending HTML to browsers/crawlers.

This fixes the core SPA SEO issue: every page getting the same generic
title/description in the initial HTML response.
"""
from fastapi import APIRouter, Query
from database import db
import json
import re

router = APIRouter()

PRODUCTION_URL = "https://brightluxx.com"
SITE_NAME = "Brightluxx"
DEFAULT_DESC = "Premium LED display solutions for architects, contractors, and specifiers in Dubai, UAE & GCC. MicroLED, outdoor, transparent, and creative LED displays."
DEFAULT_OG_IMAGE = "https://files.ihgbrands.com/uploads_hero_banner.webp"

# In-memory cache (reset on server restart)
_meta_cache = {}

# Human-friendly path-to-title mapping for pages without DB entries
PATH_TITLES = {
    "/": "Premium LED Display Solutions in Dubai, UAE",
    "/products": "LED Display Products — Indoor, Outdoor, Creative & Transparent",
    "/solutions": "LED Display Solutions by Industry",
    "/technology": "LED Display Technology — COB, MiP, MicroLED & More",
    "/contact": "Contact Us — LED Display Enquiries Dubai, UAE",
    "/about": "About Brightluxx — LED Display Manufacturer Since 2005",
    "/blog": "Blog — LED Display Industry Insights & News",
    "/faq": "Frequently Asked Questions — LED Displays",
    "/case-studies": "Case Studies — LED Display Projects Across UAE",
    "/projects": "Project Portfolio — LED Display Installations",
    "/resources": "Resources — Spec Packs, Cheat Sheets & BIM References",
    "/knowledge": "Knowledge Hub — LED Display Technical Guides",
    "/calculator": "LED Screen Size Calculator",
    "/budget-estimator": "LED Display Budget Estimator",
    "/viewing-distance": "Viewing Distance & Pixel Pitch Calculator",
    "/power-estimator": "LED Display Power Consumption Estimator",
    "/project-planner": "LED Project Planner — Timeline & Specifications",
    "/technology-selector": "LED Technology Selector Quiz",
    "/spec-substitution": "LED Spec Substitution Service",
    "/value-engineering": "LED Value Engineering — Cost Optimization",
    "/installation-guide": "LED Display Installation Guide",
    "/cpd-programme": "CPD Programme — LED Technology Training",
    "/for-architects": "LED Displays for Architects — Specification Resources",
    "/for-contractors": "LED Displays for Contractors — Installation Guides",
    "/distribution": "Distribution & Franchise Partnerships",
    "/factory-tour": "Virtual Factory Tour — LED Manufacturing Facility",
    "/compare-brands": "Compare LED Display Brands — Brightluxx vs Competitors",
    "/led-screen-suppliers-dubai": "LED Screen Suppliers in Dubai — Brightluxx",
    "/abu-dhabi": "LED Display Supplier Abu Dhabi — Brightluxx",
    "/saudi-arabia": "LED Display Solutions Saudi Arabia — Brightluxx",
    "/qatar": "LED Screen Solutions Qatar — Brightluxx",
    "/kuwait": "LED Display Solutions Kuwait — Brightluxx",
    "/government-solutions": "Government LED Display Solutions — Brightluxx UAE",
    "/indoor-led": "Indoor LED Displays — Fine Pitch P0.4 to P4",
    "/outdoor-led": "Outdoor LED Displays — Weatherproof P2.5 to P10",
    "/luxury-home-cinema": "Luxury Home Cinema LED Displays",
    "/art-immersive": "Art & Immersive LED Installations — XR, NFT, Sculptural",
    "/signage-solutions": "Digital Signage Solutions — Channel Letters, Menus & More",
    "/product-families": "LED Display Product Families",
    "/lumimorph": "LumiMorph — Fine-Pitch Modular LED Displays",
    "/naturatex": "NaturaTex — Texture Screen Technology",
    "/signatouch": "SignaTouch — Interactive Digital Signage & Kiosks",
    "/glassmorph": "GlassMorph — Smart Glass & Transparent LED",
    "/pixelvue": "PixelVue — Standard & Specialty LED Displays",
    # Technology sub-pages
    "/technology/cob-led": "COB LED Technology — Chip-on-Board Explained",
    "/technology/cob": "COB LED Technology — Chip-on-Board Explained",
    "/technology/microled": "MicroLED & MiP Technology — Next-Gen Pixel Tech",
    "/technology/mip-led": "MiP LED Technology — Mini-in-Package Displays",
    "/technology/gob": "GOB Protection — Glue-on-Board Coating Technology",
    "/technology/hdr": "HDR & Color Technology for LED Displays",
    "/technology/driving-ic": "Driving ICs — PWM & Common Cathode Technology",
    "/technology/fine-pitch-led": "Fine Pitch LED Technology — Sub-P1.0 Displays",
    "/technology/media-facade": "Media Facade LED Technology",
    "/technology/all-in-one-dvled": "All-in-One dvLED Technology",
    "/technology/transparent-led": "Transparent LED Display Technology",
    "/technology/creative-led": "Creative LED Display Technology — Curved & Custom",
    "/technology/3d-anamorphic-led": "3D Anamorphic Naked-Eye LED Technology",
    # Solution sub-pages
    "/solutions/retail": "LED Displays for Retail & Hospitality",
    "/solutions/corporate": "LED Displays for Corporate Offices & Lobbies",
    "/solutions/entertainment": "LED Displays for Entertainment & Events",
    "/solutions/transportation": "LED Displays for Transportation — Airports, Metro",
    "/solutions/worship": "LED Displays for Houses of Worship",
    "/solutions/control-rooms": "LED Video Walls for Control Rooms & Command Centers",
    "/solutions/virtual-production": "LED Walls for Virtual Production & XR Stages",
    "/solutions/architecture": "Architectural LED Displays — Facades & Media Walls",
}

# Path descriptions for pages without DB entries
PATH_DESCS = {
    "/products": "Browse 85+ premium LED display products — MicroLED, outdoor, transparent, interactive, and creative LED solutions for UAE & GCC projects.",
    "/solutions": "Industry-specific LED display solutions for retail, corporate, entertainment, transportation, worship, and control rooms across UAE.",
    "/technology": "Explore LED display technologies including COB, MiP, MicroLED, GOB protection, HDR, and driving IC innovations.",
    "/contact": "Get in touch with Brightluxx for LED display enquiries, site surveys, and project consultations in Dubai, UAE.",
    "/about": "Learn about Brightluxx — a leading LED display manufacturer and supplier in Dubai, UAE, serving the GCC since 2005.",
    "/blog": "Latest news, insights, and technical articles about LED display technology, installations, and industry trends.",
    "/indoor-led": "Premium indoor LED displays from P0.4 to P4 pixel pitch. COB MicroLED, MiP, fine-pitch, and all-in-one solutions for corporate and retail.",
    "/outdoor-led": "Weatherproof outdoor LED displays from P2.5 to P10. High brightness, coastal GOB, mesh facade, and road signal displays.",
}


def _title_from_path(path: str) -> str:
    """Generate a human-friendly title from a URL path when no DB entry exists."""
    if path in PATH_TITLES:
        return PATH_TITLES[path]
    # Dynamic fallback: convert path segments to title case
    segments = [s for s in path.strip("/").split("/") if s]
    if not segments:
        return "Premium LED Display Solutions in Dubai, UAE"
    readable = " — ".join(
        seg.replace("-", " ").replace("_", " ").title() for seg in segments
    )
    return readable


def _desc_from_path(path: str) -> str:
    """Generate a description from path."""
    if path in PATH_DESCS:
        return PATH_DESCS[path]
    title = _title_from_path(path)
    return f"{title}. Premium LED display solutions by Brightluxx in Dubai, UAE."


@router.get("/api/ssr/meta")
async def get_ssr_meta(path: str = Query(...)):
    """Return page-specific meta for server-side injection into HTML <head>."""
    # Normalize path
    path = path.rstrip("/") or "/"

    # Check cache
    if path in _meta_cache:
        return _meta_cache[path]

    # Try SEO database first
    seo_col = db["page_seo"]
    seo_entry = await seo_col.find_one({"path": path})

    if seo_entry and (seo_entry.get("meta_title") or seo_entry.get("meta_description")):
        raw_title = seo_entry.get("meta_title", "") or _title_from_path(path)
        title_with_suffix = raw_title if "brightluxx" in raw_title.lower() else f"{raw_title} | {SITE_NAME}"
        raw_og_title = seo_entry.get("og_title", "") or seo_entry.get("meta_title", "")
        og_with_suffix = raw_og_title if "brightluxx" in raw_og_title.lower() else f"{raw_og_title} | {SITE_NAME}"
        result = {
            "title": title_with_suffix,
            "description": seo_entry.get("meta_description", "") or _desc_from_path(path),
            "canonical": seo_entry.get("canonical_url", "") or f"{PRODUCTION_URL}{path}",
            "h1": raw_title,
            "keywords": ", ".join(seo_entry.get("keywords", [])) if seo_entry.get("keywords") else "",
            "og_title": og_with_suffix,
            "og_description": seo_entry.get("og_description", "") or seo_entry.get("meta_description", "") or _desc_from_path(path),
            "og_image": seo_entry.get("og_image", "") or DEFAULT_OG_IMAGE,
            "og_image_alt": seo_entry.get("image_alt", "") or raw_title,
            "noindex": seo_entry.get("noindex", False),
        }
    else:
        # Fallback: generate from path
        title = _title_from_path(path)
        desc = _desc_from_path(path)
        title_with_suffix = title if "brightluxx" in title.lower() else f"{title} | {SITE_NAME}"
        result = {
            "title": title_with_suffix,
            "description": desc,
            "canonical": f"{PRODUCTION_URL}{path}",
            "h1": title,
            "keywords": "",
            "og_title": title_with_suffix,
            "og_description": desc,
            "og_image": DEFAULT_OG_IMAGE,
            "og_image_alt": title,
            "noindex": False,
        }

    # CRITICAL: canonical must ALWAYS be self-referencing unless explicitly overridden
    # Never fall back to homepage
    if not result["canonical"] or (result["canonical"] == f"{PRODUCTION_URL}/" and path != "/"):
        result["canonical"] = f"{PRODUCTION_URL}{path}"

    # For product pages: add Product schema + FAQ schema
    if path.startswith("/products/"):
        slug = path.split("/products/")[1].rstrip("/")
        product = await db["products"].find_one({"slug": slug})
        if product:
            schemas = []

            # Product schema (schema.org/Product)
            product_schema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.get("name", ""),
                "description": product.get("description", "") or product.get("tagline", ""),
                "sku": product.get("product_code", ""),
                "brand": {"@type": "Brand", "name": product.get("brand", "Brightluxx")},
                "manufacturer": {"@type": "Organization", "name": "Brightluxx"},
                "url": f"{PRODUCTION_URL}{path}",
                "category": product.get("category", "LED Display"),
            }
            # Image
            img = product.get("image_url", "") or DEFAULT_OG_IMAGE
            product_schema["image"] = img

            # Offers (price range for B2B)
            price_range = product.get("price_range")
            if price_range and isinstance(price_range, dict):
                product_schema["offers"] = {
                    "@type": "AggregateOffer",
                    "priceCurrency": price_range.get("currency", "USD"),
                    "lowPrice": price_range.get("low", 0),
                    "highPrice": price_range.get("high", 0),
                    "offerCount": 1,
                    "availability": f"https://schema.org/{product.get('availability', 'InStock')}",
                    "seller": {"@type": "Organization", "name": "Brightluxx"},
                    "url": f"{PRODUCTION_URL}{path}",
                }

            # Additional properties
            props = []
            if product.get("pixel_pitch"):
                props.append({"@type": "PropertyValue", "name": "Pixel Pitch", "value": product["pixel_pitch"]})
            if product.get("brightness"):
                props.append({"@type": "PropertyValue", "name": "Brightness", "value": product["brightness"]})
            if product.get("resolution"):
                props.append({"@type": "PropertyValue", "name": "Resolution", "value": product["resolution"]})
            if product.get("warranty"):
                props.append({"@type": "PropertyValue", "name": "Warranty", "value": product["warranty"]})
            if props:
                product_schema["additionalProperty"] = props

            # Key specs
            key_specs = product.get("key_specs", {})
            if isinstance(key_specs, dict):
                for k, v in key_specs.items():
                    if k not in ("pixel_pitch", "brightness", "resolution"):
                        props.append({"@type": "PropertyValue", "name": k.replace("_", " ").title(), "value": str(v)})

            schemas.append(json.dumps(product_schema))

            # FAQ schema
            if product.get("faq"):
                faq_schema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {"@type": "Question", "name": item["q"],
                         "acceptedAnswer": {"@type": "Answer", "text": item["a"]}}
                        for item in product["faq"]
                    ]
                }
                schemas.append(json.dumps(faq_schema))

            result["schemas"] = schemas

    # For blog pages: add FAQ schema if blog has FAQ
    elif path.startswith("/blog/"):
        blog_slug = path.split("/blog/")[1].rstrip("/")
        blog = await db["blogs"].find_one({"slug": blog_slug})
        if blog and blog.get("faq"):
            faq_schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": item["q"],
                     "acceptedAnswer": {"@type": "Answer", "text": item["a"]}}
                    for item in blog["faq"]
                ]
            }
            result["schemas"] = [json.dumps(faq_schema)]

    # Cache result (cap at 500 entries)
    if len(_meta_cache) > 500:
        _meta_cache.clear()
    _meta_cache[path] = result
    return result


@router.post("/api/ssr/meta/clear-cache")
async def clear_ssr_cache():
    """Clear the SSR meta cache (call after SEO data changes)."""
    _meta_cache.clear()
    return {"cleared": True}
