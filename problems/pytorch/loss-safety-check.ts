import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "loss_safety_check",
  title: "Loss Computation Safety Checker",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss_function", "debugging"],
  statement_en: `Check if computing cross-entropy loss on given predictions would cause numerical issues.\n\nFor each sample, given prediction probabilities and target index:\n- "invalid_target": target index out of range\n- "log_zero": prob at target is 0\n- "not_normalized": probs don't sum to ~1.0 (tolerance 0.01)\n- "safe": no issues\n\nReturn a list of status strings.\n\n**Function signature:**\n\`\`\`python\ndef solution(predictions: List[List[float]], targets: List[int]) -> List[str]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(predictions: List[List[float]], targets: List[int]) -> List[str]:",
  constraints: ["len(predictions) == len(targets)"],
  examples: [{ input: { predictions: [[0.7,0.3],[0.0,1.0]], targets: [0,0] }, output: ["safe","log_zero"], explanation: "Sample 0: safe. Sample 1: pred[0]=0 → log(0)" }],
  starter_code: "def solution(predictions: List[List[float]], targets: List[int]) -> List[str]:\n    pass",
  hints: ["target 범위 확인 → prob==0 확인 → sum≈1 확인 순서로 체크합니다.", "실전에서 log(0) = -inf → NaN loss의 주요 원인입니다."],
  solution_code: `def solution(predictions: List[List[float]], targets: List[int]) -> List[str]:
    result = []
    for pred, t in zip(predictions, targets):
        if t < 0 or t >= len(pred):
            result.append("invalid_target")
        elif pred[t] <= 0:
            result.append("log_zero")
        elif abs(sum(pred) - 1.0) > 0.01:
            result.append("not_normalized")
        else:
            result.append("safe")
    return result`,
  solution_explanation: "Loss NaN/Inf 디버깅은 실전 학습의 핵심 기술입니다. softmax 전에 logits로 CE를 계산하면 log(0) 문제를 피할 수 있습니다.",
  sample_tests: [
    { input: { predictions: [[0.7,0.3],[0.0,1.0]], targets: [0,0] }, expected: ["safe","log_zero"] },
    { input: { predictions: [[0.5,0.5]], targets: [2] }, expected: ["invalid_target"] },
  ],
  hidden_tests: [
    { input: { predictions: [[0.3,0.3]], targets: [0] }, expected: ["not_normalized"], failure_category: "standard" },
    { input: { predictions: [[1.0]], targets: [0] }, expected: ["safe"], failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["label_smoothing_loss", "batch_cross_entropy"],
  fallback_problem_ids: ["softmax_from_scratch"],
};
export default problem;
