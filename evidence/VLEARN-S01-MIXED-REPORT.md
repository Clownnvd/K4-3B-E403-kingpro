# Live test VLearn — trang Chuẩn bị đội ngũ

Ngày chạy: 18/09/2026 · Bài 16 · section 1.

## Kết quả 6 câu

| ID | Input | Kết quả | Phát hiện |
|---|---|---|---|
| P01 | `cho mình xin cái slide` | Fail | Tutor nói không có slide, trong khi menu trái đang hiện `Slides` |
| P02 | `cho tôi link slide` | Fail | Tutor tiếp tục nói không có slide và đưa repo lớp 3A |
| P03 | `cần copy những file nào?` | Pass theo trang | Trả spec, README, TEAMMATES và cảnh báo data; nhưng nguồn trang đã stale so với repo 3B mới |
| P04 | `cái này là gì` | Fail | Không có selection nhưng Tutor tự hiểu là bước khởi tạo dự án |
| P05 | `tên repository đặt thế nào?` | Fail correctness | Bám nội dung trang nhưng trả cú pháp `K4-3A` trong lớp 3B |
| P06 | `nộp ở đâu?` | Fail clarification | Không hỏi người dùng đang hỏi form checkpoint hay VLearn; trả lời chung và thiếu kênh cá nhân |

## Hai loại lỗi tách biệt

1. **Tutor behavior:** không clarification, không đọc được UI state/menu Slides, tự chọn intent.
2. **Source/content:** trang lớp 3B đang chứa ví dụ/link/cú pháp 3A và yêu cầu `TEAMMATES.md` cũ.

Không nên quy mọi lỗi cho model: P03/P05 cho thấy model có thể grounded đúng vào một nguồn đang sai hoặc stale.

Transcript nguyên văn: `evidence/vlearn-s01-mixed-suite.json`.
