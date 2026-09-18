# Validation log — willing users

Không điền quote giả. Người test tự thao tác; người quan sát chép nguyên văn.

**Link prototype:** <https://vlearn-clarify-first-kingpro.vercel.app>

| Người phụ trách | Người dùng | Task | Quan sát | Quote nguyên văn | Quyết định |
|---|---|---|---|---|---|
| Ngân | Lê Thị Thùy Trang — 2A202602678 | Hỏi `cho tôi link` → chọn repo nhóm → mở nguồn | Chờ test | Chờ test | Chờ test |
| Đô | Trần Thanh Thái — 2A202602454 | Hỏi `đáp án gì` → dùng custom input → correction | Chờ test | Chờ test | Chờ test |
| Đô | Phan Đại Cương — 2A202607123 | Dùng trên mobile → mở Tutor → kiểm tra source highlight | Chờ test | Chờ test | Chờ test |

## Technical UX validation — Ngân — 18/09/2026

Phần này là kiểm tra kỹ thuật, **không thay thế willing-user test và không tạo quote giả**.

| Hạng mục | Trước review | Sau review | Kết quả |
|---|---|---|---|
| Mở nguồn trên mobile | Block lesson được highlight nhưng Tutor vẫn che nội dung | Tutor đóng, lesson cuộn tới nguồn và focus vào block | Pass |
| Drawer bằng bàn phím | Nội dung off-screen còn trong tab order; chưa có focus trap/restore | `inert` khi đóng; focus trap, `Escape`, restore focus khi mở/đóng | Pass |
| Clarification | Dữ liệu tĩnh có 3 option nhưng runtime chưa bị giới hạn ở UI | Tối đa 3 option + custom được chốt tại render | Pass |
| Scenario picker | Thiếu semantics listbox và xử lý `Escape` riêng | Có `aria-controls`, `listbox/option`; `Escape` đóng menu trước drawer | Pass |
| Correction/failure | Có luồng correction | Correction lần hai đi tới safe failure | Pass |
| Responsive | Không overflow ở bộ ảnh cũ | Đo lại 1536/1024/390, không overflow ngang | Pass |

Kết quả tự động: **15/15** kiểm tra UX đạt. Bước còn phụ thuộc người thật là buổi test với Trang ở bảng trên; chỉ cập nhật quan sát và quote sau khi Trang trực tiếp thao tác.

## Script 10 phút

1. Không giải thích trước tính năng; chỉ giao task.
2. Ghi thời điểm bắt đầu/kết thúc, nơi dừng quá 5 giây và thao tác quay lại.
3. Hỏi: “Bạn nghĩ bước tiếp theo là gì?”, “Chỗ nào khiến bạn không chắc?”, “Bạn có tin câu trả lời không, vì sao?”.
4. Chép đúng quote, kể cả sai chính tả.
5. Sau ít nhất hai người, chọn một điểm kẹt lặp lại để sửa và ghi vào `spec.md` §9.

## Owner form & Quy trình của Đô

Vũ Huy Đô chịu trách nhiệm:
1. Dựng Google Form theo đặc tả tại [WILLING-USER-FORM.md](file:///home/do/projects/K4-3B-E403-kingpro-do/validation/WILLING-USER-FORM.md) và gửi cho Thái và Cương.
2. Trực tiếp quan sát hai bạn dùng thử prototype, ghi nhận thời gian, chỗ dừng >5 giây và chép nguyên văn quote vào [DO-RAW-NOTES.md](file:///home/do/projects/K4-3B-E403-kingpro-do/validation/DO-RAW-NOTES.md).
3. Chỉ cập nhật bảng trên khi có kết quả thử nghiệm thực tế (tuyệt đối không bịa quote hoặc điền trước).
4. Thực hiện đối soát số liệu CP3 (18/20) và thời lượng video 30s tại [DO-MISMATCH-REPORT.md](file:///home/do/projects/K4-3B-E403-kingpro-do/validation/DO-MISMATCH-REPORT.md).
