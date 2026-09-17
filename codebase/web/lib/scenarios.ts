export type ScenarioId = "link" | "answer" | "acronym" | "reference";

export type ClarificationOption = {
  id: string;
  label: string;
  detail: string;
  answer: string;
  source: string;
};

export type Scenario = {
  id: ScenarioId;
  label: string;
  question: string;
  prompt: string;
  reason: string;
  options: ClarificationOption[];
};

export const scenarios: Scenario[] = [
  {
    id: "link",
    label: "Cho tôi link",
    question: "cho tôi link",
    prompt: "Anh cần link nào trong phần Mini Hackathon?",
    reason: "Câu hỏi chưa chỉ rõ loại tài liệu. Trả lời ngay có thể gửi nhầm link lớp hoặc nhầm checkpoint.",
    options: [
      {
        id: "official-repo",
        label: "Repo đề bài chính thức lớp 3B",
        detail: "Nơi đọc track, rubric và dữ liệu mẫu",
        answer: "Đây là repo đề bài chính thức dành cho lớp 3B.",
        source: "github.com/VinUni-AI20k/K4-3B-Day05-06-AI-Product-Hackathon",
      },
      {
        id: "team-repo",
        label: "Repo của nhóm kingpro",
        detail: "Canvas, sơ đồ LangGraph và prototype",
        answer: "Đây là repo public của nhóm kingpro.",
        source: "github.com/Clownnvd/K4-3B-E403-kingpro",
      },
      {
        id: "checkpoint-form",
        label: "Form nộp checkpoint",
        detail: "Chọn rõ CP1, CP2 hoặc checkpoint khác",
        answer: "Anh đang cần form checkpoint nào: CP1, CP2, CP3, CP4 hay CP5?",
        source: "Live board Mini Hackathon · lớp 3B",
      },
    ],
  },
  {
    id: "answer",
    label: "Đáp án gì?",
    question: "đáp án gì",
    prompt: "Anh muốn hỏi đáp án của câu nào?",
    reason: "Trang đang mở có nhiều câu hỏi và nhiều checkpoint nên Tutor chưa thể xác định đối tượng.",
    options: [
      { id: "quiz", label: "Câu quiz đang mở", detail: "Giải thích để tự chọn đáp án", answer: "Anh gửi nội dung câu quiz, em sẽ giải thích từng lựa chọn mà không làm hộ.", source: "Nội dung bài đang mở" },
      { id: "cp", label: "Yêu cầu checkpoint", detail: "CP1, CP2 hoặc mốc tiếp theo", answer: "Anh đang hỏi yêu cầu của checkpoint nào?", source: "Hướng dẫn Mini Hackathon" },
      { id: "exercise", label: "Bài tập trong slide", detail: "Chỉ rõ trang hoặc đoạn", answer: "Anh chọn đoạn hoặc gửi số trang để em đối chiếu đúng bài.", source: "Slide bài học hiện tại" },
    ],
  },
  {
    id: "acronym",
    label: "cgi",
    question: "cgi",
    prompt: "“cgi” đang được dùng theo nghĩa nào?",
    reason: "Từ viết tắt có nhiều cách hiểu; Tutor không nên tự gán nghĩa theo ngữ cảnh gần nhất.",
    options: [
      { id: "term", label: "Thuật ngữ lập trình CGI", detail: "Common Gateway Interface", answer: "CGI là chuẩn để web server chạy chương trình ngoài và trả kết quả HTTP.", source: "Khái niệm web cơ bản" },
      { id: "typo", label: "Em gõ nhầm", detail: "Nhập lại câu muốn hỏi", answer: "Không sao, anh nhập lại câu đầy đủ giúp em nhé.", source: "Thông tin do người dùng xác nhận" },
      { id: "course", label: "Một từ viết tắt trong bài", detail: "Chọn đoạn đang nói tới", answer: "Anh chọn đoạn trong bài để em xác định đúng từ viết tắt.", source: "Bài học đang mở" },
    ],
  },
  {
    id: "reference",
    label: "Cái này là gì?",
    question: "cái này là gì",
    prompt: "“Cái này” đang chỉ nội dung nào trên trang?",
    reason: "Không có đoạn được chọn nên đại từ chưa gắn với một đối tượng cụ thể.",
    options: [
      { id: "selected", label: "Đoạn văn em vừa chọn", detail: "Dùng vùng bôi đen hiện tại", answer: "Em sẽ giải thích đúng đoạn anh vừa chọn.", source: "Selection trong bài học" },
      { id: "diagram", label: "Sơ đồ đang hiển thị", detail: "Giải thích các node và nhánh", answer: "Đây là sơ đồ luồng quyết định của Tutor.", source: "Sơ đồ trên trang hiện tại" },
      { id: "task", label: "Yêu cầu của bài lab", detail: "Tóm tắt việc cần hoàn thành", answer: "Em sẽ tóm tắt đúng yêu cầu của phần đang mở.", source: "Nội dung lab hiện tại" },
    ],
  },
];
