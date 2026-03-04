"""CPD / Lunch & Learn programme routes."""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
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

    # Email notification
    if NOTIFICATION_EMAIL:
        try:
            extra_rows = ""
            if data.phone:
                extra_rows += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Phone</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.phone}</td></tr>'
            if data.group_size:
                extra_rows += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Group Size</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.group_size}</td></tr>'
            if data.preferred_date:
                extra_rows += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Preferred Date</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.preferred_date}</td></tr>'
            if data.message:
                extra_rows += f'<tr><td colspan="2" style="padding:12px;color:#ccc;font-size:13px;border-bottom:1px solid #222;"><strong style="color:#999;">Additional Notes:</strong><br>{data.message}</td></tr>'

            html = f"""
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:linear-gradient(135deg,#1a1a1a,#111);border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:#E5C574;margin-bottom:4px;">BRIGHTLUXX CPD PROGRAMME</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;">New CPD / Lunch & Learn Request</div>
              </div>
              <div style="padding:4px 12px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Name</td><td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:bold;border-bottom:1px solid #222;">{data.name}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #222;"><a href="mailto:{data.email}" style="color:#E5C574;text-decoration:none;">{data.email}</a></td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Company</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.company}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Role</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.role}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Topic</td><td style="padding:8px 12px;color:#E5C574;font-size:13px;font-weight:bold;border-bottom:1px solid #222;">{data.preferred_topic}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Format</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.preferred_format}</td></tr>
                  {extra_rows}
                </table>
              </div>
              <div style="padding:16px 24px;text-align:center;border-top:1px solid #222;">
                <div style="font-size:11px;color:#666;">Brightluxx Website — CPD Programme Notification</div>
              </div>
            </div>
            """

            await send_email(
                NOTIFICATION_EMAIL,
                f"CPD Request: {data.preferred_topic} — {data.name} ({data.company})",
                html
            )
        except Exception:
            pass

    return {
        "success": True,
        "message": "Thank you! Our team will contact you within 24 hours to schedule your session.",
    }
