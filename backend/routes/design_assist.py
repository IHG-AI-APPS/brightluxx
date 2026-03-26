"""Design Assist request route."""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import design_assist_email
from utils import lead_limiter, get_client_ip

router = APIRouter()


class DesignAssistRequest(BaseModel):
    name: str
    email: str
    company: str
    role: str
    phone: Optional[str] = ""
    project_type: Optional[str] = ""
    project_stage: Optional[str] = ""
    message: Optional[str] = ""


@router.post("/api/design-assist/request")
async def submit_design_assist(data: DesignAssistRequest, request: Request):
    client_ip = get_client_ip(request)
    if not lead_limiter.check(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions.")

    lead_dict = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "company": data.company,
        "role": data.role,
        "phone": data.phone,
        "source": "design_assist",
        "application": f"Design Assist: {data.project_type or 'General'}",
        "status": "new",
        "notes": "",
        "design_assist_details": {
            "project_type": data.project_type,
            "project_stage": data.project_stage,
            "message": data.message,
        },
        "created_at": datetime.now(timezone.utc),
    }

    await leads_col.insert_one(lead_dict)

    # Send enhanced email notification
    if NOTIFICATION_EMAIL:
        try:
            email_data = {
                "name": data.name,
                "email": data.email,
                "company": data.company,
                "phone": data.phone,
                "project_type": data.project_type,
                "requirements": data.message,
                "deadline": data.project_stage,
            }
            subject, html = design_assist_email(email_data)
            await send_email(NOTIFICATION_EMAIL, subject, html)
        except Exception:
            pass

    return {
        "success": True,
        "message": "Thank you! Our design assist team will contact you within 24 hours.",
    }
