import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_residual_block",
  title: "Residual Block with Skip Connection",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "nn.Module", "residual", "skip-connection"],
  statement_en: `Implement a residual block with a skip connection.

The computation is: **output = ReLU(Linear(x) + x)**

This is a fundamental building block in ResNets, where the input \`x\` is added back to the transformed output before activation (skip connection).

Given:
- \`x\`: input tensor (2D list, shape [batch, dim])
- \`weight\`: weight matrix (2D list, shape [dim, dim]) — note: input and output dimensions are the same
- \`bias\`: bias vector (1D list, shape [dim])

Compute: \`ReLU(x @ W^T + b + x)\` and return as a nested list.`,
  function_name: "solution",
  signature: "def solution(x: list, weight: list, bias: list) -> list:",
  constraints: [
    "x is [batch, dim], weight is [dim, dim], bias is [dim]",
    "Input and output dimensions are the same (required for skip connection)",
    "Apply ReLU after the residual addition",
  ],
  examples: [
    {
      input: {
        x: [[1.0, 2.0]],
        weight: [[0.5, 0.0], [0.0, 0.5]],
        bias: [0, 0],
      },
      output: [[1.5, 3.0]],
      explanation:
        "Linear: [0.5, 1.0], + skip x: [1.5, 3.0], ReLU: [1.5, 3.0] (all positive).",
    },
    {
      input: {
        x: [[-3.0, 2.0]],
        weight: [[1, 0], [0, 1]],
        bias: [0, 0],
      },
      output: [[0.0, 4.0]],
      explanation:
        "Linear: [-3, 2], + skip x: [-6, 4], ReLU: [0, 4] (negative clamped to 0).",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(x: list, weight: list, bias: list) -> list:
    # Residual block: output = ReLU(linear(x) + x)
    # skip connection을 구현하세요
    pass`,
  hints: [
    "잔차 연결(residual connection)은 변환된 출력에 원래 입력을 더하는 것입니다.",
    "x @ weight.T + bias로 선형 변환을 계산한 후, 원래 x를 더하세요.",
    "ReLU는 음수를 0으로 바꾸는 활성화 함수입니다: max(0, value).",
    "skip connection이 가능하려면 입력과 출력의 차원이 같아야 합니다.",
  ],
  solution_code: `import torch
import torch.nn as nn
import torch.nn.functional as F

def solution(x: list, weight: list, bias: list) -> list:
    x_t = torch.tensor(x, dtype=torch.float32)
    w_t = torch.tensor(weight, dtype=torch.float32)
    b_t = torch.tensor(bias, dtype=torch.float32)
    linear_out = x_t @ w_t.T + b_t
    return F.relu(linear_out + x_t).tolist()`,
  solution_explanation:
    "입력 x에 선형 변환(x @ W.T + b)을 적용한 후, 원래 입력 x를 다시 더합니다(skip connection). 그 결과에 ReLU를 적용하여 음수를 0으로 만듭니다. 이 구조는 ResNet의 핵심으로, gradient vanishing 문제를 해결하고 더 깊은 네트워크의 학습을 가능하게 합니다.",
  sample_tests: [
    {
      input: {
        x: [[1.0, 2.0]],
        weight: [[0.5, 0.0], [0.0, 0.5]],
        bias: [0, 0],
      },
      expected: [[1.5, 3.0]],
    },
    {
      input: {
        x: [[-3.0, 2.0]],
        weight: [[1, 0], [0, 1]],
        bias: [0, 0],
      },
      expected: [[0.0, 4.0]],
    },
  ],
  hidden_tests: [
    {
      input: {
        x: [[1, 1], [2, 2]],
        weight: [[0, 1], [1, 0]],
        bias: [0, 0],
      },
      expected: [[2, 2], [4, 4]],
      failure_category: "batch_residual",
    },
    {
      input: {
        x: [[-1, -1]],
        weight: [[2, 0], [0, 2]],
        bias: [1, 1],
      },
      expected: [[0.0, 0.0]],
      failure_category: "relu_clamp_negative",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
