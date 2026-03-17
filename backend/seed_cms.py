"""
Seed Script - Populate CMS collections with existing hardcoded data
Run with: python seed_cms.py
"""
import asyncio
import os
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'brightluxx')

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# PixelVue Products Data
PIXELVUE_PRODUCTS = [
    # LED Poster Series
    {
        "name": "iPoster",
        "slug": "iposter",
        "category": "poster",
        "tagline": "Slim Profile LED Poster",
        "description": "The iPoster brings stunning LED visuals to any space with its ultra-slim design. Perfect for retail, hospitality, and corporate environments where visual impact meets elegant form.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "THICKNESS", "value": "35mm"},
            {"label": "PIXEL PITCH", "value": "P2.5"},
            {"label": "BRIGHTNESS", "value": "1000cd/m²"},
            {"label": "WEIGHT", "value": "28kg"}
        ],
        "features": [
            {"icon": "Monitor", "title": "Ultra-Slim Design", "desc": "Only 35mm thin for seamless wall integration"},
            {"icon": "Wifi", "title": "Smart Connectivity", "desc": "WiFi, USB, and cloud-based content management"},
            {"icon": "Zap", "title": "Energy Efficient", "desc": "Low power consumption with auto-brightness"},
            {"icon": "Shield", "title": "Durable Build", "desc": "Aluminum frame with tempered glass front"},
            {"icon": "Eye", "title": "Wide Viewing Angle", "desc": "160° viewing angle for maximum visibility"},
            {"icon": "Smartphone", "title": "App Control", "desc": "Full control from smartphone or tablet"}
        ],
        "applications": [
            {"name": "Retail", "desc": "In-store promotions"},
            {"name": "Hotels", "desc": "Lobby displays"},
            {"name": "Restaurants", "desc": "Menu boards"},
            {"name": "Corporate", "desc": "Office signage"},
            {"name": "Museums", "desc": "Exhibition displays"},
            {"name": "Airports", "desc": "Wayfinding"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P2.5"},
            {"label": "Cabinet Size", "value": "600×1200mm"},
            {"label": "Thickness", "value": "35mm"},
            {"label": "Weight", "value": "28kg"},
            {"label": "Brightness", "value": "1000cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Viewing Angle", "value": "160°/160°"},
            {"label": "Input", "value": "HDMI/USB/WiFi"},
            {"label": "Power", "value": "AC 110-240V"},
            {"label": "Lifespan", "value": "100,000+ hours"}
        ],
        "faqs": [
            {"question": "What sizes are available?", "answer": "iPoster is available in standard sizes from 600×800mm up to 1200×1800mm. Custom sizes can be manufactured for specific requirements."},
            {"question": "Can it be used outdoors?", "answer": "The standard iPoster is designed for indoor use (IP40). For outdoor applications, please see our OOHPoster with IP65 rating."},
            {"question": "How is content managed?", "answer": "Content can be uploaded via USB, managed through our cloud platform, or pushed directly from any device via WiFi."}
        ],
        "is_active": True,
        "order": 1
    },
    {
        "name": "iFlip",
        "slug": "iflip",
        "category": "poster",
        "tagline": "Flip-Style LED Poster",
        "description": "The iFlip combines the best of static and digital signage. With a 180° motorized flip mechanism, it switches between LED display and printed poster mode for maximum versatility.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "THICKNESS", "value": "45mm"},
            {"label": "FLIP ANGLE", "value": "180°"},
            {"label": "BRIGHTNESS", "value": "1200cd/m²"},
            {"label": "WEIGHT", "value": "35kg"}
        ],
        "features": [
            {"icon": "RotateCcw", "title": "Flip Mechanism", "desc": "Motorized 180° flip between LED and poster"},
            {"icon": "Monitor", "title": "Dual Display", "desc": "LED on one side, poster on the other"},
            {"icon": "Wifi", "title": "Smart Control", "desc": "Scheduled flipping and content sync"},
            {"icon": "Zap", "title": "Quick Change", "desc": "Flip completes in under 3 seconds"},
            {"icon": "Smartphone", "title": "App Control", "desc": "Control flip timing from mobile app"},
            {"icon": "Shield", "title": "Reliable Motor", "desc": "100,000+ cycle rating"}
        ],
        "applications": [
            {"name": "Retail", "desc": "Dynamic promotions"},
            {"name": "Banking", "desc": "Branch signage"},
            {"name": "Healthcare", "desc": "Waiting room displays"},
            {"name": "Education", "desc": "Campus notices"},
            {"name": "Transport", "desc": "Schedule boards"},
            {"name": "Events", "desc": "Exhibition displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P2.5 / P3"},
            {"label": "Cabinet Size", "value": "600×1500mm"},
            {"label": "Thickness", "value": "45mm"},
            {"label": "Weight", "value": "35kg"},
            {"label": "Brightness", "value": "1200cd/m²"},
            {"label": "Flip Time", "value": "<3 seconds"},
            {"label": "Motor Cycles", "value": "100,000+"},
            {"label": "Input", "value": "WiFi/USB/HDMI"},
            {"label": "Power", "value": "AC 110-240V"},
            {"label": "Control", "value": "App/Timer/Sensor"}
        ],
        "faqs": [
            {"question": "How reliable is the flip mechanism?", "answer": "The motor is rated for over 100,000 cycles. With typical usage of 10 flips per day, that's over 27 years of operation."},
            {"question": "Can I schedule automated flips?", "answer": "Yes, you can schedule flip times through the app or cloud platform. You can also trigger flips based on motion sensors or external events."},
            {"question": "What poster size fits the back?", "answer": "The poster holder accepts standard print sizes matching the LED panel dimensions. We provide templates for optimal alignment."}
        ],
        "is_active": True,
        "order": 2
    },
    {
        "name": "Ultra Flip",
        "slug": "ultra-flip",
        "category": "poster",
        "tagline": "Premium Flip Display",
        "description": "The pinnacle of flip-style LED signage. Ultra-slim 30mm profile with premium build quality and whisper-quiet operation. Designed for luxury environments where every detail matters.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "THICKNESS", "value": "30mm"},
            {"label": "FLIP ANGLE", "value": "180°"},
            {"label": "BRIGHTNESS", "value": "1500cd/m²"},
            {"label": "WEIGHT", "value": "38kg"}
        ],
        "features": [
            {"icon": "RotateCcw", "title": "Premium Flip Mechanism", "desc": "Smooth 180° motorized flip with whisper-quiet operation"},
            {"icon": "Layers", "title": "Ultra-Slim Profile", "desc": "Industry-leading 30mm thin design"},
            {"icon": "Monitor", "title": "High Brightness", "desc": "1500cd/m² for visibility in bright environments"},
            {"icon": "Wifi", "title": "Smart Connectivity", "desc": "WiFi, 4G, and cloud-based content management"},
            {"icon": "Zap", "title": "Energy Efficient", "desc": "Low power consumption for reduced operating costs"},
            {"icon": "Smartphone", "title": "App Control", "desc": "Full control from smartphone or tablet"}
        ],
        "applications": [
            {"name": "Luxury Retail", "desc": "High-end brand experiences"},
            {"name": "Hotels", "desc": "Lobby and concierge displays"},
            {"name": "Automotive", "desc": "Showroom presentations"},
            {"name": "Banking", "desc": "Branch digital signage"},
            {"name": "Airports", "desc": "Premium lounges"},
            {"name": "Corporate", "desc": "Executive boardrooms"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P2.5 / P3"},
            {"label": "Cabinet Size", "value": "600×1800mm"},
            {"label": "Thickness", "value": "30mm"},
            {"label": "Weight", "value": "38kg"},
            {"label": "Brightness", "value": "1500cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Viewing Angle", "value": "160°/160°"},
            {"label": "Contrast", "value": "5000:1"},
            {"label": "Control", "value": "WiFi/4G/USB/HDMI"},
            {"label": "Power", "value": "AC 110-240V"}
        ],
        "faqs": [
            {"question": "What makes Ultra Flip different from iFlip?", "answer": "Ultra Flip is our premium offering with a slimmer 30mm profile, higher brightness (1500cd/m²), quieter flip mechanism, and enhanced build quality for luxury environments."},
            {"question": "How reliable is the flip mechanism?", "answer": "The motorized flip mechanism is rated for over 100,000 cycles. It uses precision bearings and a belt-driven system for smooth, quiet operation with minimal maintenance."},
            {"question": "Can I schedule automated content and flip sequences?", "answer": "Yes! The cloud management platform allows you to schedule content changes and flip sequences throughout the day. You can also trigger flips based on sensor input or external triggers."}
        ],
        "is_active": True,
        "order": 3
    },
    {
        "name": "Digi Standee",
        "slug": "digi-standee",
        "category": "poster",
        "tagline": "Versatile Digital Display",
        "description": "The go-anywhere LED standee for retail, events, and hospitality. Wheeled base for easy repositioning, plug-and-play operation, and cloud-based content management for effortless deployment.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "THICKNESS", "value": "45mm"},
            {"label": "BRIGHTNESS", "value": "1200cd/m²"},
            {"label": "REFRESH", "value": "3840Hz"},
            {"label": "WEIGHT", "value": "55kg"}
        ],
        "features": [
            {"icon": "Move", "title": "Versatile Placement", "desc": "Freestanding design with lockable casters for easy repositioning"},
            {"icon": "Layers", "title": "Compact Footprint", "desc": "Space-efficient design fits any retail or event environment"},
            {"icon": "Monitor", "title": "Vivid Display", "desc": "High brightness and contrast for eye-catching visuals"},
            {"icon": "Wifi", "title": "Easy Content", "desc": "WiFi, USB, and HDMI for flexible content delivery"},
            {"icon": "Zap", "title": "Quick Setup", "desc": "Plug-and-play operation with no installation required"},
            {"icon": "Smartphone", "title": "Remote Management", "desc": "Cloud-based CMS for multi-location control"}
        ],
        "applications": [
            {"name": "Retail", "desc": "In-store promotions and product highlights"},
            {"name": "Events", "desc": "Trade shows and conferences"},
            {"name": "Hospitality", "desc": "Hotel lobbies and restaurants"},
            {"name": "Healthcare", "desc": "Waiting rooms and wayfinding"},
            {"name": "Real Estate", "desc": "Property showcases"},
            {"name": "Automotive", "desc": "Showroom displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P2.5 / P3"},
            {"label": "Screen Size", "value": "576×1728mm"},
            {"label": "Thickness", "value": "45mm"},
            {"label": "Total Weight", "value": "55kg (with base)"},
            {"label": "Brightness", "value": "1200cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Viewing Angle", "value": "160°/160°"},
            {"label": "Base", "value": "Wheeled, lockable"},
            {"label": "Input", "value": "WiFi/USB/HDMI"},
            {"label": "Power", "value": "AC 110-240V"}
        ],
        "faqs": [
            {"question": "How portable is the Digi Standee?", "answer": "The Digi Standee features lockable casters for easy repositioning. A single person can move it around your store or venue. For transport, it can be disassembled and packed in the included flight case."},
            {"question": "What screen sizes are available?", "answer": "The standard Digi Standee is 576×1728mm. Custom sizes can be accommodated for larger projects. Contact us for dimensions and pricing."},
            {"question": "How long does setup take?", "answer": "The Digi Standee is plug-and-play. Simply wheel it into position, connect power, and start displaying content. Initial setup takes under 5 minutes."}
        ],
        "is_active": True,
        "order": 4
    },
    {
        "name": "OOHPoster",
        "slug": "ooh-poster",
        "category": "poster",
        "tagline": "Outdoor Digital Poster",
        "description": "Built to withstand the elements. High-brightness outdoor LED poster with IP65 weatherproofing, wide temperature tolerance, and 4G remote management for advertising, transit, and public information.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "BRIGHTNESS", "value": "5000cd/m²"},
            {"label": "IP RATING", "value": "IP65"},
            {"label": "TEMP RANGE", "value": "-30°~50°C"},
            {"label": "REFRESH", "value": "3840Hz"}
        ],
        "features": [
            {"icon": "Sun", "title": "High Brightness", "desc": "5000cd/m² for perfect visibility in direct sunlight"},
            {"icon": "Shield", "title": "IP65 Protection", "desc": "Fully weatherproof for any outdoor environment"},
            {"icon": "Thermometer", "title": "Wide Temp Range", "desc": "Operates from -30°C to +50°C with smart thermal management"},
            {"icon": "Droplets", "title": "Rain & Dust Proof", "desc": "Sealed cabinet design protects against elements"},
            {"icon": "Wifi", "title": "4G Connectivity", "desc": "Remote content management via cellular network"},
            {"icon": "Monitor", "title": "Auto Brightness", "desc": "Light sensor automatically adjusts for ambient conditions"}
        ],
        "applications": [
            {"name": "Street Advertising", "desc": "Roadside digital billboards"},
            {"name": "Transit", "desc": "Bus stops and stations"},
            {"name": "Outdoor Retail", "desc": "Storefronts and plazas"},
            {"name": "Events", "desc": "Outdoor festivals and concerts"},
            {"name": "Stadiums", "desc": "Arena advertising"},
            {"name": "Parks", "desc": "Public information displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P4 / P5 / P6"},
            {"label": "Brightness", "value": "5000-6000cd/m²"},
            {"label": "IP Rating", "value": "IP65 (front), IP54 (rear)"},
            {"label": "Operating Temp", "value": "-30°C ~ +50°C"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Viewing Angle", "value": "140°/140°"},
            {"label": "Cabinet Material", "value": "Aluminum + Steel"},
            {"label": "Control", "value": "4G/LAN/WiFi"},
            {"label": "Power", "value": "AC 110-240V"},
            {"label": "Lifespan", "value": "100,000+ hours"}
        ],
        "faqs": [
            {"question": "How does OOHPoster handle extreme weather?", "answer": "OOHPoster is built with IP65-rated front panels that withstand rain, snow, and dust. The cabinet features active ventilation and heating elements to maintain optimal operating temperature from -30°C to +50°C."},
            {"question": "What is the visibility in bright sunlight?", "answer": "With 5000-6000cd/m² brightness and anti-glare coating, OOHPoster maintains excellent visibility even in direct midday sun. The auto-brightness feature adjusts output based on ambient light."},
            {"question": "How is content updated remotely?", "answer": "OOHPoster features built-in 4G connectivity for remote content updates. Our cloud platform allows you to schedule content, monitor display health, and push updates to any location worldwide."}
        ],
        "is_active": True,
        "order": 5
    },
    {
        "name": "Eagle Wing",
        "slug": "eagle-wing",
        "category": "poster",
        "tagline": "Premium Winged Display",
        "description": "Make a statement from every angle. The Eagle Wing's three-panel design with adjustable wings creates a commanding presence with up to 270° visibility. Perfect for high-traffic locations and premium environments.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/74f81d159d7f59d83970b8e2a9edd0b1e5d2ebc4d70495f5578fdee1a9875f37.png",
        "quick_specs": [
            {"label": "CONFIGURATION", "value": "3-Panel"},
            {"label": "ANGLE", "value": "0-120°"},
            {"label": "BRIGHTNESS", "value": "1500cd/m²"},
            {"label": "REFRESH", "value": "3840Hz"}
        ],
        "features": [
            {"icon": "Maximize2", "title": "Winged Design", "desc": "Three-panel configuration with adjustable wing angles (0-120°)"},
            {"icon": "Eye", "title": "270° Visibility", "desc": "Content visible from almost any direction"},
            {"icon": "Layers", "title": "Premium Build", "desc": "Brushed aluminum frame with seamless panel joints"},
            {"icon": "Monitor", "title": "High Brightness", "desc": "1500cd/m² for excellent visibility"},
            {"icon": "Wifi", "title": "Smart Control", "desc": "Independent or synchronized panel content"},
            {"icon": "Zap", "title": "Quick Setup", "desc": "Modular assembly for fast deployment"}
        ],
        "applications": [
            {"name": "Retail Islands", "desc": "Central store displays"},
            {"name": "Auto Showrooms", "desc": "Vehicle showcase stands"},
            {"name": "Luxury Boutiques", "desc": "Premium product highlights"},
            {"name": "Exhibitions", "desc": "Trade show centerpieces"},
            {"name": "Hotel Lobbies", "desc": "Welcome and information"},
            {"name": "Corporate", "desc": "Reception area branding"}
        ],
        "specifications": [
            {"label": "Configuration", "value": "3 Panels (adjustable)"},
            {"label": "Wing Angle", "value": "0° - 120°"},
            {"label": "Pixel Pitch", "value": "P2.5 / P3"},
            {"label": "Panel Size", "value": "500×1500mm per wing"},
            {"label": "Total Width", "value": "1500mm (closed) - 2600mm (open)"},
            {"label": "Brightness", "value": "1500cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Viewing Angle", "value": "160°/160°"},
            {"label": "Control", "value": "WiFi/USB/HDMI"},
            {"label": "Power", "value": "AC 110-240V"}
        ],
        "faqs": [
            {"question": "How do the wing panels adjust?", "answer": "Each wing panel can be manually adjusted from 0° (flat) to 120° and locked in position. This allows you to configure the display for different spaces and viewing angles."},
            {"question": "Can each panel show different content?", "answer": "Yes! Each of the three panels can display independent content, or they can be synchronized for a cohesive wrap-around experience. Our content management system makes it easy to configure either mode."},
            {"question": "What is the total viewing angle?", "answer": "With wings fully extended at 120°, Eagle Wing provides approximately 270° of visibility, making it perfect for central locations where viewers approach from multiple directions."}
        ],
        "is_active": True,
        "order": 6
    },
    # Commercial Series
    {
        "name": "Unity",
        "slug": "unity",
        "category": "commercial",
        "tagline": "Seamless Video Wall System",
        "description": "Build without boundaries. Unity's seamless video wall system combines ultra-narrow bezels with easy installation for stunning large-format displays in control rooms, corporate lobbies, and broadcast studios.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png",
        "quick_specs": [
            {"label": "BEZEL", "value": "<0.88mm"},
            {"label": "PIXEL PITCH", "value": "P1.2-P2.5"},
            {"label": "SEAMLESS", "value": "Yes"},
            {"label": "MODULAR", "value": "Scalable"}
        ],
        "features": [
            {"icon": "Grid3X3", "title": "Seamless Design", "desc": "Ultra-narrow bezels for virtually seamless visuals"},
            {"icon": "Maximize2", "title": "Scalable Size", "desc": "Build any size from 2×2 to 10×10 and beyond"},
            {"icon": "Monitor", "title": "Fine Pitch", "desc": "P1.2 to P2.5 for close viewing distances"},
            {"icon": "Layers", "title": "Easy Install", "desc": "Magnetic mounting for quick assembly and service"},
            {"icon": "Zap", "title": "Hot Swappable", "desc": "Replace modules without powering down"},
            {"icon": "Wifi", "title": "Smart Control", "desc": "Centralized management and monitoring"}
        ],
        "applications": [
            {"name": "Control Rooms", "desc": "Command and operations centers"},
            {"name": "Corporate Lobbies", "desc": "Brand experience walls"},
            {"name": "Broadcast Studios", "desc": "News and production backgrounds"},
            {"name": "Retail Flagships", "desc": "Large-format brand displays"},
            {"name": "Conference Centers", "desc": "Meeting room video walls"},
            {"name": "Museums", "desc": "Immersive exhibit displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P1.2 / P1.5 / P1.8 / P2.5"},
            {"label": "Module Size", "value": "600×337.5mm"},
            {"label": "Bezel Width", "value": "<0.88mm"},
            {"label": "Brightness", "value": "600cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Contrast", "value": "5000:1"},
            {"label": "Color Depth", "value": "16bit"},
            {"label": "Mounting", "value": "Magnetic front service"},
            {"label": "Input", "value": "HDMI/DP/DVI"},
            {"label": "Power", "value": "AC 110-240V"}
        ],
        "faqs": [
            {"question": "What is the smallest pixel pitch available?", "answer": "Unity is available in P1.2 for the finest detail, suitable for viewing distances as close as 1.5 meters. For larger installations with greater viewing distances, P1.8 or P2.5 offer excellent value."},
            {"question": "How easy is maintenance?", "answer": "Unity features magnetic front-service modules that can be removed and replaced without tools. Hot-swap capability means you can replace a module without powering down the entire wall."},
            {"question": "Can I create non-standard configurations?", "answer": "Yes! While standard 16:9 configurations are most common, Unity can be configured in any rectangular arrangement. L-shaped, curved, and corner installations are also possible with custom mounting."}
        ],
        "is_active": True,
        "order": 10
    },
    {
        "name": "VideoBrick",
        "slug": "videobrick",
        "category": "commercial",
        "tagline": "Modular Building Block Display",
        "description": "Build displays like building blocks. VideoBrick's modular design allows for creative configurations and easy scalability. Stack, arrange, and create unique display solutions.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png",
        "quick_specs": [
            {"label": "MODULE SIZE", "value": "320×160mm"},
            {"label": "PIXEL PITCH", "value": "P2.5-P4"},
            {"label": "STACKABLE", "value": "Yes"},
            {"label": "INDOOR/OUTDOOR", "value": "Both"}
        ],
        "features": [
            {"icon": "Puzzle", "title": "Modular Design", "desc": "Building-block approach for creative configurations"},
            {"icon": "Layers", "title": "Stackable", "desc": "Stack vertically or arrange horizontally"},
            {"icon": "Maximize2", "title": "Scalable", "desc": "Start small and expand as needed"},
            {"icon": "Shield", "title": "Durable", "desc": "Impact-resistant modules"},
            {"icon": "Zap", "title": "Easy Install", "desc": "Tool-free magnetic assembly"},
            {"icon": "Wifi", "title": "Smart Control", "desc": "WiFi and LAN connectivity"}
        ],
        "applications": [
            {"name": "Retail", "desc": "Creative store displays"},
            {"name": "Events", "desc": "Temporary installations"},
            {"name": "Sports", "desc": "Stadium and arena displays"},
            {"name": "Education", "desc": "Campus signage"},
            {"name": "Corporate", "desc": "Office branding"},
            {"name": "Hospitality", "desc": "Restaurant and bar displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch", "value": "P2.5 / P3 / P4"},
            {"label": "Module Size", "value": "320×160mm"},
            {"label": "Module Weight", "value": "1.2kg"},
            {"label": "Brightness", "value": "1200cd/m²"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "IP Rating", "value": "IP65 (outdoor version)"},
            {"label": "Viewing Angle", "value": "160°/160°"},
            {"label": "Connection", "value": "Magnetic quick-connect"},
            {"label": "Control", "value": "WiFi/LAN/USB"},
            {"label": "Power", "value": "AC 110-240V"}
        ],
        "faqs": [
            {"question": "How many modules can be connected?", "answer": "A single controller can drive up to 20 VideoBrick modules. For larger installations, multiple controllers can be synchronized for unlimited scalability."},
            {"question": "Can VideoBrick be used outdoors?", "answer": "Yes! The outdoor version (IP65) is fully weatherproof. The indoor version (IP40) is suitable for covered outdoor areas."},
            {"question": "How quickly can configurations be changed?", "answer": "VideoBrick modules connect magnetically without tools. A 3×3 configuration can be assembled in under 10 minutes by one person."}
        ],
        "is_active": True,
        "order": 11
    },
    {
        "name": "iConference",
        "slug": "iconference",
        "category": "commercial",
        "tagline": "Meeting Room LED Display",
        "description": "Transform your boardroom with stunning visual clarity. iConference combines fine pixel pitch LED technology with integrated conferencing features for seamless presentations and collaboration.",
        "hero_image": "https://static.prod-images.emergentagent.com/jobs/a2ffd883-d4cb-4f8a-b10e-28b67c771781/images/c89f5ffe1dc9c397592b6acb7d50a61072989db54795a612c598d5acab9bb4ac.png",
        "quick_specs": [
            {"label": "PIXEL PITCH", "value": "P1.2-P2.5"},
            {"label": "SIZE RANGE", "value": "110\"-220\""},
            {"label": "REFRESH", "value": "3840Hz"},
            {"label": "HDR", "value": "Supported"}
        ],
        "features": [
            {"icon": "Presentation", "title": "All-in-One Solution", "desc": "Integrated display, processor, and control system"},
            {"icon": "Users", "title": "Collaboration Ready", "desc": "Built-in wireless screen sharing and annotation"},
            {"icon": "Monitor", "title": "Fine Pixel Pitch", "desc": "P1.2 to P2.5 for crystal-clear presentations"},
            {"icon": "Video", "title": "Video Conferencing", "desc": "Compatible with Zoom, Teams, WebEx, and more"},
            {"icon": "Mic", "title": "Audio Integration", "desc": "Built-in speakers and mic array support"},
            {"icon": "Wifi", "title": "Wireless Connectivity", "desc": "WiFi, Bluetooth, and AirPlay support"}
        ],
        "applications": [
            {"name": "Boardrooms", "desc": "Executive meeting spaces"},
            {"name": "Training Rooms", "desc": "Corporate learning environments"},
            {"name": "Huddle Spaces", "desc": "Small team collaboration"},
            {"name": "Command Centers", "desc": "Operations and monitoring"},
            {"name": "University Lecture", "desc": "Educational presentations"},
            {"name": "Broadcast Studios", "desc": "Background displays"}
        ],
        "specifications": [
            {"label": "Pixel Pitch Options", "value": "P1.2 / P1.5 / P1.9 / P2.5"},
            {"label": "Screen Sizes", "value": "110\" / 138\" / 165\" / 220\""},
            {"label": "Resolution (165\")", "value": "1920×1080 (P1.9)"},
            {"label": "Brightness", "value": "400-600cd/m² (adjustable)"},
            {"label": "Refresh Rate", "value": "3840Hz"},
            {"label": "Contrast", "value": "5000:1"},
            {"label": "Color Depth", "value": "16bit"},
            {"label": "Inputs", "value": "HDMI 2.1 / DP / USB-C / Wireless"},
            {"label": "Audio", "value": "Built-in 20W speakers"},
            {"label": "Control", "value": "IR / RS232 / LAN / App"}
        ],
        "faqs": [
            {"question": "How does iConference compare to traditional projectors?", "answer": "iConference offers superior brightness, contrast, and color accuracy without lamp replacements. No darkened rooms required, and the fine pixel pitch ensures text is crisp even at close viewing distances."},
            {"question": "What video conferencing platforms are supported?", "answer": "iConference works with all major platforms including Zoom, Microsoft Teams, WebEx, Google Meet, and GoToMeeting. The integrated camera and mic options provide a complete solution."},
            {"question": "Can multiple sources be displayed simultaneously?", "answer": "Yes! The built-in controller supports picture-in-picture and side-by-side display of multiple sources, perfect for comparing documents or showing presenter and content together."}
        ],
        "is_active": True,
        "order": 12
    }
]

# Continue with more products...
# (The full list would include all 24 products)

async def seed_pixelvue_products():
    """Seed PixelVue products collection"""
    print("Seeding PixelVue products...")
    
    # Check if already seeded
    count = await db.pixelvue_products.count_documents({})
    if count > 0:
        print(f"  PixelVue products already seeded ({count} documents). Skipping...")
        return
    
    now = datetime.now(timezone.utc).isoformat()
    for product in PIXELVUE_PRODUCTS:
        product["created_at"] = now
        product["updated_at"] = now
    
    result = await db.pixelvue_products.insert_many(PIXELVUE_PRODUCTS)
    print(f"  Inserted {len(result.inserted_ids)} PixelVue products")

async def main():
    print("=" * 50)
    print("CMS Seed Script")
    print("=" * 50)
    
    await seed_pixelvue_products()
    
    print("\nSeeding complete!")

if __name__ == "__main__":
    asyncio.run(main())
