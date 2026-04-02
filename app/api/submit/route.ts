import { NextRequest, NextResponse } from "next/server";
import { getProblemById, ALL_PROBLEMS } from "@/problems";
import { runPythonTests } from "@/lib/runner";
import { checkResult } from "@/lib/checker";
import { updateProblemProgress, loadProgress } from "@/lib/progress";
import { getRecommendations, getFailureCategories } from "@/lib/recommender";
import { TestResult, SubmitResponse, MasteryLevel } from "@/lib/types";
import { isBasicProblem } from "@/lib/learning-path";
import { addReviewNotes } from "@/lib/review-notes";

function calculateMastery(
  totalAttempts: number,
  hintsUsed: number,
  aiChatsUsed: number,
  keywordsRevealed: boolean
): MasteryLevel {
  if (totalAttempts <= 1 && hintsUsed === 0 && aiChatsUsed === 0 && !keywordsRevealed) {
    return "perfect";
  }
  if (totalAttempts <= 2 && hintsUsed <= 1 && aiChatsUsed === 0) {
    return "good";
  }
  return "assisted";
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { problemId, code, hintsUsed = 0, aiChatsUsed = 0, keywordsRevealed = false } = body as {
    problemId: string;
    code: string;
    hintsUsed?: number;
    aiChatsUsed?: number;
    keywordsRevealed?: boolean;
  };

  const problem = getProblemById(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const sampleRaw = await runPythonTests(
    code,
    problem.function_name,
    problem.sample_tests,
    problem.execution_mode
  );
  const sampleResults: TestResult[] = sampleRaw.map((r, i) => {
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

  const hiddenRaw = await runPythonTests(
    code,
    problem.function_name,
    problem.hidden_tests,
    problem.execution_mode
  );

  const failedHiddenIndices: number[] = [];
  let hiddenPassed = 0;

  hiddenRaw.forEach((r, i) => {
    const tc = problem.hidden_tests[i];
    const passed =
      r.error === null &&
      checkResult(r.output, tc.expected, problem.checker_type, problem.tolerance);
    if (passed) {
      hiddenPassed++;
    } else {
      failedHiddenIndices.push(i);
    }
  });

  const allSamplePassed = sampleResults.every((r) => r.passed);
  const allHiddenPassed = hiddenPassed === problem.hidden_tests.length;
  const solved = allSamplePassed && allHiddenPassed;

  const failureCategories = solved
    ? []
    : getFailureCategories(failedHiddenIndices, problem.hidden_tests);

  const progress = loadProgress();
  const prevAttempts = progress[problemId]?.attempts ?? 0;
  const totalAttempts = prevAttempts + 1;

  const isBasic = isBasicProblem(problemId);
  const mastery = solved
    ? isBasic
      ? ("perfect" as MasteryLevel)
      : calculateMastery(totalAttempts, hintsUsed, aiChatsUsed, keywordsRevealed)
    : null;

  updateProblemProgress(problemId, {
    status: solved ? "solved" : "failed",
    attempts: totalAttempts,
    failure_categories: failureCategories,
    hints_used: hintsUsed,
    ai_chats_used: aiChatsUsed,
    keywords_revealed: keywordsRevealed,
    ...(solved ? { solved_at: new Date().toISOString(), mastery } : {}),
  });

  if (!solved || mastery === "assisted") {
    addReviewNotes(problemId);
  }

  const updatedProgress = loadProgress();

  const needsPractice = solved && mastery === "assisted";
  const recommendations = solved
    ? needsPractice
      ? getRecommendations(problem, ALL_PROBLEMS, updatedProgress)
      : []
    : getRecommendations(problem, ALL_PROBLEMS, updatedProgress);

  const response: SubmitResponse = {
    status: solved ? "solved" : "failed",
    sample_results: sampleResults,
    hidden_passed: hiddenPassed,
    hidden_total: problem.hidden_tests.length,
    failure_categories: failureCategories,
    recommendations,
    mastery,
  };

  return NextResponse.json(response);
}
