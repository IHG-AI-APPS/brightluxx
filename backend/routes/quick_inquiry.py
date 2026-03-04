from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
from database import leads_col
from email_service import notify_new_lead

router = APIRouter(prefix="/api")


class QuickInquiryRequest(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str = ""
    page_context: str = ""
    page_url: str = ""


@router.post("/quick-inquiry")
async def quick_inquiry(req: QuickInquiryRequest):
    lead = {
        "name": req.name,
        "email": req.email,
        "phone": req.phone,
        "message": req.message,
        "source": "quick_inquiry",
        "page_context": req.page_context,
        "page_url": req.page_url,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await leads_col.insert_one(lead)
    lead.pop("_id", None)
    await notify_new_lead({
        **lead,
        "application": req.page_context,
    })
    return {"status": "ok"}
