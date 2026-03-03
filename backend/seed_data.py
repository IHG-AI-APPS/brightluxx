"""Seed script for Brightluxx database with realistic LED product data."""
import asyncio
import uuid
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

# Placeholder images
IMG_PRODUCT_1 = "https://images.unsplash.com/photo-1654246513422-2429316733c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85"
IMG_PRODUCT_2 = "https://images.unsplash.com/photo-1588593578282-a3f494078ad0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85"
IMG_PRODUCT_3 = "/generated/microled_display.png"
IMG_PRODUCT_4 = "/generated/corporate_boardroom.png"
IMG_PRODUCT_5 = "/generated/control_room_led.png"
IMG_PRODUCT_6 = "/generated/transparent_led_retail.png"
IMG_PRODUCT_7 = "/generated/outdoor_dooh_dubai.png"
IMG_PRODUCT_8 = "/generated/event_stage_led.png"

IMG_INSP_1 = "https://images.pexels.com/photos/1103969/pexels-photo-1103969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
IMG_INSP_2 = "https://images.pexels.com/photos/29861346/pexels-photo-29861346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
IMG_INSP_3 = "/generated/3d_holographic_mall.png"
IMG_INSP_4 = "/generated/event_stage_led.png"
IMG_INSP_5 = "/generated/corporate_boardroom.png"
IMG_INSP_6 = "/generated/outdoor_dooh_dubai.png"

IMG_PROJECT_1 = "https://images.unsplash.com/photo-1583680093447-2acef3f67f0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMG5pZ2h0JTIwYXJjaGl0ZWN0dXJlJTIwbGlnaHRzfGVufDB8fHxibGFja3wxNzcyNTU5ODYzfDA&ixlib=rb-4.1.0&q=85"
IMG_PROJECT_2 = "/generated/outdoor_dooh_dubai.png"
IMG_PROJECT_3 = "/generated/corporate_boardroom.png"
IMG_PROJECT_4 = "/generated/3d_holographic_mall.png"


PRODUCTS = [
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-UHP139",
        "name": "UltraHD Pro 1.3mm",
        "slug": "bl-uhp139",
        "category": "micro-led",
        "tagline": "Precision micro-LED for mission-critical environments.",
        "description": "Engineered for corporate boardrooms and command centres where image fidelity is non-negotiable. The BL-UHP139 delivers reference-grade colour accuracy across a 1.3mm pixel pitch, seamless cabinet alignment, and 24/7 operational reliability.",
        "pixel_pitch": "1.37mm",
        "resolution": "480 x 270 per panel",
        "brightness": "600 nits",
        "application": "Boardrooms, Control Rooms",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.37mm"},
            {"label": "Brightness", "value": "600 nits"},
            {"label": "Panel Size", "value": "600 x 337.5mm"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Contrast", "value": "5000:1"},
            {"label": "Lifespan", "value": "100,000 hrs"},
            {"label": "Weight", "value": "7.5 kg/panel"},
            {"label": "Operating Temp", "value": "-20 to 50 deg C"}
        ],
        "image_url": IMG_PRODUCT_4,
        "gallery": [IMG_PRODUCT_4, IMG_PRODUCT_5],
        "featured": True,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-UHP095",
        "name": "UltraHD Pro 0.9mm",
        "slug": "bl-uhp095",
        "category": "micro-led",
        "tagline": "Sub-millimetre clarity for premium installations.",
        "description": "Purpose-built for close-viewing applications where every pixel matters. The BL-UHP095 combines 0.9mm COB technology with front-serviceability, delivering cinema-grade visual immersion in executive suites and flagship retail.",
        "pixel_pitch": "0.93mm",
        "resolution": "640 x 360 per panel",
        "brightness": "500 nits",
        "application": "Executive Suites, Flagship Retail",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.93mm"},
            {"label": "Brightness", "value": "500 nits"},
            {"label": "Panel Size", "value": "600 x 337.5mm"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Technology", "value": "COB (Chip-on-Board)"},
            {"label": "Contrast", "value": "8000:1"},
            {"label": "Viewing Angle", "value": "170 deg"},
            {"label": "Service", "value": "Front-access magnetic"}
        ],
        "image_url": IMG_PRODUCT_3,
        "gallery": [IMG_PRODUCT_3, IMG_PRODUCT_5],
        "featured": True,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-OBX390",
        "name": "Outdoor Brilliance 3.9mm",
        "slug": "bl-obx390",
        "category": "outdoor",
        "tagline": "Maximum visibility under direct sunlight.",
        "description": "Designed for the Gulf region's extreme conditions. IP65 front and rear protection, 7,000-nit peak brightness, and advanced thermal management ensure flawless performance from Riyadh to Dubai.",
        "pixel_pitch": "3.91mm",
        "resolution": "256 x 128 per panel",
        "brightness": "7,000 nits",
        "application": "Building Facades, Highway DOOH",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.91mm"},
            {"label": "Brightness", "value": "7,000 nits"},
            {"label": "IP Rating", "value": "IP65 front & rear"},
            {"label": "Panel Size", "value": "960 x 960mm"},
            {"label": "Operating Temp", "value": "-20 to 60 deg C"},
            {"label": "Power", "value": "520W/sqm avg"},
            {"label": "Weight", "value": "28 kg/panel"},
            {"label": "Lifespan", "value": "100,000 hrs"}
        ],
        "image_url": IMG_PRODUCT_7,
        "gallery": [IMG_PRODUCT_7],
        "featured": True,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-OBX680",
        "name": "Outdoor Brilliance 6.8mm",
        "slug": "bl-obx680",
        "category": "outdoor",
        "tagline": "Large-format digital billboards made reliable.",
        "description": "Optimised for long-distance viewing and large-format installations. The BL-OBX680 delivers punchy visuals at exceptional value, with quick-lock cabinets and remote diagnostics.",
        "pixel_pitch": "6.8mm",
        "resolution": "128 x 128 per panel",
        "brightness": "8,000 nits",
        "application": "Billboards, Sports Stadiums",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "6.8mm"},
            {"label": "Brightness", "value": "8,000 nits"},
            {"label": "IP Rating", "value": "IP65"},
            {"label": "Panel Size", "value": "960 x 960mm"},
            {"label": "Operating Temp", "value": "-30 to 60 deg C"},
            {"label": "Viewing Distance", "value": "6m+"},
            {"label": "Scan Mode", "value": "1/8 scan"},
            {"label": "Cabinet", "value": "Die-cast aluminium"}
        ],
        "image_url": IMG_PRODUCT_1,
        "gallery": [IMG_PRODUCT_1, IMG_PRODUCT_7],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-RPX290",
        "name": "RentalPro X 2.9mm",
        "slug": "bl-rpx290",
        "category": "rental",
        "tagline": "Built for fast turnarounds and touring rigs.",
        "description": "The industry standard for live events and exhibitions. Lightweight die-cast cabinets, tool-free connections, and curving capability make the BL-RPX290 the go-to for AV rental houses across the Gulf.",
        "pixel_pitch": "2.97mm",
        "resolution": "168 x 168 per panel",
        "brightness": "4,500 nits",
        "application": "Events, Exhibitions, Touring",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.97mm"},
            {"label": "Brightness", "value": "4,500 nits"},
            {"label": "Panel Size", "value": "500 x 500mm"},
            {"label": "Weight", "value": "7.3 kg/panel"},
            {"label": "Curvable", "value": "-10 to +10 deg"},
            {"label": "Setup", "value": "Tool-free quick-lock"},
            {"label": "IP Rating", "value": "IP43"},
            {"label": "Power", "value": "340W/sqm avg"}
        ],
        "image_url": IMG_PRODUCT_8,
        "gallery": [IMG_PRODUCT_8],
        "featured": True,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-RPX390",
        "name": "RentalPro X 3.9mm",
        "slug": "bl-rpx390",
        "category": "rental",
        "tagline": "Versatile event display for mid-range budgets.",
        "description": "Balances visual impact with budget efficiency for mid-scale events. Quick-rig design and 500x1000mm cabinets cover large stages rapidly with minimal crew.",
        "pixel_pitch": "3.91mm",
        "resolution": "128 x 256 per panel",
        "brightness": "4,500 nits",
        "application": "Conferences, Gala Dinners",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.91mm"},
            {"label": "Brightness", "value": "4,500 nits"},
            {"label": "Panel Size", "value": "500 x 1000mm"},
            {"label": "Weight", "value": "8.5 kg/panel"},
            {"label": "Curvable", "value": "Concave/Convex"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Greyscale", "value": "16-bit"},
            {"label": "Setup", "value": "Quick-rig hanging"}
        ],
        "image_url": IMG_PRODUCT_2,
        "gallery": [IMG_PRODUCT_2, IMG_PRODUCT_8],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-TPX380",
        "name": "TransparentPro 3.8mm",
        "slug": "bl-tpx380",
        "category": "transparent",
        "tagline": "See through. Stand out.",
        "description": "Transforms glass facades into digital canvases without blocking natural light. Up to 85% transparency, lightweight strip design, and silent operation make the BL-TPX380 ideal for luxury retail and architectural media.",
        "pixel_pitch": "3.8mm",
        "resolution": "Custom per facade",
        "brightness": "5,500 nits",
        "application": "Glass Facades, Luxury Retail",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.8mm"},
            {"label": "Transparency", "value": "up to 85%"},
            {"label": "Brightness", "value": "5,500 nits"},
            {"label": "Weight", "value": "12 kg/sqm"},
            {"label": "Installation", "value": "Curtain / Adhesive"},
            {"label": "IP Rating", "value": "IP43"},
            {"label": "Noise", "value": "Silent (no fans)"},
            {"label": "Power", "value": "280W/sqm avg"}
        ],
        "image_url": IMG_PRODUCT_6,
        "gallery": [IMG_PRODUCT_6],
        "featured": True,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-IFP250",
        "name": "IndoorFine 2.5mm",
        "slug": "bl-ifp250",
        "category": "indoor",
        "tagline": "Workhorse display for professional interiors.",
        "description": "The reliable choice for lobbies, retail environments, and corporate communications. The BL-IFP250 combines crisp 2.5mm pitch with energy-efficient design and front-access serviceability.",
        "pixel_pitch": "2.5mm",
        "resolution": "240 x 240 per panel",
        "brightness": "1,200 nits",
        "application": "Lobbies, Retail, Signage",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.5mm"},
            {"label": "Brightness", "value": "1,200 nits"},
            {"label": "Panel Size", "value": "600 x 600mm"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Contrast", "value": "5000:1"},
            {"label": "Service", "value": "Front-access"},
            {"label": "Power", "value": "280W/sqm avg"},
            {"label": "Weight", "value": "8 kg/panel"}
        ],
        "image_url": IMG_PRODUCT_5,
        "gallery": [IMG_PRODUCT_5, IMG_PRODUCT_4],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-CVX160",
        "name": "CreativeVault 1.6mm",
        "slug": "bl-cvx160",
        "category": "creative",
        "tagline": "Curved, shaped, limitless.",
        "description": "Purpose-built for sculptural and immersive installations. Flexible module design allows concave, convex, and irregular shapes, transforming architectural spaces into experiential media environments.",
        "pixel_pitch": "1.6mm",
        "resolution": "320 x 160 per module",
        "brightness": "800 nits",
        "application": "Museums, Experience Centres",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.6mm"},
            {"label": "Brightness", "value": "800 nits"},
            {"label": "Module Size", "value": "256 x 128mm"},
            {"label": "Curvable", "value": "Full 360 deg"},
            {"label": "Min Radius", "value": "500mm"},
            {"label": "Contrast", "value": "6000:1"},
            {"label": "Greyscale", "value": "16-bit"},
            {"label": "Service", "value": "Rear magnetic"}
        ],
        "image_url": IMG_PRODUCT_1,
        "gallery": [IMG_PRODUCT_1],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-APX195",
        "name": "AllPixel Pro 1.9mm",
        "slug": "bl-apx195",
        "category": "indoor",
        "tagline": "Versatile fine-pitch for any professional space.",
        "description": "A fine-pitch all-rounder built for TV studios, houses of worship, and mid-size corporate video walls. Seamless calibration across large arrays and consistent colour uniformity.",
        "pixel_pitch": "1.95mm",
        "resolution": "320 x 180 per panel",
        "brightness": "800 nits",
        "application": "TV Studios, Corporate Video Walls",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.95mm"},
            {"label": "Brightness", "value": "800 nits"},
            {"label": "Panel Size", "value": "600 x 337.5mm"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Uniformity", "value": "Module-level calibration"},
            {"label": "Colour Temp", "value": "3000K - 9500K adj"},
            {"label": "Power", "value": "240W/sqm avg"},
            {"label": "Lifespan", "value": "100,000 hrs"}
        ],
        "image_url": IMG_PRODUCT_3,
        "gallery": [IMG_PRODUCT_3, IMG_PRODUCT_4],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-FLX780",
        "name": "FlexiMesh 7.8mm",
        "slug": "bl-flx780",
        "category": "creative",
        "tagline": "Ultra-light mesh for architectural media.",
        "description": "Weighing just 4.5 kg/sqm, the BL-FLX780 drapes over building facades and stage backdrops like fabric. Wind-permeable mesh design ensures structural safety while delivering vivid visuals.",
        "pixel_pitch": "7.8mm",
        "resolution": "128 x 64 per strip",
        "brightness": "6,000 nits",
        "application": "Building Wraps, Stage Backdrops",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "7.8mm"},
            {"label": "Brightness", "value": "6,000 nits"},
            {"label": "Weight", "value": "4.5 kg/sqm"},
            {"label": "Transparency", "value": "60%"},
            {"label": "Wind Load", "value": "Tested 120km/h"},
            {"label": "IP Rating", "value": "IP65"},
            {"label": "Power", "value": "180W/sqm avg"},
            {"label": "Installation", "value": "Tension wire / Frame"}
        ],
        "image_url": IMG_PRODUCT_2,
        "gallery": [IMG_PRODUCT_2],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()),
        "product_code": "BL-SPX470",
        "name": "SportPro 4.7mm",
        "slug": "bl-spx470",
        "category": "outdoor",
        "tagline": "Stadium-grade perimeter and scoreboard LED.",
        "description": "Built for the demands of live sports: 10,000-nit brightness, impact-resistant face, and instant content switching. Perimeter-compatible form factor with integrated padding.",
        "pixel_pitch": "4.7mm",
        "resolution": "204 x 204 per panel",
        "brightness": "10,000 nits",
        "application": "Sports Perimeter, Scoreboards",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "4.7mm"},
            {"label": "Brightness", "value": "10,000 nits"},
            {"label": "Panel Size", "value": "960 x 960mm"},
            {"label": "Impact Protection", "value": "Soft mask + padding"},
            {"label": "IP Rating", "value": "IP65 front / IP54 rear"},
            {"label": "Scan Mode", "value": "1/6 high refresh"},
            {"label": "Viewing Distance", "value": "5m+"},
            {"label": "Weight", "value": "32 kg/panel"}
        ],
        "image_url": IMG_PRODUCT_7,
        "gallery": [IMG_PRODUCT_7],
        "featured": False,
        "created_at": datetime.now(timezone.utc)
    }
]

INSPIRATIONS = [
    {
        "id": str(uuid.uuid4()), "title": "Immersive Retail Experience", "slug": "immersive-retail",
        "category": "retail", "description": "Full-wall LED displays transforming shopping into a sensory journey.",
        "image_url": IMG_INSP_3, "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Stadium Spectacle", "slug": "stadium-spectacle",
        "category": "events", "description": "Wrapping an entire arena in dynamic LED content.",
        "image_url": IMG_INSP_1, "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Architectural Media Facade", "slug": "architectural-media-facade",
        "category": "outdoor", "description": "Buildings that communicate. Transparent LED integrated into glass curtain walls.",
        "image_url": IMG_INSP_2, "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Corporate Command Centre", "slug": "corporate-command-centre",
        "category": "corporate", "description": "Mission-critical video walls for real-time decision making.",
        "image_url": IMG_INSP_5, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Luxury Hotel Lobby", "slug": "luxury-hotel-lobby",
        "category": "hospitality", "description": "Digital art installations that redefine guest arrival experiences.",
        "image_url": IMG_INSP_4, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Concert Stage Design", "slug": "concert-stage-design",
        "category": "events", "description": "Curved and shaped LED creating immersive stage environments.",
        "image_url": IMG_INSP_4, "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Interactive Museum Gallery", "slug": "interactive-museum-gallery",
        "category": "art", "description": "Touch-responsive LED floors and walls for cultural institutions.",
        "image_url": IMG_INSP_3, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Digital Highway Billboard", "slug": "digital-highway-billboard",
        "category": "outdoor", "description": "High-brightness roadside displays engineered for Gulf heat.",
        "image_url": IMG_INSP_6, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Transparent Storefront", "slug": "transparent-storefront",
        "category": "retail", "description": "Glass-mounted LED that advertises without blocking the view.",
        "image_url": IMG_INSP_2, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Airport Welcome Wall", "slug": "airport-welcome-wall",
        "category": "corporate", "description": "Large-format arrival hall displays for branding and wayfinding.",
        "image_url": IMG_INSP_1, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Mosque Ambient Lighting", "slug": "mosque-ambient-lighting",
        "category": "art", "description": "Gentle LED integration respecting sacred architecture.",
        "image_url": IMG_INSP_5, "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Expo Pavilion Ceiling", "slug": "expo-pavilion-ceiling",
        "category": "events", "description": "Overhead LED canvas turning pavilion ceilings into digital skies.",
        "image_url": IMG_INSP_6, "featured": False, "created_at": datetime.now(timezone.utc)
    },
]

PROJECTS = [
    {
        "id": str(uuid.uuid4()), "title": "Dubai Mall Digital Atrium", "slug": "dubai-mall-digital-atrium",
        "client_name": "Emaar Properties", "location": "Dubai, UAE", "sector": "retail",
        "screen_size": "340 sqm", "description": "A floor-to-ceiling LED installation in the Dubai Mall's main atrium, creating a dynamic digital environment that adapts content seasonally.",
        "image_url": IMG_PROJECT_4, "gallery": [IMG_PROJECT_4, IMG_INSP_3],
        "technologies_used": ["BL-UHP139", "BL-IFP250"],
        "metrics": [{"label": "Screen Area", "value": "340 sqm"}, {"label": "Resolution", "value": "8K+"}, {"label": "Uptime", "value": "99.97%"}],
        "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Sheikh Zayed Road DOOH Network", "slug": "szr-dooh-network",
        "client_name": "Roads & Transport Authority", "location": "Dubai, UAE", "sector": "outdoor",
        "screen_size": "1,200 sqm total", "description": "A network of 15 high-brightness outdoor LED displays along Sheikh Zayed Road, engineered to withstand 60 deg C ambient temperatures and direct sunlight.",
        "image_url": IMG_PROJECT_2, "gallery": [IMG_PROJECT_2, IMG_PRODUCT_7],
        "technologies_used": ["BL-OBX390", "BL-OBX680"],
        "metrics": [{"label": "Total Area", "value": "1,200 sqm"}, {"label": "Displays", "value": "15 units"}, {"label": "Max Brightness", "value": "7,000 nits"}],
        "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "ADNOC HQ Command Centre", "slug": "adnoc-command-centre",
        "client_name": "ADNOC Group", "location": "Abu Dhabi, UAE", "sector": "corporate",
        "screen_size": "86 sqm", "description": "A 24/7 operations command centre featuring seamless micro-LED video walls for real-time data visualisation and critical infrastructure monitoring.",
        "image_url": IMG_PROJECT_3, "gallery": [IMG_PROJECT_3, IMG_PRODUCT_5],
        "technologies_used": ["BL-UHP095", "BL-UHP139"],
        "metrics": [{"label": "Screen Area", "value": "86 sqm"}, {"label": "Pixel Pitch", "value": "0.93mm"}, {"label": "Operation", "value": "24/7"}],
        "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Atlantis The Royal Grand Ballroom", "slug": "atlantis-royal-ballroom",
        "client_name": "Atlantis Resorts", "location": "Dubai, UAE", "sector": "hospitality",
        "screen_size": "180 sqm", "description": "Curved LED walls and ceiling panels in the grand ballroom, delivering immersive event experiences for high-profile galas and conferences.",
        "image_url": IMG_PROJECT_1, "gallery": [IMG_PROJECT_1, IMG_PRODUCT_8],
        "technologies_used": ["BL-RPX290", "BL-CVX160"],
        "metrics": [{"label": "Screen Area", "value": "180 sqm"}, {"label": "Format", "value": "Curved + Ceiling"}, {"label": "Events/Year", "value": "200+"}],
        "featured": True, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Riyadh Season Stage", "slug": "riyadh-season-stage",
        "client_name": "General Entertainment Authority", "location": "Riyadh, KSA", "sector": "events",
        "screen_size": "520 sqm", "description": "A massive concert stage LED installation for Riyadh Season featuring floor, backdrop, and side LED panels with real-time content synchronisation.",
        "image_url": IMG_INSP_1, "gallery": [IMG_INSP_1, IMG_INSP_4],
        "technologies_used": ["BL-RPX290", "BL-RPX390"],
        "metrics": [{"label": "Screen Area", "value": "520 sqm"}, {"label": "Setup Time", "value": "48 hrs"}, {"label": "Attendance", "value": "40,000"}],
        "featured": False, "created_at": datetime.now(timezone.utc)
    },
    {
        "id": str(uuid.uuid4()), "title": "Mall of the Emirates Glass Facade", "slug": "moe-glass-facade",
        "client_name": "Majid Al Futtaim", "location": "Dubai, UAE", "sector": "retail",
        "screen_size": "420 sqm", "description": "Transparent LED integrated into the exterior glass curtain wall, displaying dynamic advertising while maintaining 85% transparency and natural light.",
        "image_url": IMG_INSP_2, "gallery": [IMG_INSP_2, IMG_PRODUCT_6],
        "technologies_used": ["BL-TPX380"],
        "metrics": [{"label": "Screen Area", "value": "420 sqm"}, {"label": "Transparency", "value": "85%"}, {"label": "Revenue Uplift", "value": "+32%"}],
        "featured": False, "created_at": datetime.now(timezone.utc)
    },
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["brightluxx"]

    # Clear old data
    await db["products"].delete_many({})
    await db["inspirations"].delete_many({})
    await db["projects"].delete_many({})
    # Keep leads

    # Also clear old collections
    await db["technologies"].delete_many({})
    await db["applications"].delete_many({})
    await db["case_studies"].delete_many({})
    await db["updates"].delete_many({})

    # Insert new data
    if PRODUCTS:
        await db["products"].insert_many(PRODUCTS)
        print(f"Inserted {len(PRODUCTS)} products")

    if INSPIRATIONS:
        await db["inspirations"].insert_many(INSPIRATIONS)
        print(f"Inserted {len(INSPIRATIONS)} inspirations")

    if PROJECTS:
        await db["projects"].insert_many(PROJECTS)
        print(f"Inserted {len(PROJECTS)} projects")

    print("Seed complete!")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
