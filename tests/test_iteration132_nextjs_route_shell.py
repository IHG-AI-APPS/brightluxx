"""Iteration 132: Stage A/B Next.js migration scoped verification for route reconciliation and shell."""

import os
import re
import subprocess

import pytest
import requests


# Route reconciliation + OpenNext preview checks
BASE_URL = os.environ["NEXT_PREVIEW_URL"].rstrip("/")

REDIRECTS = [
    ("/our-works", "/projects"),
    ("/digital-solutions", "/solutions"),
    ("/products/led-display", "/products"),
    ("/products/indoor-led-display", "/indoor-led"),
    ("/products/outdoor-led-display", "/outdoor-led"),
    ("/products/spherical-led-display", "/products"),
    ("/products/transparent-led-display", "/glassmorph"),
    ("/products/rental-led-display", "/products"),
    ("/products/flexible-led-display", "/products"),
    ("/download-catalog", "/products"),
    ("/about-us", "/about"),
    ("/contact-us", "/contact"),
    ("/portfolio", "/projects"),
    ("/gallery", "/projects"),
    ("/led-screen-dubai", "/led-screen-suppliers-dubai"),
    ("/led-display-abu-dhabi", "/abu-dhabi"),
    ("/led-screen-saudi-arabia", "/saudi-arabia"),
    ("/led-screen-qatar", "/qatar"),
]

PREVIEW_200_PATHS = ["/", "/products", "/products/bl-cob060", "/sitemap.xml", "/robots.txt", "/llms.txt"]


@pytest.fixture(scope="module")
def http_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({"User-Agent": "iteration132-nextjs-test"})
    return session


def _extract_count(stdout: str, label: str) -> int:
    match = re.search(rf"{re.escape(label)}:\s*\*\*(\d+)\*\*", stdout)
    assert match, f"Could not find count for '{label}' in reconcile output"
    return int(match.group(1))


def test_reconcile_routes_script_outputs_expected_totals() -> None:
    proc = subprocess.run(
        ["node", "/app/nextjs/scripts/reconcile-routes.js"],
        check=False,
        capture_output=True,
        text=True,
        timeout=60,
    )
    assert proc.returncode == 0, proc.stderr

    out = proc.stdout
    baseline = _extract_count(out, "Baseline routes")
    canonical = _extract_count(out, "Canonical Next.js 200 routes")
    redirects = _extract_count(out, "Native redirects")
    tombstones = _extract_count(out, "Native tombstones")
    gap = _extract_count(out, "Unexplained route gap")

    assert baseline == 352
    assert canonical == 333
    assert redirects == 18
    assert tombstones == 1
    assert gap == 0
    assert canonical + redirects + tombstones == baseline


@pytest.mark.parametrize("path", PREVIEW_200_PATHS)
def test_preview_required_routes_return_200(http_session: requests.Session, path: str) -> None:
    response = http_session.get(f"{BASE_URL}{path}", allow_redirects=False, timeout=20)
    assert response.status_code == 200, f"{path} returned {response.status_code}"


@pytest.mark.parametrize("source, target", REDIRECTS)
def test_legacy_routes_return_308_with_expected_location(
    http_session: requests.Session, source: str, target: str
) -> None:
    response = http_session.get(f"{BASE_URL}{source}", allow_redirects=False, timeout=20)
    assert response.status_code == 308, f"{source} returned {response.status_code}"

    location = response.headers.get("location", "")
    assert location, f"{source} missing Location header"
    assert location.endswith(target), f"{source} redirected to '{location}', expected '{target}'"


def test_tombstone_route_returns_410(http_session: requests.Session) -> None:
    response = http_session.get(f"{BASE_URL}/products/hjdba", allow_redirects=False, timeout=20)
    assert response.status_code == 410


def test_unknown_route_returns_404(http_session: requests.Session) -> None:
    response = http_session.get(f"{BASE_URL}/__iteration132_unknown_route__", allow_redirects=False, timeout=20)
    assert response.status_code == 404
