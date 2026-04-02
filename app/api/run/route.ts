import { NextRequest, NextResponse } from "next/server";
import { getProblemById } from "@/problems";
import { runPythonTests } from "@/lib/runner";
import { checkResult } from "@/lib/checker";
import { updateProblemProgress } from "@/lib/progress";
import { TestResult, RunResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { problemId, code } = body as { problemId: string; code: string };

  const problem = getProblemById(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const rawResults = await runPythonTests(
    code,
    problem.function_name,
    problem.sample_tests,
    problem.execution_mode
  );

  const results: TestResult[] = rawResults.map((r, i) => {
    const tc = problem.sample_tests[i];
    const passed =
      r.error === null &&
      checkResult(r.output, tc.expected, problem.checker_type, problem.tolerance);

    return {
      test_index: i,
      input: tc.input,
      expected: tc.expected,
      actual: r.output,
      passed,
      time_ms: r.time_ms,
      error: r.error,
    };
  });

  const allPassed = results.every((r) => r.passed);

  updateProblemProgress(problemId, {
    status: "attempted",
    attempts: (body.attempts ?? 0) + 1,
  });

  const response: RunResponse = { results, all_passed: allPassed };
  return NextResponse.json(response);
}
