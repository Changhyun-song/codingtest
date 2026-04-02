import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_grad_accumulation",
  title: "Gradient Accumulation",
  category: "pytorch",
  difficulty: "hard",
  tags: [
    "pytorch",
    "optimization",
    "gradient-accumulation",
    "sgd",
    "training",
  ],
  statement_en: `Implement gradient accumulation for a simple linear model y = w * x (no bias).

Process samples one at a time (batch_size=1). For each sample:
1. Compute per-sample loss: loss = (w * x_i - y_i)^2
2. Divide the loss by accum_steps before calling backward (to average gradients)
3. After every accum_steps samples, call optimizer.step() and optimizer.zero_grad()

This simulates training with a larger effective batch size while using only one sample at a time.

Return the final value of w after processing ALL samples.

Note: The total number of samples is guaranteed to be divisible by accum_steps.`,
  function_name: "solution",
  signature:
    "def solution(x_data: list[float], y_data: list[float], w_init: float, lr: float, accum_steps: int) -> float:",
  constraints: [
    "1 <= len(x_data) == len(y_data) <= 20",
    "len(x_data) % accum_steps == 0",
    "1 <= accum_steps <= len(x_data)",
    "All values in range [-100.0, 100.0]",
    "0 < lr <= 1.0",
  ],
  examples: [
    {
      input: {
        x_data: [1.0, 2.0],
        y_data: [2.0, 4.0],
        w_init: 0.0,
        lr: 0.1,
        accum_steps: 2,
      },
      output: 1.0,
      explanation:
        "Sample 0: grad = 2*(0-2)*1/2 = -2. Sample 1: grad += 2*(0-4)*2/2 = -8. Total grad = -10. Step: w = 0 - 0.1*(-10) = 1.0",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x_data, y_data, w_init, lr, accum_steps):
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "loss를 accum_steps로 나눈 뒤 backward()를 호출하면 그래디언트가 자동으로 누적됩니다.",
    "(i + 1) % accum_steps == 0 조건으로 스텝 시점을 결정하세요.",
    "optimizer.step() 후 반드시 optimizer.zero_grad()를 호출해야 합니다.",
    "per-sample loss는 (w * x_i - y_i)^2 이며, mean이 아닌 단일 샘플 손실입니다.",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(x_data, y_data, w_init, lr, accum_steps):
    x = torch.tensor(x_data, dtype=torch.float32)
    y = torch.tensor(y_data, dtype=torch.float32)
    w = torch.tensor(w_init, dtype=torch.float32, requires_grad=True)
    optimizer = torch.optim.SGD([w], lr=lr)
    optimizer.zero_grad()
    for i in range(len(x_data)):
        pred = w * x[i]
        loss = (pred - y[i]) ** 2
        loss = loss / accum_steps
        loss.backward()
        if (i + 1) % accum_steps == 0:
            optimizer.step()
            optimizer.zero_grad()
    return w.item()`,
  solution_explanation:
    "샘플을 하나씩 처리하면서 per-sample loss를 accum_steps로 나눈 뒤 backward()를 호출합니다. 이렇게 하면 그래디언트가 자동으로 누적되어 accum_steps개 샘플의 평균 그래디언트와 동일한 효과를 얻습니다. accum_steps마다 optimizer.step()으로 가중치를 업데이트하고 zero_grad()로 그래디언트를 초기화합니다. 이 기법은 메모리가 부족할 때 큰 배치 효과를 내는 데 사용됩니다.",
  sample_tests: [
    {
      input: {
        x_data: [1.0, 2.0],
        y_data: [2.0, 4.0],
        w_init: 0.0,
        lr: 0.1,
        accum_steps: 2,
      },
      expected: 1.0,
    },
  ],
  hidden_tests: [
    {
      input: {
        x_data: [1.0, 1.0, 1.0, 1.0],
        y_data: [1.0, 1.0, 1.0, 1.0],
        w_init: 0.0,
        lr: 0.5,
        accum_steps: 2,
      },
      expected: 1.0,
      failure_category: "multi_batch_convergence",
    },
    {
      input: {
        x_data: [2.0, 3.0],
        y_data: [0.0, 0.0],
        w_init: 1.0,
        lr: 0.01,
        accum_steps: 1,
      },
      expected: 0.7544,
      failure_category: "per_sample_step",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
