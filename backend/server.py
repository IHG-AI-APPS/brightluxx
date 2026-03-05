from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import uuid
import time

from database import admins_col, perf_col, analytics_col
from auth import pwd_context
from routes.public import router as public_router
from routes.admin import router as admin_router
from routes.admin_crud import router as admin_crud_router
from routes.upload import router as upload_router
from routes.cdn import router as cdn_router
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
from storage import init_storage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Skip perf logging for high-frequency/static endpoints
_SKIP_PERF = {"/api/track", "/api/health", "/api/cdn/"}


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

    # Performance tracking (skip CDN/track/health)
    path = request.url.path
    if path.startswith("/api/") and not any(path.startswith(s) for s in _SKIP_PERF):
        try:
            await perf_col.insert_one({
                "endpoint": f"{request.method} {path}",
                "response_time_ms": round(elapsed_ms, 1),
                "status_code": response.status_code,
                "ts": datetime.now(timezone.utc),
            })
        except Exception:
            pass

    return response


app.include_router(public_router)
app.include_router(admin_router)
app.include_router(admin_crud_router)
app.include_router(upload_router)
app.include_router(cdn_router)
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


@app.on_event("startup")
async def startup():
    # Initialize object storage
    try:
        init_storage()
    except Exception as e:
        print(f"Warning: Object storage init failed: {e}. Local fallback active.")

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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
