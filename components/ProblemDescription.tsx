"use client";

import { useState } from "react";

interface ProblemDescriptionProps {
  title: string;
  category: string;
  difficulty: string;
  tags: string[];
  statement_en: string;
  signature: string;
  constraints: string[];
  examples: {
    input: Record<string, unknown>;
    output: unknown;
    explanation?: string;
  }[];
  hints?: string[];
}

const DIFF_COLORS: Record<string, string> = {
  easy: "bg-[#238636] text-white",
  medium: "bg-[#9e6a03] text-white",
  hard: "bg-[#da3633] text-white",
};

export default function ProblemDescription({
  title,
  category,
  difficulty,
  tags,
  statement_en,
  signature,
  constraints,
  examples,
  hints,
}: ProblemDescriptionProps) {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="mb-4">
        <h1 className="mb-2 text-xl font-bold text-[#e6edf3]">{title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFF_COLORS[difficulty]}`}>
            {difficulty}
          </span>
          <span className="rounded-full bg-[#21262d] px-2.5 py-0.5 text-xs text-[#8b949e]">
            {category}
          </span>
          {tags.map((t) => (
            <span key={t} className="rounded bg-[#21262d] px-2 py-0.5 text-[11px] text-[#8b949e]">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="markdown-body mb-6 text-sm leading-relaxed text-[#c9d1d9]">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(statement_en) }} />
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">함수 시그니처</h3>
        <pre className="rounded-md bg-[#21262d] p-3 text-sm text-[#79c0ff]">
          <code>{signature}</code>
        </pre>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">제약 조건</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[#8b949e]">
          {constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {examples.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">예제</h3>
          {examples.map((ex, i) => (
            <div key={i} className="mb-3 rounded-md border border-[#30363d] bg-[#161b22] p-3 text-sm">
              <div className="mb-1">
                <span className="text-[#8b949e]">Input: </span>
                <code className="text-[#79c0ff]">{formatValue(ex.input)}</code>
              </div>
              <div className="mb-1">
                <span className="text-[#8b949e]">Output: </span>
                <code className="text-[#3fb950]">{formatValue(ex.output)}</code>
              </div>
              {ex.explanation && (
                <div className="mt-1 text-[#8b949e] italic">
                  {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hints && hints.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1 text-sm text-[#58a6ff] hover:underline"
          >
            <span>{showHints ? "▼" : "▶"}</span>
            {showHints ? "힌트 닫기" : "힌트 보기"}
          </button>
          {showHints && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#d29922]">
              {hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return "None";
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

function renderMarkdown(text: string): string {
  return text
    .replace(/```python\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "</li><li>")
    .replace(/^- /gm, "<li>")
    .replace(/\n/g, "<br/>");
}
