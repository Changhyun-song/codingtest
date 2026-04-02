"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const toggle = useCallback(() => setRunning((r) => !r), []);
  const reset = useCallback(() => {
    setSeconds(0);
    setRunning(true);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isWarning = mins >= 20;
  const isDanger = mins >= 25;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`font-mono text-sm tabular-nums ${
          isDanger
            ? "text-[#f85149]"
            : isWarning
            ? "text-[#d29922]"
            : "text-[#8b949e]"
        }`}
      >
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
      <button
        onClick={toggle}
        className="rounded px-1.5 py-0.5 text-[10px] border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
        title={running ? "일시정지" : "재개"}
      >
        {running ? "⏸" : "▶"}
      </button>
      <button
        onClick={reset}
        className="rounded px-1.5 py-0.5 text-[10px] border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e] transition-colors"
        title="타이머 초기화"
      >
        ↺
      </button>
    </div>
  );
}
