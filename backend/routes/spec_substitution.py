"""Specification substitution service endpoints."""
from fastapi import APIRouter, UploadFile, File, Form, Request, HTTPException
from typing import List, Optional
from datetime import datetime, timezone
import os
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import spec_substitution_email
from anti_spam import validate_submission, check_recaptcha
from utils import get_client_ip

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', 'uploads', 'spec-submissions')
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/api/spec-substitution")
async def submit_spec_substitution(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    company: str = Form(...),
    phone: str = Form(""),
    projectName: str = Form(""),
    description: str = Form(""),
    fax: str = Form(""),
    files: List[UploadFile] = File(default=[]),
):
    """Handle spec substitution form with file uploads."""
    ip = get_client_ip(request)
    validation_data = {"name": name, "email": email, "phone": phone, "message": description, "fax": fax}
    is_valid, error_msg, spam_score = validate_submission(validation_data, ip)
    if not is_valid:
        if error_msg == "__honeypot__":
            return {"success": True, "submission_id": "ok"}
        raise HTTPException(status_code=422, detail=error_msg)

    await check_recaptcha(request)

    submission_id = str(uuid.uuid4())[:8]

    # Save uploaded files
    saved_files = []
    for f in files[:5]:
        if f.filename:
            safe_name = f"{submission_id}_{f.filename.replace(' ', '_')}"
            file_path = os.path.join(UPLOAD_DIR, safe_name)
            content = await f.read()
            with open(file_path, "wb") as out:
                out.write(content)
            saved_files.append({"name": f.filename, "path": safe_name, "size": len(content)})

    # Save to database
    lead_data = {
        "name": name,
        "email": email,
        "company": company,
        "phone": phone,
        "project_name": projectName,
        "description": description,
        "files": saved_files,
        "submission_id": submission_id,
        "source": "spec_substitution",
        "ip": ip[:50],
        "spam_score": spam_score,
        "status": "new",
        "created_at": datetime.now(timezone.utc),
    }
    await leads_col.insert_one(lead_data)

    # Send enhanced email notification
    if NOTIFICATION_EMAIL:
        file_list = ", ".join([f["name"] for f in saved_files]) if saved_files else "No files attached"
        try:
            email_data = {
                "name": name,
                "email": email,
                "company": company,
                "phone": phone,
                "current_spec": f"Files: {file_list}" if saved_files else "No files",
                "project_name": projectName,
                "reason": description,
            }
            subject, html = spec_substitution_email(email_data)
            await send_email(NOTIFICATION_EMAIL, subject, html)
        except Exception:
            pass

    return {"success": True, "submission_id": submission_id}
