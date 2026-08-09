"""Sweep all sitemap URLs for reachability (browser + Googlebot UA) and check that
Product/FAQPage JSON-LD is actually present in the served HTML for rich snippets."""
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
CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

root = ET.fromstring(requests.get(f"{BASE}/api/sitemap.xml", timeout=60).content)
paths = [e.text.strip().replace("https://brightluxx.com", "") or "/"
         for e in root.findall("sm:url/sm:loc", NS)]
print(f"sitemap urls: {len(paths)}")


def check(args):
    path, ua = args
    try:
        r = requests.get(f"{BASE}{path}", headers={"User-Agent": ua}, timeout=60)
        return path, ua, r.status_code, r.text
    except Exception as exc:
        return path, ua, f"ERR {exc}", ""


for label, ua in (("googlebot", GOOGLEBOT), ("chrome", CHROME)):
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(check, [(p, ua) for p in paths]))
    bad = [(p, s) for p, _, s, _ in results if s != 200]
    print(f"\n[{label}] non-200: {len(bad)}/{len(paths)}")
    for p, s in bad[:40]:
        print("   ", s, p)

    if label == "googlebot":
        # JSON-LD presence in HTML for product + blog pages
        no_ld, no_product, no_faq = [], [], []
        for p, _, s, html in results:
            if s != 200:
                continue
            blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S)
            joined = " ".join(blocks)
            if not blocks:
                no_ld.append(p)
                continue
            if p.startswith("/products/") and '"Product"' not in joined:
                no_product.append(p)
            if (p.startswith("/products/") or p.startswith("/blog/")) and '"FAQPage"' not in joined:
                no_faq.append(p)
        print(f"[googlebot HTML] pages with NO ld+json: {len(no_ld)} -> {no_ld[:15]}")
        print(f"[googlebot HTML] product pages missing Product schema: {len(no_product)} -> {no_product[:15]}")
        print(f"[googlebot HTML] product/blog pages missing FAQPage schema: {len(no_faq)} -> {no_faq[:15]}")
