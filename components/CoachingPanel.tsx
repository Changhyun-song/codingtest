"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { CoachingData, CoachingState, ChatMessage } from "@/lib/types";

interface CoachingPanelProps {
  coaching: CoachingData;
  state: CoachingState;
  onChange: (updates: Partial<CoachingState>) => void;
  maxHintLevel?: number;
  problemId: string;
  userCode: string;
}

const STUCK_STAGES = [
  { id: "understanding", label: "문제 이해", icon: "📖" },
  { id: "approach", label: "접근법 선택", icon: "🧭" },
  { id: "data_structure", label: "자료구조 선택", icon: "🏗️" },
  { id: "implementation", label: "구현", icon: "⌨️" },
  { id: "debugging", label: "디버깅", icon: "🐛" },
  { id: "optimization", label: "최적화", icon: "⚡" },
];

const QUICK_ACTIONS = [
  { label: "필요한 개념?", message: "이 문제를 풀기 위해 필요한 핵심 개념/키워드만 알려줘. 풀이는 말하지 마." },
  { label: "작은 힌트", message: "지금 막혀있어. 아주 작은 힌트 하나만 줘. 정답은 말하지 마." },
  { label: "코드 리뷰", message: "내 현재 코드를 보고, 잘못된 방향이 있으면 그 부분만 짧게 알려줘. 정답 코드는 주지 마." },
  { label: "접근법 확인", message: "내가 생각하는 접근법이 맞는 방향인지만 알려줘." },
];

export default function CoachingPanel({
  coaching,
  state,
  onChange,
  maxHintLevel = 4,
  problemId,
  userCode,
}: CoachingPanelProps) {
  const [showStuck, setShowStuck] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMessages = state.chatMessages || [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length]);

  const sendMessage = useCallback(
    async (userMsg: string) => {
      if (!userMsg.trim() || chatLoading) return;

      const newMessages: ChatMessage[] = [
        ...chatMessages,
        { role: "user" as const, content: userMsg.trim() },
      ];
      onChange({ chatMessages: newMessages });
      setChatInput("");
      setChatLoading(true);
      setChatError(null);

      try {
        const res = await fetch("/api/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemId,
            userCode,
            hintLevel: state.hintLevel,
            stuckAt: state.stuckAt,
            messages: newMessages,
          }),
        });
        const data = await res.json();
        if (data.error) {
          setChatError(data.error);
        } else {
          onChange({
            chatMessages: [
              ...newMessages,
              { role: "assistant" as const, content: data.reply },
            ],
          });
        }
      } catch (e) {
        setChatError(`Network error: ${e}`);
      }
      setChatLoading(false);
    },
    [chatMessages, chatLoading, onChange, problemId, userCode, state.hintLevel, state.stuckAt]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(chatInput);
      }
    },
    [chatInput, sendMessage]
  );

  const revealKeywords = useCallback(() => {
    onChange({ keywordsRevealed: true });
  }, [onChange]);

  const revealNextHint = useCallback(() => {
    onChange({ hintLevel: Math.min(state.hintLevel + 1, maxHintLevel) });
  }, [state.hintLevel, maxHintLevel, onChange]);

  const selectStuck = useCallback(
    (stage: string) => {
      onChange({ stuckAt: stage });
      setShowStuck(false);
    },
    [onChange]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Summary */}
        <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#58a6ff] mb-1">
            문제 요약
          </p>
          <p className="text-xs text-[#e6edf3]">{coaching.oneLiner}</p>
        </div>

        {/* Thinking prompts */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#d29922]">
            먼저 생각해보기
          </p>
          <ul className="space-y-1">
            {coaching.thinkingPrompts.map((p, i) => (
              <li key={i} className="flex gap-2 text-xs text-[#8b949e]">
                <span className="text-[#484f58] shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Template action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={revealKeywords}
            disabled={state.keywordsRevealed}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              state.keywordsRevealed
                ? "border border-[#238636] bg-[#238636]/10 text-[#3fb950]"
                : "border border-[#30363d] bg-[#21262d] text-[#e6edf3] hover:border-[#58a6ff]"
            }`}
          >
            {state.keywordsRevealed ? "✓ 키워드 확인됨" : "키워드 보기"}
          </button>
          <button
            onClick={revealNextHint}
            disabled={state.hintLevel >= maxHintLevel}
            className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs font-medium text-[#e6edf3] transition-colors hover:border-[#58a6ff] disabled:opacity-40"
          >
            {state.hintLevel === 0
              ? "힌트 보기"
              : state.hintLevel < maxHintLevel
              ? `다음 힌트 (L${state.hintLevel}/${maxHintLevel})`
              : `모든 힌트 사용 (L${maxHintLevel})`}
          </button>
          <button
            onClick={() => setShowStuck(!showStuck)}
            className="rounded-md border border-[#da3633] bg-transparent px-3 py-1.5 text-xs font-medium text-[#f85149] transition-colors hover:bg-[#da3633]/10"
          >
            막혔어요
          </button>
        </div>

        {/* Keywords */}
        {state.keywordsRevealed && (
          <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-3 space-y-3">
            {coaching.essentialKeywords.length > 0 && (
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f85149]">
                  필수 키워드
                </p>
                {coaching.essentialKeywords.map((kw, i) => (
                  <div key={i} className="mb-1 flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#f85149] shrink-0" />
                    <span className="text-xs">
                      <strong className="text-[#e6edf3]">{kw.keyword}</strong>
                      <span className="text-[#8b949e]"> — {kw.description}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
            {coaching.helpfulKeywords.length > 0 && (
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#3fb950]">
                  도움되는 키워드
                </p>
                {coaching.helpfulKeywords.map((kw, i) => (
                  <div key={i} className="mb-1 flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#3fb950] shrink-0" />
                    <span className="text-xs">
                      <strong className="text-[#e6edf3]">{kw.keyword}</strong>
                      <span className="text-[#8b949e]"> — {kw.description}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Progressive hints */}
        {state.hintLevel > 0 && (
          <div className="space-y-2">
            {coaching.hints.slice(0, state.hintLevel).map((hint) => (
              <div
                key={hint.level}
                className="rounded-md border border-[#30363d] bg-[#161b22] p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      hint.level <= 2
                        ? "bg-[#238636]/20 text-[#3fb950]"
                        : hint.level <= 4
                        ? "bg-[#9e6a03]/20 text-[#d29922]"
                        : "bg-[#da3633]/20 text-[#f85149]"
                    }`}
                  >
                    L{hint.level}
                  </span>
                  <span className="text-[10px] text-[#8b949e]">{hint.label}</span>
                </div>
                {hint.level < 5 ? (
                  <p className="text-xs text-[#e6edf3] leading-relaxed">
                    {hint.content}
                  </p>
                ) : (
                  <pre className="mt-1 overflow-x-auto rounded bg-[#0d1117] p-2 text-xs text-[#e6edf3]">
                    <code>{hint.content}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stuck stage selector */}
        {showStuck && (
          <div className="rounded-md border border-[#d29922] bg-[#0d1117] p-3">
            <p className="mb-2 text-xs font-semibold text-[#d29922]">
              어디서 막혔나요?
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {STUCK_STAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => selectStuck(s.id)}
                  className={`rounded-md border px-2 py-1.5 text-left text-[11px] transition-colors ${
                    state.stuckAt === s.id
                      ? "border-[#58a6ff] bg-[#1f6feb]/10 text-[#58a6ff]"
                      : "border-[#30363d] bg-[#21262d] text-[#e6edf3] hover:border-[#8b949e]"
                  }`}
                >
                  <span className="mr-1">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stuck guidance */}
        {state.stuckAt && coaching.stuckGuidance[state.stuckAt] && (
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
            <p className="mb-1.5 text-xs font-semibold text-[#58a6ff]">
              가이드:{" "}
              {STUCK_STAGES.find((s) => s.id === state.stuckAt)?.label}
            </p>
            <p className="mb-3 text-xs text-[#e6edf3] leading-relaxed">
              {coaching.stuckGuidance[state.stuckAt]}
            </p>
            <div className="border-t border-[#30363d] pt-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#3fb950]">
                다시 시도 체크리스트
              </p>
              <ul className="space-y-0.5 text-xs text-[#8b949e]">
                <li>1. 제약 조건을 다시 꼼꼼히 읽어보세요</li>
                <li>2. 가장 작은 입력부터 먼저 풀어보세요</li>
                <li>3. 코드 작성 전에 의사코드를 먼저 써보세요</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── AI Chat Section ── */}
        <div className="border-t border-[#30363d] pt-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#a371f7]">
            AI 코치 채팅
          </p>

          {/* Quick action buttons */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((qa) => (
              <button
                key={qa.label}
                onClick={() => sendMessage(qa.message)}
                disabled={chatLoading}
                className="rounded-full border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[10px] text-[#8b949e] transition-colors hover:border-[#a371f7] hover:text-[#e6edf3] disabled:opacity-40"
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Chat messages */}
          {chatMessages.length > 0 && (
            <div className="mb-3 space-y-2">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-md p-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "ml-6 border border-[#30363d] bg-[#161b22] text-[#e6edf3]"
                      : "mr-2 border border-[#a371f7]/30 bg-[#a371f7]/5 text-[#e6edf3]"
                  }`}
                >
                  <span
                    className={`mb-1 block text-[9px] font-bold uppercase ${
                      msg.role === "user" ? "text-[#484f58]" : "text-[#a371f7]"
                    }`}
                  >
                    {msg.role === "user" ? "나" : "코치"}
                  </span>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
              {chatLoading && (
                <div className="mr-2 rounded-md border border-[#a371f7]/30 bg-[#a371f7]/5 p-2.5">
                  <span className="text-[9px] font-bold uppercase text-[#a371f7]">
                    Coach
                  </span>
                  <p className="mt-1 text-xs text-[#8b949e] animate-pulse">
                    생각 중...
                  </p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Error */}
          {chatError && (
            <div className="mb-2 rounded-md border border-[#da3633] bg-[#da3633]/5 px-3 py-2 text-[11px] text-[#f85149]">
              {chatError}
            </div>
          )}
        </div>
      </div>

      {/* ── Chat input (fixed at bottom) ── */}
      <div className="border-t border-[#30363d] bg-[#161b22] p-3">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="코치에게 질문하세요... (Enter로 전송)"
            rows={1}
            className="flex-1 resize-none rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-xs text-[#e6edf3] placeholder-[#484f58] focus:border-[#a371f7] focus:outline-none"
          />
          <button
            onClick={() => sendMessage(chatInput)}
            disabled={chatLoading || !chatInput.trim()}
            className="rounded-md bg-[#a371f7] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#8957e5] disabled:opacity-40"
          >
            {chatLoading ? "..." : "전송"}
          </button>
        </div>
        <p className="mt-1 text-[9px] text-[#484f58]">
          코치는 절대 정답을 알려주지 않고, 최소한의 가이드만 제공합니다.
        </p>
      </div>
    </div>
  );
}
