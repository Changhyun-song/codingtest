import { Problem } from "@/lib/types";
const problem: Problem = {
  id: "training_step_order",
  title: "Training Step Order Validator",
  category: "ai",
  difficulty: "medium",
  tags: ["nlp"],
  statement_en: `Verify the **correct order of operations** in a PyTorch training step.\n\nCorrect order:\n1. zero_grad\n2. forward\n3. loss\n4. backward\n5. clip_grad (optional)\n6. step\n\nGiven a list of operations, return:\n- "correct" if in valid order\n- Name of the first out-of-order operation\n- "missing_NAME" if a required op is absent\n\nRequired ops: zero_grad, forward, loss, backward, step.\n\n**Function signature:**\n\`\`\`python\ndef solution(operations: List[str]) -> str:\n\`\`\``,
  function_name: "solution",
  signature: "def solution(operations: List[str]) -> str:",
  constraints: ["operations contains valid op names"],
  examples: [{ input: { operations: ["zero_grad","forward","loss","backward","step"] }, output: "correct", explanation: "Standard training loop order" }],
  starter_code: "def solution(operations: List[str]) -> str:\n    pass",
  hints: ["올바른 순서 리스트와 비교합니다. 현재 위치보다 앞의 연산이 나오면 순서 오류.", "실전에서 zero_grad 누락, backward 전 step 호출이 흔한 버그입니다."],
  solution_code: `def solution(operations: List[str]) -> str:
    order = ["zero_grad", "forward", "loss", "backward", "clip_grad", "step"]
    required = {"zero_grad", "forward", "loss", "backward", "step"}
    known = [op for op in operations if op in order]
    last = -1
    for op in known:
        idx = order.index(op)
        if idx < last:
            return op
        last = idx
    present = set(known)
    missing = required - present
    if missing:
        return f"missing_{sorted(missing)[0]}"
    return "correct"`,
  solution_explanation: "학습 루프의 올바른 순서는 PyTorch 기본이지만, 순서 오류는 찾기 어려운 버그를 만듭니다. 특히 zero_grad 위치와 clip_grad 타이밍이 중요합니다.",
  sample_tests: [
    { input: { operations: ["zero_grad","forward","loss","backward","step"] }, expected: "correct" },
    { input: { operations: ["forward","loss","backward","step","zero_grad"] }, expected: "zero_grad" },
  ],
  hidden_tests: [
    { input: { operations: ["zero_grad","forward","loss","step","backward"] }, expected: "backward", failure_category: "standard" },
    { input: { operations: ["forward","loss","backward"] }, expected: "missing_step", failure_category: "edge_case" },
  ],
  checker_type: "exact",
  similar_problem_ids: ["pytorch_training_loop", "gradient_accumulation"],
  fallback_problem_ids: ["pytorch_training_loop"],
};
export default problem;
