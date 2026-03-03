from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime, timezone
import uuid


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


class AdminPasswordChange(BaseModel):
    current_password: str
    new_password: str


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
