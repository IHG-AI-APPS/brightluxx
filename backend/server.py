from fastapi import FastAPI, HTTPException, Depends, Header, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from passlib.context import CryptContext
from jose import jwt, JWTError
import os
import uuid
import re
import shutil
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client["brightluxx"]

# Collections
products_col = db["products"]
inspirations_col = db["inspirations"]
projects_col = db["projects"]
leads_col = db["leads"]
admins_col = db["admins"]

# Auth config
SECRET_KEY = os.getenv("JWT_SECRET", "brightluxx-admin-secret-key-2025-change-in-production")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Pydantic Models ---

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_code: str
    name: str
    slug: str
    category: str
    tagline: str = ""
    description: str = ""
    pixel_pitch: str = ""
    resolution: str = ""
    brightness: str = ""
    application: str = ""
    key_specs: List[Dict[str, str]] = []
    image_url: str = ""
    gallery: List[str] = []
    featured: bool = False
    trending: bool = False
    new_arrival: bool = False
    status: str = "published"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Inspiration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    category: str
    description: str = ""
    image_url: str
    featured: bool = False
    status: str = "published"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    client_name: str = ""
    location: str = ""
    sector: str = ""
    screen_size: str = ""
    description: str = ""
    image_url: str
    gallery: List[str] = []
    technologies_used: List[str] = []
    metrics: List[Dict[str, str]] = []
    featured: bool = False
    status: str = "published"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Lead(BaseModel):
    name: str
    company: Optional[str] = None
    email: str
    phone: str
    city: str
    application: str
    timeline: Optional[str] = None
    budget: Optional[str] = None
    message: Optional[str] = None
    source: str = "contact_form"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminProductCreate(BaseModel):
    product_code: str
    name: str
    slug: Optional[str] = None
    category: str
    tagline: str = ""
    description: str = ""
    pixel_pitch: str = ""
    resolution: str = ""
    brightness: str = ""
    application: str = ""
    key_specs: List[Dict[str, str]] = []
    image_url: str = ""
    gallery: List[str] = []
    featured: bool = False
    trending: bool = False
    new_arrival: bool = False
    status: str = "published"

class AdminInspirationCreate(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    description: str = ""
    image_url: str = ""
    featured: bool = False
    status: str = "published"

class AdminProjectCreate(BaseModel):
    title: str
    slug: Optional[str] = None
    client_name: str = ""
    location: str = ""
    sector: str = ""
    screen_size: str = ""
    description: str = ""
    image_url: str = ""
    gallery: List[str] = []
    technologies_used: List[str] = []
    metrics: List[Dict[str, str]] = []
    featured: bool = False
    status: str = "published"

# Helpers
def serialize_doc(doc):
    if doc is None:
        return None
    doc["_id"] = str(doc["_id"])
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    return doc

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text

def create_token(data: dict):
    return jwt.encode({**data, "exp": datetime.now(timezone.utc).timestamp() + 86400}, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        admin = await admins_col.find_one({"email": payload.get("email")})
        if not admin:
            raise HTTPException(status_code=401, detail="Admin not found")
        return serialize_doc(admin)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Seed admin on startup
@app.on_event("startup")
async def seed_admin():
    existing = await admins_col.find_one({"email": "admin@brightluxx.com"})
    if not existing:
        await admins_col.insert_one({
            "id": str(uuid.uuid4()),
            "email": "admin@brightluxx.com",
            "password": pwd_context.hash("brightluxx2025"),
            "name": "Admin",
            "role": "super_admin",
            "created_at": datetime.now(timezone.utc)
        })
        print("Admin user seeded: admin@brightluxx.com")

# --- Public Routes ---

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "brightluxx-api"}

# Products (public)
@app.get("/api/products")
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

@app.get("/api/products/categories")
async def get_product_categories():
    pipeline = [{"$group": {"_id": "$category", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]
    categories = []
    async for doc in products_col.aggregate(pipeline):
        categories.append({"value": doc["_id"], "label": doc["_id"].replace("-", " ").title(), "count": doc["count"]})
    return {"categories": categories}

@app.post("/api/products/compare")
async def compare_products(product_codes: List[str]):
    if len(product_codes) < 2 or len(product_codes) > 4:
        raise HTTPException(status_code=400, detail="Select 2-4 products to compare")
    products = []
    for code in product_codes:
        product = await products_col.find_one({"product_code": code})
        if product:
            products.append(serialize_doc(product))
    return {"products": products}

@app.post("/api/calculator/screen-size")
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

@app.get("/api/products/{slug}")
async def get_product(slug: str):
    product = await products_col.find_one({"slug": slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return serialize_doc(product)

# Inspirations (public)
@app.get("/api/inspirations")
async def get_inspirations(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    cursor = inspirations_col.find(query).sort("created_at", -1)
    inspirations = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"inspirations": inspirations}

# Projects (public)
@app.get("/api/projects")
async def get_projects(sector: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if sector:
        query["sector"] = sector
    if featured is not None:
        query["featured"] = featured
    cursor = projects_col.find(query).sort("created_at", -1)
    projects = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"projects": projects}

@app.get("/api/projects/{slug}")
async def get_project(slug: str):
    project = await projects_col.find_one({"slug": slug})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return serialize_doc(project)

# Leads (public)
@app.post("/api/leads")
async def create_lead(lead: Lead):
    lead_dict = lead.dict()
    lead_dict["id"] = str(uuid.uuid4())
    lead_dict["status"] = "new"
    lead_dict["notes"] = ""
    result = await leads_col.insert_one(lead_dict)
    print(f"New lead from {lead.name} ({lead.email}) - {lead.application}")
    return {
        "success": True,
        "message": "Thank you! We'll contact you within 2 hours.",
        "leadId": str(result.inserted_id)
    }

# Search (public)
@app.get("/api/search")
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

# ==================== ADMIN ROUTES ====================

# Auth
@app.post("/api/admin/login")
async def admin_login(creds: AdminLogin):
    admin = await admins_col.find_one({"email": creds.email})
    if not admin or not pwd_context.verify(creds.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"email": admin["email"], "role": admin.get("role", "admin")})
    return {"token": token, "admin": {"email": admin["email"], "name": admin.get("name", "Admin"), "role": admin.get("role", "admin")}}

@app.get("/api/admin/me")
async def admin_me(admin=Depends(get_current_admin)):
    return {"email": admin["email"], "name": admin.get("name", "Admin"), "role": admin.get("role", "super_admin")}

# Dashboard Stats
@app.get("/api/admin/stats")
async def admin_stats(admin=Depends(get_current_admin)):
    product_count = await products_col.count_documents({})
    inspiration_count = await inspirations_col.count_documents({})
    project_count = await projects_col.count_documents({})
    lead_count = await leads_col.count_documents({})
    new_leads = await leads_col.count_documents({"status": "new"})

    # Category breakdown
    cat_pipeline = [{"$group": {"_id": "$category", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]
    categories = []
    async for doc in products_col.aggregate(cat_pipeline):
        categories.append({"category": doc["_id"], "count": doc["count"]})

    # Recent leads
    recent_leads_cursor = leads_col.find().sort("created_at", -1).limit(5)
    recent_leads = [serialize_doc(doc) for doc in await recent_leads_cursor.to_list(length=5)]

    # Recent products
    recent_products_cursor = products_col.find().sort("created_at", -1).limit(5)
    recent_products = [serialize_doc(doc) for doc in await recent_products_cursor.to_list(length=5)]

    # Lead status breakdown
    lead_pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    lead_statuses = []
    async for doc in leads_col.aggregate(lead_pipeline):
        lead_statuses.append({"status": doc["_id"] or "new", "count": doc["count"]})

    return {
        "products": product_count,
        "inspirations": inspiration_count,
        "projects": project_count,
        "leads": lead_count,
        "new_leads": new_leads,
        "categories": categories,
        "lead_statuses": lead_statuses,
        "recent_leads": recent_leads,
        "recent_products": recent_products
    }

# --- Admin Products CRUD ---
@app.get("/api/admin/products")
async def admin_get_products(category: Optional[str] = None, search: Optional[str] = None, status: Optional[str] = None, page: int = 1, limit: int = 50, admin=Depends(get_current_admin)):
    query = {}
    if category:
        query["category"] = category
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"product_code": {"$regex": search, "$options": "i"}},
        ]
    total = await products_col.count_documents(query)
    skip = (page - 1) * limit
    cursor = products_col.find(query).sort("created_at", -1).skip(skip).limit(limit)
    products = [serialize_doc(doc) for doc in await cursor.to_list(length=limit)]
    return {"products": products, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@app.post("/api/admin/products")
async def admin_create_product(data: AdminProductCreate, admin=Depends(get_current_admin)):
    product_dict = data.dict()
    product_dict["id"] = str(uuid.uuid4())
    product_dict["slug"] = data.slug or slugify(data.name)
    product_dict["created_at"] = datetime.now(timezone.utc)
    # Check unique product_code
    existing = await products_col.find_one({"product_code": data.product_code})
    if existing:
        raise HTTPException(status_code=400, detail=f"Product code {data.product_code} already exists")
    await products_col.insert_one(product_dict)
    return {"success": True, "product": serialize_doc(await products_col.find_one({"id": product_dict["id"]}))}

@app.put("/api/admin/products/{product_id}")
async def admin_update_product(product_id: str, data: AdminProductCreate, admin=Depends(get_current_admin)):
    update_dict = data.dict(exclude_unset=True)
    if data.slug:
        update_dict["slug"] = data.slug
    elif data.name:
        update_dict["slug"] = slugify(data.name)
    update_dict["updated_at"] = datetime.now(timezone.utc)
    result = await products_col.update_one({"id": product_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    updated = await products_col.find_one({"id": product_id})
    return {"success": True, "product": serialize_doc(updated)}

@app.delete("/api/admin/products/{product_id}")
async def admin_delete_product(product_id: str, admin=Depends(get_current_admin)):
    result = await products_col.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}

# Bulk delete
@app.post("/api/admin/products/bulk-delete")
async def admin_bulk_delete_products(ids: List[str], admin=Depends(get_current_admin)):
    result = await products_col.delete_many({"id": {"$in": ids}})
    return {"success": True, "deleted": result.deleted_count}

# --- Admin Inspirations CRUD ---
@app.get("/api/admin/inspirations")
async def admin_get_inspirations(category: Optional[str] = None, search: Optional[str] = None, page: int = 1, limit: int = 50, admin=Depends(get_current_admin)):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [{"title": {"$regex": search, "$options": "i"}}]
    total = await inspirations_col.count_documents(query)
    skip = (page - 1) * limit
    cursor = inspirations_col.find(query).sort("created_at", -1).skip(skip).limit(limit)
    items = [serialize_doc(doc) for doc in await cursor.to_list(length=limit)]
    return {"inspirations": items, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@app.post("/api/admin/inspirations")
async def admin_create_inspiration(data: AdminInspirationCreate, admin=Depends(get_current_admin)):
    item = data.dict()
    item["id"] = str(uuid.uuid4())
    item["slug"] = data.slug or slugify(data.title)
    item["created_at"] = datetime.now(timezone.utc)
    await inspirations_col.insert_one(item)
    return {"success": True, "inspiration": serialize_doc(await inspirations_col.find_one({"id": item["id"]}))}

@app.put("/api/admin/inspirations/{item_id}")
async def admin_update_inspiration(item_id: str, data: AdminInspirationCreate, admin=Depends(get_current_admin)):
    update = data.dict(exclude_unset=True)
    update["slug"] = data.slug or slugify(data.title)
    update["updated_at"] = datetime.now(timezone.utc)
    result = await inspirations_col.update_one({"id": item_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inspiration not found")
    return {"success": True, "inspiration": serialize_doc(await inspirations_col.find_one({"id": item_id}))}

@app.delete("/api/admin/inspirations/{item_id}")
async def admin_delete_inspiration(item_id: str, admin=Depends(get_current_admin)):
    result = await inspirations_col.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inspiration not found")
    return {"success": True}

# --- Admin Projects CRUD ---
@app.get("/api/admin/projects")
async def admin_get_projects(sector: Optional[str] = None, search: Optional[str] = None, page: int = 1, limit: int = 50, admin=Depends(get_current_admin)):
    query = {}
    if sector:
        query["sector"] = sector
    if search:
        query["$or"] = [{"title": {"$regex": search, "$options": "i"}}, {"client_name": {"$regex": search, "$options": "i"}}]
    total = await projects_col.count_documents(query)
    skip = (page - 1) * limit
    cursor = projects_col.find(query).sort("created_at", -1).skip(skip).limit(limit)
    items = [serialize_doc(doc) for doc in await cursor.to_list(length=limit)]
    return {"projects": items, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@app.post("/api/admin/projects")
async def admin_create_project(data: AdminProjectCreate, admin=Depends(get_current_admin)):
    item = data.dict()
    item["id"] = str(uuid.uuid4())
    item["slug"] = data.slug or slugify(data.title)
    item["created_at"] = datetime.now(timezone.utc)
    await projects_col.insert_one(item)
    return {"success": True, "project": serialize_doc(await projects_col.find_one({"id": item["id"]}))}

@app.put("/api/admin/projects/{item_id}")
async def admin_update_project(item_id: str, data: AdminProjectCreate, admin=Depends(get_current_admin)):
    update = data.dict(exclude_unset=True)
    update["slug"] = data.slug or slugify(data.title)
    update["updated_at"] = datetime.now(timezone.utc)
    result = await projects_col.update_one({"id": item_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"success": True, "project": serialize_doc(await projects_col.find_one({"id": item_id}))}

@app.delete("/api/admin/projects/{item_id}")
async def admin_delete_project(item_id: str, admin=Depends(get_current_admin)):
    result = await projects_col.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"success": True}

# --- Admin Leads ---
@app.get("/api/admin/leads")
async def admin_get_leads(status: Optional[str] = None, search: Optional[str] = None, page: int = 1, limit: int = 50, admin=Depends(get_current_admin)):
    query = {}
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"company": {"$regex": search, "$options": "i"}},
        ]
    total = await leads_col.count_documents(query)
    skip = (page - 1) * limit
    cursor = leads_col.find(query).sort("created_at", -1).skip(skip).limit(limit)
    items = [serialize_doc(doc) for doc in await cursor.to_list(length=limit)]
    return {"leads": items, "total": total, "page": page, "pages": (total + limit - 1) // limit}

@app.put("/api/admin/leads/{lead_id}")
async def admin_update_lead(lead_id: str, data: dict, admin=Depends(get_current_admin)):
    allowed = {"status", "notes"}
    update = {k: v for k, v in data.items() if k in allowed}
    update["updated_at"] = datetime.now(timezone.utc)
    result = await leads_col.update_one({"id": lead_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True, "lead": serialize_doc(await leads_col.find_one({"id": lead_id}))}

@app.delete("/api/admin/leads/{lead_id}")
async def admin_delete_lead(lead_id: str, admin=Depends(get_current_admin)):
    result = await leads_col.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True}

# Export
@app.get("/api/admin/export/{collection}")
async def admin_export(collection: str, admin=Depends(get_current_admin)):
    col_map = {"products": products_col, "inspirations": inspirations_col, "projects": projects_col, "leads": leads_col}
    col = col_map.get(collection)
    if col is None:
        raise HTTPException(status_code=400, detail="Invalid collection")
    cursor = col.find().sort("created_at", -1)
    items = [serialize_doc(doc) for doc in await cursor.to_list(length=1000)]
    return {"data": items, "count": len(items)}

# Import
@app.post("/api/admin/import/{collection}")
async def admin_import(collection: str, data: List[dict], admin=Depends(get_current_admin)):
    col_map = {"products": products_col, "inspirations": inspirations_col, "projects": projects_col}
    col = col_map.get(collection)
    if col is None:
        raise HTTPException(status_code=400, detail="Invalid collection")
    imported = 0
    for item in data:
        if "id" not in item:
            item["id"] = str(uuid.uuid4())
        if "created_at" not in item:
            item["created_at"] = datetime.now(timezone.utc)
        try:
            await col.insert_one(item)
            imported += 1
        except Exception as e:
            print(f"Import error: {e}")
    return {"success": True, "imported": imported}

# File Upload
UPLOAD_DIR = Path("/app/frontend/public/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@app.post("/api/admin/upload")
async def admin_upload_file(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    # Validate extension
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Accepted: {', '.join(ALLOWED_EXTENSIONS)}")

    # Validate size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File too large. Max size: {MAX_FILE_SIZE // (1024*1024)}MB")

    # Generate unique filename
    unique_name = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '-')}"
    file_path = UPLOAD_DIR / unique_name

    # Save file
    with open(file_path, "wb") as f:
        f.write(content)

    # Return public URL path
    public_url = f"/uploads/{unique_name}"
    return {
        "success": True,
        "url": public_url,
        "filename": unique_name,
        "size": len(content),
        "content_type": file.content_type
    }

@app.post("/api/admin/upload/multiple")
async def admin_upload_multiple(files: List[UploadFile] = File(...), admin=Depends(get_current_admin)):
    uploaded = []
    for file in files:
        ext = Path(file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            continue
        content = await file.read()
        if len(content) > MAX_FILE_SIZE:
            continue
        unique_name = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '-')}"
        file_path = UPLOAD_DIR / unique_name
        with open(file_path, "wb") as f:
            f.write(content)
        uploaded.append({
            "url": f"/uploads/{unique_name}",
            "filename": unique_name,
            "size": len(content),
            "original_name": file.filename
        })
    return {"success": True, "uploaded": uploaded, "count": len(uploaded)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
