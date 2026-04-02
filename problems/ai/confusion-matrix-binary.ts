import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "confusion_matrix_binary",
  title: "Confusion Matrix (Binary)",
  category: "ai",
  difficulty: "easy",
  tags: ["metrics", "classification"],
  statement_en: `Given lists of true labels and predicted labels (both binary: 0 or 1), compute the confusion matrix.

Return a 2x2 matrix as a list of lists:
\`\`\`
[[TN, FP],
 [FN, TP]]
\`\`\`

Where:
- TN = True Negatives (predicted 0, actual 0)
- FP = False Positives (predicted 1, actual 0)
- FN = False Negatives (predicted 0, actual 1)
- TP = True Positives (predicted 1, actual 1)

**Function signature:**
\`\`\`python
def solution(y_true: List[int], y_pred: List[int]) -> List[List[int]]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(y_true: List[int], y_pred: List[int]) -> List[List[int]]:",
  constraints: [
    "1 <= len(y_true) == len(y_pred) <= 10^5",
    "Values are 0 or 1",
  ],
  examples: [
    {
      input: {
        y_true: [1, 0, 1, 1, 0, 1],
        y_pred: [1, 0, 0, 1, 1, 1],
      },
      output: [[1, 1], [1, 3]],
      explanation: "TN=1, FP=1, FN=1, TP=3",
    },
  ],
  starter_code: `def solution(y_true: List[int], y_pred: List[int]) -> List[List[int]]:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "(true, pred) 쌍을 순회하며 네 가지 경우를 모두 세세요.",
    "행렬 레이아웃이 [[TN,FP],[FN,TP]]와 일치하는지 확인하세요.",
  ],
  solution_code: `def solution(y_true: List[int], y_pred: List[int]) -> List[List[int]]:
    tn = fp = fn = tp = 0
    for t, p in zip(y_true, y_pred):
        if t == 0 and p == 0: tn += 1
        elif t == 0 and p == 1: fp += 1
        elif t == 1 and p == 0: fn += 1
        else: tp += 1
    return [[tn, fp], [fn, tp]]`,
  solution_explanation: "TN, FP, FN, TP 네 가지를 세고 [[TN,FP],[FN,TP]] 형태로 반환합니다.",
  sample_tests: [
    {
      input: {
        y_true: [1, 0, 1, 1, 0, 1],
        y_pred: [1, 0, 0, 1, 1, 1],
      },
      expected: [[1, 1], [1, 3]],
    },
  ],
  hidden_tests: [
    {
      input: {
        y_true: [0, 0, 0, 0],
        y_pred: [0, 0, 0, 0],
      },
      expected: [[4, 0], [0, 0]],
      failure_category: "edge_case",
    },
    {
      input: {
        y_true: [1, 1, 1],
        y_pred: [0, 0, 0],
      },
      expected: [[0, 0], [3, 0]],
      failure_category: "metric_formula",
    },
  ],
  checker_type: "exact",
  similar_problem_ids: ["classification_metrics"],
  fallback_problem_ids: [],
};

export default problem;
