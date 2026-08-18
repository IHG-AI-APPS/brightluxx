"""Generate a bespoke product image for each of the 94 products, upload to CDN, update DB."""
import asyncio, base64, io, json, os, sys, time

sys.path.insert(0, '/app/backend')
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')
from PIL import Image
from emergentintegrations.llm.chat import LlmChat, UserMessage
from cdn_upload import upload_to_cdn
from motor.motor_asyncio import AsyncIOMotorClient

STYLE = ("Photorealistic professional marketing photograph, high detail, realistic scale, "
         "no text overlays, no captions, no watermarks, no logos. Wide 4:3 composition.")

CAT = {
    "cob-microled": "an ultra fine-pitch COB MicroLED video wall panel array mounted seamlessly on a wall in a dark premium showroom, vivid colorful abstract content on screen, warm amber accent lighting",
    "mip": "a premium fine-pitch MiP LED video wall in a luxury corporate lobby, crisp vivid imagery on screen, dark elegant interior with warm accent lighting",
    "transparent": "a transparent LED display mounted on a glass storefront window, glowing content visible while seeing through the glass behind it, upscale retail setting at dusk",
    "flexible": "a curved flexible LED display panel bent into a smooth concave wave shape showing vivid flowing content, dark showroom, warm accent lighting",
    "interactive": "an interactive LED floor display with a person stepping on it triggering glowing ripple effects, modern dark venue",
    "all-in-one": "a slim wall-mounted all-in-one LED display screen in a modern executive boardroom showing a vivid 4K presentation, elegant office interior",
    "dvled": "a giant seamless DVLED home cinema wall screen in a luxury private residence media room showing a vivid movie scene, plush dark seating, warm ambient lighting",
    "outdoor": "a large outdoor LED advertising billboard mounted on a modern building in a city at dusk, bright vivid content, realistic urban environment",
    "rental": "modular rental LED screen panels rigged on a concert stage with truss and flight cases nearby, vivid stage visuals, dark event venue with stage lighting",
    "indoor": "a large seamless indoor LED video wall in a modern corporate lobby showing vivid branded content, elegant interior, warm accent lighting",
    "naked-eye-3d": "a curved corner naked-eye 3D LED billboard on a building exterior at dusk with hyper-realistic 3D content appearing to pop out of the screen, city street below",
    "poster-totem": "a slim freestanding digital LED poster totem display in a mall walkway showing a vivid vertical advertisement, upscale retail environment",
    "cinema-led": "a premium fine-pitch cinema LED screen wall in a private screening room showing a vivid film scene, luxury cinema seating, dark room with soft aisle lighting",
    "sphere": "a large spherical LED display globe suspended in a modern atrium showing animated planet visuals wrapping around the sphere, dark space with accent lighting",
    "virtual-production": "a huge curved LED volume stage for film virtual production with a camera crew silhouette, vivid photoreal environment displayed on the wall and ceiling panels, film studio",
    "shelf-edge": "ultra-thin shelf-edge LED strip displays mounted on retail supermarket shelves showing vivid price and promo graphics, modern store aisle",
    "ceiling-led": "a large LED screen installed on the ceiling of a luxury hotel lobby displaying a vivid sky scene, people below looking up, elegant architecture",
    "accessories": None,  # slug-specific
    "custom-shapes": None,
    "digital-signage": None,
    "smart-tv": None,
    "ready-made": None,
    "signage-solutions": None,
    "art-immersive": None,
    "home-cinema": None,
}

SLUG = {
    # accessories
    "novastar-mctrl4k-controller": "a professional LED display video controller rack unit with ports and status LEDs, studio product shot on dark surface with soft lighting",
    "colorlight-z6-media-server": "a professional LED media server hardware unit with front panel display, studio product shot on dark surface with soft lighting",
    "led-power-supply-200w": "an industrial 200W LED display power supply unit with terminals, clean studio product shot on dark surface",
    "mounting-bracket-wall": "a heavy-duty steel wall mounting bracket kit for LED display panels laid out neatly, studio product shot on dark surface",
    # custom shapes
    "round-led-display-p25": "a circular round LED display disc mounted on a wall showing vivid animated content, modern dark venue",
    "cube-led-display-p3": "a cube-shaped LED display with screens on all visible faces showing synchronized vivid content, suspended in a modern retail atrium",
    "cone-led-display-p4": "a cone-shaped 360-degree LED display column showing wrapping vivid content, modern mall atrium",
    # digital signage
    "digital-signage-pro-55": "a slim 55-inch commercial digital signage display mounted in portrait in a modern office lobby showing vivid content",
    "digital-signage-outdoor-75": "a rugged 75-inch outdoor digital signage totem with weatherproof enclosure on a city sidewalk in daylight showing bright content",
    "digital-kiosk-interactive-43": "a freestanding interactive touchscreen kiosk with a person tapping the 43-inch screen, modern mall interior",
    # smart tv
    "commercial-smart-tv-85": "an 85-inch commercial 4K smart TV mounted in a modern hotel lounge showing vivid content, elegant interior",
    "outdoor-smart-tv-65": "a weatherproof 65-inch outdoor TV mounted on a luxury villa terrace wall by an outdoor seating area, bright vivid picture in daylight",
    # ready-made
    "plug-play-videowall-2x2": "a 2x2 LED video wall bundle on a wall mount in a meeting room showing one seamless vivid image, modern office",
    "portable-led-stand-p25": "a portable LED display screen on a wheeled floor stand in an exhibition hall, vivid content, easy-move design visible",
    "meeting-room-led-136": "a 136-inch all-in-one LED display in a modern meeting room during a presentation, vivid dashboard on screen, conference table in front",
    # art & immersive
    "artframe-pro-09": "a wall-mounted LED display framed like a museum artwork with an ornate minimal frame, displaying vivid digital fine art in a gallery with spotlight",
    "artframe-gallery-12": "a large framed LED art display in an art gallery wall showing an animated painting, visitors admiring it, gallery lighting",
    "immersawall-360": "a wraparound 360-degree immersive LED room with floor-to-ceiling screens displaying an underwater ocean scene surrounding visitors",
    "immersafloor-p39": "a large interactive LED floor in an immersive exhibition displaying a glowing koi pond scene with visitors walking across",
    "xr-stage-pro-15": "an XR virtual production LED stage with curved wall and LED floor showing a photoreal desert environment, film camera on set",
    "xr-curve-26": "a large curved LED backdrop screen on an XR broadcast stage showing a futuristic cityscape, studio cameras in foreground",
    "metaportal-18": "a doorway-shaped LED portal installation glowing with a vivid galaxy scene, people walking toward it in a dark exhibition hall",
    "metaroom-cube": "a cube-shaped immersive LED room with screens on walls and ceiling displaying a forest scene, one visitor inside",
    "sculptled-sphere-3d": "a sculptural 3D LED sphere art installation displaying flowing particle animations, suspended in a museum atrium",
    "sculptled-ribbon-flex": "a ribbon-shaped flexible LED sculpture twisting through a hotel lobby ceiling displaying flowing golden light streams",
    "urbancanvas-p6-outdoor": "a building facade turned into a giant outdoor LED media canvas displaying vivid art at night, city plaza with people below",
    "urbancanvas-transparent-mesh": "a transparent LED mesh screen covering a glass building facade showing glowing patterns while the building remains visible behind, dusk",
    "touchwall-interactive-p25": "an interactive LED touch wall with a person touching the screen creating colorful particle trails, modern experience center",
    "kineticled-responsive-p39": "a kinetic LED installation of moving triangular LED panels shifting positions on a wall while displaying synchronized content, dark gallery",
    # home cinema
    "cinemaled-pro-12": "a premium LED home cinema wall screen showing a vivid blockbuster scene in a luxury private theater with recliner seating",
    "cinemaled-ultra-09": "an ultra fine-pitch LED home cinema screen in an opulent private screening room, vivid movie scene, marble and velvet interior",
    "ambientscreen-15": "a large ambient LED display integrated into a luxury living room wall showing a serene mountain landscape, elegant furniture",
    "ambientscreen-curved-18": "a gently curved ambient LED screen wrapping a luxury lounge wall showing a calming ocean scene, warm interior lighting",
    "poolview-p39": "a weatherproof outdoor LED screen mounted beside a luxury villa swimming pool showing a vivid movie at dusk, loungers and pool lights",
    "poolview-retractable-p29": "a retractable outdoor LED screen rising from a housing beside an infinity pool at a luxury villa at dusk, vivid picture",
    "theaterpro-complete": "a complete luxury home theater with a large LED wall screen, acoustic wall panels and premium recliners, movie playing",
    "theaterpro-mini": "a compact luxury home theater room with an LED screen wall and four recliner seats, cozy dark interior, movie playing",
    "gamewall-240hz": "a high-refresh LED gaming wall in a luxury gaming room showing a fast racing game, RGB ambient lighting, gaming chair in front",
    "gamewall-sim-180": "a 180-degree curved LED simulator screen wrapping around a racing simulator cockpit showing an immersive race track",
    # signage solutions
    "frontlit-channel-letters-rgb": "illuminated front-lit RGB channel letter signage spelling a generic word BRIGHT mounted on a modern storefront fascia at dusk, glowing color letters",
    "halo-lit-channel-letters": "halo-lit reverse channel letters on a dark storefront wall at night with a soft glowing halo behind each letter",
    "dual-lit-channel-letters-pro": "dual-lit channel letter signage with glowing faces and halo backlight on a premium retail facade at night",
    "neoflex-led-letters": "neon-flex LED letter signage glowing in warm white on a dark cafe interior wall, stylish ambiance",
    "3d-fabricated-led-letters": "large 3D fabricated stainless steel letters with LED illumination mounted on a corporate building entrance wall, dusk",
    "mini-channel-letters-indoor": "small indoor illuminated mini channel letters on a boutique reception wall, elegant interior",
    "qsr-digital-menu-board-55": "a row of three 55-inch digital menu boards above a fast food restaurant counter showing vivid burger menu imagery",
    "drive-thru-led-menu-p25": "an outdoor drive-thru LED menu board display at a fast food lane showing a bright menu, car at the speaker post",
    "video-wall-menu-system-3x3": "a 3x3 video wall menu system behind a restaurant counter showing one seamless appetizing food visual",
    "interactive-directory-kiosk": "a freestanding interactive directory kiosk with wayfinding map on screen in a shopping mall atrium, person using it",
    "airport-fids-display-p15": "a fine-pitch LED flight information display board in an airport terminal showing departure rows, travelers below",
    "pylon-led-wayfinding-sign": "a tall outdoor pylon sign with integrated LED display panels at a business park entrance at dusk",
    "gas-station-price-led-sign": "a gas station price sign with bright LED digit displays showing fuel prices, station canopy in background at dusk",
    "window-led-signage-film": "adhesive transparent LED film applied to a retail window glass displaying glowing promotional graphics while remaining see-through",
}


def build_prompt(p):
    scene = SLUG.get(p['slug']) or CAT.get(p['cat'])
    if not scene:
        scene = "a premium LED display product in a modern dark showroom with vivid content on screen"
    pitch = f" with an ultra-fine {p['pitch']} pixel pitch" if p.get('pitch') and 'N/A' not in str(p['pitch']) else ""
    return (f"{STYLE} Subject: {scene}. This depicts the product '{p['name']}'{pitch}, "
            f"a professional-grade LED display product by a premium brand.")


def optimize(data, max_w=1200, target_kb=150):
    img = Image.open(io.BytesIO(data))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    if img.width > max_w:
        img = img.resize((max_w, int(img.height * max_w / img.width)), Image.LANCZOS)
    for q in (82, 72, 62, 50):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= target_kb * 1024:
            break
    return buf.getvalue()


async def gen_image(prompt, slug, retries=2):
    for attempt in range(retries + 1):
        try:
            chat = LlmChat(api_key=os.environ['EMERGENT_LLM_KEY'],
                           session_id=f"prodimg-{slug}-{attempt}",
                           system_message="You generate photorealistic product marketing images.")
            chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
            _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
            if images:
                return base64.b64decode(images[0]['data'])
        except Exception as e:
            print(f"  {slug} attempt {attempt} failed: {str(e)[:120]}", flush=True)
            await asyncio.sleep(5)
    return None


async def main():
    products = json.load(open('/tmp/products_list.json'))
    db = AsyncIOMotorClient(os.environ['MONGO_URL'])[os.environ['DB_NAME']]
    done = fail = 0
    for i, p in enumerate(products):
        slug = p['slug']
        target = f"prod_{slug}.webp"
        current = await db.products.find_one({'slug': slug}, {'image_url': 1})
        if current and target in (current.get('image_url') or ''):
            print(f"[{i+1}/94] {slug}: already done, skip", flush=True)
            done += 1
            continue
        raw = await gen_image(build_prompt(p), slug)
        if not raw:
            print(f"[{i+1}/94] {slug}: FAILED", flush=True)
            fail += 1
            continue
        opt = optimize(raw)
        url = upload_to_cdn(target, opt, "site-images")
        await db.products.update_one({'slug': slug}, {'$set': {'image_url': url}})
        done += 1
        print(f"[{i+1}/94] {slug}: {len(opt)//1024}KB -> {url}", flush=True)
        await asyncio.sleep(1)
    print(f"DONE: {done} ok, {fail} failed", flush=True)

asyncio.run(main())
