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
    ("/compare", 0.6, "monthly"),
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
