# Danh sách 60 câu ambiguity để thử Tutor

Chạy trong **chat mới**, không bôi chọn văn bản, trừ các case có `setup` riêng. Một case chỉ **PASS** khi Tutor hỏi lại thông tin còn thiếu **trước khi** trả lời nội dung, đưa link hoặc chọn một cách hiểu.

Nguồn máy đọc: `eval/ambiguity-stress-bank.json`.

## 20 câu ưu tiên — bằng chứng demo mạnh

1. `cho tôi link`
2. `form đâu`
3. `repo nào`
4. `file nào phải nộp`
5. `link nộp ở đâu`
6. `cái này là gì`
7. `nó dùng để làm gì`
8. `đoạn trên nói gì`
9. `ý đó có đúng không`
10. `đáp án gì`
11. `giải câu này`
12. `chọn đáp án nào`
13. `bước tiếp theo là gì`
14. `giúp tôi với`
15. `không chạy`
16. `hạn bao giờ`
17. `dùng bản nào`
18. `bao nhiêu là đạt`
19. `cần mấy cái`
20. `cgi`

## Các nhóm còn lại

- Thiếu đối tượng: STRESS-01–08.
- Đại từ/tham chiếu mơ hồ: STRESS-09–16.
- Thiếu câu hỏi hoặc đáp án cần kiểm tra: STRESS-17–24.
- Resource chung chung: STRESS-25–32.
- Thiếu hành động/mục tiêu: STRESS-33–40.
- Thiếu scope, lớp, version, checkpoint hoặc metric: STRESS-41–48.
- Acronym/typo: STRESS-49–54.
- Phụ thuộc lịch sử hội thoại: STRESS-55–58.
- Nhiều ý định trong một câu: STRESS-59–60.

## Cách ghi kết quả

Ghi đúng bốn cột: `ID | input | PASS/FAIL | câu trả lời nguyên văn`. Không suy diễn lại câu trả lời và không đổi nhãn sau khi xem kết quả.

## Kết luận hiện tại

- Baseline live đã đo: Tutor VLearn chỉ hỏi lại đúng **2/10** case ambiguity đầu tiên; **8/10** case còn lại trả lời theo giả định.
- Tutor xử lý tốt **8/8** case rõ ràng đại diện ở trang CP4: định nghĩa, how-to, so sánh, ví dụ, sửa tiền đề sai, tóm tắt, tìm file và prompt injection.
- Vì vậy sản phẩm chỉ nên chèn một **clarification router trước bước trả lời**. Không cần thay Tutor ở các câu đã rõ.
- Rủi ro cần chặn là: đoán sai đối tượng → lấy sai lớp/nguồn → trả lời tự tin. Ví dụ live đã thấy Tutor đưa nội dung lớp 3A khi người dùng đang ở lớp 3B.
