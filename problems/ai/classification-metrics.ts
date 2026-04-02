import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "classification_metrics",
  title: "Classification Metrics",
  category: "ai",
  difficulty: "medium",
  tags: ["metrics", "classification"],
  statement_en: `Given lists of true labels and predicted labels (both binary: 0 or 1), compute the precision, recall, and F1 score.

**Definitions:**
- **Precision** = TP / (TP + FP)  (if TP + FP = 0, precision = 0.0)
- **Recall** = TP / (TP + FN)  (if TP + FN = 0, recall = 0.0)
- **F1** = 2 * precision * recall / (precision + recall)  (if precision + recall = 0, F1 = 0.0)

Where:
- TP = True Positives (predicted 1, actual 1)
- FP = False Positives (predicted 1, actual 0)
- FN = False Negatives (predicted 0, actual 1)

**Function signature:**
\`\`\`python
def solution(y_true: List[int], y_pred: List[int]) -> List[float]:
\`\`\`

**Returns:** A list of three floats: [precision, recall, f1]
`,
  function_name: "solution",
  signature: "def solution(y_true: List[int], y_pred: List[int]) -> List[float]:",
  constraints: [
    "1 <= len(y_true) == len(y_pred) <= 10^5",
    "y_true[i] and y_pred[i] are 0 or 1",
  ],
  examples: [
    {
      input: {
        y_true: [1, 1, 0, 1, 0, 0, 1, 0],
        y_pred: [1, 0, 0, 1, 0, 1, 1, 0],
      },
      output: [0.75, 0.75, 0.75],
      explanation: "TP=3, FP=1, FN=1 -> P=3/4, R=3/4, F1=0.75",
    },
  ],
  starter_code: `def solution(y_true: List[int], y_pred: List[int]) -> List[float]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "(true, pred) 쌍을 순회하며 TP, FP, FN을 세세요.",
    "분모가 0인 경우를 명시적으로 처리하세요.",
  ],
  solution_code: `def solution(y_true: List[int], y_pred: List[int]) -> List[float]:
    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0
    return [precision, recall, f1]`,
  solution_explanation: "TP/FP/FN을 세고 precision=TP/(TP+FP), recall=TP/(TP+FN), F1은 조화 평균으로 계산합니다.",
  sample_tests: [
    {
      input: {
        y_true: [1, 1, 0, 1, 0, 0, 1, 0],
        y_pred: [1, 0, 0, 1, 0, 1, 1, 0],
      },
      expected: [0.75, 0.75, 0.75],
    },
    {
      input: {
        y_true: [1, 1, 1],
        y_pred: [1, 1, 1],
      },
      expected: [1.0, 1.0, 1.0],
    },
  ],
  hidden_tests: [
    {
      input: {
        y_true: [0, 0, 0],
        y_pred: [1, 1, 1],
      },
      expected: [0.0, 0.0, 0.0],
      failure_category: "zero_division",
    },
    {
      input: {
        y_true: [1, 0, 1, 0],
        y_pred: [0, 0, 0, 0],
      },
      expected: [0.0, 0.0, 0.0],
      failure_category: "metric_formula",
    },
    {
      input: {
        y_true: [1],
        y_pred: [1],
      },
      expected: [1.0, 1.0, 1.0],
      failure_category: "single_element",
    },
  ],
  checker_type: "vector",
  tolerance: 1e-6,
  similar_problem_ids: ["confusion_matrix_binary"],
  fallback_problem_ids: ["confusion_matrix_binary"],
};

export default problem;
