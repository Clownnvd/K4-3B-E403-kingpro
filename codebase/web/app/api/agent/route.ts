const AGENT_BASE_URL = process.env.AGENT_BASE_URL ?? "http://127.0.0.1:8000";

type AgentProxyRequest = {
  action: "start" | "resume";
  thread_id?: string;
  question?: string;
  lesson_id?: string;
  lesson_title?: string;
  option_id?: string;
  custom_text?: string;
};

export async function POST(request: Request) {
  const body = await request.json() as AgentProxyRequest;
  if (body.action !== "start" && body.action !== "resume") {
    return Response.json({ detail: "action must be start or resume" }, { status: 400 });
  }
  if (body.action === "resume" && !body.thread_id) {
    return Response.json({ detail: "thread_id is required for resume" }, { status: 400 });
  }

  const target = body.action === "start"
    ? `${AGENT_BASE_URL}/api/sessions`
    : `${AGENT_BASE_URL}/api/sessions/${body.thread_id}/resume`;
  const payload = body.action === "start"
    ? { question: body.question, lesson_id: body.lesson_id, lesson_title: body.lesson_title }
    : { option_id: body.option_id, custom_text: body.custom_text };

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(35_000),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { detail: error instanceof Error ? error.message : "Agent service unavailable" },
      { status: 502 },
    );
  }
}
