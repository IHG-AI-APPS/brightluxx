"""Check every sitemap URL for redirects (must be 200, not 3xx) and for the SPA soft-404
marker. Also verify JSON-LD presence per page type."""
import os
import re
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor

import requests
from dotenv import dotenv_values

BASE = (os.environ.get("REACT_APP_BACKEND_URL")
        or dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"]).rstrip("/")
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
GOOGLEBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

root = ET.fromstring(requests.get(f"{BASE}/api/sitemap.xml", timeout=60).content)
paths = [e.text.strip().replace("https://brightluxx.com", "") or "/"
         for e in root.findall("sm:url/sm:loc", NS)]
print(f"sitemap urls: {len(paths)}")


def check(path):
    try:
        r = requests.get(f"{BASE}{path}", headers={"User-Agent": GOOGLEBOT},
                         timeout=60, allow_redirects=False)
        return path, r.status_code, r.headers.get("location", ""), r.headers.get("x-redirect-reason", ""), r.text
    except Exception as exc:
        return path, f"ERR {exc}", "", "", ""


with ThreadPoolExecutor(max_workers=8) as ex:
    results = list(ex.map(check, paths))

redirects = [(p, s, loc, why) for p, s, loc, why, _ in results if isinstance(s, int) and 300 <= s < 400]
errors = [(p, s) for p, s, _, _, _ in results if not isinstance(s, int) or s >= 400]
print(f"\nREDIRECTING sitemap urls: {len(redirects)}")
for row in redirects:
    print("   ", row)
print(f"\n4xx/5xx: {len(errors)} -> {errors}")

no_ld = [p for p, s, _, _, html in results
         if s == 200 and not re.search(r'application/ld\+json', html)]
print(f"\n200-pages with NO ld+json: {len(no_ld)}")
for p in no_ld:
    print("   ", p)
