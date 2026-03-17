"""
Homepage content management - Dynamic sections for the homepage.
"""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import uuid
import os

from database import db
from auth import get_current_admin
from storage import upload_file, APP_NAME

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


class ClientItem(BaseModel):
    name: str
    logo_url: Optional[str] = None


class ShowcaseReel(BaseModel):
    enabled: bool = False
    video_url: str = ""
    title: str = "See It In Action"
    subtitle: str = "Real installations across UAE and beyond"


class HomepageContent(BaseModel):
    hero: Optional[HeroSection] = None
    stats: Optional[List[StatItem]] = None
    entry_doors: Optional[List[EntryDoor]] = None
    clients: Optional[List[ClientItem]] = None
    showcase_reel: Optional[ShowcaseReel] = None
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

DEFAULT_CLIENTS = [
    {"name": "RTA Dubai", "logo_url": None},
    {"name": "Dubai Police", "logo_url": None},
    {"name": "DEWA", "logo_url": None},
    {"name": "Emirates NBD", "logo_url": None},
    {"name": "Dubai Islamic Bank", "logo_url": None},
    {"name": "Etihad Airways", "logo_url": None},
    {"name": "Sharjah Airport", "logo_url": None},
    {"name": "ADNOC", "logo_url": None},
    {"name": "Emaar", "logo_url": None},
    {"name": "Carrefour", "logo_url": None},
    {"name": "Mashreq Bank", "logo_url": None},
    {"name": "RAKBANK", "logo_url": None},
    {"name": "Al Naboodah", "logo_url": None},
    {"name": "Jumeirah Group", "logo_url": None},
    {"name": "BEEAH", "logo_url": None},
    {"name": "City Centre", "logo_url": None},
    {"name": "Abu Dhabi Islamic Bank", "logo_url": None},
    {"name": "Ministry of Finance UAE", "logo_url": None},
]


@router.get("/api/homepage-content")
async def get_homepage_content():
    """Get homepage content for public display."""
    content = await homepage_col.find_one({"type": "main"}, {"_id": 0})
    
    if not content:
        # Return defaults
        return {"content": {
            "hero": DEFAULT_HERO,
            "stats": DEFAULT_STATS,
            "entry_doors": DEFAULT_ENTRY_DOORS,
            "clients": DEFAULT_CLIENTS,
            "featured_products_title": "Featured Products",
            "featured_products_subtitle": "Premium LED displays engineered for the Gulf region",
            "projects_title": "Case Studies",
            "projects_subtitle": "Real installations across UAE and MENA",
            "why_brightluxx_title": "Why Brightluxx?",
            "why_brightluxx_items": DEFAULT_WHY_ITEMS,
        }}
    
    # Add defaults for missing fields
    if "clients" not in content or not content.get("clients"):
        content["clients"] = DEFAULT_CLIENTS
    
    return {"content": content}


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
            "clients": DEFAULT_CLIENTS,
            "featured_products_title": "Featured Products",
            "featured_products_subtitle": "Premium LED displays engineered for the Gulf region",
            "projects_title": "Case Studies",
            "projects_subtitle": "Real installations across UAE and MENA",
            "why_brightluxx_title": "Why Brightluxx?",
            "why_brightluxx_items": DEFAULT_WHY_ITEMS,
            "is_default": True,
        }
    
    # Add defaults for missing fields
    if "clients" not in content or not content.get("clients"):
        content["clients"] = DEFAULT_CLIENTS
    
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


@router.post("/api/admin/homepage/upload-image")
async def upload_homepage_image(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin)
):
    """Upload an image for homepage sections."""
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Allowed: JPEG, PNG, WebP, GIF"
        )
    
    ext = os.path.splitext(file.filename)[1].lower() or ".jpg"
    unique_name = f"homepage_{uuid.uuid4().hex[:8]}{ext}"
    
    content = await file.read()
    
    try:
        storage_path = f"{APP_NAME}/homepage/{unique_name}"
        image_url = upload_file(content, storage_path, file.content_type)
        
        return {
            "success": True,
            "url": image_url,
            "filename": file.filename,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.post("/api/admin/homepage/upload-video")
async def upload_homepage_video(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin)
):
    """Upload a video for homepage hero section."""
    allowed_types = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Allowed: MP4, WebM, MOV, AVI"
        )
    
    # Check file size (max 100MB)
    content = await file.read()
    if len(content) > 100 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Maximum 100MB.")
    
    ext = os.path.splitext(file.filename)[1].lower() or ".mp4"
    unique_name = f"hero_video_{uuid.uuid4().hex[:8]}{ext}"
    
    try:
        storage_path = f"{APP_NAME}/videos/{unique_name}"
        video_url = upload_file(content, storage_path, file.content_type)
        
        return {
            "success": True,
            "url": video_url,
            "filename": file.filename,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
