import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "gradient_clip_by_norm",
  title: "Gradient Clipping by Global Norm",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Implement **gradient clipping by global norm**, a critical technique for stable training of deep networks.

Given a list of gradient vectors and a max_norm value:
1. Compute the **global L2 norm** across ALL gradient values: \`sqrt(sum of all g^2)\`
2. If the global norm exceeds max_norm, scale ALL gradients by \`max_norm / global_norm\`
3. Otherwise, return gradients unchanged

**Function signature:**
\`\`\`python
def solution(gradients: List[List[float]], max_norm: float) -> List[List[float]]:
\`\`\`

**Returns:** Clipped gradients, each value rounded to 6 decimal places.
`,
  function_name: "solution",
  signature: "def solution(gradients: List[List[float]], max_norm: float) -> List[List[float]]:",
  constraints: [
    "1 <= len(gradients) <= 100",
    "1 <= len(gradients[i]) <= 1000",
    "max_norm > 0",
  ],
  examples: [
    {
      input: { gradients: [[3.0, 4.0]], max_norm: 2.5 },
      output: [[1.5, 2.0]],
      explanation: "global norm=5.0 > 2.5, scale=0.5. [3*0.5, 4*0.5]=[1.5, 2.0]",
    },
  ],
  starter_code: `def solution(gradients: List[List[float]], max_norm: float) -> List[List[float]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "먼저 모든 gradient 값의 제곱합을 구하고 제곱근을 계산합니다 (global L2 norm).",
    "global norm > max_norm이면 scale = max_norm / global_norm으로 모든 값을 곱합니다.",
  ],
  solution_code: `def solution(gradients: List[List[float]], max_norm: float) -> List[List[float]]:
    total_sq = 0.0
    for grad in gradients:
        for g in grad:
            total_sq += g * g
    total_norm = total_sq ** 0.5
    if total_norm <= max_norm:
        return gradients
    scale = max_norm / total_norm
    return [[round(g * scale, 6) for g in grad] for grad in gradients]`,
  solution_explanation: "전체 gradient의 L2 norm을 계산하고 max_norm을 초과하면 일괄 스케일링합니다. RNN/Transformer 학습 안정화에 필수입니다.",
  sample_tests: [
    {
      input: { gradients: [[3.0, 4.0]], max_norm: 2.5 },
      expected: [[1.5, 2.0]],
    },
    {
      input: { gradients: [[1.0, 0.0], [0.0, 1.0]], max_norm: 5.0 },
      expected: [[1.0, 0.0], [0.0, 1.0]],
    },
  ],
  hidden_tests: [
    {
      input: { gradients: [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], max_norm: 1.0 },
      expected: [[0.104828, 0.209657, 0.314485], [0.419314, 0.524142, 0.628971]],
      failure_category: "precision",
    },
    {
      input: { gradients: [[0.0, 0.0]], max_norm: 1.0 },
      expected: [[0.0, 0.0]],
      failure_category: "edge_case",
    },
  ],
  checker_type: "vector",
  tolerance: 0.001,
  similar_problem_ids: ["gradient_accumulation", "pytorch_training_loop"],
  fallback_problem_ids: ["pytorch_training_loop"],
};

export default problem;
