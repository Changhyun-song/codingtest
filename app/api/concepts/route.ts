import { NextResponse } from "next/server";
import { ALL_CONCEPTS } from "@/lib/concepts";
import { loadProgress } from "@/lib/progress";
import { ALL_PROBLEMS } from "@/problems";

export type ConceptStatus = "not_started" | "learning" | "review" | "completed";

export interface ConceptWithProgress {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  explanation: string;
  codeTemplate: string;
  status: ConceptStatus;
  solvedCount: number;
  totalCount: number;
  problems: {
    id: string;
    title: string;
    difficulty: string;
    status: string;
    mastery: string | null;
  }[];
}

export async function GET() {
  const progress = loadProgress();

  const problemMap = new Map(ALL_PROBLEMS.map((p) => [p.id, p]));

  const concepts: ConceptWithProgress[] = ALL_CONCEPTS.map((concept) => {
    const problems = concept.relatedProblems
      .filter((pid) => problemMap.has(pid))
      .map((pid) => {
        const p = problemMap.get(pid)!;
        const prog = progress[pid];
        return {
          id: pid,
          title: p.title,
          difficulty: p.difficulty,
          status: prog?.status ?? "unseen",
          mastery: prog?.mastery ?? null,
        };
      });

    const solvedCount = problems.filter((p) => p.status === "solved").length;
    const totalCount = problems.length;
    const hasAttempted = problems.some(
      (p) => p.status === "attempted" || p.status === "failed"
    );
    const hasAssisted = problems.some((p) => p.mastery === "assisted");

    let status: ConceptStatus = "not_started";
    if (solvedCount === totalCount && totalCount > 0) {
      status = hasAssisted ? "review" : "completed";
    } else if (solvedCount > 0) {
      status = "learning";
    } else if (hasAttempted) {
      status = "review";
    }

    return {
      id: concept.id,
      name: concept.name,
      category: concept.category,
      difficulty: concept.difficulty,
      explanation: concept.explanation,
      codeTemplate: concept.codeTemplate,
      status,
      solvedCount,
      totalCount,
      problems,
    };
  });

  return NextResponse.json(concepts);
}
