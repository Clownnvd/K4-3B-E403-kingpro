# Evidence A1 — Mining Tutor K4

Thư mục này chỉ chứa **phương pháp đếm và kết quả tổng hợp**. Không commit `tutor_turns.csv` hoặc dữ liệu nội bộ khóa học.

## Chạy lại

```powershell
python evidence/count_tutor_failures.py `
  --input "<đường-dẫn-local>/tutor_turns.csv" `
  --output evidence/a1-mining-results.json
```

## Phép đếm dùng trong Canvas

1. Chọn `cohort_hint = K4`.
2. Với clarification: trên toàn bộ K4, đếm `move_used = ask_probing_question`.
3. Tạo ứng viên mơ hồ để **review thủ công** bằng heuristic: `is_preset=False`, `q_len<=55`, không dùng `ask_probing_question`, nhưng `reply_len>=250`. Heuristic không tự chứng minh một lượt là lỗi.
4. Kiểm tra các turn minh họa bằng `turn_id`; chỉ đưa đoạn trích ngắn vào repo Public.
5. Đối chiếu bằng kiểm thử trực tiếp trong `a1-live-check-2026-09-17.md`.

Kết quả hiện tại nằm trong `a1-mining-results.json`. Nếu chạy lại ra số khác, phải ghi rõ snapshot và lý do; không sửa số để khớp mục tiêu.
