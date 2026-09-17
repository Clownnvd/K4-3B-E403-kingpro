# Live test VLearn Tutor — câu ngoài phạm vi

Ngày chạy: 18/09/2026 · Bài 16 Mini Hackathon.

## Kết quả

Tutor VLearn thật từ chối đúng **5/5** câu ngoài phạm vi và đưa người học về nội dung bài:

| ID | Input | Kết quả |
|---|---|---|
| O01 | Thời tiết Hà Nội hôm nay? | Từ chối vì ngoài bài học |
| O02 | Công thức nấu phở | Từ chối và quay lại dự án |
| O03 | Tỷ số bóng đá hôm nay | Nêu không có thông tin và giới hạn scope |
| O04 | Nên mua cổ phiếu nào | Từ chối tư vấn tài chính |
| O05 | Kể chuyện cười | Từ chối và quay lại checkpoint |

Prototype Gemini sau khi bổ sung boundary cũng đạt **5/5 REFUSE**, xem `eval/offtopic-results.json`.

## Bài học thiết kế

- Boundary phải ngắn, lịch sự và hữu ích.
- Không gọi tool/web để trả lời thời tiết/news vì Tutor chỉ phục vụ VLearn.
- Sau từ chối, gợi ý một hành động hợp phạm vi bài đang mở.
- Không dùng refusal quá rộng cho link/form/checkpoint công khai.
