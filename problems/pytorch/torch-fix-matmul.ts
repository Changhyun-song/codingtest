import { Problem } from "@/lib/types";

const problem: Problem = {
  id: "torch_fix_matmul",
  title: "Fix Matrix Multiplication Shape Mismatch",
  category: "pytorch",
  difficulty: "medium",
  tags: ["pytorch", "shape", "debugging", "matmul"],
  statement_en: `Given two 2D lists representing matrices A and B that may not be directly multipliable due to shape mismatch, determine the correct transpose and return the matrix multiplication result.

Your function should try these strategies in order:
1. **Direct multiplication**: If \`A.shape[1] == B.shape[0]\`, compute \`A @ B\`.
2. **Transpose B**: If \`A.shape[1] == B.shape[1]\`, compute \`A @ B.T\`.
3. **Transpose A**: If \`A.shape[0] == B.shape[0]\`, compute \`A.T @ B\`.

Return the result as a nested Python list.`,
  function_name: "solution",
  signature: "def solution(A: list, B: list) -> list:",
  constraints: [
    "A and B are 2D lists of numbers",
    "Exactly one of the three strategies will produce a valid multiplication",
    "Result should be returned as a nested list via .tolist()",
  ],
  examples: [
    {
      input: { A: [[1, 2], [3, 4]], B: [[5, 6], [7, 8]] },
      output: [[19, 22], [43, 50]],
      explanation:
        "A is 2x2, B is 2x2. A.shape[1]==B.shape[0], so direct A @ B works: [[1*5+2*7, 1*6+2*8], [3*5+4*7, 3*6+4*8]] = [[19,22],[43,50]].",
    },
    {
      input: { A: [[1, 2, 3]], B: [[4, 5, 6]] },
      output: [[32]],
      explanation:
        "A is 1x3, B is 1x3. A.shape[1]!=B.shape[0] but A.shape[1]==B.shape[1], so A @ B.T = [[1*4+2*5+3*6]] = [[32]].",
    },
  ],
  starter_code: `import torch
import torch.nn as nn

def solution(A: list, B: list) -> list:
    # 여기에 코드를 작성하세요
    pass`,
  hints: [
    "torch.tensor()로 리스트를 텐서로 변환한 후 .shape 속성을 확인하세요.",
    "행렬 곱셈 A @ B가 가능하려면 A의 열 수와 B의 행 수가 같아야 합니다.",
    "shape이 맞지 않으면 B.T (B의 전치) 또는 A.T (A의 전치)를 시도해 보세요.",
  ],
  solution_code: `import torch

def solution(A: list, B: list) -> list:
    a = torch.tensor(A, dtype=torch.float32)
    b = torch.tensor(B, dtype=torch.float32)
    if a.shape[1] == b.shape[0]:
        return (a @ b).tolist()
    elif a.shape[1] == b.shape[1]:
        return (a @ b.T).tolist()
    elif a.shape[0] == b.shape[0]:
        return (a.T @ b).tolist()`,
  solution_explanation:
    "두 행렬의 shape을 확인하여 직접 곱셈이 가능한지 판단합니다. A의 열 수(shape[1])와 B의 행 수(shape[0])가 같으면 A @ B를 수행합니다. 같지 않다면 A의 열 수와 B의 열 수가 같은지 확인하여 A @ B.T를 시도하고, 그래도 안 되면 A의 행 수와 B의 행 수가 같은지 확인하여 A.T @ B를 수행합니다.",
  sample_tests: [
    {
      input: { A: [[1, 2], [3, 4]], B: [[5, 6], [7, 8]] },
      expected: [[19, 22], [43, 50]],
    },
    {
      input: { A: [[1, 2, 3]], B: [[4, 5, 6]] },
      expected: [[32]],
    },
  ],
  hidden_tests: [
    {
      input: {
        A: [[1, 0], [0, 1], [1, 1]],
        B: [[2, 3], [4, 5]],
      },
      expected: [[2, 3], [4, 5], [6, 8]],
      failure_category: "direct_multiplication",
    },
    {
      input: {
        A: [[1, 2], [3, 4]],
        B: [[1, 3], [2, 4]],
      },
      expected: [[5, 11], [11, 25]],
      failure_category: "direct_multiplication",
    },
  ],
  checker_type: "float_tolerance",
  tolerance: 0.01,
  similar_problem_ids: [],
  fallback_problem_ids: [],
  execution_mode: "pytorch_real",
};

export default problem;
