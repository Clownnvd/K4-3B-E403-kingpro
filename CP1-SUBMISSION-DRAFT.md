# Nội dung copy vào form CP1

## Thông tin nhóm

- **Lớp:** 3B
- **Phòng:** E403
- **Nhóm:** kingpro
- **Đội trưởng:** Nguyễn Văn Duy
- **Mã học viên đội trưởng:** 2A202602729
- **Repo Public:** https://github.com/Clownnvd/K4-3B-E403-kingpro

## Canvas 7 dòng

**1 — Track + đề:** Track A · VLearn Tutor — A1 tối ưu Tutor hiện có: Tutor phải hỏi lại trước khi trả lời câu hỏi chưa đủ rõ.

**2 — Job executor:** Một học viên K4 đang đọc bài trên VLearn và gõ một câu ngắn để hỏi về nội dung mình chưa hiểu.

**3 — Pain:** Khi câu hỏi thiếu đối tượng hoặc ý định, Tutor vẫn chọn một cách hiểu và trả lời ngay, khiến học viên nhận hướng dẫn sai ngữ cảnh rồi phải hỏi lại hoặc tự kiểm tra.

**4 — Bằng chứng đầu:** Trong 3.097 lượt K4, Tutor chỉ dùng `ask_probing_question` 6 lần = 0,19%. Kiểm thử trực tiếp ngày 17/09 trên Bài 16 lớp 3B cho thấy 4/4 câu mơ hồ bị trả lời theo giả định trước khi xác nhận ý định; câu `cho tôi link` trả nhầm repo lớp 3A. Script và biên bản nằm trong thư mục `evidence/`.

**5 — Lát cắt:** Một học viên đang đọc một bài trên VLearn và gửi câu hỏi mơ hồ · AI quyết định câu hỏi chưa đủ thông tin · giao diện đưa tối đa ba cách hiểu theo ngữ cảnh cùng ô nhập bổ sung · học viên chọn hoặc sửa ý rồi nhận câu trả lời đúng ý định ngay lượt kế tiếp.

**6 — AI tự làm đến đâu:** AI phát hiện tín hiệu mơ hồ và đề xuất tối đa ba cách hiểu. LangGraph bắt buộc dừng ở node `clarify` bằng `interrupt`; chỉ tiếp tục sau lựa chọn hoặc nội dung bổ sung của người dùng. Người dùng có thể chọn, sửa hoặc hủy. **Willing users (tối thiểu 2):** `[Tên 1]`, `[Tên 2]`.

**7 — Phân công:** Nguyễn Văn Duy — Canvas/spec, LangGraph router + interrupt, integration và checkpoint; Dương Thị Ngân — UX clarification, correction và validation; Vũ Huy Đô — evidence, golden set, eval và video CP3.

## Checklist trước khi bấm nộp

- [ ] Thay `[Tên 1]`, `[Tên 2]` bằng người thật ngoài nhóm đã đồng ý thử.
- [ ] Cả Duy, Ngân và Đô đã dán cùng link repo vào VLearn.
- [ ] Mở repo bằng cửa sổ ẩn danh và thấy README/spec/canvas.
- [ ] Form CP1 dùng đúng tên và MSSV đội trưởng: Nguyễn Văn Duy — 2A202602729.
- [ ] Giữ ảnh hoặc tin nhắn xác nhận willing users để dùng ở CP5.

## Tin nhắn xin willing user

> Bọn mình đang làm prototype Tutor VLearn biết hỏi lại trước khi trả lời câu hỏi mơ hồ. Bạn có đồng ý dành khoảng 10 phút dùng thử trước tối 18/9 và cho bọn mình ghi lại nhận xét nguyên văn không? Không dùng dữ liệu cá nhân và kết quả không ảnh hưởng điểm học tập.
