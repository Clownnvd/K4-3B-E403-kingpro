# Đặc tả Google Form — willing user validation

**Owner:** Vũ Huy Đô  
**Người điền chính:** Trần Thanh Thái, Phan Đại Cương  
**Mục tiêu:** ghi phản hồi thật sau khi người dùng trực tiếp thao tác prototype; không hỏi dẫn dắt.

## Phần mở đầu form

> Bạn đang thử một prototype cải tiến Trợ giảng AI trong VLearn. Kết quả chỉ dùng cho Mini Hackathon, không ảnh hưởng điểm học tập. Vui lòng thao tác trước khi trả lời; nhóm sẽ chép nguyên văn phản hồi và không yêu cầu mật khẩu/API key.

## Câu hỏi bắt buộc

1. **Họ tên — MSSV** — Short answer.
2. **Thiết bị dùng thử** — Multiple choice: Laptop/Desktop · Điện thoại · Tablet.
3. **Bạn đã hoàn thành task nào?** — Checkbox:
   - Hỏi `cho tôi link` và chọn đúng loại link.
   - Hỏi `đáp án gì` rồi bổ sung thông tin.
   - Bấm `Không phải ý này` để sửa intent.
   - Bấm `Xem nguồn trong bài` và tìm block được bôi sáng.
4. **Bạn có hoàn thành task mà không cần thành viên nhóm hướng dẫn không?** — Yes/No.
5. **Bạn dừng hoặc phân vân lâu nhất ở bước nào? Vì sao?** — Paragraph.
6. **Bạn nghĩ Tutor sẽ làm gì sau khi chọn một phương án?** — Paragraph.
7. **Dải “Xem nguồn trong bài” có giúp bạn kiểm chứng câu trả lời không?** — Scale 1–5, giải thích mốc 1 và 5.
8. **Chép đúng một câu bạn đã nói trong lúc dùng thử** — Paragraph; yêu cầu giữ nguyên văn.
9. **Nếu chỉ được sửa một điểm, bạn muốn sửa gì?** — Paragraph.
10. **Bạn có sẵn sàng dùng lại tính năng này trong VLearn không?** — Yes · Maybe · No, kèm lý do.

## Trường do Đô tổng hợp sau form

- Thời gian hoàn thành từng task.
- Điểm kẹt quan sát được, không chỉ lời tự báo cáo.
- Quote nguyên văn.
- Quyết định: sửa gì, giữ gì, hoặc chưa đủ bằng chứng.
- Link/ảnh bằng chứng đã xin phép người test.

## DoD của Đô

- [ ] Form mở bằng tài khoản ngoài nhóm và không yêu cầu đăng nhập nếu không cần.
- [ ] Thái và Cương đều có bản ghi đầy đủ.
- [ ] Không có câu hỏi xin mật khẩu, key hoặc dữ liệu nhạy cảm.
- [ ] Export phản hồi CSV/PDF vào `validation/` nhưng không công khai dữ liệu ngoài phạm vi đã đồng ý.
- [ ] Điền hai dòng tương ứng trong `validation/README.md`.
- [ ] Chọn ít nhất một thay đổi có evidence và gửi Duy cập nhật `spec.md` §9.
