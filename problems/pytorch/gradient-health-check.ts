import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "gradient_health_check",
  title: "Gradient Health Diagnosis",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "autograd", "debugging"],
  statement_en: `Diagnose gradient health from per-layer gradient L2 norms.\n\nGiven a list of gradient norms (from output layer to input layer), classify:\n- "exploding": any norm > 100\n- "vanishing": any norm < 1e-7\n- "unstable": max/min ratio > 100 (but not exploding/vanishing)\n- "healthy": otherwise\n\nCheck in order: exploding → vanishing → unstable → healthy.\n\n**Function signature:**\n\`\`\`python\ndef solution(grad_norms: List[float]) -> str:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(grad_norms: List[float]) -> str:",
  constraints: ["len(grad_norms) >= 1", "all values >= 0"],
  examples: [{ input: { grad_norms: [0.5, 0.3, 0.1, 0.05] }, output: "healthy", explanation: "All norms reasonable, ratio=10" }],
  starter_code: "def solution(grad_norms: List[float]) -> str:\n    pass",
  hints: ["폭발/소실을 먼저 체크하고, 그 다음 불안정 여부를 판단합니다.", "gradient clipping, skip connection, normalization이 이 문제를 완화합니다."],
  solution_code: `def solution(grad_norms: List[float]) -> str:
    if any(g > 100 for g in grad_norms):
        return "exploding"
    if any(g < 1e-7 for g in grad_norms):
        return "vanishing"
    mn = min(grad_norms)
    if mn > 0 and max(grad_norms) / mn > 100:
        return "unstable"
    return "healthy"`,
  solution_explanation: "Gradient 건강 진단은 학습 디버깅의 첫 단계입니다. exploding은 gradient clipping으로, vanishing은 residual connection이나 초기화 개선으로 해결합니다.",
  sample_tests: [
    { input: { grad_norms: [0.5, 0.3, 0.1, 0.05] }, expected: "healthy" },
    { input: { grad_norms: [0.5, 150.0, 0.1] }, expected: "exploding" },
  ],
  hidden_tests: [
    { input: { grad_norms: [0.5, 0.3, 1e-8] }, expected: "vanishing", failure_category: "standard" },
    { input: { grad_norms: [10.0, 0.001] }, expected: "unstable", failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["dead_neuron_check", "manual_backward_linear"],
  fallback_problem_ids: ["gradient_clip_by_norm"],
};
export default problem;
