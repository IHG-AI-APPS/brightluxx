from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import signage_inquiry_email

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
    lead = {
        "name": req.name,
        "company": req.company,
        "email": req.email,
        "phone": req.phone,
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
    
    # Send enhanced email
    if NOTIFICATION_EMAIL:
        subject, html = signage_inquiry_email(lead)
        await send_email(NOTIFICATION_EMAIL, subject, html)
    
    return {"status": "ok", "message": "Inquiry submitted successfully"}
