import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "pytorch_training_loop",
  title: "PyTorch Training Loop Components",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "deep_learning"],
  statement_en: `Simulate the core logic of a **PyTorch training loop** without actually using PyTorch.

Given:
- \`weights\`: list of current model weights
- \`gradients\`: list of gradients (same length as weights)
- \`lr\`: learning rate
- \`momentum\`: momentum coefficient (0 to 1)
- \`prev_velocities\`: list of previous velocity values (same length as weights)

Implement SGD with momentum:
1. velocity_new = momentum * prev_velocity + gradient
2. weight_new = weight - lr * velocity_new

Return a tuple of two lists: [new_weights, new_velocities], each rounded to 6 decimal places.

**Function signature:**
\`\`\`python
def solution(weights: List[float], gradients: List[float], lr: float, momentum: float, prev_velocities: List[float]) -> List[List[float]]:
\`\`\`

This is how PyTorch's SGD optimizer with momentum works internally!
`,
  function_name: "solution",
  signature: "def solution(weights: List[float], gradients: List[float], lr: float, momentum: float, prev_velocities: List[float]) -> List[List[float]]:",
  constraints: ["1 <= len(weights) <= 10000", "0 <= momentum < 1"],
  examples: [
    { input: { weights: [1.0, 2.0], gradients: [0.5, -0.3], lr: 0.1, momentum: 0.9, prev_velocities: [0.0, 0.0] }, output: [[0.95, 2.03], [0.5, -0.3]], explanation: "v = 0.9*0 + grad, w = w - 0.1*v" },
  ],
  starter_code: `def solution(weights: List[float], gradients: List[float], lr: float, momentum: float, prev_velocities: List[float]) -> List[List[float]]:
    # SGD with momentum:
    # v_new = momentum * v_old + gradient
    # w_new = w - lr * v_new
    pass`,
  hints: [
    "각 파라미터에 대해: v_new = momentum * prev_v + grad를 먼저 계산하세요.",
    "그 다음 w_new = w - lr * v_new로 가중치를 업데이트합니다.",
    "new_weights와 new_velocities 두 개의 리스트를 반환합니다.",
  ],
  solution_code: `def solution(weights: List[float], gradients: List[float], lr: float, momentum: float, prev_velocities: List[float]) -> List[List[float]]:
    new_w = []
    new_v = []
    for w, g, v in zip(weights, gradients, prev_velocities):
        v_new = momentum * v + g
        w_new = w - lr * v_new
        new_w.append(round(w_new, 6))
        new_v.append(round(v_new, 6))
    return [new_w, new_v]`,
  solution_explanation: "SGD with momentum을 직접 구현합니다. PyTorch의 optim.SGD 내부 동작 원리입니다. O(n) 시간.",
  sample_tests: [
    { input: { weights: [1.0, 2.0], gradients: [0.5, -0.3], lr: 0.1, momentum: 0.9, prev_velocities: [0.0, 0.0] }, expected: [[0.95, 2.03], [0.5, -0.3]] },
    { input: { weights: [0.0], gradients: [1.0], lr: 0.01, momentum: 0.0, prev_velocities: [0.0] }, expected: [[-0.01], [1.0]] },
  ],
  hidden_tests: [
    { input: { weights: [1.0], gradients: [0.0], lr: 0.1, momentum: 0.9, prev_velocities: [1.0] }, expected: [[0.91], [0.9]], failure_category: "momentum_only" },
    { input: { weights: [5.0, -3.0], gradients: [2.0, -1.0], lr: 0.5, momentum: 0.0, prev_velocities: [0.0, 0.0] }, expected: [[4.0, -2.5], [2.0, -1.0]], failure_category: "no_momentum" },
  ],
  checker_type: "float_tolerance",
  similar_problem_ids: ["gradient_descent_step"],
  fallback_problem_ids: ["gradient_descent_step"],
};

export default problem;
