import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "training_early_stopping",
  title: "Training Loop with Early Stopping",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "training", "optimization"],
  statement_en: `Simulate **early stopping** on validation loss. You are given \`val_losses[i]\` for each epoch \`i\` (0-indexed) and a **patience** \`p\`.

Maintain the **best** validation loss seen so far. After each epoch, if the current loss **strictly improves** (\`loss < best\`), reset the “no improvement” counter to 0; otherwise increment it. If the counter reaches \`p\`, **stop** and return the **current epoch index** (the epoch where stopping triggers).

If the list ends without the counter ever reaching \`p\`, return **-1**.

**Function signature:**
\`\`\`python
def solution(val_losses: List[float], patience: int) -> int:
\`\`\`
`,
  function_name: "solution",
  signature: "def solution(val_losses: List[float], patience: int) -> int:",
  constraints: ["1 <= len(val_losses) <= 10^5", "1 <= patience <= len(val_losses)"],
  examples: [
    {
      input: { val_losses: [2.0, 1.5, 1.4], patience: 2 },
      output: -1,
      explanation: "Each step improves; counter never hits 2.",
    },
  ],
  starter_code: `def solution(val_losses: List[float], patience: int) -> int:
    pass`,
  hints: [
    "‘개선’은 현재 손실이 지금까지 본 최솟값보다 엄격히 작을 때입니다.",
    "개선이 없을 때마다 카운터를 올리고, patience에 도달한 시점의 에폭 인덱스를 반환합니다.",
    "끝까지 중단 조건이 없으면 -1입니다.",
  ],
  solution_code: `def solution(val_losses: List[float], patience: int) -> int:
    best_loss = float('inf')
    counter = 0
    for epoch, loss in enumerate(val_losses):
        if loss < best_loss:
            best_loss = loss
            counter = 0
        else:
            counter += 1
        if counter >= patience:
            return epoch
    return -1`,
  solution_explanation:
    "검증 손실이 개선될 때만 최적값을 갱신하고, 연속 비개선 횟수가 patience에 도달하면 그 에폭에서 학습을 멈추는 전형적인 조기 종료 규칙입니다.",
  sample_tests: [
    { input: { val_losses: [1.0, 0.9, 0.8, 0.85, 0.86, 0.87, 0.7], patience: 3 }, expected: 5 },
    { input: { val_losses: [1.0, 0.9, 0.8, 0.7], patience: 3 }, expected: -1 },
  ],
  hidden_tests: [
    { input: { val_losses: [0.5, 0.6, 0.7], patience: 2 }, expected: 2, failure_category: "immediate_stop" },
    { input: { val_losses: [1.0, 1.0, 1.0, 1.0], patience: 1 }, expected: 1, failure_category: "flat_loss" },
    { input: { val_losses: [0.5], patience: 5 }, expected: -1, failure_category: "single_epoch" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["pytorch_training_loop", "lr_warmup_scheduler"],
  fallback_problem_ids: ["pytorch_training_loop"],
};

export default problem;
