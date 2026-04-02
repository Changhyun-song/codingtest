import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "ddp_gradient_step",
  title: "DDP Training Step Simulation",
  category: "pytorch",
  difficulty: "hard",
  tags: ["pytorch", "distributed"],
  statement_en: `Simulate one **DDP (Distributed Data Parallel) training step**.\n\nGiven per-GPU gradients, learning rate, and current parameters:\n1. All-reduce (average) the gradients across GPUs\n2. Apply SGD update: param = param - lr × avg_gradient\n\nReturn the updated parameters, rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(per_gpu_grads: List[List[float]], lr: float, params: List[float]) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(per_gpu_grads: List[List[float]], lr: float, params: List[float]) -> List[float]:",
  constraints: ["all grads same dim as params"],
  examples: [{ input: { per_gpu_grads: [[1.0, 2.0], [3.0, 4.0]], lr: 0.1, params: [10.0, 20.0] }, output: [9.8, 19.7], explanation: "Avg grad=[2,3]. Update: [10-0.2, 20-0.3]" }],
  starter_code: "def solution(per_gpu_grads: List[List[float]], lr: float, params: List[float]) -> List[float]:\n    pass",
  hints: ["먼저 모든 GPU의 gradient를 평균합니다.", "SGD: param -= lr * grad. DDP는 all-reduce 후 각 GPU가 동일한 업데이트를 수행합니다."],
  solution_code: `def solution(per_gpu_grads: List[List[float]], lr: float, params: List[float]) -> List[float]:
    n = len(per_gpu_grads)
    d = len(params)
    avg = [sum(per_gpu_grads[i][j] for i in range(n)) / n for j in range(d)]
    return [round(params[j] - lr * avg[j], 4) for j in range(d)]`,
  solution_explanation: "DDP의 핵심: gradient all-reduce → 동일 업데이트 → 모든 GPU가 동일한 모델 유지. Ring all-reduce로 통신을 최적화합니다.",
  sample_tests: [
    { input: { per_gpu_grads: [[1.0, 2.0], [3.0, 4.0]], lr: 0.1, params: [10.0, 20.0] }, expected: [9.8, 19.7] },
    { input: { per_gpu_grads: [[0.5]], lr: 1.0, params: [5.0] }, expected: [4.5] },
  ],
  hidden_tests: [
    { input: { per_gpu_grads: [[1.0, -1.0], [-1.0, 1.0]], lr: 0.01, params: [0.0, 0.0] }, expected: [0.0, 0.0], failure_category: "edge_case" },
    { input: { per_gpu_grads: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9], [1.0, 1.1, 1.2]], lr: 0.5, params: [1.0, 1.0, 1.0] }, expected: [0.725, 0.675, 0.625], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["all_reduce_sim", "gradient_accumulation"],
  fallback_problem_ids: ["all_reduce_sim"],
};
export default problem;
