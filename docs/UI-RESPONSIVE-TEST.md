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

Đo trên màn hình desktop cuối: `scrollWidth = clientWidth = 1521`, không có overflow ngang.

## Smoke test tương tác

Kết quả: **28/28 phép kiểm tra đạt**. Chi tiết máy đọc được ở `codebase/web/ui-smoke-results.json`.

- 4/4 case hiển thị đúng câu hỏi và prompt làm rõ.
- 4/4 case chọn option → resume → xuất hiện câu trả lời.
- 4/4 case bấm correction → quay lại clarification.
- Custom input → resume thành công.
- Correction lần hai → dừng an toàn.
- Drawer dàn bài tablet mở/đóng đúng.
- Drawer Tutor mobile ẩn ban đầu, mở đủ chiều cao và đóng được.

## Ảnh kiểm chứng

- `docs/screenshots/vlearn-desktop.png`
- `docs/screenshots/vlearn-tablet.png`
- `docs/screenshots/vlearn-mobile-lesson.png`
- `docs/screenshots/vlearn-mobile-tutor.png`
