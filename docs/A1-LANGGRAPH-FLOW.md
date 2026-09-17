# Sơ đồ LangGraph — Tutor hỏi lại trước câu mơ hồ

## Quyết định AI duy nhất

`classify_ambiguity` quyết định câu hỏi hiện tại đã đủ ý định để trả lời hay phải hỏi lại. Hệ thống không sinh câu trả lời khi route là `AMBIGUOUS`.

```mermaid
flowchart TD
    START([START]) --> RECEIVE[receive_input<br/>Nhận câu hỏi + lesson_id + thread_id]
    RECEIVE --> CONTEXT[load_lesson_context<br/>Lấy bài đang mở và lịch sử gần]
    CONTEXT --> CLASSIFY{{classify_ambiguity<br/>AI quyết định: đã đủ ý định?}}

    CLASSIFY -->|CLEAR| ANSWER[answer_with_confirmed_intent<br/>Trả lời theo ý định đã rõ]
    CLASSIFY -->|AMBIGUOUS| OPTIONS[build_clarification_options<br/>Tối đa 3 lựa chọn + tự nhập]

    OPTIONS --> PAUSE[[interrupt clarification<br/>Lưu state và chờ người dùng]]
    PAUSE -->|Chọn một phương án| RESUME[Command resume<br/>option_id + thread_id]
    PAUSE -->|Nhập bổ sung| RESUME_CUSTOM[Command resume<br/>custom_text + thread_id]
    PAUSE -->|Hủy| CANCEL([END · Không trả lời])

    RESUME --> MERGE[apply_clarification<br/>Ghép expanded_query]
    RESUME_CUSTOM --> MERGE
    MERGE --> RECHECK{{intent_guard<br/>Đã đủ rõ sau bổ sung?}}

    RECHECK -->|Có| ANSWER
    RECHECK -->|Chưa · vòng dưới 2| OPTIONS
    RECHECK -->|Chưa · đủ 2 vòng| HANDOFF[graceful_failure<br/>Nêu giới hạn + gợi ý hỏi cụ thể]
    HANDOFF --> END_FAIL([END · Chưa tạo câu trả lời])

    ANSWER --> SHOW[Hiển thị câu trả lời<br/>+ nút “Không phải ý này”]
    SHOW -->|Đúng ý| END_OK([END · Hoàn thành])
    SHOW -->|Không phải ý này| CORRECT[record_correction<br/>Thu hồi intent cũ]
    CORRECT --> OPTIONS

    classDef ai fill:#e8f0ff,stroke:#315efb,color:#102a56,stroke-width:2px;
    classDef human fill:#fff4d6,stroke:#d97706,color:#5b3100,stroke-width:2px;
    classDef safe fill:#e9f8ef,stroke:#159455,color:#073b23,stroke-width:2px;
    class CLASSIFY ai;
    class PAUSE,RESUME,RESUME_CUSTOM human;
    class RECHECK,CANCEL,HANDOFF,END_FAIL,CORRECT safe;
```

## State tối thiểu

| Trường | Tác dụng |
|---|---|
| `thread_id` | Resume đúng phiên sau `interrupt` |
| `lesson_id` | Giữ ngữ cảnh bài đang mở |
| `question` | Câu hỏi ban đầu |
| `ambiguity_status` | `CLEAR` hoặc `AMBIGUOUS` |
| `ambiguity_reason` | Lý do cần hỏi lại để UI giải thích |
| `clarification_options` | Tối đa ba phương án có ngữ cảnh |
| `clarification_answer` | `option_id` hoặc nội dung tự nhập |
| `clarification_round` | Chặn vòng lặp sau tối đa hai lần |
| `confirmed_intent` | Ý định đã được người dùng xác nhận |
| `final_answer` | Chỉ tồn tại sau khi intent guard đạt |

## Nhánh demo CP2

1. Gõ `cho tôi link`.
2. `classify_ambiguity` trả `AMBIGUOUS` vì thiếu loại link.
3. UI hiện: repo đề bài 3B · repo nhóm · form checkpoint · Khác — tự nhập.
4. Graph `interrupt`, chưa sinh câu trả lời.
5. Người dùng chọn **repo nhóm**.
6. Client resume cùng `thread_id`; graph tạo intent đã xác nhận.
7. Tutor trả đúng repo nhóm.
8. Nếu bấm **Không phải ý này**, graph thu hồi intent và quay về lựa chọn.

## Phần mock và phần thật

- **CP2 mock:** kết quả `classify_ambiguity`, các lựa chọn và câu trả lời cuối được fixture hóa để chứng minh flow.
- **CP3 thật:** LangGraph checkpointer, `interrupt()`/`Command(resume=...)` và ít nhất một AI call tại `classify_ambiguity`.
