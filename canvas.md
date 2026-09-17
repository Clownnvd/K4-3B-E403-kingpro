# Canvas CP1 — Track A · A1 Clarify First

> Hạn CP1 lớp 3B: **19:30 ngày 17/9**. Bản này dùng để copy trực tiếp vào form CP1.

## 1. Track + đề

**Track A · VLearn Tutor — A1 tối ưu Tutor hiện có:** Tutor phải hỏi lại trước khi trả lời câu hỏi chưa đủ rõ.

## 2. Job executor

Một học viên K4 đang đọc bài trên VLearn và gõ một câu ngắn để hỏi về nội dung mình chưa hiểu.

## 3. Pain một câu

Khi câu hỏi thiếu đối tượng hoặc ý định, Tutor vẫn chọn một cách hiểu và trả lời ngay, khiến học viên nhận hướng dẫn sai ngữ cảnh rồi phải hỏi lại hoặc tự kiểm tra.

## 4. Bằng chứng đầu

1. Trong 3.097 lượt K4 của `tutor_turns.csv`, Tutor chỉ dùng `ask_probing_question` **6 lần = 0,19%**. Script tái lập tại `evidence/count_tutor_failures.py`; heuristic tạo danh sách ứng viên để review thủ công, không tự gán nhãn lỗi.
2. Kiểm thử trực tiếp ngày 17/09 trên Bài 16 lớp 3B: **4/4 câu mơ hồ** (`đáp án gì`, `cgi`, `cái này là gì`, `cho tôi link`) đều được Tutor trả lời theo giả định trước khi xác nhận ý định. Câu `cho tôi link` trả repo lớp 3A dù người dùng đang ở lớp 3B. Biên bản rút gọn: `evidence/a1-live-check-2026-09-17.md`.

## 5. Lát cắt MỘT CÂU

Một học viên đang đọc một bài trên VLearn và gửi câu hỏi mơ hồ · AI quyết định câu hỏi chưa đủ thông tin để trả lời · giao diện đưa tối đa ba cách hiểu theo ngữ cảnh cùng ô nhập bổ sung · học viên chọn hoặc sửa ý rồi nhận câu trả lời đúng ý định ngay lượt kế tiếp.

## 6. AI tự làm đến đâu + lý do + willing users

**AI tự làm có điều kiện:** phát hiện tín hiệu mơ hồ và đề xuất tối đa ba cách hiểu dựa trên bài đang mở. **LangGraph kiểm soát luồng:** nếu thiếu ý định thì bắt buộc đi qua node `clarify` và `interrupt`; chỉ sau khi người dùng chọn hoặc nhập bổ sung mới được đi tiếp sang node trả lời. **Người dùng giữ quyền quyết định:** có thể chọn, sửa hoặc hủy. Lý do: đoán sai ý định có thể tạo câu trả lời trôi chảy nhưng sai ngữ cảnh, như link lớp 3A trong bài lớp 3B.

**Willing users ngoài nhóm đã đồng ý dùng thử:** Lê Thị Thùy Trang — `2A202602678`; Trần Thanh Thái — `2A202602454`; Phan Đại Cương — `2A202607123`.

## 7. Phân công có tên

- **Nguyễn Văn Duy:** đội trưởng; Canvas/spec; LangGraph router + interrupt; tích hợp và nộp CP1–CP5.
- **Dương Thị Ngân:** UX thẻ lựa chọn, ô nhập bổ sung, correction; user validation và changelog.
- **Vũ Huy Đô:** mining evidence; golden set câu mơ hồ; chấm Pass/Fail; số đo CP3 và video demo.
