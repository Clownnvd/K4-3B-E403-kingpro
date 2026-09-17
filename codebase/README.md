# Codebase

- `clarification-flow.html`: working mock cho nhánh câu hỏi mơ hồ của A1.
- `langgraph-flow.mmd`: sơ đồ node/edge LangGraph của đúng lát cắt clarification.
- `../docs/A1-LANGGRAPH-FLOW.md`: bản sơ đồ có giải thích state và nhánh demo CP2.
- `web/`: giao diện Next.js responsive mô phỏng `interrupt`/`resume`, custom input, correction và LangGraph trace.
- CP2: logic AI và source đang mock, UI/flow bấm được.
- CP3: thay mock bằng LangGraph thật, checkpointer và ít nhất một lời gọi AI thật.

## Chạy giao diện Next.js

```powershell
cd codebase/web
pnpm install
pnpm dev -- --port 3011
```

Mở `http://localhost:3011`. Bốn case demo nằm ở menu góc phải; case chính là `cho tôi link`.
