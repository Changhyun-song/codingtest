"use client";

import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { CoachingState, CoachingData, MasteryLevel } from "@/lib/types";

interface PostSolvePanelProps {
  coaching: CoachingData;
  state: CoachingState;
  onChange: (updates: Partial<CoachingState>) => void;
  problemId: string;
  userCode: string;
  mastery?: MasteryLevel;
}

export default function PostSolvePanel({
  coaching,
  state,
  onChange,
  problemId,
  userCode,
  mastery,
}: PostSolvePanelProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const solveTimeStr = state.firstSolveTimeMs
    ? formatTime(state.firstSolveTimeMs)
    : "—";

  const fetchFeedback = useCallback(async () => {
    if (feedback || feedbackLoading) return;
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, userCode, mastery }),
      });
      const data = await res.json();
      if (data.error) {
        setFeedbackError(data.error);
      } else {
        setFeedback(data.feedback);
      }
    } catch {
      setFeedbackError("피드백을 가져오는 데 실패했습니다.");
    }
    setFeedbackLoading(false);
  }, [problemId, userCode, mastery, feedback, feedbackLoading]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const scheduleReview = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    onChange({ reviewDate: d.toISOString().split("T")[0] });
  };

  return (
    <div className="border-t border-[#238636] p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-bold text-[#3fb950]">정답!</span>
        <span className="text-xs text-[#8b949e]">
          풀이 시간: {solveTimeStr}
        </span>
        {state.hintLevel > 0 && (
          <span className="text-xs text-[#d29922]">
            사용한 힌트: L{state.hintLevel}
          </span>
        )}
        {mastery && (
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
              mastery === "perfect"
                ? "bg-[#238636]/20 text-[#3fb950]"
                : mastery === "good"
                ? "bg-[#1f6feb]/20 text-[#58a6ff]"
                : "bg-[#d29922]/20 text-[#d29922]"
            }`}
          >
            {mastery === "perfect" && "⭐⭐⭐ 완벽"}
            {mastery === "good" && "⭐⭐ 양호"}
            {mastery === "assisted" && "⭐ 보조 풀이"}
          </span>
        )}
      </div>

      {/* AI Feedback Section */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22]">
        <div className="flex items-center gap-2 border-b border-[#30363d] px-4 py-2">
          <span className="text-sm font-semibold text-[#e6edf3]">
            AI 코드 리뷰
          </span>
          {feedbackLoading && (
            <svg
              className="h-3.5 w-3.5 animate-spin text-[#58a6ff]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
        </div>
        <div className="p-4">
          {feedbackLoading && (
            <p className="text-xs text-[#8b949e] animate-pulse">
              AI가 풀이를 분석하고 있습니다...
            </p>
          )}
          {feedbackError && (
            <div className="space-y-2">
              <p className="text-xs text-[#f85149]">{feedbackError}</p>
              <button
                onClick={() => {
                  setFeedback(null);
                  setFeedbackError(null);
                  fetchFeedback();
                }}
                className="rounded border border-[#30363d] px-2 py-1 text-[10px] text-[#8b949e] hover:border-[#58a6ff] hover:text-[#58a6ff]"
              >
                다시 시도
              </button>
            </div>
          )}
          {feedback && (
            <div className="prose-sm prose-invert max-w-none text-xs leading-relaxed text-[#c9d1d9]">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mb-2 mt-4 first:mt-0 text-sm font-bold text-[#e6edf3]">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-1 mt-3 text-xs font-semibold text-[#e6edf3]">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-2 text-xs leading-relaxed text-[#c9d1d9]">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-2 list-disc pl-4 space-y-1 text-xs text-[#c9d1d9]">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-xs leading-relaxed">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    return isBlock ? (
                      <code className="block overflow-x-auto rounded-md bg-[#0d1117] border border-[#30363d] p-3 text-[11px] text-[#e6edf3] whitespace-pre">
                        {children}
                      </code>
                    ) : (
                      <code className="rounded bg-[#21262d] px-1 py-0.5 text-[11px] text-[#f0883e]">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="mb-2 mt-1">{children}</pre>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[#e6edf3]">
                      {children}
                    </strong>
                  ),
                }}
              >
                {feedback}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Study keywords */}
      {(coaching.essentialKeywords.length > 0 ||
        coaching.helpfulKeywords.length > 0) && (
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#a371f7]">
            추가 학습 키워드
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[...coaching.essentialKeywords, ...coaching.helpfulKeywords].map(
              (kw, i) => (
                <span
                  key={i}
                  className="rounded bg-[#21262d] px-2 py-0.5 text-[10px] text-[#8b949e]"
                >
                  {kw.keyword}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Review scheduling */}
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#d29922]">
          복습 예약
        </p>
        {state.reviewDate ? (
          <p className="text-xs text-[#3fb950]">
            복습일: {state.reviewDate}
            <button
              onClick={() => onChange({ reviewDate: null })}
              className="ml-2 text-[#8b949e] hover:text-[#f85149] text-[10px]"
            >
              (취소)
            </button>
          </p>
        ) : (
          <div className="flex gap-2">
            {[3, 7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => scheduleReview(days)}
                className="rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[10px] text-[#e6edf3] hover:border-[#58a6ff] transition-colors"
              >
                {days}일 후
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#484f58] italic">
        도전: 힌트 없이 15분 이내에 다시 풀 수 있나요?
      </p>
    </div>
  );
}

function formatTime(ms: number): string {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}
