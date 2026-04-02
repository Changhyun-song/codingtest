"use client";

import { useEffect, useState } from "react";
import ProblemList from "@/components/ProblemList";
import StatsBoard from "@/components/StatsBoard";
import { ProblemSummary } from "@/lib/types";

export default function HomePage() {
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">연습 문제</h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            함수 구현형 코딩 문제를 풀고, 샘플 테스트 실행 후 히든 테스트로 채점하세요.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/notes"
            className="rounded-md border border-[#30363d] px-4 py-2 text-sm font-semibold text-[#e6edf3] transition-colors hover:bg-[#21262d]"
          >
            오답 노트
          </a>
          <a
            href="/mock-test"
            className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#388bfd]"
          >
            모의 테스트
          </a>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#8b949e]">
          문제를 불러오는 중...
        </div>
      ) : (
        <>
          <StatsBoard problems={problems} />
          <ProblemList problems={problems} />
        </>
      )}
    </div>
  );
}
