import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "prune_by_magnitude",
  title: "Magnitude-Based Weight Pruning",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Implement **magnitude pruning**: zero out the smallest weights by absolute value.\n\nGiven a 2D weight matrix and sparsity ratio (0.0 to 1.0), set the smallest floor(total_elements × sparsity) weights to 0.\n\n**Function signature:**\n\`\`\`python\ndef solution(weights: List[List[float]], sparsity: float) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(weights: List[List[float]], sparsity: float) -> List[List[float]]:",
  constraints: ["0 <= sparsity < 1"],
  examples: [{ input: { weights: [[1,-2,3],[0.5,-0.1,2]], sparsity: 0.5 }, output: [[0.0,-2,3],[0.0,0.0,2]], explanation: "Prune 3 smallest by |value|: 0.1, 0.5, 1" }],
  starter_code: "def solution(weights: List[List[float]], sparsity: float) -> List[List[float]]:\n    pass",
  hints: ["모든 가중치를 (절대값, i, j) 형태로 모아 정렬합니다.", "가장 작은 floor(total*sparsity)개를 0으로 만듭니다."],
  solution_code: `def solution(weights: List[List[float]], sparsity: float) -> List[List[float]]:
    rows, cols = len(weights), len(weights[0])
    flat = [(abs(weights[i][j]), i, j) for i in range(rows) for j in range(cols)]
    flat.sort()
    n_prune = int(len(flat) * sparsity)
    prune_set = set()
    for k in range(n_prune):
        _, i, j = flat[k]
        prune_set.add((i, j))
    return [[0.0 if (i, j) in prune_set else weights[i][j] for j in range(cols)] for i in range(rows)]`,
  solution_explanation: "Pruning은 모델 크기와 추론 비용을 줄입니다. 절대값이 작은 가중치를 제거해도 성능 저하가 적습니다.",
  sample_tests: [
    { input: { weights: [[1,-2,3],[0.5,-0.1,2]], sparsity: 0.5 }, expected: [[0.0,-2,3],[0.0,0.0,2]] },
    { input: { weights: [[1,2],[3,4]], sparsity: 0.0 }, expected: [[1,2],[3,4]] },
  ],
  hidden_tests: [
    { input: { weights: [[0.5]], sparsity: 0.5 }, expected: [[0.5]], failure_category: "edge_case" },
    { input: { weights: [[10,-1,2],[-3,0.5,8]], sparsity: 0.333 }, expected: [[10,0.0,2],[-3,0.0,8]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["quantize_dequantize", "model_memory_calc"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
