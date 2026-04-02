import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "all_reduce_sim",
  title: "All-Reduce Average Simulation",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "distributed"],
  statement_en: `Simulate **all-reduce average** across multiple GPU workers.\n\nGiven each worker's gradient vector, compute the element-wise average across all workers.\nThis is the core operation of distributed data-parallel training (DDP).\n\nReturn the averaged vector, rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(worker_grads: List[List[float]]) -> List[float]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(worker_grads: List[List[float]]) -> List[float]:",
  constraints: ["all workers have same vector dimension"],
  examples: [{ input: { worker_grads: [[1.0, 2.0], [3.0, 4.0]] }, output: [2.0, 3.0], explanation: "Avg of [1,3]=2, [2,4]=3" }],
  starter_code: "def solution(worker_grads: List[List[float]]) -> List[float]:\n    pass",
  hints: ["각 차원별로 모든 워커의 값을 평균합니다.", "DDP에서 all-reduce는 gradient 동기화의 핵심입니다."],
  solution_code: `def solution(worker_grads: List[List[float]]) -> List[float]:
    n = len(worker_grads)
    d = len(worker_grads[0])
    return [round(sum(worker_grads[i][j] for i in range(n)) / n, 4) for j in range(d)]`,
  solution_explanation: "All-reduce는 DDP의 핵심 collective 연산입니다. 각 GPU의 gradient를 평균하여 모든 GPU가 동일한 gradient로 업데이트합니다.",
  sample_tests: [
    { input: { worker_grads: [[1.0, 2.0], [3.0, 4.0]] }, expected: [2.0, 3.0] },
    { input: { worker_grads: [[1.0], [2.0], [3.0], [4.0]] }, expected: [2.5] },
  ],
  hidden_tests: [
    { input: { worker_grads: [[10.0, -10.0]] }, expected: [10.0, -10.0], failure_category: "edge_case" },
    { input: { worker_grads: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]] }, expected: [0.4, 0.5, 0.6], failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["gradient_accumulation", "batch_matmul"],
  fallback_problem_ids: ["gradient_accumulation"],
};
export default problem;
