"""Specification substitution service endpoints."""
from fastapi import APIRouter, UploadFile, File, Form, Request
from typing import List, Optional
from datetime import datetime, timezone
import os
import uuid

from database import leads_col
from email_service import send_email, NOTIFICATION_EMAIL
from email_templates import spec_substitution_email

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
    files: List[UploadFile] = File(default=[]),
):
    """Handle spec substitution form with file uploads."""
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
    ip = request.headers.get("x-forwarded-for", request.client.host).split(",")[0].strip()
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
