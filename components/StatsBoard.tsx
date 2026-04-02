"use client";

import { ProblemSummary } from "@/lib/types";

interface StatsBoardProps {
  problems: ProblemSummary[];
}

const CATEGORY_LABELS: Record<string, string> = {
  algorithm: "Algorithm",
  ai: "AI / NLP",
  pytorch: "PyTorch",
  pandas: "pandas",
  sklearn: "scikit-learn",
};

const CATEGORY_COLORS: Record<string, string> = {
  algorithm: "#58a6ff",
  ai: "#a371f7",
  pytorch: "#f0883e",
  pandas: "#3fb950",
  sklearn: "#d29922",
};

export default function StatsBoard({ problems }: StatsBoardProps) {
  const categories = Object.keys(CATEGORY_LABELS);

  const totalSolved = problems.filter((p) => p.status === "solved").length;
  const totalCount = problems.length;
  const perfectCount = problems.filter((p) => p.mastery === "perfect").length;
  const assistedCount = problems.filter((p) => p.mastery === "assisted").length;

  const stats = categories.map((cat) => {
    const catProblems = problems.filter((p) => p.category === cat);
    const solved = catProblems.filter((p) => p.status === "solved").length;
    const attempted = catProblems.filter((p) => p.status === "attempted" || p.status === "failed").length;
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      color: CATEGORY_COLORS[cat],
      total: catProblems.length,
      solved,
      attempted,
    };
  });

  return (
    <div className="mb-8 rounded-lg border border-[#30363d] bg-[#0d1117] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#e6edf3]">학습 현황</h2>
        <div className="flex items-center gap-4 text-sm text-[#8b949e]">
          <span><span className="text-[#3fb950] font-semibold">{totalSolved}</span> / {totalCount} 해결</span>
          {perfectCount > 0 && <span className="text-[#3fb950]">⭐⭐⭐ {perfectCount}</span>}
          {assistedCount > 0 && <span className="text-[#d29922]">⭐ 복습필요 {assistedCount}</span>}
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-[#21262d]">
        <div
          className="h-full rounded-full bg-[#3fb950] transition-all duration-500"
          style={{ width: `${totalCount > 0 ? (totalSolved / totalCount) * 100 : 0}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.category}
            className="rounded-md border border-[#30363d] bg-[#161b22] p-3"
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs font-semibold text-[#e6edf3]">{s.label}</span>
            </div>
            <div className="mb-1 flex items-baseline gap-1">
              <span className="text-xl font-bold" style={{ color: s.color }}>
                {s.solved}
              </span>
              <span className="text-sm text-[#484f58]">/ {s.total}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${s.total > 0 ? (s.solved / s.total) * 100 : 0}%`,
                  backgroundColor: s.color,
                }}
              />
            </div>
            {s.attempted > 0 && (
              <div className="mt-1 text-[10px] text-[#d29922]">
                {s.attempted}개 진행 중
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
