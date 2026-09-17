# Nội dung copy vào form CP1

## Thông tin nhóm

- **Lớp:** 3B
- **Phòng:** E403
- **Nhóm:** kingpro
- **Đội trưởng:** Nguyễn Văn Duy
- **Mã học viên đội trưởng:** 2A202602729
- **Repo Public:** https://github.com/Clownnvd/K4-3B-E403-kingpro

## Canvas 7 dòng

**1 — Track + đề:** Track A · VLearn Tutor — A1 tối ưu Tutor hiện có: Tutor chỉ trả lời khi có đủ căn cứ; câu mơ hồ phải hỏi lại bằng lựa chọn hoặc ô nhập bổ sung.

**2 — Job executor:** Một học viên K4 đang đọc slide/transcript trong VLearn, vừa chọn một đoạn hoặc gõ câu hỏi để làm rõ kiến thức trước khi tiếp tục bài hoặc làm quiz.

**3 — Pain:** Khi hỏi về phần đang học, học viên có thể nhận câu trả lời không nguồn, quá dài hoặc Tutor tự đoán ý khi câu hỏi mơ hồ; học viên không biết dựa vào đâu, phải dò lại và có nguy cơ học sai hoặc bị làm hộ bài tập.

**4 — Bằng chứng đầu:** Lọc `cohort_hint=K4`, `is_preset=False` trong `tutor_turns.csv`: 838/2.555 = 32,8% câu trả lời không citation; ví dụ `T10506`, `T10345`, `T11499`. Trên 3.097 lượt K4, `ask_probing_question` chỉ xuất hiện 6 lần = 0,19%; `T11228` và `T11653` cho thấy Tutor tự đoán ý khi input mơ hồ.

**5 — Lát cắt:** Một học viên đang đọc một bài cụ thể trên VLearn và đặt câu hỏi · AI quyết định context hiện có đã đủ căn cứ, còn mơ hồ hay ngoài phạm vi · nếu đủ thì trả lời ngắn kèm mã trang/đoạn, nếu mơ hồ thì cho chọn cách hiểu hoặc nhập bổ sung, nếu thiếu nguồn thì báo chưa đủ căn cứ · học viên nhận câu trả lời kiểm chứng được hoặc biết cần bổ sung gì.

**6 — AI tự làm đến đâu:** AI tự kiểm tra input, retrieve trong bài đang mở, quyết định `ANSWER / CLARIFY / REFUSE`, tạo tối đa ba lựa chọn làm rõ và chỉ sinh câu trả lời từ source span. AI không trả lời khi citation validator fail, không đoán dữ liệu cá nhân/deadline/XP, không làm hộ quiz và không làm theo prompt injection. Lý do: sai kiến thức có cost-of-error cao. **Willing users:** `[Tên 1]`, `[Tên 2]`, `[Tên 3]`.

**7 — Phân công:** Nguyễn Văn Duy — Canvas/spec, LangGraph, retrieval, guard, integration và checkpoint; Dương Thị Ngân — UX clarification, bốn đường trải nghiệm, validation; Vũ Huy Đô — evidence, golden set 20 case, eval và video CP3.

## Checklist trước khi bấm nộp

- [ ] Thay `[Tên 1]`, `[Tên 2]`, `[Tên 3]` bằng người thật ngoài nhóm đã đồng ý thử.
- [ ] Cả Duy, Ngân và Đô đã dán cùng link repo vào VLearn.
- [ ] Mở repo bằng cửa sổ ẩn danh và thấy README/spec/canvas.
- [ ] Form CP1 dùng đúng tên và MSSV đội trưởng: Nguyễn Văn Duy — 2A202602729.
- [ ] Giữ ảnh hoặc tin nhắn xác nhận willing users để dùng ở CP5.

## Tin nhắn xin willing user

> Bọn mình đang làm prototype Tutor VLearn biết hỏi lại khi câu hỏi mơ hồ và chỉ trả lời khi có nguồn. Bạn có đồng ý dành khoảng 10 phút dùng thử trước tối 18/9 và cho bọn mình ghi lại nhận xét nguyên văn không? Không dùng dữ liệu cá nhân và kết quả không ảnh hưởng điểm học tập.
