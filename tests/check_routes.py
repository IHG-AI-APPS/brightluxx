import re, os, json, pathlib
app = open('/app/frontend/src/App.js').read()
routes = re.findall(r'<Route path="([^"]+)"', app)
static = [r for r in routes if ':' not in r and '*' not in r and not r.startswith('/admin')]
build = pathlib.Path('/app/frontend/build')
srv = open('/app/frontend/prerender-server.js').read()
known = set(re.findall(r'"(/[^"]*)"', srv.split('KNOWN_ROUTES = new Set([')[1].split('])')[0]))
patterns = [re.compile(p) for p in re.findall(r'/\^(\\/[^/]+)\$/', srv)]
missing = []
for r in static:
    if r == '/':
        continue
    prerendered = (build / r.lstrip('/') / 'index.html').exists()
    inknown = r in known
    if not prerendered and not inknown:
        missing.append(r)
print("Total static routes:", len(static))
print("Routes neither prerendered nor in KNOWN_ROUTES (likely hard 404):")
for m in missing:
    print("  ", m)
