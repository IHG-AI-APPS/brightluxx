from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import site_visit_email

router = APIRouter(prefix="/api")


class SiteVisitRequest(BaseModel):
    name: str
    email: str
    phone: str = ""
    company: str = ""
    project_brief: str = ""
    page_url: str = ""


@router.post("/site-visit-request")
async def site_visit_request(req: SiteVisitRequest):
    lead = {
        "name": req.name,
        "email": req.email,
        "phone": req.phone,
        "company": req.company,
        "message": req.project_brief,
        "source": "exit_intent_site_visit",
        "page_url": req.page_url,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await leads_col.insert_one(lead)
    lead.pop("_id", None)
    
    # Send enhanced email notification
    if NOTIFICATION_EMAIL:
        try:
            email_data = {
                "name": req.name,
                "email": req.email,
                "company": req.company,
                "phone": req.phone,
                "project_type": "Site Visit",
                "location": req.page_url,
                "notes": req.project_brief,
            }
            subject, html = site_visit_email(email_data)
            await send_email(NOTIFICATION_EMAIL, subject, html)
        except Exception:
            pass
    
    return {"status": "ok"}
