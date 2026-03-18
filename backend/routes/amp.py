"""
AMP (Accelerated Mobile Pages) Generator API
Generates AMP-compliant HTML pages for blogs, products, and case studies
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from datetime import datetime
import html
import re

from database import db

router = APIRouter(tags=["AMP"])

# Database collections
blogs_col = db["blogs"]
products_col = db["products"]
case_studies_col = db["case_studies"]
technologies_col = db["technologies"]

# AMP Boilerplate CSS (required)
AMP_BOILERPLATE = """body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"""

AMP_NOSCRIPT = """body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}"""

# Custom AMP CSS (must be under 75KB)
AMP_CUSTOM_CSS = """
:root {
  --primary: #22d3ee;
  --bg-dark: #050508;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --border-color: rgba(255,255,255,0.1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
header { 
  background: rgba(5,5,8,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo { color: var(--primary); font-weight: bold; font-size: 1.25rem; text-decoration: none; }
.hero { padding: 60px 20px; text-align: center; }
.hero h1 { font-size: 2rem; margin-bottom: 16px; line-height: 1.2; }
.hero p { color: var(--text-secondary); font-size: 1rem; max-width: 600px; margin: 0 auto; }
.badge { 
  display: inline-block;
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.2);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  margin-bottom: 16px;
}
article { padding: 40px 20px; }
article h2 { font-size: 1.5rem; margin: 32px 0 16px; color: var(--text-primary); }
article h3 { font-size: 1.25rem; margin: 24px 0 12px; color: var(--text-primary); }
article p { margin-bottom: 16px; color: var(--text-secondary); }
article ul, article ol { margin: 16px 0 16px 24px; color: var(--text-secondary); }
article li { margin-bottom: 8px; }
article a { color: var(--primary); text-decoration: none; }
article a:hover { text-decoration: underline; }
.image-container { margin: 24px 0; border-radius: 12px; overflow: hidden; }
.meta { display: flex; gap: 16px; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 24px; flex-wrap: wrap; }
.meta-item { display: flex; align-items: center; gap: 6px; }
.specs-table { width: 100%; border-collapse: collapse; margin: 24px 0; }
.specs-table th, .specs-table td { 
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.specs-table th { color: var(--text-secondary); font-weight: 500; font-size: 0.875rem; }
.specs-table td { color: var(--text-primary); }
.cta-section { 
  background: linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(34,211,238,0.05) 100%);
  border: 1px solid rgba(34,211,238,0.2);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  margin: 40px 0;
}
.cta-section h3 { margin-bottom: 12px; }
.cta-section p { margin-bottom: 20px; }
.btn { 
  display: inline-block;
  background: var(--primary);
  color: #000;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}
.btn:hover { background: #06b6d4; text-decoration: none; }
footer { 
  border-top: 1px solid var(--border-color);
  padding: 40px 20px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
.breadcrumb { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 24px; }
.breadcrumb a { color: var(--text-secondary); }
.breadcrumb span { color: var(--primary); }
@media (max-width: 640px) {
  .hero h1 { font-size: 1.5rem; }
  .container { padding: 16px; }
  article { padding: 24px 16px; }
}
"""

def generate_amp_base(title: str, description: str, canonical_url: str, content: str, schema_json: str = "") -> str:
    """Generate base AMP HTML structure"""
    return f'''<!doctype html>
<html amp lang="en">
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>{html.escape(title)} | Brightluxx</title>
    <link rel="canonical" href="{canonical_url}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="{html.escape(description)}">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="https://brightluxx.com/favicon.png">
    <style amp-boilerplate>{AMP_BOILERPLATE}</style>
    <noscript><style amp-boilerplate>{AMP_NOSCRIPT}</style></noscript>
    <style amp-custom>{AMP_CUSTOM_CSS}</style>
    {schema_json}
</head>
<body>
    <header>
        <a href="https://brightluxx.com" class="logo">BRIGHTLUXX</a>
    </header>
    {content}
    <footer>
        <p>&copy; {datetime.now().year} Brightluxx. Premium LED Display Solutions.</p>
        <p style="margin-top:8px;">Dubai, UAE | +971 55 995 4274</p>
        <p style="margin-top:16px;">
            <a href="https://brightluxx.com">Full Site</a> &bull;
            <a href="https://brightluxx.com/contact">Contact</a> &bull;
            <a href="https://brightluxx.com/products">Products</a>
        </p>
    </footer>
</body>
</html>'''


def convert_html_to_amp(html_content: str) -> str:
    """Convert regular HTML to AMP-compliant HTML"""
    # Replace img tags with amp-img
    html_content = re.sub(
        r'<img\s+([^>]*?)src=["\']([^"\']+)["\']([^>]*?)>',
        r'<amp-img \1src="\2"\3 layout="responsive" width="800" height="450"></amp-img>',
        html_content
    )
    # Remove any script tags (not allowed in AMP)
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL)
    # Remove inline styles on elements (move to amp-custom)
    html_content = re.sub(r'\s+style=["\'][^"\']*["\']', '', html_content)
    return html_content


@router.get("/amp-blog/{slug}", response_class=HTMLResponse)
async def get_amp_blog(slug: str):
    """Generate AMP version of a blog post"""
    blog = await blogs_col.find_one({"slug": slug})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    canonical_url = f"https://brightluxx.com/blog/{slug}"
    
    # Schema.org Article markup
    schema = f'''<script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{html.escape(blog.get('title', ''))}",
        "description": "{html.escape(blog.get('excerpt', '')[:160])}",
        "image": "{blog.get('image_url', '')}",
        "author": {{"@type": "Organization", "name": "Brightluxx"}},
        "publisher": {{
            "@type": "Organization",
            "name": "Brightluxx",
            "logo": {{"@type": "ImageObject", "url": "https://brightluxx.com/logo.png"}}
        }},
        "datePublished": "{blog.get('created_at', datetime.now()).isoformat() if blog.get('created_at') else datetime.now().isoformat()}",
        "mainEntityOfPage": "{canonical_url}"
    }}
    </script>'''
    
    # Convert content to AMP-safe
    content_html = convert_html_to_amp(blog.get('content', ''))
    
    # Build page content
    page_content = f'''
    <div class="hero">
        <span class="badge">{html.escape(blog.get('category', 'Industry Insights'))}</span>
        <h1>{html.escape(blog.get('title', ''))}</h1>
        <p>{html.escape(blog.get('excerpt', ''))}</p>
    </div>
    
    <div class="container">
        <nav class="breadcrumb">
            <a href="https://brightluxx.com">Home</a> &gt;
            <a href="https://brightluxx.com/blog">Blog</a> &gt;
            <span>{html.escape(blog.get('title', '')[:40])}...</span>
        </nav>
        
        <div class="meta">
            <span class="meta-item">By {html.escape(blog.get('author', 'Brightluxx Team'))}</span>
            <span class="meta-item">{blog.get('created_at', datetime.now()).strftime('%B %d, %Y') if blog.get('created_at') else ''}</span>
        </div>
        
        {"<div class='image-container'><amp-img src='" + blog.get('image_url') + "' width='800' height='450' layout='responsive' alt='" + html.escape(blog.get('title', '')) + "'></amp-img></div>" if blog.get('image_url') else ""}
        
        <article>
            {content_html}
        </article>
        
        <div class="cta-section">
            <h3>Need LED Display Solutions?</h3>
            <p>Contact our experts for personalized recommendations</p>
            <a href="https://wa.me/971559954274" class="btn">WhatsApp Us</a>
        </div>
    </div>
    '''
    
    return generate_amp_base(
        title=blog.get('title', 'Blog'),
        description=blog.get('excerpt', '')[:160],
        canonical_url=canonical_url,
        content=page_content,
        schema_json=schema
    )


@router.get("/amp-product/{slug}", response_class=HTMLResponse)
async def get_amp_product(slug: str):
    """Generate AMP version of a product page"""
    product = await products_col.find_one({"slug": slug})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    canonical_url = f"https://brightluxx.com/products/{slug}"
    
    # Schema.org Product markup
    schema = f'''<script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "{html.escape(product.get('name', ''))}",
        "description": "{html.escape(product.get('tagline', '')[:160])}",
        "image": "{product.get('image_url', '')}",
        "brand": {{"@type": "Brand", "name": "Brightluxx"}},
        "manufacturer": {{"@type": "Organization", "name": "Brightluxx"}},
        "sku": "{product.get('product_code', '')}",
        "category": "{product.get('category', 'LED Display')}",
        "offers": {{
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "AED",
            "seller": {{"@type": "Organization", "name": "Brightluxx"}}
        }}
    }}
    </script>'''
    
    # Build specs table
    specs_html = ""
    specs = [
        ("Pixel Pitch", product.get('pixel_pitch', '-')),
        ("Brightness", product.get('brightness', '-')),
        ("Refresh Rate", product.get('refresh_rate', '-')),
        ("Viewing Angle", product.get('viewing_angle', '-')),
        ("Protection", product.get('protection_rating', '-')),
        ("Lifespan", product.get('lifespan', '-')),
    ]
    if any(v != '-' for _, v in specs):
        specs_html = '<table class="specs-table"><tbody>'
        for label, value in specs:
            if value and value != '-':
                specs_html += f'<tr><th>{label}</th><td>{html.escape(str(value))}</td></tr>'
        specs_html += '</tbody></table>'
    
    # Build features list
    features_html = ""
    features = product.get('features', [])
    if features:
        features_html = '<ul>'
        for feature in features[:8]:
            features_html += f'<li>{html.escape(feature)}</li>'
        features_html += '</ul>'
    
    page_content = f'''
    <div class="hero">
        <span class="badge">{html.escape(product.get('category', 'LED Display'))}</span>
        <h1>{html.escape(product.get('name', ''))}</h1>
        <p>{html.escape(product.get('tagline', ''))}</p>
    </div>
    
    <div class="container">
        <nav class="breadcrumb">
            <a href="https://brightluxx.com">Home</a> &gt;
            <a href="https://brightluxx.com/products">Products</a> &gt;
            <span>{html.escape(product.get('name', '')[:30])}</span>
        </nav>
        
        {"<div class='image-container'><amp-img src='" + product.get('image_url') + "' width='800' height='500' layout='responsive' alt='" + html.escape(product.get('name', '')) + " LED display Brightluxx'></amp-img></div>" if product.get('image_url') else ""}
        
        <article>
            <h2>Overview</h2>
            <p>{html.escape(product.get('description', ''))}</p>
            
            {"<h2>Key Features</h2>" + features_html if features_html else ""}
            
            {"<h2>Specifications</h2>" + specs_html if specs_html else ""}
            
            <h2>Applications</h2>
            <p>This LED display is ideal for {html.escape(product.get('category', 'various').lower())} applications including corporate lobbies, retail environments, hospitality venues, and more.</p>
        </article>
        
        <div class="cta-section">
            <h3>Get a Quote</h3>
            <p>Contact us for pricing and availability in UAE & GCC</p>
            <a href="https://wa.me/971559954274?text=Hi, I'm interested in {html.escape(product.get('name', 'this product'))}" class="btn">Request Quote</a>
        </div>
    </div>
    '''
    
    return generate_amp_base(
        title=f"{product.get('name', 'Product')} | LED Display Dubai",
        description=f"{product.get('tagline', '')} Available from Brightluxx Dubai.",
        canonical_url=canonical_url,
        content=page_content,
        schema_json=schema
    )


@router.get("/amp-case-study/{slug}", response_class=HTMLResponse)
async def get_amp_case_study(slug: str):
    """Generate AMP version of a case study"""
    case_study = await case_studies_col.find_one({"slug": slug})
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    canonical_url = f"https://brightluxx.com/case-studies/{slug}"
    
    # Schema.org Article markup
    schema = f'''<script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{html.escape(case_study.get('title', ''))}",
        "description": "{html.escape(case_study.get('challenge', '')[:160])}",
        "image": "{case_study.get('hero_image', '')}",
        "author": {{"@type": "Organization", "name": "Brightluxx"}},
        "publisher": {{
            "@type": "Organization",
            "name": "Brightluxx"
        }},
        "about": {{"@type": "Thing", "name": "{case_study.get('technology', 'LED Display')}"}},
        "locationCreated": {{
            "@type": "Place",
            "name": "{html.escape(case_study.get('location', 'UAE'))}"
        }}
    }}
    </script>'''
    
    page_content = f'''
    <div class="hero">
        <span class="badge">{html.escape(case_study.get('category', 'Case Study'))}</span>
        <h1>{html.escape(case_study.get('title', ''))}</h1>
        <p>{html.escape(case_study.get('location', ''))} | {html.escape(case_study.get('technology', ''))}</p>
    </div>
    
    <div class="container">
        <nav class="breadcrumb">
            <a href="https://brightluxx.com">Home</a> &gt;
            <a href="https://brightluxx.com/case-studies">Case Studies</a> &gt;
            <span>{html.escape(case_study.get('title', '')[:30])}</span>
        </nav>
        
        {"<div class='image-container'><amp-img src='" + case_study.get('hero_image') + "' width='800' height='450' layout='responsive' alt='" + html.escape(case_study.get('title', '')) + " LED project'></amp-img></div>" if case_study.get('hero_image') else ""}
        
        <article>
            <h2>The Challenge</h2>
            <p>{html.escape(case_study.get('challenge', ''))}</p>
            
            <h2>Our Solution</h2>
            <p>{html.escape(case_study.get('solution', ''))}</p>
            
            <h2>The Result</h2>
            <p>{html.escape(case_study.get('result', ''))}</p>
            
            <table class="specs-table">
                <tbody>
                    <tr><th>Client</th><td>{html.escape(case_study.get('client', '-'))}</td></tr>
                    <tr><th>Location</th><td>{html.escape(case_study.get('location', '-'))}</td></tr>
                    <tr><th>Technology</th><td>{html.escape(case_study.get('technology', '-'))}</td></tr>
                    <tr><th>Year</th><td>{case_study.get('year', '-')}</td></tr>
                </tbody>
            </table>
        </article>
        
        <div class="cta-section">
            <h3>Start Your Project</h3>
            <p>Let us help you achieve similar results</p>
            <a href="https://wa.me/971559954274?text=Hi, I saw the {html.escape(case_study.get('title', ''))} project and would like to discuss my requirements" class="btn">Discuss Your Project</a>
        </div>
    </div>
    '''
    
    return generate_amp_base(
        title=f"{case_study.get('title', 'Case Study')} | LED Project",
        description=case_study.get('challenge', '')[:160],
        canonical_url=canonical_url,
        content=page_content,
        schema_json=schema
    )


@router.get("/amp-technology/{tech_id}", response_class=HTMLResponse)
async def get_amp_technology(tech_id: str):
    """Generate AMP version of a technology page"""
    tech = await technologies_col.find_one({"slug": tech_id})
    if not tech:
        # Try static data
        tech = get_static_technology(tech_id)
    
    if not tech:
        raise HTTPException(status_code=404, detail="Technology not found")
    
    canonical_url = f"https://brightluxx.com/technology/{tech_id}"
    
    title = tech.get('title', tech.get('name', tech_id.replace('-', ' ').title()))
    description = tech.get('description', tech.get('heroDesc', ''))[:160]
    
    page_content = f'''
    <div class="hero">
        <span class="badge">LED Technology</span>
        <h1>{html.escape(title)}</h1>
        <p>{html.escape(description)}</p>
    </div>
    
    <div class="container">
        <nav class="breadcrumb">
            <a href="https://brightluxx.com">Home</a> &gt;
            <a href="https://brightluxx.com/technology">Technology</a> &gt;
            <span>{html.escape(title[:30])}</span>
        </nav>
        
        <article>
            <h2>What is {html.escape(title)}?</h2>
            <p>{html.escape(tech.get('longDescription', description))}</p>
            
            <h2>Key Benefits</h2>
            <ul>
                <li>Superior image quality and color accuracy</li>
                <li>Extended lifespan and reliability</li>
                <li>Energy efficient operation</li>
                <li>Wide viewing angles</li>
                <li>Professional-grade performance</li>
            </ul>
            
            <h2>Ideal Applications</h2>
            <p>This technology is ideal for corporate environments, control rooms, broadcast studios, retail displays, and high-end installations requiring premium visual performance.</p>
        </article>
        
        <div class="cta-section">
            <h3>Learn More</h3>
            <p>Speak with our technology experts</p>
            <a href="https://wa.me/971559954274?text=Hi, I'd like to learn more about {html.escape(title)} technology" class="btn">Contact Expert</a>
        </div>
    </div>
    '''
    
    return generate_amp_base(
        title=f"{title} | LED Technology Guide",
        description=description,
        canonical_url=canonical_url,
        content=page_content
    )


def get_static_technology(tech_id: str):
    """Get static technology data for common technologies"""
    technologies = {
        "microled": {
            "title": "MicroLED Technology",
            "description": "Next-generation display technology with microscopic LEDs for superior brightness, contrast, and color accuracy.",
            "longDescription": "MicroLED represents the pinnacle of LED display technology, utilizing microscopic LED chips to deliver unprecedented image quality. With self-emissive pixels, MicroLED displays offer perfect blacks, infinite contrast ratios, and exceptional color accuracy without the burn-in risks associated with OLED technology."
        },
        "cob-led": {
            "title": "COB LED Technology",
            "description": "Chip-on-Board LED technology for seamless, reliable displays with enhanced durability and visual quality.",
            "longDescription": "COB (Chip-on-Board) LED technology bonds LED chips directly to the PCB substrate, eliminating the traditional SMD packaging. This results in improved heat dissipation, better protection against physical damage, and a more seamless visual appearance with reduced moiré effects."
        },
        "transparent-led": {
            "title": "Transparent LED Technology",
            "description": "See-through LED displays that maintain visibility while delivering dynamic visual content.",
            "longDescription": "Transparent LED technology allows light to pass through the display while showing vibrant content. With transparency rates up to 95%, these displays are perfect for storefronts, glass facades, and architectural installations where maintaining the view is essential."
        },
        "fine-pitch": {
            "title": "Fine Pitch LED Technology",
            "description": "High-resolution LED displays with pixel pitches below 2.5mm for close viewing distance applications.",
            "longDescription": "Fine pitch LED displays feature pixel pitches ranging from 0.7mm to 2.5mm, enabling high-resolution visuals suitable for close viewing distances. These displays are ideal for control rooms, broadcast studios, corporate boardrooms, and any application requiring crisp, detailed imagery."
        }
    }
    return technologies.get(tech_id)
