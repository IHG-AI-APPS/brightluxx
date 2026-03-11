"""Admin file upload routes - uploads to Emergent Object Storage."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from pathlib import Path
import uuid

from auth import get_current_admin
from storage import upload_file, APP_NAME

router = APIRouter()

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}
MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("/api/admin/upload")
async def admin_upload_file(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Accepted: {', '.join(ALLOWED_EXTENSIONS)}")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File too large. Max size: {MAX_FILE_SIZE // (1024*1024)}MB")

    safe_name = file.filename.replace(" ", "-")
    unique_name = f"{uuid.uuid4().hex[:12]}_{safe_name}"
    content_type = file.content_type or "application/octet-stream"

    storage_path = upload_file(unique_name, content, content_type)
    # Use CDN route which will serve from Emergent Storage
    cdn_url = f"/api/cdn/{unique_name}"

    return {
        "success": True,
        "url": cdn_url,
        "filename": unique_name,
        "storage_path": storage_path,
        "size": len(content),
        "content_type": content_type,
    }


@router.post("/api/admin/upload/multiple")
async def admin_upload_multiple(files: List[UploadFile] = File(...), admin=Depends(get_current_admin)):
    uploaded = []
    for file in files:
        ext = Path(file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            continue
        content = await file.read()
        if len(content) > MAX_FILE_SIZE:
            continue

        safe_name = file.filename.replace(" ", "-")
        unique_name = f"{uuid.uuid4().hex[:12]}_{safe_name}"
        content_type = file.content_type or "application/octet-stream"

        storage_path = upload_file(unique_name, content, content_type)
        uploaded.append({
            "url": f"/api/cdn/{unique_name}",
            "filename": unique_name,
            "storage_path": storage_path,
            "size": len(content),
            "original_name": file.filename,
        })

    return {"success": True, "uploaded": uploaded, "count": len(uploaded)}
