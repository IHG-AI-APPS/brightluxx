"""Dynamic sitemap.xml generation."""
from fastapi import APIRouter
from fastapi.responses import Response
from datetime import datetime

router = APIRouter()

STATIC_ROUTES = [
    # High priority pages
    ("/", 1.0, "daily"),
    ("/products", 0.9, "daily"),
    ("/solutions", 0.9, "weekly"),
    ("/contact", 0.9, "monthly"),
    ("/about", 0.8, "monthly"),
    
    # Product Families - High priority
    ("/product-families", 0.9, "weekly"),
    ("/pixelvue", 0.9, "weekly"),
    ("/lumimorph", 0.9, "weekly"),
    ("/naturatex", 0.9, "weekly"),
    ("/signatouch", 0.9, "weekly"),
    ("/glassmorph", 0.9, "weekly"),
    
    # LumiMorph products
    ("/lumimorph/elite", 0.8, "monthly"),
    ("/lumimorph/grande", 0.8, "monthly"),
    ("/lumimorph/mini", 0.8, "monthly"),
    
    # NaturaTex products
    ("/naturatex/holoveil", 0.8, "monthly"),
    
    # SignaTouch products
    ("/signatouch/touch-kiosk", 0.8, "monthly"),
    ("/signatouch/smart-signage", 0.8, "monthly"),
    ("/signatouch/self-service", 0.8, "monthly"),
    
    # GlassMorph products
    ("/glassmorph/smart-film", 0.8, "monthly"),
    ("/glassmorph/led-film", 0.8, "monthly"),
    ("/glassmorph/media-glass", 0.8, "monthly"),
    ("/glassmorph/flying-display", 0.8, "monthly"),
    ("/glassmorph/switchable-glass", 0.8, "monthly"),
    ("/glassmorph/hanging-led", 0.8, "monthly"),
    
    # Knowledge hub
    ("/knowledge", 0.9, "weekly"),
    ("/knowledge/cob-vs-mip-vs-smd", 0.8, "monthly"),
    ("/knowledge/pixel-pitch-guide", 0.8, "monthly"),
    ("/knowledge/brightness-nits-guide", 0.8, "monthly"),
    ("/knowledge/ip-rating-guide", 0.8, "monthly"),
    ("/knowledge/refresh-rate-guide", 0.8, "monthly"),
    ("/knowledge/processing-calibration", 0.8, "monthly"),
    ("/knowledge/cms-multi-site", 0.8, "monthly"),
    
    # Applications
    ("/applications", 0.8, "weekly"),
    ("/applications/retail", 0.7, "monthly"),
    ("/applications/hospitality", 0.7, "monthly"),
    ("/applications/corporate", 0.7, "monthly"),
    ("/applications/healthcare", 0.7, "monthly"),
    ("/applications/education", 0.7, "monthly"),
    ("/applications/outdoor", 0.7, "monthly"),
    ("/applications/transport", 0.7, "monthly"),
    ("/applications/worship", 0.7, "monthly"),
    
    # Blog & Resources
    ("/blog", 0.8, "daily"),
    ("/faq", 0.7, "monthly"),
    ("/resource-library", 0.8, "weekly"),
    
    # Projects & Case Studies  
    ("/projects", 0.8, "weekly"),
    ("/inspirations", 0.7, "weekly"),
    ("/case-studies", 0.9, "weekly"),
    
    # For Architects & Contractors
    ("/for-architects", 0.8, "monthly"),
    ("/design-assist", 0.8, "monthly"),
    ("/cpd-programme", 0.7, "monthly"),
    ("/value-engineering", 0.7, "monthly"),
    ("/spec-substitution", 0.7, "monthly"),
    
    # Tools & Calculators
    ("/budget-estimator", 0.8, "monthly"),
    ("/calculator", 0.7, "monthly"),
    ("/viewing-distance", 0.7, "monthly"),
    ("/power-estimator", 0.7, "monthly"),
    ("/led-module-calculator", 0.7, "monthly"),
    ("/project-planner", 0.8, "monthly"),
    ("/technology-selector", 0.8, "monthly"),
    
    # Technology pages
    ("/technology", 0.8, "weekly"),
    ("/technology/microled", 0.7, "monthly"),
    ("/technology/cob-led", 0.7, "monthly"),
    ("/technology/mip-led", 0.7, "monthly"),
    ("/technology/fine-pitch-led", 0.7, "monthly"),
    ("/technology/all-in-one-dvled", 0.7, "monthly"),
    ("/technology/transparent-led", 0.7, "monthly"),
    ("/technology/3d-anamorphic-led", 0.7, "monthly"),
    ("/technology/creative-led", 0.7, "monthly"),
    ("/technology/media-facade", 0.7, "monthly"),
    
    # Latest Tech
    ("/latest-tech", 0.7, "weekly"),
    ("/latest-tech/glasses-free-3d", 0.6, "monthly"),
    ("/latest-tech/microled", 0.6, "monthly"),
    ("/latest-tech/transparent-led", 0.6, "monthly"),
    ("/latest-tech/ai-powered", 0.6, "monthly"),
    
    # Digital Experience
    ("/digital-experience-architecture", 0.7, "monthly"),
    ("/digital-experience/media-facades", 0.6, "monthly"),
    ("/digital-experience/immersive-led-rooms", 0.6, "monthly"),
    ("/digital-experience/retail-experiential-screens", 0.6, "monthly"),
    
    # Contractor pages
    ("/contractors/dvled-vs-lcd", 0.6, "monthly"),
    ("/contractors/led-cost-per-sqm", 0.6, "monthly"),
    ("/contractors/led-installation-guide", 0.6, "monthly"),
    
    # Other pages
    ("/factory-tour", 0.5, "monthly"),
    ("/tech-guide", 0.6, "monthly"),
    ("/installation-guide", 0.6, "monthly"),
    ("/sla-guide", 0.6, "monthly"),
    ("/distribution", 0.5, "monthly"),
    ("/supplier-registration", 0.5, "monthly"),
    ("/technical-support", 0.5, "monthly"),
    ("/compare", 0.5, "monthly"),
    ("/lp/specifier-toolkit", 0.6, "monthly"),
]

BASE_URL = "https://brightluxx.com"


@router.get("/api/sitemap.xml")
async def sitemap():
    """Generate dynamic sitemap.xml."""
    today = datetime.now().strftime("%Y-%m-%d")

    urls = []
    for path, priority, freq in STATIC_ROUTES:
        urls.append(
            f"  <url>\n"
            f"    <loc>{BASE_URL}{path}</loc>\n"
            f"    <lastmod>{today}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>"
        )

    # Add dynamic product pages from DB
    try:
        from database import products_col
        products = await products_col.find({}, {"slug": 1, "_id": 0}).to_list(500)
        for p in products:
            if p.get("slug"):
                urls.append(
                    f"  <url>\n"
                    f"    <loc>{BASE_URL}/products/{p['slug']}</loc>\n"
                    f"    <lastmod>{today}</lastmod>\n"
                    f"    <changefreq>weekly</changefreq>\n"
                    f"    <priority>0.7</priority>\n"
                    f"  </url>"
                )
    except Exception:
        pass
    
    # Add dynamic PixelVue product pages
    try:
        from database import db
        pixelvue_products = list(db.pixelvue_products.find({"status": "published"}, {"slug": 1}))
        for p in pixelvue_products:
            if p.get("slug"):
                urls.append(
                    f"  <url>\n"
                    f"    <loc>{BASE_URL}/pixelvue/{p['slug']}</loc>\n"
                    f"    <lastmod>{today}</lastmod>\n"
                    f"    <changefreq>weekly</changefreq>\n"
                    f"    <priority>0.7</priority>\n"
                    f"  </url>"
                )
    except Exception:
        pass
    
    # Add dynamic solution pages
    try:
        from database import db
        solutions = list(db.solutions_content.find({"status": "published"}, {"slug": 1}))
        for s in solutions:
            if s.get("slug"):
                urls.append(
                    f"  <url>\n"
                    f"    <loc>{BASE_URL}/solutions/{s['slug']}</loc>\n"
                    f"    <lastmod>{today}</lastmod>\n"
                    f"    <changefreq>weekly</changefreq>\n"
                    f"    <priority>0.7</priority>\n"
                    f"  </url>"
                )
    except Exception:
        pass
    
    # Add dynamic blog posts
    try:
        from database import db
        blogs = list(db.blogs.find({"status": "published"}, {"slug": 1}))
        for b in blogs:
            if b.get("slug"):
                urls.append(
                    f"  <url>\n"
                    f"    <loc>{BASE_URL}/blog/{b['slug']}</loc>\n"
                    f"    <lastmod>{today}</lastmod>\n"
                    f"    <changefreq>weekly</changefreq>\n"
                    f"    <priority>0.6</priority>\n"
                    f"  </url>"
                )
    except Exception:
        pass
    
    # Add dynamic case studies
    try:
        from database import db
        case_studies = list(db.case_studies.find({"status": "published"}, {"slug": 1}))
        for cs in case_studies:
            if cs.get("slug"):
                urls.append(
                    f"  <url>\n"
                    f"    <loc>{BASE_URL}/case-studies/{cs['slug']}</loc>\n"
                    f"    <lastmod>{today}</lastmod>\n"
                    f"    <changefreq>monthly</changefreq>\n"
                    f"    <priority>0.6</priority>\n"
                    f"  </url>"
                )
    except Exception:
        pass

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls) + "\n"
        '</urlset>'
    )

    return Response(content=xml, media_type="application/xml")
