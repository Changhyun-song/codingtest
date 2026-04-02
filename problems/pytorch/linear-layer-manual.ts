import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "linear_layer_manual",
  title: "Linear Layer from Scratch",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "neural_network"],
  statement_en: `Implement nn.Linear: output = input @ weights^T + bias.\n\nGiven:\n- x: [batch, in_features]\n- weights: [out_features, in_features]\n- bias: [out_features]\n\nReturn output [batch, out_features], rounded to 4 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(x: List[List[float]], weights: List[List[float]], bias: List[float]) -> List[List[float]]:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(x: List[List[float]], weights: List[List[float]], bias: List[float]) -> List[List[float]]:",
  constraints: ["1 <= batch <= 64", "1 <= in_features, out_features <= 512"],
  examples: [{ input: { x: [[1,2]], weights: [[3,4],[5,6]], bias: [1,2] }, output: [[12,19]], explanation: "[1*3+2*4+1, 1*5+2*6+2] = [12, 19]" }],
  starter_code: "def solution(x: List[List[float]], weights: List[List[float]], bias: List[float]) -> List[List[float]]:\n    pass",
  hints: ["행렬 곱셈: output[b][o] = sum(x[b][i] * weights[o][i]) + bias[o]", "weights의 shape은 [out_features, in_features]임에 주의하세요 (PyTorch 기본)."],
  solution_code: `def solution(x: List[List[float]], weights: List[List[float]], bias: List[float]) -> List[List[float]]:
    batch = len(x)
    out_dim = len(weights)
    in_dim = len(weights[0])
    result = []
    for b in range(batch):
        row = []
        for o in range(out_dim):
            val = sum(x[b][i] * weights[o][i] for i in range(in_dim)) + bias[o]
            row.append(round(val, 4))
        result.append(row)
    return result`,
  solution_explanation: "nn.Linear는 가장 기본적인 신경망 레이어입니다. y = xW^T + b 연산을 수행합니다.",
  sample_tests: [
    { input: { x: [[1,2]], weights: [[3,4],[5,6]], bias: [1,2] }, expected: [[12.0,19.0]] },
    { input: { x: [[1,0],[0,1]], weights: [[1,2],[3,4]], bias: [0,0] }, expected: [[1.0,3.0],[2.0,4.0]] },
  ],
  hidden_tests: [
    { input: { x: [[0,0,0]], weights: [[1,2,3]], bias: [5] }, expected: [[5.0]], failure_category: "edge_case" },
    { input: { x: [[1,1],[2,2]], weights: [[1,1],[1,-1]], bias: [0,0] }, expected: [[2.0,0.0],[4.0,0.0]], failure_category: "standard" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["simple_mlp_forward", "residual_block_forward"],
  fallback_problem_ids: ["simple_mlp_forward"],
};
export default problem;
