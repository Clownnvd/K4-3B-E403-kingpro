# Đặc tả Google Form — willing user validation

**Owner:** Vũ Huy Đô
**Người điền chính:** Trần Thanh Thái, Phan Đại Cương
**Mục tiêu:** Ghi phản hồi thật sau khi người dùng trực tiếp thao tác prototype; không hỏi dẫn dắt, không bịa quote.

**Form đã xuất bản:** <https://docs.google.com/forms/d/e/1FAIpQLSdUZ6c4-76gP_SEET7cuTCOomDO9z903wRRO-OnToekUjqtsg/viewform>

---

## Cấu hình biểu mẫu (Google Form Settings)

- **Tiêu đề Form:** Đánh giá trải nghiệm Trợ giảng AI VLearn (Mini Hackathon)
- **Quyền truy cập:** Công khai (Public) — Tắt tùy chọn "Chỉ giới hạn cho người dùng trong tổ chức" để người ngoài nhóm truy cập dễ dàng mà không bị chặn quyền.
- **Bảo mật & Consent:** Không yêu cầu đăng nhập bắt buộc; không thu thập mật khẩu, API key, token hay dữ liệu cá nhân nhạy cảm.
- **Link prototype:** <https://vlearn-clarify-first-kingpro.vercel.app>

## Phần mở đầu form (Form Description)

> Chào bạn, bạn đang thử nghiệm một prototype cải tiến cho Trợ giảng AI trong VLearn nhằm giải quyết vấn đề câu hỏi mơ hồ.
> **Link prototype:** https://vlearn-clarify-first-kingpro.vercel.app
>
> Kết quả chỉ phục vụ đánh giá trải nghiệm trong khuôn khổ Mini Hackathon, hoàn toàn không ảnh hưởng đến điểm số hay học tập của bạn.
> Vui lòng trực tiếp thao tác prototype trước khi trả lời form; nhóm sẽ ghi nhận phản hồi nguyên văn và tuyệt đối không yêu cầu mật khẩu hay API key.

## Danh sách câu hỏi chi tiết

1. **Họ tên và MSSV**
   - Loại câu: *Short answer* (Bắt buộc)
   - Gợi ý: Ghi rõ Họ tên — MSSV (Ví dụ: Trần Thanh Thái — 2A202602454)

2. **Thiết bị bạn sử dụng để dùng thử prototype?**
   - Loại câu: *Multiple choice* (Bắt buộc)
   - Các lựa chọn:
     - Laptop / Máy tính bàn (Desktop)
     - Điện thoại thông minh (Mobile)
     - Máy tính bảng (Tablet)

3. **Bạn đã thực hiện (những) task nào trên prototype?**
   - Loại câu: *Checkboxes* (Bắt buộc)
   - Các lựa chọn:
     - [Task A] Hỏi `cho tôi link` → chọn repo nhóm kingpro → mở nguồn
     - [Task B] Hỏi `đáp án gì` → dùng ô tự nhập (custom input) bổ sung câu hỏi → bấm `Không phải ý này` (sửa intent)
     - [Task C] Trên mobile: hỏi `phần kia nghĩa là sao` → chọn `Tìm pain có bằng chứng` → bấm `Xem nguồn trong bài` và tìm block được bôi sáng
     - Task khác (ghi rõ)

4. **Bạn có hoàn thành task mà không cần thành viên nhóm hướng dẫn không?**
   - Loại câu: *Multiple choice* (Bắt buộc)
   - Các lựa chọn:
     - Có, tự hoàn thành không cần hướng dẫn
     - Cần một phần gợi ý / hướng dẫn từ người quan sát

5. **Bạn dừng lại hoặc phân vân lâu nhất ở bước nào trong quá trình thao tác? Vì sao?**
   - Loại câu: *Paragraph* (Bắt buộc)
   - Mục đích: Phát hiện điểm nghẽn UX thực tế mà người dùng cảm thấy chưa trực quan.

6. **Sau khi bấm chọn một phương án làm rõ (clarification option), bạn nghĩ Trợ giảng sẽ làm gì tiếp theo?**
   - Loại câu: *Paragraph* (Bắt buộc)
   - Mục đích: Đo lường mức độ khớp giữa Mental Model của người dùng và luồng ReAct/LangGraph resume.

7. **Dải "Xem nguồn trong bài" có giúp bạn kiểm chứng câu trả lời không?**
   - Loại câu: *Linear scale* (1–5) (Bắt buộc)
   - Mốc 1: 1 — Hoàn toàn không giúp kiểm chứng / Gây rối mắt
   - Mốc 5: 5 — Rất hữu ích, tìm thấy ngay đoạn căn cứ được bôi sáng trong bài học

8. **Chép đúng một câu bạn đã thốt lên hoặc nói ra trong lúc dùng thử prototype:**
   - Loại câu: *Paragraph* (Bắt buộc)
   - Ghi chú: Yêu cầu giữ nguyên văn cách nói tự nhiên (kể cả câu cảm thán hay nhận xét ngắn).

9. **Nếu chỉ được sửa đúng một điểm trong trải nghiệm vừa rồi, bạn muốn sửa gì nhất?**
   - Loại câu: *Paragraph* (Bắt buộc)
   - Mục đích: Xác định ưu tiên cải tiến hàng đầu từ người dùng.

10. **Bạn có sẵn sàng sử dụng tính năng này khi học tập trên VLearn không?**
    - Loại câu: *Multiple choice* kèm lý do (Bắt buộc)
    - Các lựa chọn:
      - Sẵn sàng sử dụng (Yes)
      - Có thể / Cần hoàn thiện thêm (Maybe)
      - Không sẵn sàng sử dụng (No)
    - Câu hỏi phụ (Paragraph): Vui lòng chia sẻ ngắn gọn lý do vì sao bạn chọn mức độ trên.

---

## Hướng dẫn người quan sát (Vũ Huy Đô)

- **Nguyên tắc vàng:** Không giải thích trước tính năng; chỉ giao task ngắn gọn và để người dùng tự khám phá.
- **Đo lường khách quan:** Ghi nhận thời gian bắt đầu và kết thúc; bấm giờ các bước người dùng dừng lại quá 5 giây.
- **Ghi chép trung thực:** Chép đúng nguyên văn lời nói của người dùng (kể cả nói lắp hay sai từ), không tự biên tập hay gọt giũa lời kể.
- **Bảo mật thông tin:** Không yêu cầu hay lưu trữ thông tin nhạy cảm; lưu bản xuất phản hồi tại thư mục `validation/`.

## DoD của Đô

- [x] Đặc tả form hoàn thiện, không có câu hỏi dẫn dắt, giải thích rõ các thang đo.
- [ ] Tạo Google Form theo đúng các câu hỏi trên, mở quyền truy cập cho tài khoản ngoài tổ chức.
- [ ] Gửi link form và giao task cho Trần Thanh Thái và Phan Đại Cương.
- [ ] Trực tiếp quan sát, ghi chép thời gian, chỗ dừng >5 giây và quote nguyên văn vào `validation/DO-RAW-NOTES.md`.
- [ ] Cập nhật kết quả vào `validation/README.md` sau khi có phản hồi thật (tuyệt đối không điền quote giả trước).
- [x] Đối soát số liệu CP3 và thời lượng video vào `validation/DO-MISMATCH-REPORT.md`.
- [ ] Báo cáo kết quả và gửi diff/hash commit cho Duy duyệt.
