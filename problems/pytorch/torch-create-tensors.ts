import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_create_tensors",
  title: "Create Tensors by Mode",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor-creation", "basics"],
  statement_en: `Given a shape (list of integers) and a mode string, create and return the corresponding PyTorch tensor as a nested list.

Supported modes:
- **"zeros"**: A tensor filled with zeros of the given shape.
- **"ones"**: A tensor filled with ones of the given shape.
- **"arange"**: A 1D tensor with values \`[0, 1, ..., shape[0]-1]\`.
- **"eye"**: An identity matrix of size \`shape[0] x shape[0]\`.
- **"full"**: A tensor of the given shape filled with the value \`7.0\`.

Return the resulting tensor converted to a Python list (via \`.tolist()\`).`,
  function_name: "solution",
  signature: "def solution(shape: list, mode: str) -> list:",
  constraints: [
    "shape contains 1 or 2 positive integers",
    'mode is one of "zeros", "ones", "arange", "eye", "full"',
    "For arange, only shape[0] is used",
    "For eye, only shape[0] is used (produces a square matrix)",
  ],
  examples: [
    {
      input: { shape: [2, 3], mode: "zeros" },
      output: [
        [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0],
      ],
      explanation:
        "torch.zeros([2, 3]) creates a 2x3 tensor of zeros.",
    },
    {
      input: { shape: [3], mode: "arange" },
      output: [0, 1, 2],
      explanation:
        "torch.arange(3) creates the 1D tensor [0, 1, 2].",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(shape: list, mode: str) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.zeros, torch.ones, torch.arange, torch.eye, torch.full 함수를 사용하세요.",
    "torch.full의 두 번째 인자는 채울 값(fill_value)입니다. 예: torch.full([2,2], 7.0)",
    "결과 텐서에 .tolist()를 호출하면 파이썬 리스트로 변환됩니다.",
  ],
  solution_code: `import torch

def solution(shape: list, mode: str) -> list:
    if mode == "zeros":
        t = torch.zeros(shape)
    elif mode == "ones":
        t = torch.ones(shape)
    elif mode == "arange":
        t = torch.arange(shape[0])
    elif mode == "eye":
        t = torch.eye(shape[0])
    elif mode == "full":
        t = torch.full(shape, 7.0)
    else:
        raise ValueError(f"Unknown mode: {mode}")
    return t.tolist()`,
  solution_explanation:
    "각 mode에 따라 적절한 PyTorch 텐서 생성 함수를 호출합니다. zeros/ones는 주어진 shape 그대로, arange는 shape[0]까지의 정수 시퀀스, eye는 shape[0] 크기의 단위행렬, full은 7.0으로 채운 텐서를 생성합니다. 마지막으로 .tolist()로 파이썬 리스트로 변환하여 반환합니다.",
  sample_tests: [
    {
      input: { shape: [2, 3], mode: "zeros" },
      expected: [
        [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0],
      ],
    },
    {
      input: { shape: [3], mode: "arange" },
      expected: [0, 1, 2],
    },
  ],
  hidden_tests: [
    {
      input: { shape: [3, 3], mode: "eye" },
      expected: [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0],
      ],
      failure_category: "identity_matrix",
    },
    {
      input: { shape: [2, 2], mode: "full" },
      expected: [
        [7.0, 7.0],
        [7.0, 7.0],
      ],
      failure_category: "full_tensor",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
