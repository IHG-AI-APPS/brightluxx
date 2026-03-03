"""Download all generated/stock images, optimize them, and update MongoDB."""
import asyncio
import os
import uuid
import io
import requests
from pathlib import Path
from PIL import Image as PILImage
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

UPLOAD_DIR = Path("/app/frontend/public/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# ─── Generated product images (slug -> URL) ───
PRODUCT_IMAGES = {
    "indoor_led_module": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/6b20d5a34eee2f432d5b7902c46ced43fec1c5700db2f3bbbf338436e84af0d0.png",
    "outdoor_led_screen": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/24fdd331b30184a6dba9d35d161d0294b903c9640b962b3fae190ee5f4dd2b94.png",
    "flexible_led_curved": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/7cab28fd93547c4481b0fa272987cbfe8a610e506d112bcf42a7b6037075d069.png",
    "transparent_led_glass": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/9b4aadc8042c34fb11125fda158738d1e0b81f6895a4c31af20c2e45982d29d1.png",
    "sphere_led_display": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/6f5a80e6992a837ec26260ecf5d811668278b77c02107a76780e2cbda8d726e1.png",
    "road_signal_led": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/91304cfe16f888cbab20d3d55aec782ae9cd1d991f34bc03052740c07e0094bb.png",
    "interactive_floor_led": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/b2fb6cce9486fbc07c72152ce370e56f14c7af7d3567aa1171a23e8d9c16fc43.png",
    "microled_control_room": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/0eaf91ff8074d36634deb5c75801f5b7050e8b02e9a472a2d99d9a8cd0cf40c0.png",
}

PROJECT_IMAGES = {
    "project_retail_store": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/152c8739e72c849e35420f684cc81c78819e9193f7f26447a12322f63dcfb03f.png",
    "project_exhibition": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/b3d91eda2f4136b4e4d15e1172647705d9a5ec98c42737ea4cfcc3f64bcc63ba.png",
    "project_corporate_office": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/8403f122ebd5e508cc17c4b1dd07bee54d32a498c03bf2c3c7b2e70b4365fd9d.png",
    "project_shopfront": "https://static.prod-images.emergentagent.com/jobs/570a2952-09bd-41f5-bdd1-0f8ddbff264e/images/db7061fe6c5c8246126232d3e69afc234348c8f6ecd00da88e7c4daaf89960e7.png",
}

# Stock image from Unsplash for digital signage
STOCK_IMAGES = {
    "stock_retail_digital": "https://images.unsplash.com/photo-1764795850248-97a5e986b242?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIwc2lnbmFnZSUyMHNjcmVlbiUyMGRpc3BsYXl8ZW58MHx8fHwxNzcyNTcyMjIyfDA&ixlib=rb-4.1.0&q=85",
    "stock_billboard_night": "https://images.unsplash.com/photo-1762417419967-d5ccd2ebe463?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBiaWxsYm9hcmQlMjBvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBuaWdodHxlbnwwfHx8fDE3NzI1NzIyMjN8MA&ixlib=rb-4.1.0&q=85",
    "stock_billboard_city": "https://images.unsplash.com/photo-1762417420551-2fec32ed3595?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxMRUQlMjBiaWxsYm9hcmQlMjBvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBuaWdodHxlbnwwfHx8fDE3NzI1NzIyMjN8MA&ixlib=rb-4.1.0&q=85",
}


def download_and_optimize(url, slug):
    """Download image, save locally, create optimized WebP variant."""
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        content = resp.content

        # Save original
        ext = ".jpg" if "unsplash" in url or "pexels" in url else ".png"
        filename = f"{slug}{ext}"
        filepath = UPLOAD_DIR / filename
        with open(filepath, "wb") as f:
            f.write(content)

        # Create optimized WebP
        img = PILImage.open(io.BytesIO(content))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        # Resize to max 1200px wide for web
        max_w = 1200
        if img.width > max_w:
            ratio = max_w / img.width
            img = img.resize((max_w, int(img.height * ratio)), PILImage.LANCZOS)

        webp_name = f"{slug}.webp"
        webp_path = UPLOAD_DIR / webp_name
        img.save(str(webp_path), "WEBP", quality=82, method=4)

        # Thumbnail
        thumb = img.copy()
        thumb.thumbnail((400, 400), PILImage.LANCZOS)
        thumb_name = f"{slug}_thumb.webp"
        thumb.save(str(UPLOAD_DIR / thumb_name), "WEBP", quality=75, method=4)

        print(f"  OK: {slug} -> {webp_name} ({os.path.getsize(webp_path)} bytes)")
        return f"/uploads/{webp_name}"
    except Exception as e:
        print(f"  FAIL: {slug} -> {e}")
        return ""


# Category -> image slug mapping for products
CATEGORY_IMAGE_MAP = {
    "indoor": "indoor_led_module",
    "fine-pitch": "indoor_led_module",
    "cob-microled": "microled_control_room",
    "outdoor": "outdoor_led_screen",
    "rental": "outdoor_led_screen",
    "flexible": "flexible_led_curved",
    "transparent": "transparent_led_glass",
    "sphere": "sphere_led_display",
    "naked-eye-3d": "sphere_led_display",
    "road-signal": "road_signal_led",
    "interactive": "interactive_floor_led",
    "floor-led": "interactive_floor_led",
    "virtual-production": "microled_control_room",
    "cinema": "microled_control_room",
    "all-in-one": "indoor_led_module",
    "conference": "indoor_led_module",
    "poster": "indoor_led_module",
    "sky-screen": "outdoor_led_screen",
}

# Sector -> image slug mapping for projects
SECTOR_IMAGE_MAP = {
    "retail": "project_shopfront",
    "corporate": "project_corporate_office",
    "hospitality": "project_shopfront",
    "exhibitions": "project_exhibition",
    "government": "project_retail_store",
    "healthcare": "project_retail_store",
}


async def main():
    # 1. Download all images
    print("=== Downloading Product Images ===")
    product_local = {}
    for slug, url in PRODUCT_IMAGES.items():
        local_url = download_and_optimize(url, slug)
        product_local[slug] = local_url

    print("\n=== Downloading Project Images ===")
    project_local = {}
    for slug, url in PROJECT_IMAGES.items():
        local_url = download_and_optimize(url, slug)
        project_local[slug] = local_url

    print("\n=== Downloading Stock Images ===")
    stock_local = {}
    for slug, url in STOCK_IMAGES.items():
        local_url = download_and_optimize(url, slug)
        stock_local[slug] = local_url

    # 2. Update products in MongoDB
    print("\n=== Updating Product Images in DB ===")
    updated_products = 0
    async for product in db.products.find({"$or": [{"image_url": ""}, {"image_url": {"$exists": False}}]}):
        category = product.get("category", "")
        slug = CATEGORY_IMAGE_MAP.get(category, "indoor_led_module")
        local_url = product_local.get(slug, "")
        if local_url:
            await db.products.update_one(
                {"_id": product["_id"]},
                {"$set": {"image_url": local_url}}
            )
            updated_products += 1
    print(f"  Updated {updated_products} products with images")

    # Also update products that already had external URLs (convert to local)
    async for product in db.products.find({"image_url": {"$regex": "^http"}}):
        category = product.get("category", "")
        slug = CATEGORY_IMAGE_MAP.get(category, "indoor_led_module")
        local_url = product_local.get(slug, "")
        if local_url:
            await db.products.update_one(
                {"_id": product["_id"]},
                {"$set": {"image_url": local_url}}
            )
            updated_products += 1
    print(f"  Total products with local images: {updated_products}")

    # 3. Update projects in MongoDB
    print("\n=== Updating Project Images in DB ===")
    updated_projects = 0
    async for project in db.projects.find():
        sector = project.get("sector", "retail")
        slug = SECTOR_IMAGE_MAP.get(sector, "project_shopfront")
        local_url = project_local.get(slug, "")
        if local_url:
            await db.projects.update_one(
                {"_id": project["_id"]},
                {"$set": {"image_url": local_url}}
            )
            updated_projects += 1
    print(f"  Updated {updated_projects} projects with images")

    # 4. Update inspirations with stock images
    print("\n=== Updating Inspirations with local images ===")
    updated_insp = 0
    inspiration_images = list(product_local.values()) + list(stock_local.values())
    idx = 0
    async for insp in db.inspirations.find({"$or": [{"image_url": ""}, {"image_url": {"$regex": "^http"}}]}):
        local_url = inspiration_images[idx % len(inspiration_images)]
        if local_url:
            await db.inspirations.update_one(
                {"_id": insp["_id"]},
                {"$set": {"image_url": local_url}}
            )
            updated_insp += 1
            idx += 1
    print(f"  Updated {updated_insp} inspirations with images")

    # Summary
    print("\n=== Summary ===")
    total_files = len(list(UPLOAD_DIR.glob("*.webp")))
    total_size = sum(f.stat().st_size for f in UPLOAD_DIR.glob("*.webp"))
    print(f"  WebP files: {total_files}")
    print(f"  Total size: {total_size / 1024:.0f} KB")
    print(f"  Products updated: {updated_products}")
    print(f"  Projects updated: {updated_projects}")
    print(f"  Inspirations updated: {updated_insp}")

asyncio.run(main())
