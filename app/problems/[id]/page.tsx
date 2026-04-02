"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ProblemDescription from "@/components/ProblemDescription";
import CodeEditor from "@/components/CodeEditor";
import TestResults from "@/components/TestResults";
import SubmitResults from "@/components/SubmitResults";
import SolutionPanel from "@/components/SolutionPanel";
import Timer from "@/components/Timer";
import ThinkingPad from "@/components/ThinkingPad";
import CoachingPanel from "@/components/CoachingPanel";
import SelfCheckPanel from "@/components/SelfCheckPanel";
import PostSolvePanel from "@/components/PostSolvePanel";
import BasicLearningPanel from "@/components/BasicLearningPanel";
import LockedOverlay from "@/components/LockedOverlay";
import { TestResult, SubmitResponse, CoachingState, CoachingData } from "@/lib/types";
import { BasicInfo } from "@/lib/learning-path";
import {
  loadCoachingState,
  saveCoachingState,
  getDefaultCoachingState,
} from "@/lib/coachingStore";

interface ProblemDetail {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  tags: string[];
  statement_en: string;
  function_name: string;
  signature: string;
  constraints: string[];
  examples: {
    input: Record<string, unknown>;
    output: unknown;
    explanation?: string;
  }[];
  starter_code: string;
  hints: string[];
  sample_tests: { input: Record<string, unknown>; expected: unknown }[];
  checker_type: string;
  status: string;
  attempts: number;
  hidden_test_count: number;
  solution_code: string | null;
  solution_explanation: string | null;
  coaching: CoachingData;
  is_basic: boolean;
  basic_info: BasicInfo | null;
  locked: boolean;
  locked_by: { id: string; title: string }[];
  execution_mode?: string;
}

type ActiveTab = "tests" | "submit" | "coach";

export default function ProblemPage() {
  const params = useParams();
  const id = params.id as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("tests");
  const [loading, setLoading] = useState(true);

  // Coaching
  const [coachState, setCoachState] = useState<CoachingState>(
    getDefaultCoachingState()
  );
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [selfCheckEnabled, setSelfCheckEnabled] = useState(true);

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProblem(data);
        if (data.is_basic && data.status !== "solved") {
          localStorage.removeItem(`code_${id}`);
          setCode(data.starter_code);
        } else {
          const saved = localStorage.getItem(`code_${id}`);
          setCode(saved || data.starter_code);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const cs = loadCoachingState(id);
    if (!cs.solveStartTime) cs.solveStartTime = Date.now();
    setCoachState(cs);
    saveCoachingState(id, cs);

    const pref = localStorage.getItem("selfCheckEnabled");
    if (pref !== null) setSelfCheckEnabled(pref !== "false");
  }, [id]);

  const updateCoach = useCallback(
    (updates: Partial<CoachingState>) => {
      setCoachState((prev) => {
        const next = { ...prev, ...updates };
        saveCoachingState(id, next);
        return next;
      });
    },
    [id]
  );

  const toggleSelfCheck = useCallback((enabled: boolean) => {
    setSelfCheckEnabled(enabled);
    localStorage.setItem("selfCheckEnabled", String(enabled));
  }, []);

  // ── Run sample tests ──
  const handleRun = useCallback(async () => {
    if (!problem) return;
    setRunLoading(true);
    setActiveTab("tests");
    setTestResults(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: problem.id, code }),
      });
      const data = await res.json();
      setTestResults(data.results);
    } catch (e) {
      setTestResults([
        {
          test_index: 0,
          input: {},
          expected: null,
          actual: null,
          passed: false,
          time_ms: 0,
          error: `Network error: ${e}`,
        },
      ]);
    }
    setRunLoading(false);
  }, [problem, code]);

  // ── Actual submit ──
  const doSubmit = useCallback(async () => {
    if (!problem) return;
    setSubmitLoading(true);
    setActiveTab("submit");
    setSubmitResult(null);
    setShowSelfCheck(false);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code,
          hintsUsed: coachState.hintLevel,
          aiChatsUsed: (coachState.chatMessages || []).filter((m) => m.role === "user").length,
          keywordsRevealed: coachState.keywordsRevealed,
        }),
      });
      const data: SubmitResponse = await res.json();
      setSubmitResult(data);

      if (data.status === "solved") {
        const updates: Partial<typeof coachState> = {};
        if (coachState.solveStartTime && !coachState.firstSolveTimeMs) {
          updates.firstSolveTimeMs = Date.now() - coachState.solveStartTime;
        }
        if (data.mastery === "assisted" && !coachState.reviewDate) {
          const d = new Date();
          d.setDate(d.getDate() + 3);
          updates.reviewDate = d.toISOString().split("T")[0];
        }
        if (Object.keys(updates).length > 0) updateCoach(updates);
      }
    } catch (e) {
      setSubmitResult({
        status: "failed",
        sample_results: [],
        hidden_passed: 0,
        hidden_total: 0,
        failure_categories: ["network_error"],
        recommendations: [],
      });
    }
    setSubmitLoading(false);
  }, [problem, code, coachState, updateCoach]);

  // ── Submit click (may show self-check first) ──
  const handleSubmitClick = useCallback(() => {
    if (selfCheckEnabled && !problem?.is_basic) {
      setShowSelfCheck(true);
      return;
    }
    doSubmit();
  }, [selfCheckEnabled, doSubmit, problem]);

  // ── Reset ──
  const handleReset = useCallback(() => {
    if (!problem) return;
    setCode(problem.starter_code);
    localStorage.setItem(`code_${problem.id}`, problem.starter_code);
    setTestResults(null);
    setSubmitResult(null);
  }, [problem]);

  const maxHintLevel = problem?.solution_code ? 5 : 4;
  const hasThinkingFilled = !!(
    coachState.problemSummary || coachState.expectedComplexity
  );
  const isSolved = submitResult?.status === "solved";

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-[#8b949e]">
        불러오는 중...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-[#f85149]">
        문제를 찾을 수 없습니다
      </div>
    );
  }

  if (problem.locked && problem.locked_by?.length > 0) {
    return <LockedOverlay lockedBy={problem.locked_by} />;
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {problem.execution_mode === "pytorch_real" && (
        <div className="flex items-center gap-2 border-b border-[#ee4c2c]/30 bg-[#ee4c2c]/10 px-4 py-2 text-xs text-[#ee4c2c]">
          <span className="font-bold">PyTorch 실전 모드</span>
          <span className="text-[#f0883e]">— 이 문제는 실제 torch 라이브러리를 사용합니다. torch, nn, F, Dataset, DataLoader가 자동 import 됩니다.</span>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
      {/* ── Left: Description + ThinkingPad/BasicLearning + Solution ── */}
      <div className="flex w-[40%] min-w-[350px] flex-col overflow-hidden border-r border-[#30363d] bg-[#0d1117]">
        <div className="flex-1 overflow-y-auto">
          <ProblemDescription
            title={problem.title}
            category={problem.category}
            difficulty={problem.difficulty}
            tags={problem.tags}
            statement_en={problem.statement_en}
            signature={problem.signature}
            constraints={problem.constraints}
            examples={problem.examples}
            hints={problem.is_basic ? [] : problem.hints}
          />
          {problem.is_basic && problem.basic_info ? (
            <BasicLearningPanel
              basicInfo={problem.basic_info}
              solutionCode={problem.solution_code}
              solutionExplanation={problem.solution_explanation}
              hasAttempted={problem.attempts > 0 || testResults !== null}
              problemId={problem.id}
              currentCode={code}
            />
          ) : (
            <ThinkingPad state={coachState} onChange={updateCoach} />
          )}
        </div>
        {!problem.is_basic && (
          <SolutionPanel
            solutionCode={problem.solution_code}
            solutionExplanation={problem.solution_explanation}
            attempts={problem.attempts}
            status={problem.status}
          />
        )}
      </div>

      {/* ── Right: Editor + Results ── */}
      <div className="flex flex-1 flex-col">
        {/* Action Bar */}
        <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-2">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-[#58a6ff] hover:underline">
              ← 목록
            </a>
            <span className="text-xs text-[#484f58]">|</span>
            <a href="/notes" className="text-xs text-[#8b949e] hover:text-[#58a6ff] hover:underline">
              오답 노트
            </a>
            <span className="text-xs text-[#484f58]">|</span>
            <Timer />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-[10px] text-[#484f58] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selfCheckEnabled}
                onChange={(e) => toggleSelfCheck(e.target.checked)}
                className="h-2.5 w-2.5 accent-[#58a6ff]"
              />
              자가점검
            </label>
            <button
              onClick={handleReset}
              className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#8b949e] transition-colors hover:border-[#8b949e] hover:text-[#e6edf3]"
            >
              초기화
            </button>
            <button
              onClick={handleRun}
              disabled={runLoading}
              className="rounded-md bg-[#238636] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043] disabled:opacity-50"
            >
              {runLoading ? "실행 중..." : "테스트 실행"}
            </button>
            <button
              onClick={handleSubmitClick}
              disabled={submitLoading}
              className="rounded-md bg-[#1f6feb] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#388bfd] disabled:opacity-50"
            >
              {submitLoading ? "제출 중..." : "제출"}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <CodeEditor value={code} onChange={setCode} problemId={problem.id} />
        </div>

        {/* Results Panel */}
        <div className="h-[280px] min-h-[200px] border-t border-[#30363d] bg-[#0d1117]">
          <div className="flex border-b border-[#30363d] bg-[#161b22]">
            <TabBtn
              active={activeTab === "tests"}
              onClick={() => setActiveTab("tests")}
            >
              샘플 테스트
              {testResults && (
                <span
                  className={`ml-1 ${
                    testResults.every((r) => r.passed)
                      ? "text-[#3fb950]"
                      : "text-[#f85149]"
                  }`}
                >
                  ({testResults.filter((r) => r.passed).length}/
                  {testResults.length})
                </span>
              )}
            </TabBtn>
            <TabBtn
              active={activeTab === "submit"}
              onClick={() => setActiveTab("submit")}
            >
              제출 결과
              {submitResult && (
                <span
                  className={`ml-1 ${
                    submitResult.status === "solved"
                      ? "text-[#3fb950]"
                      : "text-[#f85149]"
                  }`}
                >
                  ({submitResult.status})
                </span>
              )}
            </TabBtn>
            {!problem.is_basic && (
              <TabBtn
                active={activeTab === "coach"}
                onClick={() => setActiveTab("coach")}
              >
                AI 코치
                {coachState.hintLevel > 0 && (
                  <span className="ml-1 text-[#d29922]">
                    L{coachState.hintLevel}
                  </span>
                )}
              </TabBtn>
            )}
          </div>

          <div className="h-[calc(100%-33px)] overflow-hidden">
            {activeTab === "tests" && (
              <TestResults results={testResults} loading={runLoading} />
            )}
            {activeTab === "submit" && (
              <div className="h-full overflow-y-auto">
                <SubmitResults result={submitResult} loading={submitLoading} />
                {isSolved && problem.coaching && (
                  <PostSolvePanel
                    coaching={problem.coaching}
                    state={coachState}
                    onChange={updateCoach}
                    problemId={problem.id}
                    userCode={code}
                    mastery={submitResult?.mastery}
                  />
                )}
              </div>
            )}
            {activeTab === "coach" && problem.coaching && (
              <CoachingPanel
                coaching={problem.coaching}
                state={coachState}
                onChange={updateCoach}
                maxHintLevel={maxHintLevel}
                problemId={problem.id}
                userCode={code}
              />
            )}
          </div>
        </div>
      </div>

      {/* Self-Check Modal */}
      {showSelfCheck && (
        <SelfCheckPanel
          onSubmit={doSubmit}
          onSkip={doSubmit}
          onClose={() => setShowSelfCheck(false)}
          hasThinkingPadFilled={hasThinkingFilled}
        />
      )}
    </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-b-2 border-[#58a6ff] text-[#e6edf3]"
          : "text-[#8b949e] hover:text-[#e6edf3]"
      }`}
    >
      {children}
    </button>
  );
}
