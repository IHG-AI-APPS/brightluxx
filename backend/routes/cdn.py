"""CDN endpoint for serving optimized images from object storage."""
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
from typing import Optional
from pathlib import Path

from storage import get_cached_or_fetch, optimize_and_serve, APP_NAME

router = APIRouter()

LOCAL_UPLOAD_DIR = Path("/app/frontend/public/uploads")


@router.get("/api/cdn/{path:path}")
async def serve_image(
    path: str,
    w: Optional[int] = None,
    h: Optional[int] = None,
    q: Optional[int] = None,
    f: Optional[str] = None,
):
    """
    Serve images from cloud storage with optional on-the-fly optimization.
    Query params:
      - w: max width (px)
      - h: max height (px)
      - q: quality (1-100, default 82)
      - f: format (webp, jpeg, png)
    """
    quality = min(max(q or 82, 1), 100)
    output_format = f if f in ("webp", "jpeg", "jpg", "png") else "webp"

    storage_path = f"{APP_NAME}/uploads/{path}"

    try:
        image_data, content_type = get_cached_or_fetch(storage_path)
    except Exception:
        # Fallback to local file if not in cloud storage yet
        local_path = LOCAL_UPLOAD_DIR / path
        if local_path.exists() and local_path.is_file():
            with open(local_path, "rb") as lf:
                image_data = lf.read()
            ext = local_path.suffix.lower()
            ct_map = {".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png"}
            content_type = ct_map.get(ext, "application/octet-stream")
        else:
            raise HTTPException(status_code=404, detail="Image not found")

    needs_transform = w or h or (q and q != 82) or (f and f != "webp")
    if needs_transform:
        image_data, content_type = optimize_and_serve(image_data, w, h, quality, output_format)

    return Response(
        content=image_data,
        media_type=content_type,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "CDN-Cache-Control": "public, max-age=31536000",
            "Vary": "Accept",
        }
    )
