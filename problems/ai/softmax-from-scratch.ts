import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "softmax_from_scratch",
  title: "Softmax from Scratch",
  category: "ai",
  difficulty: "easy",
  tags: ["math", "deep_learning"],
  statement_en: `Implement the **softmax** function from scratch using only basic Python (no NumPy/PyTorch).

Given a list of real numbers (logits), return a list of probabilities where:
- Each value is between 0 and 1
- All values sum to 1
- softmax(x_i) = exp(x_i) / sum(exp(x_j) for all j)

**Important:** For numerical stability, subtract the maximum value from all inputs before computing exp.

**Function signature:**
\`\`\`python
def solution(logits: List[float]) -> List[float]:
\`\`\`

Return the result rounded to 6 decimal places.
`,
  function_name: "solution",
  signature: "def solution(logits: List[float]) -> List[float]:",
  constraints: ["1 <= len(logits) <= 1000", "-1000 <= logits[i] <= 1000"],
  examples: [
    { input: { logits: [1.0, 2.0, 3.0] }, output: [0.09003, 0.244728, 0.665241], explanation: "exp(1)/sum = 0.09003, exp(2)/sum = 0.24473, exp(3)/sum = 0.66524" },
    { input: { logits: [0.0, 0.0] }, output: [0.5, 0.5], explanation: "Equal logits produce equal probabilities" },
  ],
  starter_code: `def solution(logits: List[float]) -> List[float]:
    import math
    # 수치 안정성을 위해 최대값을 빼세요
    # softmax(x_i) = exp(x_i - max) / sum(exp(x_j - max))
    pass`,
  hints: [
    "먼저 입력에서 최대값을 구하고, 모든 값에서 최대값을 빼세요. 이것이 수치 안정성의 핵심입니다.",
    "math.exp(x_i - max_val)로 각 값의 지수를 구하고, 전체 합으로 나누세요.",
    "결과를 round(val, 6)으로 반올림하세요.",
  ],
  solution_code: `def solution(logits: List[float]) -> List[float]:
    import math
    max_val = max(logits)
    exps = [math.exp(x - max_val) for x in logits]
    total = sum(exps)
    return [round(e / total, 6) for e in exps]`,
  solution_explanation: "수치 안정성을 위해 최대값을 빼고 exp를 계산한 뒤 합으로 나눕니다. O(n) 시간.",
  sample_tests: [
    { input: { logits: [1.0, 2.0, 3.0] }, expected: [0.09003, 0.244728, 0.665241] },
    { input: { logits: [0.0, 0.0] }, expected: [0.5, 0.5] },
  ],
  hidden_tests: [
    { input: { logits: [1000.0, 1000.0, 1000.0] }, expected: [0.333333, 0.333333, 0.333333], failure_category: "numerical_stability" },
    { input: { logits: [-1.0, 0.0, 1.0] }, expected: [0.09003, 0.244728, 0.665241], failure_category: "negative_values" },
    { input: { logits: [5.0] }, expected: [1.0], failure_category: "single_element" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["batch_cross_entropy"],
  fallback_problem_ids: ["cosine_similarity"],
};

export default problem;
