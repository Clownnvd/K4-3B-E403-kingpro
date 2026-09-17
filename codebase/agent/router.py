from __future__ import annotations

import re
import unicodedata
from typing import Any


def _normalize(text: str) -> str:
    text = unicodedata.normalize("NFC", text.casefold())
    return " ".join(text.strip().split())


def classify_ambiguity(question: str, lesson_title: str) -> dict[str, Any]:
    """Local deterministic router used by the no-API demo and eval harness."""
    normalized = _normalize(question)
    explicit_targets = (
        "repo nhóm",
        "repo de bai",
        "repo đề bài",
        "form cp",
        "checkpoint cp",
        "langgraph",
        "interrupt",
        "cp1",
        "cp2",
        "cp3",
        "cp4",
        "cp5",
    )
    has_explicit_target = any(target in normalized for target in explicit_targets)
    vague_exact = {
        "cho tôi link",
        "cho toi link",
        "gửi link",
        "gui link",
        "link đâu",
        "link dau",
        "đáp án gì",
        "dap an gi",
        "đáp án",
        "dap an",
        "cgi",
        "cái này là gì",
        "cai nay la gi",
        "nó là gì",
        "no la gi",
        "câu này sao",
        "cau nay sao",
        "form đâu",
        "form dau",
        "repo nào",
        "repo nao",
    }
    vague_reference = bool(re.search(r"\b(cái này|câu này|đoạn này|nó|ở trên)\b", normalized))
    generic_link = "link" in normalized and not has_explicit_target
    ambiguous = normalized in vague_exact or vague_reference or generic_link
    if ambiguous:
        return {
            "route": "AMBIGUOUS",
            "reason": (
                f"Câu hỏi '{question}' chưa xác định một đối tượng duy nhất trong {lesson_title}; "
                "Tutor phải hỏi lại trước khi trả lời."
            ),
            "confidence": 1.0,
        }
    return {
        "route": "CLEAR",
        "reason": "Câu hỏi đã nêu rõ đối tượng cần xử lý.",
        "confidence": 1.0,
    }
