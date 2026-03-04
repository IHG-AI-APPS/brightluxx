from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
from database import leads_col
from email_service import notify_new_lead

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
    await notify_new_lead({
        **lead,
        "application": "Free Site Visit & Quote Request",
        "role": "Exit-Intent Lead",
    })
    return {"status": "ok"}
