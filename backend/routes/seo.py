"""
SEO Routes - Sitemap and robots.txt generation
"""
from fastapi import APIRouter, Response
from datetime import datetime
import os

router = APIRouter(tags=["SEO"])

# Base URL for production
BASE_URL = os.environ.get("SITE_URL", "https://brightluxx.com")

# Static routes with their priorities and change frequencies
STATIC_ROUTES = [
    # High priority pages
    {"path": "/", "priority": "1.0", "changefreq": "weekly"},
    {"path": "/products", "priority": "0.9", "changefreq": "weekly"},
    {"path": "/solutions", "priority": "0.9", "changefreq": "weekly"},
    {"path": "/contact", "priority": "0.9", "changefreq": "monthly"},
    {"path": "/about", "priority": "0.8", "changefreq": "monthly"},
    
    # Product families
    {"path": "/product-families", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/pixelvue", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/lumimorph", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/naturatex", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/signatouch", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/glassmorph", "priority": "0.8", "changefreq": "weekly"},
    
    # Product family subpages
    {"path": "/lumimorph/elite", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/lumimorph/grande", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/lumimorph/mini", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/naturatex/holoveil", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/signatouch/touch-kiosk", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/signatouch/smart-signage", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/signatouch/self-service", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/glassmorph/smart-film", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/glassmorph/led-film", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/glassmorph/media-glass", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/glassmorph/flying-display", "priority": "0.7", "changefreq": "monthly"},
    
    # Applications
    {"path": "/applications", "priority": "0.8", "changefreq": "weekly"},
    
    # Knowledge hub
    {"path": "/knowledge", "priority": "0.8", "changefreq": "weekly"},
    {"path": "/knowledge/cob-vs-mip-vs-smd", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/pixel-pitch-guide", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/brightness-nits-guide", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/ip-rating-guide", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/refresh-rate-guide", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/processing-calibration", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/knowledge/cms-multi-site", "priority": "0.7", "changefreq": "monthly"},
    
    # Blog
    {"path": "/blog", "priority": "0.7", "changefreq": "daily"},
    
    # Other pages
    {"path": "/faq", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/projects", "priority": "0.7", "changefreq": "weekly"},
    {"path": "/inspirations", "priority": "0.6", "changefreq": "weekly"},
    {"path": "/case-studies", "priority": "0.7", "changefreq": "weekly"},
    {"path": "/factory-tour", "priority": "0.5", "changefreq": "monthly"},
    {"path": "/for-architects", "priority": "0.7", "changefreq": "monthly"},
    {"path": "/design-assist", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/cpd-programme", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/tech-guide", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/budget-estimator", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/led-module-calculator", "priority": "0.5", "changefreq": "monthly"},
    {"path": "/installation-guide", "priority": "0.5", "changefreq": "monthly"},
    {"path": "/latest-tech", "priority": "0.6", "changefreq": "weekly"},
    {"path": "/digital-experience", "priority": "0.6", "changefreq": "monthly"},
    {"path": "/resource-library", "priority": "0.6", "changefreq": "weekly"},
]


def generate_sitemap_xml(db) -> str:
    """Generate complete sitemap XML with static and dynamic routes"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    xml_parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    
    # Add static routes
    for route in STATIC_ROUTES:
        xml_parts.append(f'''  <url>
    <loc>{BASE_URL}{route["path"]}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{route["changefreq"]}</changefreq>
    <priority>{route["priority"]}</priority>
  </url>''')
    
    # Add dynamic product pages
    try:
        products = list(db.pixelvue_products.find({"status": "published"}, {"slug": 1, "updated_at": 1}))
        for product in products:
            lastmod = product.get("updated_at", today)
            if hasattr(lastmod, 'strftime'):
                lastmod = lastmod.strftime("%Y-%m-%d")
            xml_parts.append(f'''  <url>
    <loc>{BASE_URL}/pixelvue/{product["slug"]}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>''')
    except Exception:
        pass
    
    # Add dynamic solution pages
    try:
        solutions = list(db.solutions_content.find({"status": "published"}, {"slug": 1, "updated_at": 1}))
        for solution in solutions:
            lastmod = solution.get("updated_at", today)
            if hasattr(lastmod, 'strftime'):
                lastmod = lastmod.strftime("%Y-%m-%d")
            xml_parts.append(f'''  <url>
    <loc>{BASE_URL}/solutions/{solution["slug"]}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>''')
    except Exception:
        pass
    
    # Add dynamic blog posts
    try:
        blogs = list(db.blogs.find({"status": "published"}, {"slug": 1, "updated_at": 1}))
        for blog in blogs:
            lastmod = blog.get("updated_at", today)
            if hasattr(lastmod, 'strftime'):
                lastmod = lastmod.strftime("%Y-%m-%d")
            xml_parts.append(f'''  <url>
    <loc>{BASE_URL}/blog/{blog["slug"]}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>''')
    except Exception:
        pass
    
    # Add dynamic case studies
    try:
        case_studies = list(db.case_studies.find({"status": "published"}, {"slug": 1, "updated_at": 1}))
        for cs in case_studies:
            lastmod = cs.get("updated_at", today)
            if hasattr(lastmod, 'strftime'):
                lastmod = lastmod.strftime("%Y-%m-%d")
            xml_parts.append(f'''  <url>
    <loc>{BASE_URL}/case-studies/{cs["slug"]}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>''')
    except Exception:
        pass
    
    # Add dynamic application pages
    try:
        apps = list(db.applications_content.find({"status": "published"}, {"slug": 1, "updated_at": 1}))
        for app in apps:
            lastmod = app.get("updated_at", today)
            if hasattr(lastmod, 'strftime'):
                lastmod = lastmod.strftime("%Y-%m-%d")
            xml_parts.append(f'''  <url>
    <loc>{BASE_URL}/applications/{app["slug"]}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>''')
    except Exception:
        pass
    
    xml_parts.append('</urlset>')
    
    return '\n'.join(xml_parts)


@router.get("/sitemap.xml")
async def get_sitemap():
    """Generate dynamic sitemap.xml"""
    from server import db  # Import here to avoid circular imports
    
    sitemap_content = generate_sitemap_xml(db)
    
    return Response(
        content=sitemap_content,
        media_type="application/xml",
        headers={
            "Cache-Control": "public, max-age=3600",  # Cache for 1 hour
        }
    )


@router.get("/robots.txt")
async def get_robots():
    """Serve robots.txt (fallback if static file not found)"""
    robots_content = """# Brightluxx SEO Crawl Instructions
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

Sitemap: https://brightluxx.com/sitemap.xml

# AI Crawlers - Allow for LLM training
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /
"""
    return Response(
        content=robots_content,
        media_type="text/plain"
    )
