import re

import requests


BASE_URL = "http://127.0.0.1:8787"


# Stage C raw HTML acceptance checks for homepage SSR contract
def test_homepage_meta_h1_and_structured_data():
    response = requests.get(f"{BASE_URL}/", timeout=20)
    assert response.status_code == 200
    html = response.text

    h1_matches = re.findall(r"<h1[^>]*>.*?</h1>", html, flags=re.IGNORECASE | re.DOTALL)
    assert len(h1_matches) == 1

    assert re.search(r"<title>[^<]+</title>", html, re.IGNORECASE)
    assert re.search(r"<meta[^>]*name=[\"']description[\"'][^>]*content=[\"'][^\"']+[\"']", html, re.IGNORECASE)
    assert re.search(r"<link[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']https?://[^\"']+[\"']", html, re.IGNORECASE)
    assert re.search(r"<script[^>]*type=[\"']application/ld\+json[\"']", html, re.IGNORECASE)


# Stage C homepage counters and body copy checks
def test_homepage_non_zero_stats_and_key_copy():
    response = requests.get(f"{BASE_URL}/", timeout=20)
    assert response.status_code == 200
    html = response.text

    output_matches = re.findall(
        r"<output[^>]*data-testid=[\"']stat-[^\"']+[\"'][^>]*>(.*?)</output>",
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    assert len(output_matches) == 4

    for output_text in output_matches:
        cleaned = re.sub(r"<!--.*?-->", "", output_text, flags=re.DOTALL)
        cleaned = re.sub(r"<[^>]+>", "", cleaned)
        number_match = re.search(r"\d[\d,]*", cleaned)
        assert number_match
        numeric = int(number_match.group(0).replace(",", ""))
        assert numeric > 0

    # Required Stage C homepage sections copy
    assert "Featured installations" in html
    assert "Technology first. Brightluxx family second." in html
    assert "Latest technical insights" in html


# Stage C crawlability checks for internal homepage links
def test_homepage_has_crawlable_internal_links_for_required_flows():
    response = requests.get(f"{BASE_URL}/", timeout=20)
    assert response.status_code == 200
    html = response.text

    required_hrefs = [
        "/solutions",
        "/contact",
        "/projects",
        "/for-architects",
        "/signage-solutions",
        "/resources",
        "/showroom",
    ]
    for href in required_hrefs:
        assert re.search(rf"<a[^>]*href=[\"']{re.escape(href)}[\"']", html, re.IGNORECASE)
