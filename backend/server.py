from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import os
import uuid
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

# --- Pydantic Models ---

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_code: str  # BL-XXXX
    name: str
    slug: str
    category: str  # indoor, outdoor, rental, creative, micro-led, transparent
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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Inspiration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    category: str  # retail, hospitality, corporate, events, outdoor, art
    description: str = ""
    image_url: str
    featured: bool = False
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

# Helper
def serialize_doc(doc):
    if doc is None:
        return None
    doc["_id"] = str(doc["_id"])
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    return doc

# --- Routes ---

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "brightluxx-api"}

# Products
@app.get("/api/products")
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None, search: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"product_code": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
        ]
    cursor = products_col.find(query).sort("created_at", -1)
    products = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"products": products}

@app.get("/api/products/{slug}")
async def get_product(slug: str):
    product = await products_col.find_one({"slug": slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return serialize_doc(product)

# Inspirations
@app.get("/api/inspirations")
async def get_inspirations(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    cursor = inspirations_col.find(query).sort("created_at", -1)
    inspirations = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"inspirations": inspirations}

# Projects
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

# Leads
@app.post("/api/leads")
async def create_lead(lead: Lead):
    lead_dict = lead.dict()
    lead_dict["id"] = str(uuid.uuid4())
    result = await leads_col.insert_one(lead_dict)
    print(f"New lead from {lead.name} ({lead.email}) - {lead.application}")
    return {
        "success": True,
        "message": "Thank you! We'll contact you within 2 hours.",
        "leadId": str(result.inserted_id)
    }

# Search
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
