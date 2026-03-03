"""
Emergent Object Storage integration for Brightluxx image CDN.
Provides upload, download, and on-the-fly image optimization.
"""
import os
import io
import requests
from PIL import Image as PILImage
from functools import lru_cache

STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "brightluxx"

_storage_key = None


def init_storage():
    """Initialize storage connection. Call once at startup."""
    global _storage_key
    if _storage_key:
        return _storage_key
    resp = requests.post(
        f"{STORAGE_URL}/init",
        json={"emergent_key": EMERGENT_KEY},
        timeout=30
    )
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    print(f"Object storage initialized successfully")
    return _storage_key


def get_storage_key():
    """Get or initialize storage key."""
    global _storage_key
    if not _storage_key:
        return init_storage()
    return _storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    """Upload file to object storage. Returns metadata dict."""
    key = get_storage_key()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data,
        timeout=120
    )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str):
    """Download file from object storage. Returns (bytes, content_type)."""
    key = get_storage_key()
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key},
        timeout=60
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


def upload_file(filename: str, data: bytes, content_type: str, subfolder: str = "uploads") -> str:
    """Upload a file and return the storage path."""
    storage_path = f"{APP_NAME}/{subfolder}/{filename}"
    put_object(storage_path, data, content_type)
    return storage_path


def optimize_and_serve(image_data: bytes, width: int = None, height: int = None,
                       quality: int = 82, output_format: str = "webp") -> tuple:
    """Resize and optimize image on the fly. Returns (bytes, content_type)."""
    try:
        img = PILImage.open(io.BytesIO(image_data))

        if img.mode in ("RGBA", "P", "LA"):
            if output_format == "jpeg":
                img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")

        if width or height:
            orig_w, orig_h = img.size
            if width and height:
                ratio = min(width / orig_w, height / orig_h)
            elif width:
                ratio = width / orig_w
            else:
                ratio = height / orig_h
            if ratio < 1:
                new_w = int(orig_w * ratio)
                new_h = int(orig_h * ratio)
                img = img.resize((new_w, new_h), PILImage.LANCZOS)

        buf = io.BytesIO()
        fmt_map = {"webp": "WEBP", "jpeg": "JPEG", "jpg": "JPEG", "png": "PNG"}
        pil_format = fmt_map.get(output_format, "WEBP")
        mime_map = {"WEBP": "image/webp", "JPEG": "image/jpeg", "PNG": "image/png"}

        save_kwargs = {"quality": quality}
        if pil_format == "WEBP":
            save_kwargs["method"] = 4
        if pil_format == "PNG":
            save_kwargs.pop("quality", None)

        img.save(buf, pil_format, **save_kwargs)
        return buf.getvalue(), mime_map.get(pil_format, "image/webp")
    except Exception:
        return image_data, "application/octet-stream"


# Simple in-memory cache for frequently accessed images
_image_cache = {}
_CACHE_MAX = 200


def get_cached_or_fetch(storage_path: str) -> tuple:
    """Get image from cache or fetch from storage."""
    if storage_path in _image_cache:
        return _image_cache[storage_path]

    data, content_type = get_object(storage_path)

    if len(_image_cache) >= _CACHE_MAX:
        oldest = next(iter(_image_cache))
        del _image_cache[oldest]

    _image_cache[storage_path] = (data, content_type)
    return data, content_type
