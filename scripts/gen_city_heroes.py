"""Generate 7 GCC city skyline hero images, optimize, upload to CDN."""
import asyncio, io, os, sys

sys.path.insert(0, '/app/backend')
sys.path.insert(0, '/app/scripts')
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')
from PIL import Image
from gen_product_images import gen_image
from cdn_upload import upload_to_cdn

STYLE = ("Photorealistic professional cityscape photograph at dusk, wide panoramic composition, "
         "rich golden-hour and blue-hour lighting, ultra sharp, no text, no captions, no watermarks.")

CITIES = {
    "hero_dubai": "The Dubai skyline along Sheikh Zayed Road with the Burj Khalifa towering at center, glowing skyscrapers and light trails on the highway",
    "hero_abu_dhabi": "The Abu Dhabi Corniche skyline with the curved Etihad Towers and waterfront promenade, warm amber city lights reflecting on the Arabian Gulf",
    "hero_qatar": "The Doha West Bay skyline across the bay from the Corniche, iconic modern towers glowing at dusk with traditional dhow boats on the water",
    "hero_saudi": "The Riyadh skyline featuring the Kingdom Centre Tower with its distinctive arch opening, modern financial district towers lit at dusk",
    "hero_kuwait": "The Kuwait City waterfront skyline with the iconic Kuwait Towers (blue-green spheres) in the foreground at dusk",
    "hero_bahrain": "The Manama skyline in Bahrain with the twin sail-shaped Bahrain World Trade Center towers with wind turbines, waterfront at dusk",
    "hero_oman": "The Muscat Mutrah Corniche at dusk with white low-rise buildings, the rugged Hajar mountains behind, an illuminated fort and dhow harbor",
}


def optimize_hero(data, max_w=1600, target_kb=230):
    img = Image.open(io.BytesIO(data))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    if img.width > max_w:
        img = img.resize((max_w, int(img.height * max_w / img.width)), Image.LANCZOS)
    for q in (82, 74, 66, 58):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= target_kb * 1024:
            break
    return buf.getvalue()


async def main():
    import base64
    for name, scene in CITIES.items():
        prompt = f"{STYLE} Subject: {scene}."
        raw = await gen_image(prompt, name)
        if not raw:
            print(f"{name}: FAILED", flush=True)
            continue
        opt = optimize_hero(raw)
        url = upload_to_cdn(f"{name}.webp", opt, "site-images")
        print(f"{name}: {len(opt)//1024}KB -> {url}", flush=True)
        await asyncio.sleep(1)

asyncio.run(main())
