import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "focal_loss_compute",
  title: "Focal Loss for Imbalanced Classification",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss_function"],
  statement_en: `Implement **Focal Loss**, designed for class-imbalanced classification (common in medical/bio image analysis).

**Focal Loss formula:**
\`FL(p_t) = -alpha_t * (1 - p_t)^gamma * log(p_t)\`

Where:
- \`predictions[i]\` is the predicted probability of being class 1 (sigmoid output)
- \`targets[i]\` is 0 or 1
- \`p_t = p\` if target=1, else \`p_t = 1-p\`
- \`alpha_t = alpha\` if target=1, else \`alpha_t = 1-alpha\`

Return the **mean** focal loss across all samples, rounded to 6 decimal places.

**Function signature:**
\`\`\`python
def solution(predictions: List[float], targets: List[int], gamma: float, alpha: float) -> float:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(predictions: List[float], targets: List[int], gamma: float, alpha: float) -> float:",
  constraints: [
    "1 <= len(predictions) == len(targets) <= 10000",
    "0 < predictions[i] < 1",
    "targets[i] is 0 or 1",
    "0 <= gamma <= 5",
    "0 < alpha < 1",
  ],
  examples: [
    {
      input: { predictions: [0.9, 0.1, 0.8], targets: [1, 0, 1], gamma: 2.0, alpha: 0.25 },
      output: 0.001095,
      explanation: "Well-classified samples have very low focal loss due to (1-pt)^gamma down-weighting.",
    },
  ],
  starter_code: `def solution(predictions: List[float], targets: List[int], gamma: float, alpha: float) -> float:
    import math
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "p_t는 target이 1이면 p, 0이면 (1-p)입니다. alpha_t도 마찬가지로 결정합니다.",
    "각 샘플의 focal loss를 -alpha_t * (1-p_t)^gamma * log(p_t)로 구한 후 평균을 냅니다.",
  ],
  solution_code: `def solution(predictions: List[float], targets: List[int], gamma: float, alpha: float) -> float:
    import math
    total = 0.0
    n = len(predictions)
    for p, t in zip(predictions, targets):
        pt = p if t == 1 else 1.0 - p
        at = alpha if t == 1 else 1.0 - alpha
        loss = -at * ((1.0 - pt) ** gamma) * math.log(max(pt, 1e-8))
        total += loss
    return round(total / n, 6)`,
  solution_explanation: "Focal Loss는 잘 분류된 쉬운 샘플의 가중치를 줄이고, 어려운 샘플에 집중하게 합니다. (1-p_t)^gamma가 핵심 가중치입니다.",
  sample_tests: [
    {
      input: { predictions: [0.9, 0.1, 0.8], targets: [1, 0, 1], gamma: 2.0, alpha: 0.25 },
      expected: 0.001095,
    },
    {
      input: { predictions: [0.5, 0.5], targets: [1, 0], gamma: 0.0, alpha: 0.5 },
      expected: 0.346574,
    },
  ],
  hidden_tests: [
    {
      input: { predictions: [0.99, 0.01], targets: [1, 0], gamma: 2.0, alpha: 0.25 },
      expected: 0.000013,
      failure_category: "precision",
    },
    {
      input: { predictions: [0.3, 0.7, 0.2], targets: [1, 0, 1], gamma: 1.0, alpha: 0.75 },
      expected: 0.374983,
      failure_category: "wrong_formula",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.001,
  similar_problem_ids: ["sigmoid_bce_loss", "batch_cross_entropy"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
