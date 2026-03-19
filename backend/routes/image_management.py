"""
Image regeneration endpoint for updating product images with UAE-themed realistic images
Uses OpenAI DALL-E API directly with user's API key
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import uuid
import httpx
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

router = APIRouter(prefix="/api/admin/images", tags=["Image Management"])

# User's OpenAI API key
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "brightluxx")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# UAE-themed prompts by category - Product concept focused, NO TEXT
CATEGORY_PROMPTS = {
    "indoor": "Professional indoor LED video wall in a luxury Dubai corporate lobby displaying abstract colorful data visualization graphics, Burj Khalifa visible through floor-to-ceiling windows, modern Arabic-inspired marble interior, palm plants, warm lighting, no text on screens, photorealistic commercial photography",
    "outdoor": "Large outdoor LED billboard on Sheikh Zayed Road Dubai displaying vibrant colorful abstract advertisement, golden hour sunset, Burj Al Arab and Dubai skyline in background, palm trees, modern UAE architecture, no text visible, photorealistic advertising photography",
    "cob-microled": "Ultra-fine pitch MicroLED video wall in premium Dubai executive boardroom displaying abstract data graphics, leather executive chairs, Dubai Marina waterfront view through windows, minimalist luxury interior design, no text on screen, photorealistic corporate photography",
    "transparent": "Transparent see-through LED glass display in Dubai Mall luxury boutique storefront showing fashion visuals, shoppers visible through the glass, premium retail environment, no text visible, photorealistic retail photography",
    "flexible": "Curved flexible LED screen wrapping around architectural column in Abu Dhabi luxury hotel lobby showing abstract art, Arabic geometric patterns, gold accents, crystal chandelier, no text on display, photorealistic hospitality photography",
    "all-in-one": "All-in-one LED display in modern Dubai meeting room showing presentation charts, business professionals in meeting, floor-to-ceiling windows with city view, contemporary office design, no text on screen, photorealistic corporate photography",
    "cinema-led": "Premium cinema LED screen in Dubai multiplex showing dramatic movie scene, luxury recliner seats, dark theater ambiance, modern cinema architecture, no visible text, photorealistic entertainment photography",
    "sphere": "LED sphere display installation in Dubai Festival City mall atrium showing colorful abstract patterns, shoppers looking up, modern mall architecture with glass ceiling, no text on display, photorealistic commercial photography",
    "poster-totem": "Digital LED poster totem display in Dubai International Airport terminal showing colorful abstract graphics, modern airport architecture, travelers with luggage, no text visible, photorealistic travel photography",
    "rental": "Portable rental LED screen at outdoor Dubai concert event showing concert stage visuals, enthusiastic crowd, Palm Jumeirah in background, night scene with professional lighting, no text on screen, photorealistic event photography",
    "interactive": "Interactive LED floor display in Dubai children's museum with kids playing on colorful reactive graphics, modern educational environment, families enjoying, no text visible, photorealistic lifestyle photography",
    "virtual-production": "Virtual production LED wall in Dubai film studio showing virtual environment backdrop, film crew working, professional camera equipment, modern studio setup, no text on screens, photorealistic behind-the-scenes photography",
    "digital-signage": "Digital signage LED display in Dubai Metro station showing wayfinding graphics and abstract art, commuters walking past, modern transit architecture, minimal text, photorealistic urban photography",
    "default": "Professional LED display in modern Dubai commercial space showing abstract colorful art, contemporary Arabic-inspired interior design, premium environment, no text on screen, photorealistic commercial photography"
}

class ImageGenerationRequest(BaseModel):
    product_slug: str
    custom_prompt: Optional[str] = None

class BulkImageRequest(BaseModel):
    category: Optional[str] = None
    limit: Optional[int] = 10

async def generate_image_openai(prompt: str) -> str:
    """Generate image using OpenAI DALL-E 3 API and return URL"""
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    async with httpx.AsyncClient(timeout=120.0) as http_client:
        response = await http_client.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "dall-e-3",
                "prompt": prompt,
                "n": 1,
                "size": "1792x1024",
                "quality": "hd",
                "style": "natural"
            }
        )
        
        if response.status_code != 200:
            error_detail = response.json().get("error", {}).get("message", "Unknown error")
            raise HTTPException(status_code=response.status_code, detail=f"OpenAI API error: {error_detail}")
        
        data = response.json()
        image_url = data["data"][0]["url"]
        
        # Download the image
        img_response = await http_client.get(image_url)
        if img_response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to download generated image")
        
        return img_response.content

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
