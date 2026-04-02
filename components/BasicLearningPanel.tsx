"use client";

import { useState, useCallback } from "react";
import { BasicInfo, LearningStep } from "@/lib/learning-path";

interface StepTestResult {
  allPassed: boolean;
  summary: string;
  details: { index: number; passed: boolean; error: string | null }[];
}

interface BasicLearningPanelProps {
  basicInfo: BasicInfo;
  solutionCode: string | null;
  solutionExplanation: string | null;
  hasAttempted: boolean;
  problemId: string;
  currentCode: string;
}

function StepCard({
  step,
  index,
  isActive,
  isCompleted,
  onRevealHint,
  hintRevealed,
  onRunTest,
  testLoading,
  testResult,
}: {
  step: LearningStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onRevealHint: () => void;
  hintRevealed: boolean;
  onRunTest: () => void;
  testLoading: boolean;
  testResult: StepTestResult | null;
}) {
  return (
    <div
      className={`rounded-lg border p-3 transition-all ${
        isActive
          ? "border-[#58a6ff]/60 bg-[#1f6feb]/5"
          : isCompleted
          ? "border-[#238636]/40 bg-[#238636]/5"
          : "border-[#30363d] bg-[#0d1117] opacity-40"
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
            isCompleted
              ? "bg-[#238636] text-white"
              : isActive
              ? "bg-[#1f6feb] text-white"
              : "bg-[#21262d] text-[#484f58]"
          }`}
        >
          {isCompleted ? "✓" : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#e6edf3]">{step.title}</p>
          <p className="mt-1 text-xs text-[#8b949e] leading-relaxed">
            {step.instruction}
          </p>

          {/* Action buttons for active step */}
          {isActive && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {!hintRevealed && (
                <button
                  onClick={onRevealHint}
                  className="flex items-center gap-1 rounded border border-[#d29922]/40 bg-[#d29922]/5 px-2 py-1 text-[10px] font-medium text-[#d29922] transition-colors hover:bg-[#d29922]/10"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  코드 보기
                </button>
              )}
              <button
                onClick={onRunTest}
                disabled={testLoading}
                className="flex items-center gap-1 rounded border border-[#58a6ff]/40 bg-[#1f6feb]/10 px-2 py-1 text-[10px] font-medium text-[#58a6ff] transition-colors hover:bg-[#1f6feb]/20 disabled:opacity-50"
              >
                {testLoading ? (
                  <>
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-[#58a6ff] border-t-transparent" />
                    실행 중...
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4 2l10 6-10 6V2z" />
                    </svg>
                    여기까지 실행해보기
                  </>
                )}
              </button>
            </div>
          )}

          {/* Hint code */}
          {(hintRevealed || isCompleted) && (
            <pre className="mt-2 overflow-x-auto rounded border border-[#30363d] bg-[#161b22] p-2 text-[11px] leading-relaxed text-[#7ee787]">
              <code>{step.hint_code}</code>
            </pre>
          )}

          {/* Test results */}
          {testResult && (isActive || isCompleted) && (
            <div
              className={`mt-2 rounded border px-3 py-2 text-[11px] ${
                testResult.allPassed
                  ? "border-[#238636]/40 bg-[#238636]/10 text-[#3fb950]"
                  : "border-[#f85149]/40 bg-[#f85149]/10 text-[#f0883e]"
              }`}
            >
              <div className="font-semibold">
                {testResult.allPassed
                  ? "✓ 통과! 이 단계까지 올바르게 작성했습니다."
                  : "✕ 아직 틀렸습니다. 코드를 다시 확인해보세요."}
              </div>
              <div className="mt-1 text-[10px] opacity-80">
                {testResult.summary}
              </div>
              {!testResult.allPassed && testResult.details.length > 0 && (
                <div className="mt-1.5 space-y-1">
                  {testResult.details
                    .filter((d) => !d.passed)
                    .slice(0, 2)
                    .map((d) => (
                      <div key={d.index} className="text-[10px] opacity-70">
                        테스트 {d.index + 1}: {d.error || "기대값과 다른 결과"}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BasicLearningPanel({
  basicInfo,
  solutionCode,
  solutionExplanation,
  hasAttempted,
  problemId,
  currentCode,
}: BasicLearningPanelProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());
  const [showFullSolution, setShowFullSolution] = useState(false);
  const [stepResults, setStepResults] = useState<Record<number, StepTestResult>>({});
  const [testLoading, setTestLoading] = useState(false);

  const steps = basicInfo.steps;

  const revealHint = (idx: number) => {
    setRevealedHints((prev) => new Set(prev).add(idx));
  };

  const runStepTest = useCallback(
    async (stepIdx: number) => {
      setTestLoading(true);
      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problemId, code: currentCode }),
        });
        const data = await res.json();

        const passed = data.results?.filter((r: { passed: boolean }) => r.passed).length ?? 0;
        const total = data.results?.length ?? 0;
        const allPassed = data.all_passed === true;

        const details = (data.results ?? []).map(
          (r: { passed: boolean; error: string | null }, i: number) => ({
            index: i,
            passed: r.passed,
            error: r.error,
          })
        );

        const result: StepTestResult = {
          allPassed,
          summary: allPassed
            ? `샘플 테스트 ${total}개 모두 통과!`
            : `샘플 테스트 ${passed}/${total}개 통과`,
          details,
        };

        setStepResults((prev) => ({ ...prev, [stepIdx]: result }));

        if (allPassed && stepIdx < steps.length - 1) {
          setTimeout(() => setCurrentStep(stepIdx + 1), 800);
        }
      } catch {
        setStepResults((prev) => ({
          ...prev,
          [stepIdx]: {
            allPassed: false,
            summary: "실행 중 오류가 발생했습니다.",
            details: [],
          },
        }));
      }
      setTestLoading(false);
    },
    [problemId, currentCode, steps.length]
  );

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Concept Card */}
      <div className="rounded-lg border border-[#1f6feb]/40 bg-[#1f6feb]/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-[#1f6feb] px-2 py-0.5 text-[10px] font-bold text-white">
            기본 학습
          </span>
          <h3 className="text-sm font-bold text-[#58a6ff]">
            {basicInfo.concept}
          </h3>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-[#c9d1d9] whitespace-pre-line">
          {basicInfo.explanation}
        </p>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">
            핵심 포인트
          </p>
          {basicInfo.keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#c9d1d9]">
              <span className="mt-0.5 text-[#58a6ff]">•</span>
              <code className="rounded bg-[#21262d] px-1 py-0.5 text-[11px] text-[#e6edf3] leading-relaxed">
                {point}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#e6edf3]">
            단계별 구현 가이드
          </h4>
          <span className="text-[10px] text-[#8b949e]">
            {currentStep + 1} / {steps.length} 단계
          </span>
        </div>

        <p className="mb-3 text-[10px] text-[#8b949e] leading-relaxed">
          각 단계의 지시를 읽고 에디터에 직접 코드를 작성한 후,
          <strong className="text-[#58a6ff]"> "여기까지 실행해보기"</strong>를 눌러 맞는지 확인하세요.
        </p>

        {/* Progress Bar */}
        <div className="mb-4 flex gap-1">
          {steps.map((_, i) => {
            const result = stepResults[i];
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  result?.allPassed
                    ? "bg-[#238636]"
                    : i === currentStep
                    ? "bg-[#58a6ff]"
                    : i < currentStep
                    ? "bg-[#1f6feb]/50"
                    : "bg-[#21262d]"
                }`}
              />
            );
          })}
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              isActive={i === currentStep}
              isCompleted={i < currentStep}
              onRevealHint={() => revealHint(i)}
              hintRevealed={revealedHints.has(i)}
              onRunTest={() => runStepTest(i)}
              testLoading={testLoading && i === currentStep}
              testResult={stepResults[i] ?? null}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="rounded border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-[10px] text-[#8b949e] transition-colors hover:border-[#58a6ff] disabled:opacity-30"
          >
            ← 이전 단계
          </button>
          <div className="text-center">
            {stepResults[currentStep]?.allPassed && currentStep === steps.length - 1 && (
              <p className="text-[10px] text-[#3fb950] font-semibold">
                모든 단계 완료! 이제 Submit으로 제출하세요.
              </p>
            )}
          </div>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={goNext}
              className="rounded border border-[#58a6ff]/40 bg-[#1f6feb]/10 px-3 py-1.5 text-[10px] font-medium text-[#58a6ff] transition-colors hover:bg-[#1f6feb]/20"
            >
              다음 단계 →
            </button>
          ) : (
            <span className="rounded bg-[#238636]/20 px-3 py-1.5 text-[10px] font-medium text-[#3fb950]">
              마지막 단계
            </span>
          )}
        </div>
      </div>

      {/* Full Solution */}
      {solutionCode && (
        <div className="rounded-lg border border-[#30363d] bg-[#0d1117]">
          {!showFullSolution ? (
            <button
              onClick={() => setShowFullSolution(true)}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-[#58a6ff] transition-colors hover:bg-[#161b22]"
            >
              전체 정답 코드 보기
            </button>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#3fb950]">전체 정답 코드</h4>
                <button
                  onClick={() => setShowFullSolution(false)}
                  className="text-[10px] text-[#8b949e] hover:text-[#e6edf3]"
                >
                  접기
                </button>
              </div>
              {solutionExplanation && (
                <p className="text-xs italic text-[#3fb950] leading-relaxed">
                  {solutionExplanation}
                </p>
              )}
              <pre className="overflow-x-auto rounded-md border border-[#30363d] bg-[#161b22] p-3 text-[12px] leading-relaxed text-[#e6edf3]">
                <code>{solutionCode}</code>
              </pre>
              <div className="rounded border border-[#238636]/30 bg-[#238636]/5 px-3 py-2">
                <p className="text-[10px] text-[#3fb950]">
                  이 풀이를 이해했다면, 에디터에서 직접 코드를 작성하고 제출해 보세요.
                  정답 제출 후 다음 실전 문제가 잠금 해제됩니다.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
