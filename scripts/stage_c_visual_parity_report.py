import json
from pathlib import Path

import numpy as np
from PIL import Image


SCREENSHOT_DIR = Path("/app/migration-baseline/screenshots")
REPORT_PATH = Path("/app/migration-baseline/stage-c-visual-parity-report.json")
VIEWPORTS = [1440, 1024, 768, 430, 390, 360]


def region_diff_percent(a: np.ndarray, b: np.ndarray, box: tuple[int, int, int, int]) -> float:
    x1, y1, x2, y2 = box
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(a.shape[1], x2)
    y2 = min(a.shape[0], y2)
    if x2 <= x1 or y2 <= y1:
        return 0.0
    reg_a = a[y1:y2, x1:x2]
    reg_b = b[y1:y2, x1:x2]
    return float(np.mean(np.abs(reg_a.astype(np.float32) - reg_b.astype(np.float32))) / 255.0 * 100.0)


def classify(overall: float, header: float, hero: float, cta: float, fixed_controls: float, mobile: float) -> str:
    max_reg = max(header, hero, cta, fixed_controls, mobile)
    if overall >= 14.0 or max_reg >= 18.0:
        return "P0"
    if overall >= 6.0 or max_reg >= 8.0:
        return "P1"
    return "P2"


def finding(label: str, score: float, low: float, high: float, ok: str, warn: str, severe: str) -> str:
    if score >= high:
        return f"{label}: {severe}"
    if score >= low:
        return f"{label}: {warn}"
    return f"{label}: {ok}"


def main() -> None:
    per_viewport = []
    blocked = []

    for width in VIEWPORTS:
        cra_path = SCREENSHOT_DIR / f"stage-c-cra-{width}.png"
        next_path = SCREENSHOT_DIR / f"stage-c-next-{width}.png"

        if not cra_path.exists() or not next_path.exists():
            blocked.append(
                {
                    "viewport": width,
                    "issue": "Missing screenshot pair",
                    "cra_exists": cra_path.exists(),
                    "next_exists": next_path.exists(),
                }
            )
            continue

        cra = Image.open(cra_path).convert("RGB")
        nxt = Image.open(next_path).convert("RGB")

        if cra.size != nxt.size:
            nxt = nxt.resize(cra.size, Image.Resampling.BILINEAR)

        a = np.array(cra)
        b = np.array(nxt)
        h, w = a.shape[0], a.shape[1]

        overall = float(np.mean(np.abs(a.astype(np.float32) - b.astype(np.float32))) / 255.0 * 100.0)
        header = region_diff_percent(a, b, (0, 0, w, min(110, h)))
        hero = region_diff_percent(a, b, (0, min(110, h), w, min(640, h)))
        cta = region_diff_percent(a, b, (int(w * 0.1), min(500, h), int(w * 0.9), h))
        fixed_controls = region_diff_percent(a, b, (max(w - 180, 0), max(h - 260, 0), w, h))
        mobile_layout = region_diff_percent(a, b, (0, max(h - 170, 0), w, h)) if w <= 430 else 0.0

        label = classify(overall, header, hero, cta, fixed_controls, mobile_layout)

        findings = {
            "header_navigation": finding(
                "Header/nav",
                header,
                5.0,
                9.0,
                "near-match.",
                "noticeable control/spacing mismatch.",
                "major structural mismatch (menu/actions differ).",
            ),
            "hero_media_typography": finding(
                "Hero media/typography",
                hero,
                6.0,
                10.0,
                "near-match crop and type rhythm.",
                "visible text-wrap/background-crop differences.",
                "major hero composition divergence.",
            ),
            "cta_placement": finding(
                "CTA placement",
                cta,
                6.0,
                10.0,
                "CTA grouping aligns.",
                "CTA spacing/positioning differs.",
                "CTA location/state materially differs.",
            ),
            "fixed_controls": finding(
                "Fixed controls",
                fixed_controls,
                5.0,
                9.0,
                "fixed controls align.",
                "floating controls differ.",
                "fixed utility controls are structurally different.",
            ),
            "mobile_layout": finding(
                "Mobile layout",
                mobile_layout,
                5.0,
                9.0,
                "mobile stacking aligns.",
                "stacking/footer-nav differs.",
                "major mobile navigation/layout mismatch.",
            ) if w <= 430 else "Mobile layout: not applicable for desktop/tablet widths.",
        }

        per_viewport.append(
            {
                "viewport": {"width": width, "height": h},
                "classification": label,
                "metrics": {
                    "overall_diff_percent": round(overall, 2),
                    "header_navigation_diff_percent": round(header, 2),
                    "hero_media_typography_diff_percent": round(hero, 2),
                    "cta_placement_diff_percent": round(cta, 2),
                    "fixed_controls_diff_percent": round(fixed_controls, 2),
                    "mobile_layout_diff_percent": round(mobile_layout, 2),
                },
                "findings": findings,
                "evidence": {
                    "cra": str(cra_path),
                    "next": str(next_path),
                },
            }
        )

    if blocked:
        result = "BLOCKED"
    else:
        result = "PASS" if all(v["classification"] == "P2" for v in per_viewport) else "FAIL"

    report = {
        "stage": "C",
        "status": result,
        "rule": "Visual parity PASS only when every viewport is classified P2 (no P0/P1).",
        "blocked_reason": "Could not persist required screenshot artifacts due infrastructure constraints."
        if blocked
        else "",
        "viewports": per_viewport,
        "blocked_viewports": blocked,
    }

    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Wrote report: {REPORT_PATH}")
    print(f"Status: {result}")


if __name__ == "__main__":
    main()
