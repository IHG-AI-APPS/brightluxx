"""One-time: optimize heavy images -> WebP, upload to CDN, fix projects DB + seed."""
import io, os, sys, json, asyncio, requests

sys.path.insert(0, '/app/backend')
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')
from PIL import Image
from cdn_upload import upload_to_cdn

CDN = "https://files.ihgbrands.com"


def optimize(data, max_w=1280, target_kb=150):
    img = Image.open(io.BytesIO(data))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    if img.width > max_w:
        img = img.resize((max_w, int(img.height * max_w / img.width)), Image.LANCZOS)
    buf = io.BytesIO()
    for q in (80, 70, 60, 50, 40):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= target_kb * 1024:
            break
    return buf.getvalue()


def process(src_url, out_name, fallback_url=None):
    r = requests.get(src_url, timeout=60)
    if r.status_code == 404 and fallback_url:
        r = requests.get(fallback_url, timeout=60)
    r.raise_for_status()
    opt = optimize(r.content)
    url = upload_to_cdn(out_name, opt, "site-images")
    print(f"  {out_name}: {len(r.content)//1024}KB -> {len(opt)//1024}KB -> {url}")
    return url


# 1. Homepage product-family images (hardcoded in Home.js)
FAMS = {
    "opt_fam_naturatex.webp": f"{CDN}/emergent-images/ea77d4dd0e99bf17d39a28af7bcce5ed3db13b59241d32385de3a59cf9952a29.png",
    "opt_fam_signatouch.webp": f"{CDN}/emergent-images/f7ad6c93eff45321279f7b8912a259cd14afd89d426a4ecb8c8a049055ac5a98.png",
    "opt_fam_glassmorph.webp": f"{CDN}/emergent-images/64444ed7ca157e07ab9eeea06f1bb969e8744dbda982442ba235f506fd348b48.png",
    "opt_fam_pixelvue.webp": f"{CDN}/emergent-images/127b54193b9ab0ec636c8645560811771af1f58dde5daceea69f261828cf7c0a.png",
}

# 2. Project images: dead local paths -> optimized CDN uploads
#    (originals still exist on CDN under flattened names)
PROJ = {
    "/generated-images/fc0ca389d2264c9cb8bda6f1284e2862_3d_holographic_mall.png": "opt_proj_dubai_mall_atrium.webp",
    "/generated-images/8e554ea3d5474246a26948769039eb00_outdoor_dooh_dubai.png": "opt_proj_szr_dooh.webp",
    "/generated-images/4b4319058b5a4396b82f07c58f11b4c3_control_room_led.png": "opt_proj_adnoc_command.webp",
    "/downloaded-images/proj_9bd1d534_atlantis-the-royal-grand-ballr.webp": "opt_proj_atlantis_ballroom.webp",
    "/downloaded-images/proj_f3f83562_riyadh-season-main-stage.jpg": "opt_proj_riyadh_season.webp",
    "/downloaded-images/proj_37b4b7ec_mall-of-the-emirates-glass-fac.jpg": "opt_proj_moe_facade.webp",
    "/downloaded-images/proj_0aeff300_difc-luxury-vip-lounge.webp": "opt_proj_difc_lounge.webp",
    "/downloaded-images/proj_0d7a51e7_abu-dhabi-expo-interactive-pav.webp": "opt_proj_ad_expo_pavilion.webp",
}


def flat_src(local_path):
    return CDN + "/" + local_path.lstrip("/").replace("/", "_")


# Direct source overrides for files lost from the CDN (freshly generated replacements)
SRC_OVERRIDES = {
    "/downloaded-images/proj_37b4b7ec_mall-of-the-emirates-glass-fac.jpg": "https://static.prod-images.emergentagent.com/jobs/9ab88f3f-5361-48ba-8df2-514086eeb249/images/d0fe379fab42c88fe889260ca91b1b45524759627f4c654c3d852eb60d0c1142.jpeg",
    "/downloaded-images/proj_0aeff300_difc-luxury-vip-lounge.webp": "https://static.prod-images.emergentagent.com/jobs/9ab88f3f-5361-48ba-8df2-514086eeb249/images/82286823adff4d9c0dd47c5689899abe1458a53ebd0c6f50b3e19514f14275f1.jpeg",
}


def main():
    print("== Family images ==")
    for name, src in FAMS.items():
        process(src, name)

    print("== Project images ==")
    url_map = {}  # old local path -> new CDN url
    for local, name in PROJ.items():
        src = SRC_OVERRIDES.get(local, flat_src(local))
        nested = CDN + "/brightluxx/" + local.lstrip("/")
        url_map[local] = process(src, name, fallback_url=nested)

    # 3. Update preview DB projects
    from motor.motor_asyncio import AsyncIOMotorClient

    async def fix_db():
        c = AsyncIOMotorClient(os.environ['MONGO_URL'])
        db = c[os.environ['DB_NAME']]
        n = 0
        async for doc in db.projects.find({}):
            updates = {}
            for field, val in doc.items():
                if isinstance(val, str) and val in url_map:
                    updates[field] = url_map[val]
                elif isinstance(val, list):
                    new_list = [url_map.get(v, v) if isinstance(v, str) else v for v in val]
                    if new_list != val:
                        updates[field] = new_list
            if updates:
                await db.projects.update_one({"_id": doc["_id"]}, {"$set": updates})
                n += 1
        print(f"DB: updated {n} project docs")

    asyncio.run(fix_db())

    # 4. Update seed_data_full.json (exact string replacement)
    seed_path = '/app/backend/seed_data_full.json'
    text = open(seed_path).read()
    replaced = 0
    for old, new in url_map.items():
        if old in text:
            text = text.replace(old, new)
            replaced += 1
    open(seed_path, 'w').write(text)
    print(f"Seed: replaced {replaced} image paths")

    leftover = text.count('/downloaded-images/') + text.count('/generated-images/') + text.count('/api/cdn/')
    print(f"Seed leftover dead paths: {leftover}")


if __name__ == "__main__":
    main()
