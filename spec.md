# AI SPEC — Tutor hỏi lại trước câu mơ hồ · Nhóm kingpro · Zone C1

**Hướng:** A — VLearn Tutor · **Loại:** Tối ưu tính năng có sẵn
**Trạng thái kỹ thuật:** UI VLearn responsive + LangGraph `interrupt/resume` chạy thật; node `classify_ambiguity` dùng duy nhất `gemini-3.5-flash-lite`; key chỉ nằm trong environment local.

## §1. User & Job

- **Job executor:** Học viên K4 đang đọc một bài trên VLearn và gõ câu ngắn để hỏi về phần chưa hiểu.
- **Core JTBD:** Khi chưa biết phải diễn đạt câu hỏi thế nào, học viên muốn hệ thống giúp xác định đúng ý định để không nhận câu trả lời sai ngữ cảnh.
- **Problem statement:** Tutor hiện có thể chọn một cách hiểu và trả lời trước khi biết học viên đang hỏi đối tượng nào.
- **Evidence B — mining tái lập:** `tutor_turns.csv` có 3.097 lượt K4 nhưng chỉ 6 lượt dùng `ask_probing_question` = **0,19%**. Script: `evidence/count_tutor_failures.py`.
- **Evidence trực tiếp:** 4/4 câu thử trên VLearn (`đáp án gì`, `cgi`, `cái này là gì`, `cho tôi link`) bị trả lời theo giả định trước khi xác nhận; `cho tôi link` trả repo 3A trong trang lớp 3B.
- **Ví dụ kiểm chứng:** live 4 case nêu trên; chatlog `T11228` và `T11653`; biên bản `evidence/a1-live-check-2026-09-17.md`.

## §2. Impact & quyết định chọn

| Ứng viên | Quy mô/tín hiệu | Hậu quả mỗi lần | Khả thi 39 giờ | Quyết định |
|---|---:|---|---|---|
| Thiếu citation | 838/2.555 free-text | Khó kiểm chứng | Trung bình | Loại để tránh hai vấn đề |
| Trả lời quá dài | Median 995 ký tự | Tốn thời gian đọc | Cao | Loại |
| **Đoán ý khi câu mơ hồ** | probing 6/3.097; live fail 4/4 | Sai ngữ cảnh, sai link | **Cao** | **Chọn** |

Impact đo bằng: tỷ lệ câu mơ hồ được hỏi lại **trước** khi có nội dung trả lời; số lượt cần để học viên xác nhận đúng ý.

## §3. Giải pháp tương tự đã nghiên cứu

- **VLearn Tutor hiện tại:** có lịch sử bài đang mở nhưng câu mơ hồ vẫn có thể bị trả lời theo một giả định; giữ panel chat và context bài, thay routing.
- **ChatGPT clarification pattern:** thường hỏi một câu tự do; nhóm dùng tối đa ba lựa chọn + ô tự nhập để giảm công sức diễn đạt.
- **HAX/PAIR graceful failure:** hỏi lại khi không chắc, cho phép correction và không tạo output trước khi xác nhận.

## §4. Thiết kế

- **Lát cắt một câu:** Một học viên đang đọc bài trên VLearn và gửi câu hỏi mơ hồ · router quyết định ý định chưa đủ rõ · Tutor hiện tối đa ba cách hiểu và ô tự nhập · học viên xác nhận rồi nhận câu trả lời đúng ý ở lượt kế tiếp.
- **Non-goals:** không trả lời mọi kiến thức ngoài VLearn; không thay retrieval/citation toàn hệ thống; không làm hộ quiz; không quản lý tài khoản/điểm; không tự gửi form.
- **Mức prototype:** **Working vertical slice**. Thật: UI, state, LangGraph, checkpointer, `interrupt`, `Command(resume)`, Gemini classifier, trace. Mock: dữ liệu bài học và ba option allowlist.
- **Automation:** conditional/augment. Hệ thống tự phát hiện và đề xuất cách hiểu; học viên giữ quyền chọn, nhập khác, hủy hoặc correction. Cost-of-error của đoán sai cao hơn một lượt hỏi lại.

### §4b. HAX/PAIR

| Nguyên tắc | Vị trí cụ thể trong prototype |
|---|---|
| HAX G1 — Làm rõ hệ thống làm được gì | Context “Đang mở trên VLearn” và badge `GEMINI · LANGGRAPH` |
| HAX G2 — Nói rõ mức chắc chắn | Card “Cần làm rõ · chưa trả lời” nêu lý do |
| HAX G10 — Thu hẹp khi nghi ngờ | Node `classify_ambiguity → build_options → interrupt` |
| HAX G11 — Cho sửa khi AI sai | Nút “Không phải ý này” quay lại clarification |
| PAIR Feedback + Control | Ba option, “Khác — tự nhập”, hủy/đóng Tutor |
| PAIR Explainability + Trust | Dải “Xem nguồn trong bài” bôi sáng block nguồn trong lesson |

## §5. Kiểu lỗi — 4 lớp và ≥8 kịch bản

| Tình huống | Lớp | Hành vi mong muốn | Nguyên tắc |
|---|---|---|---|
| “cho tôi link” có ba link hợp lệ | ① nguồn sự thật | Hỏi loại link; không trả link trước | G10 |
| Link lớp 3A xuất hiện trong bài 3B | ① | Chỉ đưa option từ context lớp 3B | G2 |
| “đáp án gì” thiếu số câu | ② mơ hồ | Hỏi câu quiz/bài tập/checkpoint nào | G10 |
| “cái này là gì” không có selection | ② | Yêu cầu chọn đoạn hoặc nhập đối tượng | G10 |
| Xin điểm/MSSV người khác | ③ thẩm quyền | Không truy cập; nêu giới hạn | PAIR graceful failure |
| Yêu cầu tự nộp form | ③ | Không hành động thay; hướng dẫn người dùng | G1 |
| “cgi” là typo hoặc viết tắt | ④ domain | Đưa cách hiểu trong ngữ cảnh VLearn | G5 |
| Vẫn mơ hồ sau hai vòng | ④ | Dừng an toàn và gợi ý cách hỏi cụ thể | G11 |

## §6. Bốn đường đi trải nghiệm

- **Happy path:** câu rõ → router `CLEAR` → tiếp tục retrieval/trả lời.
- **Low-confidence:** câu mơ hồ → tối đa ba option + custom → `interrupt` → người dùng chọn → `resume` → trả lời.
- **Failure/no-grounding:** hai vòng vẫn mơ hồ → dừng, chưa tạo câu trả lời, hướng dẫn chọn đoạn.
- **Correction:** bấm “Không phải ý này” → bỏ intent cũ → hỏi lại; sau vòng hai chuyển failure.
- **Nguồn:** sau câu trả lời chỉ có dải nhỏ “Xem nguồn trong bài”; bấm vào cuộn tới và bôi sáng block lesson, không chèn hộp căn cứ dài dưới câu trả lời.

## §7. Kiểm thử

- **Golden set:** `eval/golden-set.json` 20 case; thêm 5 multi-turn và 12 safety case.
- **Định nghĩa pass:** route khớp nhãn; không xuất answer trước `interrupt`; resume giữ cùng `thread_id`; option `team-repo` trả đúng URL; không có overflow ngang ở 1536/1024/390.
- **Quality bar đã chốt:** **≥90% routing accuracy**, và hard cases G01/G05/G07/G08 đều pass.
- **Lượt Gemini hiện tại:** 18/20 = **90%**, hard cases pass; đạt quality bar. Hai lỗi: G11 `form đâu` và G12 `cho tôi link tải dữ liệu` bị đánh giá quá rõ; xem `eval/cp3-results.json`.
- **v0/v1:** 19/20 = 95%. **v2:** 20/20 = 100% (+5 điểm nhờ context/examples). **v3:** 19/20 = 95%, nhưng multi-turn 5/5 và safety 12/12. Production đề xuất v2 router + v3 safety guard.
- **UI smoke:** 28/28; `codebase/web/ui-smoke-results.json`.
- **E2E trace:** `evidence/cp3-e2e-trace.json` thể hiện `Gemini classify → interrupt → resume → answer` cùng token usage thật.

## §8. Phân công & kế hoạch

- **Nguyễn Văn Duy:** product lead; spec; LangGraph/Gemini; v0–v3; multi-turn và safety eval; `version_log.csv`; phân tích case fail; tích hợp; nộp checkpoint.
- **Dương Thị Ngân:** UX VLearn; clarification card; responsive; liên hệ Trang và Thái; tổ chức user test, ghi quote và changelog.
- **Vũ Huy Đô:** evidence mining; golden set cơ bản; liên hệ Cương và tìm 1 willing user dự phòng; kiểm tra tái lập số liệu; video CP3, slide và demo dự phòng.
- **Willing users:** Lê Thị Thùy Trang — 2A202602678; Trần Thanh Thái — 2A202602454; Phan Đại Cương — 2A202607123.
- **Validation task:** hỏi `cho tôi link`, chọn repo nhóm, mở nguồn, thử correction; ghi thời gian hoàn thành, điểm kẹt và quote nguyên văn.
- **Multi-prototype:** loại phương án chỉ dùng ô hỏi tự do; chọn ba option + custom vì nhanh hơn và vẫn giữ quyền kiểm soát.

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| 17/9 · CP1 | Thu hẹp từ grounded Tutor sang một lỗi ambiguity | Đúng yêu cầu một lát cắt |
| 17/9 · CP2 | Thêm flow Mermaid và mock bấm được | Chứng minh interrupt/resume |
| 17/9 | Đổi app độc lập thành giao diện VLearn | Tính năng chỉ phục vụ VLearn |
| 17/9 | Responsive: outline/Tutor thành drawer | Không ép bài học trên tablet/mobile |
| 17/9 | Nguồn chuyển thành dải nhỏ, bôi block lesson | Giảm nhiễu dưới câu trả lời |
| 17/9 | Chuyển provider từ Groq sang Gemini 3.5 Flash Lite | Groq key trả 403; Gemini key hoạt động và chỉ dùng một model |
| 18/9 | Source retrieval + SQLite + retry/log | Option có `source_id`, thread resume qua restart, provider có latency/error evidence |
| 18/9 | Cải tiến history + checkpoint boundary | v2 đạt base 100%; v3 đạt multi-turn 5/5 và safety 12/12 |
