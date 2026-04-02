"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ProblemSummary } from "@/lib/types";

type MockState = "setup" | "running" | "finished";

interface ProblemResult {
  problemId: string;
  title: string;
  category: string;
  difficulty: string;
  status: "pending" | "solved" | "failed" | "skipped";
  hiddenPassed: number;
  hiddenTotal: number;
}

export default function MockTestPage() {
  const [allProblems, setAllProblems] = useState<ProblemSummary[]>([]);
  const [state, setState] = useState<MockState>("setup");
  const [numProblems, setNumProblems] = useState(5);
  const [timeLimit, setTimeLimit] = useState(120);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "algorithm",
    "ai",
    "pytorch",
  ]);
  const [selected, setSelected] = useState<ProblemSummary[]>([]);
  const [results, setResults] = useState<ProblemResult[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/problems")
      .then((r) => r.json())
      .then(setAllProblems)
      .catch(() => {});
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const startTest = useCallback(() => {
    const pool = allProblems.filter((p) =>
      selectedCategories.includes(p.category)
    );
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const pick = shuffled.slice(0, Math.min(numProblems, shuffled.length));
    setSelected(pick);
    setResults(
      pick.map((p) => ({
        problemId: p.id,
        title: p.title,
        category: p.category,
        difficulty: p.difficulty,
        status: "pending",
        hiddenPassed: 0,
        hiddenTotal: 0,
      }))
    );
    setSecondsLeft(timeLimit * 60);
    setState("running");
  }, [allProblems, numProblems, timeLimit, selectedCategories]);

  useEffect(() => {
    if (state === "running" && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setState("finished");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, secondsLeft]);

  const finishTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setResults((prev) =>
      prev.map((r) => (r.status === "pending" ? { ...r, status: "skipped" } : r))
    );
    setState("finished");
  }, []);

  const markResult = useCallback(
    (problemId: string, status: "solved" | "failed", hp: number, ht: number) => {
      setResults((prev) =>
        prev.map((r) =>
          r.problemId === problemId
            ? { ...r, status, hiddenPassed: hp, hiddenTotal: ht }
            : r
        )
      );
    },
    []
  );

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isDanger = mins < 5;
  const isWarning = mins < 15;

  // Setup screen
  if (state === "setup") {
    const categories = ["algorithm", "ai", "pytorch"];
    const labels: Record<string, string> = {
      algorithm: "Algorithm",
      ai: "AI / NLP",
      pytorch: "PyTorch",
    };

    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <a href="/" className="mb-6 inline-block text-sm text-[#58a6ff] hover:underline">
          ← 문제 목록으로
        </a>
        <h1 className="mb-2 text-2xl font-bold text-[#e6edf3]">모의 테스트 설정</h1>
        <p className="mb-8 text-sm text-[#8b949e]">
          실제 Codility 코딩 테스트를 시뮬레이션합니다. 카테고리, 문제 수, 시간 제한을 설정하세요.
        </p>

        <div className="space-y-6 rounded-lg border border-[#30363d] bg-[#0d1117] p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#e6edf3]">카테고리</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategories.includes(cat)
                      ? "bg-[#1f6feb] text-white"
                      : "border border-[#30363d] bg-[#21262d] text-[#8b949e] hover:border-[#8b949e]"
                  }`}
                >
                  {labels[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#e6edf3]">
                문제 수
              </label>
              <select
                value={numProblems}
                onChange={(e) => setNumProblems(Number(e.target.value))}
                className="w-full rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
              >
                {[3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>{n}문제</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#e6edf3]">
                시간 제한 (분)
              </label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
              >
                {[60, 90, 120, 150, 180].map((m) => (
                  <option key={m} value={m}>{m}분</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={startTest}
            disabled={selectedCategories.length === 0}
            className="w-full rounded-md bg-[#238636] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2ea043] disabled:opacity-50"
          >
            모의 테스트 시작
          </button>
        </div>
      </div>
    );
  }

  // Running / Finished screen
  const solvedCount = results.filter((r) => r.status === "solved").length;
  const totalScore = results.reduce((acc, r) => {
    if (r.hiddenTotal === 0) return acc;
    return acc + Math.round((r.hiddenPassed / r.hiddenTotal) * 100);
  }, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#e6edf3]">
            {state === "finished" ? "모의 테스트 결과" : "모의 테스트 진행 중"}
          </h1>
          <p className="mt-1 text-xs text-[#8b949e]">
            {selected.length}문제 | {timeLimit}분
          </p>
        </div>
        <div className="flex items-center gap-4">
          {state === "running" && (
            <>
              <div
                className={`font-mono text-lg font-bold tabular-nums ${
                  isDanger ? "text-[#f85149]" : isWarning ? "text-[#d29922]" : "text-[#e6edf3]"
                }`}
              >
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <button
                onClick={finishTest}
                className="rounded-md bg-[#da3633] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#f85149]"
              >
                테스트 종료
              </button>
            </>
          )}
          {state === "finished" && (
            <div className="text-right">
              <div className="text-2xl font-bold text-[#3fb950]">
                {totalScore} / {results.length * 100}
              </div>
              <div className="text-xs text-[#8b949e]">
                {solvedCount}/{results.length} 완전 해결
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Problem list */}
      <div className="space-y-3">
        {results.map((r, i) => {
          const statusColors = {
            pending: "border-[#30363d] bg-[#161b22]",
            solved: "border-[#238636] bg-[#0d1117]",
            failed: "border-[#da3633] bg-[#0d1117]",
            skipped: "border-[#484f58] bg-[#0d1117]",
          };
          const statusLabels = {
            pending: "미시도",
            solved: "해결",
            failed: "실패",
            skipped: "건너뜀",
          };
          const score =
            r.hiddenTotal > 0
              ? Math.round((r.hiddenPassed / r.hiddenTotal) * 100)
              : 0;

          return (
            <div
              key={r.problemId}
              className={`flex items-center justify-between rounded-md border p-4 ${statusColors[r.status]}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#21262d] text-sm font-bold text-[#8b949e]">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-[#e6edf3]">{r.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-[#8b949e]">{r.category}</span>
                    <span className={`text-[10px] ${
                      r.difficulty === "easy" ? "text-[#3fb950]" : r.difficulty === "medium" ? "text-[#d29922]" : "text-[#f85149]"
                    }`}>
                      {r.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {r.status !== "pending" && (
                  <span className="text-sm font-mono text-[#8b949e]">{score}%</span>
                )}
                <span
                  className={`rounded-md px-2 py-0.5 text-xs ${
                    r.status === "solved"
                      ? "bg-[#238636]/20 text-[#3fb950]"
                      : r.status === "failed"
                      ? "bg-[#da3633]/20 text-[#f85149]"
                      : r.status === "skipped"
                      ? "bg-[#484f58]/20 text-[#8b949e]"
                      : "bg-[#21262d] text-[#8b949e]"
                  }`}
                >
                  {statusLabels[r.status]}
                </span>
                {state === "running" && r.status === "pending" && (
                  <a
                    href={`/problems/${r.problemId}?mock=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-[#1f6feb] px-3 py-1 text-xs font-medium text-white hover:bg-[#388bfd]"
                  >
                    풀기
                  </a>
                )}
                {state === "running" && r.status !== "pending" && (
                  <a
                    href={`/problems/${r.problemId}?mock=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#58a6ff] hover:underline"
                  >
                    다시 보기
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center gap-3">
        {state === "finished" && (
          <>
            <a
              href="/mock-test"
              onClick={(e) => {
                e.preventDefault();
                setState("setup");
                setResults([]);
                setSelected([]);
              }}
              className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#e6edf3] hover:border-[#8b949e]"
            >
              새 모의 테스트
            </a>
            <a
              href="/"
              className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#388bfd]"
            >
              문제 목록으로
            </a>
          </>
        )}
      </div>

      {/* Auto-refresh results for running state */}
      {state === "running" && <MockResultPoller problemIds={results.map((r) => r.problemId)} onUpdate={markResult} />}
    </div>
  );
}

function MockResultPoller({
  problemIds,
  onUpdate,
}: {
  problemIds: string[];
  onUpdate: (id: string, status: "solved" | "failed", hp: number, ht: number) => void;
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/progress")
        .then((r) => r.json())
        .then((progress: Record<string, { status: string }>) => {
          for (const pid of problemIds) {
            const p = progress[pid];
            if (p && (p.status === "solved" || p.status === "failed")) {
              onUpdate(pid, p.status as "solved" | "failed", 0, 0);
            }
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [problemIds, onUpdate]);

  return null;
}
