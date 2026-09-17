from __future__ import annotations

import argparse
import csv
import json
import statistics
from pathlib import Path


CASE_IDS = [
    "T10506",
    "T12701",
    "T13263",
    "T10345",
    "T10604",
    "T10639",
    "T11100",
    "T11228",
    "T11574",
    "T11578",
    "T11582",
    "T11653",
    "T11499",
]


def as_bool(value: str) -> bool:
    return value.strip().casefold() == "true"


def mine(input_path: Path) -> dict:
    with input_path.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    k4 = [row for row in rows if row["cohort_hint"] == "K4"]
    free_text = [row for row in k4 if not as_bool(row["is_preset"])]
    no_citation = [row for row in free_text if not as_bool(row["has_citation"])]
    probing = [row for row in k4 if row["move_used"] == "ask_probing_question"]
    # Heuristic only: candidates for manual review, not automatic failure labels.
    ambiguous_candidates = [
        row
        for row in free_text
        if int(row["q_len"] or 0) <= 55
        and row["move_used"] != "ask_probing_question"
        and int(row["reply_len"] or 0) >= 250
    ]
    ratings = [row for row in k4 if row["rating"] in {"up", "down"}]
    reply_lengths = [int(row["reply_len"]) for row in k4 if row["reply_len"]]
    by_id = {row["turn_id"]: row for row in k4}

    return {
        "source": {
            "file": input_path.name,
            "snapshot_from_data_dictionary": "2026-09-15",
            "scope": "cohort_hint=K4",
        },
        "method": {
            "free_text_filter": "is_preset=False",
            "missing_citation_filter": "has_citation=False",
            "probing_filter": "move_used=ask_probing_question",
            "ambiguous_candidate_heuristic": (
                "is_preset=False AND q_len<=55 AND "
                "move_used!=ask_probing_question AND reply_len>=250; "
                "manual review required"
            ),
        },
        "metrics": {
            "k4_turns": len(k4),
            "k4_free_text_turns": len(free_text),
            "k4_free_text_without_citation": len(no_citation),
            "k4_free_text_without_citation_rate": round(
                len(no_citation) / max(1, len(free_text)), 4
            ),
            "k4_probing_turns": len(probing),
            "k4_probing_rate": round(len(probing) / max(1, len(k4)), 4),
            "k4_short_ambiguous_candidates": len(ambiguous_candidates),
            "k4_reply_length_median": int(statistics.median(reply_lengths)),
            "k4_rated_turns": len(ratings),
            "k4_up_ratings": sum(row["rating"] == "up" for row in ratings),
            "k4_down_ratings": sum(row["rating"] == "down" for row in ratings),
        },
        "example_turns": [
            {
                "turn_id": turn_id,
                "lecture_code": by_id[turn_id]["lecture_code"],
                "has_citation": as_bool(by_id[turn_id]["has_citation"]),
                "move_used": by_id[turn_id]["move_used"],
                "rating": by_id[turn_id]["rating"] or None,
            }
            for turn_id in CASE_IDS
            if turn_id in by_id
        ],
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    result = mine(args.input)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(json.dumps(result["metrics"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
