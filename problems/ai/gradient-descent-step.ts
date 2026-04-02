import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "gradient_descent_step",
  title: "Gradient Descent for Linear Regression",
  category: "ai",
  difficulty: "medium",
  tags: ["math", "deep_learning"],
  statement_en: `Implement **one step of gradient descent** for simple linear regression.

Given:
- \`X\`: list of input values (features)
- \`y\`: list of target values
- \`w\`: current weight
- \`b\`: current bias
- \`lr\`: learning rate

The model predicts: y_pred = w * x + b

Compute the gradients using MSE loss:
- Loss = (1/n) * sum((y_pred_i - y_i)^2)
- dw = (2/n) * sum((y_pred_i - y_i) * x_i)
- db = (2/n) * sum(y_pred_i - y_i)

Update parameters:
- w_new = w - lr * dw
- b_new = b - lr * db

Return [w_new, b_new] rounded to 6 decimal places.

**Function signature:**
\`\`\`python
def solution(X: List[float], y: List[float], w: float, b: float, lr: float) -> List[float]:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(X: List[float], y: List[float], w: float, b: float, lr: float) -> List[float]:",
  constraints: ["1 <= len(X) <= 10000", "len(X) == len(y)"],
  examples: [
    { input: { X: [1.0, 2.0, 3.0], y: [2.0, 4.0, 6.0], w: 0.0, b: 0.0, lr: 0.01 }, output: [0.186667, 0.08], explanation: "Gradients push w toward 2 and b toward 0" },
  ],
  starter_code: `def solution(X: List[float], y: List[float], w: float, b: float, lr: float) -> List[float]:
    # 1. y_pred = w * x + b 로 예측
    # 2. 오차(y_pred - y)로 gradient 계산
    # 3. w, b를 lr * gradient만큼 업데이트
    pass`,
  hints: [
    "먼저 각 x에 대해 y_pred = w * x + b를 계산하고 error = y_pred - y를 구하세요.",
    "dw = (2/n) * sum(error_i * x_i), db = (2/n) * sum(error_i)로 gradient를 계산합니다.",
    "w_new = w - lr * dw, b_new = b - lr * db로 파라미터를 업데이트합니다.",
  ],
  solution_code: `def solution(X: List[float], y: List[float], w: float, b: float, lr: float) -> List[float]:
    n = len(X)
    dw = 0.0
    db = 0.0
    for xi, yi in zip(X, y):
        pred = w * xi + b
        err = pred - yi
        dw += err * xi
        db += err
    dw = (2 / n) * dw
    db = (2 / n) * db
    w_new = w - lr * dw
    b_new = b - lr * db
    return [round(w_new, 6), round(b_new, 6)]`,
  solution_explanation: "MSE loss의 gradient를 수동 계산하고 파라미터를 업데이트합니다. 딥러닝 학습의 핵심 원리. O(n) 시간.",
  sample_tests: [
    { input: { X: [1.0, 2.0, 3.0], y: [2.0, 4.0, 6.0], w: 0.0, b: 0.0, lr: 0.01 }, expected: [0.186667, 0.08] },
    { input: { X: [1.0], y: [1.0], w: 1.0, b: 0.0, lr: 0.1 }, expected: [1.0, 0.0] },
  ],
  hidden_tests: [
    { input: { X: [0.0, 0.0], y: [5.0, 5.0], w: 0.0, b: 0.0, lr: 0.1 }, expected: [0.0, 1.0], failure_category: "zero_features" },
    { input: { X: [1.0, 2.0, 3.0, 4.0], y: [3.0, 5.0, 7.0, 9.0], w: 1.0, b: 1.0, lr: 0.01 }, expected: [1.0, 1.0], failure_category: "already_optimal" },
  ],
  checker_type: "float_tolerance",
  similar_problem_ids: ["sigmoid_bce_loss", "softmax_from_scratch"],
  fallback_problem_ids: ["softmax_from_scratch"],
};

export default problem;
