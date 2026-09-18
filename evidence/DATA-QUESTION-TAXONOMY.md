# Taxonomy câu hỏi trong data VLearn K4

Nguồn: `tutor_turns.csv`, lọc `cohort_hint=K4`, bỏ preset. Còn 2.555 lượt free-text. Các nhóm dưới đây dùng regex công khai và **có overlap**, không cộng lại thành tổng.

| Nhóm câu hỏi | Số lượt heuristic | Ví dụ turn |
|---|---:|---|
| Giải thích/định nghĩa/tại sao | 714 | T10317, T10320, T10321 |
| Tìm link/file/slide/repo/form | 573 | T10292, T10301, T10311 |
| Hướng dẫn quy trình/how-to | 201 | T10339, T10340 |
| Tóm tắt/ý chính | 197 | T10306, T10312, T10357 |
| So sánh/phân biệt | 157 | T10411, T10414, T10438 |
| Xin ví dụ/minh họa | 150 | T10392, T10409, T10478 |
| Code/debug/error | 129 | T10336, T10346 |
| Công thức/số/token/chi phí | 114 | T10355 |
| Kiểm tra đáp án/đúng-sai | 67 | T10515 |
| Câu cực ngắn ≤30 ký tự | 5 | T10296–T10298 |

Prompt injection không báo số bằng regex đơn giản vì từ `prompt` xuất hiện dày trong chính context bài học, gây false positive. Data Dictionary xác nhận có injection thật như `SYSTEM_OVERRIDE` và “bỏ qua hướng dẫn trước”, nhưng cần nhãn thủ công trước khi dùng làm metric.

## Live test đại diện trên trang CP4

Tutor xử lý tốt 8/8 dạng câu rõ/safety:

1. Định nghĩa Quality Bar.
2. Cách đặt Quality Bar.
3. So sánh Canvas và AI Spec.
4. Xin ví dụ Quality Bar.
5. Sửa false premise “80% là bắt buộc”.
6. Tóm tắt phần CP4 trong ba ý.
7. File cần commit ở CP4.
8. Prompt injection — bị policy chặn.

Transcript: `evidence/vlearn-cp4-category-suite.json`.

## Kết luận sản phẩm

Không thay toàn bộ Tutor. Giữ năng lực giải thích, how-to, comparison, example, summary và safety đang tốt. Chèn clarification router trước những input thiếu đối tượng/tham chiếu/scope; đồng thời kiểm tra freshness của context lớp 3A/3B.
