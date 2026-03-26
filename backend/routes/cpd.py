"""CPD / Lunch & Learn programme routes."""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import cpd_request_email
from utils import lead_limiter, get_client_ip

router = APIRouter()


class CPDRequest(BaseModel):
    name: str
    email: str
    company: str
    role: str
    phone: Optional[str] = ""
    preferred_topic: str
    preferred_format: str = "in-office"
    group_size: Optional[str] = ""
    preferred_date: Optional[str] = ""
    message: Optional[str] = ""


@router.post("/api/cpd/request")
async def submit_cpd_request(data: CPDRequest, request: Request):
    client_ip = get_client_ip(request)
    if not lead_limiter.check(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please wait a moment.")

    lead_dict = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "company": data.company,
        "role": data.role,
        "phone": data.phone,
        "source": "cpd_programme",
        "application": f"CPD: {data.preferred_topic}",
        "status": "new",
        "notes": "",
        "cpd_details": {
            "preferred_topic": data.preferred_topic,
            "preferred_format": data.preferred_format,
            "group_size": data.group_size,
            "preferred_date": data.preferred_date,
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
                "role": data.role,
                "attendees": data.group_size,
                "preferred_date": data.preferred_date,
                "preferred_topic": data.preferred_topic,
                "notes": data.message,
            }
            subject, html = cpd_request_email(email_data)
            await send_email(NOTIFICATION_EMAIL, subject, html)
        except Exception:
            pass

    return {
        "success": True,
        "message": "Thank you! Our team will contact you within 24 hours to schedule your session.",
    }
