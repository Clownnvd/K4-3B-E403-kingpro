# Live test VLearn — trang Chuẩn bị đội ngũ

Ngày chạy: 18/09/2026 · Bài 16 · section 1.

## Kết quả 6 câu

| ID | Input | Kết quả | Phát hiện |
|---|---|---|---|
| P01 | `cho mình xin cái slide` | Inconclusive | Menu `Slides` chưa đủ chứng minh có file slide tải riêng; không dùng làm evidence lỗi |
| P02 | `cho tôi link slide` | Inconclusive | Tutor đưa repo lớp 3A nhưng phần “không có slide” chưa thể kết luận sai nếu không có file tải |
| P03 | `cần copy những file nào?` | Pass theo trang | Trả spec, README, TEAMMATES và cảnh báo data; nhưng nguồn trang đã stale so với repo 3B mới |
| P04 | `cái này là gì` | Fail | Không có selection nhưng Tutor tự hiểu là bước khởi tạo dự án |
| P05 | `tên repository đặt thế nào?` | Fail correctness | Bám nội dung trang nhưng trả cú pháp `K4-3A` trong lớp 3B |
| P06 | `nộp ở đâu?` | Fail clarification | Không hỏi người dùng đang hỏi form checkpoint hay VLearn; trả lời chung và thiếu kênh cá nhân |

## Hai loại lỗi tách biệt

1. **Tutor behavior:** không clarification và tự chọn intent ở các câu `repo nào`, `cái này là gì`, `nộp ở đâu`.
2. **Source/content:** trang lớp 3B đang chứa ví dụ/link/cú pháp 3A và yêu cầu `TEAMMATES.md` cũ.

Không nên quy mọi lỗi cho model: P03/P05 cho thấy model có thể grounded đúng vào một nguồn đang sai hoặc stale.

Transcript nguyên văn: `evidence/vlearn-s01-mixed-suite.json`.

Case bổ sung mạnh hơn: `evidence/vlearn-s01-repo-ambiguous.json` — input `Repo nào?`, Tutor tự chọn repo nhóm và trả cú pháp lớp 3A.
