"""Design Assist request route."""
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
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

    if NOTIFICATION_EMAIL:
        try:
            extra = ""
            if data.phone:
                extra += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Phone</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.phone}</td></tr>'
            if data.project_type:
                extra += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Project Type</td><td style="padding:8px 12px;color:#E5C574;font-size:13px;font-weight:bold;border-bottom:1px solid #222;">{data.project_type}</td></tr>'
            if data.project_stage:
                extra += f'<tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Stage</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.project_stage}</td></tr>'
            if data.message:
                extra += f'<tr><td colspan="2" style="padding:12px;color:#ccc;font-size:13px;border-bottom:1px solid #222;"><strong style="color:#999;">Project Brief:</strong><br>{data.message}</td></tr>'

            html = f"""
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #333;border-radius:12px;overflow:hidden;">
              <div style="padding:20px 24px;background:linear-gradient(135deg,#1a1a1a,#111);border-bottom:1px solid #333;">
                <div style="font-size:11px;letter-spacing:2px;color:#E5C574;margin-bottom:4px;">BRIGHTLUXX DESIGN ASSIST</div>
                <div style="font-size:18px;font-weight:bold;color:#fff;">New Design Assist Request</div>
              </div>
              <div style="padding:4px 12px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Name</td><td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:bold;border-bottom:1px solid #222;">{data.name}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #222;"><a href="mailto:{data.email}" style="color:#E5C574;text-decoration:none;">{data.email}</a></td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Firm</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.company}</td></tr>
                  <tr><td style="padding:8px 12px;color:#999;font-size:13px;border-bottom:1px solid #222;">Role</td><td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;">{data.role}</td></tr>
                  {extra}
                </table>
              </div>
              <div style="padding:16px 24px;text-align:center;border-top:1px solid #222;">
                <div style="font-size:11px;color:#666;">Brightluxx Website — Design Assist Notification</div>
              </div>
            </div>
            """
            await send_email(
                NOTIFICATION_EMAIL,
                f"Design Assist: {data.project_type or 'General'} — {data.name} ({data.company})",
                html
            )
        except Exception:
            pass

    return {
        "success": True,
        "message": "Thank you! Our design assist team will contact you within 24 hours.",
    }
