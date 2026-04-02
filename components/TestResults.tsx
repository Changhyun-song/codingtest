"use client";

import { TestResult } from "@/lib/types";

interface TestResultsProps {
  results: TestResult[] | null;
  loading: boolean;
}

export default function TestResults({ results, loading }: TestResultsProps) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-[#8b949e]">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          테스트 실행 중...
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex h-full items-center justify-center text-[#484f58] text-sm">
        &quot;테스트 실행&quot; 버튼을 눌러 결과를 확인하세요
      </div>
    );
  }

  const allPassed = results.every((r) => r.passed);

  return (
    <div className="h-full overflow-y-auto p-3">
      <div className={`mb-3 rounded-md px-3 py-2 text-sm font-semibold ${allPassed ? "bg-[#238636]/20 text-[#3fb950]" : "bg-[#da3633]/20 text-[#f85149]"}`}>
        {allPassed
          ? `${results.length}개 샘플 테스트 모두 통과!`
          : `${results.filter((r) => r.passed).length}/${results.length}개 샘플 테스트 통과`}
      </div>

      <div className="space-y-2">
        {results.map((r, i) => (
          <div
            key={i}
            className={`rounded-md border p-3 text-sm ${
              r.passed
                ? "border-[#238636]/30 bg-[#238636]/5"
                : "border-[#da3633]/30 bg-[#da3633]/5"
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium">
                {r.passed ? (
                  <span className="text-[#3fb950]">✓ 테스트 {i + 1}</span>
                ) : (
                  <span className="text-[#f85149]">✕ 테스트 {i + 1}</span>
                )}
              </span>
              <span className="text-xs text-[#8b949e]">{r.time_ms}ms</span>
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <span className="text-[#8b949e]">입력: </span>
                <code className="text-[#79c0ff]">{formatObj(r.input)}</code>
              </div>
              <div>
                <span className="text-[#8b949e]">기대값: </span>
                <code className="text-[#3fb950]">{formatObj(r.expected)}</code>
              </div>
              <div>
                <span className="text-[#8b949e]">내 출력: </span>
                <code className={r.passed ? "text-[#3fb950]" : "text-[#f85149]"}>
                  {r.error ? `오류: ${r.error}` : formatObj(r.actual)}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatObj(val: unknown): string {
  if (val === null || val === undefined) return "None";
  return JSON.stringify(val);
}
