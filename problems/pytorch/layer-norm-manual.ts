import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "layer_norm_manual",
  title: "Layer Normalization from Scratch",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor", "operations"],
  statement_en: `Implement **Layer Normalization** from scratch.

Given a 2D input \`x\` of shape (batch, features), scale parameters \`gamma\`, bias \`beta\`, and a small constant \`eps\`:

For each row, compute:
1. mean = average of the row
2. variance = average of squared deviations from mean
3. normalized = (x - mean) / sqrt(variance + eps)
4. output = gamma * normalized + beta

**Function signature:**
\`\`\`python
def solution(x: List[List[float]], gamma: List[float], beta: List[float], eps: float) -> List[List[float]]:
\`\`\`

**Returns:** The normalized 2D list, with each value rounded to 4 decimal places.
`,
  function_name: "solution",
  signature: "def solution(x: List[List[float]], gamma: List[float], beta: List[float], eps: float) -> List[List[float]]:",
  constraints: [
    "1 <= batch <= 100",
    "1 <= features <= 256",
    "len(gamma) == len(beta) == features",
    "eps > 0",
  ],
  examples: [
    {
      input: { x: [[1.0, 2.0, 3.0]], gamma: [1.0, 1.0, 1.0], beta: [0.0, 0.0, 0.0], eps: 1e-5 },
      output: [[-1.2247, 0.0, 1.2247]],
      explanation: "mean=2, var=2/3, std≈0.8165. normalized=[-1.2247, 0, 1.2247]",
    },
  ],
  starter_code: `def solution(x: List[List[float]], gamma: List[float], beta: List[float], eps: float) -> List[List[float]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 행(row)별로 평균(mean)과 분산(variance)을 구하세요.",
    "정규화 공식: (x_i - mean) / sqrt(variance + eps). 그 후 gamma를 곱하고 beta를 더합니다.",
  ],
  solution_code: `def solution(x: List[List[float]], gamma: List[float], beta: List[float], eps: float) -> List[List[float]]:
    result = []
    for row in x:
        n = len(row)
        mean = sum(row) / n
        var = sum((v - mean) ** 2 for v in row) / n
        std = (var + eps) ** 0.5
        out = [round(gamma[i] * (row[i] - mean) / std + beta[i], 4) for i in range(n)]
        result.append(out)
    return result`,
  solution_explanation: "각 행에서 평균과 분산을 계산한 후, (x-mean)/std로 정규화하고 gamma*x+beta를 적용합니다. Transformer의 핵심 구성 요소입니다.",
  sample_tests: [
    {
      input: { x: [[1.0, 2.0, 3.0]], gamma: [1.0, 1.0, 1.0], beta: [0.0, 0.0, 0.0], eps: 1e-5 },
      expected: [[-1.2247, 0.0, 1.2247]],
    },
    {
      input: { x: [[4.0, 4.0, 4.0]], gamma: [1.0, 1.0, 1.0], beta: [0.0, 0.0, 0.0], eps: 1e-5 },
      expected: [[0.0, 0.0, 0.0]],
    },
  ],
  hidden_tests: [
    {
      input: { x: [[1.0, 3.0], [2.0, 4.0]], gamma: [2.0, 0.5], beta: [1.0, -1.0], eps: 1e-5 },
      expected: [[-1.0, -0.5], [-1.0, -0.5]],
      failure_category: "wrong_formula",
    },
    {
      input: { x: [[10.0, 20.0, 30.0, 40.0]], gamma: [1.0, 1.0, 1.0, 1.0], beta: [0.0, 0.0, 0.0, 0.0], eps: 1e-5 },
      expected: [[-1.3416, -0.4472, 0.4472, 1.3416]],
      failure_category: "precision",
    },
  ],
  checker_type: "vector",
  tolerance: 0.01,
  similar_problem_ids: ["tensor_manipulation"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
