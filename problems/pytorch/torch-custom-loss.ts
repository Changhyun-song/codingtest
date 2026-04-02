import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_custom_loss",
  title: "Custom Huber Loss",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "loss", "huber", "smooth-l1", "custom-implementation"],
  statement_en: `Implement a custom Huber Loss (also known as Smooth L1 Loss) using PyTorch tensor operations.

The Huber Loss for a pair (prediction, target) with parameter delta is defined as:
- 0.5 * (pred - target)^2, if |pred - target| <= delta
- delta * (|pred - target| - 0.5 * delta), otherwise

Given 1D lists of predictions and targets, and a delta value, compute the mean Huber loss across all elements.

This loss function is less sensitive to outliers than MSE while behaving like MSE for small errors.`,
  function_name: "solution",
  signature:
    "def solution(predictions: list[float], targets: list[float], delta: float) -> float:",
  constraints: [
    "1 <= len(predictions) == len(targets) <= 100",
    "All values in range [-1000.0, 1000.0]",
    "0 < delta <= 100.0",
  ],
  examples: [
    {
      input: {
        predictions: [1.0, 2.0, 10.0],
        targets: [1.0, 3.0, 3.0],
        delta: 1.0,
      },
      output: 2.3333,
      explanation:
        "|diffs| = [0, 1, 7]. Losses: [0.5*0^2=0, 0.5*1^2=0.5, 1*(7-0.5)=6.5]. Mean = 7/3 ≈ 2.3333",
    },
    {
      input: {
        predictions: [0.0, 0.0],
        targets: [0.5, 0.5],
        delta: 1.0,
      },
      output: 0.125,
      explanation:
        "|diffs| = [0.5, 0.5]. Both <= delta, so losses = [0.5*0.25, 0.5*0.25] = [0.125, 0.125]. Mean = 0.125",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(predictions, targets, delta):
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.abs()로 절대값 차이를 계산하세요.",
    "torch.where(조건, 참일때값, 거짓일때값)을 사용하면 조건에 따라 다른 공식을 적용할 수 있습니다.",
    "|diff| <= delta이면 0.5 * diff^2, 아니면 delta * (|diff| - 0.5 * delta)를 적용합니다.",
    "nn.SmoothL1Loss(beta=delta)와 동일한 결과를 기대할 수 있습니다 (단, beta=delta로 설정 시).",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(predictions, targets, delta):
    pred = torch.tensor(predictions, dtype=torch.float32)
    tgt = torch.tensor(targets, dtype=torch.float32)
    diff = torch.abs(pred - tgt)
    loss = torch.where(diff <= delta, 0.5 * diff ** 2, delta * (diff - 0.5 * delta))
    return loss.mean().item()`,
  solution_explanation:
    "predictions와 targets를 텐서로 변환한 뒤, 절대값 차이(diff)를 계산합니다. torch.where()를 사용하여 diff <= delta인 경우 0.5 * diff^2 (MSE처럼 동작), 그렇지 않으면 delta * (diff - 0.5 * delta) (선형에 가까운 패널티)를 적용합니다. Huber Loss는 이상치(outlier)에 덜 민감하면서 작은 오차에는 MSE와 같은 부드러운 그래디언트를 제공하는 장점이 있습니다.",
  sample_tests: [
    {
      input: {
        predictions: [1.0, 2.0, 10.0],
        targets: [1.0, 3.0, 3.0],
        delta: 1.0,
      },
      expected: 2.3333,
    },
    {
      input: {
        predictions: [0.0, 0.0],
        targets: [0.5, 0.5],
        delta: 1.0,
      },
      expected: 0.125,
    },
  ],
  hidden_tests: [
    {
      input: { predictions: [5.0], targets: [0.0], delta: 2.0 },
      expected: 8.0,
      failure_category: "large_outlier",
    },
    {
      input: {
        predictions: [1.0, 2.0, 3.0, 4.0],
        targets: [1.5, 2.5, 3.5, 4.5],
        delta: 1.0,
      },
      expected: 0.125,
      failure_category: "uniform_small_error",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
