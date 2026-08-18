"""Generate 2 gallery angle shots per product, upload to CDN, set products.gallery."""
import asyncio, json, os, sys

sys.path.insert(0, '/app/backend')
sys.path.insert(0, '/app/scripts')
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')
from gen_product_images import STYLE, CAT, SLUG, optimize, gen_image
from cdn_upload import upload_to_cdn
from motor.motor_asyncio import AsyncIOMotorClient


def scene_for(p):
    return SLUG.get(p['slug']) or CAT.get(p['cat']) or \
        "a premium LED display product in a modern dark showroom with vivid content on screen"


def gallery_prompts(p):
    scene = scene_for(p)
    g1 = (f"{STYLE} Close-up three-quarter detail photograph showing the build quality, "
          f"panel surface, edges and craftsmanship of: {scene}. "
          f"Depicts the product '{p['name']}', premium professional hardware, shallow depth of field.")
    g2 = (f"{STYLE} Wide environmental photograph from a clearly different viewing angle and distance, "
          f"showing: {scene}. Depicts the product '{p['name']}' in real-world use with people or context for scale.")
    return [g1, g2]


async def main():
    products = json.load(open('/app/scripts/products_list.json'))
    db = AsyncIOMotorClient(os.environ['MONGO_URL'])[os.environ['DB_NAME']]
    done = fail = 0
    for i, p in enumerate(products):
        slug = p['slug']
        cur = await db.products.find_one({'slug': slug}, {'gallery': 1})
        existing = cur.get('gallery') or []
        if len(existing) >= 2 and all(f"prod_{slug}_g" in g for g in existing[:2]):
            print(f"[{i+1}/94] {slug}: gallery done, skip", flush=True)
            done += 1
            continue
        urls = []
        for gi, prompt in enumerate(gallery_prompts(p), 1):
            raw = await gen_image(prompt, f"{slug}-g{gi}")
            if not raw:
                print(f"[{i+1}/94] {slug} g{gi}: FAILED", flush=True)
                continue
            opt = optimize(raw)
            urls.append(upload_to_cdn(f"prod_{slug}_g{gi}.webp", opt, "site-images"))
            await asyncio.sleep(1)
        if len(urls) == 2:
            await db.products.update_one({'slug': slug}, {'$set': {'gallery': urls}})
            done += 1
            print(f"[{i+1}/94] {slug}: gallery set ({len(urls)} imgs)", flush=True)
        else:
            fail += 1
            print(f"[{i+1}/94] {slug}: INCOMPLETE ({len(urls)}/2), gallery not set", flush=True)
    print(f"DONE: {done} ok, {fail} failed", flush=True)

asyncio.run(main())
