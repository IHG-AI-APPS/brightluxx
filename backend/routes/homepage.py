"""
Homepage content management - Dynamic sections for the homepage.
"""
from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from database import db
from auth import get_current_admin

router = APIRouter()

homepage_col = db["homepage_content"]


class HeroSection(BaseModel):
    headline: str = "Premium LED Display Solutions"
    subheadline: str = "Specification Engine for Architects & Contractors"
    cta_text: str = "Explore Products"
    cta_link: str = "/products"
    video_urls: List[str] = []
    poster_image: str = ""


class StatItem(BaseModel):
    value: str
    label: str
    suffix: str = ""


class EntryDoor(BaseModel):
    title: str
    description: str
    image: str
    link: str
    cta_text: str = "Explore"


class HomepageContent(BaseModel):
    hero: Optional[HeroSection] = None
    stats: Optional[List[StatItem]] = None
    entry_doors: Optional[List[EntryDoor]] = None
    featured_products_title: str = "Featured Products"
    featured_products_subtitle: str = "Premium LED displays engineered for the Gulf region"
    projects_title: str = "Case Studies"
    projects_subtitle: str = "Real installations across UAE and MENA"
    why_brightluxx_title: str = "Why Brightluxx?"
    why_brightluxx_items: Optional[List[Dict[str, str]]] = None


# Default content
DEFAULT_HERO = {
    "headline": "Premium LED Display Solutions",
    "subheadline": "Specification Engine for Architects & Contractors",
    "cta_text": "Explore Products",
    "cta_link": "/products",
    "video_urls": [
        "https://files.ihgbrands.com/brightluxx/videos/hero-video-1.mp4",
        "https://files.ihgbrands.com/brightluxx/videos/hero-video-2.mp4"
    ],
    "poster_image": "https://files.ihgbrands.com/brightluxx/uploads/hero_banner.webp"
}

DEFAULT_STATS = [
    {"value": "500", "label": "Projects Delivered", "suffix": "+"},
    {"value": "15", "label": "Years Experience", "suffix": "+"},
    {"value": "50", "label": "Expert Team", "suffix": "+"},
    {"value": "24", "label": "Service Support", "suffix": "/7"},
]

DEFAULT_ENTRY_DOORS = [
    {
        "title": "Products",
        "description": "MicroLED, outdoor, rental, transparent. Full range.",
        "image": "https://files.ihgbrands.com/brightluxx/uploads/cob_microled_1.webp",
        "link": "/products",
        "cta_text": "Browse"
    },
    {
        "title": "Inspirations",
        "description": "See how LED transforms spaces across industries.",
        "image": "https://files.ihgbrands.com/brightluxx/uploads/insp_retail.webp",
        "link": "/inspirations",
        "cta_text": "Discover"
    },
    {
        "title": "Projects",
        "description": "Real installations. Proven results across UAE and MENA.",
        "image": "https://files.ihgbrands.com/brightluxx/uploads/proj_indian_pavilion___expo_2020_dubai.webp",
        "link": "/projects",
        "cta_text": "View"
    }
]

DEFAULT_WHY_ITEMS = [
    {"icon": "Factory", "title": "Direct Factory", "description": "No middlemen. Factory-direct pricing with full QC control."},
    {"icon": "Package", "title": "Gulf-Grade Stock", "description": "High-brightness, heat-resistant panels ready in Dubai."},
    {"icon": "Truck", "title": "Fast Delivery", "description": "48-hour dispatch from our UAE warehouse."},
    {"icon": "GraduationCap", "title": "CPD Training", "description": "Accredited LED specification training for your team."},
    {"icon": "Wrench", "title": "Full Installation", "description": "Turnkey installation with certified technicians."},
    {"icon": "HeartHandshake", "title": "5-Year Warranty", "description": "Industry-leading warranty with local support."},
]


@router.get("/api/homepage-content")
async def get_homepage_content():
    """Get homepage content for public display."""
    content = await homepage_col.find_one({"type": "main"}, {"_id": 0})
    
    if not content:
        # Return defaults
        return {
            "hero": DEFAULT_HERO,
            "stats": DEFAULT_STATS,
            "entry_doors": DEFAULT_ENTRY_DOORS,
            "featured_products_title": "Featured Products",
            "featured_products_subtitle": "Premium LED displays engineered for the Gulf region",
            "projects_title": "Case Studies",
            "projects_subtitle": "Real installations across UAE and MENA",
            "why_brightluxx_title": "Why Brightluxx?",
            "why_brightluxx_items": DEFAULT_WHY_ITEMS,
        }
    
    return content


@router.get("/api/admin/homepage-content")
async def admin_get_homepage_content(admin=Depends(get_current_admin)):
    """Get homepage content for admin editing."""
    content = await homepage_col.find_one({"type": "main"}, {"_id": 0})
    
    if not content:
        # Return defaults for editing
        return {
            "type": "main",
            "hero": DEFAULT_HERO,
            "stats": DEFAULT_STATS,
            "entry_doors": DEFAULT_ENTRY_DOORS,
            "featured_products_title": "Featured Products",
            "featured_products_subtitle": "Premium LED displays engineered for the Gulf region",
            "projects_title": "Case Studies",
            "projects_subtitle": "Real installations across UAE and MENA",
            "why_brightluxx_title": "Why Brightluxx?",
            "why_brightluxx_items": DEFAULT_WHY_ITEMS,
            "is_default": True,
        }
    
    content["is_default"] = False
    return content


@router.put("/api/admin/homepage-content")
async def update_homepage_content(data: dict, admin=Depends(get_current_admin)):
    """Update homepage content."""
    data["type"] = "main"
    data["updated_at"] = datetime.now(timezone.utc)
    
    # Remove is_default flag if present
    data.pop("is_default", None)
    
    existing = await homepage_col.find_one({"type": "main"})
    
    if existing:
        await homepage_col.update_one({"type": "main"}, {"$set": data})
    else:
        data["created_at"] = datetime.now(timezone.utc)
        await homepage_col.insert_one(data)
    
    updated = await homepage_col.find_one({"type": "main"}, {"_id": 0})
    return {"success": True, "content": updated}


@router.post("/api/admin/homepage-content/reset")
async def reset_homepage_content(admin=Depends(get_current_admin)):
    """Reset homepage content to defaults."""
    await homepage_col.delete_one({"type": "main"})
    return {"success": True, "message": "Homepage content reset to defaults"}
