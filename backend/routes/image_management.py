"""
Image regeneration endpoint for updating product images with UAE-themed realistic images
Uses OpenAI GPT Image 1 (latest) via Emergent Integrations
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import uuid
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv()

router = APIRouter(prefix="/api/admin/images", tags=["Image Management"])

# Emergent LLM Key for GPT Image 1
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "brightluxx")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# UAE-themed prompts - Ultra realistic, photographic style
CATEGORY_PROMPTS = {
    "indoor": "Ultra realistic photograph of a modern LED video wall installed in a luxury Dubai corporate lobby, showing colorful abstract digital art on screen, marble floors, indoor palm trees, Burj Khalifa visible through large windows, professional architectural photography, 8K resolution, natural lighting",
    "outdoor": "Ultra realistic photograph of a large LED billboard on Sheikh Zayed Road Dubai at sunset, displaying vibrant abstract colors, Burj Al Arab visible in background, palm trees, cars on highway, professional outdoor advertising photography, 8K resolution",
    "cob-microled": "Ultra realistic photograph of a premium MicroLED video wall in a Dubai executive boardroom, showing data visualization graphics, leather chairs, Dubai Marina waterfront visible through floor-to-ceiling windows, professional interior photography, 8K resolution",
    "transparent": "Ultra realistic photograph of a transparent LED display in a Dubai Mall luxury store window, showing fashion imagery, shoppers visible through glass, premium retail environment, professional commercial photography, 8K resolution",
    "flexible": "Ultra realistic photograph of a curved LED screen wrapped around a column in Abu Dhabi hotel lobby, displaying abstract art, Arabic architecture details, crystal chandelier, professional hospitality photography, 8K resolution",
    "all-in-one": "Ultra realistic photograph of an all-in-one LED display in a modern Dubai office meeting room, showing presentation graphics, professionals in meeting, city skyline through windows, professional corporate photography, 8K resolution",
    "cinema-led": "Ultra realistic photograph of a cinema LED screen in a Dubai movie theater, showing dramatic film scene, luxury recliner seats, dark theater ambiance, professional entertainment photography, 8K resolution",
    "sphere": "Ultra realistic photograph of an LED sphere installation in a Dubai mall atrium, displaying colorful patterns, shoppers below, modern architecture with glass ceiling, professional commercial photography, 8K resolution",
    "poster-totem": "Ultra realistic photograph of a digital LED totem in Dubai Airport terminal, showing wayfinding graphics, travelers with luggage, modern airport interior, professional travel photography, 8K resolution",
    "rental": "Ultra realistic photograph of a portable LED screen at an outdoor Dubai event, showing stage visuals, crowd watching, Palm Jumeirah in background, night scene, professional event photography, 8K resolution",
    "interactive": "Ultra realistic photograph of an interactive LED floor in a Dubai museum, children playing on colorful reactive display, modern educational space, professional lifestyle photography, 8K resolution",
    "virtual-production": "Ultra realistic photograph of a virtual production LED wall in a Dubai film studio, showing virtual backdrop, film crew and cameras, professional behind-the-scenes photography, 8K resolution",
    "digital-signage": "Ultra realistic photograph of digital signage LED displays in Dubai Metro station, showing wayfinding information, commuters walking, modern transit architecture, professional urban photography, 8K resolution",
    "default": "Ultra realistic photograph of a professional LED display in a modern Dubai commercial space, showing abstract digital art, contemporary Arabic interior design, professional commercial photography, 8K resolution"
}

class ImageGenerationRequest(BaseModel):
    product_slug: str
    custom_prompt: Optional[str] = None

class BulkImageRequest(BaseModel):
    category: Optional[str] = None
    limit: Optional[int] = 10

async def generate_image_openai(prompt: str) -> bytes:
    """Generate image using OpenAI GPT Image 1 (latest, most realistic)"""
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
