"use client";

import {
  ArrowUp,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  GitBranch,
  History,
  Link2,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { scenarios, type ClarificationOption, type Scenario, type ScenarioId } from "@/lib/scenarios";

type Stage = "clarify" | "loading" | "answered" | "custom" | "failed";

const graphSteps = [
  ["receive_input", "Nhận câu hỏi"],
  ["classify_ambiguity", "Kiểm tra độ rõ"],
  ["build_options", "Tạo cách hiểu"],
  ["interrupt", "Chờ xác nhận"],
  ["resume", "Tiếp tục luồng"],
  ["answer", "Trả lời đúng ý"],
] as const;

function Brand() {
  return (
    <div className="brand">
      <span className="brandMark"><Sparkles size={18} /></span>
      <span><strong>Clarify First</strong><small>VLearn Tutor</small></span>
    </div>
  );
}

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Điều hướng chính">
      <div className="mobileSidebarHead"><Brand /><button className="iconBtn" onClick={close} aria-label="Đóng menu"><X size={19} /></button></div>
      <div className="desktopBrand"><Brand /></div>
      <button className="newChat"><Plus size={17} /> Đoạn chat mới</button>
      <nav>
        <button className="navItem active"><MessageSquareText size={18} /> Hội thoại</button>
        <button className="navItem"><BookOpen size={18} /> Bài đang học</button>
        <button className="navItem"><FileText size={18} /> Nguồn đã dùng</button>
        <button className="navItem"><History size={18} /> Lịch sử</button>
      </nav>
      <section className="recent">
        <p>GẦN ĐÂY</p>
        <button className="recentItem selected"><strong>Mini Hackathon</strong><span>Cho tôi link · vừa xong</span></button>
        <button className="recentItem"><strong>Prompt Engineering</strong><span>“cgi” có nghĩa gì?</span></button>
        <button className="recentItem"><strong>RAG căn bản</strong><span>BM25 và vector search</span></button>
      </section>
      <div className="sidebarFoot"><ShieldCheck size={16} /><span><strong>CP2 Working Mock</strong><small>Không gọi API</small></span></div>
    </aside>
  );
}

function ScenarioPicker({ value, change }: { value: ScenarioId; change: (id: ScenarioId) => void }) {
  const [open, setOpen] = useState(false);
  const current = scenarios.find((item) => item.id === value) ?? scenarios[0];
  return (
    <div className="scenarioPicker">
      <button className="scenarioTrigger" onClick={() => setOpen((state) => !state)} aria-expanded={open}>
        <span><small>CASE DEMO</small><strong>{current.label}</strong></span><ChevronDown size={17} />
      </button>
      {open && (
        <div className="scenarioMenu">
          {scenarios.map((item) => (
            <button key={item.id} className={item.id === value ? "selected" : ""} onClick={() => { change(item.id); setOpen(false); }}>
              <strong>{item.label}</strong><small>{item.question}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClarificationCard({ scenario, stage, choose, openCustom }: { scenario: Scenario; stage: Stage; choose: (option: ClarificationOption) => void; openCustom: () => void }) {
  if (stage !== "clarify") return null;
  return (
    <article className="clarifyCard">
      <header><span className="decisionIcon"><CircleHelp size={19} /></span><div><span className="overline">CẦN LÀM RÕ · CHƯA TRẢ LỜI</span><h2>{scenario.prompt}</h2><p>{scenario.reason}</p></div></header>
      <div className="optionList">
        {scenario.options.map((option, index) => (
          <button key={option.id} className="option" onClick={() => choose(option)}>
            <span className="optionIndex">{index + 1}</span><span><strong>{option.label}</strong><small>{option.detail}</small></span><span className="optionArrow">→</span>
          </button>
        ))}
        <button className="option" onClick={openCustom}><span className="optionIndex">+</span><span><strong>Khác — tự nhập</strong><small>Mô tả chính xác điều anh muốn hỏi</small></span><span className="optionArrow">→</span></button>
      </div>
      <footer><GitBranch size={14} /><span>Graph đang dừng tại <code>interrupt</code> và chờ xác nhận.</span></footer>
    </article>
  );
}

function RightPanel({ stage, rounds }: { stage: Stage; rounds: number }) {
  const activeIndex = stage === "clarify" || stage === "custom" ? 3 : stage === "loading" ? 4 : stage === "answered" ? 5 : 3;
  const trace = useMemo(() => {
    if (stage === "answered") return ["classify_ambiguity → CLEAR", "Command(resume) → accepted", "answer → completed"];
    if (stage === "loading") return ["Command(resume) → received", "intent_guard → running"];
    if (stage === "failed") return ["clarification_round → 2", "graceful_failure → stopped"];
    return ["classify_ambiguity → AMBIGUOUS", "interrupt → waiting"];
  }, [stage]);
  return (
    <aside className="rightPanel">
      <section>
        <div className="panelTitle"><span><GitBranch size={17} /> LangGraph state</span><span className="live"><i /> LIVE</span></div>
        <div className="stateCard">
          <div><span>Thread</span><strong>vl-k4-016</strong></div>
          <div><span>Route</span><strong>{stage === "answered" ? "ANSWER" : stage === "failed" ? "STOP" : "CLARIFY"}</strong></div>
          <div><span>Vòng hỏi lại</span><strong>{rounds}/2</strong></div>
          <div><span>Checkpoint</span><strong>{stage === "clarify" || stage === "custom" ? "PAUSED" : "RUNNING"}</strong></div>
        </div>
      </section>
      <section>
        <h3>Luồng đang chạy</h3>
        <ol className="graphSteps">
          {graphSteps.map(([key, label], index) => (
            <li key={key} className={index < activeIndex ? "done" : index === activeIndex ? "current" : ""}>
              <span className="stepDot">{index < activeIndex ? <Check size={12} /> : index + 1}</span>
              <span><code>{key}</code><small>{label}</small></span>
            </li>
          ))}
        </ol>
      </section>
      <details className="trace" open>
        <summary>Trace lượt hiện tại</summary>
        {trace.map((item) => <div key={item}><i /> <code>{item}</code></div>)}
      </details>
      <section className="guardCard"><ShieldCheck size={18} /><div><strong>Guard đang bật</strong><p>Không sinh câu trả lời trước khi người dùng xác nhận ý định.</p></div></section>
    </aside>
  );
}

export function TutorWorkspace() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("link");
  const [stage, setStage] = useState<Stage>("clarify");
  const [selected, setSelected] = useState<ClarificationOption | null>(null);
  const [customText, setCustomText] = useState("");
  const [composerText, setComposerText] = useState("");
  const [rounds, setRounds] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  const reset = (nextId = scenarioId) => {
    setScenarioId(nextId); setStage("clarify"); setSelected(null); setCustomText(""); setComposerText(""); setRounds(1);
  };

  const choose = (option: ClarificationOption) => {
    setSelected(option); setStage("loading");
    window.setTimeout(() => setStage("answered"), 650);
  };

  const submitCustom = (event: FormEvent) => {
    event.preventDefault();
    if (customText.trim().length < 4) return;
    const option: ClarificationOption = { id: "custom", label: customText.trim(), detail: "Do người dùng bổ sung", answer: `Đã hiểu: ${customText.trim()}`, source: "Ý định do người dùng xác nhận" };
    choose(option);
  };

  const send = (event: FormEvent) => {
    event.preventDefault();
    if (!composerText.trim()) return;
    setScenarioId("reference"); setStage("clarify"); setSelected(null); setRounds(1); setComposerText("");
  };

  const correct = () => {
    setSelected(null);
    if (rounds >= 2) setStage("failed"); else { setRounds((value) => value + 1); setStage("clarify"); }
  };

  return (
    <div className="appShell">
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="scrim" onClick={() => setSidebarOpen(false)} aria-label="Đóng menu" />}
      <main className="mainArea">
        <header className="topbar">
          <button className="menuBtn" onClick={() => setSidebarOpen(true)} aria-label="Mở menu"><Menu size={20} /></button>
          <div className="pageTitle"><strong>Bài 16 · Mini Hackathon</strong><span>VLearn Tutor / Hội thoại</span></div>
          <div className="topActions"><span className="mockBadge">CP2 MOCK · NO API</span><ScenarioPicker value={scenarioId} change={reset} /><button className="iconBtn" aria-label="Tùy chọn"><MoreHorizontal size={20} /></button></div>
        </header>
        <div className="workspace">
          <section className="chatColumn">
            <div className="scopeBanner"><ShieldCheck size={17} /><p><strong>Phạm vi:</strong> Tutor hỏi lại trước khi trả lời câu chưa đủ rõ. Mọi lựa chọn hiện tại là dữ liệu mock phục vụ CP2.</p></div>
            <div className="dateDivider"><span>Hôm nay</span></div>
            <div className="message userMessage"><div><span>Bạn</span><p>{scenario.question}</p></div><span className="userAvatar">D</span></div>

            {stage === "custom" && (
              <article className="customCard"><button type="button" className="backLink" onClick={() => setStage("clarify")}>← Quay lại các lựa chọn</button><h2>Anh muốn hỏi cụ thể điều gì?</h2><p>Thêm đối tượng, câu hỏi hoặc loại tài liệu để Tutor không phải đoán.</p><form onSubmit={submitCustom}><textarea aria-label="Nội dung làm rõ" autoFocus value={customText} onChange={(event) => setCustomText(event.target.value)} placeholder="Ví dụ: Cho tôi link repo của nhóm kingpro…" /><div><span>{customText.trim().length < 4 ? "Nhập ít nhất 4 ký tự" : "Đã đủ để tiếp tục"}</span><button type="submit" disabled={customText.trim().length < 4}>Tiếp tục</button></div></form></article>
            )}
            <ClarificationCard scenario={scenario} stage={stage} choose={choose} openCustom={() => setStage("custom")} />
            {stage === "loading" && <div className="thinking"><span className="spinner" /><div><strong>Đang tiếp tục từ lựa chọn của anh…</strong><small>Kiểm tra lại ý định trước khi tạo câu trả lời</small></div></div>}
            {stage === "answered" && selected && (
              <article className="answerCard"><header><span className="assistantAvatar">C</span><div><span>Clarify Tutor</span><p>{selected.answer}</p></div></header><a className="sourceLink" href={`https://${selected.source}`} target="_blank" rel="noreferrer"><Link2 size={16} /><span><small>Nguồn dùng cho câu trả lời</small><strong>{selected.source}</strong></span></a><footer><button onClick={correct}><RotateCcw size={15} /> Không phải ý này</button><span><Check size={14} /> Ý định đã được xác nhận</span></footer></article>
            )}
            {stage === "failed" && <article className="failureCard"><CircleHelp size={20} /><div><strong>Mình vẫn chưa xác định được ý anh sau hai lần hỏi.</strong><p>Hãy chọn một đoạn trong bài hoặc nhập câu hỏi có tên đối tượng cụ thể.</p><button onClick={() => reset()}>Bắt đầu lại</button></div></article>}

            <form className="composer" onSubmit={send}><textarea aria-label="Câu hỏi cho Clarify Tutor" value={composerText} onChange={(event) => setComposerText(event.target.value)} placeholder="Hỏi về bài đang mở…" rows={1} /><button type="submit" disabled={!composerText.trim()} aria-label="Gửi"><ArrowUp size={19} /></button><span>Clarify Tutor có thể sai. Hãy kiểm tra nguồn trước khi sử dụng.</span></form>
          </section>
          <RightPanel stage={stage} rounds={rounds} />
        </div>
      </main>
    </div>
  );
}
