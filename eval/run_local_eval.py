from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "codebase" / "agent"))
from router import classify_ambiguity  # noqa: E402


cases = json.loads((ROOT / "eval" / "golden-set.json").read_text(encoding="utf-8"))
results = []
for case in cases:
    decision = classify_ambiguity(case["input"], "Bài 16 · Mini Hackathon")
    passed = decision["route"] == case["expected"]
    results.append({**case, "actual": decision["route"], "pass": passed, "reason": decision["reason"]})

passed = sum(item["pass"] for item in results)
report = {
    "router": "local-vlearn-router-v1",
    "external_api_used": False,
    "quality_bar": ">=90% routing accuracy; G01, G05, G07, G08 must all pass",
    "passed": passed,
    "total": len(results),
    "accuracy": passed / len(results),
    "hard_cases_pass": all(next(item for item in results if item["id"] == case_id)["pass"] for case_id in ["G01", "G05", "G07", "G08"]),
    "results": results,
}
(ROOT / "eval" / "cp3-results.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({key: report[key] for key in ["passed", "total", "accuracy", "hard_cases_pass"]}, ensure_ascii=False, indent=2))
