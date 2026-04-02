"use client";

import { useState } from "react";
import { CoachingState } from "@/lib/types";

interface ThinkingPadProps {
  state: CoachingState;
  onChange: (updates: Partial<CoachingState>) => void;
}

const COMPLEXITY_OPTIONS = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(2^n)", "모르겠음"];
const DS_OPTIONS = ["Array", "Hash Map", "Hash Set", "Stack", "Queue", "Heap", "Tree", "Graph", "Linked List", "Sorting", "기타"];

export default function ThinkingPad({ state, onChange }: ThinkingPadProps) {
  const [collapsed, setCollapsed] = useState(true);
  const filled = !!(state.problemSummary || state.expectedComplexity || state.dataStructures || state.edgeCases);

  return (
    <div className="border-t border-[#30363d]">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between px-5 py-2.5 text-xs font-semibold text-[#e6edf3] hover:bg-[#161b22] transition-colors"
      >
        <span className="flex items-center gap-2">
          풀기 전 생각 정리
          {filled && <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />}
        </span>
        <span className="text-[#484f58]">{collapsed ? "▶" : "▼"}</span>
      </button>

      {!collapsed && (
        <div className="space-y-3 px-5 pb-4">
          <div>
            <label className="mb-1 block text-[11px] text-[#8b949e]">문제를 내 말로 정리</label>
            <textarea
              value={state.problemSummary}
              onChange={(e) => onChange({ problemSummary: e.target.value })}
              placeholder="문제를 간단히 다시 설명해보세요..."
              className="w-full rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1.5 text-xs text-[#e6edf3] placeholder-[#484f58] focus:border-[#58a6ff] focus:outline-none resize-none"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[11px] text-[#8b949e]">예상 시간복잡도</label>
              <select
                value={state.expectedComplexity}
                onChange={(e) => onChange({ expectedComplexity: e.target.value })}
                className="w-full rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
              >
                <option value="">선택...</option>
                {COMPLEXITY_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-[#8b949e]">자료구조</label>
              <select
                value={state.dataStructures}
                onChange={(e) => onChange({ dataStructures: e.target.value })}
                className="w-full rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none"
              >
                <option value="">선택...</option>
                {DS_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] text-[#8b949e]">확인할 엣지 케이스</label>
            <textarea
              value={state.edgeCases}
              onChange={(e) => onChange({ edgeCases: e.target.value })}
              placeholder="빈 입력, 원소 1개, 모두 같은 값, 음수..."
              className="w-full rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1.5 text-xs text-[#e6edf3] placeholder-[#484f58] focus:border-[#58a6ff] focus:outline-none resize-none"
              rows={2}
            />
          </div>
        </div>
      )}
    </div>
  );
}
