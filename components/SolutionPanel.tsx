"use client";

import { useState } from "react";

interface SolutionPanelProps {
  solutionCode: string | null;
  solutionExplanation: string | null;
  attempts: number;
  status: string;
}

export default function SolutionPanel({
  solutionCode,
  solutionExplanation,
  attempts,
  status,
}: SolutionPanelProps) {
  const [revealed, setRevealed] = useState(false);

  const canReveal = solutionCode !== null;
  const isSolved = status === "solved";

  if (!canReveal) {
    const remaining = Math.max(0, 3 - attempts);
    return (
      <div className="border-t border-[#30363d] p-4">
        <div className="flex items-center gap-2 text-sm text-[#484f58]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 4a4 4 0 118 0 4 4 0 01-8 0zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM1.344 12.5A4.489 4.489 0 014.5 11h7a4.489 4.489 0 013.156 1.5A1.5 1.5 0 0116 14v.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5V14a1.5 1.5 0 01.844-1.5z" />
          </svg>
          {remaining > 0
            ? `정답 풀이는 ${remaining}번 더 시도하거나 문제를 풀면 잠금 해제됩니다`
            : "제출하면 정답 풀이를 볼 수 있습니다"}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-[#30363d] p-4">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            isSolved
              ? "border border-[#238636] text-[#3fb950] hover:bg-[#238636]/10"
              : "border border-[#d29922] text-[#d29922] hover:bg-[#d29922]/10"
          }`}
        >
          {isSolved ? "정답 풀이 보기" : "정답 풀이 보기 (3회 시도 후 잠금해제)"}
        </button>
      ) : (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#e6edf3]">
              참고 풀이
            </h3>
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-[#8b949e] hover:text-[#e6edf3]"
            >
              닫기
            </button>
          </div>
          {solutionExplanation && (
            <p className="mb-3 text-xs text-[#3fb950] italic">
              {solutionExplanation}
            </p>
          )}
          <pre className="overflow-x-auto rounded-md bg-[#161b22] border border-[#30363d] p-3 text-sm text-[#e6edf3]">
            <code>{solutionCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
