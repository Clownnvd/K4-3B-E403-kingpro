# Audit kiến thức D01–D06 — kingpro / VLearn Clarification Tutor

Ngày audit: 18/09/2026. Phạm vi là chuỗi học hiện tại từ Day 01 đến Mini Hackathon Day 05–06.

## Kết luận nhanh

Sản phẩm đang dùng đúng mạch kiến thức của khóa: **gọi model có cấu trúc (D01) → chọn đúng pain và metric (D02) → graph có state/interrupt/trace (D03) → prompt + schema + fixed eval (D04) → spec, HAX/PAIR, quality bar và demo có số (D05–06)**.

Ba khoảng trống lớn nhất:

1. Chưa có validation log và quote thật từ willing users, nên chưa được khai R6.
2. Chuỗi v0→v3 đã chạy nhưng cả bốn cùng 95%; chưa chứng minh improvement vì bộ base chưa đủ nhạy.
3. Chưa tích hợp vào VLearn production; giao diện hiện là bản mô phỏng.

## D01 — LLM API Foundation

**Kiến thức nguồn:** gọi LLM API; system prompt; temperature/top-p/max tokens; so sánh model về chất lượng/độ trễ/chi phí; token accounting; streaming; retry; conversation history; không commit key.

| Nội dung | Đã áp dụng | Bằng chứng | Còn thiếu |
|---|---|---|---|
| API provider | Có | Gemini `generateContent` trong `codebase/agent/app.py` | Chưa có abstraction đổi provider |
| Một model xuyên suốt | Có | `gemini-3.5-flash-lite` | Chưa benchmark model khác |
| System instruction | Có | Prompt ambiguity router | Chưa version prompt v0–v3 |
| Structured output | Có | JSON schema: `route/reason/confidence` | Chưa validator retry khi JSON lỗi |
| Tham số sinh | Có một phần | `temperature=0`, `maxOutputTokens=160` | Chưa khảo sát sensitivity temperature/top-p |
| Token/cost | Có | `usageMetadata`, tổng token trong trace/eval | Chưa đổi token thành chi phí tiền |
| Key hygiene | Có | `.env.example`, key chỉ ở environment; repo không chứa key | Cần rotation vì key từng được chia sẻ trong chat |
| Streaming | Chưa | — | UI chỉ loading rồi nhận kết quả trọn gói |
| Retry/backoff | Có | 3 lần, backoff 0,5s → 1s | Chưa jitter/circuit breaker |
| Conversation history | Một phần | LangGraph `thread_id` + checkpointer | In-memory, mất khi restart |

Nguồn: [K4 Day01 LLM API Exploration](https://github.com/VinUni-AI20k/K4-Day01-LLM-API-Exploration).

## D02 — Tìm đúng bài toán cho AI

**Kiến thức nguồn:** problem-first; problem scan; workflow; evidence; metric; boundary; so sánh Rule/Workflow/Agent; quyết định Go/Not Yet/No-Go.

| Nội dung | Đã áp dụng | Bằng chứng | Còn thiếu |
|---|---|---|---|
| Không solution-first | Có | Loại citation/verbosity, chọn ambiguity bằng số | — |
| Scan nhiều candidate | Có | Bảng 3 ứng viên trong `spec.md` §2 | Chưa lưu worksheet scan ban đầu đầy đủ |
| Evidence trước khi chọn | Có | 3.097 lượt, probing 6, live fail 4/4 | Cần khảo sát ≥20 người để đạt evidence A |
| Workflow as-is/to-be | Có | Mermaid + VLearn mock + LangGraph nodes | Chưa có timing workflow trước/sau |
| Metric đo kết quả | Có | routing accuracy, hard-case gate | Chưa đo time saved và số lượt hỏi lại thực tế |
| Boundary/non-goals | Có | `spec.md` §4, chỉ VLearn | — |
| Rule/Workflow/Agent decision | Một phần | Gemini chỉ ở ambiguity decision; option allowlist bằng rule | Chưa có scoring matrix chính thức |
| Go/Not Yet/No-Go | Chưa chốt rõ | — | Cần release decision dựa trên 90% và hai failure |

Nguồn: [K4 Day02 AI Product Labs](https://github.com/VinUni-AI20k/K4-Day02-AI-Product-Labs).

## D03 — Chatbot → ReAct/Agentic Agent

**Kiến thức nguồn:** bốn cấp AI; Agentic Fit; Thought/Action/Observation; tools; max iterations; guardrails; trace; hybrid decision flow; planning/memory bonus.

| Nội dung | Đã áp dụng | Bằng chứng | Còn thiếu |
|---|---|---|---|
| Agentic Fit | Có | Chỉ dùng graph vì cần state + HITL; không biến mọi câu thành agent | Chưa lưu scoring matrix D03 |
| State graph | Có | LangGraph `TutorState` | — |
| Human-in-the-loop | Có | `interrupt()` + `Command(resume)` | — |
| Trace/observability | Có | `receive → classify → build → interrupt → resume → answer` | Chưa có tracing platform/LangSmith |
| Guard max iteration | Có | Tối đa hai clarification rounds ở UI/spec | Backend demo mới dừng một vòng; limit hai vòng nằm frontend |
| Hybrid path | Có | `CLEAR` vs `AMBIGUOUS` | CLEAR hiện chỉ trả placeholder, chưa nối retrieval thật |
| Tool call | Chưa đầy đủ | Option selection là action nội bộ | Chưa có tool registry và Observation từ tool ngoài |
| ReAct loop | Chưa | — | Không có vòng Thought→Action→Observation đa bước |
| Planning/autonomous | Không chủ đích | Non-goal | Không cần cho lát cắt này |
| Persistent memory | Có ở prototype | SQLiteSaver; resume qua restart đã pass | Production nên dùng Postgres/Redis |
| Cross-audit/red-team | Một phần | 20 golden cases | Chưa có nhóm khác tấn công/phản biện |

Nguồn: [K4 Day03 Chatbot vs ReAct Agent](https://github.com/VinUni-AI20k/K4-Day03-Lab-Chatbot-vs-react-agent-E403).

## D04 — Prompt Engineering & Tool Calling

**Kiến thức nguồn:** baseline v0; giả thuyết mỗi lần sửa; prompt/tool contract; 30 base + 10 extension + 12 safety; 5 single-turn + 5 multi-turn; fixed eval; transcript; provider errors; UI hiện tool/input/result/version; confirm/cancel/correction.

| Nội dung | Đã áp dụng | Bằng chứng | Còn thiếu |
|---|---|---|---|
| System prompt rõ nhiệm vụ | Có | Gemini ambiguity router prompt | Cần tách prompt thành artifact versioned |
| Structured contract | Có | Gemini response schema + Pydantic request | Chưa có JSON Schema file độc lập |
| Hỏi lại khi thiếu định danh | Có | Clarification card | — |
| Confirmation/correction | Có | option/custom + “Không phải ý này” | — |
| UI trace | Có | model, token, route, LangGraph trace | Chưa hiện raw input/output kỹ thuật theo từng tool |
| Fixed golden set | Có | 20 case, quality bar chốt | Chưa đủ cấu trúc Day04 30+10+12 |
| 5 single + 5 multi-turn mới | Một phần | Có 5 multi-turn, đạt 2/5 | Cần sửa history format |
| 12 safety case | Có | Đạt 11/12 | S10 cần no-grounding guard |
| v0→v3 | Đã chạy | `version_log.csv`, bốn run cùng bộ | Cả bốn 95%; chưa chứng minh improvement |
| Provider error gate | Một phần | HTTP error trả 502 | Chưa log `provider_error_cases == 0` trong eval report |
| Transcript | Có một phần | E2E trace JSON + video frames | Chưa lưu transcript hội thoại chuẩn hóa từng turn |

Nguồn: [K4 L3B Day04 Prompt & Tool Calling](https://github.com/VinUni-AI20k/K4-L3B-Day04-Prompt-Engineering-Tool-Calling-Labs).

## D05–D06 — Mini Hackathon AI Product

**Kiến thức nguồn:** Canvas 7 dòng; one-sentence slice; evidence A/B; cost-of-error; automation boundary; HAX/PAIR; 4 failure paths; ≥8 scenarios; golden set ≥20; AI call thật; CP3 video + số; CP4 quality bar; CP5 6-slide PDF + backup video; user validation; pitch.

| Nội dung | Đã áp dụng | Bằng chứng | Còn thiếu |
|---|---|---|---|
| Canvas 7 dòng | Có | `canvas.md`, CP1 đã nộp | — |
| Lát cắt một câu | Có | 1 user · 1 việc · 1 decision · 1 outcome | — |
| Evidence B tái lập | Có | script mining + turn IDs + live test | Cần evidence A khảo sát ≥20 nếu muốn tối đa R1 |
| Cost-of-error/automation | Có | Conditional/augment trong spec | — |
| ≥4 HAX/PAIR | Có | 6 nguyên tắc và vị trí UI | — |
| 4 đường trải nghiệm | Có | happy, clarify, failure, correction | CLEAR/retrieval thật chưa hoàn thiện |
| ≥8 scenario | Có | `spec.md` §5 | Một số mới là design case, chưa chạy E2E |
| Golden ≥20 | Có | `eval/golden-set.json` | Coverage multi-turn còn yếu |
| AI model call thật | Có | Gemini 3.5 Flash Lite, token usage | — |
| CP3 số thật | Có | 18/20 = 90%; 2 fail giữ nguyên | Form CP3 đang điền, chưa gửi |
| CP3 video 30 giây | Có | `artifacts/cp3-demo-30s.mp4` | Video dạng chuỗi trạng thái, chưa có con trỏ thao tác liên tục |
| CP4 spec + quality bar | Có | `spec.md`, bar ≥90% + hard cases | Chưa nộp CP4 |
| CP5 slide 6 trang | Có | `demo-slides.pdf` + PPTX | Chưa nộp CP5 |
| Backup video | Có | `artifacts/demo-backup.mp4` | Hiện giống CP3 video; nên quay bản pitch hoàn chỉnh riêng |
| Validation R6 | Chưa | Chỉ có template và 3 willing users | Cần ≥2 người dùng thật, quote, quan sát và ≥1 thay đổi |
| Pitch script | Có | `docs/PITCH-SCRIPT.md` | Cần dry run 5 phút và Q&A chéo |
| Integration VLearn | Chưa | UI mô phỏng sát VLearn | Chưa deploy/nhúng vào VLearn thật |

Nguồn: [K4 3B Day05–06 Hackathon](https://github.com/VinUni-AI20k/K4-3B-Day05-06-AI-Product-Hackathon), `SLIDE-TONG-QUAN-3B.html` trong Downloads.

## Backlog ưu tiên theo điểm và rủi ro

1. **P0 — Validation thật:** cho ít nhất 2/3 willing users thao tác; ghi quote và một thay đổi.
2. **P0 — CP3:** rà form đã điền, sau đó mới bấm gửi; không đổi số 18/20.
3. **P0 — CP4:** nộp commit spec đã khóa; không đổi quality bar sau deadline.
4. **P0 — CP5:** tạo video backup khác CP3, quay đúng demo sân khấu; nộp PDF + video.
5. **P1 — Retry/provider gate:** retry có backoff; log provider errors và latency.
6. **P1 — Multi-turn/safety:** thêm 5 multi-turn + 12 safety case và chạy Gemini.
7. **P1 — Source grounding:** thay option allowlist bằng source span lấy từ lesson context thật.
8. **P2 — Persistence/observability:** checkpointer bền vững và tracing production.

## Release decision hiện tại

**Not Yet cho production VLearn; Go cho demo có giới hạn.** Lý do: đạt đúng quality bar 90% và hard cases pass, nhưng còn hai routing failure, chưa validation người thật, chưa retrieval nguồn thật và checkpointer chưa bền vững.
