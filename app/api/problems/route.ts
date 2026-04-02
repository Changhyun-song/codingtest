import { NextResponse } from "next/server";
import { ALL_PROBLEMS } from "@/problems";
import { loadProgress } from "@/lib/progress";
import { ProblemSummary } from "@/lib/types";
import { isBasicProblem, getPrerequisites } from "@/lib/learning-path";

export async function GET() {
  const progress = loadProgress();

  const summaries: ProblemSummary[] = ALL_PROBLEMS.map((p) => {
    const prereqs = getPrerequisites(p.id);
    const unmetPrereqs = prereqs.filter(
      (pid) => progress[pid]?.status !== "solved"
    );
    return {
      id: p.id,
      title: p.title,
      category: p.category,
      difficulty: p.difficulty,
      tags: p.tags,
      status: progress[p.id]?.status ?? "unseen",
      mastery: progress[p.id]?.mastery ?? null,
      is_basic: isBasicProblem(p.id),
      locked: unmetPrereqs.length > 0,
      locked_by: unmetPrereqs,
      execution_mode: p.execution_mode ?? "python_concept",
    };
  });

  return NextResponse.json(summaries);
}
