import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_broadcast_add",
  title: "Broadcast Addition with Reshape",
  category: "pytorch",
  difficulty: "easy",
  tags: ["pytorch", "broadcasting", "tensor"],
  statement_en: `Given a flat list A with a target shape_a, and a flat list B with a target shape_b, reshape each list into a tensor of the given shape and add them together using PyTorch broadcasting.

Return the result as a nested Python list.

**Broadcasting rules**: When adding tensors of different shapes, PyTorch automatically expands dimensions of size 1 to match the other tensor's size. For example, a tensor of shape [3,1] added to a tensor of shape [1,2] produces a result of shape [3,2].`,
  function_name: "solution",
  signature:
    "def solution(A: list, shape_a: list, B: list, shape_b: list) -> list:",
  constraints: [
    "len(A) == product of shape_a elements",
    "len(B) == product of shape_b elements",
    "The two reshaped tensors must be broadcast-compatible",
    "Result should be returned via .tolist()",
  ],
  examples: [
    {
      input: { A: [1, 2, 3], shape_a: [3, 1], B: [10, 20], shape_b: [1, 2] },
      output: [[11, 21], [12, 22], [13, 23]],
      explanation:
        "A reshaped to [[1],[2],[3]] (3x1), B reshaped to [[10,20]] (1x2). Broadcasting produces a 3x2 result: each row of A is added to the single row of B.",
    },
    {
      input: { A: [1, 2], shape_a: [2], B: [10], shape_b: [1] },
      output: [11, 12],
      explanation:
        "A is [1,2] (shape [2]), B is [10] (shape [1]). B broadcasts to [10,10], result is [11,12].",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(A: list, shape_a: list, B: list, shape_b: list) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.tensor()로 변환 후 .reshape()으로 원하는 shape으로 변환하세요.",
    "PyTorch의 브로드캐스팅은 차원이 1인 축을 자동으로 확장합니다.",
    "두 텐서를 더한 후 .tolist()로 결과를 반환하세요.",
  ],
  solution_code: `import torch

def solution(A: list, shape_a: list, B: list, shape_b: list) -> list:
    a = torch.tensor(A, dtype=torch.float32).reshape(shape_a)
    b = torch.tensor(B, dtype=torch.float32).reshape(shape_b)
    return (a + b).tolist()`,
  solution_explanation:
    "입력 리스트를 torch.tensor로 변환한 후 reshape을 사용하여 원하는 shape으로 변환합니다. 두 텐서를 더하면 PyTorch가 자동으로 브로드캐스팅을 수행하여 호환되는 shape으로 확장한 뒤 원소별 덧셈을 합니다. 결과를 .tolist()로 변환하여 반환합니다.",
  sample_tests: [
    {
      input: { A: [1, 2, 3], shape_a: [3, 1], B: [10, 20], shape_b: [1, 2] },
      expected: [[11, 21], [12, 22], [13, 23]],
    },
    {
      input: { A: [1, 2], shape_a: [2], B: [10], shape_b: [1] },
      expected: [11, 12],
    },
  ],
  hidden_tests: [
    {
      input: {
        A: [1, 2, 3, 4],
        shape_a: [2, 2],
        B: [10, 20],
        shape_b: [2, 1],
      },
      expected: [[11, 12], [23, 24]],
      failure_category: "broadcast_2d",
    },
    {
      input: {
        A: [1],
        shape_a: [1, 1, 1],
        B: [1, 2, 3, 4, 5, 6],
        shape_b: [1, 2, 3],
      },
      expected: [[[2, 3, 4], [5, 6, 7]]],
      failure_category: "broadcast_3d",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
