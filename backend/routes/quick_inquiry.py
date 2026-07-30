from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone
from database import leads_col
from email_service import notify_new_lead
from utils.anti_spam import validate_submission
from utils import get_client_ip

router = APIRouter(prefix="/api")


class QuickInquiryRequest(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str = ""
    page_context: str = ""
    page_url: str = ""
    # Honeypot
    website: Optional[str] = None
    fax: Optional[str] = None


@router.post("/quick-inquiry")
async def quick_inquiry(req: QuickInquiryRequest, request: Request):
    ip = get_client_ip(request)

    # Anti-spam
    data = req.dict()
    is_valid, error_msg, spam_score = validate_submission(data, ip)
    if not is_valid:
        if error_msg == "__honeypot__":
            return {"status": "ok"}
        raise HTTPException(status_code=422, detail=error_msg)

    lead = {
        "name": req.name,
        "email": req.email,
        "phone": req.phone,
        "message": req.message,
        "source": "quick_inquiry",
        "page_context": req.page_context,
        "page_url": req.page_url,
        "spam_score": spam_score,
        "ip": ip,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await leads_col.insert_one(lead)
    lead.pop("_id", None)
    try:
        await notify_new_lead({**lead, "application": req.page_context})
    except Exception:
        pass
    return {"status": "ok"}
