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
2. Với citation: tiếp tục lọc `is_preset = False`, đếm `has_citation = False`.
3. Với clarification: trên toàn bộ K4, đếm `move_used = ask_probing_question`.
4. Kiểm tra các turn minh họa bằng `turn_id`; chỉ đưa đoạn trích ngắn vào repo Public.

Kết quả hiện tại nằm trong `a1-mining-results.json`. Nếu chạy lại ra số khác, phải ghi rõ snapshot và lý do; không sửa số để khớp mục tiêu.
