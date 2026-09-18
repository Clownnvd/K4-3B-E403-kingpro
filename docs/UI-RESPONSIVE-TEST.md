# Báo cáo kiểm tra UI giả lập VLearn

## Phạm vi

- Giao diện chỉ mô phỏng quy trình **Trợ giảng AI bên trong VLearn**.
- Quyết định AI trung tâm: câu hỏi đã đủ rõ để trả lời hay phải hỏi lại.
- Logic CP2 đang mock; chưa gọi API và chưa chạy LangGraph backend thật.

## Ma trận màn hình

| Kích thước | Hành vi mong đợi | Kết quả |
|---|---|---|
| 1536 × 824 | Dàn bài + bài học + Tutor cùng hiển thị; không tràn ngang | Pass |
| 1024 × 768 | Dàn bài thành drawer; bài học và Tutor không bị ép | Pass |
| 390 × 844 | Bài học toàn chiều rộng; Tutor mở thành drawer toàn màn hình | Pass |

Đo lại ngày 18/09/2026:

| Viewport | `clientWidth` | `scrollWidth` | Overflow ngang |
|---:|---:|---:|---|
| 1536 × 824 | 1521 | 1521 | Không |
| 1024 × 768 | 1009 | 1009 | Không |
| 390 × 844 | 390 | 390 | Không |

## Smoke test tương tác

Kết quả: **28/28 phép kiểm tra đạt**. Chi tiết máy đọc được ở `codebase/web/ui-smoke-results.json`.

- 4/4 case hiển thị đúng câu hỏi và prompt làm rõ.
- 4/4 case chọn option → resume → xuất hiện câu trả lời.
- 4/4 case bấm correction → quay lại clarification.
- Custom input → resume thành công.
- Correction lần hai → dừng an toàn.
- Drawer dàn bài tablet mở/đóng đúng.
- Drawer Tutor mobile ẩn ban đầu, mở đủ chiều cao và đóng được.

## UX validation review — Ngân — 18/09/2026

### Vấn đề trước khi sửa

- Trên mobile, nút nguồn đã bôi đúng block lesson nhưng Tutor vẫn phủ toàn màn hình, nên người học không nhìn thấy kết quả của hành động.
- Drawer bị đóng chỉ bằng nút hoặc lớp phủ; chưa khóa focus, chưa trả focus về nút mở và nội dung nằm ngoài màn hình vẫn có thể lọt vào tab order.
- Payload runtime chưa có chốt bảo vệ số lượng lựa chọn ở lớp hiển thị.
- Scenario picker thiếu quan hệ `aria-controls`, `listbox/option` và hành vi `Escape` riêng.

### Thay đổi và ảnh hưởng

- `Xem nguồn trong bài` trên mobile đóng Tutor, cuộn tới block nguồn, bôi sáng và chuyển focus tới block đó. Desktop/tablet giữ nguyên bố cục song song.
- Drawer responsive dùng `dialog`, `aria-modal`, `aria-hidden` và `inert` đúng trạng thái; khóa cuộn nền, giữ focus trong drawer, hỗ trợ `Escape` và trả focus về nút mở.
- UI chỉ render tối đa ba clarification option cộng một lựa chọn tự nhập, kể cả khi runtime trả nhiều hơn.
- Bổ sung trạng thái live cho loading, cảnh báo failure và semantics bàn phím cho scenario picker.
- Tăng touch target quan trọng trên mobile và giữ hỗ trợ `prefers-reduced-motion`.

### Kết quả sau sửa

- **15/15** kiểm tra UX tự động đạt: responsive, drawer/focus/Escape, custom input, correction hai vòng, safe failure và source reveal.
- `pnpm lint`: pass.
- `pnpm typecheck`: pass.
- `pnpm build`: pass với Next.js 16.3.5.
- React Doctor: **92/100**; còn một cảnh báo maintainability về độ phức tạp của `TutorPanel`, không phải lỗi hành vi hoặc accessibility.
- Không thay đổi backend Gemini/LangGraph, golden set hay số đo 18/20.

## Ảnh kiểm chứng

- `docs/screenshots/vlearn-desktop.png`
- `docs/screenshots/vlearn-tablet.png`
- `docs/screenshots/vlearn-mobile-lesson.png`
- `docs/screenshots/vlearn-mobile-tutor.png`
