from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import uuid

from database import admins_col
from auth import pwd_context
from routes.public import router as public_router
from routes.admin import router as admin_router
from routes.admin_crud import router as admin_crud_router
from routes.upload import router as upload_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response


app.include_router(public_router)
app.include_router(admin_router)
app.include_router(admin_crud_router)
app.include_router(upload_router)


@app.on_event("startup")
async def seed_admin():
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
