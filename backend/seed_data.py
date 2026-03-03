"""Seed database with sample content for Brightluxx"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client["brightluxx"]

async def seed_database():
    print("🌱 Seeding Brightluxx database...")
    
    # Clear existing data
    await db.technologies.delete_many({})
    await db.applications.delete_many({})
    await db.case_studies.delete_many({})
    await db.updates.delete_many({})
    await db.resources.delete_many({})
    
    # Technologies
    technologies = [
        {
            "name": "MicroLED Pro Series",
            "tagline": "Ultra-fine pitch LED display for premium indoor applications",
            "slug": "microled-pro-series",
            "category": "micro-led",
            "heroMedia": {
                "type": "image",
                "url": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200",
                "alt": "MicroLED Display"
            },
            "gallery": [
                {"type": "image", "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "alt": "View 1"},
                {"type": "image", "url": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", "alt": "View 2"}
            ],
            "keySpecs": [
                {"label": "Pixel Pitch", "value": "0.9mm - 1.5mm"},
                {"label": "Brightness", "value": "600 nits"},
                {"label": "Refresh Rate", "value": "3840 Hz"},
                {"label": "Viewing Angle", "value": "160°"},
                {"label": "IP Rating", "value": "IP30 (Indoor)"}
            ],
            "comparisonFields": {
                "pixelPitch": "0.9mm - 1.5mm",
                "brightness": "600 nits",
                "refreshRate": "3840 Hz",
                "ipRating": "IP30",
                "applications": ["Corporate", "Retail", "Control Rooms"]
            },
            "description": "Premium MicroLED technology for stunning visual clarity in high-end installations.",
            "generatedContent": {
                "summary": "Our MicroLED Pro Series delivers unparalleled visual clarity with ultra-fine pitch technology. Engineered for UAE's demanding environments, it combines superior brightness control with energy efficiency. Perfect for corporate lobbies, luxury retail, and control room applications where image quality cannot be compromised.",
                "uaeBenefits": [
                    "Advanced thermal management for UAE heat conditions",
                    "High contrast ratio for bright indoor environments",
                    "24/7 operation with minimal maintenance"
                ],
                "applications": ["Corporate Lobbies", "Luxury Retail", "Control Rooms", "Broadcasting"]
            },
            "seo": {
                "title": "MicroLED Pro Series - Premium Indoor LED Display | Brightluxx",
                "metaDescription": "Ultra-fine pitch MicroLED displays for UAE. Superior clarity, energy efficient, built for 24/7 operation.",
                "slug": "microled-pro-series"
            },
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "Outdoor DOOH Ultra",
            "tagline": "High-brightness outdoor LED displays for maximum visibility",
            "slug": "outdoor-dooh-ultra",
            "category": "outdoor",
            "heroMedia": {
                "type": "image",
                "url": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200",
                "alt": "Outdoor LED Display"
            },
            "gallery": [
                {"type": "image", "url": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800", "alt": "Outdoor View"}
            ],
            "keySpecs": [
                {"label": "Pixel Pitch", "value": "3.9mm - 10mm"},
                {"label": "Brightness", "value": "8000 nits"},
                {"label": "IP Rating", "value": "IP65 (Weatherproof)"},
                {"label": "Operating Temp", "value": "-20°C to +60°C"},
                {"label": "Power Efficiency", "value": "Common Cathode"}
            ],
            "comparisonFields": {
                "pixelPitch": "3.9mm - 10mm",
                "brightness": "8000 nits",
                "refreshRate": "1920 Hz",
                "ipRating": "IP65",
                "applications": ["DOOH", "Outdoor Advertising", "Stadiums"]
            },
            "description": "Extreme brightness outdoor displays designed for Dubai's intense sunlight and harsh conditions.",
            "generatedContent": {
                "summary": "Outdoor DOOH Ultra is engineered specifically for UAE's extreme climate. With 8000 nits brightness, content remains crystal clear even in direct midday sun. IP65 weatherproof rating protects against dust storms and occasional rain. Common cathode technology reduces power consumption by 40% while extending lifespan.",
                "uaeBenefits": [
                    "Extreme brightness for UAE sunlight conditions",
                    "Dust and heat resistant (IP65, -20°C to +60°C)",
                    "40% power savings with common cathode technology"
                ],
                "applications": ["Digital Billboards", "Mall Exteriors", "Highway Advertising", "Sports Venues"]
            },
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "Transparent LED Film",
            "tagline": "Innovative see-through displays for architectural glass",
            "slug": "transparent-led-film",
            "category": "creative",
            "heroMedia": {
                "type": "image",
                "url": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200",
                "alt": "Transparent LED Display"
            },
            "gallery": [],
            "keySpecs": [
                {"label": "Transparency", "value": "70-85%"},
                {"label": "Brightness", "value": "4000 nits"},
                {"label": "Weight", "value": "8kg/sqm"},
                {"label": "Installation", "value": "Glass mounting"}
            ],
            "comparisonFields": {
                "transparency": "70-85%",
                "brightness": "4000 nits",
                "applications": ["Retail Windows", "Corporate Glass Facades", "Shopping Malls"]
            },
            "description": "Revolutionary transparent LED technology that transforms glass into dynamic displays.",
            "generatedContent": {
                "summary": "Transform your glass facades into stunning digital displays without blocking natural light. Our Transparent LED Film maintains 70-85% transparency while delivering vibrant 4000-nit brightness. Perfect for Dubai's iconic glass architecture in retail, corporate, and hospitality spaces.",
                "uaeBenefits": [
                    "Maintains natural light and views through glass",
                    "High brightness visible even in Dubai sunlight",
                    "Lightweight design works with existing glass"
                ],
                "applications": ["Retail Store Windows", "Mall Atriums", "Corporate Lobbies", "Hotel Facades"]
            },
            "featured": False,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "3D Holographic Display",
            "tagline": "Glasses-free 3D LED displays for immersive experiences",
            "slug": "3d-holographic-display",
            "category": "creative",
            "heroMedia": {
                "type": "image",
                "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
                "alt": "3D Display"
            },
            "gallery": [],
            "keySpecs": [
                {"label": "Pixel Pitch", "value": "2.5mm"},
                {"label": "Viewing Angle", "value": "120° 3D zone"},
                {"label": "Brightness", "value": "5000 nits"},
                {"label": "3D Effect", "value": "No glasses required"}
            ],
            "comparisonFields": {
                "pixelPitch": "2.5mm",
                "brightness": "5000 nits",
                "applications": ["Retail", "Events", "Brand Activations"]
            },
            "description": "Latest ISE 2026 technology: glasses-free 3D displays that stop people in their tracks.",
            "generatedContent": {
                "summary": "Create viral-worthy installations with our glasses-free 3D Holographic Display, showcased at ISE 2026. Perfect for high-traffic areas in Dubai malls, brand activations, and luxury retail. Content appears to float in mid-air, creating unforgettable customer experiences and social media moments.",
                "uaeBenefits": [
                    "Creates social media buzz and foot traffic",
                    "No special glasses needed for 3D effect",
                    "High brightness works in bright UAE retail environments"
                ],
                "applications": ["Shopping Malls", "Brand Pop-ups", "Luxury Retail", "Event Stages"]
            },
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        }
    ]
    
    await db.technologies.insert_many(technologies)
    print(f"✅ Inserted {len(technologies)} technologies")
    
    # Applications
    applications = [
        {
            "name": "Retail & Shopping Malls",
            "slug": "retail-shopping-malls",
            "tagline": "Transform shopping experiences with dynamic digital displays",
            "description": "Engage shoppers with stunning LED displays that drive sales and create memorable brand experiences. From window displays to mall atriums, our solutions increase foot traffic and dwell time.",
            "heroImage": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
            "useCases": [
                "Window displays that stop shoppers",
                "Mall directory and wayfinding",
                "Promotional campaigns and sales",
                "Brand experience zones"
            ],
            "recommendedTech": ["microled-pro-series", "transparent-led-film", "3d-holographic-display"],
            "benefits": [
                {"title": "Increased Foot Traffic", "description": "Dynamic content attracts 3x more attention than static signage"},
                {"title": "Higher Conversion", "description": "Digital displays increase purchase intent by 25%"},
                {"title": "Flexible Content", "description": "Update promotions instantly across all locations"}
            ],
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "Corporate & Boardrooms",
            "slug": "corporate-boardrooms",
            "tagline": "Elevate business communications with premium displays",
            "description": "Make every presentation impactful with ultra-fine pitch LED displays. Perfect for boardrooms, lobbies, and executive spaces where image quality matters.",
            "heroImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
            "useCases": [
                "Executive boardroom presentations",
                "Corporate lobby branding",
                "Video conferencing walls",
                "Data visualization centers"
            ],
            "recommendedTech": ["microled-pro-series"],
            "benefits": [
                {"title": "Professional Image", "description": "Premium displays reflect your brand's quality"},
                {"title": "Seamless Integration", "description": "Thin bezels create unified large-format displays"},
                {"title": "Reliable Performance", "description": "24/7 operation with minimal maintenance"}
            ],
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "Outdoor Advertising",
            "slug": "outdoor-advertising",
            "tagline": "High-impact DOOH displays that command attention",
            "description": "Dominate Dubai's skyline with ultra-bright outdoor LED displays. Built to withstand extreme heat, dust, and deliver crystal-clear content 24/7.",
            "heroImage": "https://images.unsplash.com/photo-1526666361175-e0b98368ace2?w=1200",
            "useCases": [
                "Highway digital billboards",
                "Building facade displays",
                "Mall exterior branding",
                "Sports stadium perimeters"
            ],
            "recommendedTech": ["outdoor-dooh-ultra"],
            "benefits": [
                {"title": "Extreme Visibility", "description": "8000 nits brightness cuts through Dubai sunlight"},
                {"title": "Weather Resistant", "description": "IP65 protection against dust storms and rain"},
                {"title": "Energy Efficient", "description": "40% power savings with common cathode technology"}
            ],
            "featured": True,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        },
        {
            "name": "Events & Staging",
            "slug": "events-staging",
            "tagline": "Lightweight, modular LED systems for unforgettable events",
            "description": "Fast setup, stunning visuals, and reliable performance for concerts, conferences, and corporate events across the UAE.",
            "heroImage": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
            "useCases": [
                "Concert stages and music festivals",
                "Corporate conferences and exhibitions",
                "Product launches and brand activations",
                "Wedding and social events"
            ],
            "recommendedTech": [],
            "benefits": [
                {"title": "Quick Setup", "description": "Modular design reduces installation time by 50%"},
                {"title": "Lightweight", "description": "Easy transport and rigging for any venue"},
                {"title": "Scalable", "description": "Configure any size from small stages to arena walls"}
            ],
            "featured": False,
            "publishedAt": datetime.now(),
            "createdAt": datetime.now()
        }
    ]
    
    await db.applications.insert_many(applications)
    print(f"✅ Inserted {len(applications)} applications")
    
    # Case Studies
    case_studies = [
        {
            "title": "Dubai Mall Flagship Store",
            "slug": "dubai-mall-flagship-store",
            "client": "Luxury Fashion Brand",
            "location": "Dubai Mall, UAE",
            "category": "retail",
            "heroImage": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200",
            "videoUrl": None,
            "gallery": [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
            ],
            "description": "Transformed a flagship store entrance with a stunning 10m x 3m transparent LED display, creating an immersive brand experience while maintaining natural light flow.",
            "metrics": [
                {"label": "Display Area", "value": "30 sqm"},
                {"label": "Foot Traffic Increase", "value": "+45%"},
                {"label": "Installation Time", "value": "48 hours"},
                {"label": "Uptime", "value": "99.9%"}
            ],
            "technologies": ["transparent-led-film", "microled-pro-series"],
            "featured": True,
            "publishedAt": datetime.now() - timedelta(days=30),
            "createdAt": datetime.now() - timedelta(days=30)
        },
        {
            "title": "Sheikh Zayed Road Digital Billboard",
            "slug": "sheikh-zayed-road-billboard",
            "client": "Major Real Estate Developer",
            "location": "Sheikh Zayed Road, Dubai",
            "category": "outdoor",
            "heroImage": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
            "videoUrl": None,
            "gallery": [],
            "description": "Installed UAE's brightest outdoor LED billboard on Sheikh Zayed Road, delivering crystal-clear content to 500,000+ daily commuters in extreme sunlight conditions.",
            "metrics": [
                {"label": "Display Size", "value": "12m x 6m"},
                {"label": "Brightness", "value": "8000 nits"},
                {"label": "Daily Impressions", "value": "500,000+"},
                {"label": "Power Savings", "value": "40%"}
            ],
            "technologies": ["outdoor-dooh-ultra"],
            "featured": True,
            "publishedAt": datetime.now() - timedelta(days=60),
            "createdAt": datetime.now() - timedelta(days=60)
        },
        {
            "title": "Emirates Corporate HQ Lobby",
            "slug": "emirates-corporate-hq-lobby",
            "client": "Fortune 500 Company",
            "location": "Business Bay, Dubai",
            "category": "corporate",
            "heroImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
            "videoUrl": None,
            "gallery": [],
            "description": "Created an impressive 8K video wall in the corporate lobby using ultra-fine pitch MicroLED technology, showcasing company values and achievements to visitors and employees.",
            "metrics": [
                {"label": "Resolution", "value": "7680 x 2160 (8K)"},
                {"label": "Pixel Pitch", "value": "0.9mm"},
                {"label": "Display Area", "value": "20 sqm"},
                {"label": "Visitor Engagement", "value": "+60%"}
            ],
            "technologies": ["microled-pro-series"],
            "featured": True,
            "publishedAt": datetime.now() - timedelta(days=45),
            "createdAt": datetime.now() - timedelta(days=45)
        }
    ]
    
    await db.case_studies.insert_many(case_studies)
    print(f"✅ Inserted {len(case_studies)} case studies")
    
    # Updates (ISE News)
    updates = [
        {
            "title": "ISE 2026: Introducing Glasses-Free 3D LED Displays",
            "slug": "ise-2026-3d-led-displays",
            "category": "ise-launch",
            "excerpt": "Revolutionary glasses-free 3D technology showcased at ISE 2026 creates immersive experiences without special equipment.",
            "content": "At ISE 2026, we unveiled our latest innovation in LED display technology: glasses-free 3D LED displays. This groundbreaking technology creates stunning 3D effects visible from multiple angles without requiring viewers to wear any special glasses.\n\nPerfect for high-traffic retail environments, brand activations, and experiential marketing, these displays create viral-worthy moments that drive foot traffic and social media engagement. With 5000 nits brightness, the 3D effect remains visible even in bright UAE retail environments.\n\nEarly installations in Dubai malls have shown a 200% increase in dwell time and significant social media buzz. Contact us to see a live demo.",
            "heroImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
            "tags": ["ISE 2026", "3D Display", "Innovation", "Retail"],
            "publishedAt": datetime.now() - timedelta(days=7),
            "createdAt": datetime.now() - timedelta(days=7)
        },
        {
            "title": "MiP vs COB vs SMD: Which LED Technology is Right for UAE?",
            "slug": "mip-vs-cob-vs-smd-led-uae",
            "category": "product",
            "excerpt": "Understanding the differences between MiP, COB, and SMD LED technologies and which works best in UAE conditions.",
            "content": "Choosing the right LED packaging technology is crucial for performance in UAE's extreme climate. Here's what you need to know:\n\n**SMD (Surface-Mounted Device)**: Traditional technology, proven reliability, good for most applications.\n\n**COB (Chip-on-Board)**: Better heat dissipation, higher contrast, excellent for indoor fine-pitch displays. Popular in corporate and broadcast applications.\n\n**MiP (Mini LED in Package)**: Latest technology combining benefits of both. Superior viewing angles, better color uniformity, and improved heat management. Ideal for UAE's demanding conditions.\n\nFor UAE projects, we typically recommend:\n- Indoor: COB or MiP for premium applications\n- Outdoor: SMD with common cathode for power efficiency\n- Rental: SMD for proven reliability and serviceability",
            "heroImage": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200",
            "tags": ["Technology", "MiP", "COB", "SMD", "Guide"],
            "publishedAt": datetime.now() - timedelta(days=14),
            "createdAt": datetime.now() - timedelta(days=14)
        },
        {
            "title": "New Energy-Efficient Outdoor Displays Save 40% Power",
            "slug": "energy-efficient-outdoor-displays",
            "category": "product",
            "excerpt": "Common cathode technology reduces power consumption by 40% while improving brightness and lifespan.",
            "content": "Our latest outdoor DOOH displays feature advanced common cathode technology, reducing power consumption by up to 40% compared to traditional designs.\n\nKey benefits for UAE operators:\n- Lower electricity costs (significant for 24/7 operation)\n- Reduced heat generation (longer component life in hot climate)\n- Better brightness at lower power (8000 nits sustained)\n- Smaller environmental footprint\n\nWith electricity costs in the UAE, typical payback period is under 2 years. Plus, reduced heat means lower AC costs for indoor control rooms.\n\nIdeal for highway billboards, building facades, and sports stadiums where displays run continuously.",
            "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
            "tags": ["Energy Efficiency", "Outdoor", "Common Cathode", "Sustainability"],
            "publishedAt": datetime.now() - timedelta(days=21),
            "createdAt": datetime.now() - timedelta(days=21)
        }
    ]
    
    await db.updates.insert_many(updates)
    print(f"✅ Inserted {len(updates)} updates")
    
    # Resources
    resources = [
        {
            "title": "LED Display Buyer's Guide for UAE",
            "slug": "led-display-buyers-guide-uae",
            "type": "pdf",
            "description": "Comprehensive guide covering pixel pitch, brightness, IP ratings, and UAE-specific considerations for LED display projects.",
            "thumbnail": "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=600",
            "fileUrl": "/downloads/led-buyers-guide.pdf",
            "gated": True,
            "createdAt": datetime.now()
        },
        {
            "title": "Spec Sheet: MicroLED Pro Series",
            "slug": "spec-sheet-microled-pro",
            "type": "pdf",
            "description": "Detailed technical specifications, dimensions, and installation requirements for MicroLED Pro Series.",
            "thumbnail": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600",
            "fileUrl": "/downloads/microled-pro-specs.pdf",
            "gated": True,
            "createdAt": datetime.now()
        },
        {
            "title": "Case Study Collection 2025",
            "slug": "case-study-collection-2025",
            "type": "pdf",
            "description": "20+ UAE project case studies with photos, metrics, and client testimonials.",
            "thumbnail": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
            "fileUrl": "/downloads/case-studies-2025.pdf",
            "gated": True,
            "createdAt": datetime.now()
        }
    ]
    
    await db.resources.insert_many(resources)
    print(f"✅ Inserted {len(resources)} resources")
    
    print("\n✅ Database seeded successfully!")
    print(f"   - {len(technologies)} Technologies")
    print(f"   - {len(applications)} Applications")
    print(f"   - {len(case_studies)} Case Studies")
    print(f"   - {len(updates)} Updates")
    print(f"   - {len(resources)} Resources")

if __name__ == "__main__":
    asyncio.run(seed_database())