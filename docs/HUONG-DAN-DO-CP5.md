# Hướng dẫn Vũ Huy Đô — willing-user validation và commit không conflict

## Kết luận trước

- Không commit hai file ZIP vào repository.
- Đô chỉ dùng `KINGPRO_DO_EVIDENCE_DEMO.zip` để GPT đọc yêu cầu và bối cảnh.
- Không giải nén ZIP đè lên repo: snapshot trong ZIP cũ hơn `main` hiện tại.
- Đô chỉ sửa hoặc tạo file trong `validation/`. Không sửa backend, UI, `spec.md`, kết quả CP3 hay Quality Bar.

## Bước 1 — Chấp nhận quyền cộng tác GitHub

Đăng nhập tài khoản GitHub `dovh25`, mở email/thông báo mời cộng tác repo và bấm **Accept invitation**.

Repo: <https://github.com/Clownnvd/K4-3B-E403-kingpro>

## Bước 2 — Clone một bản mới để không conflict

Mở terminal tại thư mục làm việc riêng rồi chạy:

```bash
git clone https://github.com/Clownnvd/K4-3B-E403-kingpro.git K4-3B-E403-kingpro-do
cd K4-3B-E403-kingpro-do
git switch -c do/evidence-validation-demo
```

Không dùng lại thư mục repo cũ và không copy toàn bộ ZIP vào thư mục vừa clone.

## Bước 3 — Đưa đúng tài liệu cho GPT của Đô

Tải lên GPT file:

```text
KINGPRO_DO_EVIDENCE_DEMO.zip
```

Sau đó dán prompt này:

```text
Bạn đang hỗ trợ phần willing-user validation của dự án VLearn Clarification Tutor.

Đọc README_FOR_GPT.md và validation/WILLING-USER-FORM.md trong ZIP để hiểu nhiệm vụ. Repo local hiện tại mới clone từ main và là nguồn code mới nhất; ZIP chỉ là snapshot tham khảo, tuyệt đối không chép đè file cũ từ ZIP vào repo.

Phạm vi được sửa:
- validation/README.md
- validation/WILLING-USER-FORM.md nếu cần làm rõ câu hỏi
- tạo validation/DO-RAW-NOTES.md
- tạo validation/DO-MISMATCH-REPORT.md

Không được sửa:
- spec.md và Quality Bar
- codebase/agent hoặc codebase/web
- eval/cp3-results.json, golden-set hoặc các số đo đã khóa
- quote hoặc phản hồi của người dùng

Nhiệm vụ:
1. Chuẩn bị Google Form theo validation/WILLING-USER-FORM.md.
2. Chỉ điền log sau khi Trần Thanh Thái và Phan Đại Cương đã trực tiếp dùng prototype.
3. Với mỗi người ghi task, thiết bị, thời gian, chỗ dừng quá 5 giây, quote nguyên văn và quyết định sản phẩm.
4. Không bịa quote, không sửa số, không đưa password, token, API key hoặc dữ liệu khóa học vào repo.
5. Kiểm tra video CP3 đúng 30 giây và số trong tài liệu khớp 18/20; ghi mismatch vào validation/DO-MISMATCH-REPORT.md, không tự sửa số.
6. Chỉ chuẩn bị diff trong validation/. Sau khi xong, liệt kê chính xác file đã thay đổi và lệnh kiểm tra.
```

## Bước 4 — Tạo Google Form

Dùng nội dung trong `validation/WILLING-USER-FORM.md`. Form phải có các câu chính:

1. Họ tên và MSSV.
2. Thiết bị sử dụng.
3. Task đã hoàn thành.
4. Có hoàn thành mà không cần hướng dẫn không.
5. Dừng hoặc phân vân lâu nhất ở đâu, vì sao.
6. Sau khi chọn một phương án, họ nghĩ Tutor sẽ làm gì.
7. “Xem nguồn trong bài” có giúp kiểm chứng không, thang 1–5.
8. Một câu nói nguyên văn trong lúc sử dụng.
9. Nếu chỉ sửa một điểm thì muốn sửa gì.
10. Có sẵn sàng dùng lại trên VLearn không, kèm lý do.

Không hỏi “sản phẩm có tốt không” và không gợi ý đáp án.

## Bước 5 — Giao task cho hai willing users

### Trần Thanh Thái — 2A202602454

```text
Mở Tutor → hỏi “đáp án gì” → dùng ô tự nhập để nói rõ câu hỏi → thử nút “Không phải ý này”.
```

### Phan Đại Cương — 2A202607123

```text
Mở bằng điện thoại → hỏi “phần kia nghĩa là sao” → chọn “Tìm pain có bằng chứng” → bấm “Xem nguồn trong bài” và tìm block được bôi sáng.
```

Trong lúc họ thao tác:

- Không giải thích trước tính năng.
- Ghi thời điểm bắt đầu và kết thúc.
- Ghi đúng vị trí họ dừng quá 5 giây.
- Chép nguyên văn câu họ nói, kể cả sai chính tả.
- Không biến lời kể lại thành quote.

## Bước 6 — Điền file kết quả

Cập nhật hai dòng của Đô trong `validation/README.md`:

```text
Người dùng | Task | Quan sát | Quote nguyên văn | Quyết định
```

Tạo `validation/DO-RAW-NOTES.md` theo mẫu:

```markdown
## Trần Thanh Thái — 2A202602454
- Thời gian:
- Thiết bị:
- Task:
- Hoàn thành: Có/Không
- Chỗ dừng >5 giây:
- Quote nguyên văn:
- Quan sát:

## Phan Đại Cương — 2A202607123
- Thời gian:
- Thiết bị:
- Task:
- Hoàn thành: Có/Không
- Chỗ dừng >5 giây:
- Quote nguyên văn:
- Quan sát:

## Tổng hợp
- Chủ đề lặp lại:
- Đề xuất sửa trước demo:
- Giữ nguyên và lý do:
- Để dành sau:
```

Nếu người dùng chưa test thì giữ `Chờ test`; tuyệt đối không điền thay.

## Bước 7 — Kiểm tra trước commit

```bash
git status
git diff -- validation/
git diff --check
```

Phải bảo đảm:

- Chỉ có file trong `validation/` thay đổi.
- Không có `.env`, key, cookie, thư mục data hoặc file ZIP.
- Không thay kết quả 18/20.
- Không có quote do nhóm tự viết.

## Bước 8 — Commit và push branch

```bash
git add validation/
git commit -m "test: add willing-user validation evidence"
git push -u origin do/evidence-validation-demo
```

Gửi Duy ba thứ:

1. Hash commit.
2. Link branch hoặc pull request.
3. Link Google Form và xác nhận Thái/Cương đã điền.

Link mở pull request:

<https://github.com/Clownnvd/K4-3B-E403-kingpro/compare/main...do/evidence-validation-demo?expand=1>

## Nếu Git báo conflict

Không copy ZIP đè lên để xử lý. Chạy:

```bash
git fetch origin
git rebase origin/main
```

Nếu conflict nằm ngoài `validation/`, chạy:

```bash
git rebase --abort
```

Sau đó gửi ảnh lỗi và hash commit cho Duy xử lý. Không force-push vào `main`.
