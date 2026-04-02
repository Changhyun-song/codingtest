import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "lr_warmup_scheduler",
  title: "Learning Rate Warmup Scheduler",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "optimization"],
  statement_en: `Implement a **learning rate scheduler** with linear warmup and cosine decay.

Given:
- \`base_lr\`: the target learning rate after warmup
- \`warmup_steps\`: number of warmup steps
- \`total_steps\`: total training steps
- \`current_step\`: the step to compute LR for

The schedule:
1. **Warmup phase** (step < warmup_steps): LR increases linearly from 0 to base_lr
   - lr = base_lr * (current_step / warmup_steps)
2. **Cosine decay phase** (step >= warmup_steps): LR decreases following cosine curve
   - progress = (current_step - warmup_steps) / (total_steps - warmup_steps)
   - lr = base_lr * 0.5 * (1 + cos(pi * progress))

**Function signature:**
\`\`\`python
def solution(base_lr: float, warmup_steps: int, total_steps: int, current_step: int) -> float:
\`\`\`

Return rounded to 8 decimal places.
`,
  function_name: "solution",
  signature: "def solution(base_lr: float, warmup_steps: int, total_steps: int, current_step: int) -> float:",
  constraints: ["warmup_steps < total_steps", "0 <= current_step <= total_steps", "base_lr > 0"],
  examples: [
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 50 }, output: 0.0005, explanation: "Warmup: 0.001 * 50/100 = 0.0005" },
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 100 }, output: 0.001, explanation: "End of warmup = base_lr" },
  ],
  starter_code: `def solution(base_lr: float, warmup_steps: int, total_steps: int, current_step: int) -> float:
    import math
    # warmup 단계: lr = base_lr * (step / warmup_steps)
    # cosine decay 단계: lr = base_lr * 0.5 * (1 + cos(pi * progress))
    pass`,
  hints: [
    "current_step < warmup_steps이면 linear warmup: base_lr * (current_step / warmup_steps)",
    "그 외에는 cosine decay: progress = (step - warmup) / (total - warmup), lr = base_lr * 0.5 * (1 + cos(pi * progress))",
    "math.cos(math.pi * progress)를 사용하세요. progress가 0이면 lr=base_lr, progress가 1이면 lr=0.",
  ],
  solution_code: `def solution(base_lr: float, warmup_steps: int, total_steps: int, current_step: int) -> float:
    import math
    if current_step < warmup_steps:
        lr = base_lr * (current_step / warmup_steps)
    else:
        progress = (current_step - warmup_steps) / (total_steps - warmup_steps)
        lr = base_lr * 0.5 * (1 + math.cos(math.pi * progress))
    return round(lr, 8)`,
  solution_explanation: "Linear warmup + cosine decay 스케줄러를 구현합니다. 대규모 모델 학습에서 표준적으로 사용되는 LR 스케줄링 방식입니다.",
  sample_tests: [
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 50 }, expected: 0.0005 },
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 100 }, expected: 0.001 },
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 1000 }, expected: 0.0 },
  ],
  hidden_tests: [
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 0 }, expected: 0.0, failure_category: "step_zero" },
    { input: { base_lr: 0.001, warmup_steps: 100, total_steps: 1000, current_step: 550 }, expected: 0.0005, failure_category: "mid_cosine" },
  ],
  checker_type: "float_tolerance",
  similar_problem_ids: ["pytorch_training_loop", "gradient_descent_step"],
  fallback_problem_ids: ["gradient_descent_step"],
};

export default problem;
