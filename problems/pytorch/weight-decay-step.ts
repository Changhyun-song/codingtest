import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "weight_decay_step",
  title: "SGD with Weight Decay",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "optimization"],
  statement_en: `Implement one step of **SGD with L2 weight decay**.\n\nUpdate rule: param = param - lr × (grad + weight_decay × param)\n\n**Function signature:**\n\`\`\`python\ndef solution(params: List[float], grads: List[float], lr: float, weight_decay: float) -> List[float]:\n\`\`\`\n\nReturn updated params, rounded to 6 decimals.`,
  function_name: "solution",
  signature: "def solution(params: List[float], grads: List[float], lr: float, weight_decay: float) -> List[float]:",
  constraints: ["len(params) == len(grads)", "lr > 0", "weight_decay >= 0"],
  examples: [{ input: { params: [1.0, 2.0], grads: [0.1, 0.2], lr: 0.01, weight_decay: 0.1 }, output: [0.998, 1.996], explanation: "p = p - 0.01*(g + 0.1*p)" }],
  starter_code: "def solution(params: List[float], grads: List[float], lr: float, weight_decay: float) -> List[float]:\n    pass",
  hints: ["각 파라미터에 대해: new_p = p - lr * (g + wd * p)", "Weight decay는 큰 가중치에 페널티를 주어 과적합을 방지합니다."],
  solution_code: `def solution(params: List[float], grads: List[float], lr: float, weight_decay: float) -> List[float]:
    return [round(p - lr * (g + weight_decay * p), 6) for p, g in zip(params, grads)]`,
  solution_explanation: "Weight decay(L2 정규화)는 가중치가 너무 커지는 것을 방지합니다. AdamW에서는 decoupled weight decay를 사용합니다.",
  sample_tests: [
    { input: { params: [1.0, 2.0], grads: [0.1, 0.2], lr: 0.01, weight_decay: 0.1 }, expected: [0.998, 1.996] },
    { input: { params: [10.0], grads: [0.0], lr: 0.1, weight_decay: 0.01 }, expected: [9.99] },
  ],
  hidden_tests: [
    { input: { params: [0.0, 0.0], grads: [1.0, -1.0], lr: 0.5, weight_decay: 0.0 }, expected: [-0.5, 0.5], failure_category: "edge_case" },
    { input: { params: [5.0, -3.0, 1.0], grads: [0.5, -0.3, 0.1], lr: 0.01, weight_decay: 0.05 }, expected: [4.9925, -2.997, 0.9985], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.0001,
  similar_problem_ids: ["gradient_descent_step", "gradient_clip_by_norm"],
  fallback_problem_ids: ["gradient_descent_step"],
};
export default problem;
