"use client";

import Link from "next/link";

interface LockedOverlayProps {
  lockedBy: { id: string; title: string }[];
}

export default function LockedOverlay({ lockedBy }: LockedOverlayProps) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-[#0d1117]">
      <div className="mx-4 max-w-md rounded-lg border border-[#d29922]/40 bg-[#d29922]/5 p-8 text-center">
        <div className="mb-4 text-4xl">🔒</div>
        <h2 className="mb-2 text-lg font-bold text-[#d29922]">
          선수 학습이 필요합니다
        </h2>
        <p className="mb-6 text-sm text-[#8b949e]">
          이 문제를 풀기 전에 아래 기본 문제를 먼저 풀어서 개념을 익혀주세요.
        </p>
        <div className="space-y-2">
          {lockedBy.map((prereq) => (
            <Link
              key={prereq.id}
              href={`/problems/${prereq.id}`}
              className="flex items-center gap-3 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3 transition-colors hover:border-[#58a6ff] hover:bg-[#1f6feb]/5"
            >
              <span className="rounded bg-[#1f6feb] px-1.5 py-0.5 text-[9px] font-bold text-white">
                기본
              </span>
              <span className="text-sm font-medium text-[#e6edf3]">
                {prereq.title}
              </span>
              <span className="ml-auto text-xs text-[#58a6ff]">→ 풀기</span>
            </Link>
          ))}
        </div>
        <Link
          href="/"
          className="mt-6 inline-block text-xs text-[#8b949e] hover:text-[#e6edf3]"
        >
          ← 문제 목록으로
        </Link>
      </div>
    </div>
  );
}
