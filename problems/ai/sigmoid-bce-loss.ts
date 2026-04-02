import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "sigmoid_bce_loss",
  title: "Sigmoid and Binary Cross-Entropy Loss",
  category: "ai",
  difficulty: "easy",
  tags: ["math", "deep_learning"],
  statement_en: `Implement two functions combined into one:

1. **Sigmoid**: sigma(z) = 1 / (1 + exp(-z))
2. **Binary Cross-Entropy Loss**: BCE = -(1/n) * sum(y_i * log(p_i) + (1 - y_i) * log(1 - p_i))

Given a list of raw logits and corresponding binary labels (0 or 1):
1. Apply sigmoid to each logit to get probabilities
2. Compute the average binary cross-entropy loss

**Function signature:**
\`\`\`python
def solution(logits: List[float], labels: List[int]) -> float:
\`\`\`

Return the loss rounded to 6 decimal places. Use a small epsilon (1e-15) to avoid log(0).
`,
  function_name: "solution",
  signature: "def solution(logits: List[float], labels: List[int]) -> float:",
  constraints: ["1 <= len(logits) <= 10000", "labels[i] is 0 or 1", "-100 <= logits[i] <= 100"],
  examples: [
    { input: { logits: [0.0], labels: [1] }, output: 0.693147, explanation: "sigmoid(0)=0.5, BCE = -log(0.5) = 0.693147" },
    { input: { logits: [10.0], labels: [1] }, output: 0.000045, explanation: "sigmoid(10) is close to 1, so loss is very small" },
  ],
  starter_code: `def solution(logits: List[float], labels: List[int]) -> float:
    import math
    # 1. 각 logit에 sigmoid 적용: p = 1 / (1 + exp(-z))
    # 2. BCE 계산: -(1/n) * sum(y*log(p) + (1-y)*log(1-p))
    # log(0) 방지를 위해 epsilon = 1e-15 사용
    pass`,
  hints: [
    "sigmoid(z) = 1 / (1 + math.exp(-z))로 각 logit을 확률로 변환하세요.",
    "BCE = -(y * log(p + eps) + (1-y) * log(1-p + eps)). eps = 1e-15로 log(0)을 방지합니다.",
    "전체 샘플의 BCE 평균을 구해서 반환합니다.",
  ],
  solution_code: `def solution(logits: List[float], labels: List[int]) -> float:
    import math
    eps = 1e-15
    n = len(logits)
    total = 0.0
    for z, y in zip(logits, labels):
        p = 1.0 / (1.0 + math.exp(-z))
        p = max(eps, min(1 - eps, p))
        total += y * math.log(p + eps) + (1 - y) * math.log(1 - p + eps)
    return round(-total / n, 6)`,
  solution_explanation: "각 logit에 sigmoid를 적용하고, binary cross-entropy 공식으로 손실을 계산합니다. O(n) 시간.",
  sample_tests: [
    { input: { logits: [0.0], labels: [1] }, expected: 0.693147 },
    { input: { logits: [10.0], labels: [1] }, expected: 0.000045 },
    { input: { logits: [0.0, 0.0], labels: [0, 1] }, expected: 0.693147 },
  ],
  hidden_tests: [
    { input: { logits: [-10.0], labels: [0] }, expected: 0.000045, failure_category: "negative_logit" },
    { input: { logits: [100.0], labels: [0] }, expected: 100.0, failure_category: "extreme_value" },
  ],
  checker_type: "float_tolerance",
  similar_problem_ids: ["softmax_from_scratch", "batch_cross_entropy"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
