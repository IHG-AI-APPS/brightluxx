"""Sweep: does the INITIAL HTML (Googlebot UA) contain the new JSON-LD for the
31 previously schema-less pages? Purely diagnostic."""
import json
import re
import sys
import requests
from dotenv import dotenv_values

BASE = dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"].rstrip("/")
UA = {"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
LD = re.compile(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', re.S)

PATHS = [
    "/", "/case-studies/jumeirah-al-naseem-lobby", "/applications/retail",
    "/contractors/dvled-vs-lcd", "/latest-tech/microled", "/knowledge/pixel-pitch-guide",
    "/technology/cob-led", "/solutions/retail", "/digital-experience-architecture",
    "/sla-guide", "/products/gamewall-sim-180", "/blog/microled-vs-oled-2025",
    "/supplier-registration", "/technical-support", "/lp/specifier-toolkit",
    "/digital-experience/led-facade",
]

fails = []
for p in PATHS:
    try:
        r = requests.get(BASE + p, headers=UA, timeout=60)
        types, dupes = [], []
        for block in LD.findall(r.text):
            try:
                o = json.loads(block)
            except Exception:
                types.append("INVALID_JSON")
                continue
            for item in (o if isinstance(o, list) else [o]):
                types.append(item.get("@type"))
        dupes = sorted({t for t in types if types.count(t) > 1})
        status = "OK " if types and "INVALID_JSON" not in types else "FAIL"
        if status == "FAIL":
            fails.append(p)
        print(f"{status} {r.status_code} {p:45s} types={types} dupes={dupes}")
    except Exception as e:
        fails.append(p)
        print(f"ERR  {p}: {e}")

print("\nPages with no/invalid ld+json in initial HTML:", fails)
sys.exit(0)
