import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "dropout_forward",
  title: "Dropout Forward Pass",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement **dropout** during forward pass.\n\nGiven input values, a binary mask (1=keep, 0=drop), dropout probability p, and training flag:\n- If training: multiply by mask and scale by 1/(1-p)\n- If not training: return input unchanged\n\n**Function signature:**\n\`\`\`python\ndef solution(x: List[List[float]], mask: List[List[int]], p: float, training: bool) -> List[List[float]]:\n\`\`\`\n\nReturn values rounded to 4 decimal places.`,
  function_name: "solution",
  signature: "def solution(x: List[List[float]], mask: List[List[int]], p: float, training: bool) -> List[List[float]]:",
  constraints: ["0 < p < 1", "mask values are 0 or 1"],
  examples: [{ input: { x: [[1.0,2.0,3.0]], mask: [[1,0,1]], p: 0.5, training: true }, output: [[2.0, 0.0, 6.0]], explanation: "Scale by 1/(1-0.5)=2: kept values doubled, dropped values zeroed" }],
  starter_code: "def solution(x: List[List[float]], mask: List[List[int]], p: float, training: bool) -> List[List[float]]:\n    pass",
  hints: ["training 모드에서는 mask를 적용하고 1/(1-p)로 스케일링합니다.", "eval 모드에서는 입력을 그대로 반환합니다. 이 스케일링이 학습/추론 일관성을 보장합니다."],
  solution_code: `def solution(x: List[List[float]], mask: List[List[int]], p: float, training: bool) -> List[List[float]]:
    if not training:
        return x
    scale = 1.0 / (1.0 - p)
    return [[round(x[i][j] * mask[i][j] * scale, 4) for j in range(len(x[0]))] for i in range(len(x))]`,
  solution_explanation: "Dropout은 과적합 방지를 위해 학습 시 뉴런을 무작위로 비활성화하고, 추론 시에는 전체를 사용합니다. inverted dropout 방식입니다.",
  sample_tests: [
    { input: { x: [[1.0,2.0,3.0]], mask: [[1,0,1]], p: 0.5, training: true }, expected: [[2.0, 0.0, 6.0]] },
    { input: { x: [[1.0,2.0,3.0]], mask: [[1,0,1]], p: 0.5, training: false }, expected: [[1.0, 2.0, 3.0]] },
  ],
  hidden_tests: [
    { input: { x: [[10.0]], mask: [[0]], p: 0.3, training: true }, expected: [[0.0]], failure_category: "edge_case" },
    { input: { x: [[1.0,2.0],[3.0,4.0]], mask: [[1,1],[0,1]], p: 0.25, training: true }, expected: [[1.3333,2.6667],[0.0,5.3333]], failure_category: "standard" },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["linear_layer_manual"],
  fallback_problem_ids: ["tensor_manipulation"],
};
export default problem;
