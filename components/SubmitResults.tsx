"use client";

import { SubmitResponse } from "@/lib/types";
import { FAILURE_MESSAGES } from "@/lib/recommender";
import RecommendedProblems from "./RecommendedProblems";

interface SubmitResultsProps {
  result: SubmitResponse | null;
  loading: boolean;
}

export default function SubmitResults({ result, loading }: SubmitResultsProps) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-[#8b949e]">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          채점 중...
        </div>
      </div>
    );
  }

  if (!result) return null;

  const isSolved = result.status === "solved";

  return (
    <div className="h-full overflow-y-auto p-3">
      <div
        className={`mb-4 rounded-lg p-4 ${
          isSolved
            ? "border border-[#238636]/40 bg-[#238636]/10"
            : "border border-[#da3633]/40 bg-[#da3633]/10"
        }`}
      >
        <div className="flex items-center gap-2 text-lg font-bold">
          {isSolved ? (
            <>
              <span className="text-[#3fb950]">✓</span>
              <span className="text-[#3fb950]">정답!</span>
            </>
          ) : (
            <>
              <span className="text-[#f85149]">✕</span>
              <span className="text-[#f85149]">오답</span>
            </>
          )}
        </div>

        <div className="mt-2 text-sm text-[#8b949e]">
          히든 테스트: {result.hidden_passed}/{result.hidden_total} 통과
        </div>

        {isSolved && result.mastery && (
          <div className={`mt-3 rounded-md px-3 py-2 text-sm font-medium ${
            result.mastery === "perfect"
              ? "border border-[#238636]/40 bg-[#238636]/10 text-[#3fb950]"
              : result.mastery === "good"
              ? "border border-[#1f6feb]/40 bg-[#1f6feb]/10 text-[#58a6ff]"
              : "border border-[#d29922]/40 bg-[#d29922]/10 text-[#d29922]"
          }`}>
            {result.mastery === "perfect" && "⭐⭐⭐ 완벽! 도움 없이 한 번에 풀었습니다."}
            {result.mastery === "good" && "⭐⭐ 양호! 약간의 시도가 있었지만 잘 풀었습니다."}
            {result.mastery === "assisted" && "⭐ 보조 풀이 — 힌트/AI/다수 시도를 사용했습니다. 3일 후 복습이 예약되었습니다."}
          </div>
        )}
      </div>

      {isSolved && result.mastery === "assisted" && result.recommendations.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[#d29922]">
            실력 강화를 위한 유사 문제
          </h3>
          <p className="mb-2 text-xs text-[#8b949e]">
            도움을 받아 풀었으므로, 아래 유사 문제를 직접 풀어보며 개념을 확실히 익히세요.
          </p>
          <RecommendedProblems problems={result.recommendations} />
        </div>
      )}

      {!isSolved && result.failure_categories.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">
            약점 분석
          </h3>
          <div className="space-y-1">
            {result.failure_categories.map((cat) => (
              <div
                key={cat}
                className="flex items-start gap-2 rounded-md border border-[#d29922]/30 bg-[#d29922]/5 px-3 py-2 text-sm"
              >
                <span className="text-[#d29922]">⚠</span>
                <span className="text-[#d29922]">
                  {FAILURE_MESSAGES[cat] ?? cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isSolved && result.recommendations.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">추천 후속 문제</h3>
          <RecommendedProblems problems={result.recommendations} />
        </div>
      )}
    </div>
  );
}
