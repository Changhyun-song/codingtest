"use client";

import { useState } from "react";

interface SelfCheckPanelProps {
  onSubmit: () => void;
  onSkip: () => void;
  onClose: () => void;
  hasThinkingPadFilled: boolean;
}

export default function SelfCheckPanel({ onSubmit, onSkip, onClose, hasThinkingPadFilled }: SelfCheckPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg border border-[#30363d] bg-[#0d1117] p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#e6edf3]">제출 전 자가점검</h3>
          <button onClick={onClose} className="text-sm text-[#8b949e] hover:text-[#e6edf3]">✕</button>
        </div>

        {!hasThinkingPadFilled && (
          <div className="mb-4 rounded-md border border-[#d29922] bg-[#d29922]/5 px-3 py-2">
            <p className="text-[11px] text-[#d29922]">
              팁: 코딩 전에 문제 분석과 예상 복잡도를 정리하면 더 좋은 풀이 습관이 만들어집니다.
            </p>
          </div>
        )}

        <div className="mb-5 space-y-2.5">
          <CheckItem label="내 풀이의 시간복잡도를 알고 있다" />
          <CheckItem label="공간복잡도를 알고 있다" />
          <CheckItem label="가장 취약한 엣지 케이스를 고려했다" />
          <CheckItem label="최소 하나의 예제를 손으로 추적해봤다" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onSkip}
            className="flex-1 rounded-md border border-[#30363d] bg-[#21262d] py-2 text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            건너뛰고 제출
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 rounded-md bg-[#1f6feb] py-2 text-xs font-semibold text-white hover:bg-[#388bfd] transition-colors"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#e6edf3]">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="h-3.5 w-3.5 rounded border-[#30363d] bg-[#21262d] accent-[#58a6ff]"
      />
      {label}
    </label>
  );
}
