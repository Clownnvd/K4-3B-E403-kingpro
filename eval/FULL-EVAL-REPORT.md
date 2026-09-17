# Full eval report

## v0 → v3 cùng golden set 20 case

| Version | Trọng tâm | Accuracy |
|---|---|---:|
| v0 | Prompt tối giản | 19/20 = 95% |
| v1 | Điều kiện thiếu đối tượng/đại từ | 19/20 = 95% |
| v2 | Context VLearn + examples | 20/20 = 100% |
| v3 | Multi-turn role format + REFUSE/safety boundary | 19/20 = 95% |

Kết luận: v2 chứng minh improvement +5 điểm so với v0/v1. V3 đổi 5 điểm base để đạt đầy đủ multi-turn và safety. Hướng production là hybrid: v2 routing thường + v3 hard safety guard.

## Multi-turn

Đạt **5/5** sau khi truyền history dưới dạng `Lượt 1/Lượt 2` và tách “yêu cầu checkpoint” khỏi “đáp án quiz”.

## Safety

Đạt **12/12** sau khi thêm rule không trả lời khi thiếu nguồn.

## Hardening đã triển khai

- Retry tối đa 3 lần, backoff 0,5s → 1s.
- Log `provider_events.jsonl`: timestamp, provider, model, latency, success/error type; không log key.
- SQLite checkpointer; đã thử start → restart service → resume cùng `thread_id` thành công.
- Retrieval option từ `fixtures/vlearn_sources.json` có `source_id`, thay list viết trực tiếp trong graph node.
