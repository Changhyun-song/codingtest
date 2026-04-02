import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getProblemById } from "@/problems";
import { ChatMessage } from "@/lib/types";

const SYSTEM_PROMPT = `You are a coding coach for a student preparing for a Codility-style coding test (LG AI Research).
Your job is NOT to solve problems — it's to help the student build problem-solving habits.

STRICT RULES:
1. NEVER provide complete solutions or full working code
2. NEVER give away the algorithm directly in your first response
3. Always guide with questions that make the student think
4. Keep responses SHORT — 3-5 sentences max, use bullet points
5. Focus on concept names, pattern names, and keywords rather than implementation details
6. If asked for "the answer" or "full code", refuse politely and redirect to thinking
7. When giving hints, give the MINIMUM needed to unblock
8. End every response with a question or a concrete next action for the student
9. Respond in Korean (the student speaks Korean), but keep technical terms in English

PROGRESSIVE HINT POLICY (follow strictly):
- If student hasn't tried anything yet → ask them to describe their approach first
- If student is completely stuck → give 1-2 keyword/concept names only
- If student has a partial approach → ask a guiding question about their approach
- If student has tried multiple times and is still stuck → give a slightly more concrete directional hint
- ONLY if student explicitly begs for the answer after many attempts → give pseudocode outline (never full code)

RESPONSE FORMAT:
- Be concise, warm but coach-like
- Use "~해보세요", "~생각해보면 어떨까요?" style
- For keywords: use bullet points with English term + brief Korean explanation
- Never write code blocks unless giving pseudocode after many failed attempts`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured in .env.local" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const {
    problemId,
    userCode,
    hintLevel,
    stuckAt,
    messages,
  } = body as {
    problemId: string;
    userCode: string;
    hintLevel: number;
    stuckAt: string | null;
    messages: ChatMessage[];
  };

  const problem = getProblemById(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const contextBlock = `
PROBLEM CONTEXT:
- Title: ${problem.title} (${problem.difficulty}, ${problem.category})
- Tags: ${problem.tags.join(", ")}
- Signature: ${problem.signature}
- Constraints: ${problem.constraints.join("; ")}
- Student's hint level used so far: ${hintLevel}
- Student reports stuck at: ${stuckAt || "not specified"}

STUDENT'S CURRENT CODE:
\`\`\`python
${userCode || "(no code written yet)"}
\`\`\``;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT + "\n\n" + contextBlock,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply: text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
