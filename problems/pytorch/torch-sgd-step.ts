import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_sgd_step",
  title: "Single SGD Optimization Step",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "optimization", "sgd", "gradient", "linear-model"],
  statement_en: `Perform ONE step of Stochastic Gradient Descent (SGD) on a simple linear model y = w*x + b.

Given input data x_data, target data y_data, initial weight w_init, initial bias b_init, and learning rate lr:
1. Create tensors for w and b with requires_grad=True
2. Compute predictions: pred = w * x + b
3. Compute MSE loss: loss = mean((pred - y)^2)
4. Backpropagate and perform one SGD step
5. Return a list [updated_w, updated_b, loss_value]`,
  function_name: "solution",
  signature:
    "def solution(x_data: list[float], y_data: list[float], w_init: float, b_init: float, lr: float) -> list[float]:",
  constraints: [
    "1 <= len(x_data) == len(y_data) <= 20",
    "All values in range [-100.0, 100.0]",
    "0 < lr <= 1.0",
  ],
  examples: [
    {
      input: {
        x_data: [1.0, 2.0],
        y_data: [2.0, 4.0],
        w_init: 1.0,
        b_init: 0.0,
        lr: 0.1,
      },
      output: [1.5, 0.3, 2.5],
      explanation:
        "pred=[1,2], loss=mean([1,4])=2.5. grad_w=mean(2*(-1)*1, 2*(-2)*2)=-5, grad_b=mean(-2,-4)=-3. w=1-0.1*(-5)=1.5, b=0-0.1*(-3)=0.3",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x_data, y_data, w_init, b_init, lr):
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.tensor()에 requires_grad=True를 설정하면 자동 미분이 가능합니다.",
    "torch.optim.SGD를 사용하여 옵티마이저를 생성하고, [w, b]를 파라미터로 전달하세요.",
    "optimizer.zero_grad() → 순전파 → loss.backward() → optimizer.step() 순서로 진행합니다.",
    "loss = ((pred - y) ** 2).mean()으로 MSE를 직접 계산할 수 있습니다.",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(x_data, y_data, w_init, b_init, lr):
    x = torch.tensor(x_data, dtype=torch.float32)
    y = torch.tensor(y_data, dtype=torch.float32)
    w = torch.tensor(w_init, dtype=torch.float32, requires_grad=True)
    b = torch.tensor(b_init, dtype=torch.float32, requires_grad=True)
    optimizer = torch.optim.SGD([w, b], lr=lr)
    optimizer.zero_grad()
    pred = w * x + b
    loss = ((pred - y) ** 2).mean()
    loss.backward()
    optimizer.step()
    return [w.item(), b.item(), loss.item()]`,
  solution_explanation:
    "x, y 데이터를 텐서로 변환하고 w, b를 requires_grad=True로 생성합니다. SGD 옵티마이저에 [w, b]를 등록한 뒤, 순전파(pred = w*x + b) → MSE 손실 계산 → 역전파(backward) → 옵티마이저 스텝(step) 순서로 한 번의 경사 하강을 수행합니다. 최종 w, b, loss 값을 리스트로 반환합니다.",
  sample_tests: [
    {
      input: {
        x_data: [1.0, 2.0],
        y_data: [2.0, 4.0],
        w_init: 1.0,
        b_init: 0.0,
        lr: 0.1,
      },
      expected: [1.5, 0.3, 2.5],
    },
  ],
  hidden_tests: [
    {
      input: {
        x_data: [1.0],
        y_data: [0.0],
        w_init: 1.0,
        b_init: 0.0,
        lr: 0.5,
      },
      expected: [0.0, -1.0, 1.0],
      failure_category: "single_sample",
    },
    {
      input: {
        x_data: [0.0, 1.0, 2.0],
        y_data: [1.0, 1.0, 1.0],
        w_init: 0.0,
        b_init: 0.0,
        lr: 0.1,
      },
      expected: [0.2, 0.2, 1.0],
      failure_category: "constant_target",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
