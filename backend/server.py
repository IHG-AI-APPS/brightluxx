from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from datetime import datetime, timezone
import uuid
import time
import asyncio

from database import admins_col, perf_col, analytics_col
from auth import pwd_context
from routes.public import router as public_router
from routes.admin import router as admin_router
from routes.admin_crud import router as admin_crud_router
from routes.upload import router as upload_router
from routes.analytics import router as analytics_router
from routes.specpacks import router as specpacks_router
from routes.spec_substitution import router as spec_sub_router
from routes.sitemap import router as sitemap_router
from routes.downloads import router as downloads_router
from routes.cpd import router as cpd_router
from routes.design_assist import router as design_assist_router
from routes.chat import router as chat_router
from routes.quick_inquiry import router as quick_inquiry_router
from routes.site_visit import router as site_visit_router
from routes.project_planner import router as project_planner_router
from routes.partners import router as partners_router
from routes.site_settings import router as site_settings_router
from routes.resources import router as resources_router
from routes.taxonomy import router as taxonomy_router
from routes.image_management import router as image_management_router
from routes.homepage import router as homepage_router
from routes.blog import router as blog_router
from routes.case_studies import router as case_studies_router
from routes.pixelvue import router as pixelvue_router
from routes.solutions_api import router as solutions_api_router
from routes.technologies_api import router as technologies_api_router
from routes.applications_api import router as applications_api_router
from routes.site_content import router as site_content_router
from routes.product_families import router as product_families_router
from routes.signage_inquiry import router as signage_inquiry_router
from routes.sync import router as sync_router
from routes.seo_manager import router as seo_manager_router

app = FastAPI()

# GZip compression for responses > 500 bytes
app.add_middleware(GZipMiddleware, minimum_size=500)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://brightluxx.com",
        "https://www.brightluxx.com",
        "https://brightluxx-showcase.emergent.host",
        "https://space-modern-build.preview.emergentagent.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Skip perf logging for high-frequency/static endpoints
_SKIP_PERF = {"/api/track", "/api/health"}

# Cacheable public endpoints (read-only, public data)
_CACHEABLE = {
    "/api/products", "/api/blogs", "/api/case-studies", "/api/resources",
    "/api/homepage-content", "/api/solutions", "/api/technologies",
    "/api/applications", "/api/product-families", "/api/site-settings",
    "/api/inspirations", "/api/projects", "/api/pixelvue/products",
}


@app.middleware("http")
async def perf_and_security(request: Request, call_next):
    start = time.monotonic()
    response = await call_next(request)
    elapsed_ms = (time.monotonic() - start) * 1000

    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"

    path = request.url.path

    # Cache-Control for public GET endpoints
    if request.method == "GET" and response.status_code == 200:
        if any(path == p or path.startswith(p + "/") for p in _CACHEABLE):
            response.headers["Cache-Control"] = "public, max-age=300, stale-while-revalidate=600"
        elif path.startswith("/api/admin/"):
            response.headers["Cache-Control"] = "no-store"

    # Non-blocking perf tracking
    if path.startswith("/api/") and not any(path.startswith(s) for s in _SKIP_PERF):
        asyncio.create_task(_log_perf(request.method, path, elapsed_ms, response.status_code))

    return response


async def _log_perf(method: str, path: str, elapsed_ms: float, status_code: int):
    """Fire-and-forget perf logging."""
    try:
        await perf_col.insert_one({
            "endpoint": f"{method} {path}",
            "response_time_ms": round(elapsed_ms, 1),
            "status_code": status_code,
            "ts": datetime.now(timezone.utc),
        })
    except Exception:
        pass


app.include_router(public_router)
app.include_router(admin_router)
app.include_router(admin_crud_router)
app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(specpacks_router)
app.include_router(spec_sub_router)
app.include_router(sitemap_router)
app.include_router(downloads_router)
app.include_router(cpd_router)
app.include_router(design_assist_router)
app.include_router(chat_router)
app.include_router(quick_inquiry_router)
app.include_router(site_visit_router)
app.include_router(project_planner_router)
app.include_router(partners_router)
app.include_router(site_settings_router)
app.include_router(resources_router)
app.include_router(taxonomy_router)
app.include_router(homepage_router)
app.include_router(blog_router)
app.include_router(case_studies_router)
app.include_router(pixelvue_router)
app.include_router(solutions_api_router)
app.include_router(technologies_api_router)
app.include_router(applications_api_router)
app.include_router(site_content_router)
app.include_router(product_families_router)
app.include_router(image_management_router)
app.include_router(signage_inquiry_router)
app.include_router(sync_router)
app.include_router(seo_manager_router)


@app.on_event("startup")
async def startup():
    # Create indexes for analytics collections
    try:
        await analytics_col.create_index([("ts", -1)])
        await analytics_col.create_index([("event", 1), ("ts", -1)])
        await perf_col.create_index([("ts", -1)])
        await perf_col.create_index([("endpoint", 1), ("ts", -1)])
    except Exception:
        pass

    # Seed admin user
    existing = await admins_col.find_one({"email": "admin@brightluxx.com"})
    if not existing:
        await admins_col.insert_one({
            "id": str(uuid.uuid4()),
            "email": "admin@brightluxx.com",
            "password": pwd_context.hash("brightluxx2025"),
            "name": "Admin",
            "role": "super_admin",
            "created_at": datetime.now(timezone.utc)
        })
        print("Admin user seeded: admin@brightluxx.com")

    # Seed content collections from seed_data.json
    try:
        from seed_migration import run_seed
        await run_seed(db)
    except Exception as e:
        print(f"Seed migration warning: {e}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
