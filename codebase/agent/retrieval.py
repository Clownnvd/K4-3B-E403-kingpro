import json
import re
from pathlib import Path

SOURCES = json.loads((Path(__file__).parent / "fixtures" / "vlearn_sources.json").read_text(encoding="utf-8"))
STOPWORDS = {"cần", "gì", "là", "có", "cho", "tôi", "trong", "và", "ở", "đâu", "thế", "nào", "ngay", "một"}

def _score(source: dict[str, str], terms: set[str]) -> int:
    id_terms = set(re.findall(r"\w+", source["source_id"].casefold()))
    title_terms = set(re.findall(r"\w+", source["title"].casefold()))
    body_terms = set(re.findall(r"\w+", source["text"].casefold()))
    url_bonus = 20 if "link" in terms and source.get("url") else 0
    return url_bonus + 10 * len(terms & id_terms) + 3 * len(terms & title_terms) + len(terms & body_terms)

def retrieve_options(question: str, limit: int = 3) -> list[dict[str, str]]:
    terms = set(re.findall(r"\w+", question.casefold()))
    candidates = [source for source in SOURCES if source.get("url")] if "link" in terms else SOURCES
    ranked = sorted(candidates, key=lambda s: _score(s, terms), reverse=True)
    return [{"id": s["source_id"], "label": s["title"], "detail": s["text"], "answer": f"Đây là {s['title'].casefold()}.", "source": s["url"]} for s in ranked if _score(s, terms) > 0][:limit]

def retrieve_chunks(question: str, limit: int = 3) -> list[dict[str, str]]:
    terms = set(re.findall(r"\w+", question.casefold())) - STOPWORDS
    ranked = sorted(SOURCES, key=lambda s: _score(s, terms), reverse=True)
    return [source for source in ranked if _score(source, terms) >= 3][:limit]
