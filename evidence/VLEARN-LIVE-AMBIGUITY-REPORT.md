# Live test VLearn Tutor — ambiguity inputs

**Trang:** Bài 16 · Mini Hackathon trên `vlearn.dev`  
**Ngày chạy:** 18/09/2026  
**Tiêu chí pass nghiêm ngặt:** Tutor phải hỏi thông tin còn thiếu **trước** khi đưa nội dung trả lời hoặc chọn một cách hiểu.

## Kết quả

**2/11 pass = 18,2%.** Mười case đầu nằm trong `evidence/vlearn-ambiguity-live-suite.json`; case A11 và ảnh chụp được lưu riêng để giữ đủ lịch sử hội thoại.

| ID | Input | Nhóm lỗi | Kết quả | Quan sát |
|---|---|---|---|---|
| A01 | `cho tôi link` | Thiếu đối tượng | Fail | Trả thẳng repo lớp 3A |
| A02 | `form đâu` | Thiếu đối tượng | Fail | Suy diễn quy trình nộp form |
| A03 | `repo nào` | Thiếu đối tượng | Fail | Hướng dẫn tạo repo trước khi hỏi loại repo |
| A04 | `đáp án gì` | Thiếu ID câu | Fail | Giải thích “không có đáp án duy nhất” và giả định CP1 |
| A05 | `cái này là gì` | Đại từ không tham chiếu | Fail | Tự hiểu là phần mở đầu Mini Hackathon |
| A06 | `giải thích đoạn trên` | Thiếu selection | Fail | Tự tóm tắt toàn bộ phần chuẩn bị |
| A07 | `nó sai ở đâu` | Đại từ không tham chiếu | **Pass** | Yêu cầu lỗi/bước cụ thể trước |
| A08 | `cgi` | Acronym/typo | Fail | Bỏ qua khả năng typo và trả checklist CP1 |
| A09 | `giúp tôi với` | Thiếu task | Fail | Đưa hướng dẫn CP1 rồi mới hỏi |
| A10 | `câu này đúng không` | Thiếu nội dung câu | **Pass** | Yêu cầu gửi câu lệnh/nội dung trước |
| A11 | `phần kia nghĩa là sao` | Tham chiếu mơ hồ, phụ thuộc lịch sử | Fail | Nói “có lẽ là Quality Bar” rồi giải thích dài, không xác nhận “phần kia” |

## Phát hiện phụ

- Tutor nhiều lần dùng cú pháp và link **K4-3A** trong trang lớp **3B**.
- Tutor nhắc `TEAMMATES.md` dù repo đề bài 3B hiện tại không yêu cầu file này.
- Lỗi ambiguity và lỗi source/context cộng hưởng: một suy đoán sai có thể kéo theo nguồn sai nhưng câu trả lời vẫn rất tự tin.
- A11 thể hiện đúng cơ chế lỗi cần xử lý: Tutor nhận ra sự bất định qua cụm “có lẽ là” nhưng vẫn tiếp tục trả lời thay vì chuyển sang hỏi lại.

### Bằng chứng A11

- Transcript có ngữ cảnh: `evidence/vlearn-ambiguity-phan-kia.json`.
- Ảnh chụp trực tiếp: `evidence/screenshots/vlearn-ambiguity-phan-kia-auto-guess.png`.

## Bộ case đầy đủ

`eval/vlearn-ambiguity-cases.json` có 36 case theo User Input Grid:

1. Thiếu đối tượng.
2. Đại từ/selection không rõ.
3. Thiếu ID câu hỏi.
4. Resource chung chung.
5. Acronym hoặc typo.
6. Thiếu hành động/mục tiêu.
7. Thiếu scope/version.
8. Ellipsis phụ thuộc lịch sử.
9. Nhiều intent trong một câu.

Không có khái niệm “toàn bộ mọi câu chữ”; 36 case này là coverage có hệ thống theo các chiều làm thay đổi hành vi đúng.
