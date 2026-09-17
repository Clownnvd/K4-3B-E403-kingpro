# Pitch script CP6 — 5 phút

## 0:00–0:35 · Vấn đề

“Nhóm em không làm thêm một chatbot. Nhóm sửa đúng một lỗi trong Tutor VLearn: khi học viên hỏi thiếu ý, Tutor vẫn trả lời theo suy đoán. Trong 3.097 lượt K4, hành vi probing chỉ xuất hiện 6 lần, tương đương 0,19%. Khi test live bốn câu mơ hồ, cả bốn đều bị trả lời trước khi ý định được xác nhận.”

## 0:35–1:10 · Lát cắt

“Một học viên đang đọc bài, gửi câu mơ hồ; Gemini quyết định input chưa đủ rõ; LangGraph interrupt; học viên chọn một cách hiểu; graph resume rồi mới trả lời.”

## 1:10–2:30 · Demo

1. Bấm **Chạy E2E**.
2. Chỉ badge `GEMINI · LANGGRAPH`, model và token thật.
3. Chọn **Repo của nhóm kingpro**.
4. Chỉ câu trả lời và trace `interrupt → resume → answer`.
5. Bấm **Xem nguồn trong bài**; chỉ block lesson được bôi vàng.
6. Nếu được hỏi correction: bấm **Không phải ý này**.

## 2:30–3:25 · Cách hoạt động

“AI chỉ quyết định CLEAR hay AMBIGUOUS. Ba option đến từ allowlist theo bài đang mở. LangGraph giữ thread bằng checkpointer. Không có answer trước interrupt. Người dùng luôn có custom input và correction.”

## 3:25–4:15 · Số đo

“Quality bar chốt trước: ít nhất 90%, bốn hard case bắt buộc pass. Gemini đạt 18/20 = 90%, hard case pass. Hai fail là `form đâu` và `cho tôi link tải dữ liệu`: model tự tin quá mức. Nhóm giữ nguyên số fail thay vì sửa số.”

## 4:15–5:00 · Giá trị và giới hạn

“Thay vì một câu trả lời trôi chảy nhưng sai ý, học viên mất một lượt xác nhận ngắn và nhận đúng đích. Prototype chỉ tối ưu VLearn, chưa thay toàn bộ retrieval. Bước tiếp theo là test với ba willing users và dùng điểm kẹt quan sát được để sửa UI.”

## Câu hỏi dễ bị hỏi

- **Sao không để model tự đoán?** Vì live test đã trả nhầm repo 3A trên trang 3B; cost-of-error cao hơn một click.
- **Option có bị bịa không?** Không; option case demo là allowlist từ context VLearn.
- **Vì sao Gemini?** Groq key trên máy trả 403; Gemini hoạt động. Nhóm dùng một model xuyên suốt.
- **18/20 có thấp không?** Đạt bar 90%, đồng thời chỉ ra đúng hai failure để cải thiện.
