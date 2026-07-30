import re
from pathlib import Path

SRC = Path("/app/frontend/src")
map_re = re.compile(r"\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)\s*(?:,\s*([A-Za-z_$][\w$]*)\s*)?\)?\s*=>")
key_re = re.compile(r"key=\{([A-Za-z_$][\w$]*)")

issues = []
for f in SRC.rglob("*.js"):
    lines = f.read_text(encoding="utf-8").splitlines()
    current = None
    depth_line = -1
    for idx, line in enumerate(lines):
        m = map_re.search(line)
        if m:
            current = [v for v in m.groups() if v]
            depth_line = idx
        k = key_re.search(line)
        if k and current and 0 <= idx - depth_line <= 4:
            var = k.group(1)
            if var not in current and var not in ("index", "i", "idx"):
                issues.append(f"{f}:{idx+1}: key={{{var}}} but map vars {current}")
for i in issues:
    print(i)
print(f"TOTAL POTENTIAL MISMATCHES: {len(issues)}")
