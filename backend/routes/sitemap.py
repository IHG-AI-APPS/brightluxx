"""Dynamic sitemap.xml generation."""
from fastapi import APIRouter
from fastapi.responses import Response
from datetime import datetime

router = APIRouter()

STATIC_ROUTES = [
    ("/", 1.0, "daily"),
    ("/products", 0.9, "daily"),
    ("/solutions", 0.8, "weekly"),
    ("/knowledge", 0.9, "weekly"),
    ("/projects", 0.7, "weekly"),
    ("/contact", 0.7, "monthly"),
    ("/about", 0.5, "monthly"),
    ("/calculator", 0.8, "monthly"),
    ("/budget-estimator", 0.8, "monthly"),
    ("/viewing-distance", 0.8, "monthly"),
    ("/power-estimator", 0.8, "monthly"),
    ("/installation-guide", 0.8, "monthly"),
    ("/project-planner", 0.9, "monthly"),
    ("/compare", 0.6, "monthly"),
    ("/resources", 0.9, "weekly"),
    ("/for-architects", 0.8, "weekly"),
    ("/value-engineering", 0.8, "weekly"),
    ("/spec-substitution", 0.7, "monthly"),
    ("/applications", 0.8, "weekly"),
    ("/latest-tech", 0.7, "weekly"),
    # Knowledge Base
    ("/knowledge/cob-vs-mip-vs-smd", 0.8, "monthly"),
    ("/knowledge/pixel-pitch-guide", 0.8, "monthly"),
    ("/knowledge/brightness-nits-guide", 0.8, "monthly"),
    ("/knowledge/ip-rating-guide", 0.8, "monthly"),
    ("/knowledge/refresh-rate-guide", 0.8, "monthly"),
    ("/knowledge/processing-calibration", 0.8, "monthly"),
    ("/knowledge/cms-multi-site", 0.8, "monthly"),
    # Applications
    ("/applications/retail", 0.7, "monthly"),
    ("/applications/hospitality", 0.7, "monthly"),
    ("/applications/corporate", 0.7, "monthly"),
    ("/applications/healthcare", 0.7, "monthly"),
    ("/applications/education", 0.7, "monthly"),
    ("/applications/outdoor", 0.7, "monthly"),
    ("/applications/transport", 0.7, "monthly"),
    ("/applications/worship", 0.7, "monthly"),
    # Contractor Pages
    ("/contractors/dvled-vs-lcd", 0.7, "monthly"),
    ("/contractors/led-cost-per-sqm", 0.7, "monthly"),
    ("/contractors/led-installation-guide", 0.7, "monthly"),
    # Latest Tech
    ("/latest-tech/glasses-free-3d", 0.6, "monthly"),
    ("/latest-tech/microled", 0.6, "monthly"),
    ("/latest-tech/transparent-led", 0.6, "monthly"),
    ("/latest-tech/ai-powered", 0.6, "monthly"),
    # Technology Pillar Pages
    ("/technology", 0.9, "weekly"),
    ("/technology/microled", 0.8, "monthly"),
    ("/technology/cob-led", 0.8, "monthly"),
    ("/technology/mip-led", 0.8, "monthly"),
    ("/technology/fine-pitch-led", 0.8, "monthly"),
    ("/technology/all-in-one-dvled", 0.8, "monthly"),
    ("/technology/transparent-led", 0.8, "monthly"),
    ("/technology/3d-anamorphic-led", 0.8, "monthly"),
    ("/technology/creative-led", 0.8, "monthly"),
    ("/technology/media-facade", 0.8, "monthly"),
    # Case Studies
    ("/case-studies", 0.9, "weekly"),
    ("/case-studies/jumeirah-al-naseem-lobby", 0.7, "monthly"),
    ("/case-studies/dubai-mall-flagship-retail", 0.7, "monthly"),
    ("/case-studies/adnoc-hq-command-center", 0.7, "monthly"),
    ("/case-studies/riyadh-metro-passenger-info", 0.7, "monthly"),
    ("/case-studies/expo-city-dubai-event-hall", 0.7, "monthly"),
    ("/case-studies/cleveland-clinic-abu-dhabi", 0.7, "monthly"),
    ("/case-studies/the-view-at-the-palm-transparent", 0.7, "monthly"),
    ("/case-studies/kapsarc-3d-anamorphic", 0.7, "monthly"),
    # CPD Programme
    ("/cpd-programme", 0.8, "monthly"),
    # SLA Guide
    ("/sla-guide", 0.8, "monthly"),
    # Design Assist & Digital Experience
    ("/design-assist", 0.9, "monthly"),
    ("/digital-experience-architecture", 0.8, "monthly"),
    # Digital Experience Detail Pages
    ("/digital-experience/media-facades", 0.8, "monthly"),
    ("/digital-experience/immersive-led-rooms", 0.8, "monthly"),
    ("/digital-experience/retail-experiential-screens", 0.8, "monthly"),
    ("/lp/specifier-toolkit", 0.7, "monthly"),
    # Technology Selector Quiz
    ("/technology-selector", 0.8, "monthly"),
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
