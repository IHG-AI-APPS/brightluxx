from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
import os
import json
import asyncio
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
technologies_col = db["technologies"]
applications_col = db["applications"]
case_studies_col = db["case_studies"]
updates_col = db["updates"]
resources_col = db["resources"]
leads_col = db["leads"]

# Pydantic Models
class Technology(BaseModel):
    name: str
    tagline: str
    slug: str
    category: str  # professional, outdoor, rental, creative, micro-led
    heroMedia: Dict[str, str]
    gallery: List[Dict[str, str]] = []
    keySpecs: List[Dict[str, str]] = []
    comparisonFields: Dict[str, Any] = {}
    description: str = ""
    generatedContent: Dict[str, Any] = {}
    seo: Dict[str, str] = {}
    featured: bool = False
    publishedAt: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.now)

class Application(BaseModel):
    name: str
    slug: str
    tagline: str
    description: str
    heroImage: str
    useCases: List[str] = []
    recommendedTech: List[str] = []  # technology slugs
    benefits: List[Dict[str, str]] = []
    featured: bool = False
    publishedAt: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.now)

class CaseStudy(BaseModel):
    title: str
    slug: str
    client: str
    location: str
    category: str  # retail, hospitality, corporate, events, etc.
    heroImage: str
    videoUrl: Optional[str] = None
    gallery: List[str] = []
    description: str
    metrics: List[Dict[str, str]] = []  # [{label: "Area", value: "500 sqm"}]
    technologies: List[str] = []  # tech slugs
    featured: bool = False
    publishedAt: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.now)

class Update(BaseModel):
    title: str
    slug: str
    category: str  # ise-launch, product, news
    excerpt: str
    content: str
    heroImage: str
    tags: List[str] = []
    publishedAt: datetime = Field(default_factory=datetime.now)
    createdAt: datetime = Field(default_factory=datetime.now)

class Resource(BaseModel):
    title: str
    slug: str
    type: str  # pdf, video, guide
    description: str
    thumbnail: str
    fileUrl: Optional[str] = None
    gated: bool = True
    createdAt: datetime = Field(default_factory=datetime.now)

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
    source: str = "contact_form"  # contact_form, resource_download, quote
    createdAt: datetime = Field(default_factory=datetime.now)

# Helper function to serialize MongoDB ObjectId
def serialize_doc(doc):
    if doc is None:
        return None
    doc["_id"] = str(doc["_id"])
    # Convert datetime to ISO string
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    return doc

# Routes
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "brightluxx-api"}

# Technologies
@app.get("/api/technologies")
async def get_technologies(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {"publishedAt": {"$ne": None}}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    cursor = technologies_col.find(query).sort("createdAt", -1)
    technologies = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"technologies": technologies}

@app.get("/api/technologies/{slug}")
async def get_technology(slug: str):
    tech = await technologies_col.find_one({"slug": slug, "publishedAt": {"$ne": None}})
    if not tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    return serialize_doc(tech)

# Applications
@app.get("/api/applications")
async def get_applications(featured: Optional[bool] = None):
    query = {"publishedAt": {"$ne": None}}
    if featured is not None:
        query["featured"] = featured
    
    cursor = applications_col.find(query).sort("createdAt", -1)
    applications = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"applications": applications}

@app.get("/api/applications/{slug}")
async def get_application(slug: str):
    app = await applications_col.find_one({"slug": slug, "publishedAt": {"$ne": None}})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return serialize_doc(app)

# Case Studies
@app.get("/api/case-studies")
async def get_case_studies(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {"publishedAt": {"$ne": None}}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    cursor = case_studies_col.find(query).sort("publishedAt", -1)
    case_studies = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"caseStudies": case_studies}

@app.get("/api/case-studies/{slug}")
async def get_case_study(slug: str):
    case = await case_studies_col.find_one({"slug": slug, "publishedAt": {"$ne": None}})
    if not case:
        raise HTTPException(status_code=404, detail="Case study not found")
    return serialize_doc(case)

# Updates (ISE News)
@app.get("/api/updates")
async def get_updates(category: Optional[str] = None, limit: int = 10):
    query = {}
    if category:
        query["category"] = category
    
    cursor = updates_col.find(query).sort("publishedAt", -1).limit(limit)
    updates = [serialize_doc(doc) for doc in await cursor.to_list(length=limit)]
    return {"updates": updates}

@app.get("/api/updates/{slug}")
async def get_update(slug: str):
    update = await updates_col.find_one({"slug": slug})
    if not update:
        raise HTTPException(status_code=404, detail="Update not found")
    return serialize_doc(update)

# Resources
@app.get("/api/resources")
async def get_resources():
    cursor = resources_col.find({}).sort("createdAt", -1)
    resources = [serialize_doc(doc) for doc in await cursor.to_list(length=100)]
    return {"resources": resources}

# Leads
@app.post("/api/leads")
async def create_lead(lead: Lead):
    lead_dict = lead.dict()
    result = await leads_col.insert_one(lead_dict)
    
    # Mock email send (will be replaced with real SMTP later)
    print(f"📧 Mock email sent: New lead from {lead.name} ({lead.email})")
    print(f"   Company: {lead.company}")
    print(f"   Application: {lead.application}")
    print(f"   Message: {lead.message}")
    
    return {
        "success": True,
        "message": "Thank you! We'll contact you within 2 hours.",
        "leadId": str(result.inserted_id)
    }

# Search
@app.get("/api/search")
async def search(q: str):
    results = {
        "technologies": [],
        "applications": [],
        "caseStudies": [],
        "updates": []
    }
    
    # Simple text search (can be enhanced with MongoDB text index)
    tech_cursor = technologies_col.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"tagline": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ],
        "publishedAt": {"$ne": None}
    }).limit(5)
    results["technologies"] = [serialize_doc(doc) for doc in await tech_cursor.to_list(length=5)]
    
    app_cursor = applications_col.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ],
        "publishedAt": {"$ne": None}
    }).limit(5)
    results["applications"] = [serialize_doc(doc) for doc in await app_cursor.to_list(length=5)]
    
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)