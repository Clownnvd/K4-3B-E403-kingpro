# Canvas CP1 — Track A · A1 Grounded Tutor

> Hạn CP1 lớp 3B: **19:30 ngày 17/9**. Bản này dùng để copy trực tiếp vào form CP1.

## 1. Track + đề

**Track A · VLearn Tutor — A1 tối ưu Tutor hiện có:** Tutor chỉ trả lời khi có đủ căn cứ; câu hỏi mơ hồ phải hỏi lại bằng lựa chọn hoặc ô nhập bổ sung.

## 2. Job executor

Một học viên K4 đang đọc slide/transcript trong VLearn, vừa chọn một đoạn hoặc gõ câu hỏi để làm rõ kiến thức trước khi tiếp tục bài học hoặc làm quiz.

## 3. Pain một câu

Khi hỏi về phần đang học, học viên có thể nhận câu trả lời không có nguồn, quá dài hoặc Tutor tự đoán ý khi câu hỏi mơ hồ; học viên không biết câu trả lời dựa vào đâu, mất thời gian dò lại và có nguy cơ học sai hoặc bị làm hộ bài tập.

## 4. Một đến hai bằng chứng đầu

1. Trong `tutor_turns.csv`, lọc `cohort_hint = K4`, `is_preset = False`: có **838/2.555 = 32,8%** lượt Tutor trả lời không citation. Cách đếm: đếm dòng có `has_citation = False`. Ví dụ: `T10506` tóm tắt lab không nguồn và bị downvote; `T10345` khẳng định nội dung `REPORT_TEMPLATE.md` khi context không có file; `T11499` tóm tắt hàng loạt slide nhưng `has_citation=False`.
2. Trên toàn bộ 3.097 lượt K4, Tutor chỉ dùng `ask_probing_question` **6 lần = 0,19%**. Ví dụ: `T11228`, người dùng chỉ hỏi “đáp án gì” nhưng Tutor tự suy ra câu top-p và trả lời; `T11653`, input chỉ có “cgi” nhưng Tutor tự gán thành ODD rồi giải thích dài.

## 5. Lát cắt MỘT CÂU

Một học viên đang đọc một bài cụ thể trên VLearn và đặt câu hỏi · AI quyết định context hiện có đã đủ căn cứ, còn mơ hồ hay ngoài phạm vi · nếu đủ thì trả lời ngắn kèm mã trang/đoạn, nếu mơ hồ thì cho chọn cách hiểu hoặc nhập bổ sung, nếu thiếu nguồn thì báo chưa đủ căn cứ · học viên nhận được câu trả lời kiểm chứng được hoặc biết chính xác cần bổ sung gì.

## 6. AI tự làm đến đâu + lý do + willing users

**AI tự làm có điều kiện:** kiểm tra input, truy xuất trong đúng bài đang mở, quyết định `ANSWER / CLARIFY / REFUSE`, tạo tối đa ba lựa chọn làm rõ và sinh câu trả lời chỉ từ source span đã retrieve. **AI không tự:** trả lời khi citation validator fail, suy đoán deadline/điểm/XP hoặc dữ liệu cá nhân, làm hộ quiz/bài nộp, làm theo prompt injection yêu cầu bỏ nguồn. **Lý do:** câu trả lời sai trong Tutor có thể khiến học viên học sai; vì vậy hard gate và citation validator do code kiểm soát, người dùng luôn có quyền sửa ý định.

**Willing users ngoài nhóm — CẦN ĐIỀN TRƯỚC KHI NỘP:** `[Tên 1]`, `[Tên 2]`, `[Tên 3]`.

## 7. Phân công có tên

- **Nguyễn Văn Duy:** đội trưởng; Canvas/spec; LangGraph, retrieval, citation validator, tích hợp và nộp CP1–CP5.
- **Dương Thị Ngân:** UX chat; thẻ lựa chọn/ô nhập clarification; bốn đường trải nghiệm; user validation và changelog.
- **Vũ Huy Đô:** mining evidence; bộ 20 case; chấm Pass/Fail; số đo CP3 và video demo.
