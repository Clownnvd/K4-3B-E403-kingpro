# Before/after trên cùng golden set lấy từ chatlog thật

## Bài toán duy nhất

Tutor trả lời theo một giả định khi câu hỏi thiếu đối tượng hoặc phụ thuộc ngữ cảnh chưa có, thay vì hỏi lại trước khi tạo nội dung.

## Nguồn dữ liệu

- File gốc: `tutor_turns.csv`, snapshot 15/09/2026.
- Phạm vi: các lượt K4 đã ẩn danh.
- Golden set: `eval/chatlog-golden-set.json`.
- 21 case đều giữ nguyên `student_question` và `turn_id` từ chatlog: 11 case mơ hồ, 10 case rõ đối chứng.
- Không đưa student identifier hoặc toàn bộ `tutor_reply` từ protected data lên repo.
- Nhãn được review thủ công trước khi chạy hệ thống mới.

## Cách đo

**Before:** dùng hành vi Tutor đã ghi trong chatlog. Một lượt được xem là `AMBIGUOUS` khi `move_used=ask_probing_question`; các move còn lại được xem là Tutor tiếp tục trả lời (`CLEAR`).

**After:** gửi nguyên cùng `student_question` cho full-Gemini classifier hiện tại và so `CLEAR/AMBIGUOUS` với nhãn đã khóa.

## Kết quả

| Hệ thống | Đạt | Accuracy |
|---|---:|---:|
| Tutor trong chatlog — before | 10/21 | 47,6% |
| Clarify First full Gemini — after | 21/21 | 100% |

**Mức tăng: +52,4 điểm phần trăm trên cùng 21 input.**

- Gemini classification: 21/21 lượt.
- Local fallback: 0 lượt.
- 11/11 câu mơ hồ được hỏi lại trước khi trả lời.
- 10/10 câu rõ vẫn đi tiếp, không bị hỏi lại thừa.

Kết quả chi tiết: `eval/chatlog-before-after-results.json`.

## Ví dụ nguyên văn

| Turn | Input thật | Before | After |
|---|---|---|---|
| `T11228` | `đáp án gì` trong phần Quiz cuối ngày | Tutor dùng `give_direct_answer` | `AMBIGUOUS` — hỏi câu nào |
| `T11653` | `cgi` | Tutor dùng `review_concept` | `AMBIGUOUS` — hỏi typo hay từ viết tắt |
| `T10326` | `Giải thích lại giúp mình phần mà mình hay thấy khó.` | Tutor dùng `review_concept` | `AMBIGUOUS` — thiếu phần cần giải thích |
| `T10657` | `repo không vào được thì sao ?` trong phần repo | Tutor tiếp tục trả lời | `CLEAR` — đã có đối tượng và task troubleshooting |

## Giới hạn

- Baseline route được suy ra từ `move_used`, không phải chạy lại model cũ.
- Bộ 21 case là mẫu đã review, không đại diện cho mọi cách diễn đạt trong 3.097 lượt.
- Chưa đo thời gian tiết kiệm hoặc tác động năng suất từ người dùng thật.
