"use client";

import { useState, useMemo, useEffect } from "react";
import { ProblemSummary } from "@/lib/types";
import { getReviewMap } from "@/lib/coachingStore";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-[#3fb950]",
  medium: "text-[#d29922]",
  hard: "text-[#f85149]",
};

const STATUS_ICONS: Record<string, { icon: string; color: string }> = {
  unseen: { icon: "○", color: "text-[#484f58]" },
  attempted: { icon: "◐", color: "text-[#d29922]" },
  solved: { icon: "●", color: "text-[#3fb950]" },
  failed: { icon: "✕", color: "text-[#f85149]" },
};

const CATEGORIES = ["all", "algorithm", "ai", "pytorch", "pandas", "sklearn"];
const DIFFICULTIES = ["all", "easy", "medium", "hard"];

export default function ProblemList({
  problems,
}: {
  problems: ProblemSummary[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [reviewMap, setReviewMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setReviewMap(getReviewMap());
  }, []);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (modeFilter !== "all") {
        const pMode = p.execution_mode || "python_concept";
        if (modeFilter !== pMode) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [problems, search, category, difficulty, statusFilter, modeFilter]);

  const stats = useMemo(() => {
    const total = problems.length;
    const solved = problems.filter((p) => p.status === "solved").length;
    const attempted = problems.filter((p) => p.status === "attempted").length;
    const failed = problems.filter((p) => p.status === "failed").length;
    return { total, solved, attempted, failed };
  }, [problems]);

  return (
    <div>
      <div className="mb-6 grid grid-cols-4 gap-3">
        <StatCard label="전체" value={stats.total} color="text-[#58a6ff]" />
        <StatCard label="해결" value={stats.solved} color="text-[#3fb950]" />
        <StatCard label="시도 중" value={stats.attempted} color="text-[#d29922]" />
        <StatCard label="실패" value={stats.failed} color="text-[#f85149]" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="문제 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] focus:border-[#58a6ff] focus:outline-none"
        />
        <FilterSelect
          value={category}
          onChange={setCategory}
          options={CATEGORIES}
          label="카테고리"
        />
        <FilterSelect
          value={difficulty}
          onChange={setDifficulty}
          options={DIFFICULTIES}
          label="난이도"
        />
        <FilterSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={["all", "unseen", "attempted", "solved", "failed"]}
          label="상태"
        />
        <FilterSelect
          value={modeFilter}
          onChange={setModeFilter}
          options={["all", "python_concept", "pytorch_real"]}
          label="모드"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-[#30363d]">
        <table className="w-full text-sm">
          <thead className="bg-[#161b22] text-[#8b949e]">
            <tr>
              <th className="w-12 px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="w-28 px-4 py-3 text-left">카테고리</th>
              <th className="w-24 px-4 py-3 text-left">난이도</th>
              <th className="px-4 py-3 text-left">태그</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const st = STATUS_ICONS[p.status] ?? STATUS_ICONS.unseen;
              return (
                <tr
                  key={p.id}
                  className={`border-t border-[#21262d] transition-colors ${
                    p.locked
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#161b22] cursor-pointer"
                  }`}
                  onClick={() => {
                    window.location.href = `/problems/${p.id}`;
                  }}
                >
                  <td className="px-4 py-3">
                    {p.locked ? (
                      <span className="text-[#484f58]" title="선수 학습 필요">🔒</span>
                    ) : (
                      <span className={st.color} title={p.status}>
                        {st.icon}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#e6edf3]">
                    <span className="flex items-center gap-2">
                      {p.execution_mode === "pytorch_real" && (
                        <span className="rounded bg-[#ee4c2c]/20 border border-[#ee4c2c]/40 px-1.5 py-0.5 text-[9px] font-bold text-[#ee4c2c] shrink-0">PyTorch</span>
                      )}
                      {p.is_basic && (
                        <span className="rounded bg-[#1f6feb] px-1.5 py-0.5 text-[9px] font-bold text-white shrink-0">기본</span>
                      )}
                      {p.title}
                      {p.mastery === "perfect" && (
                        <span className="rounded bg-[#238636]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#3fb950]" title="도움 없이 풀이">⭐⭐⭐</span>
                      )}
                      {p.mastery === "good" && (
                        <span className="rounded bg-[#1f6feb]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#58a6ff]" title="약간의 도움">⭐⭐</span>
                      )}
                      {p.mastery === "assisted" && (
                        <span className="rounded bg-[#d29922]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#d29922]" title="도움 받아 풀이 — 복습 필요">⭐ 복습</span>
                      )}
                      {!p.mastery && reviewMap[p.id] && reviewMap[p.id] <= new Date().toISOString().split("T")[0] && (
                        <span className="rounded bg-[#d29922]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#d29922]">복습</span>
                      )}
                      {p.locked && p.locked_by && p.locked_by.length > 0 && (
                        <span className="text-[10px] text-[#484f58]">
                          (선수: {p.locked_by.map((bid: string) => {
                            const bp = problems.find((x) => x.id === bid);
                            return bp ? bp.title : bid;
                          }).join(", ")})
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#21262d] px-2 py-0.5 text-xs text-[#8b949e]">
                      {p.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-xs font-semibold capitalize ${DIFFICULTY_COLORS[p.difficulty]}`}>
                    {p.difficulty}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded bg-[#21262d] px-1.5 py-0.5 text-[10px] text-[#8b949e]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#484f58]">
                  검색 조건에 맞는 문제가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3">
      <div className="text-xs text-[#8b949e]">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
      aria-label={label}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o === "all" ? `전체 ${label}` : o.charAt(0).toUpperCase() + o.slice(1)}
        </option>
      ))}
    </select>
  );
}
