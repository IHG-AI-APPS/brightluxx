"""CDN endpoint for serving optimized images from external file server."""
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import RedirectResponse
from typing import Optional
from pathlib import Path
import httpx

from storage import get_cached_or_fetch, optimize_and_serve, APP_NAME

router = APIRouter()

EXTERNAL_CDN_BASE = "https://files.ihgbrands.com/brightluxx"
LOCAL_UPLOAD_DIR = Path("/app/frontend/public/uploads")

_external_cache = {}
_EXTERNAL_CACHE_MAX = 200


async def fetch_from_external(path: str) -> tuple:
    """Fetch image from external CDN server with caching."""
    if path in _external_cache:
        return _external_cache[path]
    
    url = f"{EXTERNAL_CDN_BASE}/uploads/{path}"
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.get(url)
        if resp.status_code != 200:
            raise HTTPException(status_code=404, detail="Image not found on external server")
        
        content_type = resp.headers.get("content-type", "application/octet-stream")
        data = resp.content
        
        if len(_external_cache) >= _EXTERNAL_CACHE_MAX:
            oldest = next(iter(_external_cache))
            del _external_cache[oldest]
        
        _external_cache[path] = (data, content_type)
        return data, content_type


@router.head("/api/cdn/{path:path}")
@router.get("/api/cdn/{path:path}")
async def serve_image(
    path: str,
    w: Optional[int] = None,
    h: Optional[int] = None,
    q: Optional[int] = None,
    f: Optional[str] = None,
):
    """
    Serve images from external CDN or Emergent Storage with optional on-the-fly optimization.
    Query params:
      - w: max width (px)
      - h: max height (px)
      - q: quality (1-100, default 82)
      - f: format (webp, jpeg, png)
    """
    quality = min(max(q or 82, 1), 100)
    output_format = f if f in ("webp", "jpeg", "jpg", "png") else "webp"
    needs_transform = w or h or (q and q != 82) or (f and f != "webp")
    
    # Try to fetch from external CDN first
    image_data = None
    content_type = None
    
    try:
        image_data, content_type = await fetch_from_external(path)
    except HTTPException:
        # External CDN doesn't have it, try Emergent Storage
        try:
            storage_path = f"{APP_NAME}/uploads/{path}"
            image_data, content_type = get_cached_or_fetch(storage_path)
        except Exception:
            # Try local file as last resort
            local_path = LOCAL_UPLOAD_DIR / path
            if local_path.exists() and local_path.is_file():
                with open(local_path, "rb") as lf:
                    image_data = lf.read()
                ext = local_path.suffix.lower()
                ct_map = {".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png"}
                content_type = ct_map.get(ext, "application/octet-stream")
            else:
                raise HTTPException(status_code=404, detail="Image not found")
    
    # Apply transformations if needed
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
