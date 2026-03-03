"""Seed script for Brightluxx database with 2025/2026 trending LED products."""
import asyncio
import uuid
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

# --- Image URLs ---
IMG = {
    "microled": "/generated/microled_display.png",
    "boardroom": "/generated/corporate_boardroom.png",
    "control": "/generated/control_room_led.png",
    "transparent": "/generated/transparent_led_retail.png",
    "outdoor": "/generated/outdoor_dooh_dubai.png",
    "event": "/generated/event_stage_led.png",
    "holographic": "/generated/3d_holographic_mall.png",
    "unsplash1": "https://images.unsplash.com/photo-1654246513422-2429316733c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85",
    "unsplash2": "https://images.unsplash.com/photo-1588593578282-a3f494078ad0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxsZWQlMjBzY3JlZW4lMjBkaXNwbGF5JTIwc3RhZ2UlMjBsaWdodGluZ3xlbnwwfHx8YmxhY2t8MTc3MjU1OTg2MHww&ixlib=rb-4.1.0&q=85",
    "dubai": "https://images.unsplash.com/photo-1583680093447-2acef3f67f0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMG5pZ2h0JTIwYXJjaGl0ZWN0dXJlJTIwbGlnaHRzfGVufDB8fHxibGFja3wxNzcyNTU5ODYzfDA&ixlib=rb-4.1.0&q=85",
    "facade": "https://images.pexels.com/photos/13936409/pexels-photo-13936409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "floor": "https://images.unsplash.com/photo-1706022381024-a86e7418a71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxMRUQlMjBmbG9vciUyMGRpc3BsYXklMjBpbnRlcmFjdGl2ZSUyMGltbWVyc2l2ZXxlbnwwfHx8fDE3NzI1NjI4MjF8MA&ixlib=rb-4.1.0&q=85",
    "immersive": "https://images.unsplash.com/photo-1734266366152-3f3a41b45c56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxMRUQlMjBmbG9vciUyMGRpc3BsYXklMjBpbnRlcmFjdGl2ZSUyMGltbWVyc2l2ZXxlbnwwfHx8fDE3NzI1NjI4MjF8MA&ixlib=rb-4.1.0&q=85",
    "pexels1": "https://images.pexels.com/photos/1103969/pexels-photo-1103969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "pexels2": "https://images.pexels.com/photos/29861346/pexels-photo-29861346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
}

def _id():
    return str(uuid.uuid4())

def _now():
    return datetime.now(timezone.utc)


# =============================================
#   PRODUCTS — 24 items across 8 categories
# =============================================
PRODUCTS = [
    # ── COB MICRO-LED (Ultra Fine Pitch) ──
    {
        "id": _id(), "product_code": "BL-COB060", "name": "COB MicroLED 0.6mm", "slug": "bl-cob060",
        "category": "cob-microled", "tagline": "Sub-millimetre COB. The future, delivered today.",
        "description": "Next-generation Chip-on-Board technology at 0.6mm pixel pitch. Flip-chip COB architecture reduces solder points by 40% and doubles lifespan versus SMD. Engineered for 24/7 command centres and broadcast studios where pixel-level precision is mission-critical.",
        "pixel_pitch": "0.625mm", "resolution": "960 x 540 per panel", "brightness": "600 nits",
        "application": "Broadcast Studios, Command Centres",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.625mm"}, {"label": "Technology", "value": "Flip-chip COB"},
            {"label": "Brightness", "value": "600 nits"}, {"label": "Contrast", "value": "20,000:1"},
            {"label": "Refresh Rate", "value": "7,680Hz"}, {"label": "Color Depth", "value": "20-bit"},
            {"label": "Panel Size", "value": "600 x 337.5mm"}, {"label": "Lifespan", "value": "100,000 hrs"},
            {"label": "Power Saving", "value": "40% vs SMD"}, {"label": "Service", "value": "Front magnetic"}
        ],
        "image_url": IMG["microled"], "gallery": [IMG["microled"], IMG["control"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-COB093", "name": "COB MicroLED 0.9mm", "slug": "bl-cob093",
        "category": "cob-microled", "tagline": "Cinema-grade COB for premium interiors.",
        "description": "Purpose-built for close-viewing applications where every pixel matters. Full flip-chip COB with 20,000:1 contrast delivers cinema-grade immersion in executive suites and flagship retail environments.",
        "pixel_pitch": "0.93mm", "resolution": "640 x 360 per panel", "brightness": "600 nits",
        "application": "Executive Suites, Flagship Retail, Home Cinema",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.93mm"}, {"label": "Technology", "value": "Full flip-chip COB"},
            {"label": "Brightness", "value": "600 nits"}, {"label": "Contrast", "value": "20,000:1"},
            {"label": "Refresh Rate", "value": "7,680Hz"}, {"label": "Color Depth", "value": "21-bit"},
            {"label": "Viewing Angle", "value": "180 deg"}, {"label": "Weight", "value": "6 kg/panel"},
            {"label": "Certification", "value": "UL / CE"}, {"label": "Service", "value": "Front magnetic"}
        ],
        "image_url": IMG["boardroom"], "gallery": [IMG["boardroom"], IMG["microled"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-COB125", "name": "COB MicroLED 1.2mm", "slug": "bl-cob125",
        "category": "cob-microled", "tagline": "The sweet spot: 8K-ready COB at scale.",
        "description": "8K-capable COB display with LP-grade brightness and 40% lower power consumption than traditional SMD. Large-format 14.5-inch modules reduce seams by 50%, ideal for corporate video walls and meeting rooms.",
        "pixel_pitch": "1.25mm", "resolution": "480 x 270 per panel", "brightness": "1,200 nits",
        "application": "Corporate Video Walls, Meeting Rooms",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.25mm"}, {"label": "Technology", "value": "Flip-chip COB"},
            {"label": "Brightness", "value": "1,200 nits"}, {"label": "Contrast", "value": "10,000:1"},
            {"label": "Refresh Rate", "value": "3,840Hz"}, {"label": "Resolution", "value": "8K capable"},
            {"label": "Module Size", "value": "14.5 inch"}, {"label": "Power Saving", "value": "40% vs SMD"},
            {"label": "Seam Reduction", "value": "50%"}, {"label": "Weight", "value": "7 kg/panel"}
        ],
        "image_url": IMG["control"], "gallery": [IMG["control"], IMG["boardroom"]],
        "featured": True, "trending": True, "new_arrival": False, "created_at": _now()
    },

    # ── MiP (Mini-in-Package) ──
    {
        "id": _id(), "product_code": "BL-MIP150", "name": "MiP Pro 1.5mm", "slug": "bl-mip150",
        "category": "mip", "tagline": "MiP technology. 35% less power. Zero compromise.",
        "description": "Mini-in-Package technology delivers SMD-level serviceability with COB-level contrast. Common cathode flip-chip architecture saves 35% energy. 7,680Hz refresh eliminates moire in broadcast environments.",
        "pixel_pitch": "1.5mm", "resolution": "400 x 225 per panel", "brightness": "1,200 nits",
        "application": "Broadcast, Corporate, Retail",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.5mm"}, {"label": "Technology", "value": "MiP (Mini-in-Package)"},
            {"label": "Brightness", "value": "1,200 nits"}, {"label": "Contrast", "value": "10,000:1"},
            {"label": "Refresh Rate", "value": "7,680Hz"}, {"label": "Color Depth", "value": "21-bit"},
            {"label": "Power Saving", "value": "35% vs SMD"}, {"label": "Flip Chip", "value": "Common cathode"},
            {"label": "Viewing Angle", "value": "165 deg"}, {"label": "Service", "value": "Front-access"}
        ],
        "image_url": IMG["boardroom"], "gallery": [IMG["boardroom"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-MIP040", "name": "MiP Ultra 0.4mm", "slug": "bl-mip040",
        "category": "mip", "tagline": "0.4mm MiP. The world's finest pitch in package.",
        "description": "Pushing the boundaries of Mini-in-Package to 0.4mm pitch. Active-matrix drive technology combines with Micro LED crystals for unprecedented pixel density. Designed for VR production, surgical displays, and defence applications.",
        "pixel_pitch": "0.4mm", "resolution": "1500 x 843 per panel", "brightness": "400 nits",
        "application": "VR Production, Medical, Defence",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.4mm"}, {"label": "Technology", "value": "AM + Micro LED MiP"},
            {"label": "Brightness", "value": "400 nits"}, {"label": "Contrast", "value": "15,000:1"},
            {"label": "Refresh Rate", "value": "7,680Hz"}, {"label": "Drive", "value": "Active Matrix (AM)"},
            {"label": "Resolution Density", "value": "3,906 PPI"}, {"label": "Color Gamut", "value": "DCI-P3 95%"},
            {"label": "Thickness", "value": "28mm"}, {"label": "Weight", "value": "4.2 kg/panel"}
        ],
        "image_url": IMG["microled"], "gallery": [IMG["microled"]],
        "featured": False, "trending": True, "new_arrival": True, "created_at": _now()
    },

    # ── TRANSPARENT LED ──
    {
        "id": _id(), "product_code": "BL-TRX060", "name": "Transparent MicroLED 0.6mm", "slug": "bl-trx060",
        "category": "transparent", "tagline": "See through. 60% transparency. MicroLED clarity.",
        "description": "The world's most advanced transparent display. 0.6mm MicroLED pitch with 60% transparency and 600 nits brightness. Transforms glass facades into high-definition digital canvases without blocking natural light or views.",
        "pixel_pitch": "0.6mm", "resolution": "Custom per facade", "brightness": "600 nits",
        "application": "Luxury Retail, Architecture, Museums",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.6mm"}, {"label": "Transparency", "value": "60%"},
            {"label": "Brightness", "value": "600 nits"}, {"label": "Technology", "value": "Transparent MicroLED"},
            {"label": "Panel Size", "value": "54-inch"}, {"label": "Color Gamut", "value": "DCI-P3 95%"},
            {"label": "Thickness", "value": "12mm"}, {"label": "Weight", "value": "8 kg/sqm"},
            {"label": "Noise", "value": "Silent (fanless)"}, {"label": "Status", "value": "Available 2025"}
        ],
        "image_url": IMG["transparent"], "gallery": [IMG["transparent"], IMG["facade"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-TRX380", "name": "Transparent LED 3.8mm", "slug": "bl-trx380",
        "category": "transparent", "tagline": "85% transparency. Silent. Architectural-grade.",
        "description": "Up to 85% transparency with lightweight strip design. Transforms glass curtain walls into digital media surfaces. Silent operation, curtain or adhesive mounting. Ideal for luxury retail and architectural media facades.",
        "pixel_pitch": "3.8mm", "resolution": "Custom per facade", "brightness": "5,500 nits",
        "application": "Glass Facades, Retail Storefronts",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.8mm"}, {"label": "Transparency", "value": "85%"},
            {"label": "Brightness", "value": "5,500 nits"}, {"label": "Weight", "value": "12 kg/sqm"},
            {"label": "Installation", "value": "Curtain / Adhesive"}, {"label": "IP Rating", "value": "IP43"},
            {"label": "Noise", "value": "Silent (no fans)"}, {"label": "Power", "value": "280W/sqm avg"},
            {"label": "Wind Load", "value": "Tested 80km/h"}, {"label": "Service", "value": "Rear access"}
        ],
        "image_url": IMG["facade"], "gallery": [IMG["facade"], IMG["transparent"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-HOL020", "name": "Holographic Film 2mm", "slug": "bl-hol020",
        "category": "transparent", "tagline": "Invisible when off. Holographic when on.",
        "description": "Only 2mm thick. 70-90% transparency. Self-adhesive holographic LED film that turns any glass surface into a dynamic display. Near-invisible when powered down. The future of retail window advertising.",
        "pixel_pitch": "2.0mm", "resolution": "Custom", "brightness": "3,000 nits",
        "application": "Retail Windows, Airports, Museums",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.0mm"}, {"label": "Transparency", "value": "70-90%"},
            {"label": "Thickness", "value": "2mm"}, {"label": "Brightness", "value": "3,000 nits"},
            {"label": "Weight", "value": "1.2 kg/sqm"}, {"label": "Installation", "value": "Self-adhesive film"},
            {"label": "Power", "value": "150W/sqm"}, {"label": "Viewing Angle", "value": "160 deg"},
            {"label": "Surface", "value": "Any glass"}, {"label": "Technology", "value": "Holographic MiP"}
        ],
        "image_url": IMG["holographic"], "gallery": [IMG["holographic"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },

    # ── FLEXIBLE / CREATIVE ──
    {
        "id": _id(), "product_code": "BL-FLX150", "name": "FlexCOB 1.5mm", "slug": "bl-flx150",
        "category": "flexible", "tagline": "Industry first: Flexible COB.",
        "description": "World's first flexible COB LED display. Combines COB's superior contrast and reliability with bend capability for concave, convex, and cylindrical installations. A breakthrough for immersive environments.",
        "pixel_pitch": "1.5mm", "resolution": "320 x 160 per module", "brightness": "800 nits",
        "application": "Immersive Rooms, Curved Walls, Columns",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.5mm"}, {"label": "Technology", "value": "Flexible COB"},
            {"label": "Brightness", "value": "800 nits"}, {"label": "Contrast", "value": "10,000:1"},
            {"label": "Bend Radius", "value": "500mm min"}, {"label": "Curvable", "value": "Concave / Convex / Cylinder"},
            {"label": "Refresh Rate", "value": "3,840Hz"}, {"label": "Module Size", "value": "256 x 128mm"},
            {"label": "Weight", "value": "5.5 kg/sqm"}, {"label": "Service", "value": "Rear magnetic"}
        ],
        "image_url": IMG["immersive"], "gallery": [IMG["immersive"], IMG["unsplash1"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-CVX160", "name": "CreativeVault 1.6mm", "slug": "bl-cvx160",
        "category": "flexible", "tagline": "Curved, shaped, limitless.",
        "description": "Purpose-built for sculptural and immersive installations. Flexible module design allows concave, convex, and irregular shapes, transforming architectural spaces into experiential media environments.",
        "pixel_pitch": "1.6mm", "resolution": "320 x 160 per module", "brightness": "800 nits",
        "application": "Museums, Experience Centres",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.6mm"}, {"label": "Brightness", "value": "800 nits"},
            {"label": "Module Size", "value": "256 x 128mm"}, {"label": "Curvable", "value": "Full 360 deg"},
            {"label": "Min Radius", "value": "500mm"}, {"label": "Contrast", "value": "6,000:1"},
            {"label": "Greyscale", "value": "16-bit"}, {"label": "Service", "value": "Rear magnetic"},
            {"label": "Weight", "value": "6 kg/sqm"}, {"label": "Refresh Rate", "value": "3,840Hz"}
        ],
        "image_url": IMG["unsplash1"], "gallery": [IMG["unsplash1"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-FLX780", "name": "FlexiMesh 7.8mm", "slug": "bl-flx780",
        "category": "flexible", "tagline": "Ultra-light mesh for architectural media.",
        "description": "Weighing just 4.5 kg/sqm, drapes over building facades and stage backdrops like fabric. Wind-permeable mesh design with IP65 protection. Tested to 120km/h wind loads.",
        "pixel_pitch": "7.8mm", "resolution": "128 x 64 per strip", "brightness": "6,000 nits",
        "application": "Building Wraps, Stage Backdrops",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "7.8mm"}, {"label": "Brightness", "value": "6,000 nits"},
            {"label": "Weight", "value": "4.5 kg/sqm"}, {"label": "Transparency", "value": "60%"},
            {"label": "Wind Load", "value": "Tested 120km/h"}, {"label": "IP Rating", "value": "IP65"},
            {"label": "Power", "value": "180W/sqm"}, {"label": "Installation", "value": "Tension wire / Frame"},
            {"label": "Lifespan", "value": "80,000 hrs"}, {"label": "Service", "value": "Rear access"}
        ],
        "image_url": IMG["unsplash2"], "gallery": [IMG["unsplash2"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },

    # ── INTERACTIVE / FLOOR LED ──
    {
        "id": _id(), "product_code": "BL-IFL290", "name": "InteractiveFloor 2.9mm", "slug": "bl-ifl290",
        "category": "interactive", "tagline": "Walk on it. Play on it. Brand on it.",
        "description": "Interactive LED floor display with integrated pressure sensors and multi-touch response. 2.5-tonne/sqm load rating, IP65 waterproof, anti-slip surface. Creates immersive floor experiences for retail, events, and museums.",
        "pixel_pitch": "2.9mm", "resolution": "168 x 168 per panel", "brightness": "1,200 nits",
        "application": "Retail, Events, Museums, Theme Parks",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.9mm"}, {"label": "Technology", "value": "Interactive + Pressure sensors"},
            {"label": "Brightness", "value": "1,200 nits"}, {"label": "Contrast", "value": "10,000:1"},
            {"label": "Load Rating", "value": "2.5T/sqm"}, {"label": "IP Rating", "value": "IP65"},
            {"label": "Surface", "value": "Anti-slip tempered glass"}, {"label": "Refresh Rate", "value": "7,680Hz"},
            {"label": "Noise", "value": "Low (< 30dB)"}, {"label": "Service", "value": "Front magnetic"}
        ],
        "image_url": IMG["floor"], "gallery": [IMG["floor"], IMG["immersive"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-IFL390", "name": "InteractiveFloor 3.9mm", "slug": "bl-ifl390",
        "category": "interactive", "tagline": "High-traffic floor LED. Event-ready.",
        "description": "Built for high-traffic areas and large-scale installations. Quick-lock panels, IP65 rating, and rapid content switching. Perfect for exhibition halls, shopping malls, and event venues.",
        "pixel_pitch": "3.91mm", "resolution": "128 x 128 per panel", "brightness": "1,200 nits",
        "application": "Exhibition Halls, Shopping Malls",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.91mm"}, {"label": "Load Rating", "value": "2.5T/sqm"},
            {"label": "Brightness", "value": "1,200 nits"}, {"label": "IP Rating", "value": "IP65"},
            {"label": "Panel Size", "value": "500 x 500mm"}, {"label": "Surface", "value": "Anti-slip glass"},
            {"label": "Setup", "value": "Quick-lock panels"}, {"label": "Refresh Rate", "value": "3,840Hz"},
            {"label": "Weight", "value": "18 kg/panel"}, {"label": "Service", "value": "Front-access"}
        ],
        "image_url": IMG["floor"], "gallery": [IMG["floor"]],
        "featured": False, "trending": True, "new_arrival": False, "created_at": _now()
    },

    # ── ALL-IN-ONE ──
    {
        "id": _id(), "product_code": "BL-AIO136", "name": "All-in-One 136\" 4K", "slug": "bl-aio136",
        "category": "all-in-one", "tagline": "136-inch 4K. One box. One hour install.",
        "description": "Enterprise-grade 136-inch 4K Micro LED all-in-one display. COB technology, octa-core processor, 8GB RAM. Installs in under 1 hour with just 2 people. Factory-calibrated, Crestron and Yealink compatible.",
        "pixel_pitch": "0.93mm", "resolution": "3840 x 2160 (4K UHD)", "brightness": "600 nits",
        "application": "Boardrooms, Lecture Halls, Lobbies",
        "key_specs": [
            {"label": "Screen Size", "value": "136 inch (diagonal)"}, {"label": "Resolution", "value": "3840 x 2160 (4K)"},
            {"label": "Technology", "value": "COB Micro LED"}, {"label": "Brightness", "value": "600 nits"},
            {"label": "Contrast", "value": "15,000:1"}, {"label": "Processor", "value": "Octa-core / 8GB RAM"},
            {"label": "Install Time", "value": "< 1 hour (2 people)"}, {"label": "Integration", "value": "Crestron / Yealink"},
            {"label": "HDR", "value": "HDR10 / HDR10+"}, {"label": "Audio", "value": "Built-in 40W"}
        ],
        "image_url": IMG["boardroom"], "gallery": [IMG["boardroom"], IMG["control"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-AIO110", "name": "All-in-One 110\" Conference", "slug": "bl-aio110",
        "category": "all-in-one", "tagline": "The LCD killer for meeting rooms.",
        "description": "110-inch Micro LED conference display replacing legacy LCD video walls. Bezel-less, modular 600x337mm panels. Built-in touch overlay option, camera mount, and smart conferencing OS.",
        "pixel_pitch": "1.25mm", "resolution": "3840 x 2160 (4K UHD)", "brightness": "450 nits",
        "application": "Meeting Rooms, Huddle Spaces",
        "key_specs": [
            {"label": "Screen Size", "value": "110 inch"}, {"label": "Resolution", "value": "3840 x 2160 (4K)"},
            {"label": "Technology", "value": "COB Micro LED"}, {"label": "Brightness", "value": "450 nits"},
            {"label": "Bezel", "value": "Zero (seamless)"}, {"label": "Touch", "value": "Optional IR overlay"},
            {"label": "OS", "value": "Android 14 / Tizen"}, {"label": "Weight", "value": "68 kg total"},
            {"label": "Mounting", "value": "Wall / Stand"}, {"label": "Power", "value": "350W typical"}
        ],
        "image_url": IMG["control"], "gallery": [IMG["control"]],
        "featured": False, "trending": True, "new_arrival": True, "created_at": _now()
    },

    # ── DVLED (Direct View LED for Home/Luxury) ──
    {
        "id": _id(), "product_code": "BL-DVL084", "name": "DVLED Cinema 0.84mm", "slug": "bl-dvl084",
        "category": "dvled", "tagline": "Home cinema. 265 inches. Zero compromise.",
        "description": "Direct View LED for luxury residential and private cinema installations. Modular panels scale from 146 to 265 inches. 20-bit color processing, 8K support, MICRO AI Processor for real-time optimization. The ultimate home theater experience.",
        "pixel_pitch": "0.84mm", "resolution": "Up to 8K x 4K", "brightness": "1,200 nits",
        "application": "Home Cinema, VIP Lounges, Yacht",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "0.84mm"}, {"label": "Resolution", "value": "Up to 8K x 4K"},
            {"label": "Brightness", "value": "1,200 nits peak"}, {"label": "Contrast", "value": "Infinite (true black)"},
            {"label": "Color Depth", "value": "20-bit"}, {"label": "HDR", "value": "HDR10 / HDR10+ / HLG"},
            {"label": "Color Gamut", "value": "DCI-P3 95%"}, {"label": "AI Processor", "value": "MICRO AI (real-time)"},
            {"label": "Sizes", "value": "146 to 265 inch"}, {"label": "Refresh Rate", "value": "3,840Hz"}
        ],
        "image_url": IMG["unsplash1"], "gallery": [IMG["unsplash1"], IMG["boardroom"]],
        "featured": True, "trending": True, "new_arrival": True, "created_at": _now()
    },

    # ── OUTDOOR ──
    {
        "id": _id(), "product_code": "BL-OBX390", "name": "Outdoor Brilliance 3.9mm", "slug": "bl-obx390",
        "category": "outdoor", "tagline": "Maximum visibility under direct sunlight.",
        "description": "Designed for the Gulf region's extreme conditions. IP65 front and rear protection, 7,000-nit peak brightness, and advanced thermal management ensure flawless performance from Riyadh to Dubai.",
        "pixel_pitch": "3.91mm", "resolution": "256 x 128 per panel", "brightness": "7,000 nits",
        "application": "Building Facades, Highway DOOH",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "3.91mm"}, {"label": "Brightness", "value": "7,000 nits"},
            {"label": "IP Rating", "value": "IP65 F&R"}, {"label": "Panel Size", "value": "960 x 960mm"},
            {"label": "Operating Temp", "value": "-20 to 60 deg C"}, {"label": "Power", "value": "520W/sqm avg"},
            {"label": "Weight", "value": "28 kg/panel"}, {"label": "Lifespan", "value": "100,000 hrs"},
            {"label": "Wind Load", "value": "Tested 120km/h"}, {"label": "Service", "value": "Rear access"}
        ],
        "image_url": IMG["outdoor"], "gallery": [IMG["outdoor"]],
        "featured": True, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-OBX680", "name": "Outdoor Brilliance 6.8mm", "slug": "bl-obx680",
        "category": "outdoor", "tagline": "Large-format digital billboards. Built to last.",
        "description": "Optimised for long-distance viewing and large-format installations. Punchy 8,000-nit brightness, quick-lock die-cast aluminium cabinets, and remote diagnostics for billboard networks.",
        "pixel_pitch": "6.8mm", "resolution": "128 x 128 per panel", "brightness": "8,000 nits",
        "application": "Billboards, Sports Stadiums",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "6.8mm"}, {"label": "Brightness", "value": "8,000 nits"},
            {"label": "IP Rating", "value": "IP65"}, {"label": "Panel Size", "value": "960 x 960mm"},
            {"label": "Operating Temp", "value": "-30 to 60 deg C"}, {"label": "Viewing Distance", "value": "6m+"},
            {"label": "Cabinet", "value": "Die-cast aluminium"}, {"label": "Diagnostics", "value": "Remote monitoring"},
            {"label": "Power", "value": "450W/sqm avg"}, {"label": "Warranty", "value": "5 years"}
        ],
        "image_url": IMG["outdoor"], "gallery": [IMG["outdoor"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-GRN250", "name": "GreenScreen Outdoor 2.5mm", "slug": "bl-grn250",
        "category": "outdoor", "tagline": "Low-carbon outdoor. Under 1 kWh/sqm/day.",
        "description": "The industry's most energy-efficient outdoor LED. Consumes under 1 kWh per square metre per day. 10-year warranty. High brightness, high refresh, and high contrast for responsible DOOH networks.",
        "pixel_pitch": "2.5mm", "resolution": "240 x 240 per panel", "brightness": "5,000 nits",
        "application": "Green DOOH, Smart Cities",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.5mm"}, {"label": "Brightness", "value": "5,000 nits"},
            {"label": "Power", "value": "< 1 kWh/sqm/day"}, {"label": "IP Rating", "value": "IP65"},
            {"label": "Contrast", "value": "8,000:1"}, {"label": "Refresh Rate", "value": "3,840Hz"},
            {"label": "Warranty", "value": "10 years"}, {"label": "Greyscale", "value": "16-bit"},
            {"label": "Operating Temp", "value": "-20 to 55 deg C"}, {"label": "Certification", "value": "CE / RoHS"}
        ],
        "image_url": IMG["outdoor"], "gallery": [IMG["outdoor"]],
        "featured": False, "trending": True, "new_arrival": True, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-SPX470", "name": "SportPro 4.7mm", "slug": "bl-spx470",
        "category": "outdoor", "tagline": "Stadium-grade perimeter and scoreboard LED.",
        "description": "Built for live sports: 10,000-nit brightness, impact-resistant face, instant content switching. Perimeter-compatible form factor with integrated padding. Used in FIFA and AFC-standard venues.",
        "pixel_pitch": "4.7mm", "resolution": "204 x 204 per panel", "brightness": "10,000 nits",
        "application": "Sports Perimeter, Scoreboards",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "4.7mm"}, {"label": "Brightness", "value": "10,000 nits"},
            {"label": "Impact Protection", "value": "Soft mask + padding"}, {"label": "IP Rating", "value": "IP65 F / IP54 R"},
            {"label": "Panel Size", "value": "960 x 960mm"}, {"label": "Scan Mode", "value": "1/6 high refresh"},
            {"label": "Viewing Distance", "value": "5m+"}, {"label": "Weight", "value": "32 kg/panel"},
            {"label": "Compliance", "value": "FIFA / AFC"}, {"label": "Service", "value": "Rear access"}
        ],
        "image_url": IMG["pexels1"], "gallery": [IMG["pexels1"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },

    # ── RENTAL / EVENTS ──
    {
        "id": _id(), "product_code": "BL-RPX290", "name": "RentalPro X 2.9mm", "slug": "bl-rpx290",
        "category": "rental", "tagline": "Built for fast turnarounds and touring rigs.",
        "description": "The industry standard for live events and exhibitions. Lightweight die-cast cabinets, tool-free connections, and curving capability. 10,000:1 contrast and 7,680Hz refresh for moire-free camera capture.",
        "pixel_pitch": "2.97mm", "resolution": "168 x 168 per panel", "brightness": "4,500 nits",
        "application": "Concerts, Exhibitions, Touring",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.97mm"}, {"label": "Brightness", "value": "4,500 nits"},
            {"label": "Contrast", "value": "10,000:1"}, {"label": "Refresh Rate", "value": "7,680Hz"},
            {"label": "Panel Size", "value": "500 x 500mm"}, {"label": "Weight", "value": "7.3 kg/panel"},
            {"label": "Curvable", "value": "-10 to +10 deg"}, {"label": "Setup", "value": "Tool-free quick-lock"},
            {"label": "IP Rating", "value": "IP65"}, {"label": "Power", "value": "340W/sqm avg"}
        ],
        "image_url": IMG["event"], "gallery": [IMG["event"]],
        "featured": True, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-RPX150", "name": "RentalPro X 1.5mm", "slug": "bl-rpx150",
        "category": "rental", "tagline": "Fine-pitch rental. Broadcast-ready.",
        "description": "Ultra-fine pitch rental display for broadcast events, press conferences, and VIP galas. IP65 rated for indoor/outdoor hybrid events. Front-serviceability enables rapid on-site maintenance.",
        "pixel_pitch": "1.5mm", "resolution": "320 x 180 per panel", "brightness": "1,200 nits",
        "application": "Broadcast Events, VIP Galas, Press",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.5mm"}, {"label": "Brightness", "value": "1,200 nits"},
            {"label": "Contrast", "value": "10,000:1"}, {"label": "Refresh Rate", "value": "7,680Hz"},
            {"label": "Panel Size", "value": "500 x 500mm"}, {"label": "Weight", "value": "6.8 kg/panel"},
            {"label": "IP Rating", "value": "IP65"}, {"label": "Load Capacity", "value": "13 kg/LED"},
            {"label": "Curvable", "value": "Concave/Convex"}, {"label": "Service", "value": "Front magnetic"}
        ],
        "image_url": IMG["event"], "gallery": [IMG["event"]],
        "featured": False, "trending": True, "new_arrival": True, "created_at": _now()
    },

    # ── INDOOR FINE PITCH ──
    {
        "id": _id(), "product_code": "BL-IFP195", "name": "IndoorFine 1.9mm", "slug": "bl-ifp195",
        "category": "indoor", "tagline": "Versatile fine-pitch for any professional space.",
        "description": "Fine-pitch all-rounder for TV studios, houses of worship, and mid-size corporate video walls. Seamless calibration across large arrays and consistent colour uniformity. Module-level calibration.",
        "pixel_pitch": "1.95mm", "resolution": "320 x 180 per panel", "brightness": "800 nits",
        "application": "TV Studios, Corporate Video Walls",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "1.95mm"}, {"label": "Brightness", "value": "800 nits"},
            {"label": "Panel Size", "value": "600 x 337.5mm"}, {"label": "Refresh Rate", "value": "3,840Hz"},
            {"label": "Uniformity", "value": "Module-level calibration"}, {"label": "Colour Temp", "value": "3000-9500K adj"},
            {"label": "Power", "value": "240W/sqm avg"}, {"label": "Lifespan", "value": "100,000 hrs"},
            {"label": "Contrast", "value": "5,000:1"}, {"label": "Weight", "value": "7.5 kg/panel"}
        ],
        "image_url": IMG["boardroom"], "gallery": [IMG["boardroom"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },
    {
        "id": _id(), "product_code": "BL-IFP250", "name": "IndoorFine 2.5mm", "slug": "bl-ifp250",
        "category": "indoor", "tagline": "Workhorse display for professional interiors.",
        "description": "The reliable choice for lobbies, retail, and corporate signage. Crisp 2.5mm pitch with energy-efficient design. Front-access serviceability for easy maintenance.",
        "pixel_pitch": "2.5mm", "resolution": "240 x 240 per panel", "brightness": "1,200 nits",
        "application": "Lobbies, Retail, Signage",
        "key_specs": [
            {"label": "Pixel Pitch", "value": "2.5mm"}, {"label": "Brightness", "value": "1,200 nits"},
            {"label": "Panel Size", "value": "600 x 600mm"}, {"label": "Refresh Rate", "value": "3,840Hz"},
            {"label": "Contrast", "value": "5,000:1"}, {"label": "Service", "value": "Front-access"},
            {"label": "Power", "value": "280W/sqm avg"}, {"label": "Weight", "value": "8 kg/panel"},
            {"label": "Lifespan", "value": "100,000 hrs"}, {"label": "Certification", "value": "CE / UL"}
        ],
        "image_url": IMG["control"], "gallery": [IMG["control"]],
        "featured": False, "trending": False, "new_arrival": False, "created_at": _now()
    },
]

# =============================================
#   INSPIRATIONS — 16 items
# =============================================
INSPIRATIONS = [
    {"id": _id(), "title": "Immersive Retail Experience", "slug": "immersive-retail", "category": "retail",
     "description": "Full-wall LED transforms shopping into a sensory journey.", "image_url": IMG["holographic"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Stadium Spectacle", "slug": "stadium-spectacle", "category": "events",
     "description": "Wrapping an entire arena in dynamic LED content.", "image_url": IMG["pexels1"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Architectural Media Facade", "slug": "architectural-media-facade", "category": "outdoor",
     "description": "Transparent LED integrated into glass curtain walls.", "image_url": IMG["facade"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Interactive Floor Experience", "slug": "interactive-floor-experience", "category": "interactive",
     "description": "Pressure-sensitive LED floors creating immersive user experiences.", "image_url": IMG["floor"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Holographic Storefront", "slug": "holographic-storefront", "category": "retail",
     "description": "Near-invisible LED film transforms any glass surface into a display.", "image_url": IMG["holographic"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Immersive Room 360", "slug": "immersive-room-360", "category": "art",
     "description": "Flexible COB wrapping walls, ceiling and floor for total immersion.", "image_url": IMG["immersive"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Corporate Command Centre", "slug": "corporate-command-centre", "category": "corporate",
     "description": "24/7 mission-critical video walls for real-time decisions.", "image_url": IMG["control"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Luxury Hotel Lobby", "slug": "luxury-hotel-lobby", "category": "hospitality",
     "description": "Digital art installations redefining guest arrival experiences.", "image_url": IMG["event"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Concert Stage Design", "slug": "concert-stage-design", "category": "events",
     "description": "Curved and shaped LED creating immersive stage environments.", "image_url": IMG["unsplash2"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Home Cinema DVLED", "slug": "home-cinema-dvled", "category": "residential",
     "description": "265-inch Direct View LED replacing projectors in luxury homes.", "image_url": IMG["unsplash1"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Museum Interactive Gallery", "slug": "museum-interactive-gallery", "category": "art",
     "description": "Touch-responsive LED floors and walls for cultural institutions.", "image_url": IMG["floor"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Digital Highway Billboard", "slug": "digital-highway-billboard", "category": "outdoor",
     "description": "High-brightness roadside displays engineered for Gulf heat.", "image_url": IMG["outdoor"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Transparent Storefront", "slug": "transparent-storefront", "category": "retail",
     "description": "Glass-mounted LED advertising without blocking the view.", "image_url": IMG["transparent"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "All-in-One Boardroom", "slug": "all-in-one-boardroom", "category": "corporate",
     "description": "136-inch 4K Micro LED replacing projector+screen combos.", "image_url": IMG["boardroom"], "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Smart City DOOH Network", "slug": "smart-city-dooh-network", "category": "outdoor",
     "description": "Low-carbon outdoor networks with remote AI content management.", "image_url": IMG["pexels2"], "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Expo Pavilion Ceiling", "slug": "expo-pavilion-ceiling", "category": "events",
     "description": "Overhead LED canvas turning ceilings into digital skies.", "image_url": IMG["immersive"], "featured": False, "created_at": _now()},
]

# =============================================
#   PROJECTS — 8 items
# =============================================
PROJECTS = [
    {"id": _id(), "title": "Dubai Mall Digital Atrium", "slug": "dubai-mall-digital-atrium",
     "client_name": "Emaar Properties", "location": "Dubai, UAE", "sector": "retail", "screen_size": "340 sqm",
     "description": "Floor-to-ceiling LED installation in the main atrium. COB technology, seasonally adaptive content.",
     "image_url": IMG["holographic"], "gallery": [IMG["holographic"]], "technologies_used": ["BL-COB125", "BL-IFP250"],
     "metrics": [{"label": "Screen Area", "value": "340 sqm"}, {"label": "Resolution", "value": "8K+"}, {"label": "Uptime", "value": "99.97%"}],
     "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Sheikh Zayed Road DOOH Network", "slug": "szr-dooh-network",
     "client_name": "Roads & Transport Authority", "location": "Dubai, UAE", "sector": "outdoor", "screen_size": "1,200 sqm",
     "description": "15 high-brightness outdoor LED displays engineered for 60C ambient temperatures.",
     "image_url": IMG["outdoor"], "gallery": [IMG["outdoor"]], "technologies_used": ["BL-OBX390", "BL-OBX680"],
     "metrics": [{"label": "Displays", "value": "15 units"}, {"label": "Total Area", "value": "1,200 sqm"}, {"label": "Max Brightness", "value": "7,000 nits"}],
     "featured": True, "created_at": _now()},
    {"id": _id(), "title": "ADNOC HQ Command Centre", "slug": "adnoc-command-centre",
     "client_name": "ADNOC Group", "location": "Abu Dhabi, UAE", "sector": "corporate", "screen_size": "86 sqm",
     "description": "24/7 operations centre with seamless COB MicroLED video walls for real-time data visualisation.",
     "image_url": IMG["control"], "gallery": [IMG["control"]], "technologies_used": ["BL-COB093", "BL-COB060"],
     "metrics": [{"label": "Screen Area", "value": "86 sqm"}, {"label": "Pixel Pitch", "value": "0.93mm"}, {"label": "Operation", "value": "24/7"}],
     "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Atlantis The Royal Grand Ballroom", "slug": "atlantis-royal-ballroom",
     "client_name": "Atlantis Resorts", "location": "Dubai, UAE", "sector": "hospitality", "screen_size": "180 sqm",
     "description": "Curved LED walls and ceiling panels for immersive event experiences.",
     "image_url": IMG["dubai"], "gallery": [IMG["dubai"]], "technologies_used": ["BL-RPX290", "BL-FLX150"],
     "metrics": [{"label": "Screen Area", "value": "180 sqm"}, {"label": "Format", "value": "Curved + Ceiling"}, {"label": "Events/Year", "value": "200+"}],
     "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Riyadh Season Main Stage", "slug": "riyadh-season-stage",
     "client_name": "General Entertainment Authority", "location": "Riyadh, KSA", "sector": "events", "screen_size": "520 sqm",
     "description": "Massive concert stage: floor, backdrop, and side panels with real-time content sync.",
     "image_url": IMG["pexels1"], "gallery": [IMG["pexels1"]], "technologies_used": ["BL-RPX290", "BL-IFL290"],
     "metrics": [{"label": "Screen Area", "value": "520 sqm"}, {"label": "Setup Time", "value": "48 hrs"}, {"label": "Attendance", "value": "40,000"}],
     "featured": True, "created_at": _now()},
    {"id": _id(), "title": "Mall of the Emirates Glass Facade", "slug": "moe-glass-facade",
     "client_name": "Majid Al Futtaim", "location": "Dubai, UAE", "sector": "retail", "screen_size": "420 sqm",
     "description": "Transparent LED on exterior glass curtain wall. 85% transparency, dynamic advertising.",
     "image_url": IMG["facade"], "gallery": [IMG["facade"]], "technologies_used": ["BL-TRX380", "BL-HOL020"],
     "metrics": [{"label": "Screen Area", "value": "420 sqm"}, {"label": "Transparency", "value": "85%"}, {"label": "Revenue Uplift", "value": "+32%"}],
     "featured": False, "created_at": _now()},
    {"id": _id(), "title": "DIFC Luxury VIP Lounge", "slug": "difc-vip-lounge",
     "client_name": "DIFC Authority", "location": "Dubai, UAE", "sector": "corporate", "screen_size": "48 sqm",
     "description": "DVLED Cinema installation in the exclusive VIP lounge. 0.84mm pitch, 8K resolution, integrated ambient lighting.",
     "image_url": IMG["unsplash1"], "gallery": [IMG["unsplash1"]], "technologies_used": ["BL-DVL084"],
     "metrics": [{"label": "Screen Size", "value": "220 inch"}, {"label": "Resolution", "value": "8K"}, {"label": "Pitch", "value": "0.84mm"}],
     "featured": False, "created_at": _now()},
    {"id": _id(), "title": "Abu Dhabi Expo Interactive Pavilion", "slug": "adu-expo-pavilion",
     "client_name": "Department of Culture", "location": "Abu Dhabi, UAE", "sector": "events", "screen_size": "280 sqm",
     "description": "Fully immersive pavilion with interactive floor, curved walls, and ceiling LED. 360-degree content experience.",
     "image_url": IMG["immersive"], "gallery": [IMG["immersive"], IMG["floor"]], "technologies_used": ["BL-FLX150", "BL-IFL290", "BL-CVX160"],
     "metrics": [{"label": "Total Area", "value": "280 sqm"}, {"label": "Format", "value": "360 deg immersive"}, {"label": "Visitors/Day", "value": "5,000+"}],
     "featured": True, "created_at": _now()},
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["brightluxx"]

    # Clear old data
    for col in ["products", "inspirations", "projects", "technologies", "applications", "case_studies", "updates"]:
        await db[col].delete_many({})

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
