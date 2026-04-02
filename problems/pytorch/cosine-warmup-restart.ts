import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "cosine_warmup_restart",
  title: "Cosine Annealing with Warm Restarts",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization"],
  statement_en: `Implement **cosine annealing with warm restarts** LR schedule.\n\n- During warmup (step < warmup_steps): lr = base_lr × (step / warmup_steps)\n- After warmup: cycle_step = (step - warmup_steps) % cycle_length\n  progress = cycle_step / cycle_length\n  lr = base_lr × 0.5 × (1 + cos(π × progress))\n\nReturn the learning rate at the given step, rounded to 8 decimals.\n\n**Function signature:**\n\`\`\`python\ndef solution(step: int, base_lr: float, warmup_steps: int, cycle_length: int) -> float:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(step: int, base_lr: float, warmup_steps: int, cycle_length: int) -> float:",
  constraints: ["step >= 0", "warmup_steps >= 0", "cycle_length >= 1"],
  examples: [{ input: { step: 5, base_lr: 0.001, warmup_steps: 10, cycle_length: 20 }, output: 0.0005, explanation: "warmup: 0.001 × 5/10 = 0.0005" }],
  starter_code: "def solution(step: int, base_lr: float, warmup_steps: int, cycle_length: int) -> float:\n    import math\n    pass",
  hints: ["warmup 단계와 cosine 단계를 분리합니다.", "warm restart는 cycle 시작마다 LR이 base_lr로 복귀합니다. 주기적 재시작이 local minima 탈출에 도움됩니다."],
  solution_code: `def solution(step: int, base_lr: float, warmup_steps: int, cycle_length: int) -> float:
    import math
    if step < warmup_steps:
        return round(base_lr * step / warmup_steps, 8) if warmup_steps > 0 else round(base_lr, 8)
    cs = (step - warmup_steps) % cycle_length
    progress = cs / cycle_length
    return round(base_lr * 0.5 * (1 + math.cos(math.pi * progress)), 8)`,
  solution_explanation: "Cosine warm restart(SGDR)은 Transformer 학습에서 표준적으로 사용됩니다. 주기적 LR 재시작이 loss landscape 탐색에 효과적입니다.",
  sample_tests: [
    { input: { step: 5, base_lr: 0.001, warmup_steps: 10, cycle_length: 20 }, expected: 0.0005 },
    { input: { step: 10, base_lr: 0.001, warmup_steps: 10, cycle_length: 20 }, expected: 0.001 },
  ],
  hidden_tests: [
    { input: { step: 30, base_lr: 0.001, warmup_steps: 10, cycle_length: 20 }, expected: 0.001, failure_category: "edge_case" },
    { input: { step: 20, base_lr: 0.01, warmup_steps: 10, cycle_length: 20 }, expected: 0.005, failure_category: "standard" },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.0001,
  similar_problem_ids: ["lr_warmup_scheduler", "lr_range_test"],
  fallback_problem_ids: ["lr_warmup_scheduler"],
};
export default problem;
