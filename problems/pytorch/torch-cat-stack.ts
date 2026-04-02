import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_cat_stack",
  title: "Concatenate and Stack Tensors",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "tensor", "concatenation"],
  statement_en: `Given a list of 2D tensors (each represented as a list of lists) and a mode string, perform the specified tensor combination operation and return the result.

Supported modes:
- **"cat_dim0"**: Concatenate all tensors along dimension 0 using \`torch.cat\`.
- **"cat_dim1"**: Concatenate all tensors along dimension 1 using \`torch.cat\`.
- **"stack"**: Stack all tensors along a new dimension 0 using \`torch.stack\` (all tensors must have the same shape).

Return the result as a nested Python list.`,
  function_name: "solution",
  signature: "def solution(tensors: list, mode: str) -> list:",
  constraints: [
    "tensors is a list of 2D lists (each representing a matrix)",
    'mode is one of "cat_dim0", "cat_dim1", "stack"',
    "For cat_dim0: all tensors must have the same number of columns",
    "For cat_dim1: all tensors must have the same number of rows",
    "For stack: all tensors must have the same shape",
  ],
  examples: [
    {
      input: {
        tensors: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
        mode: "cat_dim0",
      },
      output: [[1, 2], [3, 4], [5, 6], [7, 8]],
      explanation:
        "Two 2x2 tensors concatenated along dim 0 produce a 4x2 tensor.",
    },
    {
      input: {
        tensors: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
        mode: "stack",
      },
      output: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
      explanation:
        "Two 2x2 tensors stacked along a new dim 0 produce a 2x2x2 tensor.",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(tensors: list, mode: str) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "각 리스트를 torch.tensor()로 변환하여 텐서 리스트를 만드세요.",
    "torch.cat(tensor_list, dim=0)은 dim 0을 따라 연결하고, torch.stack은 새로운 차원을 추가합니다.",
    "cat은 기존 차원을 따라 연결하고, stack은 새로운 차원을 만든다는 차이를 기억하세요.",
  ],
  solution_code: `import torch

def solution(tensors: list, mode: str) -> list:
    ts = [torch.tensor(t, dtype=torch.float32) for t in tensors]
    if mode == "cat_dim0":
        return torch.cat(ts, dim=0).tolist()
    elif mode == "cat_dim1":
        return torch.cat(ts, dim=1).tolist()
    elif mode == "stack":
        return torch.stack(ts, dim=0).tolist()`,
  solution_explanation:
    "입력 리스트들을 각각 torch.tensor로 변환합니다. mode가 'cat_dim0'이면 torch.cat으로 dim=0을 따라 연결하고, 'cat_dim1'이면 dim=1을 따라 연결합니다. 'stack'이면 torch.stack으로 새로운 차원을 추가하여 텐서들을 쌓습니다. cat은 기존 차원의 크기를 늘리고, stack은 새로운 차원을 만든다는 점이 핵심 차이입니다.",
  sample_tests: [
    {
      input: {
        tensors: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
        mode: "cat_dim0",
      },
      expected: [[1, 2], [3, 4], [5, 6], [7, 8]],
    },
    {
      input: {
        tensors: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
        mode: "stack",
      },
      expected: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
    },
  ],
  hidden_tests: [
    {
      input: {
        tensors: [[[1, 2]], [[3, 4]], [[5, 6]]],
        mode: "cat_dim0",
      },
      expected: [[1, 2], [3, 4], [5, 6]],
      failure_category: "cat_multiple_tensors",
    },
    {
      input: {
        tensors: [[[1], [2]], [[3], [4]]],
        mode: "cat_dim1",
      },
      expected: [[1, 3], [2, 4]],
      failure_category: "cat_dim1",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
