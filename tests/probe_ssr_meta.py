"""Probe crawler (Googlebot) responses + noscript H1 injection across many routes."""
import re
import requests
from dotenv import dotenv_values

BASE = dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"].rstrip("/")
GBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0 Safari/537.36"

PATHS = [
    "/", "/products", "/solutions", "/technology", "/contact", "/about", "/blog",
    "/faq", "/case-studies", "/projects", "/resources", "/knowledge",
    "/calculator", "/budget-estimator", "/viewing-distance", "/power-estimator",
    "/technology/cob-led", "/technology/microled", "/technology/gob",
    "/solutions/retail", "/solutions/corporate", "/solutions/control-rooms",
    "/indoor-led", "/outdoor-led", "/glassmorph", "/pixelvue", "/lumimorph",
    "/naturatex", "/signatouch", "/art-immersive", "/luxury-home-cinema",
    "/qatar", "/kuwait", "/abu-dhabi", "/saudi-arabia",
    "/led-screen-suppliers-dubai", "/for-architects", "/for-contractors",
    "/factory-tour", "/cpd-programme", "/compare-brands", "/government-solutions",
]

print("=== Googlebot status codes ===")
bot404 = []
for p in PATHS:
    try:
        r = requests.get(BASE + p, headers={"User-Agent": GBOT}, timeout=60)
        if r.status_code != 200:
            bot404.append((p, r.status_code))
            print(f"  {r.status_code}  {p}")
    except Exception as e:
        print(f"  ERR {p}: {e}")
print(f"Googlebot non-200: {len(bot404)}/{len(PATHS)} -> {[p for p,_ in bot404]}")

print("\n=== Browser: title / canonical / X-SSR-Meta ===")
bad = []
for p in PATHS:
    r = requests.get(BASE + p, headers={"User-Agent": CHROME}, timeout=60)
    t = re.search(r"<title>(.*?)</title>", r.text, re.S)
    c = re.search(r'<link rel="canonical" href="([^"]*)"', r.text)
    t = t.group(1).strip() if t else None
    c = c.group(1) if c else None
    hdr = r.headers.get("X-SSR-Meta")
    ok = (t and t != "Brightluxx — Premium LED Display Solutions"
          and c == "https://brightluxx.com" + p and hdr == "injected")
    if not ok:
        bad.append(p)
        print(f"  BAD {p}: status={r.status_code} hdr={hdr} canonical={c} title={t!r}")
print(f"Browser bad: {len(bad)}/{len(PATHS)} -> {bad}")

print("\n=== noscript H1 injection check (lenient regex) ===")
for p in ["/", "/products", "/technology/cob-led", "/calculator"]:
    r = requests.get(BASE + p, headers={"User-Agent": CHROME}, timeout=60)
    m = re.search(r"<noscript>\s*<div>\s*<h1>(.*?)</h1>", r.text, re.S)
    print(f"  {p}: noscript H1 = {m.group(1).strip()[:90] if m else 'NOT FOUND'}")

print("\n=== count of canonical tags per page (duplicates?) ===")
for p in ["/", "/products", "/technology"]:
    r = requests.get(BASE + p, headers={"User-Agent": CHROME}, timeout=60)
    nc = r.text.count('rel="canonical"')
    nt = len(re.findall(r"<title>", r.text))
    nd = r.text.count('name="description"')
    print(f"  {p}: canonical tags={nc}, title tags={nt}, desc tags={nd}")
