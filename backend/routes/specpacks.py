"""Spec Pack PDF generation and gated download endpoints."""
from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import datetime, timezone
import os

from database import leads_col

router = APIRouter()

# PDF storage directory
PDF_DIR = os.path.join(os.path.dirname(__file__), '..', 'specpacks')
os.makedirs(PDF_DIR, exist_ok=True)


class SpecPackRequest(BaseModel):
    email: str
    name: str = ""
    pack_id: str = ""


SPEC_PACKS = {
    "retail-hospitality": "Retail & Hospitality LED Spec Pack",
    "outdoor-dooh": "Outdoor & DOOH LED Spec Pack",
    "corporate-control": "Corporate & Control Room LED Spec Pack",
    "healthcare-wayfinding": "Healthcare Digital Signage Spec Pack",
    "education-campus": "Education Campus Signage Spec Pack",
    "cob-mip-smd": "COB vs MiP vs SMD Technology Guide",
    "pixel-pitch": "Pixel Pitch Specification Guide",
    "brightness-nits": "Brightness & Nits Guide for GCC",
    "ip-rating": "IP Rating & Serviceability Guide",
    "refresh-rate": "Refresh Rate & Camera Guide",
}


@router.post("/api/specpacks/{pack_id}/download")
async def download_specpack(pack_id: str, data: SpecPackRequest, request: Request):
    """Gated spec pack download - captures lead then returns download URL."""
    if pack_id not in SPEC_PACKS:
        return {"error": "Spec pack not found"}

    # Capture the lead
    ip = request.headers.get("x-forwarded-for", request.client.host).split(",")[0].strip()
    await leads_col.insert_one({
        "name": data.name,
        "email": data.email,
        "source": "spec_pack_download",
        "spec_pack": pack_id,
        "spec_pack_title": SPEC_PACKS[pack_id],
        "ip": ip[:50],
        "status": "new",
        "created_at": datetime.now(timezone.utc),
    })

    # Check if PDF exists, if not generate it
    pdf_path = os.path.join(PDF_DIR, f"{pack_id}.pdf")
    if not os.path.exists(pdf_path):
        from specpack_generator import generate_spec_pack
        generate_spec_pack(pack_id, pdf_path)

    return {"download_url": f"/api/specpacks/{pack_id}/file"}


@router.get("/api/specpacks/{pack_id}/file")
async def serve_specpack_file(pack_id: str):
    """Serve the actual PDF file."""
    pdf_path = os.path.join(PDF_DIR, f"{pack_id}.pdf")
    if not os.path.exists(pdf_path):
        from specpack_generator import generate_spec_pack
        generate_spec_pack(pack_id, pdf_path)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"Brightluxx-{pack_id}-spec-pack.pdf",
    )


@router.get("/api/specpacks")
async def list_specpacks():
    """List available spec packs."""
    return {"packs": [{"id": k, "title": v} for k, v in SPEC_PACKS.items()]}
