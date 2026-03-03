"""
Migrate all local images to Emergent Object Storage and update database records.
Changes image_url from /uploads/xxx.webp to /api/cdn/xxx.webp
"""
import asyncio
import os
import glob
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Import storage functions
import sys
sys.path.insert(0, os.path.dirname(__file__))
from storage import init_storage, upload_file

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
LOCAL_UPLOAD_DIR = "/app/frontend/public/uploads"

MIME_MAP = {
    ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".png": "image/png", ".gif": "image/gif", ".svg": "image/svg+xml",
}


def upload_local_files():
    """Upload all local files to cloud storage."""
    print("\n=== UPLOADING LOCAL FILES TO CLOUD STORAGE ===")
    files = glob.glob(os.path.join(LOCAL_UPLOAD_DIR, "*"))
    uploaded = 0
    skipped = 0
    failed = 0

    for filepath in sorted(files):
        if os.path.isdir(filepath):
            continue
        filename = os.path.basename(filepath)
        ext = Path(filename).suffix.lower()
        content_type = MIME_MAP.get(ext, "application/octet-stream")

        try:
            with open(filepath, "rb") as f:
                data = f.read()
            storage_path = upload_file(filename, data, content_type)
            uploaded += 1
            if uploaded % 10 == 0:
                print(f"  Uploaded {uploaded} files...")
        except Exception as e:
            print(f"  [FAIL] {filename}: {e}")
            failed += 1

    print(f"\n  Uploaded: {uploaded}, Failed: {failed}")
    return uploaded


async def update_database():
    """Update all database records to use CDN URLs."""
    print("\n=== UPDATING DATABASE RECORDS ===")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    collections = {
        "products": "image_url",
        "projects": "image_url",
        "inspirations": "image_url",
    }

    total_updated = 0

    for col_name, field in collections.items():
        col = db[col_name]
        # Find all documents with /uploads/ image URLs
        cursor = col.find({field: {"$regex": "^/uploads/"}})
        docs = await cursor.to_list(length=500)

        count = 0
        for doc in docs:
            old_url = doc.get(field, "")
            if old_url.startswith("/uploads/"):
                filename = old_url.replace("/uploads/", "")
                new_url = f"/api/cdn/{filename}"

                update_fields = {field: new_url}

                # Also update gallery if present
                if "gallery" in doc and isinstance(doc["gallery"], list):
                    new_gallery = []
                    for g_url in doc["gallery"]:
                        if g_url.startswith("/uploads/"):
                            g_filename = g_url.replace("/uploads/", "")
                            new_gallery.append(f"/api/cdn/{g_filename}")
                        else:
                            new_gallery.append(g_url)
                    update_fields["gallery"] = new_gallery

                await col.update_one({"_id": doc["_id"]}, {"$set": update_fields})
                count += 1

        print(f"  {col_name}: updated {count}/{len(docs)} records")
        total_updated += count

    client.close()
    return total_updated


async def main():
    print("=" * 60)
    print("  BRIGHTLUXX CDN MIGRATION")
    print("=" * 60)

    # Step 1: Initialize storage
    print("\n[1/3] Initializing object storage...")
    init_storage()

    # Step 2: Upload all local files
    print("\n[2/3] Uploading local images to cloud storage...")
    uploaded = upload_local_files()

    # Step 3: Update database
    print("\n[3/3] Updating database records...")
    updated = await update_database()

    print("\n" + "=" * 60)
    print(f"  MIGRATION COMPLETE")
    print(f"  Files uploaded: {uploaded}")
    print(f"  DB records updated: {updated}")
    print(f"  Images now served via: /api/cdn/{{filename}}?w=&h=&q=&f=")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
