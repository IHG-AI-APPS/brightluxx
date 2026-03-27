"""Admin file upload routes - uploads to external CDN server."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from pathlib import Path
import uuid
import os
import paramiko
from io import BytesIO

from auth import get_current_admin

router = APIRouter()

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}
MAX_FILE_SIZE = 10 * 1024 * 1024

# External CDN configuration
CDN_HOST = "178.128.28.178"
CDN_USER = "root"
CDN_PASS = "IhG@1HGB$2026$W3b"
CDN_BASE_PATH = "/var/brightluxx/uploads"
CDN_BASE_URL = "https://files.ihgbrands.com/brightluxx/uploads"


def upload_to_cdn(filename: str, content: bytes) -> str:
    """Upload file to external CDN server via SFTP."""
    try:
        # Connect via SSH/SFTP
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(CDN_HOST, username=CDN_USER, password=CDN_PASS, timeout=30)
        
        sftp = ssh.open_sftp()
        
        # Ensure uploads directory exists
        try:
            sftp.stat(CDN_BASE_PATH)
        except FileNotFoundError:
            sftp.mkdir(CDN_BASE_PATH)
        
        # Upload file
        remote_path = f"{CDN_BASE_PATH}/{filename}"
        with sftp.file(remote_path, 'wb') as f:
            f.write(content)
        
        # Set permissions
        sftp.chmod(remote_path, 0o644)
        
        sftp.close()
        ssh.close()
        
        return f"{CDN_BASE_URL}/{filename}"
    except Exception as e:
        print(f"CDN upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to upload to CDN: {str(e)}")


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
    
    # Upload to external CDN
    cdn_url = upload_to_cdn(unique_name, content)

    return {
        "success": True,
        "url": cdn_url,
        "filename": unique_name,
        "size": len(content),
        "content_type": file.content_type or "application/octet-stream",
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
        
        try:
            cdn_url = upload_to_cdn(unique_name, content)
            uploaded.append({
                "url": cdn_url,
                "filename": unique_name,
                "size": len(content),
                "original_name": file.filename,
            })
        except Exception:
            continue

    return {"success": True, "uploaded": uploaded, "count": len(uploaded)}
