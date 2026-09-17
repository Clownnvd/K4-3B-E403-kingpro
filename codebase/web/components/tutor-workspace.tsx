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
import { FormEvent, useState } from "react";
import { scenarios, type ClarificationOption, type Scenario, type ScenarioId } from "@/lib/scenarios";

type Stage = "clarify" | "loading" | "answered" | "custom" | "failed";

const lessons = [
  "Chuẩn bị đội ngũ, chọn track và khởi tạo repository",
  "Khám phá bài toán, thu thập bằng chứng và chốt Canvas",
  "Thiết kế luồng trải nghiệm và dựng bản mẫu tương tác",
  "Xây dựng prototype AI thật và đo lường kiểm thử sơ bộ",
  "Hoàn thiện tài liệu AI Spec và khóa ngưỡng chất lượng",
  "Xác thực người dùng ngoài nhóm, xuất bản slide",
];

const graphSteps = ["receive_input", "classify_ambiguity", "build_options", "interrupt", "resume", "answer"];

function Topbar({ openOutline, openTutor }: { openOutline: () => void; openTutor: () => void }) {
  return (
    <header className="vlearnTopbar">
      <div className="courseIdentity">
        <button type="button" className="topIcon" aria-label="Quay lại"><ArrowLeft size={19} /></button>
        <button type="button" className="mobileOnly topIcon" onClick={openOutline} aria-label="Mở nội dung bài học"><Menu size={19} /></button>
        <strong>Bài 16 · MINI HACKATHON</strong>
      </div>
      <div className="courseProgress"><span>2/21 bài</span><i><b /></i></div>
      <div className="topActions">
        <button type="button" className="askAi" onClick={openTutor}><Sparkles size={17} /> Đặt câu hỏi với AI</button>
        <button type="button" className="requestButton"><Hand size={16} /> Gửi yêu cầu</button>
        <span className="accountAvatar">N</span>
      </div>
    </header>
  );
}

function CourseOutline({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside className={`courseOutline ${open ? "drawerOpen" : ""}`} aria-label="Nội dung bài học">
      <header><strong>NỘI DUNG BÀI HỌC</strong><button type="button" onClick={close} aria-label="Đóng nội dung bài học"><X size={18} /></button></header>
      <button type="button" className="outlineGroup"><span>Slides</span><ChevronRight size={16} /></button>
      <div className="lessonDeck">
        <div className="deckTitle"><FlaskConical size={16} /><strong>K4-3B-D05-06-AI-PRODUCT</strong><ChevronDown size={15} /></div>
        {lessons.map((lesson, index) => (
          <button type="button" key={lesson} className={`lessonItem ${index === 1 ? "active" : ""}`}>
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

function LessonContent() {
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
    <div className="scenarioPicker">
      <button type="button" className="scenarioTrigger" onClick={() => setOpen((state) => !state)} aria-expanded={open}>
        <span><small>CASE KIỂM THỬ</small><strong>{current.label}</strong></span><ChevronDown size={15} />
      </button>
      {open && <div className="scenarioMenu">{scenarios.map((item) => <button type="button" key={item.id} className={item.id === value ? "selected" : ""} onClick={() => { change(item.id); setOpen(false); }}><strong>{item.label}</strong><small>{item.question}</small></button>)}</div>}
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
      <div className="clarifyOptions">{scenario.options.map((option, index) => <button type="button" key={option.id} onClick={() => choose(option)}><b>{index + 1}</b><span><strong>{option.label}</strong><small>{option.detail}</small></span><ChevronRight size={16} /></button>)}<button type="button" onClick={openCustom}><b>+</b><span><strong>Khác — tự nhập</strong><small>Mô tả chính xác điều anh muốn hỏi</small></span><ChevronRight size={16} /></button></div>
      <GraphTrace stage={stage} rounds={rounds} />
    </article>
  );
}

function TutorPanel({ open, close }: { open: boolean; close: () => void }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("link");
  const [stage, setStage] = useState<Stage>("clarify");
  const [selected, setSelected] = useState<ClarificationOption | null>(null);
  const [customText, setCustomText] = useState("");
  const [composerText, setComposerText] = useState("");
  const [rounds, setRounds] = useState(1);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  const reset = (id = scenarioId) => { setScenarioId(id); setStage("clarify"); setSelected(null); setCustomText(""); setRounds(1); };
  const choose = (option: ClarificationOption) => { setSelected(option); setStage("loading"); window.setTimeout(() => setStage("answered"), 500); };
  const submitCustom = (event: FormEvent) => { event.preventDefault(); if (customText.trim().length < 4) return; choose({ id: "custom", label: customText.trim(), detail: "Do học viên bổ sung", answer: `Đã hiểu ý anh: ${customText.trim()}`, source: "Ý định do học viên xác nhận" }); };
  const correct = () => { setSelected(null); if (rounds >= 2) setStage("failed"); else { setRounds((value) => value + 1); setStage("clarify"); } };
  const send = (event: FormEvent) => { event.preventDefault(); const text = composerText.trim(); if (!text) return; const match = scenarios.find((item) => text.toLowerCase().includes(item.question)); reset(match?.id ?? "reference"); setComposerText(""); };

  return (
    <aside className={`tutorPanel ${open ? "tutorOpen" : ""}`} aria-label="Trợ giảng AI">
      <header className="tutorHeader"><span className="aiMark"><Sparkles size={18} /></span><strong>Trợ giảng AI</strong><button type="button" className="chatNew"><Plus size={15} /> Chat mới</button><button type="button" className="panelIcon" aria-label="Lịch sử chat"><History size={17} /></button><button type="button" className="panelIcon" aria-label="Tài liệu"><BookOpen size={17} /></button><button type="button" className="panelIcon" onClick={close} aria-label="Đóng Trợ giảng AI"><X size={18} /></button></header>
      <div className="tutorContext"><div><span>ĐANG MỞ TRÊN VLEARN</span><strong>Bài 16 · Khám phá bài toán</strong></div><span className="mockPill">MOCK CP2</span></div>
      <ScenarioPicker value={scenarioId} change={reset} />
      <div className="chatScroll">
        <div className="studentBubble"><small>Bạn</small><p>{scenario.question}</p></div>
        <ClarificationCard scenario={scenario} choose={choose} openCustom={() => setStage("custom")} stage={stage} rounds={rounds} />
        {stage === "custom" && <article className="customCard"><button type="button" onClick={() => setStage("clarify")}>← Quay lại lựa chọn</button><h3>Anh muốn hỏi cụ thể điều gì?</h3><p>Thêm tên đối tượng hoặc loại tài liệu.</p><form onSubmit={submitCustom}><textarea aria-label="Nội dung làm rõ" autoFocus value={customText} onChange={(event) => setCustomText(event.target.value)} placeholder="Ví dụ: Link repo nhóm kingpro…" /><div><span>{customText.trim().length < 4 ? "Nhập ít nhất 4 ký tự" : "Đã đủ thông tin"}</span><button type="submit" disabled={customText.trim().length < 4}>Tiếp tục</button></div></form><GraphTrace stage={stage} rounds={rounds} /></article>}
        {stage === "loading" && <div className="loadingCard"><i /><span><strong>Đang tiếp tục luồng…</strong><small>Kiểm tra lại ý định trước khi trả lời</small></span></div>}
        {stage === "answered" && selected && <article className="answerCard"><header><span className="aiMark small"><Sparkles size={14} /></span><div><small>Trợ giảng AI</small><p>{selected.answer}</p></div></header><div className="sourceCard"><Link2 size={15} /><span><small>Căn cứ</small><strong>{selected.source}</strong></span></div><footer><button type="button" onClick={correct}><RotateCcw size={14} /> Không phải ý này</button><span><Check size={13} /> Đã xác nhận ý định</span></footer><GraphTrace stage={stage} rounds={rounds} /></article>}
        {stage === "failed" && <article className="failureCard"><CircleHelp size={19} /><div><strong>Mình vẫn chưa xác định được ý anh.</strong><p>Hãy chọn một đoạn trong bài hoặc nhập tên đối tượng cụ thể.</p><button type="button" onClick={() => reset()}>Bắt đầu lại</button></div></article>}
      </div>
      <form className="tutorComposer" onSubmit={send}><textarea aria-label="Câu hỏi cho Trợ giảng AI" value={composerText} onChange={(event) => setComposerText(event.target.value)} placeholder="Hỏi bất cứ điều gì…" rows={1} /><button type="submit" disabled={!composerText.trim()} aria-label="Gửi"><ArrowUp size={18} /></button><span>Trợ giảng AI có thể sai — hãy đối chiếu với bài giảng.</span></form>
    </aside>
  );
}

export function TutorWorkspace() {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const closeDrawers = () => { setOutlineOpen(false); setTutorOpen(false); };
  return (
    <div className="vlearnApp">
      <Topbar openOutline={() => setOutlineOpen(true)} openTutor={() => setTutorOpen(true)} />
      <div className="vlearnLayout"><CourseOutline open={outlineOpen} close={() => setOutlineOpen(false)} /><LessonContent /><TutorPanel open={tutorOpen} close={() => setTutorOpen(false)} /></div>
      {(outlineOpen || tutorOpen) && <button type="button" className="drawerScrim" onClick={closeDrawers} aria-label="Đóng lớp phủ" />}
      <button type="button" className="floatingTutor" onClick={() => setTutorOpen(true)}><MessageSquareText size={18} /> Hỏi AI</button>
    </div>
  );
}
