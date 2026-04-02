import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "gradient_accumulation",
  title: "Gradient Accumulation Simulation",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "training", "optimization"],
  statement_en: `Simulate **gradient accumulation** for one weight vector. You are given initial \`weights\`, a list of per-microbatch gradients \`micro_gradients\` (same length as \`weights\` each), \`accumulation_steps\`, and learning rate \`lr\`.

Start with accumulated gradient zero. For each microbatch gradient in order, add it to the accumulator. When the number of accumulated microbatches reaches \`accumulation_steps\`, apply **one** update: average the accumulated gradient over \`accumulation_steps\`, then \`w = w - lr * avg_grad\`, then reset the accumulator to zero.

If there are leftover microbatches at the end that do not complete a full \`accumulation_steps\` block, **do not** apply an extra update (partial accumulation is discarded).

**Round each final weight to 6 decimal places.**

**Function signature:**
\`\`\`python
def solution(weights: List[float], micro_gradients: List[List[float]], accumulation_steps: int, lr: float) -> List[float]:
\`\`\`
`,
  function_name: "solution",
  signature:
    "def solution(weights: List[float], micro_gradients: List[List[float]], accumulation_steps: int, lr: float) -> List[float]:",
  constraints: [
    "len(weights) >= 1",
    "len(micro_gradients) >= 1",
    "Each gradient vector matches len(weights)",
    "accumulation_steps >= 1",
  ],
  examples: [
    {
      input: {
        weights: [0.0, 0.0],
        micro_gradients: [
          [1.0, 1.0],
          [1.0, 1.0],
        ],
        accumulation_steps: 2,
        lr: 0.5,
      },
      output: [-0.5, -0.5],
      explanation: "Average gradient [1,1]; update once → [-0.5,-0.5].",
    },
  ],
  starter_code: `def solution(weights: List[float], micro_gradients: List[List[float]], accumulation_steps: int, lr: float) -> List[float]:
    pass`,
  hints: [
    "accumulation_steps개의 미니배치마다 그동안 쌓인 그래디언트의 평균으로 한 번 가중치를 갱신합니다.",
    "갱신 후 누적 버퍼과 미니배치 카운터를 초기화하세요.",
    "마지막에 남은 미니배치가 accumulation_steps보다 적으면 업데이트하지 않습니다.",
  ],
  solution_code: `def solution(weights: List[float], micro_gradients: List[List[float]], accumulation_steps: int, lr: float) -> List[float]:
    w = weights[:]
    dim = len(w)
    accum = [0.0] * dim
    count = 0
    for grads in micro_gradients:
        for i in range(dim):
            accum[i] += grads[i]
        count += 1
        if count == accumulation_steps:
            for i in range(dim):
                w[i] -= lr * (accum[i] / accumulation_steps)
                accum[i] = 0.0
            count = 0
    return [round(x, 6) for x in w]`,
  solution_explanation:
    "메모리 절약을 위해 작은 미니배치로 그래디언트를 나눠 쌓고, 일정 스텝마다 평균 내어 한 번에 옵티마이저 스텝을 흉내 냅니다. 남는 미니배치는 문제에서 추가 업데이트하지 않습니다.",
  sample_tests: [
    {
      input: {
        weights: [1.0, 2.0],
        micro_gradients: [
          [0.1, 0.2],
          [0.3, 0.4],
          [0.5, 0.6],
          [0.7, 0.8],
        ],
        accumulation_steps: 2,
        lr: 0.1,
      },
      expected: [0.92, 1.9],
    },
  ],
  hidden_tests: [
    {
      input: {
        weights: [0.0, 0.0],
        micro_gradients: [
          [1.0, 1.0],
          [1.0, 1.0],
          [1.0, 1.0],
        ],
        accumulation_steps: 2,
        lr: 0.5,
      },
      expected: [-0.5, -0.5],
      failure_category: "partial_remainder",
    },
    {
      input: {
        weights: [10.0, 10.0],
        micro_gradients: [[1.0, 2.0]],
        accumulation_steps: 1,
        lr: 1.0,
      },
      expected: [9.0, 8.0],
      failure_category: "single_microbatch",
    },
  ],
  checker_type: "vector",
  tolerance: 0.001,
  similar_problem_ids: ["pytorch_training_loop", "lr_warmup_scheduler"],
  fallback_problem_ids: ["pytorch_training_loop"],
};

export default problem;
