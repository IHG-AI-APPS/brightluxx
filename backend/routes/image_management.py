"""
Image regeneration endpoint for updating product images with UAE-themed realistic images
Uses OpenAI GPT Image 1 via Emergent Integrations
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
import os
import base64
import uuid
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv()

router = APIRouter(prefix="/api/admin/images", tags=["Image Management"])

# Emergent LLM key (Universal key for OpenAI)
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "brightluxx")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# UAE-themed prompts by category - NO TEXT ON DISPLAYS
CATEGORY_PROMPTS = {
    "indoor": "Professional indoor LED video wall displaying abstract colorful art and data visualizations in a luxury Dubai corporate lobby, modern Arabic-inspired architecture, marble floors, palm plants, warm ambient lighting, Burj Khalifa visible through windows, no text on screens, photorealistic, 4K quality",
    "outdoor": "Large outdoor LED billboard on Sheikh Zayed Road Dubai at golden hour, showing colorful abstract art advertisement, Dubai skyline with Burj Al Arab in background, modern UAE architecture, no text on screen, professional advertising photography, photorealistic",
    "cob-microled": "Ultra-fine pitch MicroLED display in premium Dubai boardroom showing abstract corporate graphics, executive leather chairs, floor-to-ceiling windows with Dubai Marina view, minimalist luxury interior, no text on screen, professional corporate photography, photorealistic",
    "transparent": "Transparent LED glass display in Dubai Mall luxury storefront showing fashion imagery without text, shoppers walking by, modern retail environment, premium glass architecture, no text visible, professional retail photography, photorealistic",
    "flexible": "Curved flexible LED screen wrapping around pillar in Abu Dhabi luxury hotel lobby showing abstract art, Arabic geometric patterns, gold accents, crystal chandeliers, no text on display, premium hospitality environment, photorealistic",
    "all-in-one": "All-in-one LED display in Dubai conference room during business meeting showing charts and graphics, professionals in traditional and modern dress, city views through windows, no text on screen, modern meeting room design, professional corporate photography, photorealistic",
    "cinema-led": "Premium cinema LED screen in Dubai multiplex showing dramatic movie scene, luxury recliner seats, dark ambient lighting, modern cinema architecture, no text visible, professional entertainment photography, photorealistic",
    "sphere": "LED sphere display in Dubai Festival City mall atrium showing colorful abstract visuals, shoppers looking up, modern mall architecture with high ceilings, no text on display, professional commercial photography, photorealistic",
    "poster-totem": "Digital LED poster totem in Dubai Airport terminal showing colorful abstract graphics, modern airport architecture, travelers with luggage, no text visible, professional travel photography, photorealistic",
    "rental": "Portable LED screen at Dubai outdoor concert event showing concert visuals, crowd enjoying show, Palm Jumeirah in background, no text on screen, professional event photography, night scene with stage lighting, photorealistic",
    "interactive": "Interactive LED floor display in Dubai children's museum with kids playing on colorful graphics, modern educational environment, happy families, no text visible, professional lifestyle photography, photorealistic",
    "virtual-production": "Virtual production LED wall stage in Dubai film studio showing virtual environment backdrop, crew filming, professional production equipment, modern studio environment, no text on screens, behind-the-scenes photography, photorealistic",
    "digital-signage": "Digital signage display in Dubai metro station showing abstract art and wayfinding graphics, commuters walking, modern transit architecture, minimal text, professional urban photography, photorealistic",
    "default": "Professional LED display in modern Dubai commercial space showing abstract colorful art, contemporary Arabic-inspired interior design, premium environment, no text on screen, professional commercial photography, photorealistic"
}

class ImageGenerationRequest(BaseModel):
    product_slug: str
    custom_prompt: Optional[str] = None

class BulkImageRequest(BaseModel):
    category: Optional[str] = None
    limit: Optional[int] = 10

async def generate_image_openai(prompt: str) -> bytes:
    """Generate image using OpenAI GPT Image 1 via Emergent Integrations"""
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="Emergent LLM key not configured")
    
    try:
        image_gen = OpenAIImageGeneration(api_key=EMERGENT_LLM_KEY)
        images = await image_gen.generate_images(
            prompt=prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            return images[0]
        else:
            raise HTTPException(status_code=500, detail="No image was generated")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image generation error: {str(e)}")

async def upload_to_cdn(image_bytes: bytes, filename: str) -> str:
    """Upload image to local storage and return URL"""
    upload_dir = Path("/app/frontend/public/generated-images")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    filepath = upload_dir / unique_filename
    
    with open(filepath, "wb") as f:
        f.write(image_bytes)
    
    # Return relative URL that can be served by frontend
    return f"/generated-images/{unique_filename}"

@router.post("/regenerate/{product_slug}")
async def regenerate_product_image(product_slug: str, custom_prompt: Optional[str] = None):
    """Regenerate image for a specific product using OpenAI"""
    
    # Get product
    product = await db.products.find_one({"slug": product_slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get category-specific prompt
    category = product.get("category", "default")
    base_prompt = CATEGORY_PROMPTS.get(category, CATEGORY_PROMPTS["default"])
    
    # Customize prompt with product details
    product_name = product.get("name", "LED display")
    pixel_pitch = product.get("pixel_pitch", "")
    
    if custom_prompt:
        prompt = custom_prompt
    else:
        prompt = f"{base_prompt}, showing {product_name} {pixel_pitch} LED technology"
    
    try:
        # Generate image
        image_bytes = await generate_image_openai(prompt)
        
        # Upload to CDN
        image_url = await upload_to_cdn(image_bytes, f"{product_slug}.png")
        
        # Update product in database
        await db.products.update_one(
            {"slug": product_slug},
            {
                "$set": {
                    "image_url": image_url,
                    "image_updated_at": datetime.utcnow().isoformat()
                }
            }
        )
        
        return {
            "success": True,
            "product_slug": product_slug,
            "new_image_url": image_url,
            "prompt_used": prompt
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/preview-prompt/{product_slug}")
async def preview_prompt(product_slug: str):
    """Preview the prompt that would be used for a product"""
    
    product = await db.products.find_one({"slug": product_slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    category = product.get("category", "default")
    base_prompt = CATEGORY_PROMPTS.get(category, CATEGORY_PROMPTS["default"])
    product_name = product.get("name", "LED display")
    pixel_pitch = product.get("pixel_pitch", "")
    
    full_prompt = f"{base_prompt}, showing {product_name} {pixel_pitch} LED technology"
    
    return {
        "product_slug": product_slug,
        "product_name": product_name,
        "category": category,
        "prompt": full_prompt
    }

@router.get("/categories")
async def list_categories():
    """List all available category prompts"""
    return {
        "categories": list(CATEGORY_PROMPTS.keys()),
        "prompts": CATEGORY_PROMPTS
    }
