from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from PIL import Image as PILImage
from pathlib import Path
import uuid
import io

from auth import get_current_admin

router = APIRouter()

UPLOAD_DIR = Path("/app/frontend/public/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}
MAX_FILE_SIZE = 10 * 1024 * 1024

IMAGE_SIZES = {
    "thumbnail": 200,
    "medium": 800,
    "large": 1600,
}


def optimize_image(content: bytes, filename: str) -> dict:
    ext = Path(filename).suffix.lower()
    if ext in (".svg", ".gif"):
        return {}
    try:
        img = PILImage.open(io.BytesIO(content))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        base_name = Path(filename).stem
        variants = {}

        for size_name, max_dim in IMAGE_SIZES.items():
            if img.width <= max_dim and img.height <= max_dim and size_name != "thumbnail":
                continue

            ratio = min(max_dim / img.width, max_dim / img.height)
            new_w = int(img.width * ratio)
            new_h = int(img.height * ratio)
            resized = img.resize((new_w, new_h), PILImage.LANCZOS)

            webp_name = f"{base_name}_{size_name}.webp"
            webp_path = UPLOAD_DIR / webp_name
            resized.save(str(webp_path), "WEBP", quality=82, method=4)
            variants[size_name] = f"/uploads/{webp_name}"

        return variants
    except Exception as e:
        print(f"Image optimization error: {e}")
        return {}


@router.post("/api/admin/upload")
async def admin_upload_file(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Accepted: {', '.join(ALLOWED_EXTENSIONS)}")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File too large. Max size: {MAX_FILE_SIZE // (1024*1024)}MB")

    unique_name = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '-')}"
    file_path = UPLOAD_DIR / unique_name

    with open(file_path, "wb") as f:
        f.write(content)

    variants = optimize_image(content, unique_name)

    public_url = f"/uploads/{unique_name}"
    return {
        "success": True,
        "url": public_url,
        "filename": unique_name,
        "size": len(content),
        "content_type": file.content_type,
        "variants": variants
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
        unique_name = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '-')}"
        file_path = UPLOAD_DIR / unique_name
        with open(file_path, "wb") as f:
            f.write(content)
        variants = optimize_image(content, unique_name)
        uploaded.append({
            "url": f"/uploads/{unique_name}",
            "filename": unique_name,
            "size": len(content),
            "original_name": file.filename,
            "variants": variants
        })
    return {"success": True, "uploaded": uploaded, "count": len(uploaded)}
