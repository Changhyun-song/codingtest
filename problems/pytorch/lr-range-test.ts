import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "lr_range_test",
  title: "Learning Rate Range Test",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Simulate a **learning rate range test** (LR Finder).\n\nGiven a list of losses recorded at exponentially increasing learning rates, find the LR with the steepest loss decrease (most negative finite difference gradient).\n\n**Function signature:**\n\`\`\`python\ndef solution(losses: List[float], lrs: List[float]) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(losses: List[float], lrs: List[float]) -> float:",
  constraints: ["len(losses) == len(lrs) >= 2", "lrs are sorted ascending"],
  examples: [{ input: { losses: [2.5,2.0,1.0,0.5,0.8,1.5], lrs: [0.0001,0.001,0.01,0.1,1.0,10.0] }, output: 0.001, explanation: "Steepest decrease between 0.0001 and 0.001" }],
  starter_code: "def solution(losses: List[float], lrs: List[float]) -> float:\n    pass",
  hints: ["인접한 (loss, lr) 쌍의 기울기를 계산합니다: (loss[i]-loss[i-1])/(lr[i]-lr[i-1]).", "가장 작은(가장 음수인) 기울기에 해당하는 lr을 반환합니다."],
  solution_code: `def solution(losses: List[float], lrs: List[float]) -> float:
    min_grad = float('inf')
    best_lr = lrs[0]
    for i in range(1, len(losses)):
        grad = (losses[i] - losses[i - 1]) / (lrs[i] - lrs[i - 1])
        if grad < min_grad:
            min_grad = grad
            best_lr = lrs[i]
    return best_lr`,
  solution_explanation: "LR range test는 적절한 학습률을 찾는 실용적인 방법입니다. Loss가 가장 급격히 감소하는 지점의 LR을 선택합니다.",
  sample_tests: [
    { input: { losses: [2.5,2.0,1.0,0.5,0.8,1.5], lrs: [0.0001,0.001,0.01,0.1,1.0,10.0] }, expected: 0.001 },
    { input: { losses: [3.0,1.0], lrs: [0.001,0.01] }, expected: 0.01 },
  ],
  hidden_tests: [
    { input: { losses: [1.0,1.0,1.0], lrs: [0.001,0.01,0.1] }, expected: 0.01, failure_category: "edge_case" },
    { input: { losses: [5.0,4.5,3.0,2.0,2.5,4.0], lrs: [0.0001,0.0005,0.001,0.005,0.01,0.05] }, expected: 0.005, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.0001,
  similar_problem_ids: ["lr_warmup_scheduler", "weight_decay_step"],
  fallback_problem_ids: ["pytorch_training_loop"],
};
export default problem;
