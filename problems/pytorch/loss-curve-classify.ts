import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "loss_curve_classify",
  title: "Training Loss Curve Diagnosis",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "debugging"],
  statement_en: `Diagnose a training issue from the loss curve.\n\nGiven a list of loss values over training steps, classify the pattern:\n- "converging": overall decreasing trend (last 25% avg < first 25% avg × 0.8)\n- "diverging": overall increasing (last 25% avg > first 25% avg × 1.5)\n- "nan": any NaN or Inf value (represented as -1 in input)\n- "plateau": not converging/diverging, and std of last 50% < 0.01\n- "oscillating": otherwise\n\nCheck in order: nan → diverging → converging → plateau → oscillating.\n\n**Function signature:**\n\`\`\`python\ndef solution(losses: List[float]) -> str:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(losses: List[float]) -> str:",
  constraints: ["len(losses) >= 4", "-1 represents NaN/Inf"],
  examples: [{ input: { losses: [2.0, 1.5, 1.0, 0.5] }, output: "converging", explanation: "Decreasing trend" }],
  starter_code: "def solution(losses: List[float]) -> str:\n    pass",
  hints: ["먼저 NaN(-1)을 체크하고, 그 다음 전반부/후반부 평균을 비교합니다.", "plateau는 변화가 거의 없는 상태, oscillating은 불규칙한 변동입니다."],
  solution_code: `def solution(losses: List[float]) -> str:
    if -1 in losses:
        return "nan"
    n = len(losses)
    q1 = n // 4
    first_avg = sum(losses[:max(q1,1)]) / max(q1,1)
    last_avg = sum(losses[n-max(q1,1):]) / max(q1,1)
    if last_avg > first_avg * 1.5:
        return "diverging"
    if last_avg < first_avg * 0.8:
        return "converging"
    half = losses[n//2:]
    mean_h = sum(half) / len(half)
    std_h = (sum((x - mean_h)**2 for x in half) / len(half)) ** 0.5
    if std_h < 0.01:
        return "plateau"
    return "oscillating"`,
  solution_explanation: "Loss curve 분석은 학습 디버깅의 첫 단계입니다. 발산은 LR 문제, plateau는 capacity 부족이나 잘못된 데이터, oscillation은 LR이 너무 큰 경우가 많습니다.",
  sample_tests: [
    { input: { losses: [2.0, 1.5, 1.0, 0.5] }, expected: "converging" },
    { input: { losses: [0.5, 1.0, 2.0, 4.0] }, expected: "diverging" },
  ],
  hidden_tests: [
    { input: { losses: [1.0, 0.9, -1, 0.8] }, expected: "nan", failure_category: "edge_case" },
    { input: { losses: [1.0, 1.001, 0.999, 1.0, 1.001, 0.999, 1.0, 1.0] }, expected: "plateau", failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["gradient_health_check", "lr_range_test"],
  fallback_problem_ids: ["pytorch_training_loop"],
};
export default problem;
