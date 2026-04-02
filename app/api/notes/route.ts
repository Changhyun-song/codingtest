import { NextRequest, NextResponse } from "next/server";
import { loadReviewNotes, markUnderstood, markNotUnderstood, backfillFromProgress } from "@/lib/review-notes";
import { ALL_CONCEPTS } from "@/lib/concepts";
import { ALL_PROBLEMS } from "@/problems";

const conceptMap = new Map(ALL_CONCEPTS.map((c) => [c.id, c]));
const problemMap = new Map(ALL_PROBLEMS.map((p) => [p.id, p]));

export async function GET() {
  backfillFromProgress();
  const notes = loadReviewNotes();

  const entries = Object.values(notes)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((entry) => {
      const concept = conceptMap.get(entry.conceptId);
      if (!concept) return null;

      return {
        conceptId: entry.conceptId,
        name: concept.name,
        category: concept.category,
        explanation: concept.explanation,
        codeTemplate: concept.codeTemplate,
        addedAt: entry.addedAt,
        updatedAt: entry.updatedAt,
        understood: entry.understood,
        triggeredBy: entry.triggeredBy.map((pid) => {
          const p = problemMap.get(pid);
          return p ? { id: pid, title: p.title, difficulty: p.difficulty } : null;
        }).filter(Boolean),
        practiceProblems: concept.relatedProblems
          .map((pid) => {
            const p = problemMap.get(pid);
            return p ? { id: pid, title: p.title, difficulty: p.difficulty } : null;
          })
          .filter(Boolean),
      };
    })
    .filter(Boolean);

  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const { conceptId, understood } = await request.json();
  if (understood) {
    markUnderstood(conceptId);
  } else {
    markNotUnderstood(conceptId);
  }
  return NextResponse.json({ ok: true });
}
