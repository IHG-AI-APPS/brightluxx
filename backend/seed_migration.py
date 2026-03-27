"""
Database seed migration — ensures content collections have data on startup.
Loads from seed_data.json (exported from preview environment).
Only seeds collections that are EMPTY to avoid overwriting admin edits.
"""
import json
import os

SEED_FILE = os.path.join(os.path.dirname(__file__), "seed_data.json")

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
