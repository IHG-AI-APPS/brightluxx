"""Cleanup QA-created reviews from iteration 123 testing."""
import requests
from dotenv import dotenv_values

BASE = dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"].rstrip("/")
s = requests.Session()
r = s.post(f"{BASE}/api/admin/login", json={"email": "admin@brightluxx.com", "password": "brightluxx2025"}, timeout=45)
print("login", r.status_code)
tok = r.json().get("access_token") or r.json().get("token")
if tok:
    s.headers.update({"Authorization": f"Bearer {tok}"})
d = s.get(f"{BASE}/api/admin/reviews", params={"limit": 200}, timeout=45).json()
print("stats before:", d["stats"], "total:", d["total"])
for rv in d["reviews"]:
    em = str(rv.get("email", "")).lower()
    nm = str(rv.get("name", ""))
    if "test_" in em or "qa.playwright" in em or nm.startswith("TEST_") or nm == "QA Playwright":
        resp = s.delete(f"{BASE}/api/admin/reviews/{rv['id']}", timeout=45)
        print("deleted", rv["id"], em, resp.status_code)
d = s.get(f"{BASE}/api/admin/reviews", params={"limit": 200}, timeout=45).json()
print("stats after:", d["stats"], "remaining:", [(x["name"], x["status"]) for x in d["reviews"]])
requests.post(f"{BASE}/api/ssr/meta/clear-cache", timeout=45)
