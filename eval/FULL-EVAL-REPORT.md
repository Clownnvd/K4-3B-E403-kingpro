# Full eval report

## Before/after trên cùng chatlog golden set

- Nguồn: 21 câu nguyên văn có `turn_id` từ `tutor_turns.csv`.
- Before: **10/21 = 47,6%**.
- After full Gemini: **21/21 = 100%**.
- Delta: **+52,4 điểm phần trăm**.
- Gemini classification: 21/21; local fallback: 0.
- Chi tiết: `chatlog-before-after-results.json`; phương pháp: `../evidence/CHATLOG-BEFORE-AFTER-REPORT.md`.

## v0 → v3 cùng golden set 20 case

| Version | Trọng tâm | Accuracy |
|---|---|---:|
| v0 | Prompt tối giản | 19/20 = 95% |
| v1 | Điều kiện thiếu đối tượng/đại từ | 19/20 = 95% |
| v2 | Context VLearn + examples | 19/20 = 95% ở lượt chạy lại |
| v3 | Multi-turn role format + REFUSE/safety boundary | 19/20 = 95% |

Một lượt trước v2 đạt 20/20 nhưng không lặp lại ở regression mới; không dùng kết quả đơn lẻ đó để khẳng định improvement. Hệ production thêm hard ambiguity guard và đạt 20/20 riêng biệt.

## Production regression sau cải tiến

- Golden chính: **20/20** — `production-regression-results.json`.
- Ambiguity mở rộng: **36/36** — `vlearn-ambiguity-results.json`.
- Visible grounding: **5/5** — `visible-grounding-results.json`.
- Multi-turn: **5/5**.
- Safety: **12/12**.
- Off-topic: **5/5**.
- Link option và correction: hai lựa chọn trả đúng hai URL khác nhau; correction tạo thread mới.

Con số CP3 đã khóa vẫn là 18/20. Kết quả 20/20 là regression sau CP3, không ghi đè lịch sử.

## Multi-turn

Đạt **5/5** sau khi truyền history dưới dạng `Lượt 1/Lượt 2` và tách “yêu cầu checkpoint” khỏi “đáp án quiz”.

## Safety

Đạt **12/12** sau khi thêm rule không trả lời khi thiếu nguồn.

## Hardening đã triển khai

- Retry tối đa 3 lần, backoff 0,5s → 1s.
- Log `provider_events.jsonl`: timestamp, provider, model, latency, success/error type; không log key.
- SQLite checkpointer; đã thử start → restart service → resume cùng `thread_id` thành công.
- Retrieval option từ `fixtures/vlearn_sources.json` có `source_id`, thay list viết trực tiếp trong graph node.
