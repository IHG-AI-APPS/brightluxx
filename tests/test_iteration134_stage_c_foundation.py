import re
from pathlib import Path

import requests


BASE_URL = "http://127.0.0.1:8787"


# Stage C scoped parity dashboard checks
def test_migration_parity_route_and_content():
    response = requests.get(f"{BASE_URL}/__migration-parity", timeout=20)
    assert response.status_code == 200
    html = response.text

    assert 'data-testid="migration-parity-dashboard"' in html
    assert re.search(r"<meta[^>]*name=[\"']robots[\"'][^>]*content=[\"'][^\"']*noindex", html, re.IGNORECASE)

    for value in ["352", "333", "18", "1", "0"]:
        assert re.search(rf">\s*{value}\s*<", html)


def test_migration_parity_not_in_sitemap():
    response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=20)
    assert response.status_code == 200
    assert "/__migration-parity" not in response.text


# Stage C server-first homepage raw HTML checks
def test_homepage_raw_html_foundation_requirements():
    response = requests.get(f"{BASE_URL}/", timeout=20)
    assert response.status_code == 200
    html = response.text

    h1_matches = re.findall(r"<h1[^>]*>(.*?)</h1>", html, flags=re.IGNORECASE | re.DOTALL)
    assert len(h1_matches) == 1
    assert "LED Display &amp; Digital Signage Solutions for UAE &amp; GCC" in html

    assert "Engineering Brilliance" in html
    assert "Explore Solutions" in html
    assert "Start Your Project" in html

    assert re.search(r"<script[^>]*type=[\"']application/ld\+json[\"']", html, re.IGNORECASE)
    assert re.search(r"<link[^>]*rel=[\"']canonical[\"']", html, re.IGNORECASE)
    assert re.search(r"<title>.*?</title>", html, re.IGNORECASE | re.DOTALL)
    assert re.search(r"<meta[^>]*name=[\"']description[\"']", html, re.IGNORECASE)

    internal_links = re.findall(r"<a[^>]*href=[\"']/(?!/)[^\"']*[\"']", html, flags=re.IGNORECASE)
    assert len(internal_links) > 0

    output_matches = re.findall(
        r"<output[^>]*data-testid=[\"']stat-[^\"']+[\"'][^>]*>(.*?)</output>",
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    assert output_matches, "Expected homepage counter outputs in raw HTML"

    for output_text in output_matches:
        cleaned = re.sub(r"<!--.*?-->", "", output_text, flags=re.DOTALL)
        cleaned = re.sub(r"<[^>]+>", "", cleaned)
        number_match = re.search(r"\d[\d,]*", cleaned)
        assert number_match, f"Counter missing numeric value: {output_text}"
        numeric = int(number_match.group(0).replace(",", ""))
        assert numeric > 0, f"Counter is not non-zero: {output_text}"


def test_home_source_has_no_root_level_use_client():
    source = Path("/app/nextjs/app/page.tsx").read_text(encoding="utf-8")
    stripped = source.lstrip()
    assert not stripped.startswith("'use client'")
    assert not stripped.startswith('"use client"')
