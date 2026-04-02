"use client";

import { ProblemSummary } from "@/lib/types";

const DIFF_COLORS: Record<string, string> = {
  easy: "text-[#3fb950]",
  medium: "text-[#d29922]",
  hard: "text-[#f85149]",
};

export default function RecommendedProblems({
  problems,
}: {
  problems: ProblemSummary[];
}) {
  if (problems.length === 0) return null;

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">
        추천 후속 문제
      </h3>
      <div className="space-y-2">
        {problems.map((p) => (
          <a
            key={p.id}
            href={`/problems/${p.id}`}
            className="block rounded-md border border-[#30363d] bg-[#161b22] p-3 transition-colors hover:border-[#58a6ff] hover:bg-[#21262d]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#58a6ff]">
                {p.title}
              </span>
              <span className={`text-xs font-semibold capitalize ${DIFF_COLORS[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-[#8b949e]">{p.category}</span>
              <span className="text-[#30363d]">·</span>
              <div className="flex gap-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-[#21262d] px-1.5 py-0.5 text-[10px] text-[#8b949e]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
