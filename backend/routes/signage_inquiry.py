from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timezone
from database import leads_col
from email_service import notify_new_lead

router = APIRouter(prefix="/api")


class SignageInquiryRequest(BaseModel):
    # Contact Info
    name: str
    company: str = ""
    email: str
    phone: str = ""
    
    # Signage Details
    signage_type: str  # channel-letters, menu-boards, wayfinding, etc.
    quantity: str = ""
    
    # For Channel Letters
    letter_height: str = ""  # 10-24", 24-48", 48-72", 72"+
    illumination: str = ""  # front-lit, halo-lit, dual-lit, neon-style, non-illuminated
    material: str = ""  # aluminum-acrylic, stainless-steel, bronze, painted-metal
    
    # For Menu Boards / Digital Signage
    display_size: str = ""  # 32", 43", 55", 65", 75"+, video-wall
    
    # General
    location: str = ""  # indoor, outdoor, both
    installation_address: str = ""
    timeline: str = ""  # urgent, 1-2-weeks, 1-month, flexible
    budget_range: str = ""  # under-5k, 5k-15k, 15k-50k, 50k+
    project_brief: str = ""


@router.post("/signage-inquiry")
async def signage_inquiry(req: SignageInquiryRequest):
    # Build detailed message for email
    details = []
    details.append(f"Signage Type: {req.signage_type}")
    if req.quantity:
        details.append(f"Quantity: {req.quantity}")
    if req.letter_height:
        details.append(f"Letter Height: {req.letter_height}")
    if req.illumination:
        details.append(f"Illumination: {req.illumination}")
    if req.material:
        details.append(f"Material: {req.material}")
    if req.display_size:
        details.append(f"Display Size: {req.display_size}")
    if req.location:
        details.append(f"Location: {req.location}")
    if req.installation_address:
        details.append(f"Installation Address: {req.installation_address}")
    if req.timeline:
        details.append(f"Timeline: {req.timeline}")
    if req.budget_range:
        details.append(f"Budget Range: {req.budget_range}")
    if req.project_brief:
        details.append(f"Project Brief: {req.project_brief}")
    
    message = "\n".join(details)
    
    lead = {
        "name": req.name,
        "company": req.company,
        "email": req.email,
        "phone": req.phone,
        "message": message,
        "source": "signage_inquiry",
        "signage_type": req.signage_type,
        "quantity": req.quantity,
        "letter_height": req.letter_height,
        "illumination": req.illumination,
        "material": req.material,
        "display_size": req.display_size,
        "location": req.location,
        "installation_address": req.installation_address,
        "timeline": req.timeline,
        "budget_range": req.budget_range,
        "project_brief": req.project_brief,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    
    await leads_col.insert_one(lead)
    lead.pop("_id", None)
    
    await notify_new_lead({
        "name": req.name,
        "email": req.email,
        "phone": req.phone,
        "company": req.company,
        "message": message,
        "application": f"Custom Signage Inquiry - {req.signage_type}",
        "page_context": "Signage Solutions",
        "source": "signage_inquiry",
    })
    
    return {"status": "ok", "message": "Inquiry submitted successfully"}
