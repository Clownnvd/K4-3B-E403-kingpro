# Kiểm thử Tutor trực tiếp — 17/09/2026

## Phạm vi

- Trang thử: Bài 16 — Mini Hackathon, lớp 3B.
- Vấn đề duy nhất: **Tutor có hỏi lại trước khi trả lời một câu chưa đủ rõ hay không**.
- Quy tắc fail: Tutor bắt đầu giải thích, đưa hướng dẫn hoặc trả link theo một giả định khi chưa xác nhận ý định của học viên.
- Repo công khai chỉ giữ câu hỏi ngắn và kết quả tổng hợp; ảnh cùng transcript đầy đủ được giữ local để bảo vệ dữ liệu lớp học.

## Kết quả

| Câu thử | Hành vi quan sát được | Kỳ vọng | Kết quả |
|---|---|---|---|
| `đáp án gì` | Tutor tự chuyển sang hướng dẫn CP1 và dùng quy ước tên repo lớp 3A. | Hỏi học viên muốn đáp án của câu/bài nào. | Fail |
| `cgi` | Tutor đoán từ viết tắt rồi tiếp tục hướng dẫn CP1, vẫn dùng thông tin lớp 3A. | Đưa tối đa ba cách hiểu và ô nhập bổ sung. | Fail |
| `cái này là gì` | Tutor tự hiểu “cái này” là phần thiết lập Mini Hackathon. | Hỏi “cái này” đang chỉ nội dung nào. | Fail |
| `cho tôi link` | Tutor trả link repo chính thức của lớp 3A trong khi người dùng đang ở bài lớp 3B. | Hỏi cần link nào hoặc dùng ngữ cảnh lớp 3B đã xác minh. | Fail |

**Tổng:** 4/4 câu mơ hồ được trả lời theo giả định trước khi ý định được xác nhận. Một trường hợp tạo ra kết quả sai có thể kiểm chứng: link lớp 3A thay vì lớp 3B.

## Kết luận sản phẩm

Nhóm chỉ giải quyết một lỗi: **thiếu bước làm rõ ý định trước khi trả lời**. LangGraph chặn tại node `clarify` khi thông tin chưa đủ, hiển thị tối đa ba lựa chọn có ngữ cảnh và một ô nhập tự do, rồi mới tiếp tục sau khi người dùng chọn hoặc bổ sung.

Metric chính: tỷ lệ câu mơ hồ mà Tutor hỏi lại trước khi đưa nội dung trả lời.
