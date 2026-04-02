import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_mse_loss",
  title: "MSE Loss Computation",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "loss", "mse", "regression"],
  statement_en: `Given two 1D lists of floats — predictions and targets — compute the Mean Squared Error (MSE) loss using PyTorch.

MSE is defined as: MSE = mean((predictions - targets)^2)

Use \`torch.nn.MSELoss\` or equivalent tensor operations to compute the result. Return the loss as a scalar float value.`,
  function_name: "solution",
  signature: "def solution(predictions: list[float], targets: list[float]) -> float:",
  constraints: [
    "1 <= len(predictions) == len(targets) <= 100",
    "Each value is in the range [-1000.0, 1000.0]",
  ],
  examples: [
    {
      input: { predictions: [1.0, 2.0, 3.0], targets: [1.0, 2.0, 3.0] },
      output: 0.0,
      explanation:
        "All predictions match targets exactly, so MSE = mean([0, 0, 0]) = 0.0",
    },
    {
      input: { predictions: [1.0, 2.0, 3.0], targets: [2.0, 3.0, 4.0] },
      output: 1.0,
      explanation:
        "Differences are all 1.0, squared differences are [1, 1, 1], mean = 1.0",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(predictions, targets):
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.tensor()로 리스트를 텐서로 변환할 수 있습니다. dtype=torch.float32를 지정하세요.",
    "nn.MSELoss()는 두 텐서의 MSE를 바로 계산해줍니다.",
    ".item()을 사용하면 텐서에서 스칼라 파이썬 값을 추출할 수 있습니다.",
  ],
  solution_code: `import torch
import torch.nn as nn

def solution(predictions, targets):
    pred = torch.tensor(predictions, dtype=torch.float32)
    tgt = torch.tensor(targets, dtype=torch.float32)
    loss = nn.MSELoss()(pred, tgt)
    return loss.item()`,
  solution_explanation:
    "predictions와 targets를 float32 텐서로 변환한 뒤, nn.MSELoss()를 사용하여 평균 제곱 오차를 계산합니다. MSE = mean((pred - tgt)^2)이며, .item()으로 스칼라 값을 반환합니다.",
  sample_tests: [
    {
      input: { predictions: [1.0, 2.0, 3.0], targets: [1.0, 2.0, 3.0] },
      expected: 0.0,
    },
    {
      input: { predictions: [1.0, 2.0, 3.0], targets: [2.0, 3.0, 4.0] },
      expected: 1.0,
    },
  ],
  hidden_tests: [
    {
      input: { predictions: [0.0, 0.0], targets: [3.0, 4.0] },
      expected: 12.5,
      failure_category: "large_error",
    },
    {
      input: {
        predictions: [1.5, 2.5, 3.5, 4.5],
        targets: [1.0, 2.0, 3.0, 4.0],
      },
      expected: 0.25,
      failure_category: "small_error",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
