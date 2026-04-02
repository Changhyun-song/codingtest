import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getProblemById } from "@/problems";
import { MasteryLevel } from "@/lib/types";

const SYSTEM_PROMPT = `You are a senior code reviewer and mentor for a student preparing for coding tests (LG AI Research).
The student just SOLVED the problem. Your job is to review their code and give constructive feedback.

RULES:
1. Always respond in Korean, but keep technical terms (function names, data structure names, algorithm names) in English
2. Be encouraging first — acknowledge what they did well
3. Then point out specific improvements with concrete code suggestions
4. Compare their approach to the reference solution
5. Analyze time/space complexity of both approaches
6. Keep it concise but thorough — use structured sections

RESPONSE FORMAT (use markdown):
## 잘한 점
- (what they did well, be specific)

## 개선할 점
- (concrete suggestions with brief code snippets if needed)

## 복잡도 분석
- 내 풀이: O(?) 시간 / O(?) 공간
- 참고 풀이: O(?) 시간 / O(?) 공간

## 참고 풀이
\`\`\`python
(reference solution code)
\`\`\`
(brief explanation of the reference approach)

## 핵심 교훈
- (1-2 key takeaways for the student to remember)`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { problemId, userCode, mastery } = body as {
    problemId: string;
    userCode: string;
    mastery: MasteryLevel;
  };

  const problem = getProblemById(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const masteryLabel =
    mastery === "perfect"
      ? "완벽 (1회 시도, 도움 없음)"
      : mastery === "good"
      ? "양호 (소수 시도, 최소 도움)"
      : "보조 풀이 (힌트/AI/다수 시도 사용)";

  const contextBlock = `
PROBLEM:
- Title: ${problem.title} (${problem.difficulty}, ${problem.category})
- Tags: ${problem.tags.join(", ")}
- Signature: ${problem.signature}
- Constraints: ${problem.constraints.join("; ")}
- Statement: ${problem.statement_en}

STUDENT'S MASTERY: ${masteryLabel}

STUDENT'S SOLUTION (accepted):
\`\`\`python
${userCode}
\`\`\`

REFERENCE SOLUTION:
\`\`\`python
${problem.solution_code || "(no reference solution available)"}
\`\`\`
${problem.solution_explanation ? `Reference explanation: ${problem.solution_explanation}` : ""}`;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      system: SYSTEM_PROMPT + "\n\n" + contextBlock,
      messages: [
        {
          role: "user",
          content: "내 풀이를 리뷰해 주세요.",
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ feedback: text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
