from fastapi import APIRouter, HTTPException, Request
from typing import Optional, List

from database import products_col, inspirations_col, projects_col, leads_col
from models import Lead
from utils import serialize_doc, lead_limiter, get_client_ip
from email_service import notify_new_lead
import uuid

router = APIRouter()


@router.get("/api/products")
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None, trending: Optional[bool] = None, new_arrival: Optional[bool] = None, search: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    if trending is not None:
        query["trending"] = trending
    if new_arrival is not None:
        query["new_arrival"] = new_arrival
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"product_code": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"application": {"$regex": search, "$options": "i"}},
        ]
    cursor = products_col.find(query).sort("created_at", -1)
    products = [serialize_doc(doc) for doc in await cursor.to_list(length=200)]
    return {"products": products}


@router.get("/api/products/categories")
async def get_product_categories():
    pipeline = [{"$group": {"_id": "$category", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]
    categories = []
    async for doc in products_col.aggregate(pipeline):
        categories.append({"value": doc["_id"], "label": doc["_id"].replace("-", " ").title(), "count": doc["count"]})
    return {"categories": categories}


@router.post("/api/products/compare")
async def compare_products(product_codes: List[str]):
    if len(product_codes) < 2 or len(product_codes) > 4:
        raise HTTPException(status_code=400, detail="Select 2-4 products to compare")
    products = []
    for code in product_codes:
        product = await products_col.find_one({"product_code": code})
        if product:
            products.append(serialize_doc(product))
    return {"products": products}


@router.post("/api/calculator/screen-size")
async def calculate_screen_size(data: dict):
    width = data.get("venue_width", 10)
    height = data.get("venue_height", 3)
    viewing_distance = data.get("viewing_distance", 5)
    content_type = data.get("content_type", "video")
    indoor = data.get("indoor", True)
    recommended_pitch = round(viewing_distance / 1.5, 2)
    if content_type == "text":
        recommended_pitch = min(recommended_pitch, 1.5)
    elif content_type == "mixed":
        recommended_pitch = min(recommended_pitch, 2.5)
    available_pitches = [0.4, 0.6, 0.9, 1.2, 1.5, 1.9, 2.5, 2.9, 3.9, 4.7, 6.8, 7.8]
    closest_pitch = min(available_pitches, key=lambda x: abs(x - recommended_pitch))
    screen_width = min(width * 0.85, width - 0.5)
    screen_height = min(height * 0.7, height - 0.5)
    screen_area = round(screen_width * screen_height, 1)
    pixels_per_m = round(1000 / closest_pitch)
    res_w = int(screen_width * pixels_per_m)
    res_h = int(screen_height * pixels_per_m)
    brightness = "600-1,200 nits" if indoor else "5,000-10,000 nits"
    pitch_query = {"pixel_pitch": {"$regex": str(closest_pitch)}}
    matching = [serialize_doc(doc) for doc in await products_col.find(pitch_query).to_list(length=5)]
    return {
        "recommended_pitch": closest_pitch,
        "screen_width": round(screen_width, 1),
        "screen_height": round(screen_height, 1),
        "screen_area": screen_area,
        "resolution": f"{res_w} x {res_h}",
        "brightness": brightness,
        "matching_products": matching,
        "tips": [
            f"At {viewing_distance}m viewing distance, {closest_pitch}mm pitch provides optimal clarity.",
            f"Screen area: {screen_area} sqm ({round(screen_width, 1)}m x {round(screen_height, 1)}m).",
            f"Recommended brightness: {brightness} for {'indoor' if indoor else 'outdoor'} use."
        ]
    }


@router.get("/api/products/{slug}")
async def get_product(slug: str):
    product = await products_col.find_one({"slug": slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return serialize_doc(product)


@router.get("/api/inspirations")
async def get_inspirations(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    cursor = inspirations_col.find(query).sort("created_at", -1)
    inspirations = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"inspirations": inspirations}


@router.get("/api/projects")
async def get_projects(sector: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if sector:
        query["sector"] = sector
    if featured is not None:
        query["featured"] = featured
    cursor = projects_col.find(query).sort("created_at", -1)
    projects = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"projects": projects}


@router.get("/api/projects/{slug}")
async def get_project(slug: str):
    project = await projects_col.find_one({"slug": slug})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return serialize_doc(project)


@router.post("/api/leads")
async def create_lead(lead: Lead, request: Request):
    client_ip = get_client_ip(request)
    if not lead_limiter.check(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please wait a moment.")
    lead_dict = lead.dict()
    lead_dict["id"] = str(uuid.uuid4())
    lead_dict["status"] = "new"
    lead_dict["notes"] = ""
    result = await leads_col.insert_one(lead_dict)
    print(f"New lead from {lead.name} ({lead.email}) - {lead.application}")

    # Send email notification (fire-and-forget)
    try:
        await notify_new_lead({**lead_dict, "source": "contact_form"})
    except Exception:
        pass

    return {
        "success": True,
        "message": "Thank you! We'll contact you within 2 hours.",
        "leadId": str(result.inserted_id)
    }


@router.get("/api/search")
async def search(q: str):
    results = {"products": [], "inspirations": [], "projects": []}
    prod_cursor = products_col.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"product_code": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
        ]
    }).limit(5)
    results["products"] = [serialize_doc(doc) for doc in await prod_cursor.to_list(length=5)]
    return results
