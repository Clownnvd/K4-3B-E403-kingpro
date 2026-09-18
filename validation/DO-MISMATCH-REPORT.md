# Báo cáo đối soát số liệu & Video CP3 (DO-MISMATCH-REPORT)

**Người thực hiện:** Vũ Huy Đô (MSSV: 2A202602555)
**Mục tiêu:** Kiểm tra thời lượng video CP3, đối soát số liệu đánh giá 18/20 trên các tài liệu, ghi nhận các điểm lệch (mismatch) hoặc không đồng nhất; tuân thủ nguyên tắc không tự ý sửa số đã khóa.

---

## 1. Kiểm tra thời lượng Video CP3 & Video Demo

Kiểm tra bằng cách phân tích trực tiếp atom `mvhd` (timescale & duration) của định dạng MP4:

| File video | Vị trí | Thời lượng đo được | Yêu cầu | Đánh giá |
|---|---|---:|---:|---|
| `cp3-demo-30s.mp4` | `artifacts/` | **30,00s** (460800 / 15360) | Đúng 30 giây | **PASS** |
| `demo-backup.mp4` | `artifacts/` | **30,00s** (460800 / 15360) | Đúng 30 giây | **PASS** |
| `CP3-30s-ambiguity-end-to-end.mp4` | `evidence/video/` | **30,00s** (460800 / 15360) | Đúng 30 giây | **PASS** |

**Kết luận:** Cả 3 file video liên quan đến CP3 và demo dự phòng đều đạt chuẩn thời lượng chính xác **30,0 giây**, không bị vượt hay hụt thời gian.

---

## 2. Đối soát số liệu CP3 (18/20 = 90%) trên các tài liệu

Kết quả gốc từ file chuẩn: `eval/cp3-results.json` (Lượt chạy chính thức đã khóa của CP3):
- **Model:** `gemini-3.5-flash-lite`
- **Số case đạt:** **18 / 20** (Tỷ lệ: **90,0%**)
- **Hard cases:** G01, G05, G07, G08 đều **PASS** (`hard_cases_pass: true`)
- **2 case thất bại:**
  - G11: `form đâu` (Dự đoán: `CLEAR` | Mong đợi: `AMBIGUOUS`)
  - G12: `cho tôi link tải dữ liệu` (Dự đoán: `CLEAR` | Mong đợi: `AMBIGUOUS`)

### Bảng đối soát trên các tài liệu trong dự án:

| Tài liệu kiểm tra | Vị trí / Mục | Số liệu ghi trong tài liệu | Khớp với 18/20 gốc? | Ghi chú |
|---|---|---|---|---|
| `CP3-SUBMISSION.md` | Dòng 6–7 | 18/20 = 90%, G01/G05/G07/G08 pass, 2 fail G11/G12 | **KHỚP 100%** | Khớp chính xác |
| `spec.md` | §7 Kiểm thử (dòng 74–75) | 18/20 = 90%, hard cases pass, 2 fail G11/G12 | **KHỚP 100%** | Khớp chính xác |
| `demo-slides.pptx` / `scripts/create_demo_slides.py` | Slide 5 (Evaluation) | 18/20, routing accuracy = 90%, Hard cases pass, 2 fail | **KHỚP 100%** | Khớp chính xác |
| `docs/PITCH-SCRIPT.md` | Mục 3:25–4:15 (dòng 26) | 18/20 = 90%, hard case pass, 2 fail G11/G12 | **KHỚP 100%** | Khớp chính xác |
| `eval/FULL-EVAL-REPORT.md` | Dòng 24 | "Con số CP3 đã khóa vẫn là 18/20" | **KHỚP 100%** | Khớp chính xác |
| `evidence/CP3-VIDEO.md` | Dòng 18 | "Kết quả CP3 lịch sử đã khóa: 18/20" | **KHỚP 100%** | Khớp chính xác |
| `docs/KNOWLEDGE-AUDIT-D01-D06.md` | Dòng 106, 120 | "18/20 = 90%; 2 fail giữ nguyên" | **KHỚP 100%** | Khớp chính xác |

---

## 3. Các điểm không đồng nhất (Mismatches) ghi nhận được

Dưới đây là các điểm không hoàn toàn trùng khớp giữa các tài liệu trong repo cần lưu ý cho nhóm và anh Duy duyệt, không tự ý sửa:

### Mismatch 1: Tên file và kịch bản video CP3 giữa `artifacts/` và `evidence/`
- **Hiện trạng:**
  - `CP3-SUBMISSION.md` trỏ tới: `artifacts/cp3-demo-30s.mp4`. Video này dựng từ chuỗi slide/ảnh E2E (`artifacts/video_frames/`) với kịch bản test case `cho tôi link`.
  - `evidence/CP3-VIDEO.md` trỏ tới: `evidence/video/CP3-30s-ambiguity-end-to-end.mp4`. Video này quay thao tác trực tiếp trên màn hình với kịch bản test case `phần kia nghĩa là sao`.
- **Đánh giá:** Cả hai video đều có thời lượng 30.0s và đều hợp lệ về mặt kỹ thuật, nhưng minh họa hai câu hỏi mơ hồ khác nhau (`cho tôi link` vs `phần kia nghĩa là sao`).
- **Khuyến nghị:** Giữ nguyên cả hai file; khi trình bày hoặc nộp bài, nêu rõ `artifacts/cp3-demo-30s.mp4` là bản nộp chính thức của CP3/CP5 theo root, còn `evidence/video/` là bản evidence quay live bổ sung cho case A11.

### Mismatch 2: Số liệu mẫu Probing của VLearn Live
- **Hiện trạng:**
  - `demo-slides.pptx` (Slide 2) & `scripts/create_demo_slides.py`: Ghi `2/10 case live hỏi lại đúng`, `8/10 case live trả lời theo giả định`.
  - `evidence/VLEARN-LIVE-AMBIGUITY-REPORT.md` & `evidence/CP3-VIDEO.md`: Ghi `2/11 pass = 18,2%`, `9/11 tự suy đoán` (do danh sách live có 11 case A01–A11, bổ sung case A11 `phần kia nghĩa là sao`).
  - `docs/PITCH-SCRIPT.md`: Dòng 5 ghi `Khi test live bốn câu mơ hồ, cả bốn đều bị trả lời trước khi ý định được xác nhận` (lấy mẫu hẹp 4 câu).
- **Đánh giá:** Slide 2 sử dụng bộ suite ban đầu 10 case (`evidence/vlearn-ambiguity-live-suite.json`), trong khi báo cáo evidence chi tiết tính thêm case A11 thành 11 case.
- **Khuyến nghị:** Giữ nguyên số trên slide theo script hiện tại; nếu giám khảo hỏi thì giải thích 2/10 là suite cơ bản, 2/11 là khi tính cả case A11 deep-context.

### Mismatch 3: Số đo sau cải tiến (20/20) so với số đo CP3 đã khóa (18/20)
- **Hiện trạng:** Trong `eval/FULL-EVAL-REPORT.md` và `spec.md`, hệ production sau khi thêm hard ambiguity guard đã đạt **20/20** trên golden set và **36/36** trên bộ mở rộng.
- **Đánh giá:** Tài liệu đã ghi chú rất rõ: "Con số CP3 đã khóa vẫn là 18/20. Kết quả 20/20 là regression sau CP3, không ghi đè lịch sử." Đây là việc tuân thủ quy tắc trung thực học thuật (Quality Bar & Evidence-first).

---

## 4. Kiểm tra số trang Slide CP5
- `demo-slides.pdf`: Kiểm tra cấu trúc PDF xác nhận có đúng **6 trang** (`/Type /Page`).
- `demo-slides.pptx`: Tạo từ `scripts/create_demo_slides.py` với đúng 6 hàm `base(...)` tương ứng 6 trang.
- Đạt yêu cầu CP5 (Slide đúng 6 trang).
