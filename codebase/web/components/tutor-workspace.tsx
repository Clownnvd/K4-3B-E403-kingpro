"use client";

import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileText,
  FlaskConical,
  GitBranch,
  Hand,
  History,
  Link2,
  Menu,
  MessageSquareText,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { scenarios, type ClarificationOption, type Scenario, type ScenarioId } from "@/lib/scenarios";

type Stage = "clarify" | "loading" | "answered" | "custom" | "failed";
type RunMode = "mock" | "local";

type AgentResponse = {
  status: "needs_clarification" | "completed";
  thread_id: string;
  model: string;
  prompt?: string;
  reason?: string;
  options?: ClarificationOption[];
  answer?: string;
  source?: string;
  trace: string[];
  usage: { input_tokens?: number; output_tokens?: number; total_tokens?: number };
};

const lessons = [
  "Chuẩn bị đội ngũ, chọn track và khởi tạo repository",
  "Khám phá bài toán, thu thập bằng chứng và chốt Canvas",
  "Thiết kế luồng trải nghiệm và dựng bản mẫu tương tác",
  "Xây dựng prototype AI thật và đo lường kiểm thử sơ bộ",
  "Hoàn thiện tài liệu AI Spec và khóa ngưỡng chất lượng",
  "Xác thực người dùng ngoài nhóm, xuất bản slide",
];

const graphSteps = ["receive_input", "classify_ambiguity", "build_options", "interrupt", "resume", "answer"];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function Topbar({ openOutline, openTutor, outlineOpen, tutorOpen, outlineIsDrawer, tutorIsDrawer }: { openOutline: () => void; openTutor: () => void; outlineOpen: boolean; tutorOpen: boolean; outlineIsDrawer: boolean; tutorIsDrawer: boolean }) {
  return (
    <header className="vlearnTopbar">
      <div className="courseIdentity">
        <button type="button" className="topIcon" aria-label="Quay lại"><ArrowLeft size={19} /></button>
        <button type="button" className="mobileOnly topIcon" onClick={openOutline} aria-label="Mở nội dung bài học" aria-controls="course-outline" aria-expanded={outlineIsDrawer ? outlineOpen : undefined}><Menu size={19} /></button>
        <strong>Bài 16 · MINI HACKATHON</strong>
      </div>
      <div className="courseProgress"><span>2/21 bài</span><i><b /></i></div>
      <div className="topActions">
        <button type="button" className="askAi" onClick={openTutor} aria-controls="tutor-panel" aria-expanded={tutorIsDrawer ? tutorOpen : undefined}><Sparkles size={17} /> Đặt câu hỏi với AI</button>
        <button type="button" className="requestButton"><Hand size={16} /> Gửi yêu cầu</button>
        <span className="accountAvatar">N</span>
      </div>
    </header>
  );
}

function CourseOutline({ open, close, isDrawer }: { open: boolean; close: () => void; isDrawer: boolean }) {
  return (
    <aside id="course-outline" className={`courseOutline ${open ? "drawerOpen" : ""}`} aria-label="Nội dung bài học" aria-hidden={isDrawer && !open ? true : undefined} aria-modal={isDrawer && open ? true : undefined} role={isDrawer && open ? "dialog" : undefined} inert={isDrawer && !open ? true : undefined}>
      <header><strong>NỘI DUNG BÀI HỌC</strong><button type="button" onClick={close} aria-label="Đóng nội dung bài học" data-drawer-close="outline"><X size={18} /></button></header>
      <button type="button" className="outlineGroup"><span>Slides</span><ChevronRight size={16} /></button>
      <div className="lessonDeck">
        <div className="deckTitle"><FlaskConical size={16} /><strong>K4-3B-D05-06-AI-PRODUCT</strong><ChevronDown size={15} /></div>
        {lessons.map((lesson, index) => (
          <button type="button" key={lesson} className={`lessonItem ${index === 1 ? "active" : ""}`} aria-current={index === 1 ? "step" : undefined}>
            <span>{index + 1}</span><p>{lesson}</p>{index === 1 && <small>Đang học</small>}
          </button>
        ))}
      </div>
      <h3>Nộp bài tổng kết và quy trình thuyết trình</h3>
      <button type="button" className="lessonItem"><span>7</span><p>Bài đọc</p></button>
      <button type="button" className="submitItem"><FileText size={16} /><span>Nộp bài và đánh giá Lab</span></button>
      <button type="button" className="outlineGroup videoGroup"><span>Video</span><ChevronRight size={16} /></button>
    </aside>
  );
}

function LessonContent({ highlightSource }: { highlightSource: boolean }) {
  return (
    <main className="lessonContent">
      <div className="lessonInner">
        <div className="lessonEyebrow">CHECKPOINT 1 · KHÁM PHÁ</div>
        <h1>Khám phá bài toán, thu thập bằng chứng và chốt Canvas</h1>
        <p className="lessonLead">Trước khi bắt tay vào build, nhóm cần chứng minh mình đang giải quyết một vấn đề thật của người học và thu hẹp nó thành một lát cắt đủ nhỏ.</p>
        <section className="lessonCallout"><ShieldCheck size={21} /><div><strong>Một bài toán đạt tiêu chuẩn</strong><p>Đúng một người dùng cụ thể, thực hiện một công việc cụ thể, thông qua một quyết định AI cụ thể, để tạo ra một kết quả đo đếm được.</p></div></section>
        <section className="lessonSection"><h2>1. Tìm pain có bằng chứng</h2><p>Đọc chatlog Tutor, quan sát hành vi thật và ghi lại những lượt hệ thống trả lời sai ngữ cảnh. Không chọn vấn đề chỉ vì nghe có vẻ hay.</p><div className="evidenceRow"><span>3.097</span><p>lượt Tutor K4 đã được rà soát</p><span>0,19%</span><p>lượt dùng hành vi hỏi lại</p></div></section>
        <section className="lessonSection"><h2>2. Chốt lát cắt một câu</h2><p>Nhóm kingpro chọn đúng một lỗi: Tutor trả lời theo suy đoán khi câu hỏi chưa đủ rõ. Tính năng mới sẽ dừng và hỏi lại trước khi tạo câu trả lời.</p><blockquote>Học viên gửi câu hỏi mơ hồ → AI nhận diện thiếu ý định → học viên chọn cách hiểu → Tutor mới tiếp tục trả lời.</blockquote></section>
        <section className="lessonSection"><h2>3. Kiểm tra ngay trong bài học</h2><p>Mở Trợ giảng AI và thử câu “cho tôi link”. Bản cải tiến phải hỏi cần loại link nào thay vì tự chọn repo lớp 3A hoặc 3B.</p></section>
        <section id="vlearn-grounding-source" className={`groundingSource ${highlightSource ? "highlighted" : ""}`} tabIndex={-1} aria-label="Nguồn trong bài học: Repository của nhóm kingpro"><div><BookOpen size={19} /><span><small>NGUỒN TRONG BÀI HỌC</small><strong>Repository của nhóm kingpro</strong></span></div><p>Prototype, Canvas và sơ đồ LangGraph của nhóm được lưu tại repository public:</p><a href="https://github.com/Clownnvd/K4-3B-E403-kingpro" target="_blank" rel="noreferrer">github.com/Clownnvd/K4-3B-E403-kingpro</a></section>
        <div className="lessonFeedback"><button type="button" aria-label="Bài học hữu ích">👍</button><button type="button" aria-label="Bài học chưa hữu ích">👎</button><button type="button" aria-label="Báo lỗi nội dung">⚑</button></div>
        <nav className="lessonNav"><button type="button">← Bài trước</button><button type="button" className="nextLesson">Đi tới bài tiếp theo <ChevronRight size={17} /></button></nav>
      </div>
    </main>
  );
}

function ScenarioPicker({ value, change }: { value: ScenarioId; change: (id: ScenarioId) => void }) {
  const [open, setOpen] = useState(false);
  const current = scenarios.find((item) => item.id === value) ?? scenarios[0];
  return (
    <div className="scenarioPicker" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setOpen(false); event.currentTarget.querySelector<HTMLButtonElement>(".scenarioTrigger")?.focus(); } }}>
      <button type="button" className="scenarioTrigger" onClick={() => setOpen((state) => !state)} aria-expanded={open} aria-controls="scenario-options" aria-haspopup="listbox">
        <span><small>CASE KIỂM THỬ</small><strong>{current.label}</strong></span><ChevronDown size={15} />
      </button>
      {open && <div id="scenario-options" className="scenarioMenu" role="listbox" aria-label="Chọn ca kiểm thử">{scenarios.map((item) => <button type="button" role="option" aria-selected={item.id === value} key={item.id} className={item.id === value ? "selected" : ""} onClick={() => { change(item.id); setOpen(false); }}><strong>{item.label}</strong><small>{item.question}</small></button>)}</div>}
    </div>
  );
}

function GraphTrace({ stage, rounds }: { stage: Stage; rounds: number }) {
  const active = stage === "clarify" || stage === "custom" ? 3 : stage === "loading" ? 4 : 5;
  return (
    <details className="graphTrace">
      <summary><GitBranch size={14} /> Xem luồng LangGraph <span>{stage === "answered" ? "ANSWER" : "CLARIFY"}</span></summary>
      <div className="traceState"><span>thread_id</span><code>vl-k4-016</code><span>vòng hỏi lại</span><code>{rounds}/2</code></div>
      <ol>{graphSteps.map((step, index) => <li key={step} className={index < active ? "done" : index === active ? "current" : ""}><i>{index < active ? <Check size={10} /> : index + 1}</i><code>{step}</code></li>)}</ol>
    </details>
  );
}

function ClarificationCard({ scenario, choose, openCustom, stage, rounds }: { scenario: Scenario; choose: (option: ClarificationOption) => void; openCustom: () => void; stage: Stage; rounds: number }) {
  if (stage !== "clarify") return null;
  return (
    <article className="clarifyCard">
      <header><span><CircleHelp size={18} /></span><div><small>CẦN LÀM RÕ · CHƯA TRẢ LỜI</small><h3>{scenario.prompt}</h3><p>{scenario.reason}</p></div></header>
      <div className="clarifyOptions">{scenario.options.slice(0, 3).map((option, index) => <button type="button" key={option.id} onClick={() => choose(option)}><b>{index + 1}</b><span><strong>{option.label}</strong><small>{option.detail}</small></span><ChevronRight size={16} /></button>)}<button type="button" onClick={openCustom}><b>+</b><span><strong>Khác — tự nhập</strong><small>Mô tả chính xác điều anh muốn hỏi</small></span><ChevronRight size={16} /></button></div>
      <GraphTrace stage={stage} rounds={rounds} />
    </article>
  );
}

function TutorPanel({ open, close, onSourceHighlight, isDrawer }: { open: boolean; close: () => void; onSourceHighlight: (active: boolean) => void; isDrawer: boolean }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("link");
  const [stage, setStage] = useState<Stage>("clarify");
  const [selected, setSelected] = useState<ClarificationOption | null>(null);
  const [customText, setCustomText] = useState("");
  const [composerText, setComposerText] = useState("");
  const [rounds, setRounds] = useState(1);
  const [runMode, setRunMode] = useState<RunMode>("mock");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [runtimeScenario, setRuntimeScenario] = useState<Scenario | null>(null);
  const [runtimeMeta, setRuntimeMeta] = useState<Pick<AgentResponse, "model" | "trace" | "usage"> | null>(null);
  const [apiError, setApiError] = useState("");
  const [sourceOpen, setSourceOpen] = useState(false);
  const runningRef = useRef(false);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const activeScenario = runtimeScenario ?? scenario;
  const directAnswerUrl = selected?.source?.startsWith("https://")
    ? selected.source
    : selected?.source?.startsWith("github.com/")
      ? `https://${selected.source}`
      : null;

  const reset = (id = scenarioId) => { setScenarioId(id); setStage("clarify"); setSelected(null); setCustomText(""); setRounds(1); setRunMode("mock"); setThreadId(null); setRuntimeScenario(null); setRuntimeMeta(null); setApiError(""); setSourceOpen(false); onSourceHighlight(false); };
  const runRealCase = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setScenarioId("link"); setRunMode("local"); setStage("loading"); setSelected(null); setApiError(""); setSourceOpen(false); onSourceHighlight(false);
    try {
      const response = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start", question: "cho tôi link", lesson_id: "D20-S02", lesson_title: "Bài 16 · Khám phá bài toán" }) });
      const data = await response.json() as AgentResponse & { detail?: string };
      if (!response.ok || data.status !== "needs_clarification" || !data.options) throw new Error(data.detail ?? "Agent không trả về clarification payload");
      setThreadId(data.thread_id); setRuntimeMeta({ model: data.model, trace: data.trace, usage: data.usage });
      setRuntimeScenario({ ...scenarios[0], prompt: data.prompt ?? scenarios[0].prompt, reason: data.reason ?? scenarios[0].reason, options: data.options });
      setStage("clarify");
    } catch (error) { setApiError(error instanceof Error ? error.message : "Không thể gọi agent"); setStage("failed"); }
    finally { runningRef.current = false; }
  };
  const choose = async (option: ClarificationOption) => {
    setSelected(option); setStage("loading");
    if (runMode === "local" && threadId) {
      try {
        const response = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "resume", thread_id: threadId, option_id: option.id }) });
        const data = await response.json() as AgentResponse & { detail?: string };
        if (!response.ok || data.status !== "completed") throw new Error(data.detail ?? "Agent chưa hoàn thành");
        setSelected({ ...option, answer: data.answer ?? option.answer, source: data.source ?? option.source }); setRuntimeMeta({ model: data.model, trace: data.trace, usage: data.usage }); setStage("answered");
      } catch (error) { setApiError(error instanceof Error ? error.message : "Không thể resume agent"); setStage("failed"); }
      return;
    }
    window.setTimeout(() => setStage("answered"), 500);
  };
  const submitCustom = (event: FormEvent) => { event.preventDefault(); if (customText.trim().length < 4) return; choose({ id: "custom", label: customText.trim(), detail: "Do học viên bổ sung", answer: `Đã hiểu ý anh: ${customText.trim()}`, source: "Ý định do học viên xác nhận" }); };
  const correct = () => { setSelected(null); setSourceOpen(false); onSourceHighlight(false); if (rounds >= 2) setStage("failed"); else { setRounds((value) => value + 1); setStage("clarify"); } };
  const send = (event: FormEvent) => { event.preventDefault(); const text = composerText.trim(); if (!text) return; const match = scenarios.find((item) => text.toLowerCase().includes(item.question)); reset(match?.id ?? "reference"); setComposerText(""); };

  return (
    <aside id="tutor-panel" className={`tutorPanel ${open ? "tutorOpen" : ""}`} aria-label="Trợ giảng AI" aria-hidden={isDrawer && !open ? true : undefined} aria-modal={isDrawer && open ? true : undefined} role={isDrawer && open ? "dialog" : undefined} inert={isDrawer && !open ? true : undefined}>
      <header className="tutorHeader"><span className="aiMark"><Sparkles size={18} /></span><strong>Trợ giảng AI</strong><button type="button" className="chatNew"><Plus size={15} /> Chat mới</button><button type="button" className="panelIcon" aria-label="Lịch sử chat"><History size={17} /></button><button type="button" className="panelIcon" aria-label="Tài liệu"><BookOpen size={17} /></button><button type="button" className="panelIcon" onClick={close} aria-label="Đóng Trợ giảng AI" data-drawer-close="tutor"><X size={18} /></button></header>
      <div className="tutorContext"><div><span>ĐANG MỞ TRÊN VLEARN</span><strong>Bài 16 · Khám phá bài toán</strong></div><div className="runtimeControls"><span className={runMode === "local" ? "realPill" : "mockPill"}>{runMode === "local" ? "GEMINI · LANGGRAPH" : "BẢN THỬ"}</span><button type="button" className="runRealButton" onClick={runRealCase} disabled={stage === "loading"}><Sparkles size={13} />{stage === "loading" ? "Đang xử lý…" : runMode === "local" ? "Chạy lại" : "Chạy với Gemini"}</button></div></div>
      <ScenarioPicker value={scenarioId} change={reset} />
      <div className="chatScroll" aria-live="polite" aria-busy={stage === "loading"}>
        <div className="studentBubble"><small>Bạn</small><p>{activeScenario.question}</p></div>
        {runtimeMeta && <div className="runtimeMeta"><span>{runtimeMeta.model}</span><span>{runtimeMeta.usage.total_tokens ?? 0} tokens</span><span>{runtimeMeta.trace.at(-1)}</span></div>}
        <ClarificationCard scenario={activeScenario} choose={choose} openCustom={() => setStage("custom")} stage={stage} rounds={rounds} />
        {stage === "custom" && <article className="customCard"><button type="button" onClick={() => setStage("clarify")}>← Quay lại lựa chọn</button><h3>Anh muốn hỏi cụ thể điều gì?</h3><p>Thêm tên đối tượng hoặc loại tài liệu.</p><form onSubmit={submitCustom}><textarea aria-label="Nội dung làm rõ" autoFocus value={customText} onChange={(event) => setCustomText(event.target.value)} placeholder="Ví dụ: Link repo nhóm kingpro…" /><div><span>{customText.trim().length < 4 ? "Nhập ít nhất 4 ký tự" : "Đã đủ thông tin"}</span><button type="submit" disabled={customText.trim().length < 4}>Tiếp tục</button></div></form><GraphTrace stage={stage} rounds={rounds} /></article>}
        {stage === "loading" && <div className="loadingCard" role="status"><i /><span><strong>Đang tiếp tục luồng…</strong><small>Kiểm tra lại ý định trước khi trả lời</small></span></div>}
        {stage === "answered" && selected && <article className="answerCard"><header><span className="aiMark small"><Sparkles size={14} /></span><div><small>Trợ giảng AI</small><p>{selected.answer}</p></div></header>{directAnswerUrl && <a className="directAnswer" href={directAnswerUrl} target="_blank" rel="noreferrer"><Link2 size={14} /><span><small>Đáp án trực tiếp</small><strong>{selected.source}</strong></span><ChevronRight size={15} /></a>}<button type="button" className="sourceToggle" aria-pressed={sourceOpen} onClick={() => { const next = !sourceOpen; setSourceOpen(next); onSourceHighlight(next); }}><span><BookOpen size={14} /> {sourceOpen ? "Nguồn đang được bôi sáng" : "Xem nguồn trong bài"}</span><ChevronRight size={14} /></button><footer><button type="button" onClick={correct}><RotateCcw size={14} /> Không phải ý này</button><span><Check size={13} /> Đã xác nhận ý định</span></footer><GraphTrace stage={stage} rounds={rounds} /></article>}
        {stage === "failed" && <article className="failureCard" role="alert"><CircleHelp size={19} /><div><strong>{apiError ? "Agent chưa thể hoàn thành lượt chạy." : "Mình vẫn chưa xác định được ý anh."}</strong><p>{apiError || "Hãy chọn một đoạn trong bài hoặc nhập tên đối tượng cụ thể."}</p><button type="button" onClick={apiError ? runRealCase : () => reset()}>{apiError ? "Thử lại AI thật" : "Bắt đầu lại"}</button></div></article>}
      </div>
      <form className="tutorComposer" onSubmit={send}><textarea aria-label="Câu hỏi cho Trợ giảng AI" value={composerText} onChange={(event) => setComposerText(event.target.value)} placeholder="Hỏi bất cứ điều gì…" rows={1} /><button type="submit" disabled={!composerText.trim()} aria-label="Gửi"><ArrowUp size={18} /></button><span>Trợ giảng AI có thể sai — hãy đối chiếu với bài giảng.</span></form>
    </aside>
  );
}

export function TutorWorkspace() {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [highlightSource, setHighlightSource] = useState(false);
  const outlineIsDrawer = useMediaQuery("(max-width: 1200px)");
  const tutorIsDrawer = useMediaQuery("(max-width: 900px)");
  const closeDrawers = useCallback(() => { setOutlineOpen(false); setTutorOpen(false); }, []);
  const openOutline = useCallback(() => { setTutorOpen(false); setOutlineOpen(true); }, []);
  const openTutor = useCallback(() => { setOutlineOpen(false); setTutorOpen(true); }, []);

  useEffect(() => {
    const drawerId = tutorIsDrawer && tutorOpen ? "tutor-panel" : outlineIsDrawer && outlineOpen ? "course-outline" : null;
    if (!drawerId) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const drawer = document.getElementById(drawerId);
    const previousOverflow = document.body.style.overflow;
    const focusableSelector = "button:not([disabled]), a[href], textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusableElements = () => Array.from(drawer?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    const focusFrame = window.requestAnimationFrame(() => drawer?.querySelector<HTMLElement>("[data-drawer-close]")?.focus());
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (drawer?.querySelector(".scenarioMenu")) return;
        event.preventDefault();
        closeDrawers();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableElements();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [closeDrawers, outlineIsDrawer, outlineOpen, tutorIsDrawer, tutorOpen]);

  const updateSourceHighlight = (active: boolean) => {
    setHighlightSource(active);
    if (active) {
      if (tutorIsDrawer) setTutorOpen(false);
      window.setTimeout(() => {
        const source = document.getElementById("vlearn-grounding-source");
        source?.scrollIntoView({ behavior: "smooth", block: "center" });
        source?.focus({ preventScroll: true });
      }, tutorIsDrawer ? 240 : 50);
    }
  };
  return (
    <div className="vlearnApp">
      <Topbar openOutline={openOutline} openTutor={openTutor} outlineOpen={outlineOpen} tutorOpen={tutorOpen} outlineIsDrawer={outlineIsDrawer} tutorIsDrawer={tutorIsDrawer} />
      <div className="vlearnLayout"><CourseOutline open={outlineOpen} close={() => setOutlineOpen(false)} isDrawer={outlineIsDrawer} /><LessonContent highlightSource={highlightSource} /><TutorPanel open={tutorOpen} close={() => setTutorOpen(false)} onSourceHighlight={updateSourceHighlight} isDrawer={tutorIsDrawer} /></div>
      {(outlineOpen || tutorOpen) && <button type="button" className="drawerScrim" onClick={closeDrawers} aria-label="Đóng lớp phủ" />}
      <button type="button" className="floatingTutor" onClick={openTutor} aria-controls="tutor-panel" aria-expanded={tutorIsDrawer ? tutorOpen : undefined}><MessageSquareText size={18} /> Hỏi AI</button>
    </div>
  );
}
