# CP3 — Video thao tác 30 giây

**File nộp:** `evidence/video/CP3-30s-ambiguity-end-to-end.mp4`

**Trạng thái:** Đã nộp Google Form CP3 và nhận thông báo “Hệ thống đã ghi lại câu trả lời của bạn”. Ảnh xác nhận: `evidence/screenshots/cp3-form-submitted.png`.

- Thời lượng: 30,0 giây.
- Khung hình: 1600 × 900, H.264.
- Case: `phần kia nghĩa là sao`.
- Luồng: nhận input mơ hồ → hard guard phân loại `AMBIGUOUS` → dừng tại clarification → học viên chọn `Tìm pain có bằng chứng` → Tutor trả lời → mở và bôi đúng block nguồn trong bài.
- Case mơ hồ chạy tất định, không cần API key; lượt này báo `0 tokens` vì hard guard xử lý trước model.

## Số đo báo cáo kèm video

- Baseline Tutor VLearn live: hỏi lại đúng **2/11**, tự suy đoán **9/11** case ambiguity đã thử.
- Bộ production regression hiện tại: **20/20**.
- Bộ ambiguity có hệ thống đã chạy: **36/36**.
- Kết quả CP3 lịch sử đã khóa: **18/20**; không ghi đè bằng kết quả chạy sau.

Ảnh nguồn của lỗi live tương ứng: `evidence/screenshots/vlearn-ambiguity-phan-kia-auto-guess.png`.
