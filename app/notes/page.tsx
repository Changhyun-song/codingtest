"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

interface TriggeredProblem {
  id: string;
  title: string;
  difficulty: string;
}

interface ReviewNote {
  conceptId: string;
  name: string;
  category: string;
  explanation: string;
  codeTemplate: string;
  addedAt: string;
  updatedAt: string;
  understood: boolean;
  triggeredBy: TriggeredProblem[];
  practiceProblems: TriggeredProblem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  algorithm: "알고리즘",
  ai: "AI",
  pytorch: "PyTorch",
  data: "데이터",
};

const DIFF_COLORS: Record<string, string> = {
  easy: "text-[#3fb950]",
  medium: "text-[#d29922]",
  hard: "text-[#f85149]",
};

export default function NotesPage() {
  const [notes, setNotes] = useState<ReviewNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnderstood, setShowUnderstood] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const fetchNotes = useCallback(() => {
    fetch("/api/notes")
      .then((r) => r.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const toggleUnderstood = async (conceptId: string, current: boolean) => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conceptId, understood: !current }),
    });
    setNotes((prev) =>
      prev.map((n) =>
        n.conceptId === conceptId ? { ...n, understood: !current } : n
      )
    );
  };

  const active = useMemo(
    () => notes.filter((n) => !n.understood),
    [notes]
  );
  const understood = useMemo(
    () => notes.filter((n) => n.understood),
    [notes]
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#8b949e]">
        오답 노트를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">오답 노트</h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            틀리거나 도움을 받아서 푼 문제에서 부족했던 개념이 자동으로 쌓입니다.
            <br />
            이해가 되면 "이해 완료"를 눌러 정리하세요.
          </p>
        </div>
        <a
          href="/"
          className="rounded-md border border-[#30363d] px-4 py-2 text-sm text-[#e6edf3] transition-colors hover:bg-[#21262d]"
        >
          문제 목록으로
        </a>
      </div>

      {/* Stats bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5">
          <span className="text-sm text-[#f85149] font-semibold">{active.length}</span>
          <span className="text-xs text-[#8b949e]">복습 필요</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5">
          <span className="text-sm text-[#3fb950] font-semibold">{understood.length}</span>
          <span className="text-xs text-[#8b949e]">이해 완료</span>
        </div>
        <div className="flex-1" />
        {understood.length > 0 && (
          <button
            onClick={() => setShowUnderstood(!showUnderstood)}
            className="text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors"
          >
            {showUnderstood ? "이해 완료 숨기기" : `이해 완료 보기 (${understood.length})`}
          </button>
        )}
      </div>

      {/* Empty state */}
      {notes.length === 0 && (
        <div className="rounded-lg border border-[#30363d] bg-[#0d1117] py-16 text-center">
          <div className="text-4xl mb-3">📝</div>
          <div className="text-[#8b949e] text-sm">
            아직 오답 노트가 비어 있습니다.
            <br />
            문제를 풀다가 틀리거나 도움을 받으면 관련 개념이 여기에 자동으로 쌓입니다.
          </div>
        </div>
      )}

      {/* Active (needs review) */}
      {active.length > 0 && (
        <div className="space-y-3 mb-8">
          {active.map((note) => (
            <NoteCard
              key={note.conceptId}
              note={note}
              expanded={expandedIds.has(note.conceptId)}
              onToggle={() => toggleExpand(note.conceptId)}
              onToggleUnderstood={() =>
                toggleUnderstood(note.conceptId, note.understood)
              }
            />
          ))}
        </div>
      )}

      {/* Understood (collapsed section) */}
      {showUnderstood && understood.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-[#8b949e] uppercase tracking-wider">
            이해 완료
          </h2>
          <div className="space-y-3 opacity-60">
            {understood.map((note) => (
              <NoteCard
                key={note.conceptId}
                note={note}
                expanded={expandedIds.has(note.conceptId)}
                onToggle={() => toggleExpand(note.conceptId)}
                onToggleUnderstood={() =>
                  toggleUnderstood(note.conceptId, note.understood)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NoteCard({
  note,
  expanded,
  onToggle,
  onToggleUnderstood,
}: {
  note: ReviewNote;
  expanded: boolean;
  onToggle: () => void;
  onToggleUnderstood: () => void;
}) {
  const timeAgo = getTimeAgo(note.updatedAt);

  return (
    <div
      className={`rounded-lg border overflow-hidden transition-colors ${
        note.understood
          ? "border-[#238636]/30 bg-[#0d1117]"
          : "border-[#f85149]/30 bg-[#0d1117]"
      }`}
    >
      {/* Header - always visible */}
      <div className="flex items-center gap-3 px-5 py-3.5">
        <button
          onClick={onToggle}
          className="flex-1 flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
        >
          <span className="text-lg">{expanded ? "▾" : "▸"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#e6edf3]">{note.name}</span>
              <span className="rounded bg-[#21262d] px-1.5 py-0.5 text-[10px] text-[#8b949e]">
                {CATEGORY_LABELS[note.category] ?? note.category}
              </span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#484f58]">
              {timeAgo} · 관련 문제 {note.triggeredBy.length}개에서 추가됨
            </div>
          </div>
        </button>

        <button
          onClick={onToggleUnderstood}
          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            note.understood
              ? "bg-[#238636]/20 text-[#3fb950] hover:bg-[#238636]/30"
              : "bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d]"
          }`}
        >
          {note.understood ? "✓ 이해 완료" : "이해 완료"}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#21262d] px-5 pb-5">
          {/* Concept explanation */}
          <div className="mt-4 mb-4 rounded-md bg-[#161b22] border border-[#21262d] px-4 py-3">
            <div className="text-[13px] text-[#c9d1d9] whitespace-pre-line leading-relaxed">
              {note.explanation}
            </div>
          </div>

          {/* Code template */}
          <div className="mb-4">
            <div className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">
              핵심 코드 패턴
            </div>
            <div className="rounded-md bg-[#0d1117] border border-[#30363d] overflow-x-auto">
              <pre className="px-4 py-3 text-[13px] text-[#e6edf3] font-mono leading-relaxed">
                {note.codeTemplate}
              </pre>
            </div>
          </div>

          {/* Triggered by */}
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-[#f85149]/80 uppercase tracking-wider mb-1.5">
              이 개념이 부족했던 문제
            </div>
            <div className="flex flex-wrap gap-1.5">
              {note.triggeredBy.map((p) => (
                <a
                  key={p.id}
                  href={`/problems/${p.id}`}
                  className="inline-flex items-center gap-1 rounded border border-[#f85149]/20 bg-[#f85149]/5 px-2 py-1 text-xs text-[#f0883e] hover:bg-[#f85149]/10 transition-colors"
                >
                  {p.title}
                  <span className={`text-[10px] ${DIFF_COLORS[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Practice problems */}
          {note.practiceProblems.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#58a6ff]/80 uppercase tracking-wider mb-1.5">
                이 개념을 연습할 수 있는 문제
              </div>
              <div className="flex flex-wrap gap-1.5">
                {note.practiceProblems.map((p) => (
                  <a
                    key={p.id}
                    href={`/problems/${p.id}`}
                    className="inline-flex items-center gap-1 rounded border border-[#30363d] px-2 py-1 text-xs text-[#8b949e] hover:text-[#58a6ff] hover:border-[#58a6ff]/30 transition-colors"
                  >
                    {p.title}
                    <span className={`text-[10px] ${DIFF_COLORS[p.difficulty]}`}>
                      {p.difficulty}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}일 전`;
  return `${Math.floor(days / 30)}개월 전`;
}
