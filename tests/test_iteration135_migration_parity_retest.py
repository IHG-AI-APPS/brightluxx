import re

import requests


BASE_URL = "http://127.0.0.1:8787"


# Migration parity route boundary checks
def test_migration_parity_route_returns_200_with_expected_dashboard_content():
    response = requests.get(f"{BASE_URL}/__migration-parity", timeout=20)
    assert response.status_code == 200

    html = response.text
    assert 'data-testid="migration-parity-dashboard"' in html
    assert re.search(r"<meta[^>]*name=[\"']robots[\"'][^>]*content=[\"'][^\"']*noindex", html, re.IGNORECASE)

    required_pairs = [
        ("352", "Baseline routes"),
        ("333", "Canonical routes"),
        ("18", "Native redirects"),
        ("1", "Native 410"),
        ("0", "Unexplained"),
    ]
    for count, label in required_pairs:
        assert re.search(rf"<strong>\s*{re.escape(count)}\s*</strong>\s*<span>\s*{re.escape(label)}\s*</span>", html, re.IGNORECASE)


# Robots and sitemap visibility boundaries
def test_migration_parity_disallowed_and_excluded_from_sitemap():
    robots_response = requests.get(f"{BASE_URL}/robots.txt", timeout=20)
    assert robots_response.status_code == 200
    assert "Disallow: /__migration-parity" in robots_response.text

    sitemap_response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=20)
    assert sitemap_response.status_code == 200
    assert "/__migration-parity" not in sitemap_response.text


# Homepage raw HTML Stage C regression checks
def test_homepage_raw_html_stage_c_h1_and_hero_ctas_still_present():
    response = requests.get(f"{BASE_URL}/", timeout=20)
    assert response.status_code == 200

    html = response.text
    h1_matches = re.findall(r"<h1[^>]*>(.*?)</h1>", html, flags=re.IGNORECASE | re.DOTALL)
    assert len(h1_matches) == 1
    assert "LED Display &amp; Digital Signage Solutions for UAE &amp; GCC" in html

    assert 'data-testid="home-hero-primary-cta"' in html
    assert 'data-testid="home-hero-secondary-cta"' in html
