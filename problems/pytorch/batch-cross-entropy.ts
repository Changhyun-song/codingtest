import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "batch_cross_entropy",
  title: "Batch Cross-Entropy Loss",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss", "cross_entropy", "softmax"],
  statement_en: `Implement the **cross-entropy loss** for a batch of predictions, which is the standard loss function for classification tasks in deep learning.

Given:
- \`logits\`: a 2D list of shape (batch_size, num_classes) — raw model outputs (before softmax)
- \`targets\`: a 1D list of shape (batch_size) — integer class labels

Compute the mean cross-entropy loss over the batch:

For each sample i:
1. Apply softmax to logits[i]: p_j = exp(logits[i][j]) / sum(exp(logits[i][k]) for all k)
2. Loss_i = -log(p[targets[i]])

**Return the mean loss:** sum(Loss_i) / batch_size

**Function signature:**
\`\`\`python
def solution(logits: List[List[float]], targets: List[int]) -> float:
\`\`\`

**Note:** Use log-sum-exp trick for numerical stability. \`import math\` is available.
`,
  function_name: "solution",
  signature:
    "def solution(logits: List[List[float]], targets: List[int]) -> float:",
  constraints: [
    "1 <= batch_size <= 1000",
    "2 <= num_classes <= 100",
    "0 <= targets[i] < num_classes",
  ],
  examples: [
    {
      input: {
        logits: [[2.0, 1.0, 0.1], [0.5, 2.0, 0.3]],
        targets: [0, 1],
      },
      output: 0.3665,
      explanation:
        "Softmax of [2,1,0.1]=[0.659,0.242,0.099], loss=-log(0.659)=0.417. Softmax of [0.5,2,0.3]=[0.183,0.820,0.150], loss=-log(0.820)=0.198. Mean=(0.417+0.198)/2=0.308... (approximate)",
    },
  ],
  starter_code: `def solution(logits: List[List[float]], targets: List[int]) -> float:
    import math
    # 여기에 코드를 작성하세요
    # 힌트: 수치 안정성을 위해 exp 전에 logits[i]에서 max(row)를 빼세요
    pass`,
  hints: [
    "수치 안정성: exp 계산 전에 각 행의 로짓에서 max(row)를 빼세요.",
    "log_softmax(x_i) = x_i - max(x) - log(sum(exp(x_j - max(x))))",
    "Loss = -log_softmax(logits[i])[targets[i]], 배치에 대해 평균을 냅니다.",
  ],
  solution_code: `def solution(logits: List[List[float]], targets: List[int]) -> float:
    import math
    total_loss = 0.0
    for i, row in enumerate(logits):
        m = max(row)
        log_sum_exp = m + math.log(sum(math.exp(x - m) for x in row))
        total_loss += log_sum_exp - row[targets[i]]
    return total_loss / len(logits)`,
  solution_explanation: "수치 안정성을 위해 log-sum-exp trick: loss = log_sum_exp - logit[target]. 배치 평균.",
  sample_tests: [
    {
      input: {
        logits: [[2.0, 1.0, 0.1]],
        targets: [0],
      },
      expected: 0.4170,
    },
    {
      input: {
        logits: [[1.0, 1.0]],
        targets: [0],
      },
      expected: 0.6931,
    },
  ],
  hidden_tests: [
    {
      input: {
        logits: [[0.0, 0.0, 0.0]],
        targets: [1],
      },
      expected: 1.0986,
      failure_category: "edge_case",
    },
    {
      input: {
        logits: [[100.0, 0.0], [0.0, 100.0]],
        targets: [0, 1],
      },
      expected: 0.0,
      failure_category: "precision",
    },
    {
      input: {
        logits: [[-100.0, 100.0]],
        targets: [0],
      },
      expected: 200.0,
      failure_category: "negative_handling",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: ["attention_scores", "tensor_manipulation"],
  fallback_problem_ids: ["classification_metrics"],
};

export default problem;
