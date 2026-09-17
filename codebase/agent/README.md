# VLearn Clarification Agent

Một vertical slice LangGraph chạy thật cho case `cho tôi link`:

1. `classify_ambiguity` gọi duy nhất `gemini-3.5-flash-lite` và yêu cầu structured JSON.
2. Route `AMBIGUOUS` tạo ba lựa chọn đã allowlist.
3. `interrupt()` dừng graph và trả payload cho UI.
4. UI gửi `option_id`; backend dùng `Command(resume=...)` với cùng `thread_id`.
5. Graph trả câu trả lời và nguồn tương ứng.

```powershell
cd codebase/agent
python -m uvicorn app:app --host 127.0.0.1 --port 8000
```

Service đọc `GEMINI_API_KEY` từ environment và không ghi key vào file/log. Không dùng OpenAI key.
