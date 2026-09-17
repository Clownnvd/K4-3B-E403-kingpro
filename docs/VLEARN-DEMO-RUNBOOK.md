# Runbook demo VLearn Clarification Tutor

## Những pattern học từ VLearn thật

1. Giữ bố cục dàn bài trái · lesson giữa · Tutor phải.
2. Tutor luôn biết “đang mở bài nào”; prototype bổ sung lớp 3B để tránh lỗi source 3A.
3. Composer cố định dưới panel, disclaimer luôn nhìn thấy.
4. Nút mở Tutor là CTA xanh chính.
5. Off-topic: từ chối ngắn + kéo về bài học; VLearn thật đạt 5/5.
6. Ambiguity: VLearn thật chỉ đạt 2/10; prototype thay reply dài bằng ba option + custom.
7. Nguồn không chiếm chỗ dưới answer; bấm dải nhỏ rồi bôi block trong lesson.
8. Trace kỹ thuật đóng mặc định; chỉ mở khi giám khảo hỏi.

## Preflight trước demo 10 phút

```powershell
# Terminal 1
cd codebase/agent
python -m uvicorn app:app --host 127.0.0.1 --port 8000

# Terminal 2
cd codebase/web
pnpm dev -- --port 3011
```

- Mở `http://localhost:3011` và refresh một lần.
- Kiểm tra badge `MOCK/BẢN THỬ`, nút **Chạy với Gemini** và panel lesson.
- Chạy thử đúng một lần; sau đó refresh để về state sạch.
- Mở sẵn `artifacts/demo-backup.mp4` bằng trình phát offline.
- Tắt notification; giữ zoom trình duyệt 100%; không mở DevTools trước khán giả.

## Demo chính — 45 đến 60 giây

1. **Chỉ lesson context:** “Đây là giao diện VLearn; học viên đang ở Bài 16 lớp 3B.”
2. **Nêu input:** “Tutor hiện tại nhận câu `cho tôi link` và từng trả nhầm repo 3A.”
3. Bấm **Chạy với Gemini**.
4. Chỉ badge `GEMINI · LANGGRAPH` và card **Cần làm rõ · chưa trả lời**.
5. Chọn **Repository của nhóm kingpro**.
6. Chỉ answer và nói: “Graph chỉ trả lời sau khi người học xác nhận intent.”
7. Bấm **Kiểm tra nguồn trong bài**.
8. Chỉ block vàng trong lesson: “Nguồn nằm tại vị trí người học đang đọc.”
9. Nếu còn thời gian, mở **Xem luồng LangGraph** và chỉ `interrupt → resume → answer`.

## Lời nói ngắn đi cùng click

> “Câu hỏi này có nhiều cách hiểu. Gemini chỉ quyết định CLEAR, AMBIGUOUS hoặc REFUSE. Khi AMBIGUOUS, LangGraph dừng bằng interrupt. Người học chọn đúng intent, graph resume, rồi mới trả lời. Bấm nguồn sẽ quay lại và bôi đúng block trong lesson.”

## Case dự phòng

- **Correction:** bấm `Không phải ý này` → quay lại clarification.
- **Off-topic:** nhập “thời tiết Hà Nội hôm nay?” → kỳ vọng REFUSE và kéo về VLearn.
- **Nếu Gemini lỗi/rate limit:** không retry live nhiều lần; phát `artifacts/demo-backup.mp4` và mở `evidence/cp3-e2e-trace.json`.

## Không nên làm khi demo

- Không chạy cả 36 case trước giám khảo.
- Không mở raw API key hoặc `.env`.
- Không nói “100% chính xác”; CP3 chính thức là 18/20.
- Không trình bày v0–v3 trước demo chính; để Q&A.
- Không dùng thuật ngữ `interrupt/checkpointer` trước khi người nghe thấy pain và hành vi UI.

## Q&A nhanh

- **Vì sao phải hỏi lại?** Live VLearn: 2/10 ambiguity case hỏi lại đúng; `cho tôi link` trả nhầm repo 3A.
- **Ngoài phạm vi thì sao?** VLearn thật và prototype đều REFUSE 5/5 off-topic case.
- **Kết quả model?** Golden CP3 18/20; expanded v2 đạt 20/20, v3 đạt multi-turn 5/5 và safety 12/12.
- **Nguồn có bịa không?** Option lấy từ fixture có `source_id` trích từ lesson/session context; production cần nối API lesson thật.
