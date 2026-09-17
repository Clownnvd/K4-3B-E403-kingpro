import json
import re
from pathlib import Path

SOURCES = json.loads((Path(__file__).parent / "fixtures" / "vlearn_sources.json").read_text(encoding="utf-8"))

def retrieve_options(question: str, limit: int = 3) -> list[dict[str, str]]:
    terms = set(re.findall(r"\w+", question.casefold()))
    ranked = sorted(SOURCES, key=lambda s: len(terms & set(re.findall(r"\w+", (s["title"]+" "+s["text"]).casefold()))), reverse=True)
    return [{"id": s["source_id"], "label": s["title"], "detail": s["text"], "answer": f"Đây là {s['title'].casefold()}.", "source": s["url"]} for s in ranked[:limit]]
