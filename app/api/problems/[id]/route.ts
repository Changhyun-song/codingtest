import { NextRequest, NextResponse } from "next/server";
import { getProblemById, ALL_PROBLEMS } from "@/problems";
import { loadProgress } from "@/lib/progress";
import { generateCoachingData } from "@/lib/coaching";
import { isBasicProblem, getPrerequisites, getBasicInfo, BasicInfo } from "@/lib/learning-path";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const problem = getProblemById(params.id);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const progress = loadProgress();
  const status = progress[problem.id]?.status ?? "unseen";
  const attempts = progress[problem.id]?.attempts ?? 0;
  const isBasic = isBasicProblem(problem.id);
  const canSeeSolution = isBasic || status === "solved" || attempts >= 3;

  const prereqs = getPrerequisites(problem.id);
  const unmetPrereqs = prereqs.filter(
    (pid) => progress[pid]?.status !== "solved"
  );
  const locked = unmetPrereqs.length > 0;

  const lockedByNames = unmetPrereqs.map((pid) => {
    const p = ALL_PROBLEMS.find((prob) => prob.id === pid);
    return { id: pid, title: p?.title ?? pid };
  });

  const coaching = generateCoachingData(problem);
  if (!canSeeSolution) {
    coaching.hints = coaching.hints.filter((h) => h.level < 5);
  }

  let starterCode = problem.starter_code;
  if (isBasic) {
    const firstLine = starterCode.split("\n")[0];
    starterCode = firstLine + "\n    pass";
  }

  const safe = {
    id: problem.id,
    title: problem.title,
    category: problem.category,
    difficulty: problem.difficulty,
    tags: problem.tags,
    statement_en: problem.statement_en,
    function_name: problem.function_name,
    signature: problem.signature,
    constraints: problem.constraints,
    examples: problem.examples,
    starter_code: starterCode,
    hints: isBasic ? [] : (problem.hints ?? []),
    sample_tests: problem.sample_tests,
    checker_type: problem.checker_type,
    similar_problem_ids: problem.similar_problem_ids,
    fallback_problem_ids: problem.fallback_problem_ids,
    status,
    attempts,
    hidden_test_count: problem.hidden_tests.length,
    solution_code: canSeeSolution ? (problem.solution_code ?? null) : null,
    solution_explanation: canSeeSolution ? (problem.solution_explanation ?? null) : null,
    coaching,
    is_basic: isBasic,
    basic_info: isBasic ? getBasicInfo(problem.id) : null,
    locked,
    locked_by: lockedByNames,
    execution_mode: problem.execution_mode ?? "python_concept",
  };

  return NextResponse.json(safe);
}
