"""
Database seed migration — ensures content collections have data on startup.
Loads from seed_data.json (exported from preview environment).
Only seeds collections that are EMPTY to avoid overwriting admin edits.
"""
import json
import os
from datetime import datetime, timezone

SEED_FILE = os.path.join(os.path.dirname(__file__), "seed_data.json")

# The "Art & XR" product family exists on the public site (navbar / homepage) but was
# missing from the product_families collection, so it never showed in the admin panel
# or on the DB-driven /product-families page. This record backfills it. It is inserted
# only if absent (guarded by slug + name below), so it never overwrites admin edits.
ART_XR_FAMILY = {
    "_id": "family-art-immersive",
    "name": "Art & XR",
    "slug": "art-immersive",
    "tagline": "Immersive Art & Extended Reality",
    "description": "Immersive digital art and extended-reality LED experiences — NFT galleries, teamLab-style immersive walls, XR/virtual-production stages, metaverse installations, and sculptural public art.",
    "hero_image": "https://files.ihgbrands.com/nav-images_nav_ext_5607981affc7.webp",
    "hero_video": None,
    "brand_color": "violet",
    "accent_color": None,
    "stats": [
        {"value": "6", "label": "Experience Types"},
        {"value": "360°", "label": "Immersion"},
        {"value": "XR", "label": "Virtual Production"},
    ],
    "overview": "Art & XR brings together NFT gallery displays, immersive walls, XR/virtual-production stages, metaverse LED and sculptural public art into a single creative product line.",
    "key_features": ["NFT Gallery Displays", "Immersive Walls", "XR / Virtual Production", "Sculptural & Public Art"],
    "products": [
        {"name": "NFT Gallery Displays", "slug": "products?category=art-immersive&sub=nft-gallery", "description": "Digital Art Museums", "image": "https://files.ihgbrands.com/nav-images_nav_ext_5607981affc7.webp"},
        {"name": "Immersive Walls", "slug": "products?category=art-immersive&sub=immersive-experience", "description": "teamLab-style installations", "image": "https://files.ihgbrands.com/nav-images_nav_ext_a88d2305f712.webp"},
        {"name": "XR/Virtual Production", "slug": "products?category=art-immersive&sub=virtual-production", "description": "Film & TV stages", "image": "https://files.ihgbrands.com/nav-images_nav_1aa1b696_bl-vpx150.webp"},
        {"name": "Metaverse LED", "slug": "products?category=art-immersive&sub=metaverse", "description": "Interactive experiences", "image": "https://files.ihgbrands.com/nav-images_nav_ext_df8d37160688.webp"},
        {"name": "Sculptural LED", "slug": "products?category=art-immersive&sub=sculptural", "description": "Cylinders, cubes, waves", "image": "https://files.ihgbrands.com/nav-images_nav_ext_7f0dfb104596.webp"},
        {"name": "Public Art", "slug": "products?category=art-immersive&sub=public-art", "description": "Urban landmarks", "image": "https://files.ihgbrands.com/nav-images_nav_ext_d3c8d248b59f.webp"},
    ],
    "categories": [],
    "use_cases": ["Museums & Galleries", "Film & TV Production", "Public Installations", "Experiential Retail"],
    "gallery": [],
    "faqs": [],
    "seo_title": "Art & XR — Immersive LED & Extended Reality | Brightluxx",
    "seo_description": "NFT galleries, immersive walls, XR/virtual production, metaverse LED and sculptural public art from Brightluxx.",
    "is_active": True,
    "order": 6,
}


async def ensure_extra_families(db):
    """Backfill product families that exist on the site but were never seeded into the DB.

    Idempotent: only inserts a family if no document with the same slug or name exists,
    so it is safe to run on every startup and never clobbers admin edits.
    """
    existing = await db.product_families.find_one(
        {"$or": [{"slug": ART_XR_FAMILY["slug"]}, {"name": ART_XR_FAMILY["name"]}]}
    )
    if existing:
        return
    now = datetime.now(timezone.utc).isoformat()
    doc = dict(ART_XR_FAMILY)
    doc["created_at"] = now
    doc["updated_at"] = now
    await db.product_families.insert_one(doc)
    print("Seed: backfilled 'Art & XR' product family")

async def run_seed(db):
    """Seed empty content collections from seed_data.json."""
    if not os.path.exists(SEED_FILE):
        print("Seed: seed_data.json not found, skipping")
        return

    with open(SEED_FILE, "r") as f:
        seed = json.load(f)

    seeded = []
    for coll_name, docs in seed.items():
        if not docs:
            continue
        count = await db[coll_name].count_documents({})
        if count == 0:
            await db[coll_name].insert_many(docs)
            seeded.append(f"{coll_name} ({len(docs)})")

    if seeded:
        print(f"Seed: Populated {len(seeded)} collections: {', '.join(seeded)}")
    else:
        print("Seed: All content collections already have data, skipping")

    # Backfill families that are missing even when the collection already has data.
    try:
        await ensure_extra_families(db)
    except Exception as e:
        print(f"Seed: ensure_extra_families warning: {e}")
